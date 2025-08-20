import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

/**
 * Displays a full-screen view of the selected photo with next/previous looping
 * Props:
 * - photo: The current photo object
 * - onClose: Function to call when closing the modal
 * - photos: Array of all photos in the gallery
 * - currentIndex: Index of the current photo in photos array
 */

const PhotoModal = ({ photo, onClose, photos = [], currentIndex = 0 }) => {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex); // Update index if modal opens with a different photo
  }, [currentIndex]);

  if (!photos.length) return null; // Safety check

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % photos.length); // Loop from last → first
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + photos.length) % photos.length); // Loop from first → last
  };

  const currentPhoto = photos[index];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full rounded-lg overflow-hidden flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous button */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 z-10 hover:bg-opacity-75 transition"
          onClick={handlePrev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {/* Next button */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 z-10 hover:bg-opacity-75 transition"
          onClick={handleNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        {/* Close button */}
        <button
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 z-10 hover:bg-opacity-75 transition"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Photo */}
        <img
          src={currentPhoto.imageUrl}
          alt="Full size preview"
          className="w-full max-h-[90vh] object-contain"
        />

        {/* Caption and date at bottom */}
<div className="absolute bottom-0 w-full bg-opacity-50 text-center">
  {currentPhoto.caption && (
    <p className="text-white text-sm truncate">{currentPhoto.caption}</p>
  )}
  <p className="text-xs text-black-100 mt-1">
    Uploaded on {new Date(currentPhoto.createdAt).toLocaleDateString()}
  </p>
</div>


      </div>
    </div>
  );
};

export default PhotoModal;
