import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../apiconfig.jsx';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';

  const login = async ({ username, password }) => {
    try {
      const response = await axiosInstance.post('users/login/', { username, password });
      const userData = response.data;

      localStorage.setItem('authToken', userData.token);
      localStorage.setItem('user', userData.username);

      console.log('User logged in:', userData.username);
      setUser(userData.username);

      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const sellerLogin = async ({ username, password }) => {
    try {
      const response = await axiosInstance.post('users/seller-login/', { username, password });
      const userData = response.data;

      localStorage.setItem('authToken', userData.access);
      localStorage.setItem('user', userData.username);

      setUser(userData.username);
      navigate('/seller-dashboard', { replace: true });
      window.location.reload();
    } catch (error) {
      console.error('Seller login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('users/logout/', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);

      navigate('/seller-login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Retrieved user from localStorage:', storedUser);
    if (storedUser) {
      setUser(storedUser);
    } else {
      console.log('No user found in localStorage');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, sellerLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
