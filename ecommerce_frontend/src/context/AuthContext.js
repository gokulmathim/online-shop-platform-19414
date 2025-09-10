import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthAPI } from '../api/endpoints';

const AuthContext = createContext(undefined);

// PUBLIC_INTERFACE
export const AuthProvider = ({ children }) => {
  /** Provides auth state, user info and actions to children components. */
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      const data = await AuthAPI.me();
      setUser(data?.user || data);
    } catch (e) {
      setUser(null);
    } finally {
      setInitializing(false);
    }
  }, []);

  useEffect(() => {
    // On mount, if token exists, fetch profile
    const token = localStorage.getItem('auth_token');
    if (token) {
      loadProfile();
    } else {
      setInitializing(false);
    }
  }, [loadProfile]);

  const login = useCallback(async (email, password) => {
    const data = await AuthAPI.login(email, password);
    if (data?.token) {
      localStorage.setItem('auth_token', data.token);
    }
    await loadProfile();
    return data;
  }, [loadProfile]);

  const register = useCallback(async (payload) => {
    const data = await AuthAPI.register(payload);
    if (data?.token) {
      localStorage.setItem('auth_token', data.token);
      await loadProfile();
    }
    return data;
  }, [loadProfile]);

  const logout = useCallback(async () => {
    try { await AuthAPI.logout(); } catch (e) { /* noop */ }
    localStorage.removeItem('auth_token');
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    initializing,
    login,
    register,
    logout,
    refresh: loadProfile
  }), [user, initializing, login, register, logout, loadProfile]);

  return (
    <AuthContext.Provider value={value}>
      {!initializing && children}
    </AuthContext.Provider>
  );
};

// PUBLIC_INTERFACE
export const useAuth = () => {
  /** Hook to access auth context */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
