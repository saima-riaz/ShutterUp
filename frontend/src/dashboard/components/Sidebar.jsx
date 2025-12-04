import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../util/AuthContext";

const Sidebar = ({ onLogout, onUpload }) => {
  const navigate = useNavigate();
  const { authFetch, user, unreadCount, setUnreadCount, loadNotifications } = useAuth();

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const res = await authFetch("/notifications/mark-read", { method: "PATCH" });
      if (res.ok) setUnreadCount(0);
    } catch (_) {}
  };

  // Fetch unread notifications count periodically
  useEffect(() => {
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-64 bg-white p-6 rounded-tr-3xl rounded-br-3xl shadow-md">
      <div
        className="flex items-center gap-3 mb-10 cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <img
          src={user?.profilePic || "/images/default-avatar.png"}
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            {user?.firstName || user?.username || "ShutterUp"} {user?.lastName || ""}
          </h1>
          <p className="text-sm text-gray-500">
            {user?.username && !user?.firstName ? `@${user.username}` : "Welcome"}
          </p>
        </div>
      </div>

      <nav>
        <ul className="flex flex-col gap-3 text-gray-700 font-medium">
          <li>
            <button
              onClick={() => navigate("/")}
              className="w-full text-left flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
            >
              📊 Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/gallery")}
              className="w-full text-left flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              🖼️ Create Your Gallery
            </button>
          </li>
          <li>
            <button
              onClick={onUpload}
              className="w-full text-left flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FontAwesomeIcon icon={faUpload} /> Upload
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/favorites")}
              className="w-full text-left flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              ❤️ Favorites
            </button>
          </li>
          <li className="relative">
            <button
              onClick={() => navigate("/notifications")}
              onDoubleClick={markAllAsRead} // optional: double click to mark all read
              className="w-full text-left flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FontAwesomeIcon icon={faBell} /> Notifications
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </li>
          <li>
            <button
              onClick={onLogout}
              className="w-full text-left flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-100 text-red-600 transition mt-4"
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
