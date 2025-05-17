import React from "react";
import { Link } from "wouter";
import { SettingsIcon } from "../dashboard/IconComponents";
import { navItems } from "../../commons/routes";
import markPng from "../../assets/mark.png";

interface SidebarProps {
  currentRoute?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRoute = "create" }) => {
  const sidebarBg = "bg-[#0E2D60]";

  return (
    <aside
      className={`w-[80px] ${sidebarBg} text-white flex flex-col items-center fixed left-0 top-0 bottom-0 h-screen z-10`}
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
                  className={
                    currentRoute === item.path.slice(1) ? "text-white" : ""
                  }
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

      <Link href="#">
        <div className="mt-auto group text-gray-300 hover:text-white flex-shrink-0 pb-4 cursor-pointer">
          <div className="p-3 rounded-lg group-hover:bg-white/5">
            <SettingsIcon />
          </div>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
