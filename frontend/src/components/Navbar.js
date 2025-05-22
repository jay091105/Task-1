import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Successfully logged out!');
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = user ? [
    { text: 'Quizzes', icon: <ListIcon />, path: '/quizzes' },
    { text: 'Create Quiz', icon: <AddIcon />, path: '/create-quiz' },
  ] : [
    { text: 'Login', icon: <PersonIcon />, path: '/login' },
    { text: 'Register', icon: <PersonIcon />, path: '/register' },
  ];

  const drawer = (
    <Box 
      sx={{ 
        width: 250,
        bgcolor: 'background.paper',
        height: '100%',
        color: '#1e293b'
      }} 
      role="presentation" 
      onClick={handleDrawerToggle}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            sx={{
              color: '#1976d2',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            <ListItemIcon sx={{ color: '#1976d2' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {user && (
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              color: '#dc2626',
              '&:hover': {
                backgroundColor: 'rgba(220, 38, 38, 0.04)'
              }
            }}
          >
            <ListItemIcon sx={{ color: '#dc2626' }}><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  if (loading) return null;

  return (
        <AppBar 
          position="sticky" 
          elevation={0} 
          sx={{ 
            borderBottom: '1px solid #e2e8f0',
            bgcolor: '#ffffff',
            color: '#1e293b'
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Box
                component={RouterLink}
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: '#1976d2',
                  flexGrow: 1,
                }}
              >
                <QuizIcon sx={{ mr: 1, color: '#1976d2' }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: '-0.5px',
                    color: '#1976d2',
                  }}
                >
                  Quiz Maker
                </Typography>
              </Box>

              {isMobile ? (
                <>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{ ml: 2, color: '#1976d2' }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Drawer
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                      keepMounted: true,
                    }}
                    PaperProps={{
                      sx: {
                        bgcolor: '#ffffff',
                        color: '#1e293b',
                      }
                    }}
                  >
                    {drawer}
                  </Drawer>
                </>
              ) : (
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  {user ? (
                    <>
                      {menuItems.map((item) => (
                        <Button
                          key={item.text}
                          color="inherit"
                          component={RouterLink}
                          to={item.path}
                          startIcon={item.icon}
                          sx={{
                            color: '#1976d2',
                            fontWeight: 500,
                            '&:hover': {
                              color: '#1565c0',
                              backgroundColor: 'rgba(25, 118, 210, 0.04)'
                            }
                          }}
                        >
                          {item.text}
                        </Button>
                      ))}
                      <IconButton
                        onClick={handleProfileMenuOpen}
                        size="small"
                        sx={{ ml: 2 }}
                      >
                        <Avatar sx={{
                          width: 32,
                          height: 32,
                          bgcolor: '#1976d2',
                          color: '#ffffff',
                          boxShadow: '0 2px 4px rgba(25, 118, 210, 0.2)'
                        }}>
                          {user.username ? user.username[0].toUpperCase() : user.email[0].toUpperCase()}
                        </Avatar>
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileMenuClose}
                        onClick={handleProfileMenuClose}
                        PaperProps={{
                          sx: {
                            bgcolor: '#ffffff',
                            color: '#1e293b',
                          },
                        }}
                      >
                        <MenuItem component={RouterLink} to="/profile" sx={{ 
                          color: '#1e293b',
                          '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.04)'
                          }
                        }}>
                          <ListItemIcon>
                            <PersonIcon fontSize="small" sx={{ color: '#1976d2' }} />
                          </ListItemIcon>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout} sx={{ 
                          color: '#dc2626',
                          '&:hover': {
                            backgroundColor: 'rgba(220, 38, 38, 0.04)'
                          }
                        }}>
                          <ListItemIcon>
                            <LogoutIcon fontSize="small" sx={{ color: '#dc2626' }} />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    menuItems.map((item) => (
                      <Button
                        key={item.text}
                        color="inherit"
                        component={RouterLink}
                        to={item.path}
                        startIcon={item.icon}
                        sx={{
                          color: '#1976d2',
                          fontWeight: 500,
                          '&:hover': {
                            color: '#1565c0',
                            backgroundColor: 'rgba(25, 118, 210, 0.04)'
                          }
                        }}
                      >
                        {item.text}
                      </Button>
                    ))
                  )}
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
  );
};

export default Navbar; 