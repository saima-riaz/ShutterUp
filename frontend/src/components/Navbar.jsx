import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCamera, faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

// Component for navigation links used in both desktop and mobile menus
const NavLinks = ({ isMobile = false, onLinkClick }) => (
  <>
    <Link
      to="/"
      className={`${
        isMobile
          ? "w-full py-3 text-lg text-center rounded-lg hover:bg-gray-100 transition"
          : "hover:text-teal-600 font-medium"
      }`}
      onClick={onLinkClick}
    >
      Features
    </Link>

    <Link
      to="/signup"
      className={`${
        isMobile
          ? "w-full py-3 text-lg text-center rounded-lg hover:bg-gray-100 transition"
          : "hover:text-teal-600 font-medium"
      }`}
      onClick={onLinkClick}
    >
      Signup
    </Link>

    <Link
      to="/login"
      className={`${
        isMobile
          ? "w-full py-3 text-lg text-white text-center rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:opacity-90 transition"
          : "bg-gradient-to-r from-teal-400 to-blue-500 text-white py-2 px-6 rounded-lg font-medium shadow-md hover:shadow-lg hover:opacity-90 transition"
      }`}
      onClick={onLinkClick}
    >
      Login
    </Link>
  </>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen for scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // toggle after 20px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isScrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)",
        boxShadow: isScrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "0 0px 0px rgba(0,0,0,0)",
        height: isScrolled ? "70px" : "50px",
      }}
      transition={{ duration: 0.3 }}
      className="fixed w-full top-0 z-50 backdrop-blur-md"
    >
      <div className="container mx-auto flex justify-between items-center px-4 h-full">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <FontAwesomeIcon icon={faCamera} className="text-3xl text-teal-600 mr-2" />
          <span className="text-3xl font-bold text-gray-900 tracking-tight">
            Shutter<span className="text-teal-600">Up</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8 text-gray-700 text-lg">
          <NavLinks />
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} size="lg" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg px-6 py-6"
          >
            <div className="flex flex-col space-y-4 text-gray-700 text-lg">
              <NavLinks isMobile={true} onLinkClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
