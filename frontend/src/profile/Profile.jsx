import { useEffect, useState, useRef } from "react";
import { useAuth } from "../util/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authFetch, login, user, loading } = useAuth();
  const [profile, setProfile] = useState({firstName: "",lastName: "",email: "",profilePic: "",});
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) setProfile(user);
  }, [user, loading]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.[0]) uploadAvatar(files[0]);
    else setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const uploadAvatar = async (file) => {
    setProfile((prev) => ({ ...prev, profilePic: URL.createObjectURL(file) }));
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await authFetch("/user/profile", { method: "PUT", body: formData });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      login(updated);
      setProfile((prev) => ({ ...prev, profilePic: updated.profilePic || prev.profilePic }));
    } catch {
      alert("Failed to upload avatar");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch("/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
        }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      login(updated);
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-200 to-blue-300 relative">
      <button onClick={() => navigate("/dashboard")} className="absolute top-6 left-6 text-blue-600 hover:underline">
        ← Back to Dashboard</button>

      <div className="absolute top-4 right-4 cursor-pointer">
        <img
          src={profile.profilePic || "/default-avatar.png"}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
          onClick={() => fileInputRef.current.click()}
        />
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Profile</h2>
        {["firstName", "lastName", "email"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "email" ? "email" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={profile[field] || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default Profile;
