import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGalleryByUrl } from '../util/photoAPI';
import PhotoGrid from "../dashboard/components/PhotoGrid";
import PhotoModal from "../dashboard/components/PhotoModal";

const GalleryDetail = () => {
  const { url } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const data = await fetchGalleryByUrl(url);
        setGallery(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, [url]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!gallery) return <div className="p-8">Gallery not found</div>;

  return (
    <div className="p-8 min-h-screen">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>
      
      <h1 className="text-3xl font-bold mb-2">{gallery.title}</h1>
      <p className="text-gray-700 mb-6">{gallery.description}</p>
      
      {/* Use PhotoGrid component instead of manual grid */}
      <div className="mt-8">
        <PhotoGrid
          photos={gallery.photos || []}
          onPhotoClick={setSelectedPhoto}
          refreshPhotos={() => fetchGalleryByUrl(url).then(setGallery)}
        />
      </div>

      {/* Photo modal for enlarged view */}
      {selectedPhoto && (
        <PhotoModal 
          photo={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)} 
        />
      )}
    </div>
  );
};

export default GalleryDetail;