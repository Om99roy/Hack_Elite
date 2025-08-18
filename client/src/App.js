import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";
// Animation components using Framer Motion

// Pages
import LandingPage from "./components/pages/LandingPage";
import PatientDashboard from "./components/pages/PatientDashboard";
import DoctorPortal from "./components/pages/DoctorPortal";
import EyeTestCamera from "./components/pages/EyeTestCamera";
import ResultsViewer from "./components/pages/ResultsViewer";
import AppointmentBooking from "./components/pages/AppointmentBooking";
import PatientOnboarding from "./components/pages/PatientOnboarding";
import LoginPage from "./components/pages/LoginPage";
import AboutUs from "./components/pages/AboutUs";
import ContactUs from "./components/pages/ContactUs";
import NotFound from "./components/pages/NotFound";

// Components
import ProtectedRoute from "./components/auth/ProtectedRoute";
// ...existing code... (loading spinner import removed intentionally)

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
          <div className="App min-h-screen bg-[linear-gradient(180deg,#ffd3ea_0%,#e54be0_45%,#6b1f80_100%)]">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/onboarding" element={<PatientOnboarding />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Protected Patient Routes */}
              <Route path="/patient/dashboard" element={ <ProtectedRoute role="patient"> <PatientDashboard /></ProtectedRoute>}/>

             <Route path="/patient/eye-test" element={<ProtectedRoute role="patient"><EyeTestCamera /></ProtectedRoute>}/>
              <Route path="/patient/results/:testId" element={
                  <ProtectedRoute role="patient">
                    <ResultsViewer />
                  </ProtectedRoute>
                }
              />
              <Route path="/patient/appointments"
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
              {/* Fallback route for unknown paths */}
              <Route path="*" element={<NotFound />} />
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
