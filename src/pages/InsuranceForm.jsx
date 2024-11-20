import { useState } from 'react';
import axios from 'axios';

const InsuranceForm = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      personId: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      dateOfBirth: '',
      status: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      pinCode: ''
    },
    policy: {
      policyNumber: '',
      policyType: '',
      sumInsured: '',
      tenure: '',
      premium: '',
      startDate: '',
      endDate: '',
      policyBenefits: '',
      medicalHistory: ''
    },
    hospital: {
      hospitalId: '',
      name: '',
      address: '',
      isNetworked: false
    },
    disease: {
      name: '',
      code: '',
      infectedFrom: '',
      diagnosisDate: ''
    },
    test: {
      code: '',
      diseaseCode: '',
      price: ''
    },
    claim: {
      claimId: '',
      policyNumber: '',
      personId: '',
      issuedAmount: '',
      issuedDate: '',
      status: '',
      claimedAmount: ''
    },
    billing: {
      billId: '',
      diseaseCode: '',
      billAmount: '',
      dateOfAdmission: '',
      dateOfDischarge: ''
    }
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(''); // Add error state

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const formatDateForDB = (dateString) => {
    if (!dateString) return null;
    return dateString;  // Already in YYYY-MM-DD format from input type="date"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError(''); // Reset error state

    // Create a copy of the form data with formatted dates
    const formattedData = {
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        dateOfBirth: formatDateForDB(formData.personalInfo.dateOfBirth)
      },
      policy: {
        ...formData.policy,
        startDate: formatDateForDB(formData.policy.startDate),
        endDate: formatDateForDB(formData.policy.endDate)
      },
      disease: {
        ...formData.disease,
        infectedFrom: formatDateForDB(formData.disease.infectedFrom),
        diagnosisDate: formatDateForDB(formData.disease.diagnosisDate)
      },
      claim: {
        ...formData.claim,
        issuedDate: formatDateForDB(formData.claim.issuedDate)
      },
      billing: {
        ...formData.billing,
        dateOfAdmission: formatDateForDB(formData.billing.dateOfAdmission),
        dateOfDischarge: formatDateForDB(formData.billing.dateOfDischarge)
      }
    };

    console.log('Submitting form with data:', formData); // Log form data

    try {
      // Filter out any null dates before sending
      Object.keys(formattedData).forEach(section => {
        Object.keys(formattedData[section]).forEach(field => {
          if (formattedData[section][field] === null) {
            delete formattedData[section][field];
          }
        });
      });

      const response = await axios.post('http://localhost:5000/api/insurance', formattedData);
      console.log('Form submitted successfully:', response.data); // Log response data
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message); // Log detailed error
      setError('Failed to submit the form. Please try again.'); // Set error message
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-glass-dark rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Comprehensive Health Insurance Application</h1>

          {submitted && (
            <div className="mb-6 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <div className="flex items-center text-green-700 dark:text-green-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">Application submitted successfully!</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <div className="flex items-center text-red-700 dark:text-red-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} method="POST" className="space-y-8">
            {/* Personal Information Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Person ID</label>
                  <input
                    type="text"
                    value={formData.personalInfo.personId}
                    onChange={(e) => handleInputChange('personalInfo', 'personId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={formData.personalInfo.firstName}
                    onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={formData.personalInfo.lastName}
                    onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={formData.personalInfo.password}
                    onChange={(e) => handleInputChange('personalInfo', 'password', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.personalInfo.dateOfBirth}
                      onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                      required
                    />
                    {/* <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" /> */}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.personalInfo.status}
                    onChange={(e) => handleInputChange('personalInfo', 'status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Address Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      value={formData.address.state}
                      onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={formData.address.pinCode}
                      onChange={(e) => handleInputChange('address', 'pinCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Policy Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                  <input
                    type="text"
                    value={formData.policy.policyNumber}
                    onChange={(e) => handleInputChange('policy', 'policyNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
                  <select
                    value={formData.policy.policyType}
                    onChange={(e) => handleInputChange('policy', 'policyType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  >
                    <option value="">Select Policy Type</option>
                    <option value="individual">Individual</option>
                    <option value="family">Family</option>
                    <option value="group">Group</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sum Insured</label>
                  <input
                    type="number"
                    value={formData.policy.sumInsured}
                    onChange={(e) => handleInputChange('policy', 'sumInsured', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (years)</label>
                  <input
                    type="number"
                    value={formData.policy.tenure}
                    onChange={(e) => handleInputChange('policy', 'tenure', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Premium</label>
                  <input
                    type="number"
                    value={formData.policy.premium}
                    onChange={(e) => handleInputChange('policy', 'premium', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.policy.startDate}
                      onChange={(e) => handleInputChange('policy', 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                      required
                    />
                    {/* <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" /> */}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.policy.endDate}
                      onChange={(e) => handleInputChange('policy', 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    />
                    {/* <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" /> */}
                  </div>
                </div>
              </div>
            </section>

            {/* Hospital Information Section */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Hospital Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital ID</label>
                  <input
                    type="text"
                    value={formData.hospital.hospitalId}
                    onChange={(e) => handleInputChange('hospital', 'hospitalId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
                  <input
                    type="text"
                    value={formData.hospital.name}
                    onChange={(e) => handleInputChange('hospital', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Address</label>
                  <input
                    type="text"
                    value={formData.hospital.address}
                    onChange={(e) => handleInputChange('hospital', 'address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Is Networked</label>
                  <select
                    value={formData.hospital.isNetworked}
                    onChange={(e) => handleInputChange('hospital', 'isNetworked', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Disease Information Section */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Disease Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disease Name</label>
                  <input
                    type="text"
                    value={formData.disease.name}
                    onChange={(e) => handleInputChange('disease', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disease Code</label>
                  <input
                    type="text"
                    value={formData.disease.code}
                    onChange={(e) => handleInputChange('disease', 'code', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
              </div>
            </section>

            {/* Test Information Section */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Test Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test Code</label>
                  <input
                    type="text"
                    value={formData.test.code}
                    onChange={(e) => handleInputChange('test', 'code', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disease Code</label>
                  <input
                    type="text"
                    value={formData.test.diseaseCode}
                    onChange={(e) => handleInputChange('test', 'diseaseCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    value={formData.test.price}
                    onChange={(e) => handleInputChange('test', 'price', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
              </div>
            </section>

            {/* Billing Information Section */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Billing Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill ID</label>
                  <input
                    type="text"
                    value={formData.billing.billId}
                    onChange={(e) => handleInputChange('billing', 'billId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bill Amount</label>
                  <input
                    type="number"
                    value={formData.billing.billAmount}
                    onChange={(e) => handleInputChange('billing', 'billAmount', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Admission</label>
                  <input
                    type="date"
                    value={formData.billing.dateOfAdmission}
                    onChange={(e) => handleInputChange('billing', 'dateOfAdmission', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Discharge</label>
                  <input
                    type="date"
                    value={formData.billing.dateOfDischarge}
                    onChange={(e) => handleInputChange('billing', 'dateOfDischarge', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
              </div>
            </section>

            {/* Claim Information Section */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Claim Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Claim ID</label>
                  <input
                    type="text"
                    value={formData.claim.claimId}
                    onChange={(e) => handleInputChange('claim', 'claimId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Claimed Amount</label>
                  <input
                    type="number"
                    value={formData.claim.claimedAmount}
                    onChange={(e) => handleInputChange('claim', 'claimedAmount', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issued Amount</label>
                  <input
                    type="number"
                    value={formData.claim.issuedAmount}
                    onChange={(e) => handleInputChange('claim', 'issuedAmount', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issued Date</label>
                  <input
                    type="date"
                    value={formData.claim.issuedDate}
                    onChange={(e) => handleInputChange('claim', 'issuedDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Claim Status</label>
                  <select
                    value={formData.claim.claimStatus}
                    onChange={(e) => handleInputChange('claim', 'claimStatus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="processing">Processing</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-lg"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InsuranceForm;