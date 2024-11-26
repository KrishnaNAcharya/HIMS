import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import docImage from '../assets/doc4.svg'; // Import the SVG image

const Hero = () => {
  return (
    <section className="bg-white dark:bg-glass-dark text-gray-800 dark:text-white text-center py-20 min-h-screen flex flex-col lg:flex-row justify-start items-center lg:justify-between px-8 lg:px-16 relative overflow-hidden">
      {/* Text Content */}
      <div className="lg:w-1/2 mb-10 lg:mb-0 z-10">
        <h2 className="text-5xl font-bold mb-4">
          Health Insurance That Cares for You
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Secure your future with comprehensive health insurance plans that put your well-being first. Whether it's individual coverage or family protection, we've got you covered with the best benefits at the most affordable rates.
        </p>
        <p className="text-md mb-8 max-w-xl mx-auto text-gray-600 dark:text-gray-300">
          Our goal is to ensure you and your family receive the highest quality healthcare without the financial burden. From routine check-ups to emergency coverage, our plans are tailored to meet your unique needs.
        </p>
        <Link to="/get-quote" className="bg-blue-500 dark:bg-green-500 text-white px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-600 dark:hover:bg-green-600">
          Get a Quote
        </Link>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 absolute right-0 top-1/2 transform -translate-y-1/2 lg:translate-x-1/4">
        <img
          src={docImage}
          alt="Health Insurance Illustration"
          className="w-full lg:max-w-lg rounded-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
