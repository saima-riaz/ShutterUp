import { useNavigate } from "react-router-dom";

const TopNav = ({ onUpload, onLogout }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-2 text-md font-medium text-gray-700">
        <button onClick={() => navigate('/')} className="hover:text-blue-600">Home</button>
        <button onClick={() => navigate('/gallery')} 
        className= "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-gray-800 transition"
        >
        Create Gallery</button>
      </div>
      <div className="flex gap-2">
        {/* 
        <button onClick={onUpload} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-gray-800 transition">
          Upload
        </button> */}
        <button onClick={onLogout} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-gray-800 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopNav;