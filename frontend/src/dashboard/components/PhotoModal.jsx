import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const PhotoModal = ({ photo, onClose, photos = [], currentIndex = 0, shared = false }) => {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  if (!photos.length) return null;

  const handleNext = () => setIndex((prev) => (prev + 1) % photos.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);

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
        {/* Previous */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 z-10 hover:bg-opacity-75 transition"
          onClick={handlePrev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {/* Next */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 z-10 hover:bg-opacity-75 transition"
          onClick={handleNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        {/* Close */}
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

        {/* Caption */}
        <div className="absolute bottom-0 w-full bg-opacity-50 text-center">
          {currentPhoto.caption && (
            <p className="text-white text-sm truncate">{currentPhoto.caption}</p>
          )}
          <p className="text-xs text-black-100 mt-1">
            Uploaded on {new Date(currentPhoto.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Remove photo button (only if not shared) */}
        {!shared && (
          <div className="absolute top-2 left-2">
            {/* You can place a remove/delete button here if needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoModal;
