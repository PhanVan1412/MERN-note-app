import React, { createContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigation = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribed = auth.onIdTokenChanged((user) => {
      console.log('[From auth provider line 14]', { user });
      if (user?.uid) {
        setUser(user);
        localStorage.setItem('accessToken', user.accessToken);
        return;
      }

      //reset user
      setUser({});
      localStorage.clear();
      navigation('/login');
    });

    return () => {
      unsubscribed();
    };
  }, [auth]);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
