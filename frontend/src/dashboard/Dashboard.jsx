import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../util/AuthContext";
import ImageCard from '../components/ImageCard';


/* ===== MAIN DASHBOARD COMPONENT ===== */
const Dashboard = () => {
  const { user, logout, isLoading } = useAuth();  // Authentication State
  const [photos, setPhotos] = useState([]);// Photo Management State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const navigate = useNavigate(); // Navigation

  /* ===== DATA FETCHING ===== */
  /**
   * Fetches user's photos from API
   * Handles authentication errors and loading states
   */
  const fetchUserPhotos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle unauthorized access
      if (response.status === 401) {logout();
        return;
      }
      // Handle failed requests
      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }

      // Success case
      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ===== EFFECTS ===== */
  /**
   * Main effect hook that:
   * - Checks authentication status
   * - Triggers photo loading when authenticated
   */
  useEffect(() => {
    if (!isLoading && !user) { // Authentication check
      logout();
      navigate('/login');
    } else if (!isLoading) { 
      fetchUserPhotos(); // loading photo,is authenticated
    }
  }, [user, isLoading, navigate, logout]);

  /* ===== RENDER STATES ===== */
  // 1. Initial authentication loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner">Initializing session...</div>
      </div>
    );
  }
  // 2. Photos loading state (shows skeleton UI)
  if (loading) {

    return (
      <div className="flex min-h-screen font-sans bg-gradient-to-br from-green-200 to-blue-100">
        {/* Skeleton sidebar */}
        <aside className="w-64 bg-white p-6 rounded-tr-3xl rounded-br-3xl shadow-md">
          <div className="flex items-center gap-2 mb-10">
            <FontAwesomeIcon icon={faCamera} className="text-3xl" />
            <h1 className="text-2xl font-lavish font-bold text-gray-800">ShutterUp</h1>
          </div>
        </aside>

        {/* Skeleton photo grid */}
        <main className="flex-1 p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </main>
      </div>
    );
  }
// 3. Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="error-message p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      </div>
    );
  }
// ===== MAIN RENDER =====
  return (  
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-green-200 to-blue-100">
      {/*---- Sidebar--- */}
      <aside className="w-64 bg-white p-6 rounded-tr-3xl rounded-br-3xl shadow-md">
        
        {/* App logo */}
        <div className="flex items-center gap-2 mb-10">
          <FontAwesomeIcon icon={faCamera} className="text-3xl" />
          <h1 className="text-2xl font-lavish font-bold text-gray-800">ShutterUp</h1>
        </div>

        {/* Navigation menu side bar */}
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

      {/* ----- Main content  Area ---- */}
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

        {/*---- Photo Grid ----- */}

 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
  {photos.map((photo) => (
    <div 
      key={photo._id} 
      className="relative group hover:shadow-lg transition-shadow"
    >
      <div className="relative w-full h-48 rounded-lg overflow-hidden"
      onClick={() => setSelectedPhoto(photo)}
      >
        <img 
          src={photo.imageUrl} 
          alt="User upload"
          className="w-full h-full object-cover"
        />
        
        {/* Delete button appears on hover */}
        <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ImageCard
            photoId={photo._id}
            onSuccess={fetchUserPhotos}
          />
        </div>
      </div>
    </div>
  ))}
</div>

        {/* ---- image view graphical control ----- */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div 
              className="relative max-w-4xl w-full rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 z-10 hover:bg-opacity-75 transition"
                onClick={() => setSelectedPhoto(null)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              {/* Full-size image */}
              <img 
                src={selectedPhoto.imageUrl} 
                alt="Full size preview"
                className="w-full max-h-[90vh] object-contain"
              />

              {/* Photo metadata */}
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