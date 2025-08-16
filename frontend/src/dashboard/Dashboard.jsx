import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../util/AuthContext";
import { fetchUserPhotos, fetchGalleries, deleteGallery, deletePhoto } from "../util/photoAPI";
import Sidebar from "./components/Sidebar";
import PhotoGrid from "./components/PhotoGrid";
import PhotoModal from "./components/PhotoModal";
import GalleryCard from "../gallery/components/GalleryCard";

const Dashboard = () => {
  const { user, logout, loading, authFetch } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loadingContent, setLoadingContent] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const loadPhotos = async () => {
    try {
      setLoadingContent(true);
      const [photosData, galleriesData] = await Promise.all([
        fetchUserPhotos(authFetch),
        fetchGalleries(authFetch)
      ]);

      const photosInGalleries = new Set();
      galleriesData.forEach(gallery => {
        gallery.photos?.forEach(photo => photosInGalleries.add(photo._id));
      });

      const standalonePhotos = photosData.filter(photo => !photosInGalleries.has(photo._id));

      setPhotos(standalonePhotos);
      setGalleries(galleriesData);
      setError(null);
    } catch (err) {
      setError(err.message || err.toString());
      if (err.message?.includes("401")) logout();
    } finally {
      setLoadingContent(false);
    }
  };

  const handleDeleteGallery = async (galleryId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this gallery?")) return;

    try {
      setDeletingId(galleryId);
      await deleteGallery(authFetch, galleryId);
      await loadPhotos();
    } catch (err) {
      setError(err.message || err.toString());
    } finally {
      setDeletingId(null);
    }
  };

  const handleRemovePhoto = async (photoId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    try {
      await deletePhoto(authFetch, photoId);
      await loadPhotos();
    } catch (err) {
      setError(err.message || err.toString());
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    } else if (!loading) {
      loadPhotos();
    }
  }, [user, loading, navigate, logout]);

  if (loading) return <div className="grid place-items-center h-screen">Loading session...</div>;
  if (loadingContent) return <div className="p-8">Loading content...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-b from-teal-200 to-blue-300">
      <Sidebar
        onLogout={logout}
        onUpload={() => navigate("/upload")}
      />

      <main className="flex-1 p-8">
        {galleries.length > 0 && (
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your Galleries</h2>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {galleries.map(gallery => (
                <div key={gallery._id} className="h-full">
                  <div
                    className="bg-white h-full flex flex-col justify-between p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer relative"
                    onClick={() => navigate(`/gallery/${gallery.url}`)}
                  >
                    <GalleryCard
                      galleryId={gallery._id}
                      onSuccess={loadPhotos}
                    />
                    <h3 className="font-bold text-lg mb-2">{gallery.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{gallery.description}</p>
                    <div className="text-blue-600 text-sm">View Gallery →</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <PhotoGrid
          photos={photos}
          onPhotoClick={setSelectedPhoto}
          refreshPhotos={loadPhotos}
          galleries={galleries}
          handleRemovePhoto={handleRemovePhoto}
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
