import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../services/firebase";
import "../landingPage.css";

export default function HeroSection() {
  const [user] = useAuthState(auth);

  return (
    <section className="py-20 bg-[#f5f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="mb-12 lg:mb-0">
            {user && (
              <h2 className="text-2xl font-semibold text-blue-600 animate-hiUserGlow mb-2">
                Hi, {user.displayName} 👋
              </h2>
            )}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Ace Your Next Interview with AI-Powered Practice
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              MockInterview.ai uses advanced AI to simulate realistic interview scenarios,
              provide instant feedback, and help you land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                <Link to="/signup">Get Started Free</Link>
              </button>

              <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 flex items-center">
                <Link to="#how-it-works" className="flex items-center">
                  See How It Works
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform hover:translate-x-1" />
                </Link>
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <img
              src="/placeholder.svg"
              alt="AI Interview Simulation"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-blue-600 bg-opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
