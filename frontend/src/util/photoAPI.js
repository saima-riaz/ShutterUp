import { deletePhoto } from '../util/photoAPI';

const handleDelete = async () => {
  if (!window.confirm('Are you sure you want to delete this photo?')) return;
  
  setIsDeleting(true);
  setError(null);

  try {
    await deletePhoto(photoId);
    onSuccess();
  } catch (err) {
    setError(err.message);
  } finally {
    setIsDeleting(false);
  }
};
