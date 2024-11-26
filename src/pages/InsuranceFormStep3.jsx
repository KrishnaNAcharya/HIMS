import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InsuranceFormStep3 = ({ formData, handleInputChange, setPage }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const formatDateForDB = (dateString) => {
    if (!dateString) return null;
    return dateString;
  };

  const validateFields = () => {
    const newErrors = {};
    const numericFields = [
      { value: formData.healthInfo.height, name: 'Height' },
      { value: formData.healthInfo.weight, name: 'Weight' },
      // Add other numeric fields if necessary
    ];

    for (const field of numericFields) {
      if (field.value < 0) {
        newErrors[field.name.toLowerCase()] = `${field.name} cannot be negative`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    setSubmitted(true);
    setError('');
    setIsLoading(true);

    try {
      // Ensure formData is correctly structured
      if (!formData.personalInfo || !formData.healthInfo || !formData.coverage) {
        throw new Error('Missing required form sections');
      }

      // Format data before sending
      const formattedData = {
        personalInfo: {
          ...formData.personalInfo,
          dateOfBirth: formData.personalInfo.dateOfBirth || null,
        },
        address: { ...formData.address },
        healthInfo: {
          ...formData.healthInfo,
          height: Number(formData.healthInfo.height),
          weight: Number(formData.healthInfo.weight),
        },
        coverage: {
          ...formData.coverage,
          coverageAmount: Number(formData.coverage.coverageAmount),
          additionalBenefits: Array.isArray(formData.coverage.additionalBenefits) 
            ? formData.coverage.additionalBenefits 
            : []
        }
      };

      console.log('Sending formatted data:', formattedData);

      const response = await axios.post('http://localhost:5000/api/insurance', formattedData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.success) {
        // Redirect to payment page instead of success
        navigate('/payment', { state: { formData: formattedData } });
      } else {
        throw new Error(response.data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Detailed submission error:', error.response?.data || error);
      setError(
        error.response?.data?.message || 
        error.message || 
        'Failed to submit form. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <section className="max-w-2xl mx-auto bg-white dark:bg-glass-light p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Health Information</h2>
        
        <div className="space-y-6">
          {/* Basic Health Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Height (cm)</label>
              <input
                type="number"
                value={formData.healthInfo.height}
                onChange={(e) => handleInputChange('healthInfo', 'height', e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors.height ? 'border-red-500' : 'border-gray-300'
                } rounded-lg 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors.height && (
                <p className="text-red-500 text-sm mt-1">{errors.height}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={formData.healthInfo.weight}
                onChange={(e) => handleInputChange('healthInfo', 'weight', e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors.weight ? 'border-red-500' : 'border-gray-300'
                } rounded-lg 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors.weight && (
                <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
              )}
            </div>
          </div>

          {/* Medical History */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Do you have any pre-existing conditions?</label>
            <select
              value={formData.healthInfo.hasExistingConditions}
              onChange={(e) => handleInputChange('healthInfo', 'hasExistingConditions', e.target.value === 'true')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {formData.healthInfo.hasExistingConditions && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Please describe your conditions</label>
              <textarea
                value={formData.healthInfo.existingConditions}
                onChange={(e) => handleInputChange('healthInfo', 'existingConditions', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Smoking Status</label>
            <select
              value={formData.healthInfo.smokingStatus}
              onChange={(e) => handleInputChange('healthInfo', 'smokingStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Status</option>
              <option value="never">Never Smoked</option>
              <option value="former">Former Smoker</option>
              <option value="current">Current Smoker</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Family History of Major Illnesses</label>
            <textarea
              value={formData.healthInfo.familyHistory}
              onChange={(e) => handleInputChange('healthInfo', 'familyHistory', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Please mention any significant family medical history"
            />
          </div>

          {/* Add Lifestyle Section */}
          <div className="space-y-6 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Lifestyle & Habits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Exercise Frequency</label>
                <select
                  value={formData.healthInfo.exerciseFrequency}
                  onChange={(e) => handleInputChange('healthInfo', 'exerciseFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Frequency</option>
                  <option value="never">Never</option>
                  <option value="occasionally">1-2 times/week</option>
                  <option value="regularly">3-4 times/week</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Alcohol Consumption</label>
                <select
                  value={formData.healthInfo.alcoholConsumption}
                  onChange={(e) => handleInputChange('healthInfo', 'alcoholConsumption', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Option</option>
                  <option value="never">Never</option>
                  <option value="occasionally">Occasionally</option>
                  <option value="regularly">Regularly</option>
                </select>
              </div>
            </div>
          </div>

          {/* Add Current Medications Section */}
          <div className="space-y-4 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Current Medications</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Are you currently taking any medications?</label>
              <select
                value={formData.healthInfo.takingMedications}
                onChange={(e) => handleInputChange('healthInfo', 'takingMedications', e.target.value === 'true')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            {formData.healthInfo.takingMedications && (
              <textarea
                value={formData.healthInfo.medications}
                onChange={(e) => handleInputChange('healthInfo', 'medications', e.target.value)}
                placeholder="Please list your current medications"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                required
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button 
              type="button" 
              onClick={() => setPage(2)} 
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              disabled={isLoading}
            >
              ← Back
            </button>
            <button 
              type="submit" 
              className={`${
                isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              } text-white px-6 py-2 rounded-lg transition-colors`}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Complete Application'}
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default InsuranceFormStep3;
