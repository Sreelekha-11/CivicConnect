
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AuthProvider } from "./Context/AuthContext";
import { ComplaintProvider } from "./Context/ComplaintContext";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Issues from "./Pages/Issues";
import ReportIssue from "./Pages/ReportIssue";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

import Dashboard from "./Pages/Dashboard";
import MyComplaints from "./Pages/MyComplaints";
import ComplaintDetails from "./Pages/ComplaintDetails";
import AdminDashboard from "./Pages/AdminDashboard";
import ManageComplaints from "./Pages/ManageComplaints";
import ManageUsers from "./Pages/ManageUsers";
import StaffDashboard from "./Pages/StaffDashboard";

function AppContent() {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Citizen Pages */}
        <Route
          path="/report"
          element={
            <ProtectedRoute allowedRole="citizen">
              <ReportIssue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="citizen">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute allowedRole="citizen">
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaint/:id"
          element={
            <ProtectedRoute allowedRole="citizen">
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin Pages */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-complaints"
          element={
            <ProtectedRoute allowedRole="admin">
              <ManageComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-users"
          element={
            <ProtectedRoute allowedRole="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        {/* Department Staff Page */}
        <Route
          path="/staff-dashboard"
          element={
            <ProtectedRoute allowedRole="staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ComplaintProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ComplaintProvider>
    </AuthProvider>
  );
}

export default App;
