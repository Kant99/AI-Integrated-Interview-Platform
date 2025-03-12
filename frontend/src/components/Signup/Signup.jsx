import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { registerUser, loginUser, forgotPassword } from "../../api/authApi";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null); // Store logged-in user data
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Forgot Password Modal State
  const [resetEmail, setResetEmail] = useState(""); // Stores entered email for reset
  const [resetMessage, setResetMessage] = useState(""); // Success/Error message

  // Validation Schemas
  const signupValidationSchema = Yup.object({
    name: Yup.string().min(2, "Name must be at least 2 characters").required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must include at least one uppercase letter")
      .matches(/\d/, "Must include at least one number")
      .matches(/[@$!%*?&]/, "Must include at least one special character")
      .required("Password is required"),
  });

  const loginValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Formik Setup
  const signupFormik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await registerUser(values); // Call API to register user
        alert("Account created successfully! Please login.");
        setIsLogin(true); // Switch to login mode after successful signup
      } catch (error) {
        alert(error); // Show error message if registration fails
      } finally {
        setIsLoading(false);
      }
    },
  });
  
  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const userData = await loginUser(values); // Call API to login user
        alert("Logged in successfully!");
        setUser(userData); // Store user data in state
      } catch (error) {
        alert(error); // Show error message if login fails
      } finally {
        setIsLoading(false);
      }
    },
  });
  const activeFormik = isLogin ? loginFormik : signupFormik;

   // Forgot Password Form Handler
   const handleForgotPassword = async () => {
    if (!resetEmail) {
      setResetMessage("Please enter your email.");
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword({ email: resetEmail }); // Call backend API
      setResetMessage("Reset link sent! Check your email.");
    } catch (error) {
      setResetMessage("Failed to send reset link. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white p-6 sm:p-8 rounded-lg shadow-md">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-black">{isLogin?"Login to your account":"Create an account"}</h2>
        <p className="text-center text-gray-500 text-sm sm:text-base">
          Enter your details below to {isLogin ? "login to your account" : "create your account"} and start practicing interviews.
        </p>

        {/* Tab Switcher */}
        <div className="mt-6 flex bg-gray-200 rounded-lg">
          <button
            className={`w-1/2 py-2 text-xs sm:text-sm font-medium rounded-l-lg transition ${
              !isLogin ? "bg-white" : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
          <button
            className={`w-1/2 py-2 text-xs sm:text-sm font-medium rounded-r-lg transition ${
              isLogin ? "bg-white" : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>

        {/* Form Transition */}
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
                <h3 className="text-lg font-semibold">Login</h3>
                <p className="text-gray-500 text-sm">Enter your credentials to login</p>

                <form className="mt-4 space-y-4" onSubmit={loginFormik.handleSubmit}>
                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full p-3 border rounded-md text-gray-900"
                      onChange={loginFormik.handleChange}
                      onBlur={loginFormik.handleBlur}
                      value={loginFormik.values.email}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full p-3 border rounded-md text-gray-900"
                      onChange={loginFormik.handleChange}
                      onBlur={loginFormik.handleBlur}
                      value={loginFormik.values.password}
                    />
                  </div>
                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button type="submit" className="w-full bg-black text-white py-3 rounded-md font-medium transform transition-transform duration-200 hover:scale-110">
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </form>

                {/* Forgot Password Modal */}
                      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPassword && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md w-96"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-center ">Reset Password</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full p-3 border rounded-md mt-4"
              />

              <button
                onClick={handleForgotPassword}
                className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>

              <button className="w-full text-gray-600 py-2 mt-2" onClick={() => setShowForgotPassword(false)}>
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold">Create Account</h3>
                <p className="text-gray-500 text-sm">Enter your information to create an account</p>

                <form className="mt-4 space-y-4" onSubmit={signupFormik.handleSubmit}>
                  {/* Name */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      className="w-full p-3 border rounded-md text-gray-900"
                      onChange={signupFormik.handleChange}
                      onBlur={signupFormik.handleBlur}
                      value={signupFormik.values.name}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="w-full p-3 border rounded-md text-gray-900"
                      onChange={signupFormik.handleChange}
                      onBlur={signupFormik.handleBlur}
                      value={signupFormik.values.email}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full p-3 border rounded-md text-gray-900"
                      onChange={signupFormik.handleChange}
                      onBlur={signupFormik.handleBlur}
                      value={signupFormik.values.password}
                    />
                  </div>

                  <button type="submit" className="w-full bg-black text-white py-3 rounded-md font-medium transform transition-transform duration-200 hover:scale-110">
                    {isLoading ? "Creating account..." : "Create Account"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Signup;
