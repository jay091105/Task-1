import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Container, Box, Typography, Paper, Avatar, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert, IconButton, InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }} align="center">
              No user data found.
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Paper elevation={3} sx={{ p: 4, boxShadow: '0 0 32px 0 #2196f3cc', border: '3px solid #2196f3' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}
            >
              <Avatar 
                sx={{ 
                  width: 100, 
                  height: 100, 
                  fontSize: 48, 
                  mb: 2, 
                  bgcolor: 'primary.main', 
                  color: '#fff', 
                  border: '3px solid #2196f3', 
                  boxShadow: '0 0 32px 0 #2196f3cc', 
                  transition: 'transform 0.2s', 
                  '&:hover': { transform: 'scale(1.08)' }, 
                  '&:active': { transform: 'scale(0.96)' }, 
                }}
              >
                {user.username ? user.username[0].toUpperCase() : user.email[0].toUpperCase()}
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {user.username}
              </Typography>
            </motion.div>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Name
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                {user.username}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Email
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                {user.email}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<EditIcon />}
                onClick={() => setEditOpen(true)}
                sx={{ flex: 1 }}
              >
                Edit Profile
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                startIcon={<LockResetIcon />}
                onClick={() => setResetOpen(true)}
                sx={{ flex: 1, background: '#fff', color: 'primary.main', '&:hover': { background: '#e3f2fd', color: '#1769aa' } }}
              >
                Reset Password
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Box>

      {/* Edit Profile Dialog */}
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

      {/* Reset Password Dialog */}
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
          <Button onClick={handleResetPassword} variant="contained" color="secondary">
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
  );
};

export default Profile; 