import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (!token) {
        navigate('/'); // Redirect to login if no token
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
          await refreshToken(); // Try refreshing if expired
        } else {
          setIsAuthorized(true); // Token is valid, grant access
        }
      } catch (error) {
        console.error('Token decode error:', error);
        navigate('/');
      }
    };

    const refreshToken = async () => {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) {
        navigate('/');
        return;
      }

      try {
        const res = await api.post('/api/token/refresh', { refresh: refreshToken });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } catch (error) {
        console.error('Token refresh error:', error);
        navigate('/');
      }
    };

    auth(); // Call authentication on component mount
  }, [navigate]);

  // Render only if authorized, else show loading
  if (!isAuthorized) return <div>Loading...</div>;
  return children;
}

export default ProtectedRoute;
