import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { toast } from 'react-hot-toast';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth(); // Get currentUser and logout from context
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleProfileClick = () => {
    if (currentUser) {
      navigate('/profile'); // Redirect to the profile page
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success('Successfully signed out!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out: ' + error.message);
    }
  };

  return (
    <header className="bg-white dark:bg-glass-dark backdrop-blur-md text-gray-800 dark:text-white p-4 lg:p-6 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl md:text-3xl font-bold hover:text-blue-500 transition-colors">
            HIMS
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-8 mr-8 text-lg">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact</Link></li>
              {!currentUser ? (
                <li><Link to="/login" className="hover:text-blue-500 transition-colors">Login</Link></li>
              ) : (
                <li className="relative group">
                  <button onClick={handleProfileClick} className="hover:text-blue-500 transition-colors">
                    Profile
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-glass-dark shadow-lg rounded-lg py-2 hidden group-hover:block">
                    <p className="px-4 py-2 text-gray-800 dark:text-white">{currentUser.displayName}</p>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </li>
              )}
            </ul>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <ul className="space-y-4">
              <li><Link to="/" className="block hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="block hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="block hover:text-blue-500 transition-colors">Contact</Link></li>
              {!currentUser ? (
                <li><Link to="/login" className="block hover:text-blue-500 transition-colors">Login</Link></li>
              ) : (
                <>
                  <li><button onClick={handleProfileClick} className="block hover:text-blue-500 transition-colors">Profile</button></li>
                  <li><button onClick={handleSignOut} className="block hover:text-blue-500 transition-colors">Sign Out</button></li>
                </>
              )}
              <li>
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center hover:text-blue-500 transition-colors"
                >
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
