import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(token ? 2 : 1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendResetEmail = async () => {
    setLoading(true);
    setMessage("");
    try {
      await axios.post(`${API_BASE}/api/auth/request-password-reset`, { email });
      setMessage("Reset email sent! Check your inbox.");
      setEmail("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset email");
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    setLoading(true);
    setMessage("");
    try {
      await axios.post(`${API_BASE}/api/auth/reset-password/${token}`, { password: newPassword });
      setMessage("Password updated! You can now log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-200 to-blue-300">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {step === 1 ? "Request Password Reset" : "Set New Password"}
        </h2>

        {message && (
          <p className={`mb-4 ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="border w-full p-2 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendResetEmail}
              disabled={loading || !email}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              className="border w-full p-2 mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={updatePassword}
              disabled={loading || !newPassword}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-70"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
