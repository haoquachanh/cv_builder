// src/components/layout/DashboardLayout.tsx
import { useState, useContext } from "react";
import { Sidebar } from "./Sidebar";
import { AuthContext } from "@/context/AuthContext";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const context = useContext(AuthContext);
  const user = context?.user;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between">
          <div className="container mx-auto px-4 flex w-full items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              <FaBars className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg 
                            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                            text-sm placeholder-gray-500"
                  placeholder="Search templates, CVs..."
                />
              </div>
            </div>

            {/* Right side icons/profile */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <FaBell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  {user?.email}
                </span>
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {user?.email?.[0].toUpperCase() || "U"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
