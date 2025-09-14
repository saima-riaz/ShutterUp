import { useEffect, useState, useRef } from "react";
import { useAuth } from "../util/AuthContext";

const Profile = () => {
  const { authFetch, login, user, loading } = useAuth();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePic: "",
  });
  const fileInputRef = useRef(null);

  // Initialize profile once user is loaded
  useEffect(() => {
    if (!loading && user) {
      setProfile({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        profilePic: user.profilePic || "",
      });
    }
  }, [user, loading]);

  // Handle form submit (firstName, lastName, email)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email } = e.target;
    const body = {};
    if (firstName.value) body.firstName = firstName.value;
    if (lastName.value) body.lastName = lastName.value;
    if (email.value) body.email = email.value;

    try {
      const res = await authFetch("/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Profile update failed");

      const updated = await res.json();
      setProfile(updated);
      login(updated); // update global auth context
      alert("Profile updated");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  // Handle avatar change immediately
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await authFetch("/user/profile", {
        method: "PUT",
        body: formData, // FormData automatically sets multipart/form-data
      });

      if (!res.ok) throw new Error("Avatar upload failed");

      const updated = await res.json();
      setProfile((prev) => ({
        ...prev,
        profilePic: updated.profilePic || prev.profilePic,
      }));
      login(updated); // update global auth context
    } catch (err) {
      console.error(err);
      alert("Failed to upload avatar");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-200 to-blue-300 relative">
      {/* Top-right avatar */}
      <div className="absolute top-4 right-4 cursor-pointer">
        <img
          src={profile.profilePic || "/default-avatar.png"}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
          onClick={() => fileInputRef.current.click()}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>

      {/* Profile form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">Profile</h2>
        <input
          name="firstName"
          placeholder="First Name"
          defaultValue={profile.firstName}
          className="border p-2 rounded w-full"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          defaultValue={profile.lastName}
          className="border p-2 rounded w-full"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={profile.email}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Profile;
