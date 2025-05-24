import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Radio,
  RadioGroup,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormGroup,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(response.data);
        // Initialize answers array with null for single choice and empty array for multiple choice
        const initialAnswers = response.data.questions.map(question => 
          question.type === 'multiple' ? [] : null
        );
        setAnswers(initialAnswers);
        if (response.data.timeLimit > 0) {
          setTimeLeft(response.data.timeLimit * 60);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quiz');
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSingleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleMultipleAnswerChange = (optionIndex) => {
    const newAnswers = [...answers];
    const currentAnswers = [...newAnswers[currentQuestion]];
    
    const index = currentAnswers.indexOf(optionIndex);
    if (index === -1) {
      currentAnswers.push(optionIndex);
    } else {
      currentAnswers.splice(index, 1);
    }
    
    newAnswers[currentQuestion] = currentAnswers;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const isCurrentQuestionAnswered = () => {
    const currentAnswer = answers[currentQuestion];
    if (quiz.questions[currentQuestion].type === 'multiple') {
      return currentAnswer && currentAnswer.length > 0;
    }
    return currentAnswer !== null;
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/quizzes/${id}/submit`, {
        answers: answers.map((answer, index) => ({
          questionIndex: index,
          selectedOption: answer,
          questionType: quiz.questions[index].type
        })),
        timeTaken: quiz.timeLimit * 60 - timeLeft
      });
      navigate(`/results/${response.data._id}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Loading quiz...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestionData = quiz.questions[currentQuestion];
  const isMultipleChoice = currentQuestionData.type === 'multiple';

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, boxShadow: '0 0 32px 0 #2196f3cc', border: '3px solid #2196f3', borderRadius: 5, background: '#ffffff', mt: 2, mb: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom color="#0d47a1">
            {quiz.title}
          </Typography>
          <Typography color="#1565c0" gutterBottom>
            {quiz.description}
          </Typography>
          {timeLeft !== null && (
            <Typography variant="h6" color="primary">
              Time Left: {formatTime(timeLeft)}
            </Typography>
          )}
        </Box>

        <LinearProgress
          variant="determinate"
          value={(currentQuestion + 1) / quiz.questions.length * 100}
          sx={{ mb: 4 }}
        />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {currentQuestionData.question}
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            {isMultipleChoice ? 'Select all that apply' : 'Select one answer'}
          </Alert>

          <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
            {isMultipleChoice ? (
              <FormGroup>
                {currentQuestionData.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={answers[currentQuestion]?.includes(index) || false}
                        onChange={() => handleMultipleAnswerChange(index)}
                        sx={{
                          color: '#1976d2',
                          '&.Mui-checked': {
                            color: '#1976d2',
                          },
                        }}
                      />
                    }
                    label={option}
                    sx={{
                      mb: 1,
                      p: 1,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      },
                    }}
                  />
                ))}
              </FormGroup>
            ) : (
            <RadioGroup
              value={answers[currentQuestion]?.toString() || ''}
                onChange={(e) => handleSingleAnswerChange(e.target.value)}
            >
                {currentQuestionData.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index.toString()}
                    control={
                      <Radio 
                        sx={{
                          color: '#1976d2',
                          '&.Mui-checked': {
                            color: '#1976d2',
                          },
                        }}
                      />
                    }
                  label={option}
                    sx={{
                      mb: 1,
                      p: 1,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      },
                    }}
                />
              ))}
            </RadioGroup>
            )}
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            sx={{
              color: '#1976d2',
              borderColor: '#1976d2',
              '&:hover': {
                color: '#1565c0',
                borderColor: '#1565c0',
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            Previous
          </Button>
          {currentQuestion < quiz.questions.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                color: '#ffffff',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                  color: '#ffffff',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setConfirmSubmit(true)}
              disabled={!isCurrentQuestionAnswered()}
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                color: '#ffffff',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                  color: '#ffffff',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              Submit Quiz
            </Button>
          )}
        </Box>
      </Paper>

      <Dialog
        open={confirmSubmit}
        onClose={() => setConfirmSubmit(false)}
      >
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit your answers? You cannot change them after submission.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setConfirmSubmit(false)}
            sx={{
              color: '#1976d2',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                color: '#1565c0'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary" 
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              color: '#ffffff',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                color: '#ffffff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TakeQuiz; 