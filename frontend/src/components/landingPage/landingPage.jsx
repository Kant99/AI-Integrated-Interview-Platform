import React, { useEffect, useState } from "react";
import "./landingPage.css";
import {useNavigate} from "react-router";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100); // Smooth fade-in after 100ms
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <div
        className={`text-center transition-all duration-1000 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-inter text-#050505 mb-4">
          MockInterview.ai
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6">
          Master your interview skills with realistic AI simulations.
        </p>

        {/* Get Started Button */}
        <button onClick={() => navigate("/signup")} className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-lg font-medium shadow-md transform transition-transform duration-200 hover:scale-110">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
