import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Link, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Username should be at least 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setError('');
        setIsSubmitting(true);
        await register(values.username, values.email, values.password);
        navigate('/');
      } catch (error) {
        setError(error.message || 'Registration failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            boxShadow: '0 0 32px 0 rgba(33, 150, 243, 0.2)', 
            border: '1px solid rgba(33, 150, 243, 0.3)', 
            borderRadius: 3, 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(236, 246, 255, 0.95))',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            gutterBottom 
            sx={{ 
              color: '#0d47a1',
              fontWeight: 600,
              mb: 3
            }}
          >
            Create Account
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              margin="normal"
              sx={{ mb: 2 }}
              disabled={isSubmitting}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
              sx={{ mb: 2 }}
              disabled={isSubmitting}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              sx={{ mb: 2 }}
              disabled={isSubmitting}
            />
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              margin="normal"
              sx={{ mb: 2 }}
              disabled={isSubmitting}
            />
            
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={isSubmitting}
              disableElevation
              sx={{ 
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500,
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1976d2'
                },
                '&:disabled': {
                  backgroundColor: '#90caf9'
                }
              }}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#1565c0' }}>
              Already have an account?{' '}
              <Link 
                component={RouterLink} 
                to="/login"
                sx={{ 
                  color: '#2196f3',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 