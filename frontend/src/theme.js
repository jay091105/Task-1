import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing: (factor) => `${0.25 * factor}rem`,
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    background: {
      default: 'linear-gradient(to bottom, #1976d2 0%, #2196f3 35%, #29b6f6 70%, #4fc3f7 100%)',
      paper: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(236, 246, 255, 0.95))',
    },
    text: {
      primary: '#1565c0',
      secondary: '#2196f3',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    info: {
      main: '#3B82F6',
    },
    success: {
      main: '#10B981',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", -apple-system, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          position: 'relative',
          background: 'linear-gradient(to bottom, #0288d1 0%, #03a9f4 30%, #81d4fa 70%, #e1f5fe 100%)',
          backgroundSize: '100% 100%',
          backgroundAttachment: 'fixed',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }
        }
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
          zIndex: 2,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '0.875rem',
          fontWeight: 500,
          textTransform: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
          boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            boxShadow: '0 12px 20px -4px rgba(0, 0, 0, 0.4)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(236, 246, 255, 0.95))',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px -4px rgba(33, 150, 243, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 40px -8px rgba(33, 150, 243, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(236, 246, 255, 0.95))',
            backdropFilter: 'blur(10px)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2196f3',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2196f3',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(25, 118, 210, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 16px -4px rgba(25, 118, 210, 0.3)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff'
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px -4px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 12px 40px -8px rgba(0, 0, 0, 0.15)',
          }
        },
        elevation1: {
          boxShadow: '0 8px 32px -4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: '0.5rem',
          '& .MuiListItem-root': {
            borderRadius: '8px',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.08) 0%, rgba(33, 150, 243, 0.12) 100%)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          fontWeight: 500,
          '&.MuiChip-colorPrimary': {
            background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.2) 0%, rgba(25, 118, 210, 0.2) 100%)',
            backdropFilter: 'blur(10px)',
            color: '#1976d2',
          },
          '&.MuiChip-colorSecondary': {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            color: '#1976d2',
          },
          '&.MuiChip-colorSuccess': {
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)',
            backdropFilter: 'blur(10px)',
            color: '#10B981',
          },
          '&.MuiChip-colorError': {
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)',
            backdropFilter: 'blur(10px)',
            color: '#EF4444',
          },
          '&.MuiChip-colorWarning': {
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)',
            backdropFilter: 'blur(10px)',
            color: '#F59E0B',
          },
          '&.MuiChip-colorInfo': {
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)',
            backdropFilter: 'blur(10px)',
            color: '#3B82F6',
          },
        },
      },
    },
  },
});

export default theme; 