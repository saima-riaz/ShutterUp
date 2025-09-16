import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SharedGalleryPrompt = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { token } = useParams(); // token from the share link

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");

    // Redirect to the view page with email as query param
    navigate(`/shared/${token}/view?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-200 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Enter Your Email to View Gallery</h2>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          View Gallery
        </button>
      </form>
    </div>
  );
};

export default SharedGalleryPrompt;
