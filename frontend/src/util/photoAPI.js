/* ===== PHOTO API SERVICE ===== */
/**
 * Centralized API calls for photo-related operations
 */

export const API_BASE = "http://localhost:5000/api";

/* ===== CLOUDINARY PHOTO OPERATIONS ===== */

// Fetch all photos for the current user
export const fetchUserPhotos = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/posts`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch photos');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch photos error:', error);
    throw error;
  }
};

/* ===== DELETE PHOTO ===== */

// Delete a specific photo
export const deletePhoto = async (photoId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/posts/${photoId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete photo');
    }

    return await response.json();
  } catch (error) {
    console.error('Delete photo error:', error);
    throw error;
  }
};

/* ===== GALLERY OPERATIONS ===== */

// Fetch all galleries (for dashboard listing)
export const fetchGalleries = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/gallery`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch galleries');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch galleries error:', error);
    throw error;
  }
};

// Fetch single gallery by URL (for gallery detail page)

export const fetchGalleryByUrl = async (url) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/gallery/${url}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Gallery not found');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch gallery error:', error);
    throw error;
  }
};



/* ===== DELETE GALLERY ===== */
export const deleteGallery = async (_id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}/gallery/${_id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to delete gallery (Status: ${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error('Delete gallery error:', error);
    throw new Error(error.message || 'Failed to delete gallery. Please try again.');
  }
};