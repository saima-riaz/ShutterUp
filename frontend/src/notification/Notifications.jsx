import { useEffect, useState } from "react";
import { useAuth } from "../util/AuthContext";

export default function Notifications() {
  const { authFetch, setUnreadCount } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const res = await authFetch("/notifications");
      if (!res.ok) throw new Error("Failed to load notifications");
      const data = await res.json();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    } catch (_) {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  const clearAll = async () => {
    try {
      const res = await authFetch("/notifications", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to clear notifications");
      setNotifications([]);
      setUnreadCount(0);
    } catch (_) {}
  };

  const markAllAsRead = async () => {
    try {
      const res = await authFetch("/notifications/mark-read", { method: "PATCH" });
      if (!res.ok) throw new Error("Failed to mark notifications as read");
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (_) {}
  };

  

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-teal-200 to-blue-300 flex items-start justify-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={markAllAsRead}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Mark as Read
              </button>
              <button
                onClick={clearAll}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-gray-500">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500">You have no notifications</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {notifications.map(n => (
              <li
                key={n._id}
                className={`py-4 flex flex-col ${
                  n.read ? "bg-gray-100 text-gray-400" : "bg-white text-gray-800"
                } rounded-md px-2`}
              >
                <p className="flex justify-between items-center">
                  <span>{n.message}</span>

                    {n.read && (
                  <span className="text-xs font-semibold bg-gray-300 text-gray-700 px-2 py-1 rounded-full">
                    Read
                  </span>
                )}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
                
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
