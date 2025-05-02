import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get user profile
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/users/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Signup user
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};
