import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { deletePhoto } from '../../util/photoAPI';
import { useAuth } from '../../util/AuthContext';

const ImageCard = ({ photoId, onSuccess, galleries }) => {
  const { authFetch } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingToGallery, setIsAddingToGallery] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState('');
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this photo?')) return;

    setIsDeleting(true);
    setError(null);

    try {
      await deletePhoto(authFetch, photoId);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to delete photo');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddToGallery = async (e) => {
    e.stopPropagation();
    if (!selectedGallery) return;

    setIsAddingToGallery(true);
    setError(null);

    try {
      const response = await authFetch(`/gallery/${selectedGallery}/add-photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add to gallery');
      }

      alert('Added to gallery successfully!');
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAddingToGallery(false);
    }
  };

  return (
    <div className="absolute top-2 right-2 space-y-2" onClick={(e) => e.stopPropagation()}>
      {galleries?.length > 0 && (
        <div className="flex gap-1 bg-white bg-opacity-70 p-1 rounded">
          <select
            value={selectedGallery}
            onChange={(e) => setSelectedGallery(e.target.value)}
            className="text-sm p-1 border rounded"
            disabled={isAddingToGallery}
          >
            <option value="">Add to...</option>
            {galleries.map((gallery) => (
              <option key={gallery._id} value={gallery.url}>
                {gallery.title}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddToGallery}
            disabled={!selectedGallery || isAddingToGallery}
            className="text-black hover:text-blue-800 disabled:opacity-80"
            title="Add to gallery"
          >
            <FontAwesomeIcon icon={faPlus} size="md" />
            {isAddingToGallery && '...'}
          </button>
        </div>
      )}

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="block ml-auto text-red-600 hover:text-red-800 disabled:opacity-50"
        title="Delete photo"
      >
        <FontAwesomeIcon icon={faTrash} />
        {isDeleting && <span className="ml-1">...</span>}
      </button>

      {error && (
        <div className="absolute top-full right-0 mt-1 bg-red-100 text-red-800 text-xs p-1 rounded max-w-xs">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageCard;
