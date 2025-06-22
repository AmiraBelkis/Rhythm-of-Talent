import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import axios from 'axios';
import { getRedirectionUrl } from '@/lib/user';

const AuthContext = createContext(null);

const AuthProviderInternal = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Keep user/token in sync with localStorage
  useEffect(() => {
    const handleStorage = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorage);
    handleStorage();
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.get(`/login.json`);
      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      const url = getRedirectionUrl(data.user);
      navigate(url);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      let message = t('loginErrorMessage');
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    navigate('/sign-in');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  return <AuthProviderInternal>{children}</AuthProviderInternal>;
};

export const useAuth = () => useContext(AuthContext);
