import React from 'react';
import { Container, Typography, Button, Box, Paper, Grid, Divider, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import QuizIcon from '@mui/icons-material/Quiz';
import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShareIcon from '@mui/icons-material/Share';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

const features = [
  { 
    icon: <QuizIcon sx={{ fontSize: 40 }} color="primary" />, 
    title: 'Custom Quizzes',
    text: 'Create engaging multiple-choice quizzes tailored to your needs' 
  },
  { 
    icon: <AccessTimeIcon sx={{ fontSize: 40 }} color="primary" />, 
    title: 'Time Management',
    text: 'Set flexible time limits to challenge participants' 
  },
  { 
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} color="primary" />, 
    title: 'Progress Tracking',
    text: 'Monitor performance with detailed analytics and insights' 
  },
  { 
    icon: <ShareIcon sx={{ fontSize: 40 }} color="primary" />, 
    title: 'Easy Sharing',
    text: 'Share quizzes instantly with your audience' 
  },
  { 
    icon: <AnalyticsIcon sx={{ fontSize: 40 }} color="primary" />, 
    title: 'Rich Analytics',
    text: 'Get comprehensive results and performance metrics' 
  },
];

const Home = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ position: 'relative' }}>
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Grid container spacing={4} alignItems="center" sx={{ mb: 8 }}>
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    mb: 2,
                    background: 'linear-gradient(135deg, #1a237e 0%, #2196f3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  Create Engaging Quizzes with Ease
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4, 
                    color: '#1976d2',
                    opacity: 0.9,
                    maxWidth: '90%',
                    lineHeight: 1.6
                  }}
                >
                  Build, share, and track interactive quizzes on our modern platform designed for educators and professionals.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                  {user ? (
                    <>
                      <Button
                        variant="contained"
                        size="large"
                        component={RouterLink}
                        to="/create-quiz"
                        startIcon={<CreateIcon />}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          px: 4,
                          py: 2,
                          fontSize: '1.1rem',
                          borderRadius: 3,
                          background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                          boxShadow: '0 8px 16px -4px rgba(33, 150, 243, 0.5)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 20px -4px rgba(33, 150, 243, 0.6)',
                          },
                        }}
                      >
                        Create Your First Quiz
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        component={RouterLink}
                        to="/quizzes"
                        startIcon={<QuizIcon />}
                        sx={{
                          px: 4,
                          py: 2,
                          fontSize: '1.1rem',
                          borderRadius: 3,
                          borderWidth: 2,
                          borderColor: '#2196f3',
                          color: '#2196f3',
                          '&:hover': {
                            borderWidth: 2,
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 16px -4px rgba(33, 150, 243, 0.2)',
                          },
                        }}
                      >
                        Browse Quizzes
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        size="large"
                        component={RouterLink}
                        to="/register"
                        startIcon={<AppRegistrationIcon />}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          px: 4,
                          py: 2,
                          fontSize: '1.1rem',
                          borderRadius: 3,
                          background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                          boxShadow: '0 8px 16px -4px rgba(33, 150, 243, 0.5)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 20px -4px rgba(33, 150, 243, 0.6)',
                          },
                        }}
                      >
                        Get Started Free
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        component={RouterLink}
                        to="/login"
                        startIcon={<LoginIcon />}
                        sx={{
                          px: 4,
                          py: 2,
                          fontSize: '1.1rem',
                          borderRadius: 3,
                          borderWidth: 2,
                          borderColor: '#2196f3',
                          color: '#2196f3',
                          '&:hover': {
                            borderWidth: 2,
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 16px -4px rgba(33, 150, 243, 0.2)',
                          },
                        }}
                      >
                        Sign In
                      </Button>
                    </>
                  )}
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div 
                variants={itemVariants}
                style={{
                  position: 'relative',
                  minHeight: '400px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '10%',
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)',
                      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                      animation: 'morphing 15s ease-in-out infinite',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '20%',
                      left: '20%',
                      right: '20%',
                      bottom: '20%',
                      background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(33, 150, 243, 0.1) 100%)',
                      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                      animation: 'morphing 15s ease-in-out infinite reverse',
                    },
                    '@keyframes morphing': {
                      '0%': {
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                      },
                      '25%': {
                        borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
                      },
                      '50%': {
                        borderRadius: '30% 70% 70% 30% / 70% 30% 30% 70%',
                      },
                      '75%': {
                        borderRadius: '70% 30% 30% 70% / 30% 70% 70% 30%',
                      },
                      '100%': {
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                      },
                    },
                  }}
                />
                <QuizIcon 
                  sx={{ 
                    position: 'absolute',
                    fontSize: '180px',
                    color: '#2196f3',
                    opacity: 0.1,
                  }} 
                />
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 6,
                color: '#1a237e',
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Platform Features
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <motion.div variants={itemVariants}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        height: '100%',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 255, 0.9) 100%)',
                        borderRadius: 4,
                        border: '1px solid rgba(33, 150, 243, 0.1)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 24px -4px rgba(33, 150, 243, 0.2)',
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 255, 0.95) 100%)',
                          '& .feature-icon': {
                            transform: 'scale(1.1)',
                            color: '#1976d2',
                          },
                        },
                      }}
                    >
                      <Box
                        className="feature-icon"
                        sx={{
                          mb: 2,
                          transition: 'all 0.3s ease-in-out',
                          transform: 'scale(1)',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                          color: '#1a237e',
                          fontWeight: 600,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#1976d2',
                          opacity: 0.8,
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.text}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 