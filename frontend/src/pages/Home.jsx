import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isColored, setIsColored] = useState(false);

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

      {/* Headline */}
      <main className="text-center">
        <h1 className="text-5xl md:text-4xl font-semibold mb-6 text-black">
         Capture Moments.
         <p>Share stortes</p>
        </h1>
        <Link to="/Signup">
          <button className="border-2 border-black text-black py-2 px-6 rounded-lg font-medium hover:bg-gradient-to-br from-green-100 to-blue-100 hover:text-black transition">
            Get started
          </button>
        </Link>

        {/* Photo 1 */}
        <div className="flex justify-center gap-4 mt-12 ">
          <img src="/images/photo1.jpeg" alt="Grayscale Image" 
            className={`max-w-xs h-auto transition-all duration-300 ease-in-out rounded-lg ${
              isColored ? "" : "grayscale"
            } hover:grayscale-0 cursor-pointer`}
            onClick={toggleColor} />
          
          {/* Photo 2 */}
          <img src="/images/photo2.jpeg" alt="Grayscale Image"
            className={`w-full max-w-xs h-auto transition-all duration-300 ease-in-out rounded-lg ${
              isColored ? "" : "grayscale"
            } hover:grayscale-0 cursor-pointer`}
            onClick={toggleColor} />
          
          
        </div>
      </main>
    </div>
  );
}

export default Home;
