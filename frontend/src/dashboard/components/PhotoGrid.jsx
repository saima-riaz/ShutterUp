import ImageCard from "../../gallery/components/ImageCard";

// PhotoGrid component displays a grid of photos
const PhotoGrid = ({ photos, onPhotoClick, refreshPhotos, galleries, handleRemovePhoto, shared = false }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {photos.map((photo) => (
        <div key={photo._id} className="relative group hover: transition-shadow">
          <div
            className="relative w-full h-48 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => onPhotoClick(photo)}
          >
            <img
              src={photo.imageUrl}
              alt="User upload"
              className="w-full h-full object-cover"
            />

            {/* Hover overlay with actions (ImageCard) */}
            {!shared && (
              <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageCard
                  photoId={photo._id}
                  onSuccess={refreshPhotos} 
                  galleries={galleries}
                  handleRemovePhoto={handleRemovePhoto} 
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
