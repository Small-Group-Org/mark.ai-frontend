import React, { useState } from 'react';
import { DashboardIcon, CalendarIcon, MindIcon, SettingsIcon } from '../../assets/icons';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive = false, onClick }) => {
  return (
    <div className="flex flex-col items-center mb-8" onClick={onClick}>
      <div 
        className={`flex justify-center items-center w-[51px] h-[52px] rounded-lg ${
          isActive ? 'bg-white bg-opacity-10' : ''
        }`}
      >
        {icon}
      </div>
      <span className="text-white text-sm mt-2">{label}</span>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <div className="w-[90px] h-screen bg-[#0E2D60] flex flex-col items-center py-8">
      {/* Logo or brand icon could go here */}
      <div className="mt-10">
        <SidebarItem 
          icon={<DashboardIcon />} 
          label="Dashboard" 
          isActive={activeItem === 'dashboard'}
          onClick={() => setActiveItem('dashboard')}
        />
        
        <SidebarItem 
          icon={<CalendarIcon />} 
          label="Calendar" 
          isActive={activeItem === 'calendar'}
          onClick={() => setActiveItem('calendar')}
        />
        
        <SidebarItem 
          icon={<MindIcon />} 
          label="Mind" 
          isActive={activeItem === 'mind'}
          onClick={() => setActiveItem('mind')}
        />
      </div>

      <div className="mt-auto mb-8">
        <SidebarItem 
          icon={<SettingsIcon />} 
          label="Settings" 
          isActive={activeItem === 'settings'}
          onClick={() => setActiveItem('settings')}
        />
      </div>
    </div>
  );
};

export default Sidebar;