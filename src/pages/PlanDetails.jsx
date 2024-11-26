import React from "react";
import { useNavigate } from "react-router-dom";

// Define your plans and comparison data here
const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    description: "Basic coverage with essential health benefits.",
    price: "₹8,000/month",
    comparison: [
      { feature: "Doctor Visits", coverage: "Limited", additionalInfo: "Up to 10 visits/year" },
      { feature: "Hospital Stay", coverage: "Partial", additionalInfo: "Covers 80% of costs" },
      { feature: "Prescription Drugs", coverage: "Basic", additionalInfo: "Limited to generics" },
    ],
  },
  {
    id: "standard",
    name: "Standard Plan",
    description: "Comprehensive coverage with benefits.",
    price: "₹16,000/month",
    comparison: [
      { feature: "Doctor Visits", coverage: "Full", additionalInfo: "Unlimited visits" },
      { feature: "Hospital Stay", coverage: "Full", additionalInfo: "Covers 100% of costs" },
      { feature: "Prescription Drugs", coverage: "Comprehensive", additionalInfo: "Includes brand-name drugs" },
    ],
  },
  {
    id: "premium",
    name: "Premium Plan",
    description: "All-inclusive coverage with top-tier benefits.",
    price: "₹24,000/month",
    comparison: [
      { feature: "Doctor Visits", coverage: "Full", additionalInfo: "Priority appointments" },
      { feature: "Hospital Stay", coverage: "Full", additionalInfo: "Private room coverage" },
      { feature: "Prescription Drugs", coverage: "Premium", additionalInfo: "Includes all drugs, no co-pay" },
    ],
  },
];

const PlanDetails = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    navigate("/get-quote", { state: { selectedPlan: plan } });
  };

  return (
    <section id="plans" className="py-20 bg-gray-100 dark:bg-glass-dark">
      <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Our Plans</h3>
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white dark:bg-glass-light p-6 rounded-lg shadow-md transition-transform transform hover:translate-y-[-10px] hover:shadow-xl cursor-pointer"
          >
            <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{plan.name}</h4>
            <p className="mb-4 text-gray-600 dark:text-gray-300">{plan.description}</p>
            <p className="font-bold text-lg mb-4 text-blue-600 dark:text-blue-400">{plan.price}</p>
            <div className="mt-6">
              <table className="min-w-full bg-transparent text-sm">
                <thead>
                  <tr>
                    <th className="py-2 text-left text-gray-700 dark:text-gray-300">Feature</th>
                    <th className="py-2 text-left text-gray-700 dark:text-gray-300">Coverage</th>
                    <th className="py-2 text-left text-gray-700 dark:text-gray-300">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.comparison.map((item, i) => (
                    <tr key={i}>
                      <td className="py-1 text-left text-gray-600 dark:text-gray-300">{item.feature}</td>
                      <td className="py-1 text-left text-gray-600 dark:text-gray-300">{item.coverage}</td>
                      <td className="py-1 text-left text-gray-600 dark:text-gray-300">{item.additionalInfo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Add a Select Plan button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => handleSelectPlan(plan)}
                className="px-6 py-2 mb-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlanDetails;