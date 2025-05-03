import React from 'react';

interface MainContentProps {
  className?: string;
}

const MainContent: React.FC<MainContentProps> = ({ className = '' }) => {
  return (
    <div className={`flex-1 ml-[90px] ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        {/* Left Panel - Blue */}
        <div className="bg-[#466EA1] h-full">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Dashboard</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-sm text-white/70 mb-1">Total Users</h3>
                <p className="text-2xl font-bold text-white">24,532</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-sm text-white/70 mb-1">Active Now</h3>
                <p className="text-2xl font-bold text-white">1,429</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-sm text-white/70 mb-1">Total Revenue</h3>
                <p className="text-2xl font-bold text-white">$89,425</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-sm text-white/70 mb-1">Conversion</h3>
                <p className="text-2xl font-bold text-white">12.8%</p>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-300 mr-3 flex items-center justify-center">
                      <span className="text-blue-800 font-bold text-xs">JD</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">John Doe</p>
                      <p className="text-white/60 text-sm">Created a new project</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-white/60 text-xs">2h ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-300 mr-3 flex items-center justify-center">
                      <span className="text-green-800 font-bold text-xs">AS</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Alice Smith</p>
                      <p className="text-white/60 text-sm">Completed task: Design Review</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-white/60 text-xs">3h ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-300 mr-3 flex items-center justify-center">
                      <span className="text-purple-800 font-bold text-xs">RJ</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Robert Johnson</p>
                      <p className="text-white/60 text-sm">Added new comment</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-white/60 text-xs">5h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel - White */}
        <div className="bg-[#ECECEC] h-full overflow-y-auto">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Projects</h2>
            
            {/* Search Bar */}
            <div className="relative mb-8">
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="absolute left-3 top-3.5 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Project Cards */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Website Redesign</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">In Progress</span>
                </div>
                <p className="text-gray-600 mb-4">Complete overhaul of company website with new branding and improved UX.</p>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                  </div>
                  <div className="text-gray-500 text-sm">Deadline: 15 May</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Mobile App Development</h3>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Planning</span>
                </div>
                <p className="text-gray-600 mb-4">Create a new mobile application for iOS and Android platforms.</p>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-white"></div>
                  </div>
                  <div className="text-gray-500 text-sm">Deadline: 30 June</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-800">Content Strategy</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Completed</span>
                </div>
                <p className="text-gray-600 mb-4">Develop comprehensive content strategy for Q3 marketing campaigns.</p>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-white"></div>
                  </div>
                  <div className="text-gray-500 text-sm">Completed: 2 April</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;