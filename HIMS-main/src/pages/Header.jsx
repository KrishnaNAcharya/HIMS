import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { currentUser, logout } = useAuth(); // Get currentUser and logout from context

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

  return (
    <header className="bg-white dark:bg-glass-dark backdrop-blur-md text-gray-800 dark:text-white p-4 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Health Insurance Management</h1>
        <nav className="flex items-center">
          <ul className="flex space-x-6 mr-6">
            <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact</Link></li>
            {!currentUser ? (
              <>
                <li><Link to="/login" className="hover:text-blue-500 transition-colors">Login</Link></li>
                <li><Link to="/signup" className="hover:text-blue-500 transition-colors">Sign Up</Link></li>
              </>
            ) : (
              <li className="relative group">
                <button className="hover:text-blue-500 transition-colors">
                  Profile
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-glass-dark shadow-lg rounded-lg py-2 hidden group-hover:block group-focus-within:block">
                  <p className="px-4 py-2 text-gray-800 dark:text-white">{currentUser.email}</p>
                  <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                    Sign Out
                  </button>
                </div>
              </li>
            )}
          </ul>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;