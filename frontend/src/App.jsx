// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/landingPage";
import AuthPage from "./components/Auth/AuthPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
    </Routes>
  );
};

export default App;
