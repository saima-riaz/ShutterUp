import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteGallery } from '../../util/photoAPI';

/* ===== GALLERY CARD COMPONENT ===== */
/**
 * Handles gallery deletion with confirmation
 * Shows loading state and error messages
 */
const GalleryCard = ({ galleryId, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  /* ===== DELETE HANDLER ===== */
  const handleDelete = async (e) => {
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this gallery?')) {
      return;
    }
    
    setIsDeleting(true);
    setError(null);
    
    try {
      await deleteGallery(galleryId);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div 
      className="absolute top-2 right-2 rounded-full p-2"
      onClick={(e) => e.stopPropagation()}
    >
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
      
      {error && (
        <div className="absolute top-full right-0 mt-1 bg-red-100 text-red-800 text-xs p-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default GalleryCard;