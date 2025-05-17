import React from 'react';
import { Box, Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Shapes */}
      <Box className="decoration-shapes">
        <Box className="shape shape1" />
        <Box className="shape shape2" />
        <Box className="shape shape3" />
        <Box className="shape shape4" />
        <Box className="shape shape5" />
      </Box>

      {/* Geometric Accents */}
      <Box className="geometric-accent accent1" />
      <Box className="geometric-accent accent2" />
      <Box className="geometric-accent accent3" />

      {/* Main Content */}
      <Container maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 