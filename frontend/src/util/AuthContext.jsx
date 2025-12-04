import React, { createContext, useContext, useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Notifications unread counter (shared globally)
  const [unreadCount, setUnreadCount] = useState(0);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (_) {}
    setUser(null);
  };

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (res.status === 401) {
        setUser(null);
        return false;
      }

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      setUser(data.user);
      return true;
    } catch (_) {
      setUser(null);
      return false;
    }
  };

  // Shared function to load notifications and update unread count
  const loadNotifications = async () => {
    try {
      const res = await authFetch("/notifications");
      if (!res.ok) return;

      const data = await res.json();
      const count = data.filter(n => !n.read).length;
      setUnreadCount(count);
    } catch (_) {}
  };

  useEffect(() => {
    (async () => {
      await refreshAccessToken();
      setLoading(false);
      await loadNotifications(); // Load unread count on app start
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
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        authFetch,
        loading,
        refreshAccessToken,
        unreadCount,
        setUnreadCount,
        loadNotifications
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
