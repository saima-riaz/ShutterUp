import React, { useState } from "react";
import { Link } from "react-router-dom";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen -mt-16">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h2>

        {/* First Name input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
            placeholder="John"
          />
        </div>

        {/* Last Name input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
            placeholder="Doe"
          />
        </div>

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

        {/* Show password */}
        <div className="flex justify-start items-center mb-6 text-sm">
          <label className="flex items-center space-x-2 text-gray-600">
            <input
              type="checkbox"
              onChange={(e) => setShowPassword(e.target.checked)}
              className="form-checkbox h-4 w-4 text-black"
            />
            <span>Show password</span>
          </label>
        </div>

        {/* Sign up button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          Sign up
        </button>

        {/* Log in link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
