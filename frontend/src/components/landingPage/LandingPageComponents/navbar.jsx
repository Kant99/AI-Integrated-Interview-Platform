import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../services/firebase";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">MockInterview.ai</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</Link>
            <Link to="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</Link>
            <Link to="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
            <Link to="/booking" className="text-gray-600 hover:text-blue-600 transition-colors">Booking</Link>

            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Log In
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="#features" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-blue-600">Features</Link>
            <Link to="#how-it-works" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-blue-600">How It Works</Link>
            <Link to="#pricing" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-blue-600">Pricing</Link>
            <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-blue-600">Booking</Link>

            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-blue-600">Dashboard</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white bg-red-500 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="block w-full text-left px-3 py-2 text-white bg-blue-600 hover:bg-blue-700">
                  Log In
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
