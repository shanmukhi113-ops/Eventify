import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded pages (advanced React pattern)
const Home        = lazy(() => import("./pages/Home"));
const Discover    = lazy(() => import("./pages/Discover"));
const Login       = lazy(() => import("./pages/Login"));
const Register    = lazy(() => import("./pages/Register"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const CreateEvent = lazy(() => import("./pages/CreateEvent"));
const Dashboard   = lazy(() => import("./pages/Dashboard"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      Loading...
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <Toaster position="top-right" />
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"         element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/login"    element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/event/:id" element={<EventDetail />} />
              {/* Protected routes */}
              <Route path="/create" element={
                <ProtectedRoute><CreateEvent /></ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute><Dashboard /></ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}