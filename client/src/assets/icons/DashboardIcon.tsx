import React from 'react';

interface IconProps {
  color?: string;
  className?: string;
}

const DashboardIcon: React.FC<IconProps> = ({ color = "#ffffff", className = "" }) => {
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
        d="M13.75 3.875H5.5C4.5335 3.875 3.75 4.6585 3.75 5.625V16.75C3.75 17.7165 4.5335 18.5 5.5 18.5H13.75C14.7165 18.5 15.5 17.7165 15.5 16.75V5.625C15.5 4.6585 14.7165 3.875 13.75 3.875Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M13.75 22H5.5C4.5335 22 3.75 22.7835 3.75 23.75V25.5C3.75 26.4665 4.5335 27.25 5.5 27.25H13.75C14.7165 27.25 15.5 26.4665 15.5 25.5V23.75C15.5 22.7835 14.7165 22 13.75 22Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M25.5 22H17.25C16.2835 22 15.5 22.7835 15.5 23.75V25.5C15.5 26.4665 16.2835 27.25 17.25 27.25H25.5C26.4665 27.25 27.25 26.4665 27.25 25.5V23.75C27.25 22.7835 26.4665 22 25.5 22Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M25.5 3.875H17.25C16.2835 3.875 15.5 4.6585 15.5 5.625V7.375C15.5 8.3415 16.2835 9.125 17.25 9.125H25.5C26.4665 9.125 27.25 8.3415 27.25 7.375V5.625C27.25 4.6585 26.4665 3.875 25.5 3.875Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M25.5 12.625H17.25C16.2835 12.625 15.5 13.4085 15.5 14.375V16.75C15.5 17.7165 16.2835 18.5 17.25 18.5H25.5C26.4665 18.5 27.25 17.7165 27.25 16.75V14.375C27.25 13.4085 26.4665 12.625 25.5 12.625Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DashboardIcon;