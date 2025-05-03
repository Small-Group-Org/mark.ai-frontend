import React from 'react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`h-[84px] w-full bg-white border-b border-gray-200 flex items-center px-6 ${className}`}>
      <div className="flex-1 flex">
        {/* Left Side - Logo/Title */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>
        
        {/* Center - Navigation */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex space-x-8">
            <li className="border-b-2 border-blue-500">
              <a href="#" className="text-blue-600 font-medium px-2 py-6">Dashboard</a>
            </li>
            <li>
              <a href="#" className="text-gray-500 hover:text-gray-800 font-medium px-2 py-6">Projects</a>
            </li>
            <li>
              <a href="#" className="text-gray-500 hover:text-gray-800 font-medium px-2 py-6">Tasks</a>
            </li>
            <li>
              <a href="#" className="text-gray-500 hover:text-gray-800 font-medium px-2 py-6">Calendar</a>
            </li>
            <li>
              <a href="#" className="text-gray-500 hover:text-gray-800 font-medium px-2 py-6">Reports</a>
            </li>
          </ul>
        </nav>
        
        {/* Right Side - User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-800">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Messages */}
          <button className="relative p-2 text-gray-500 hover:text-gray-800">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* User Profile */}
          <div className="flex items-center ml-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <span className="text-blue-800 font-bold">JD</span>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-800">John Doe</div>
              <div className="text-xs text-gray-500">Product Manager</div>
            </div>
            <svg className="ml-2 w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;