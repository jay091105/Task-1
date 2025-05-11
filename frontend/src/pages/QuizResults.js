import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const QuizResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/results/${id}`);
        setResult(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quiz results');
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
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

  const calculatePercentage = () => {
    return Math.round((result.score / result.totalQuestions) * 100);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Quiz Results
          </Typography>

          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              {result.quiz.title}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {result.quiz.description}
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Your Score
            </Typography>
            <Typography variant="h3" color="primary" gutterBottom>
              {calculatePercentage()}%
            </Typography>
            <Typography variant="body1">
              {result.score} out of {result.totalQuestions} questions correct
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time taken: {formatTime(result.timeTaken)}
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Question Review
          </Typography>
          <List>
            {result.answers.map((answer, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Question ${index + 1}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {result.quiz.questions[index].question}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: answer.isCorrect ? 'success.main' : 'error.main', fontWeight: 500 }}
                        >
                          Your answer: {result.quiz.questions[index].options[answer.selectedOption]}
                        </Typography>
                        {!answer.isCorrect && (
                          <>
                            <br />
                            <Typography component="span" variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
                              Correct answer: {result.quiz.questions[index].options[result.quiz.questions[index].correctAnswer]}
                            </Typography>
                          </>
                        )}
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/quizzes')}
            >
              Back to Quizzes
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default QuizResults; 