import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const Success = () => {
  const location = useLocation();
  const formData = location.state?.formData;
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Insurance_Application_${new Date().toLocaleDateString()}`,
    onAfterPrint: () => console.log('Printed successfully'),
    onPrintError: (error) => console.error('Print failed:', error),
    removeAfterPrint: true,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm 20mm 20mm 0.15in;
      }
      @media print {
        body {
          color: black;
          background: white;
        }
        * {
          color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
      }
    `
  });

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const getHealthStatus = (info) => {
    // Calculate BMI
    const height = info.height / 100; // convert cm to m
    const bmi = (info.weight / (height * height)).toFixed(1);
    return `BMI: ${bmi} (Height: ${info.height}cm, Weight: ${info.weight}kg)`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-glass-dark py-12">
      {formData ? (
        <div className="max-w-4xl mx-auto bg-white dark:bg-glass-dark p-8 rounded-lg shadow-lg">
          <div ref={contentRef} className="space-y-8">
            {/* Header */}
            <div className="text-center border-b pb-6">
              <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">Application Submitted Successfully!</h1>
              <p className="text-gray-800 dark:text-gray-300 mt-2">
                Reference ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>

            {formData && (
              <div className="space-y-8">
                {/* Personal Information */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p><span className="font-medium">Name:</span> {formData.personalInfo.firstName} {formData.personalInfo.lastName}</p>
                      <p><span className="font-medium">Email:</span> {formData.personalInfo.email}</p>
                      <p><span className="font-medium">Phone:</span> {formData.personalInfo.phone}</p>
                      <p><span className="font-medium">Date of Birth:</span> {formatDate(formData.personalInfo.dateOfBirth)}</p>
                      <p><span className="font-medium">Gender:</span> {formData.personalInfo.gender}</p>
                    </div>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p><span className="font-medium">Occupation:</span> {formData.personalInfo.occupation}</p>
                      <p><span className="font-medium">Income Range:</span> {formData.personalInfo.incomeRange}</p>
                      <p><span className="font-medium">Address:</span> {formData.address.street}</p>
                      <p><span className="font-medium">City:</span> {formData.address.city}</p>
                      <p><span className="font-medium">State:</span> {formData.address.state}, {formData.address.pinCode}</p>
                    </div>
                  </div>
                </section>

                {/* Coverage Details */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Coverage Details</h2>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p><span className="font-medium">Plan Type:</span> {formData.coverage.planType}</p>
                    <p><span className="font-medium">Coverage Amount:</span> ₹{Number(formData.coverage.coverageAmount).toLocaleString()}</p>
                    <p><span className="font-medium">Payment Method:</span> {formData.coverage.paymentMethod}</p>
                    <p><span className="font-medium">Payment Frequency:</span> {formData.coverage.paymentFrequency}</p>
                    {formData.coverage.additionalBenefits?.length > 0 && (
                      <p><span className="font-medium">Additional Benefits:</span> {formData.coverage.additionalBenefits.join(', ')}</p>
                    )}
                  </div>
                </section>

                {/* Family Members */}
                {formData.coverage.familyMembers?.length > 0 && (
                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Family Members Covered</h2>
                    <div className="space-y-2">
                      {formData.coverage.familyMembers.map((member, index) => (
                        <p key={index} className="text-gray-700 dark:text-gray-300">
                          {member.name} - {member.relation} ({member.age} years, {member.gender})
                        </p>
                      ))}
                    </div>
                  </section>
                )}

                {/* Health Information */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Health Information</h2>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p><span className="font-medium">Health Status:</span> {getHealthStatus(formData.healthInfo)}</p>
                    <p><span className="font-medium">Pre-existing Conditions:</span> {formData.healthInfo.hasExistingConditions ? 'Yes' : 'No'}</p>
                    {formData.healthInfo.hasExistingConditions && (
                      <p><span className="font-medium">Conditions:</span> {formData.healthInfo.existingConditions}</p>
                    )}
                    <p><span className="font-medium">Smoking Status:</span> {formData.healthInfo.smokingStatus}</p>
                    <p><span className="font-medium">Exercise Frequency:</span> {formData.healthInfo.exerciseFrequency}</p>
                    <p><span className="font-medium">Alcohol Consumption:</span> {formData.healthInfo.alcoholConsumption}</p>
                    {formData.healthInfo.familyHistory && (
                      <p><span className="font-medium">Family History:</span> {formData.healthInfo.familyHistory}</p>
                    )}
                    {formData.healthInfo.takingMedications && (
                      <p><span className="font-medium">Current Medications:</span> {formData.healthInfo.medications}</p>
                    )}
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-6 border-t print:hidden">
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              disabled={!formData}
            >
              Download Application
            </button>
            <Link 
              to="/home" 
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-center"
            >
              Return to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-red-500">No application data available</p>
          <Link 
            to="/home" 
            className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Success;