import React, { createContext, useContext, useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
  };

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

  // FIXED: Better error handling for refresh token
  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      // Handle 401 (no refresh token) gracefully - this is normal for new users
      if (res.status === 401) {
        setUser(null);
        return false;
      }

      if (!res.ok) {
        throw new Error(`Refresh failed with status: ${res.status}`);
      }

      const data = await res.json();
    setUser(data.user);
    return true;
  } catch (err) {
    // Only log actual errors, not the normal 401 case
    if (!err.message.includes("401")) {
      console.log("Refresh token failed:", err.message);
    }
    setUser(null);
    return false;
  }
};

  useEffect(() => {
    (async () => {
      await refreshAccessToken();
      setLoading(false);
    })();
  }, []);
  
  const authFetch = (url, options = {}) => {
    const apiUrl = url.startsWith("/api") ? url : `/api${url}`;
    const finalOptions = {
      ...options,
      credentials: "include",
    };
    return fetch(`${API_BASE}${apiUrl}`, finalOptions);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authFetch, loading, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}