import React from "react";
import { Link } from "react-router-dom";

export function DashboardFooter() {
  return (
    <footer className="mt-auto border-t py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row px-4">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AI Mock Interview Platform. All rights reserved.
        </p>
        <nav className="flex gap-4 text-sm text-gray-500">
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
          <Link to="/support" className="hover:underline">
            Support
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
}
