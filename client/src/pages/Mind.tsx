import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function MindRoute() {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Simulate 800ms loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      {/* Mind Content */}
      <div className="p-6 h-full flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="mt-3 text-blue-400">Loading mind data...</p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl text-blue-400 mb-4">Mind Page</h2>
            <p className="text-gray-400">This is a placeholder for the Mind content.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}