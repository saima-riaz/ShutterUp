/* ===== PHOTO API SERVICE =====
 * Handles all photo & gallery API calls using authFetch from AuthContext
 */

export const API_BASE = "http://localhost:5000/api";

/* ===== FETCH USER PHOTOS ===== */
export const fetchUserPhotos = async (authFetch) => {
  const response = await authFetch("/posts", { method: "GET" });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch photos");
  }
  return await response.json();
};

/* ===== DELETE PHOTO ===== */
export const deletePhoto = async (authFetch, photoId) => {
  const response = await authFetch(`/posts/${photoId}`, { method: "DELETE" });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete photo");
  }
  return await response.json();
};

/* ===== FETCH GALLERIES ===== */
export const fetchGalleries = async (authFetch) => {
  const response = await authFetch("/gallery", { method: "GET" });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch galleries");
  }
  return await response.json();
};

/* ===== FETCH SINGLE GALLERY BY URL ===== */
export const fetchGalleryByUrl = async (authFetch, url) => {
  const response = await authFetch(`/gallery/${url}`, { method: "GET" });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Gallery not found");
  }
  return await response.json();
};

/* ===== CREATE GALLERY ===== */
export const createGallery = async (authFetch, galleryData) => {
  const response = await authFetch(`/gallery/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(galleryData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create gallery");
  }
  return await response.json();
};


/* ===== DELETE GALLERY ===== */
export const deleteGallery = async (authFetch, galleryId) => {
  const response = await authFetch(`/gallery/${galleryId}`, { method: "DELETE" });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete gallery");
  }
  return await response.json();
};
