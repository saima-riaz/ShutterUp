import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isColored, setIsColored] = useState(false); // Controls grayscale toggle on images

  // Switch between color and grayscale
  const toggleColor = () => {
    setIsColored(prev => !prev);
  };

  return (
    <div className="min-h-screen px-6 py-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center space-x-2">
        </div>
      </header>

      {/* Headline Main content */}
      <main className="text-center ">
        <h1 className="text-5xl md:text-5xl font-semibold mb-3 text-black">
        SHARE YOUR EVENTS MEMORIES.</h1>

        {/* Sub heading */}
         <p className="text-2xl mb-6">Create a unique gallery for your event and let everyone contribute their photos</p>
        
        {/* Signup button linking to signup route */}
        <Link to="/Signup">
          <button className="border-2 border-black text-black py-2 px-6 rounded-lg font-medium 
          hover:bg-gradient-to-br from-green-100 to-blue-100 hover:text-black transition">
            Get started
          </button>
        </Link>

        {/* picture Layout section */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-12">
        
        {/* Left column */}
        <div className="flex flex-col space-y-4">
          <img src="/images/photo1.jpg" alt="Side 1"
            className={`w-40 md:w-48 lg:w-52 rounded-lg shadow-xs ${
              isColored ? "" : "color"
          } hover:grayscale-0 cursor-pointer transition-all`} 
          onClick={toggleColor} />

          <img src="/video/video1.gif" alt="Side 2"
            className="w-40 md:w-48 lg:w-52 h-68 rounded-lg shadow-md h-full"
            onClick={toggleColor} />
          </div>

  {/* Center grid with fixed width */}
  <div className="grid grid-cols-2 gap-4 justify-items-center ">
    <img src="/images/photo3.jpg" alt="top 1"
      className={`w-full max-w-xs rounded-lg shadow-lg ${
        isColored ? "" : ""
      } hover:grayscale-0 cursor-pointer transition-all`} 
      onClick={toggleColor} />

    <img src="/images/photo4.jpg" alt="top 2"
      className={`w-full max-w-xs rounded-lg shadow-lg ${
        isColored ? "" : "color"
      } hover:grayscale-0 cursor-pointer transition-all`}
      onClick={toggleColor} />

    <img src="/images/photo5.jpg" alt="Bottom 1"
      className={`w-full max-w-xs rounded-lg shadow-lg ${
        isColored ? "" : "color"
      } hover:grayscale-0 cursor-pointer transition-all`}
      onClick={toggleColor} />

    <img src="/images/photo6.jpg" alt="Bottom 2"
      className={`w-full max-w-xs rounded-lg shadow-lg ${
        isColored ? "" : "grayscale"
      } hover:grayscale-0 cursor-pointer transition-all`}
      onClick={toggleColor} />
  </div>

  {/* Right column */}
  <div className="flex flex-col space-y-4 ">
    <img src="/images/photo2.jpeg" alt="Side 3"
      className="w-40 md:w-48 lg:w-52 rounded-lg shadow-xs h-full"
      onClick={toggleColor} />

    <img src="/video/video2.gif" alt="Side 4"
      className="w-40 md:w-48 lg:w-52 h-64 rounded-lg shadow-md"
      onClick={toggleColor} />
  </div>
</div>

      </main>
    </div>
  );
};

export default Home;