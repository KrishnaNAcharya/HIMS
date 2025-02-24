import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import docImage from '../assets/doc4.svg'; // Import the SVG image
import { useAuth } from '../context/AuthContext';
import Sparkles from '../components/Sparkles';
import Loading from '../components/Loading';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const image = new Image();
    image.src = docImage;
    image.onload = () => {
      setIsLoading(false);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="bg-white dark:bg-glass-dark text-gray-800 dark:text-white min-h-screen relative overflow-hidden px-4 flex flex-col justify-start pt-8 lg:pt-16"> {/* Reduced pt-16 to pt-8 for mobile */}
      <Sparkles />
      <div className="max-w-7xl mx-auto py-12 lg:py-24"> {/* Reduced py-24 to py-12 for mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Health Insurance That Cares for You
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-6 max-w-2xl mx-auto lg:mx-0">
              Secure your future with comprehensive health insurance plans that put your well-being first. Whether it's individual coverage or family protection, we've got you covered with the best benefits at the most affordable rates.
            </p>
            <p className="text-sm md:text-base lg:text-lg mb-8 max-w-xl mx-auto lg:mx-0 text-gray-600 dark:text-gray-300">
              Our goal is to ensure you and your family receive the highest quality healthcare without the financial burden. From routine check-ups to emergency coverage, our plans are tailored to meet your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/get-quote" 
                className="text-base md:text-lg bg-blue-500 dark:bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all hover:scale-105 hover:bg-blue-600 dark:hover:bg-green-600 text-center"
              >
                Get a Quote
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="text-base md:text-lg bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all hover:scale-105 hover:bg-purple-600 text-center"
                >
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2">  {/* Removed relative positioning */}
            <div className="lg:transform"> {/* Removed absolute positioning */}
              <img
                src={docImage}
                alt="Health Insurance Illustration"
                className="w-full max-w-xl mx-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
