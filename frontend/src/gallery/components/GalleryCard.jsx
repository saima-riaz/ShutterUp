import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteGallery, shareGallery } from '../../util/photoAPI';
import { useAuth } from '../../util/AuthContext';

const GalleryCard = ({ galleryId, onSuccess, shared = false }) => {
  const { authFetch } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this gallery?')) return;

    setIsDeleting(true);
    setError(null);

    try {
      await deleteGallery(authFetch, galleryId);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to delete gallery');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    setIsSharing(true);
    setError(null);

    try {
      const { shareUrl } = await shareGallery(authFetch, galleryId);
      await navigator.clipboard.writeText(shareUrl);
      alert(`Share link copied!\n${shareUrl}`);
    } catch (err) {
      setError(err.message || 'Failed to generate share link');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="absolute top-2 right-2 flex flex-col space-y-2" onClick={(e) => e.stopPropagation()}>

      {/* Delete button - only if not shared */}
      {!shared && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-800 transition-colors"
          title="Delete gallery"
          aria-label="Delete gallery"
        >
          <FontAwesomeIcon icon={faTrash} />
          {isDeleting && <span className="ml-1">...</span>}
        </button>
      )}

      {/* Share button - only if not shared */}
      {!shared && (
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="text-blue-600 hover:text-blue-800 transition-colors"
          title="Share gallery"
          aria-label="Share gallery"
        >
          <FontAwesomeIcon icon={faShareAlt} />
          {isSharing && <span className="ml-1">...</span>}
        </button>
      )}

      {error && (
        <div className="absolute top-full right-0 mt-1 bg-red-100 text-red-800 text-xs p-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default GalleryCard;
