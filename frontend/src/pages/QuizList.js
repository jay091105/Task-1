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
  TextField
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import TimerIcon from '@mui/icons-material/Timer';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../contexts/AuthContext';

const QuizList = () => {
  const [publicQuizzes, setPublicQuizzes] = useState([]);
  const [privateQuizzes, setPrivateQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  const [activeTab, setActiveTab] = useState(0);
  const [passwordDialog, setPasswordDialog] = useState({ open: false, quizId: null, password: '' });
  const [enrollDialog, setEnrollDialog] = useState({ open: false, quizId: null, message: '' });
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
        
        // Fetch private quizzes (only user's private quizzes)
        const privateResponse = await axios.get('http://localhost:5000/api/quizzes/my-quizzes', {
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
        setPrivateQuizzes(processQuizzes(privateResponse.data.filter(quiz => !quiz.isPublic)));
        
        // Show success notification if quiz was just created
        if (location.state?.quizCreated) {
          setNotification({
            open: true,
            message: 'Quiz created successfully!',
            type: 'success'
          });
          // Clear the state
          window.history.replaceState({}, document.title);
          // Set active tab to private if a private quiz was created
          if (location.state?.isPrivate) {
            setActiveTab(1);
          }
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTakeQuiz = (quiz) => {
    if (!quiz.isPublic && quiz.password) {
      setPasswordDialog({ open: true, quizId: quiz._id, password: '' });
    } else {
      navigate(`/quiz/${quiz._id}`);
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/quizzes/${passwordDialog.quizId}/verify-password`, 
        { password: passwordDialog.password },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        setPasswordDialog({ open: false, quizId: null, password: '' });
        navigate(`/quiz/${passwordDialog.quizId}`);
      } else {
        setNotification({
          open: true,
          message: 'Incorrect password',
          type: 'error'
        });
      }
    } catch (err) {
      setNotification({
        open: true,
        message: 'Failed to verify password',
        type: 'error'
      });
    }
  };

  const handleEnrollmentRequest = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/quizzes/${enrollDialog.quizId}/enroll`, {
        message: enrollDialog.message
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setEnrollDialog({ open: false, quizId: null, message: '' });
      setNotification({
        open: true,
        message: 'Enrollment request sent successfully',
        type: 'success'
      });
    } catch (err) {
      setNotification({
        open: true,
        message: 'Failed to send enrollment request',
        type: 'error'
      });
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

  const currentQuizzes = activeTab === 0 ? publicQuizzes : privateQuizzes;

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

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: '64px',
              fontSize: '1rem'
            }
          }}
        >
          <Tab 
            icon={<PublicIcon />} 
            label="Public Quizzes" 
            iconPosition="start"
          />
          <Tab 
            icon={<LockIcon />} 
            label="My Private Quizzes" 
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {currentQuizzes.length === 0 ? (
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
            {activeTab === 0 
              ? 'No public quizzes available yet' 
              : 'You haven\'t created any private quizzes yet'}
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
            Create {activeTab === 0 ? 'First Public' : 'Private'} Quiz
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {currentQuizzes.map((quiz) => (
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
                    borderRadius: 3,
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
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
                      {!quiz.isPublic && (
                        <LockIcon sx={{ color: '#1976d2' }} />
                      )}
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
                      onClick={() => handleTakeQuiz(quiz)}
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
                      {!quiz.isPublic && quiz.password ? 'Enter Password' : 'Take Quiz'}
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.type}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Dialog open={passwordDialog.open} onClose={() => setPasswordDialog({ ...passwordDialog, open: false })}>
        <DialogTitle>Enter Quiz Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwordDialog.password}
            onChange={(e) => setPasswordDialog({ ...passwordDialog, password: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handlePasswordSubmit();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setPasswordDialog({ ...passwordDialog, open: false })}
            color="primary"
          >
            Cancel
          </Button>
          <Button 
            onClick={handlePasswordSubmit} 
            variant="contained" 
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={enrollDialog.open} onClose={() => setEnrollDialog({ ...enrollDialog, open: false })}>
        <DialogTitle>Request Enrollment</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            This quiz requires enrollment approval from the creator. Please provide a message with your request.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Message (Optional)"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={enrollDialog.message}
            onChange={(e) => setEnrollDialog({ ...enrollDialog, message: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEnrollDialog({ ...enrollDialog, open: false })}>Cancel</Button>
          <Button onClick={handleEnrollmentRequest} variant="contained" color="primary">Send Request</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuizList; 