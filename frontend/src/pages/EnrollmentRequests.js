import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const EnrollmentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/quizzes/enrollment-requests', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRequests(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch enrollment requests');
      setLoading(false);
    }
  };

  const handleRequest = async (requestId, status) => {
    try {
      await axios.post(`http://localhost:5000/api/quizzes/enrollment-requests/${requestId}`, {
        status
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Refresh the requests list
      fetchRequests();
    } catch (err) {
      setError('Failed to process enrollment request');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
        Enrollment Requests
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {requests.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
          <Typography color="textSecondary">
            No pending enrollment requests
          </Typography>
        </Paper>
      ) : (
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <List>
            {requests.map((request, index) => (
              <React.Fragment key={request._id}>
                {index > 0 && <Divider />}
                <ListItem sx={{ py: 3 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="h6" component="span">
                          {request.quiz.title}
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip
                            icon={<PersonIcon />}
                            label={request.user.username}
                            size="small"
                            sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)', color: '#1976d2' }}
                          />
                          <Chip
                            icon={<AccessTimeIcon />}
                            label={new Date(request.createdAt).toLocaleDateString()}
                            size="small"
                            sx={{ backgroundColor: 'rgba(25, 118, 210, 0.08)', color: '#1976d2' }}
                          />
                        </Box>
                      </Box>
                    }
                    secondary={
                      request.message && (
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                          "{request.message}"
                        </Typography>
                      )
                    }
                  />
                  <ListItemSecondaryAction sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleRequest(request._id, 'approved')}
                      sx={{
                        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                        }
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRequest(request._id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default EnrollmentRequests; 