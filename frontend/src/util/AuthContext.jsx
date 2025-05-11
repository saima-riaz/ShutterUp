import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Wrap logout in useCallback to prevent unnecessary recreations
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  // Wrap login in useCallback
  const login = useCallback((newToken, userData) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  }, []);

  useEffect(() => {
    let isMounted = true; // Track mounted state

    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!storedToken || !storedUser) {
          if (isMounted) setIsLoading(false);
          return;
        }

        const decoded = jwtDecode(storedToken);
        
        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expired - auto logout");
          logout();
          return;
        }

        if (isMounted) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (isMounted) logout();
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initializeAuth();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [logout]); // Only logout as dependency

  // Skip if still loading
  if (isLoading) {
    return null; // Or loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};