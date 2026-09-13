import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem('aeropulse_auth_token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const res = await axios.get('http://localhost:5000/api/auth/me');
          setUser(res.data.user);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Failed to fetch user:', err);
          localStorage.removeItem('aeropulse_auth_token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };
    fetchMe();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user: userData } = response.data;
      localStorage.setItem('aeropulse_auth_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      const { token, user: userData } = response.data;
      localStorage.setItem('aeropulse_auth_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      return { success: false, error: error.response?.data?.error || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('aeropulse_auth_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateAvatar = async (avatarBase64) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/avatar', { avatarBase64 });
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      console.error("Update avatar failed:", error);
      return { success: false, error: 'Failed to update avatar' };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, register, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
