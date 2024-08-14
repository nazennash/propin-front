import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || '/';
  console.log(redirectPath)



  const login = (user) => {
    const name = localStorage.getItem('name', JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(name));
    setUser(user);
    navigate(redirectPath, { replace: true });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // navigate('/login', { replace: true });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);