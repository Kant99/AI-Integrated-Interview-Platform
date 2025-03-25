import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Signup from './components/SignUp/Signup.jsx'
import { BrowserRouter, Route, Routes } from "react-router";
import DashboardPage from './components/Dashboard/dashboard.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<DashboardPage/>} />
    </Routes>
  </BrowserRouter>,
)
