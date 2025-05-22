import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Chip,
  Badge,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  LockReset as LockResetIcon,
  Visibility,
  VisibilityOff,
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  Timeline as TimelineIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  LocalFireDepartment as FireIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';
import axios from 'axios';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [name, setName] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuizzesTaken: 0,
    averageScore: 0,
    totalCorrectAnswers: 0,
    quizzesPassed: 0,
    perfectScores: 0,
    fastestCompletion: null,
    streakCount: 0
  });

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStats(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user stats:', err);
      setLoading(false);
    }
  };

  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/auth/me',
        { username: name, email: email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data);
      setEditOpen(false);
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update profile.', severity: 'error' });
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setSnackbar({ open: true, message: 'New passwords do not match.', severity: 'error' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/auth/reset-password',
        { email, currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResetOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSnackbar({ open: true, message: 'Password updated successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: error.response?.data?.message || 'Failed to update password.', 
        severity: 'error' 
      });
    }
  };

  const achievements = [
    {
      id: 'quiz_master',
      title: 'Quiz Master',
      description: 'Complete 10 quizzes with a score above 80%',
      icon: <TrophyIcon />,
      progress: (stats.quizzesPassed / 10) * 100,
      achieved: stats.quizzesPassed >= 10
    },
    {
      id: 'perfect_score',
      title: 'Perfect Scorer',
      description: 'Get 100% on 5 different quizzes',
      icon: <StarIcon />,
      progress: (stats.perfectScores / 5) * 100,
      achieved: stats.perfectScores >= 5
    },
    {
      id: 'speed_demon',
      title: 'Speed Demon',
      description: 'Complete a quiz in less than 2 minutes',
      icon: <SpeedIcon />,
      progress: stats.fastestCompletion ? 100 : 0,
      achieved: stats.fastestCompletion && stats.fastestCompletion < 120
    },
    {
      id: 'streak_master',
      title: 'Streak Master',
      description: 'Maintain a 5-day quiz streak',
      icon: <FireIcon />,
      progress: (stats.streakCount / 5) * 100,
      achieved: stats.streakCount >= 5
    }
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 4,
          ml: { sm: '240px' },
          width: { sm: `calc(100% - 240px)` }
        }}
      >
        <Grid container spacing={4}>
          {/* Profile Overview */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                  color: 'white'
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto 16px',
                    bgcolor: '#90caf9',
                    border: '4px solid white'
                  }}
                >
                  {user?.username?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {user?.username}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user?.email}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setEditOpen(true)}
                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<LockResetIcon />}
                    onClick={() => setResetOpen(true)}
                    sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    Reset Password
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Statistics */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Quiz Statistics
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ bgcolor: 'rgba(25, 118, 210, 0.05)' }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="textSecondary">
                          Total Quizzes Taken
                        </Typography>
                        <Typography variant="h4" color="primary">
                          {stats.totalQuizzesTaken}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ bgcolor: 'rgba(25, 118, 210, 0.05)' }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="textSecondary">
                          Correct Answers
                        </Typography>
                        <Typography variant="h4" color="primary">
                          {stats.totalCorrectAnswers}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ bgcolor: 'rgba(25, 118, 210, 0.05)' }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="textSecondary">
                          Perfect Scores
                        </Typography>
                        <Typography variant="h4" color="primary">
                          {stats.perfectScores}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ bgcolor: 'rgba(25, 118, 210, 0.05)' }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="textSecondary">
                          Current Streak
                        </Typography>
                        <Typography variant="h4" color="primary">
                          {stats.streakCount} days
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          {/* Achievements */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Achievements
                </Typography>
                <Grid container spacing={3}>
                  {achievements.map((achievement) => (
                    <Grid item xs={12} sm={6} md={3} key={achievement.id}>
                      <Card
                        sx={{
                          height: '100%',
                          bgcolor: achievement.achieved ? 'rgba(76, 175, 80, 0.1)' : 'rgba(25, 118, 210, 0.05)',
                          position: 'relative',
                          overflow: 'visible'
                        }}
                      >
                        <CardContent>
                          {achievement.achieved && (
                            <Badge
                              sx={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                '& .MuiBadge-badge': {
                                  bgcolor: '#4caf50',
                                  color: 'white'
                                }
                              }}
                              badgeContent={<CheckCircleIcon fontSize="small" />}
                            />
                          )}
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 1,
                              color: achievement.achieved ? '#4caf50' : '#1976d2'
                            }}
                          >
                            {achievement.icon}
                            <Typography variant="subtitle1" sx={{ ml: 1 }}>
                              {achievement.title}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                            {achievement.description}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={achievement.progress}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: 'rgba(0, 0, 0, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: achievement.achieved ? '#4caf50' : '#1976d2'
                              }
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            align="right"
                            sx={{ mt: 0.5 }}
                          >
                            {Math.round(achievement.progress)}%
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Dialogs */}
        <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={resetOpen} onClose={() => setResetOpen(false)}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="dense"
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Confirm New Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setResetOpen(false)}>Cancel</Button>
            <Button onClick={handleResetPassword} variant="contained">
              Update Password
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Profile; 