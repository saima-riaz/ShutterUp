import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../util/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Fixed typo in variable name
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchUserPhotos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          logout();
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
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
  }, [user, navigate, logout]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-green-200 to-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 rounded-tr-3xl rounded-br-3xl shadow-md">
        <div className="flex items-center gap-2 mb-10">
          <FontAwesomeIcon icon={faCamera} className="text-3xl" />
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
      <main className="flex-1 p-8">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3 text-lg font-medium text-gray-700">
            <button onClick={() => navigate('/', { replace: true})} className="hover:text-blue-600">Home</button>
            <button className="hover:text-blue-600">Explore</button>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/upload')} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Upload</button>
            <button onClick={logout} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Logout
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.length === 0 ? (
            <p className="text-gray-500">No photos uploaded yet.</p>
          ) : (
            photos.map((photo) => (
              <div 
                key={photo._id} 
                className="relative w-full h-48 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img 
                  src={photo.imageUrl} 
                  alt="User upload"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'placeholder-image-url.jpg'
                  }}
                />
              </div>
            ))
          )}
        </div>

        {/* upload image full-size view */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div 
              className="relative max-w-4xl w-full rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking content
            >
              <button // close button
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 z-10 hover:bg-opacity-75 transition"
                onClick={() => setSelectedPhoto(null)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <img 
                src={selectedPhoto.imageUrl} 
                alt="Full size preview"
                className="w-full max-h-[90vh] object-contain"
              />
              <div className="p-4">
                {selectedPhoto.caption && (
                  <p className="text-white">{selectedPhoto.caption}</p>
                )}
                <p className="text-sm text-white mt-2">
                  Uploaded on {new Date(selectedPhoto.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;