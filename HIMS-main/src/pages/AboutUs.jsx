// src/components/AboutUs.jsx

import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white dark:bg-glass-dark text-gray-800 dark:text-white py-12 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">About Health Insurance</h2>

        {/* What is Health Insurance */}
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">What is Health Insurance?</h3>
          <p className="leading-relaxed">
            Health insurance is a type of coverage that pays for medical expenses incurred by the insured.
            It protects individuals from high medical treatment costs by covering expenses like hospitalization,
            surgeries, doctor consultations, and prescription drugs. With regular premium payments, you can ensure
            that your medical needs are met without financial strain during emergencies.
          </p>
        </div>

        {/* Why Health Insurance */}
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">Why Health Insurance?</h3>
          <p className="leading-relaxed">
            Health insurance is vital for financial protection and peace of mind. It ensures access to quality healthcare 
            without worrying about costs, and it reduces the financial burden of unexpected medical events. With rising
            medical costs, health insurance can safeguard your savings and provide necessary treatment when you need it.
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">Benefits of Health Insurance</h3>
          <ul className="list-disc ml-6">
            <li>Cashless treatment at network hospitals</li>
            <li>Coverage of pre and post-hospitalization expenses</li>
            <li>No Claim Bonus for claim-free years</li>
            <li>Preventive health checkups</li>
          </ul>
        </div>

        {/* What's Covered */}
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">What’s Covered in Health Insurance?</h3>
          <ul className="list-disc ml-6">
            <li>Hospitalization costs including surgeries, doctor fees, and room rent</li>
            <li>Pre and post-hospitalization costs</li>
            <li>Daycare procedures that don't require 24-hour hospital stay</li>
            <li>Ambulance charges</li>
            <li>Critical illness coverage</li>
          </ul>
        </div>

        {/* What's Not Covered */}
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">What’s Not Covered in Health Insurance?</h3>
          <ul className="list-disc ml-6">
            <li>Pre-existing conditions (during the waiting period)</li>
            <li>Cosmetic or plastic surgeries</li>
            <li>Dental and vision care (unless specified)</li>
            <li>Self-inflicted injuries</li>
            <li>Pregnancy and maternity expenses (unless covered)</li>
            <li>Alternative treatments like homeopathy and naturopathy</li>
          </ul>
        </div>

        {/* Factors to Consider */}
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">Factors to Consider Before Buying Health Insurance</h3>
          <ul className="list-disc ml-6">
            <li>Choose a coverage amount that suits your family’s needs</li>
            <li>Ensure the insurer has a wide network of hospitals</li>
            <li>Check the waiting period for pre-existing conditions</li>
            <li>Understand sub-limits on room rent and treatment costs</li>
            <li>Consider add-ons like critical illness or personal accident cover</li>
          </ul>
        </div>

        {/* Eligibility */}
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">Eligibility for Health Insurance</h3>
          <ul className="list-disc ml-6">
            <li>Available for individuals aged 18 to 65 years</li>
            <li>Children can be covered under family floater plans</li>
            <li>Pre-existing conditions require a waiting period</li>
            <li>Older individuals may need to undergo medical tests</li>
          </ul>
        </div>

        {/* Documents Required */}
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-4">Documents Required</h3>
          <ul className="list-disc ml-6">
            <li>Proof of Identity (Aadhar, Passport, PAN, etc.)</li>
            <li>Proof of Age (Birth certificate, PAN card, etc.)</li>
            <li>Proof of Address (Utility bills, Passport, etc.)</li>
            <li>Medical reports (if required)</li>
            <li>Passport-sized photographs</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
