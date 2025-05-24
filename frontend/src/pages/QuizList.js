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
  CircularProgress,
  Chip,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import TimerIcon from '@mui/icons-material/Timer';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const QuizList = () => {
  const [publicQuizzes, setPublicQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch public quizzes
        const publicResponse = await axios.get('http://localhost:5000/api/quizzes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const processQuizzes = (quizzes) => quizzes.map(quiz => ({
          ...quiz,
          creator: quiz.creator || { username: 'Anonymous' },
          questions: quiz.questions || [],
          timeLimit: quiz.timeLimit || 0,
          description: quiz.description || 'No description available'
        }));

        setPublicQuizzes(processQuizzes(publicResponse.data.filter(quiz => quiz.isPublic)));
        
        // Show success notification if quiz was just created
        if (location.state?.quizCreated) {
          setNotification({
            open: true,
            message: 'Quiz created successfully!',
            type: 'success'
          });
          // Clear the state
          window.history.replaceState({}, document.title);
        }
      } catch (err) {
        setError('Failed to fetch quizzes. Please try again later.');
        setNotification({
          open: true,
          message: 'Failed to fetch quizzes',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [location]);

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleOpenDeleteDialog = (quizId) => {
    setQuizToDelete(quizId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setQuizToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!quizToDelete) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/quizzes/${quizToDelete}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setPublicQuizzes((prev) => prev.filter((q) => q._id !== quizToDelete));
      toast.success('Quiz deleted successfully!');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error('Quiz not found or already deleted.');
      } else {
        toast.error('Failed to delete quiz');
      }
    } finally {
      handleCloseDeleteDialog();
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '60vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="primary">
          Loading quizzes...
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{
            fontWeight: 600,
            color: '#1e293b',
          }}
        >
          Available Quizzes
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/create-quiz')}
          sx={{
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
          Create New Quiz
        </Button>
      </Box>

      {publicQuizzes.length === 0 ? (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '40vh',
            gap: 2
          }}
        >
          <Typography 
            variant="h6" 
            align="center"
            color="textSecondary"
            sx={{ mb: 2 }}
          >
            No public quizzes available yet
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/create-quiz')}
            sx={{
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
            Create First Public Quiz
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {publicQuizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * Math.random() }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ffffff',
                    borderRadius: 4,
                    border: '2.5px solid #1976d2',
                    boxShadow: '0 8px 32px 0 #1976d2, 0 1.5px 8px 0 #90caf9',
                    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                    '&:hover': {
                      transform: 'translateY(-6px) scale(1.03)',
                      boxShadow: '0 16px 40px rgba(25, 118, 210, 0.15)',
                      borderColor: '#1565c0',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Typography 
                        variant="h6" 
                        component="h2" 
                        sx={{
                          fontWeight: 600,
                          color: '#1e293b',
                          flexGrow: 1
                        }}
                      >
                        {quiz.title}
                      </Typography>
                    </Box>
                    <Typography 
                      color="text.secondary" 
                      sx={{ mb: 2 }}
                    >
                      {quiz.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      <Chip
                        icon={<PersonIcon />}
                        label={`By ${quiz.creator?.username || 'Anonymous'}`}
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                          color: '#1976d2',
                        }}
                      />
                      <Chip
                        icon={<QuestionMarkIcon />}
                        label={`${quiz.questions?.length || 0} Questions`}
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                          color: '#1976d2',
                        }}
                      />
                      {quiz.timeLimit > 0 && (
                        <Chip
                          icon={<TimerIcon />}
                          label={`${quiz.timeLimit} min`}
                          size="small"
                          sx={{ 
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                            color: '#1976d2',
                          }}
                        />
                      )}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate(`/quiz/${quiz._id}`)}
                      sx={{
                        py: 1,
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
                      Take Quiz
                    </Button>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleOpenDeleteDialog(quiz._id)}
                      sx={{
                        ml: 1,
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: 'rgba(239, 68, 68, 0.12)',
                          boxShadow: '0 2px 8px rgba(239, 68, 68, 0.15)',
                          color: '#b91c1c',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this quiz? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuizList; 