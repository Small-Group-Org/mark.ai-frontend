import React from 'react';

const LoadingTransition = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl text-white mb-2">Loading Mark AI</h2>
        <p className="text-blue-400">Please wait while we prepare your content creation tools...</p>
      </div>
    </div>
  );
};

export default LoadingTransition;