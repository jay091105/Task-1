import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
      light: '#6ec6ff',
      dark: '#0069c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffd600',
      light: '#ffff52',
      dark: '#c7a500',
      contrastText: '#000',
    },
    background: {
      default: '#000000',
      paper: '#11131a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#90caf9',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2196f3',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#2196f3',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#2196f3',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: '#2196f3',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1769aa',
          },
        },
        containedSecondary: {
          backgroundColor: '#ffd600',
          color: '#000',
          '&:hover': {
            backgroundColor: '#c7a500',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: '#11131a',
          boxShadow: '0px 4px 20px rgba(33, 150, 243, 0.15)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            background: '#11131a',
            color: '#fff',
          },
        },
      },
    },
  },
});

export default theme; 