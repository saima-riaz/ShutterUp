import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faChevronLeft, faChevronRight, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
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
  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  const currentPhoto = photos[index];

  useEffect(() => {
    setIndex(currentIndex);
    setLiked(false);
    setComment("");
    setShowCommentBox(false);
  }, [currentIndex, photo]);

  const handleNext = () => setIndex((prev) => (prev + 1) % photos.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const handleLike = async () => {
    if (liked) return;
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
      loadNotifications();
    } catch (err) {
      console.error("Failed to like photo:", err);
    }
  };

  // Handle comment submission
  const handleComment = async () => {
    if (!comment.trim()) return;
    
    try {
     
      await authFetch("/notifications/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          viewerEmail,
          galleryId,
          photoId: currentPhoto._id,
          commentText: comment.trim(),
        }),
      });
      
      setComment("");
      setShowCommentBox(false);
      loadNotifications();
    } catch (err) {
      console.error("Failed to post comment:", err);
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

        {/* Like & Comment Buttons for shared galleries */}
        {shared && (
          <>
            <button
              onClick={handleLike}
              className={`absolute top-3 left-2 p-2 rounded-full transition ${
                liked ? "text-red-500" : "text-white"
              }`}
            >
              <FontAwesomeIcon icon={faHeart} size="2x" />
            </button>

            {/* Comment button */}
            <button
              onClick={() => setShowCommentBox(!showCommentBox)}
              className="absolute top-20 left-2 p-2 rounded-full text-white hover:bg-opacity-50 transition"
            >
              <FontAwesomeIcon icon={faComment} size="2x" />
            </button>
          </>
        )}

        {/* Comment input box */}
        {shared && showCommentBox && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-4/5 bg-white p-4 rounded-lg shadow-lg">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full p-2 border rounded mb-2"
              rows="3"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setShowCommentBox(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleComment}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Post Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoModal;