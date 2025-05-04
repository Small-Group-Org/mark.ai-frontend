import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';

export default function MindRoute() {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[90px] h-screen">
        {/* Header */}
        <Header />

        {/* Mind Content */}
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl text-blue-400 mb-4">Mind Page</h2>
            <p className="text-gray-400">This is a placeholder for the Mind content.</p>
          </div>
        </main>
      </div>
    </div>
  );
}