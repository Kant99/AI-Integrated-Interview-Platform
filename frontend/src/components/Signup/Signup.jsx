import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Signup values:", values);
      setIsLoading(false);
      alert("Account created successfully!");
    },
  });

  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login values:", values);
      setIsLoading(false);
      alert("Logged in successfully!");
    },
  });

  const activeFormik = isLogin ? loginFormik : signupFormik;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white p-6 sm:p-8 rounded-lg shadow-md">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-black">Create an account</h2>
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

                  <button type="submit" className="w-full bg-black text-white py-3 rounded-md font-medium transform transition-transform duration-200 hover:scale-110">
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </form>
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
