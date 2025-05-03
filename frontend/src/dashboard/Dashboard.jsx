import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../util/AuthContext";
import { fetchUserPhotos, fetchGalleries } from "../util/photoAPI";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import PhotoGrid from "./components/PhotoGrid";
import PhotoModal from "./components/PhotoModal";
import LoadingState from "./components/LoadingState";

/**
 * Main Dashboard Container
 * Handles:
 * - Authentication state
 * - Data loading
 * - Error handling
 * - State management
 */
const Dashboard = () => {
  const { user, logout, isLoading } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const navigate = useNavigate();

  // Load user photos and galleries
  const loadPhotos = async () => {
    try {
      const [photosData, galleriesData] = await Promise.all([
        fetchUserPhotos(),
        fetchGalleries()
      ]);
      setPhotos(photosData);
      setGalleries(galleriesData);
    } catch (err) {
      setError(err.message);
      if (err.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    } else if (!isLoading) {
      loadPhotos();
    }
  }, [user, isLoading, navigate, logout]);

  if (isLoading) return <LoadingState type="auth" />;
  if (loading) return <LoadingState type="content" />;
  if (error) return <LoadingState type="error" error={error} />;

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-green-200 to-blue-100">
      <Sidebar onLogout={logout}
      onUpload={() => navigate('/upload')}
      />
      <main className="flex-1 p-8">
           
        {/* Add this Galleries section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Galleries</h2>
          
        </div>

        {galleries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {galleries.map(gallery => (
              <div 
                key={gallery._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/gallery/${gallery.url}`)}
              >
                <h3 className="font-bold text-lg mb-2">{gallery.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{gallery.description}</p>
                <div className="text-blue-600 text-sm">View Gallery →</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center mb-8">
            <p className="text-gray-500 mb-4">You haven't created any galleries yet</p>
            <button
              onClick={() => navigate('/gallery/create')}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Create Your First Gallery
            </button>
          </div>
        )}
      </section>

        
        <PhotoGrid 
          photos={photos} 
          onPhotoClick={setSelectedPhoto}
          refreshPhotos={loadPhotos}
        />

        {selectedPhoto && (
          <PhotoModal 
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;