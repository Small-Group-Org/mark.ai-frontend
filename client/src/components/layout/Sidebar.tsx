import React, { useState } from "react";
import { Link } from "wouter";
import { SettingsIcon } from "../dashboard/IconComponents";
import { navItems } from "../../commons/routes";
import markPng from "../../assets/mark.png";
import { CircleUser } from "lucide-react";
import UserProfileDialog from "@/components/ui/UserProfileDialog";

interface SidebarProps {
  currentRoute?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRoute = "create" }) => {
  const sidebarBg = "bg-[#0E2D60]";
  const [showUserProfile, setShowUserProfile] = useState(false);

  return (
    <>
      <aside
        className={`w-[80px] ${sidebarBg} text-white flex-col items-center fixed left-0 top-0 bottom-0 h-screen z-10 hidden md:flex`}
      >
        <img
          src={markPng}
          alt="Mark AI Logo"
          className="w-16 h-w-16 my-4 rounded-full flex-shrink-0 object-cover"
        />

        <nav className="flex flex-col items-center gap-4 flex-grow w-full mt-2">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className={`flex flex-col items-center justify-center text-center relative cursor-pointer px-3 py-4 rounded-lg h-[65px] w-[70px] group ${
                  currentRoute === item.path.slice(1)
                    ? "text-white bg-white/10"
                    : "text-gray-300 hover:text-white"
                } `}
              >
                <div className="mb-1">
                  <item.icon
                    className={`w-7 h-7 ${
                      currentRoute === item.path.slice(1) ? "text-white" : ""
                    }`}
                  />
                </div>
                <span
                  className={`${
                    item.label === "Dashboard" ? "text-[11px]" : "text-xs"
                  } font-medium`}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </nav>

        {/* User Profile Icon */}
        <div 
          className="mt-auto group text-gray-300 hover:text-white flex-shrink-0 pb-4 cursor-pointer"
          onClick={() => setShowUserProfile(true)}
        >
          <div className="p-3 rounded-lg group-hover:bg-white/5 flex items-center justify-center">
            <CircleUser className="w-7 h-7" />
          </div>
        </div>
      </aside>

            {/* User Profile Dialog */}
      <UserProfileDialog 
        open={showUserProfile} 
        onOpenChange={setShowUserProfile} 
      />
    </>
  );
};

export default Sidebar;
