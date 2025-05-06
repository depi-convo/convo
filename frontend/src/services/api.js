import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Update this with your backend URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for handling cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  check: () => api.get('/auth/check'),
  updateProfile: (data) => api.put('/auth/update-profile', data),
};

// User social actions
export const social = {
  addFriend: (friendId) => api.post('/auth/add-friend', { friendId }),
  removeFriend: (friendId) => api.post('/auth/remove-friend', { friendId }),
  blockUser: (blockId) => api.post('/auth/block-user', { blockId }),
  unblockUser: (blockId) => api.post('/auth/unblock-user', { blockId }),
  getFriends: () => api.get('/auth/friends'),
  getBlocked: () => api.get('/auth/blocked'),
};

// Messages endpoints
export const messages = {
  send: (data) => api.post('/messages/send', data),
  getConversation: (otherUserId) => api.get(`/messages/conversation/${otherUserId}`),
  getInbox: () => api.get('/messages/inbox'),
  deleteMessage: (messageId) => api.delete(`/messages/${messageId}`),
};

// Groups endpoints
export const groups = {
  create: (data) => api.post('/groups', data),
  getGroups: () => api.get('/groups'),
  getGroup: (groupId) => api.get(`/groups/${groupId}`),
  updateGroup: (groupId, data) => api.put(`/groups/${groupId}`, data),
  deleteGroup: (groupId) => api.delete(`/groups/${groupId}`),
  addMember: (groupId, userId) => api.post(`/groups/${groupId}/members`, { userId }),
  removeMember: (groupId, userId) => api.delete(`/groups/${groupId}/members/${userId}`),
  sendMessage: (groupId, content) => api.post(`/groups/${groupId}/messages`, { content }),
  getMessages: (groupId) => api.get(`/groups/${groupId}/messages`),
};

export default api; 