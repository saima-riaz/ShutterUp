import React, { createContext, useContext, useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Just set user on login
  const login = (userData) => {
    setUser(userData);
  };

  // Logout clears user and calls backend to clear cookie
  const logout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setUser(null);
  };

  // Refresh token flow: fetch user data, update state
  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Refresh token failed");

      const data = await res.json();
      setUser(data.user);
      return true;
    } catch (err) {
      console.error("Refresh token failed:", err.message);
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      await refreshAccessToken(); // try to refresh on page load
      setLoading(false);
    })();
  }, []);
  
  // fetch wrapper: sends cookies, no auth header needed, adds /api prefix if missing
  const authFetch = (url, options = {}) => {
    const apiUrl = url.startsWith("/api") ? url : `/api${url}`;
    const finalOptions = {
      ...options,
      credentials: "include",
    };
    return fetch(`${API_BASE}${apiUrl}`, finalOptions);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authFetch, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
