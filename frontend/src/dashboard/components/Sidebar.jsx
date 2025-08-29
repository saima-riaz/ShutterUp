import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Sidebar = ({ onLogout, onUpload }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications periodically (every 5s) for real-time updates
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/gallery/notifications`, {
          withCredentials: true,
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    };

    fetchNotifications(); // initial fetch
    const intervalId = setInterval(fetchNotifications, 5000); // fetch every 5s

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <aside className="w-64 bg-white p-6 rounded-tr-3xl rounded-br-3xl shadow-md">
      <div className="flex items-center gap-2 mb-10">
        <FontAwesomeIcon icon={faCamera} className="text-3xl" />
        <h1 className="text-2xl font-bold text-gray-800">ShutterUp</h1>
      </div>

      <nav className="flex flex-col gap-4 text-gray-700 font-medium">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg"
        >
          📊 Home
        </button>

        <button 
          onClick={() => navigate('/gallery')}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
        >
          🖼️ Create Your Gallery
        </button>

        <button 
          onClick={onUpload}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
        >
          <FontAwesomeIcon icon={faUpload} /> Upload
        </button>
        
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
          ❤️ Favorites
        </button>

        {/* Notifications with badge */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
        >
          🔔 Notifications
          {notifications.length > 0 && (
            <span className="absolute right-4 top-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
          👤 Profile
        </button>

        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-2 hover:bg-red-100 text-red-600 rounded-lg mt-4"
        >
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
