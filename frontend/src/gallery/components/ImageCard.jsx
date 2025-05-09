import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { deletePhoto } from '../../util/photoAPI';

/* ===== IMAGE CARD COMPONENT ===== */
/**
 * Handles photo deletion with confirmation
 * Shows loading state and error messages
 */
const ImageCard = ({ photoId, onSuccess, galleries }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState('');
  const [error, setError] = useState(null);

  /* ===== DELETE HANDLER ===== */    
    const handleDelete = async (e) => {
      e.stopPropagation();
      if (!window.confirm('Are you sure you want to delete this photo?')) return;
      
      setIsDeleting(true);
      try {
        await deletePhoto(photoId);
        onSuccess();
      } catch (err) {
        setError(err.message);
      } finally {
        setIsDeleting(false);
      }
    };
/* ========= GALLERY HANDLER========*/

const handleAddToGallery = async (e) => {
  e.stopPropagation();
  if (!selectedGallery) return;

  try {
    const response = await fetch(`/api/gallery/${selectedGallery}/add-photo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoId }),
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to add to gallery');
    alert('Added to gallery!');
  } catch (err) {
    setError(err.message);
  }
};

 // return (
   // <div 
     // className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-2"
      //onClick={(e) => e.stopPropagation()}>

      //<button
        //onClick={handleDelete}
        //disabled={isDeleting}
        //className="text-red-600 hover:text-red-800 transition-colors"
       // title="Delete photo"
       // aria-label="Delete photo">
       // <FontAwesomeIcon icon={faTrash} />
        //{isDeleting && <span className="ml-1">...</span>}
      //</button>
      
      //{error && (
        //<div className="absolute top-full right-0 mt-1 bg-red-100 text-red-800 text-xs p-1 rounded">
         // {error}
        //</div>
      //)}
   // </div>
  //);
//};

return (
  <div 
    className="absolute top-2 right-2 space-y-2"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Gallery selector */}
    {galleries && (
      <div className="flex gap-1 bg-white bg-opacity-70 p-1 rounded">
        <select 
          value={selectedGallery}
          onChange={(e) => setSelectedGallery(e.target.value)}
          className="text-xs p-1 border rounded"
        >
          <option value="">Add to...</option>
          {galleries.map(gallery => (
            <option key={gallery._id} value={gallery.url}>
              {gallery.title}
            </option>
          ))}
        </select>
        <button 
          onClick={handleAddToGallery}
          disabled={!selectedGallery}
          className="text-blue-600 hover:text-blue-800"
          title="Add to gallery"
        >
          <FontAwesomeIcon icon={faBookmark} size="xs"/>
        </button>
      </div>
    )}

    {/* Delete button */}
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="block ml-auto text-red-600 hover:text-red-800"
      title="Delete photo"
    >
      <FontAwesomeIcon icon={faTrash} />
      {isDeleting && <span className="ml-1">...</span>}
    </button>

    {error && (
      <div className="text-red-500 text-xs">
        {error}
      </div>
    )}
  </div>
);
};

export default ImageCard;