import ImageCard from "../../gallery/components/ImageCard";

const PhotoGrid = ({ photos, onPhotoClick, refreshPhotos }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {photos.map((photo) => (
      <div key={photo._id} className="relative group hover:shadow-lg transition-shadow">
        <div 
          className="relative w-full h-48 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => onPhotoClick(photo)}
        >
          <img 
            src={photo.imageUrl} 
            alt="User upload"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ImageCard
              photoId={photo._id}
              onSuccess={refreshPhotos}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default PhotoGrid;