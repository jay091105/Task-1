import React from 'react';
import { Container, Typography, Button, Box, Paper, Grid, Divider, IconButton, Card, CardContent } from '@mui/material';
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
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { motion } from 'framer-motion';
import QuizIllustration from '../assets/quiz-illustration.svg';

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

const stats = [
  { number: '10K+', label: 'Active Users', icon: <PeopleIcon sx={{ fontSize: 32, color: '#1976d2' }} /> },
  { number: '50K+', label: 'Quizzes Created', icon: <QuizIcon sx={{ fontSize: 32, color: '#1976d2' }} /> },
  { number: '99.9%', label: 'Uptime', icon: <SpeedIcon sx={{ fontSize: 32, color: '#1976d2' }} /> },
  { number: '24/7', label: 'Support', icon: <SecurityIcon sx={{ fontSize: 32, color: '#1976d2' }} /> },
];

const testimonials = [
  {
    text: "The best quiz platform I've ever used. It's intuitive and feature-rich!",
    author: "Sarah Johnson",
    role: "Teacher"
  },
  {
    text: "Perfect for creating engaging assessments. My students love it!",
    author: "Michael Chen",
    role: "Professor"
  },
  {
    text: "Streamlined our training assessments. Highly recommended!",
    author: "Emily Rodriguez",
    role: "HR Manager"
  }
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
    <>
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e3f2fd 100%)',
          pt: { xs: 4, md: 12 },
          pb: { xs: 6, md: 12 },
          overflow: 'hidden',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(25, 118, 210, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative' }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <Grid 
                container 
                spacing={4} 
                alignItems="center" 
                justifyContent="center"
                sx={{ mb: 8 }}
              >
                <Grid item xs={12} md={6}>
                  <motion.div variants={itemVariants}>
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: { xs: '2.5rem', md: '3.5rem' },
                          fontWeight: 800,
                          mb: 2,
                          background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          letterSpacing: '-0.02em',
                          lineHeight: 1.2,
                        }}
                      >
                        {user ? 'Welcome to Quiz Maker' : 'Create Engaging Quizzes with Ease'}
                      </Typography>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 4, 
                          color: '#475569',
                          opacity: 1,
                          maxWidth: { xs: '100%', md: '90%' },
                          lineHeight: 1.6,
                          fontWeight: 500,
                          mx: { xs: 'auto', md: 0 }
                        }}
                      >
                        {user ? 'Start creating your own quizzes or take quizzes created by others.' : 'Build, share, and track interactive quizzes on our modern platform designed for educators and professionals.'}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        mb: 4,
                        justifyContent: { xs: 'center', md: 'flex-start' }
                      }}>
                        {user ? (
                          <>
                            <Button
                              variant="contained"
                              size="large"
                              component={RouterLink}
                              to="/create-quiz"
                              startIcon={<CreateIcon />}
                              sx={{
                                px: 4,
                                py: 2,
                                fontSize: '1.1rem',
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                                '&:hover': {
                                  background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                                }
                              }}
                            >
                              Create New Quiz
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
                                borderColor: '#1976d2',
                                color: '#1976d2',
                                '&:hover': {
                                  borderColor: '#1565c0',
                                  color: '#1565c0',
                                }
                              }}
                            >
                              Take a Quiz
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
                              sx={{
                                px: 4,
                                py: 2,
                                fontSize: '1.1rem',
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                                '&:hover': {
                                  background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                                }
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
                                borderColor: '#1976d2',
                                color: '#1976d2',
                                '&:hover': {
                                  borderColor: '#1565c0',
                                  color: '#1565c0',
                                }
                              }}
                            >
                              Sign In
                            </Button>
                          </>
                        )}
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <motion.div variants={itemVariants}>
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '-20px',
                          right: '-20px',
                          width: '200px',
                          height: '200px',
                          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0) 70%)',
                          borderRadius: '50%',
                          zIndex: 0
                        }
                      }}
                    >
                      <img 
                        src={QuizIllustration}
                        alt="Quiz Illustration"
                        style={{
                          width: '100%',
                          maxWidth: '450px',
                          height: 'auto',
                          display: 'block',
                          margin: '0 auto',
                          transform: 'scale(1.1)'
                        }}
                      />
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>

            {/* Stats Section */}
            <Box sx={{ 
              my: 8,
              maxWidth: '1000px',
              mx: 'auto'
            }}>
              <Grid container spacing={3} justifyContent="center">
                {stats.map((stat, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          textAlign: 'center',
                          background: '#ffffff',
                          borderRadius: 2,
                          border: '1px solid #e2e8f0',
                          transition: 'all 0.3s ease-in-out',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease-in-out'
                          },
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                            '&::before': {
                              opacity: 1
                            }
                          }
                        }}
                      >
                        {stat.icon}
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            color: '#1976d2',
                            my: 1
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#475569',
                            fontWeight: 500
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Features Section */}
            {!user && (
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
                      color: '#1e293b',
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
                              background: '#ffffff',
                              borderRadius: 3,
                              border: '1px solid #e2e8f0',
                              transition: 'all 0.3s ease-in-out',
                              position: 'relative',
                              overflow: 'hidden',
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '3px',
                                background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                                opacity: 0,
                                transition: 'opacity 0.3s ease-in-out'
                              },
                              '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.1)',
                                '&::after': {
                                  opacity: 1
                                },
                                '& .feature-icon': {
                                  transform: 'scale(1.1) rotate(5deg)',
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
                                color: '#1e293b',
                                fontWeight: 600,
                              }}
                            >
                              {feature.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                color: '#475569',
                                lineHeight: 1.6,
                                fontWeight: 500
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
            )}

            {/* Testimonials Section */}
            {!user && (
              <Box sx={{ py: 8 }}>
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: 'center',
                    mb: 6,
                    color: '#1e293b',
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                  }}
                >
                  What Our Users Say
                </Typography>
                <Grid container spacing={4}>
                  {testimonials.map((testimonial, idx) => (
                    <Grid item xs={12} md={4} key={idx}>
                      <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card
                          sx={{
                            height: '100%',
                            background: '#ffffff',
                            borderRadius: 3,
                            border: '1px solid #e2e8f0',
                            transition: 'all 0.3s ease-in-out',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '4px',
                              background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease-in-out'
                            },
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 16px 32px rgba(0, 0, 0, 0.1)',
                              '&::before': {
                                opacity: 1
                              }
                            },
                          }}
                        >
                          <CardContent sx={{ p: 4 }}>
                            <Typography
                              variant="body1"
                              sx={{
                                mb: 3,
                                color: '#475569',
                                fontStyle: 'italic',
                                lineHeight: 1.6
                              }}
                            >
                              "{testimonial.text}"
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: '#1e293b',
                                fontWeight: 600
                              }}
                            >
                              {testimonial.author}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#64748b'
                              }}
                            >
                              {testimonial.role}
                            </Typography>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* CTA Section */}
            {!user && (
              <Box
                sx={{
                  py: 8,
                  px: 4,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.03) 0%, rgba(25, 118, 210, 0.08) 100%)',
                  borderRadius: 4,
                  mt: 8,
                  border: '1px solid rgba(25, 118, 210, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at top right, rgba(25, 118, 210, 0.1) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    mb: 3,
                    color: '#1e293b',
                    fontWeight: 700
                  }}
                >
                  Ready to Get Started?
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    color: '#475569',
                    fontWeight: 500
                  }}
                >
                  Join thousands of educators and professionals using Quiz Maker
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/register"
                  startIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                    }
                  }}
                >
                  Create Your Free Account
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home; 