import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGalleryByUrl } from '../util/photoAPI';

const GalleryDetail = () => {
  const { url } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gallery) return <div>Gallery not found</div>;

  return (
    <div className="p-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>
      
      <h1 className="text-3xl font-bold mb-2">{gallery.title}</h1>
      <p className="text-gray-700 mb-6">{gallery.description}</p>
      
      {/* You can add photos display here later */}
    </div>
  );
};

export default GalleryDetail;