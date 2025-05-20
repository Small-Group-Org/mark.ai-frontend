import React from 'react';

interface IconProps {
  color?: string;
  className?: string;
}

const CalendarIcon: React.FC<IconProps> = ({ color = "#ffffff", className = "" }) => {
  return (
    <svg 
      width="31" 
      height="31" 
      viewBox="0 0 31 31" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M24.625 5.16663H6.375C5.40368 5.16663 4.625 5.94531 4.625 6.91663V24.0833C4.625 25.0546 5.40368 25.8333 6.375 25.8333H24.625C25.5963 25.8333 26.375 25.0546 26.375 24.0833V6.91663C26.375 5.94531 25.5963 5.16663 24.625 5.16663Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M20.6667 2.58331V7.74998" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M10.3333 2.58331V7.74998" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M4.625 12.9167H26.375" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CalendarIcon;