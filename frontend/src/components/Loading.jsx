
import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-dark-bg flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-400 dark:border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;