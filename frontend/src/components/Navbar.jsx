import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCamera} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="text-black p-2">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center -ml-9">
          <FontAwesomeIcon icon={faCamera} className=" text-3xl mr-2"/>
          <span className="text-5xl font-lavish">ShutterUp</span>
        </div>
        
        {/* menu button */}
        <button 
          className="md:hidden p-2 "
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6 text-1xl">
          <Link to="/" className="hover:text-yellow-900 flex items-center gap-2">
            <span>Features</span>
          </Link>
    
          <Link to="/signup" className="hover:text-yellow-900 flex items-center gap-2">
            <span>Signup</span>
          </Link>
          
          <Link to="/login" className="bg-gradient-to-br from-green-100 to-blue-100 text-black py-2 px-6 rounded-lg font-medium hover:text-black transition ">
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
              Features
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