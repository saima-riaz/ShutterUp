import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../util/AuthContext";
import { createGallery } from "../util/photoAPI"; // Centralized API call

const Gallery = () => {
  const { authFetch } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await createGallery(authFetch, { title, description, url });
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.message || "Gallery creation failed.");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-teal-200 to-blue-200">
      {/* Back to Dashboard */}
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="absolute top-6 left-6 text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </button>

      {/* Gallery form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create Event Gallery
        </h2>

        {message && (
          <div className="mb-4 text-sm text-center text-red-600">{message}</div>
        )}

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summer Wedding 2024"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share details about your event..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
            rows="4"
            required
          />
        </div>

        {/* URL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gallery URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="summer-wedding-2024"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-yellow-900 transition"
        >
          Create Gallery
        </button>
      </form>
    </div>
  );
};

export default Gallery;
