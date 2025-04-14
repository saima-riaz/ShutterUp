import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen -mt-16">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        {/* Logo */}
       <div className="flex justify-center mb-6">
       <FontAwesomeIcon icon={faCamera} className="text-3xl mr-2 m-4" />
      
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Log in to your account</h2>

        {/* Email input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
            placeholder="you@example.com"
          />
        </div>

        {/* Password input */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
            placeholder="••••••••"
          />
        </div>

        {/* Show password and forgot link */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <label className="flex items-center space-x-2 text-gray-600">
            <input
              type="checkbox"
              onChange={(e) => setShowPassword(e.target.checked)}
              className="form-checkbox h-4 w-4 text-black"
            />
            <span>Show password</span>
          </label>
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          Log in
        </button>

        {/* Sign up link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
