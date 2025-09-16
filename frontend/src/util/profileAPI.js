/* ===== PROFILE API SERVICE =====*/

export const fetchProfile = (authFetch) =>
  authFetch("/user/profile").then((res) => res.json());

export const updateProfile = (authFetch, formData) =>
  authFetch("/user/profile", { method: "PUT", body: formData }).then((res) =>
    res.json()
  );
