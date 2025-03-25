import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, LayoutDashboard, History, Settings, LogOut, User, Menu } from "lucide-react";

export function DashboardLayout({ children }) {
  const [userName, setUserName] = useState("John Doe");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className={`w-64 bg-gray-100 border-r p-4 transition-transform ${isSidebarOpen ? "block" : "hidden"} sm:block`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-500 p-2">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-gray-800">Interview AI</span>
          </div>
          <button
            className="sm:hidden p-2 text-gray-600 hover:text-gray-800"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✖
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-6 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-600 bg-blue-100">
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/history" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100">
            <History className="h-5 w-5" />
            <span>Interview History</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-100">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-6 border-t pt-4">
          <Link to="/logout" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-100">
            <LogOut className="h-5 w-5 text-red-500" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-md">
          <button
            className="sm:hidden p-2 text-gray-600 hover:text-gray-800"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold flex-1">Welcome, {userName}!</h1>
          <Link to="/settings" className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
