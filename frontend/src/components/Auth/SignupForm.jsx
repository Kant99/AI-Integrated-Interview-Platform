import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signupFormik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: Yup.object({
      name: Yup.string().min(2, "Too short").required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(/[A-Z]/, "At least one uppercase")
        .matches(/\d/, "At least one number")
        .matches(/[@$!%*?&]/, "At least one special character")
        .required("Password is required"),
    }),
    onSubmit: async ({ name, email, password }, { resetForm }) => {
      setIsLoading(true);
      try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCred.user, { displayName: name });
        alert("Account created!");
        resetForm();
        navigate("/"); // or dashboard/profile
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form className="space-y-4 mt-6" onSubmit={signupFormik.handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          onChange={signupFormik.handleChange}
          onBlur={signupFormik.handleBlur}
          value={signupFormik.values.name}
        />
        {signupFormik.touched.name && signupFormik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{signupFormik.errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          onChange={signupFormik.handleChange}
          onBlur={signupFormik.handleBlur}
          value={signupFormik.values.email}
        />
        {signupFormik.touched.email && signupFormik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{signupFormik.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter strong password"
          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          onChange={signupFormik.handleChange}
          onBlur={signupFormik.handleBlur}
          value={signupFormik.values.password}
        />
        {signupFormik.touched.password && signupFormik.errors.password && (
          <p className="text-red-500 text-sm mt-1">{signupFormik.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-black text-white py-3 rounded-md hover:scale-105 transition-transform ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
