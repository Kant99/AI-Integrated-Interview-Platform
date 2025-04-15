import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./Login";
import SignupForm from "./SignupForm";
import { useLocation, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active form based on URL path
  const isLogin = location.pathname === "/login";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-black">
          {isLogin ? "Login to your account" : "Create an account"}
        </h2>
        <p className="text-center text-gray-500 text-sm sm:text-base">
          Enter your details below to {isLogin ? "login" : "sign up"} and start practicing interviews.
        </p>

        {/* Tab Switcher */}
        <div className="mt-6 flex bg-gray-200 rounded-lg">
          <button
            className={`w-1/2 py-2 text-xs sm:text-sm font-medium rounded-l-lg transition ${!isLogin ? "bg-white" : "text-gray-600 hover:text-gray-800"}`}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
          <button
            className={`w-1/2 py-2 text-xs sm:text-sm font-medium rounded-r-lg transition ${isLogin ? "bg-white" : "text-gray-600 hover:text-gray-800"}`}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        {/* Animated Form Section */}
        <div className="mt-6 relative">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Login />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <SignupForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
