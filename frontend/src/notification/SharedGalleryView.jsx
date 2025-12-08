import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import PhotoGrid from "../dashboard/components/PhotoGrid";
import PhotoModal from "../dashboard/components/PhotoModal";
import { useAuth } from "../util/AuthContext";

const SharedGalleryView = () => {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { authFetch, loadNotifications } = useAuth();

  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const email = new URLSearchParams(location.search).get("email");

  useEffect(() => {
    if (!email) {
      setError("Email required to view gallery.");
      setLoading(false);
      return;
    }

    const fetchGallery = async () => {
      try {
        const res = await authFetch(`/gallery/public/${token}?email=${email}`);
        if (!res.ok) throw new Error("Failed to load gallery");

        const data = await res.json();
        if (!data.photos) data.photos = [];
        data.photos = data.photos
          .map((photo) => ({ ...photo, url: photo.imageUrl || null }))
          .filter((photo) => photo.url);

        setGallery(data);

        // Notify gallery owner of view
        await authFetch("/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            viewerEmail: email,
            galleryId: data._id,
          }),
        });

        loadNotifications(); // update sidebar badge
      } catch (err) {
        setError(err.message || "Failed to load gallery.");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [token, email]);

  if (loading) return <p className="p-6 text-center">Loading gallery...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!gallery) return <p className="p-6 text-center">Gallery not found</p>;

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-teal-200 to-blue-300">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{gallery.title}</h1>
      <p className="text-gray-700 mb-6">{gallery.description}</p>

      <PhotoGrid photos={gallery.photos} onPhotoClick={setSelectedPhoto} shared={true} />

      {selectedPhoto && (
        <PhotoModal
          photos={gallery.photos}
          currentIndex={gallery.photos.findIndex((p) => p._id === selectedPhoto._id)}
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          shared={true}
          viewerEmail={email} // pass the visitor email
          galleryId={gallery._id} // pass gallery ID
        />
      )}
    </div>
  );
};

export default SharedGalleryView;
