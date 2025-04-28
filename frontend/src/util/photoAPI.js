/* ===== PHOTO API SERVICE ===== */
/**
 * Centralized API calls for photo-related operations
 */

const API_BASE = "http://localhost:5000/api";

/* ===== FETCH USER PHOTOS ===== */
export const fetchUserPhotos = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/posts`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    const error = new Error(response.statusText);
    error.status = response.status;
    throw error;
  }

  return await response.json();
};

/* ===== DELETE PHOTO ===== */
export const deletePhoto = async (photoId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/posts/${photoId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    const error = new Error('Failed to delete photo');
    error.status = response.status;
    throw error;
  }

  return await response.json();
};