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
  CircularProgress,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimerIcon from '@mui/icons-material/Timer';
import QuizIcon from '@mui/icons-material/Quiz';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '80vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="primary">Loading Results...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '80vh',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography color="error" variant="h5" align="center">
          {error}
        </Typography>
          <Button 
            variant="contained" 
            onClick={() => window.location.reload()}
            sx={{
              mt: 2,
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              color: '#ffffff',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            Try Again
          </Button>
        </Box>
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

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#4caf50';
    if (percentage >= 60) return '#ff9800';
    return '#f44336';
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Header Section */}
          <Box 
            sx={{ 
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              p: 4,
              color: 'white'
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
            Quiz Results
          </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9 }}>
              {result.quiz.title}
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            {/* Score Section */}
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card 
                elevation={2}
                sx={{ 
                  mb: 4,
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%)',
                  border: '1px solid rgba(25, 118, 210, 0.1)',
                  borderRadius: 3
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    <EmojiEventsIcon sx={{ fontSize: 60, color: getScoreColor(calculatePercentage()) }} />
                  </Box>
                  <Typography variant="h2" sx={{ color: getScoreColor(calculatePercentage()), mb: 2, fontWeight: 600 }}>
              {calculatePercentage()}%
            </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label={`${result.score} of ${result.totalQuestions} Correct`}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip 
                      icon={<TimerIcon />} 
                      label={`Time: ${formatTime(result.timeTaken)}`}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Questions Review */}
            <Typography variant="h6" gutterBottom sx={{ mb: 3, color: '#1976d2', fontWeight: 600 }}>
              Question Review
            </Typography>
            <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
              {result.answers.map((answer, index) => {
                const question = result.quiz.questions[index];
                const isMultiple = question.type === 'multiple';
                // Normalize to arrays for easier handling
                const selected = isMultiple ? (Array.isArray(answer.selectedOption) ? answer.selectedOption : []) : [answer.selectedOption];
                const correct = isMultiple ? (Array.isArray(question.correctAnswers) ? question.correctAnswers : []) : [question.correctAnswer];
                // Chips for selected answers
                const selectedChips = selected.map((optIdx, i) => (
                  <Chip
                    key={i}
                    label={question.options[optIdx]}
                    color={correct.includes(optIdx) ? 'success' : 'error'}
                    icon={correct.includes(optIdx) ? <CheckCircleIcon /> : undefined}
                    sx={{ mr: 1, mb: 1, fontWeight: 500 }}
                    variant={correct.includes(optIdx) ? 'filled' : 'outlined'}
                  />
                ));
                // Chips for correct answers (if not all selected)
                const missedChips = correct.filter(optIdx => !selected.includes(optIdx)).map((optIdx, i) => (
                  <Chip
                    key={i}
                    label={question.options[optIdx]}
                    color="success"
                    icon={<CheckCircleIcon />}
                    sx={{ mr: 1, mb: 1, fontWeight: 500, opacity: 0.7 }}
                    variant="outlined"
                  />
                ));
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 2px 12px rgba(25, 118, 210, 0.07)' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                          <QuizIcon color="primary" />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                              Question {index + 1}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, color: 'text.primary' }}>
                              {question.question}
                            </Typography>
                            <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: answer.isCorrect ? 'success.main' : 'error.main', mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                                Your answer{isMultiple ? 's' : ''}:
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}>
                                {selectedChips.length > 0 ? selectedChips : <Chip label="No answer" color="error" variant="outlined" />}
                              </Box>
                              {!answer.isCorrect && missedChips.length > 0 && (
                                <>
                                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'success.main', mb: 1 }}>
                                    Correct answer{isMultiple ? 's' : ''}:
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {missedChips}
                                  </Box>
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </List>

            {/* Back Button */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                  size="large"
                onClick={() => navigate('/quizzes')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                    color: '#ffffff',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    },
                    transition: 'all 0.3s ease-in-out'
                  }}
              >
                Back to Quizzes
              </Button>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default QuizResults; 