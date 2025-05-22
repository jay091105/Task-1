import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        backgroundColor: '#1976d2',
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Quiz Maker. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={3}>
            <Link href="/about" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
              About
            </Link>
            <Link href="/contact" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
              Contact
            </Link>
            <Link href="/privacy" color="inherit" underline="hover" sx={{ opacity: 0.8 }}>
              Privacy Policy
            </Link>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Link href="https://github.com" target="_blank" color="inherit" sx={{ opacity: 0.8 }}>
              <GitHubIcon />
            </Link>
            <Link href="https://linkedin.com" target="_blank" color="inherit" sx={{ opacity: 0.8 }}>
              <LinkedInIcon />
            </Link>
            <Link href="https://twitter.com" target="_blank" color="inherit" sx={{ opacity: 0.8 }}>
              <TwitterIcon />
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 