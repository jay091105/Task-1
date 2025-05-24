import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/reset-password'].includes(location.pathname);

  if (isAuthPage) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container component="main" maxWidth="lg" sx={{ flex: 1, py: 4 }}>
          {children}
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            flex: 1,
            py: 4,
            px: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 