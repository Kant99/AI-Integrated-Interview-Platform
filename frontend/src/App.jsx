// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/landingPage";
import AuthPage from "./components/Auth/AuthPage";
import UserDashboard from "./components/UserDashboard/userDashboard";
import InterviewForm from "./components/UserDashboard/interviewForm";
import InterviewPage from "./components/UserDashboard/interviewPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setup-interview"
        element={
          <ProtectedRoute>
            <InterviewForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview"
        element={
          <ProtectedRoute>
            <InterviewPage />
          </ProtectedRoute>
        }
      />

      {/* Add more protected or public routes here as needed */}
    </Routes>
  );
};

export default App;
