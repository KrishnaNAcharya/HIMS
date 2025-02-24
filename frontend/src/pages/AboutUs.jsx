// src/components/AboutUs.jsx

import React, { useState } from 'react';

const AboutUs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-glass-dark text-gray-800 dark:text-white py-8 md:py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">About HIMS</h2>

        {/* About HIMS */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">What is HIMS?</h3>
          <p className="text-base md:text-lg leading-relaxed">
            Health Insurance Management System (HIMS) is a comprehensive digital platform designed 
            to simplify the process of managing health insurance policies. Our system provides 
            an intuitive interface for users to explore, purchase, and manage their health 
            insurance plans while offering administrators powerful tools to oversee and maintain 
            insurance records.
          </p>
        </div>

        {/* Our Mission */}
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">Our Mission</h3>
          <p className="leading-relaxed">
            At HIMS, we aim to make health insurance accessible, understandable, and manageable 
            for everyone. We believe in transparency, efficiency, and user-centered design to 
            provide the best possible insurance management experience for both users and administrators.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">Key Features</h3>
          <ul className="list-disc ml-6">
            <li>User-friendly insurance application process</li>
            <li>Secure user authentication and profile management</li>
            <li>Comprehensive insurance plan options</li>
            <li>Family coverage management</li>
            <li>Efficient administrative dashboard</li>
            <li>Real-time policy status tracking</li>
          </ul>
        </div>

        {/* Insurance Plans */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">Our Insurance Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="p-4 md:p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h4 className="text-lg md:text-xl font-semibold mb-3">Basic Health Cover</h4>
              <ul className="list-disc ml-4">
                <li>Essential medical coverage</li>
                <li>Basic hospitalization</li>
                <li>Accident coverage</li>
                <li>Affordable premiums</li>
              </ul>
            </div>
            <div className="p-4 md:p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h4 className="text-lg md:text-xl font-semibold mb-3">Standard Health Cover</h4>
              <ul className="list-disc ml-4">
                <li>Enhanced medical coverage</li>
                <li>Pre and post hospitalization</li>
                <li>Specialized treatments</li>
                <li>Family floater option</li>
              </ul>
            </div>
            <div className="p-4 md:p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <h4 className="text-lg md:text-xl font-semibold mb-3">Premium Health Cover</h4>
              <ul className="list-disc ml-4">
                <li>Comprehensive coverage</li>
                <li>International treatment</li>
                <li>Critical illness coverage</li>
                <li>Additional wellness benefits</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">Our Technology</h3>
          <p className="leading-relaxed">
            HIMS is built using modern web technologies including:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>React.js for the frontend interface</li>
            <li>Node.js and Express for the backend server</li>
            <li>PostgreSQL for secure data storage</li>
            <li>Firebase for authentication</li>
            <li>Tailwind CSS for responsive design</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 md:mt-12">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              { question: "What is HIMS?", answer: "HIMS stands for Health Insurance Management System. It is a comprehensive digital platform designed to simplify the process of managing health insurance policies." },
              { question: "How do I apply for health insurance?", answer: "You can apply for health insurance by visiting our 'Get a Quote' page, filling out the necessary details, and submitting your application." },
              { question: "What types of health insurance plans are available?", answer: "We offer three types of health insurance plans: Basic Health Cover, Standard Health Cover, and Premium Health Cover. Each plan offers different levels of coverage and benefits." },
              { question: "How can I contact support?", answer: "You can contact our support team at support@hims.com for any questions or assistance." }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h4
                  className="text-base md:text-lg font-semibold cursor-pointer flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span className={`transform transition-transform ${openFAQ === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </h4>
                {openFAQ === index && (
                  <p className="text-sm md:text-base leading-relaxed mt-2 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 md:mt-12 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">Get in Touch</h3>
          <p className="text-base md:text-lg leading-relaxed">
            Have questions about HIMS or our insurance plans?<br />
            Contact our support team at{' '}
            <a href="mailto:support@hims.com" className="text-blue-500 hover:text-blue-600 transition-colors">
              support@hims.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
