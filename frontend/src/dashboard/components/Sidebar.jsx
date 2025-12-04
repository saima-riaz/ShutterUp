import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../util/AuthContext";
import { useEffect } from "react";

const Sidebar = ({ onLogout, onUpload }) => {
  const navigate = useNavigate();
  const { user, unreadCount, loadNotifications } = useAuth();

  useEffect(() => {
    // loadNotifications(); 
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
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            {user?.firstName || user?.username || "ShutterUp"}
            {user?.lastName ? ` ${user.lastName}` : ""}
          </h1>
          <p className="text-sm text-gray-500">
            {user?.username && !user?.firstName ? `@${user.username}` : "Welcome"}
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-4 text-gray-700 font-medium">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg">
          Home
        </button>

        <button onClick={() => navigate("/gallery")} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
          Create Your Gallery
        </button>

        <button onClick={onUpload} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
          <FontAwesomeIcon icon={faUpload} /> Upload
        </button>

        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
          Favorites
        </button>

        <button
          onClick={() => navigate("/notifications")}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg relative"
        >
          <FontAwesomeIcon icon={faBell} />
          Notifications

          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 hover:bg-red-100 text-red-600 rounded-lg mt-4"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
