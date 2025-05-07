// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/landingPage";
import AuthPage from "./components/Auth/AuthPage";
import UserDashboard from "./components/UserDashboard/userDashboard";
import InterviewForm from "./components/UserDashboard/interviewForm";
import InterviewPage from "./components/UserDashboard/interviewPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Feedback from "./components/UserDashboard/feedback";

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
      <Route
        path="/feedback"
        element={
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        }/>

      
    </Routes>
  );
};

export default App;
