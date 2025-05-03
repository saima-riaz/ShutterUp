/* ===== PHOTO API SERVICE ===== */
/**
 * Centralized API calls for photo-related operations
 */

const API_BASE = "http://localhost:5000/api";

/* ===== PHOTO OPERATIONS ===== */

// Fetch all photos for the current user
export const fetchUserPhotos = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/posts`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

/* ===== DELETE PHOTO ===== */

// Delete a specific photo
export const deletePhoto = async (photoId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/posts/${photoId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) throw new Error('Failed to delete photo');
  return await response.json();
};

/* ===== GALLERY OPERATIONS ===== */

// Fetch all galleries (for dashboard listing)
export const fetchGalleries = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/gallery`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) throw new Error('Failed to fetch galleries');
  return await response.json();
};

// Fetch single gallery by URL (for gallery detail page)
export const fetchGalleryByUrl = async (url) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/gallery/${url}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) throw new Error('Failed to fetch gallery');
  return await response.json();
};