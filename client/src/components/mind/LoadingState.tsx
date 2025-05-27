import React from 'react';
import { User } from 'lucide-react';
import LoadingDots from './LoadingDots';

const LoadingState: React.FC = () => {
  return (
    <div className="w-full h-screen bg-gray-50 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-8 bg-violet-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-violet-600" />
          </div>
          <h2 className="text-2xl font-bold text-violet-800 mb-6">
            Brand Profile Loading
          </h2>
          <p className="text-base text-gray-600 mb-8">
            Building your comprehensive brand profile...
          </p>
          <div className="flex justify-center">
            <LoadingDots />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState; 