import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:5000/api';
  
  // Add response interceptor for error handling
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user data
      axios.get('/auth/me')
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', {
        email,
        password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return user;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to login. Please try again.';
      throw new Error(message);
    }
  };

  const register = async (username, email, password) => {
    try {
      // Validate input
      if (!username || !email || !password) {
        throw new Error('All fields are required');
      }

      // Make the registration request
      const response = await axios.post('/auth/register', {
        username,
        email,
        password
      });

      const { token, user } = response.data;
      
      // Save token and update axios headers
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update user state
      setUser(user);
      return user;
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'User already exists');
      }
      if (error.response?.status === 422) {
        throw new Error('Invalid input data');
      }
      throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 