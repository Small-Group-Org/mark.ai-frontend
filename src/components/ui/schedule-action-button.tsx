import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface ScheduleActionButtonProps {
  onSchedule?: () => void;
  onToggleOptions?: () => void;
  buttonType?: 'schedule' | 'draft';
  className?: string;
}

const ScheduleActionButton = ({
  onSchedule,
  onToggleOptions,
  buttonType = 'schedule',
  className = '',
}: ScheduleActionButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (event: React.MouseEvent) => {
    // Stop propagation to prevent the click outside handler from firing
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`flex rounded-lg shadow-sm relative ${className}`}>
      <button 
        className="px-6 py-2 text-sm font-medium bg-cyan-500 text-white hover:bg-cyan-600 whitespace-nowrap rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        onClick={onSchedule}
      >
        {buttonType === 'schedule' ? 'Schedule Post' : 'Save Draft'}
      </button>
      <button 
        className="px-2 py-2 bg-cyan-500 text-white hover:bg-cyan-700 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        onClick={handleDropdownToggle}
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        <ChevronDown className={`h-5 w-5 transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isDropdownOpen && (
        <div 
          ref={dropdownRef}
          className="absolute right-0 bottom-full mb-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                if (onToggleOptions) onToggleOptions();
              }}
              className="group flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              role="menuitem"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Post
            </button>
            
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                if (onToggleOptions) onToggleOptions();
              }}
              className="group outline-none flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              role="menuitem"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Draft Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleActionButton; 