import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ImageCard = ({ photoId, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    
    setIsDeleting(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${photoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Deletion failed');
      }

      onSuccess(); // Refresh the photo list
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-2"
    onClick={e => e.stopPropagation()}
    >
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-600 hover:text-red-800 transition-colors"
        title="Delete photo"
      >
        <FontAwesomeIcon icon={faTrash} />
        {isDeleting && '...'}
      </button>
      {error && (
        <div className="absolute top-full right-0 mt-1 bg-red-100 text-red-800 text-xs p-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageCard;