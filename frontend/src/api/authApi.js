import axios from "axios";

// Set Base URL for API requests
const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // Backend URL
  withCredentials: true, // Allows cookies (JWT tokens)
});

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/login", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

// Get Profile (Protected Route)
export const getProfile = async () => {
  try {
    const response = await API.get("/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Not authorized";
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await API.post("/logout");
  } catch (error) {
    throw error.response?.data?.message || "Logout failed";
  }
};

// Forgot Password API Call
export const forgotPassword = async (emailData) => {
    try {
      const response = await API.post("/forgot-password", emailData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Password reset failed";
    }
  };


