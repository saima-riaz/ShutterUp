import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [isColored, setIsColored] = useState(false);

  const toggleColor = () => {
    setIsColored(!isColored);
  };

  return (
    <div className="min-h-screen w-full bg-gray-300 flex flex-col md:p-2">

      {/* Container for image and text side by side */}
      <div className="flex flex-col md:flex-row justify-between w-full mb-6 gap-8">
        
        {/* Text on the left */}
        <div className="text-start w-full p-2 ">
          <h1 className="text-2xl md:text-3xl font-bold text-black">Events deserve to be remembered...</h1>
          <p className="text-black mt-2 text-lg md:text-2xl">
            Your memories deserve to be preserved! <br /> 
            Whether it's a special event, a celebration, <br />  
            or a simple moment worth remembering, <br /> 
            upload your photos and download them <br />  
            anytime, anywhere.  
          </p>
        </div>

        {/* Image on the right */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end md:p-6">
          <img src="/images/image1.jpeg" alt="Grayscale Image"
            className={`w-full max-w-md h-auto transition-all duration-300 ease-in-out rounded-lg ${
              isColored ? "" : "grayscale"
            } hover:grayscale-0 cursor-pointer`}
            onClick={toggleColor} />
        </div>
      </div>

      {/* Get Started Button */}
      <Link to="/upload">
        <button className="bg-indigo-600 mt-8 text-white mx-6 px-6 py-3 
        rounded-lg text-lg font-semibold hover:text-yellow">
          Get Started
        </button>
      </Link>

      {/* Video and Text Section */}
      <div className="flex flex-col md:flex-row justify-between w-full mt-8 gap-8">
        
        {/* Video on left (mobile: top) */}
        <div className="w-full md:w-1/2">
          <div className="max-w-md rounded-lg overflow-hidden shadow-xl mx-auto md:mx-0">
            <video
              src="/video/video.mp4"
              className={`w-full h-auto object-cover transition-all duration-300 ease-in-out ${
                isColored ? "" : "brightness-100"} hover:brightness-200`}
              loop
              muted
              autoPlay
              playsInline
            />
          </div>
        </div>

        {/* Text on right (mobile: bottom) */}
       <div className="w-full md:w-1/2 p-4 md:p-8 text-center md:text-end">
          <p className="text-black text-lg md:text-2xl">
            Every moment tells a story, <br />
            save your story forever! From <br />
            big celebrations to small <br />
            everyday joys, upload your photos <br /> 
            and download them anytime anywhere <br />
          </p>
        </div>
      </div>
    </div>
  );
}