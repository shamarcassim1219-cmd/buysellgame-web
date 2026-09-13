import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!api.getToken());
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      api.getProfile().then(setProfile).catch(() => {});
    }
  }, [isLoggedIn]);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    api.clearToken();
    setIsLoggedIn(false);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
