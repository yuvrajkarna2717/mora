import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const user = searchParams.get('user');

      if (token && user) {
        try {
          const userData = JSON.parse(decodeURIComponent(user));
          
          // Save to localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));

          // Update Redux store
          dispatch(loginSuccess({ token, user: userData }));

          // Send to extension if available
          try {
            if (window.chrome && chrome.runtime && chrome.runtime.sendMessage) {
              chrome.runtime.sendMessage({
                type: 'AUTH_SUCCESS',
                token,
                user: userData
              });
            }
          } catch (error) {
            console.log('Extension not available:', error);
          }

          // Redirect based on original intent
          const redirect = searchParams.get('redirect') || 'dashboard';
          navigate(`/${redirect}`);
        } catch (error) {
          console.error('Auth callback error:', error);
          navigate('/signin');
        }
      } else {
        navigate('/signin');
      }
    };

    handleCallback();
  }, [navigate, searchParams, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;