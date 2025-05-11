import React from 'react';
import { Container, Typography, Button, Box, Paper, Grid, Divider } from '@mui/material';
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
import { motion } from 'framer-motion';

const features = [
  { icon: <QuizIcon color="primary" />, text: 'Create custom quizzes with multiple choice questions' },
  { icon: <AccessTimeIcon color="primary" />, text: 'Set time limits for your quizzes' },
  { icon: <TrendingUpIcon color="primary" />, text: 'Track your progress and performance' },
  { icon: <ShareIcon color="primary" />, text: 'Share quizzes with other users' },
  { icon: <AnalyticsIcon color="primary" />, text: 'Get detailed results and analytics' },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', background: '#000', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Paper elevation={8} sx={{ borderRadius: 5, p: { xs: 3, md: 6 }, background: '#11131a', boxShadow: '0 0 32px 0 #2196f3cc' }}>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background: 'linear-gradient(90deg, #2196f3 30%, #ffffff 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-1px',
                }}
              >
                Welcome to Quiz Maker
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, fontWeight: 400, color: '#90caf9' }}>
                Create engaging quizzes, test your knowledge, and track your progress with our modern quiz platform.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                {user ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      component={RouterLink}
                      to="/quizzes"
                      startIcon={<QuizIcon />}
                      sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderRadius: 3, boxShadow: '0 2px 8px #2196f366' }}
                    >
                      Browse Quizzes
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      component={RouterLink}
                      to="/create-quiz"
                      startIcon={<CreateIcon />}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderRadius: 3,
                        background: '#fff',
                        color: '#2196f3',
                        boxShadow: '0 2px 8px #2196f366',
                        '&:hover': {
                          background: '#e3f2fd',
                          color: '#1769aa',
                        },
                      }}
                    >
                      Create Quiz
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      component={RouterLink}
                      to="login"
                      startIcon={<LoginIcon />}
                      sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderRadius: 3, boxShadow: '0 2px 8px #2196f366' }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderRadius: 3,
                        background: '#fff',
                        color: '#2196f3',
                        boxShadow: '0 2px 8px #2196f366',
                        '&:hover': {
                          background: '#e3f2fd',
                          color: '#1769aa',
                        },
                      }}
                      size="large"
                      component={RouterLink}
                      to="register"
                      startIcon={<AppRegistrationIcon />}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Box>
            </Box>
            <Divider sx={{ mb: 4, borderColor: '#1769aa' }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#fff' }}>
                Platform Features
              </Typography>
              <Grid container spacing={3}>
                {features.map((feature, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      {feature.icon}
                      <Typography variant="body1" sx={{ fontWeight: 500, color: '#90caf9' }}>{feature.text}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home; 