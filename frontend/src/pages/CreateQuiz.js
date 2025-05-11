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
  Grid
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    timeLimit: 0,
    isPublic: true,
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]
  });

  const handleQuizChange = (e) => {
    const { name, value, checked } = e.target;
    setQuiz(prev => ({
      ...prev,
      [name]: name === 'isPublic' ? checked : value
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
          options: ['', '', '', ''],
          correctAnswer: 0
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/quizzes', quiz);
      navigate('/quizzes');
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Paper elevation={3} sx={{ p: 4, boxShadow: '0 0 32px 0 #2196f3cc', border: '3px solid #2196f3', borderRadius: 5, background: '#11131a', mt: 2, mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Quiz
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Quiz Title"
                  name="title"
                  value={quiz.title}
                  onChange={handleQuizChange}
                  required
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
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time Limit (minutes)"
                  name="timeLimit"
                  type="number"
                  value={quiz.timeLimit}
                  onChange={handleQuizChange}
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={quiz.isPublic}
                      onChange={handleQuizChange}
                      name="isPublic"
                    />
                  }
                  label="Public Quiz"
                />
              </Grid>
            </Grid>

            {quiz.questions.map((question, questionIndex) => (
              <Box key={questionIndex} sx={{ mt: 4, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Question {questionIndex + 1}
                  </Typography>
                  {quiz.questions.length > 1 && (
                    <IconButton
                      color="error"
                      onClick={() => removeQuestion(questionIndex)}
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
                  required
                  sx={{ mb: 2 }}
                />

                {question.options.map((option, optionIndex) => (
                  <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      fullWidth
                      label={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      required
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => handleQuestionChange(questionIndex, 'correctAnswer', optionIndex)}
                        />
                      }
                      label="Correct"
                      sx={{ ml: 2 }}
                    />
                  </Box>
                ))}
              </Box>
            ))}

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button
                startIcon={<AddIcon />}
                onClick={addQuestion}
                sx={{ mr: 2 }}
              >
                Add Question
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Create Quiz
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default CreateQuiz; 