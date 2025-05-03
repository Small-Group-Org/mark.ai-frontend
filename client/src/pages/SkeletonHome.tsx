import React from 'react';
import Sidebar from '@/components/Skeleton/Sidebar';
import Header from '@/components/Skeleton/Header';
import MainContent from '@/components/Skeleton/MainContent';

const SkeletonHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header is positioned at the top */}
      <Header />
      
      {/* Sidebar is fixed on the left */}
      <Sidebar />
      
      {/* MainContent will take the remaining space */}
      <MainContent />
    </div>
  );
};

export default SkeletonHome;