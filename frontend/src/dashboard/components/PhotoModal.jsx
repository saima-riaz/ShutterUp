import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronLeft, faChevronRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useAuth } from "../../util/AuthContext";

const PhotoModal = ({
  photo,
  onClose,
  photos = [],
  currentIndex = 0,
  shared = false,
  viewerEmail,
  galleryId,

}) => {
  const { authFetch, loadNotifications } = useAuth();
  const [index, setIndex] = useState(currentIndex);
  const [liked, setLiked] = useState(false);

  const currentPhoto = photos[index];

  useEffect(() => {
    setIndex(currentIndex);
    setLiked(false); // reset like state on photo switch
  }, [currentIndex, photo]);

  const handleNext = () => setIndex((prev) => (prev + 1) % photos.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const handleLike = async () => {
    if (liked) return; // prevent multiple likes
    try {
      await authFetch("/notifications/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          viewerEmail,
          galleryId,
    
          
        }),
      });
      setLiked(true);
      loadNotifications(); // update sidebar badge
    } catch (err) {
      console.error("Failed to like photo:", err);
    }
  };

  if (!photos.length) return null;

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
        <div className="absolute bottom-0 w-full bg-black bg-opacity-20 p-1 text-center">
          {currentPhoto.caption && (
            <p className="text-white text-sm truncate">{currentPhoto.caption}</p>
          )}
          <p className="text-white text-sm mt-1">
            Uploaded on {new Date(currentPhoto.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Like Button for shared galleries */}
        {shared && (
          <button
            onClick={handleLike}
            className={`absolute top-3 left-2 p-2 rounded-full transition ${
              liked ? "text-red-500" : "text-white"
            }`}
          >
            <FontAwesomeIcon icon={faHeart} size="2x" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PhotoModal;
