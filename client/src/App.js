import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";
// Animation components using Framer Motion

// Pages
import LandingPage from "./pages/LandingPage";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorPortal from "./pages/DoctorPortal";
import EyeTestCamera from "./pages/EyeTestCamera";
import ResultsViewer from "./pages/ResultsViewer";
import AppointmentBooking from "./pages/AppointmentBooking";
import PatientOnboarding from "./pages/PatientOnboarding";
import LoginPage from "./pages/LoginPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

// Components
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <div className="App min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/onboarding" element={<PatientOnboarding />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Protected Patient Routes */}
              <Route
                path="/patient/dashboard"
                element={
                  <ProtectedRoute role="patient">
                    <PatientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/eye-test"
                element={
                  <ProtectedRoute role="patient">
                    <EyeTestCamera />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/results/:testId"
                element={
                  <ProtectedRoute role="patient">
                    <ResultsViewer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/patient/appointments"
                element={
                  <ProtectedRoute role="patient">
                    <AppointmentBooking />
                  </ProtectedRoute>
                }
              />

              {/* Protected Doctor Routes */}
              <Route
                path="/doctor/portal"
                element={
                  <ProtectedRoute role="doctor">
                    <DoctorPortal />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
              }}
            />
          </div>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
