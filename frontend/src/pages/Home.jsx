import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const galleryItems = [
    "/images/photo1.jpg",
    "/images/photo2.jpeg",
    "/images/photo3.jpg",
    "/images/photo4.jpg",
    "/images/photo5.jpg",
    "/images/photo6.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-teal-100 to-blue-50">
      {/* --- Hero Section --- */}
      <main className="text-center px-6 py-20">
        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Share Your <span className="text-teal-600">Event Memories</span>
        </motion.h1>

        {/* Sub heading */}
        <motion.p
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Create a unique gallery for your event and let everyone contribute
          their photos seamlessly.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/signup">
            <button
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 text-white 
              text-lg font-semibold rounded-full shadow-lg 
              hover:scale-105 hover:shadow-xl transition-transform"
            >
              Get Started
            </button>
          </Link>
        </motion.div>

        {/* --- Gallery Section --- */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-12"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {galleryItems.map((src, idx) => (
            <motion.img
              key={idx}
              src={src}
              alt={`gallery-${idx}`}
              className="rounded-xl w-full h-56 object-cover 
              transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            />
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
