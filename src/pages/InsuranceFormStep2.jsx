import { useState } from 'react';

const InsuranceFormStep2 = ({ formData, handleInputChange, setPage }) => {
  const [familyMembers, setFamilyMembers] = useState(formData.coverage.familyMembers || []);
  const [errors, setErrors] = useState({});

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: '', relation: '', age: '', gender: '' }]);
    handleInputChange('coverage', 'familyMembers', [...familyMembers, { name: '', relation: '', age: '', gender: '' }]);
  };

  const updateFamilyMember = (index, field, value) => {
    const updatedMembers = familyMembers.map((member, i) => {
      if (i === index) {
        return { ...member, [field]: value };
      }
      return member;
    });
    setFamilyMembers(updatedMembers);
    handleInputChange('coverage', 'familyMembers', updatedMembers);
  };

  const removeFamilyMember = (index) => {
    const updatedMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(updatedMembers);
    handleInputChange('coverage', 'familyMembers', updatedMembers);
  };

  const handleBenefitChange = (benefit, isChecked) => {
    let updatedBenefits = formData.coverage.additionalBenefits || [];

    if (isChecked) {
      if (benefit === 'Maternity Cover' && formData.personalInfo.gender !== 'female') {
        setErrors({
          ...errors,
          benefits: 'Maternity Cover can only be selected by female applicants'
        });
        return;
      }
      updatedBenefits = [...updatedBenefits, benefit.toLowerCase()];
    } else {
      updatedBenefits = updatedBenefits.filter(b => b !== benefit.toLowerCase());
    }

    setErrors({
      ...errors,
      benefits: null
    });
    handleInputChange('coverage', 'additionalBenefits', updatedBenefits);
  };

  return (
    <section className="max-w-2xl mx-auto bg-white dark:bg-glass-light p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Choose Your Coverage</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Type of Plan</label>
          <select
            value={formData.coverage.planType}
            onChange={(e) => handleInputChange('coverage', 'planType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a Plan</option>
            <option value="basic">Basic Health Cover</option>
            <option value="standard">Standard Health Cover</option>
            <option value="premium">Premium Health Cover</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Coverage Amount</label>
          <select
            value={formData.coverage.coverageAmount}
            onChange={(e) => handleInputChange('coverage', 'coverageAmount', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Coverage Amount</option>
            <option value="500000">₹5 Lakhs</option>
            <option value="1000000">₹10 Lakhs</option>
            <option value="2000000">₹20 Lakhs</option>
            <option value="5000000">₹50 Lakhs</option>
          </select>
        </div>

        {/* Add Plan Benefits Selection */}
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Additional Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Maternity Cover', 'Critical Illness', 'Dental Cover', 'Vision Care'].map((benefit) => (
              <label key={benefit} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.coverage.additionalBenefits?.includes(benefit.toLowerCase())}
                  onChange={(e) => handleBenefitChange(benefit, e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{benefit}</span>
              </label>
            ))}
          </div>
          {errors.benefits && (
            <p className="text-red-500 text-sm mt-1">{errors.benefits}</p>
          )}
        </div>

        {/* Add Payment Preference */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Payment Method</label>
              <select
                value={formData.coverage.paymentMethod}
                onChange={(e) => handleInputChange('coverage', 'paymentMethod', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Payment Method</option>
                <option value="upi">UPI</option>
                <option value="card">Credit/Debit Card</option>
                <option value="netbanking">Net Banking</option>
                <option value="emi">EMI</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Family Members to be Covered</h3>
            <button 
              type="button"
              onClick={addFamilyMember}
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Family Member
            </button>
          </div>

          {familyMembers.map((member, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 space-y-4">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">Family Member {index + 1}</h4>
                <button 
                  type="button"
                  onClick={() => removeFamilyMember(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateFamilyMember(index, 'name', e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border rounded-lg 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <select
                  value={member.relation}
                  onChange={(e) => updateFamilyMember(index, 'relation', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Relation</option>
                  <option value="spouse">Spouse</option>
                  <option value="child">Child</option>
                  <option value="parent">Parent</option>
                </select>
                <input
                  type="number"
                  value={member.age}
                  onChange={(e) => updateFamilyMember(index, 'age', e.target.value)}
                  placeholder="Age"
                  className="w-full px-3 py-2 border rounded-lg 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <select
                  value={member.gender}
                  onChange={(e) => updateFamilyMember(index, 'gender', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Premium Payment Frequency</label>
          <select
            value={formData.coverage.paymentFrequency}
            onChange={(e) => handleInputChange('coverage', 'paymentFrequency', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Frequency</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
        </div>

        <div className="flex justify-between mt-8">
          <button 
            type="button" 
            onClick={() => setPage(1)} 
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back
          </button>
          <button 
            type="button" 
            onClick={() => setPage(3)} 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Continue →
          </button>
        </div>
      </div>
    </section>
  );
};

export default InsuranceFormStep2;
