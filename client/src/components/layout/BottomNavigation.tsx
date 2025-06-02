import React from "react";
import { Link } from "wouter";
import { navItems } from "../../commons/routes";

interface BottomNavigationProps {
  currentRoute?: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentRoute = "create" }) => {
  const navBg = "bg-[#0E2D60]";

  return (
    <nav
      className={`${navBg} text-white fixed bottom-0 left-0 right-0 z-20 md:hidden border-t border-gray-700/50`}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`flex flex-col items-center justify-center text-center cursor-pointer px-2 py-1 rounded-lg min-w-[60px] ${
                currentRoute === item.path.slice(1)
                  ? "text-white bg-white/10"
                  : "text-gray-300"
              }`}
            >
              <div className="mb-1">
                <item.icon
                  className={`w-6 h-6 ${
                    currentRoute === item.path.slice(1) ? "text-white" : ""
                  }`}
                />
              </div>
              <span className="text-[10px] font-medium">
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation; 