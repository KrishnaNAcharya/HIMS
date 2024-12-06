import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      navigate('/success', { state: { formData } });
    }, 2000);
  };

  const maskCardNumber = (number) => {
    return number.replace(/\d(?=\d{4})/g, '*');
  };

  const maskCvv = (cvv) => {
    return cvv.replace(/\d/g, '*');
  };

  const calculatePlanAmount = () => {
    const { planType, paymentFrequency } = formData.coverage;
    let baseAmount = 0;

    // Base amounts for different plans
    switch (planType) {
      case 'basic':
        baseAmount = 2000;
        break;
      case 'standard':
        baseAmount = 5000;
        break;
      case 'premium':
        baseAmount = 10000;
        break;
      default:
        baseAmount = 0;
    }

    // Adjust amount based on payment frequency
    switch (paymentFrequency) {
      case 'monthly':
        return baseAmount;
      case 'quarterly':
        return baseAmount * 3;
      case 'yearly':
        return baseAmount * 12;
      default:
        return baseAmount;
    }
  };

  const renderPaymentFields = () => {
    switch (formData.coverage.paymentMethod) {
      case 'upi':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">UPI ID</label>
            <input
              type="text"
              placeholder="example@upi"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
        );
      case 'card':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Card Number</label>
              <input
                type="text"
                value={maskCardNumber(cardNumber)}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">CVV</label>
                <input
                  type="text"
                  value={maskCvv(cvv)}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                  maxLength="3"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Card Holder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </>
        );
      case 'netbanking':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Bank Name</label>
            <input
              type="text"
              placeholder="Enter your bank name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
        );
      case 'emi':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">EMI Plan</label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            >
              <option value="">Select EMI Plan</option>
              <option value="3months">3 Months</option>
              <option value="6months">6 Months</option>
              <option value="12months">12 Months</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-glass-dark flex items-center justify-center py-8">
      <div className="max-w-md w-full bg-white dark:bg-glass-dark rounded-lg shadow-lg p-6 mt-[-50px]">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Payment Details</h2>
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-6">
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            Amount to Pay: ₹{calculatePlanAmount().toLocaleString()}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-300">
            {formData.coverage.planType.charAt(0).toUpperCase() + formData.coverage.planType.slice(1)} Plan - {formData.coverage.paymentFrequency.charAt(0).toUpperCase() + formData.coverage.paymentFrequency.slice(1)} Payment
          </p>
        </div>
        <form onSubmit={handlePayment}>
          <div className="space-y-4">
            {renderPaymentFields()}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full px-4 py-2 rounded-md text-white ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors duration-200`}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;