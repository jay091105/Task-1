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
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Divider
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
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const QuizList = () => {
  const [publicQuizzes, setPublicQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');
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
        setFilteredQuizzes(processQuizzes(publicResponse.data.filter(quiz => quiz.isPublic)));
        
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

  useEffect(() => {
    filterQuizzes();
  }, [searchTerm, timeFilter, publicQuizzes]);

  const filterQuizzes = () => {
    let filtered = [...publicQuizzes];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply time filter
    if (timeFilter !== 'all') {
      filtered = filtered.filter(quiz => {
        if (timeFilter === 'short' && quiz.timeLimit <= 5) return true;
        if (timeFilter === 'medium' && quiz.timeLimit > 5 && quiz.timeLimit <= 15) return true;
        if (timeFilter === 'long' && quiz.timeLimit > 15) return true;
        return false;
      });
    }

    setFilteredQuizzes(filtered);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const getTimeLabel = (minutes) => {
    if (minutes === 0) return 'No time limit';
    return `${minutes} min`;
  };

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
      setFilteredQuizzes((prev) => prev.filter((q) => q._id !== quizToDelete));
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

  const handleShare = async (quizId) => {
    try {
      const shareUrl = `${window.location.origin}/take-quiz/${quizId}`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'Take this quiz!',
          text: 'Check out this quiz I found!',
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Quiz link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing quiz:', error);
      toast.error('Failed to share quiz');
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

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Time Filter</InputLabel>
              <Select
                value={timeFilter}
                onChange={handleTimeFilterChange}
                label="Time Filter"
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Durations</MenuItem>
                <MenuItem value="short">Short (≤ 5 min)</MenuItem>
                <MenuItem value="medium">Medium (6-15 min)</MenuItem>
                <MenuItem value="long">Long (&gt; 15 min)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {filteredQuizzes.length === 0 ? (
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
          {filteredQuizzes.map((quiz) => (
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
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
                      <IconButton 
                        onClick={() => handleShare(quiz._id)}
                        size="small"
                        sx={{ 
                          color: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'white'
                          }
                        }}
                      >
                        <ShareIcon />
                      </IconButton>
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