import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCamera} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPhotos = async () => {
      try {
        // Get token and user from localStorage
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem("user"));
        
        const response = await fetch('http://localhost:5000/api/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          // clear everything if Token is invalid or expired
          localStorage.removeItem('token');
          localStorage.removeItem("user");
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPhotos();
  }, [navigate]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-green-100 to-blue-200">
    {/* Sidebar */}
    <aside className="w-64 bg-white p-6 rounded-tr-3xl rounded-br-3xl shadow-md">
      <div className="flex items-center gap-2 mb-10">
      <FontAwesomeIcon icon={faCamera} className=" text-3xl "/>
        <h1 className="text-2xl font-lavish font-bold text-gray-800">ShutterUp</h1>
      </div>
      <nav className="flex flex-col gap-4 text-gray-700 font-medium">
        <button className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg">
          📊 <span>Dashboard</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
          ❤️ <span>Favorites</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
          🔔 <span>Notifications</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
          👤 <span>Profile</span>
        </button>
      </nav>
    </aside>
  
    {/* Main content */}
    <main className="flex- p-8">
      {/* Top Navbar */}
      <div className="flex justify-end mb-4">
        <div className="flex gap-3 text-lg font-medium text-gray-700">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">Home</button>
          <button className="hover:text-blue-600">Explore</button>
        </div>
        <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg">
          Upload
        </button>
      </div>
  
      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {photos.length === 0 ? (
          <p className="text-gray-500">No photos uploaded yet.</p>
        ) : (
          photos.map((photo, index) => (
            <div key={index} className="w-full h-48 bg-gray-300 rounded-lg shadow-inner animate-pulse">
              {/* Placeholder - Replace with <img src={photo.url} alt="..." /> */}
            </div>
          ))
        )}
      </div>
    </main>
  </div>
  
  );
};

export default Dashboard;