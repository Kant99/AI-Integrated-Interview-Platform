import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async ({ email, password }) => {
      setIsLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        navigate("/"); // Redirect to dashboard or home
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleForgotPassword = async () => {
    if (!resetEmail) return setResetMessage("Please enter your email.");
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset link sent!");
    } catch (error) {
      setResetMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold">Login</h3>
      <form className="space-y-4 mt-4" onSubmit={loginFormik.handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.email}
          />
          {loginFormik.touched.email && loginFormik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{loginFormik.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.password}
          />
          {loginFormik.touched.password && loginFormik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{loginFormik.errors.password}</p>
          )}
        </div>

        <div className="text-right text-sm">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-black text-white py-3 rounded-md hover:scale-105 transition-transform ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <AnimatePresence>
        {showForgotPassword && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg w-96"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
            >
              <h3 className="text-center font-semibold text-lg">Reset Password</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full p-3 border mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleForgotPassword}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 mt-3 rounded-md hover:bg-blue-700 transition"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
              {resetMessage && (
                <p className="text-center text-sm mt-2 text-gray-700">{resetMessage}</p>
              )}
              <button
                className="w-full text-sm text-gray-600 mt-2 hover:underline"
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmail("");
                  setResetMessage("");
                }}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;
