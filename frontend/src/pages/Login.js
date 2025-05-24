import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Link, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setError('');
        setIsSubmitting(true);
        await login(values.email, values.password);
        navigate('/');
      } catch (error) {
        setError(error.message || 'Failed to login. Please check your credentials.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
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
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
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
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#1565c0' }}>
              Don't have an account?{' '}
              <Link 
                component={RouterLink} 
                to="/register"
                sx={{ 
                  color: '#2196f3',
                  fontWeight: 500,
                  textDecoration: 'none'
                }}
              >
                Register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 