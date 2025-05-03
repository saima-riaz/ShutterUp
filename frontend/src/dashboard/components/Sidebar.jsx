import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onLogout, onUpload }) => {  // Add onUpload prop
  const navigate = useNavigate();

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
          🖼️ Create Gallery
        </button>
        <button 
          onClick={onUpload}  // Add Upload button
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
        >
          <FontAwesomeIcon icon={faUpload} /> Upload
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
          ❤️ Favorites
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
          🔔 Notifications
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