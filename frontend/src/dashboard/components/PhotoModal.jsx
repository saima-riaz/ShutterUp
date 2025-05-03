import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

/**
 * Photo Modal Component
 * Displays a full-screen view of the selected photo
 * 
 * Props:
 * - photo: The photo object to display (contains imageUrl, caption, createdAt)
 * - onClose: Function to call when closing the modal
 */
const PhotoModal = ({ photo, onClose }) => (
  <div 
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <div 
      className="relative max-w-4xl w-full rounded-lg overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 z-10 hover:bg-opacity-75 transition"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <img 
        src={photo.imageUrl} 
        alt="Full size preview"
        className="w-full max-h-[90vh] object-contain"
      />

      <div className="p-4 bg-black bg-opacity-50">
        {photo.caption && (
          <p className="text-white">{photo.caption}</p>
        )}
        <p className="text-sm text-white mt-2">
          Uploaded on {new Date(photo.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  </div>
);

export default PhotoModal;  // This is the crucial line that was missing