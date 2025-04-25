import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState(""); // Added this line
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
  
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption); // Now using the defined state
  
    setUploading(true);
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to upload");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-100">
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="absolute top-6 left-6 text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <form
        onSubmit={handleUpload}
        className="w-full max-w-xl p-10 bg-white rounded-xl shadow-md"
      >
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition"
        >
          <FontAwesomeIcon icon={faCloudUploadAlt} className="text-gray-600 text-5xl mb-2" />
          <p className="text-gray-700 font-medium">
            Drag & drop photos here, or click to select
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Maximum file size: 10MB per photo
          </p>
          <p className="text-sm text-gray-500">Upload up to 10 photos at once</p>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Added Caption Input */}
        <div className="mt-4">
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">
            Caption
          </label>
          <input
            id="caption"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a caption for your image"
          />
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={uploading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;