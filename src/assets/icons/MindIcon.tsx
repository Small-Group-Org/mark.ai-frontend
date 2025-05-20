import React from 'react';

interface IconProps {
  color?: string;
  className?: string;
}

const MindIcon: React.FC<IconProps> = ({ color = "#ffffff", className = "" }) => {
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
        d="M15.5 25.8333C21.2695 25.8333 25.8333 21.2695 25.8333 15.5C25.8333 9.73045 21.2695 5.16663 15.5 5.16663C9.73045 5.16663 5.16663 9.73045 5.16663 15.5C5.16663 21.2695 9.73045 25.8333 15.5 25.8333Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M15.5 20.6667C18.3995 20.6667 20.6667 18.3995 20.6667 15.5C20.6667 12.6005 18.3995 10.3333 15.5 10.3333C12.6005 10.3333 10.3333 12.6005 10.3333 15.5C10.3333 18.3995 12.6005 20.6667 15.5 20.6667Z" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M15.5 15.5L19.2792 11.7209" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MindIcon;