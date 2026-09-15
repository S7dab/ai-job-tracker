import axios from "axios";
import React, { useEffect } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import Signup from "./pages/Signup";
import EditJob from "./pages/EditJob";
import AddJob from "./pages/AddJob";
import AiAnalyzer from "./pages/AI-pages/AiAnalyzer";
import CvAnalyzer from "./pages/AI-pages/CvAnalyzer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* protected route */}
        {/* dashboard page */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* jobs page  */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobsPage />
            </ProtectedRoute>
          }
        />
        {/* jobs Details page  */}
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetailsPage />
            </ProtectedRoute>
          }
        />
        {/* jobs edit page  */}
        <Route
          path="/jobs/add"
          element={
            <ProtectedRoute>
              <AddJob />
            </ProtectedRoute>
          }
        />
        {/* jobs edit page  */}
        <Route
          path="/jobs/:id/edit"
          element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          }
        />
          {/* Ai Analyze page  */}
        <Route
          path="/ai-analyzer"
          element={
            <ProtectedRoute>
              <AiAnalyzer />
            </ProtectedRoute>
          }
        />
          {/* Ai CV Analyze page  */}
        <Route
          path="/cv-analyze"
          element={
            <ProtectedRoute>
              <CvAnalyzer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
