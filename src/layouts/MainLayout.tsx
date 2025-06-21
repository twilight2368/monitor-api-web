import NavigateItemWithIconOnly from "@/components/navigate-icon-item";
import React, { createContext } from "react";
import { TbApi } from "react-icons/tb";
import { FaServer } from "react-icons/fa6";
import { Outlet } from "react-router";
import ServiceProvider from "@/context/service-context/ServicesProvider";

const Sidebar = () => (
  <div className="w-16 p-0 bg-black text-white flex flex-col items-center py-6 space-y-6">
    <NavigateItemWithIconOnly path="/" icon={<FaServer />} />
    <NavigateItemWithIconOnly path="/services" icon={<TbApi />} />
  </div>
);

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto">
          <div className="text-black">
            <ServiceProvider>
              <Outlet />
            </ServiceProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
