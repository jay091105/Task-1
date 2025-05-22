import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  FormControlLabel,
  Switch,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Radio,
  RadioGroup,
  Tooltip,
  Divider,
  Alert,
  FormControl,
  Checkbox
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Help as HelpIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Check as CheckIcon,
  Timer as TimerIcon,
  Public as PublicIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    timeLimit: 0,
    isPublic: true,
    password: '',
    requireEnrollment: false,
    questions: [
      {
        question: '',
        type: 'single', // 'single' or 'multiple'
        options: ['', '', '', ''],
        correctAnswer: 0,
        correctAnswers: [] // Array for multiple correct answers
      }
    ]
  });

  const handleQuizChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = name === 'isPublic' ? checked : name === 'requireEnrollment' ? checked : value;
    
    setQuiz(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuiz(prev => {
      const questions = [...prev.questions];
      questions[index] = {
        ...questions[index],
        [field]: value
      };
      return { ...prev, questions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuiz(prev => {
      const questions = [...prev.questions];
      questions[questionIndex].options[optionIndex] = value;
      return { ...prev, questions };
    });
  };

  const addQuestion = () => {
    setQuiz(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          type: 'single',
          options: ['', '', '', ''],
          correctAnswer: 0,
          correctAnswers: []
        }
      ]
    }));
  };

  const removeQuestion = (index) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate quiz data
      if (!quiz.title.trim()) {
        alert('Please enter a quiz title');
        return;
      }

      // Validate questions
      for (let i = 0; i < quiz.questions.length; i++) {
        const question = quiz.questions[i];
        if (!question.question.trim()) {
          alert(`Please enter question ${i + 1}`);
          return;
        }

        // Validate options
        if (question.options.some(opt => !opt.trim())) {
          alert(`Please fill all options for question ${i + 1}`);
          return;
        }

        // Validate correct answers
        if (question.type === 'multiple' && (!question.correctAnswers || question.correctAnswers.length === 0)) {
          alert(`Please select at least one correct answer for question ${i + 1}`);
          return;
        }
      }

      // Prepare quiz data
      const quizData = {
        title: quiz.title.trim(),
        description: quiz.description.trim(),
        timeLimit: parseInt(quiz.timeLimit) || 0,
        isPublic: quiz.isPublic,
        password: quiz.password.trim(),
        requireEnrollment: quiz.requireEnrollment,
        questions: quiz.questions.map(q => ({
          question: q.question.trim(),
          options: q.options.map(opt => opt.trim()),
          type: q.type,
          correctAnswer: q.type === 'single' ? q.correctAnswer : undefined,
          correctAnswers: q.type === 'multiple' ? q.correctAnswers : undefined
        }))
      };

      // Get the auth token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to create a quiz');
        navigate('/login');
        return;
      }

      // Make the API call with auth token
      const response = await axios.post('http://localhost:5000/api/quizzes', quizData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        // Navigate to quiz list with success state
        navigate('/quizzes', { 
          state: { quizCreated: true }
        });
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert(error.response?.data?.message || 'Failed to create quiz. Please try again.');
    }
  };

  // Add validation for the quiz title field
  const validateTitle = (value) => {
    if (!value.trim()) {
      return 'Quiz title is required';
    }
    return '';
  };

  // Add validation for the quiz description field
  const validateDescription = (value) => {
    if (!value.trim()) {
      return 'Quiz description is required';
    }
    return '';
  };

  const steps = [
    {
      label: 'Basic Information',
      content: (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quiz Title"
                name="title"
                value={quiz.title}
                onChange={handleQuizChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    borderRadius: 2,
                  },
                  '& .MuiInputLabel-root': {
                    color: '#1976d2'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(25, 118, 210, 0.3)'
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(25, 118, 210, 0.5)'
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={quiz.description}
                onChange={handleQuizChange}
                multiline
                rows={3}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    borderRadius: 2,
                  },
                  '& .MuiInputLabel-root': {
                    color: '#1976d2'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(25, 118, 210, 0.3)'
                  },
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(25, 118, 210, 0.5)'
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimerIcon color="primary" />
                <TextField
                  fullWidth
                  label="Time Limit (minutes)"
                  name="timeLimit"
                  type="number"
                  value={quiz.timeLimit}
                  onChange={handleQuizChange}
                  inputProps={{ min: 0 }}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.98)',
                      borderRadius: 2,
                    },
                    '& .MuiInputLabel-root': {
                      color: '#1976d2'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(25, 118, 210, 0.3)'
                    },
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(25, 118, 210, 0.5)'
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1976d2'
                    }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PublicIcon color="primary" />
                <FormControlLabel
                  control={
                    <Switch
                      checked={quiz.isPublic}
                      onChange={handleQuizChange}
                      name="isPublic"
                      color="primary"
                    />
                  }
                  label="Public Quiz"
                />
              </Box>
            </Grid>
            {!quiz.isPublic && (
              <>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      fullWidth
                      label="Quiz Password (Optional)"
                      name="password"
                      type="password"
                      value={quiz.password}
                      onChange={handleQuizChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.98)',
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={quiz.requireEnrollment}
                          onChange={handleQuizChange}
                          name="requireEnrollment"
                          color="primary"
                        />
                      }
                      label="Require Enrollment Approval"
                    />
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      )
    },
    {
      label: 'Add Questions',
      content: (
        <Box sx={{ mt: 2 }}>
          {quiz.questions.map((question, questionIndex) => (
            <Card
              key={questionIndex}
              sx={{
                mb: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                overflow: 'visible',
                border: '1px solid rgba(25, 118, 210, 0.2)'
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1, color: '#1976d2', fontWeight: 500 }}>
                    Question {questionIndex + 1}
                  </Typography>
                  {quiz.questions.length > 1 && (
                    <IconButton
                      color="error"
                      onClick={() => removeQuestion(questionIndex)}
                      size="small"
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>

                <TextField
                  fullWidth
                  label="Question"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                  variant="outlined"
                  sx={{ mb: 3 }}
                />

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={question.type === 'multiple'}
                        onChange={(e) => {
                          const newQuestions = [...quiz.questions];
                          newQuestions[questionIndex] = {
                            ...question,
                            type: e.target.checked ? 'multiple' : 'single',
                            correctAnswer: e.target.checked ? null : 0,
                            correctAnswers: e.target.checked ? [] : null
                          };
                          setQuiz({ ...quiz, questions: newQuestions });
                        }}
                        color="primary"
                      />
                    }
                    label="Allow multiple correct answers"
                  />
                </FormControl>

                <Typography variant="subtitle1" sx={{ mb: 2, color: '#1976d2' }}>
                  Options
                </Typography>

                {question.options.map((option, optionIndex) => (
                  <Box key={optionIndex} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      label={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      variant="outlined"
                    />
                    {question.type === 'multiple' ? (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={question.correctAnswers?.includes(optionIndex)}
                            onChange={(e) => {
                              const newQuestions = [...quiz.questions];
                              const correctAnswers = [...(question.correctAnswers || [])];
                              if (e.target.checked) {
                                correctAnswers.push(optionIndex);
                              } else {
                                const index = correctAnswers.indexOf(optionIndex);
                                if (index > -1) {
                                  correctAnswers.splice(index, 1);
                                }
                              }
                              newQuestions[questionIndex] = {
                                ...question,
                                correctAnswers: correctAnswers
                              };
                              setQuiz({ ...quiz, questions: newQuestions });
                            }}
                            sx={{
                              color: '#1976d2',
                              '&.Mui-checked': {
                                color: '#1976d2',
                              },
                            }}
                          />
                        }
                        label="Correct"
                      />
                    ) : (
                      <Radio
                        checked={question.correctAnswer === optionIndex}
                        onChange={() => {
                          const newQuestions = [...quiz.questions];
                          newQuestions[questionIndex] = {
                            ...question,
                            correctAnswer: optionIndex
                          };
                          setQuiz({ ...quiz, questions: newQuestions });
                        }}
                        sx={{
                          color: '#1976d2',
                          '&.Mui-checked': {
                            color: '#1976d2',
                          },
                        }}
                      />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              startIcon={<AddIcon />}
              onClick={addQuestion}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1,
                borderWidth: 2
              }}
            >
              Add Another Question
            </Button>
          </Box>
        </Box>
      )
    },
    {
      label: 'Review & Submit',
      content: (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Please review your quiz details before submitting.
          </Alert>
          
          <Typography variant="h6" gutterBottom color="primary">
            Quiz Overview
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#2196f3' }}>
              <strong>Title:</strong> {quiz.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#2196f3' }}>
              <strong>Description:</strong> {quiz.description}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#2196f3' }}>
              <strong>Time Limit:</strong> {quiz.timeLimit} minutes
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#2196f3' }}>
              <strong>Visibility:</strong> {quiz.isPublic ? 'Public' : 'Private'}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#2196f3' }}>
              <strong>Number of Questions:</strong> {quiz.questions.length}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom color="primary">
            Questions Summary
          </Typography>

          {quiz.questions.map((question, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Question {index + 1}:</strong> {question.question}
              </Typography>
              <Box sx={{ pl: 3 }}>
                {question.options.map((option, optIndex) => (
                  <Typography
                    key={optIndex}
                    variant="body2"
                    sx={{
                      color: optIndex === question.correctAnswer ? 'success.main' : 'text.primary',
                      fontWeight: optIndex === question.correctAnswer ? 600 : 400
                    }}
                  >
                    {optIndex === question.correctAnswer && <CheckIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />}
                    Option {optIndex + 1}: {option}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )
    }
  ];

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(25, 118, 210, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            mt: 4,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: '#1976d2',
              fontWeight: 600,
              textAlign: 'center',
              mb: 4
            }}
          >
            Create New Quiz
          </Typography>

          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              '.MuiStepLabel-label': {
                color: '#2196f3',
                fontWeight: 500
              },
              '.MuiStepIcon-root': {
                color: '#90caf9',
              },
              '.MuiStepIcon-root.Mui-active': {
                color: '#1976d2',
              },
              '.MuiStepIcon-root.Mui-completed': {
                color: '#1976d2',
              },
              mb: 4
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  {step.content}
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      startIcon={<ArrowBackIcon />}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                      endIcon={index === steps.length - 1 ? <CheckIcon /> : <ArrowForwardIcon />}
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        bgcolor: '#1976d2',
                        '&:hover': {
                          bgcolor: '#1565c0'
                        }
                      }}
                    >
                      {index === steps.length - 1 ? 'Create Quiz' : 'Continue'}
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default CreateQuiz; 