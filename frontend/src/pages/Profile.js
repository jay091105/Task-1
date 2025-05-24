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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #f8fafc 100%)' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #f8fafc 100%)',
      py: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Card elevation={4} sx={{
        maxWidth: 600,
        width: '100%',
        mx: 'auto',
        p: 6,
        borderRadius: 6,
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)',
        mb: 8,
        textAlign: 'center',
      }}>
        <Avatar
          sx={{
            width: 140,
            height: 140,
            mx: 'auto',
            mb: 3,
            fontSize: 64,
            bgcolor: '#ffffff22',
            border: '6px solid #fff',
            color: '#1976d2',
            boxShadow: '0 4px 16px rgba(25, 118, 210, 0.10)'
          }}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, letterSpacing: 0.5 }}>{user?.username}</Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>{user?.email}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setEditOpen(true)}
            sx={{ bgcolor: '#fff', color: '#1976d2', fontWeight: 600, boxShadow: 'none', '&:hover': { bgcolor: '#e3f2fd' } }}
          >
            Edit Profile
          </Button>
          <Button
            variant="outlined"
            startIcon={<LockResetIcon />}
            onClick={() => setResetOpen(true)}
            sx={{ borderColor: '#fff', color: '#fff', fontWeight: 600, '&:hover': { borderColor: '#e3f2fd', bgcolor: '#1565c0' } }}
          >
            Reset Password
          </Button>
        </Box>
      </Card>

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
    </Box>
  );
};

export default Profile; 