import { useEffect, useState } from "react";
import { useAuth } from "../util/AuthContext";

export default function Notifications() {
  const { authFetch } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const res = await authFetch("/notifications");
      if (!res.ok) throw new Error("Failed to load notifications");
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Error loading notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = async () => {
    try {
      const res = await authFetch("/notifications", {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to clear notifications");
      setNotifications([]);
    } catch (err) {
      console.error("Error clearing notifications:", err);
    }
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
            <button
              onClick={clearAll}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Clear All
            </button>
          )}
        </div>
        {loading ? (
          <p className="text-gray-500">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500">You have no notifications</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {notifications.map((n) => (
              <li key={n._id} className="py-4 flex flex-col">
                <p className="text-gray-800">
                  {n.viewerEmail} viewed your gallery
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