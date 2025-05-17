import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/Layout';
import CreateContent from '../components/dashboard/CreateContent';

export default function CreatePostRoute() {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay 
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Shorter loading time for the main page

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="mt-3 text-blue-400">Loading content creation tools...</p>
          </div>
        </div>
      ) : (
        <CreateContent />
      )}
    </DashboardLayout>
  );
}