import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizzes');
        setQuizzes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quizzes');
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

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

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Quizzes
      </Typography>
      <Grid container spacing={3}>
        {quizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} key={quiz._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {quiz.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {quiz.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created by: {quiz.creator.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Questions: {quiz.questions.length}
                </Typography>
                {quiz.timeLimit > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    Time Limit: {quiz.timeLimit} minutes
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/quiz/${quiz._id}`)}
                >
                  Take Quiz
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {quizzes.length === 0 && (
        <Typography align="center" sx={{ mt: 4 }}>
          No quizzes available
        </Typography>
      )}
    </Container>
  );
};

export default QuizList; 