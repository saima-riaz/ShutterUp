import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignInAlt, faUserPlus, faCamera,faHome } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="text-black p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faCamera} className=" text-5xl mr-2 m-4"/>
          <span className="text-6xl font-lavish">ShutterUp</span>

        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-yellow-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
    
          <Link to="/signup" className="hover:text-yellow-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faSignInAlt} />
            <span>Signup</span>
          </Link>
          
          <Link to="/login" className="hover:text-yellow-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faUserPlus} />
            <span>Login</span>
          </Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4"> {/* change lenght of mob menu */}
          <div className="flex flex-col space-y-3"> 
            <Link 
              to="/" 
              className="hover:text-yellow-800 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/upload" 
              className="hover:text-yellow-800 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
    
              Login
            </Link>
            <Link 
              to="/signup" 
              className="hover:text-yellow-800 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;