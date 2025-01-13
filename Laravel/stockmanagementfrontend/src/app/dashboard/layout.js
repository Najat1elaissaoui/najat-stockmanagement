"use client";

import SidebarComponent from "@/components/SidebarComponent"; 
import HeaderComponent from "@/components/header/HeaderComponent";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; 
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarClose = (e) => {
    e.stopPropagation();
    setSidebarOpen(false);
  };

  return (
    <>
    <HeaderComponent />
      <button 
        className="lg:hidden p-4 text-gray-500"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <div className="flex h-screen bg-gray-100">

        {/* Mobile Sidebar */}
        <aside 
          className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
          onClick={() => setSidebarOpen(false)} 
        >
          <div 
            className="w-[300px] flex flex-col justify-center bg-gray-100  h-full relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              className="absolute top-4 right-4 p-2 text-gray-500"
              onClick={handleSidebarClose} 
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <SidebarComponent />
          </div>
        </aside>

        {/* Desktop Sidebar */}
        <aside className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} lg:block  transition-all ease-in-out duration-300`}>
          <SidebarComponent />
        </aside>

        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 bg-gray-100">
            {children} 
          </main>
        </div>
      </div>
    </>
  );
}
