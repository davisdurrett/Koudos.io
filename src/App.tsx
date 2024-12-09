import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./pages/dashboard";
import AdminLayout from "./pages/admin/layout";
import DashboardHome from "./pages/dashboard/home";
import Reviews from "./pages/dashboard/reviews";
import FeedbackPage from "./pages/dashboard/feedback/index";
import TriggersPage from "./pages/dashboard/triggers";
import Settings from "./pages/dashboard/settings/index";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";
import { SettingsProvider } from "./lib/contexts/settings-context";
import OnboardingPage from "./pages/onboarding";
import { Toaster } from "@/components/ui/toaster";

// Admin Pages
import AdminDashboard from "./pages/admin/dashboard";
import AdminUsers from "./pages/admin/users";
import AdminSettings from "./pages/admin/settings";

// Lazy load the feedback form page
const BusinessFeedbackPage = React.lazy(
  () => import("./pages/feedback/[businessId]"),
);

function App() {
  return (
    <div className="h-full">
      <SettingsProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <p className="text-lg text-muted-foreground">Loading...</p>
            </div>
          }
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route
              path="/feedback/:businessId"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <BusinessFeedbackPage />
                </Suspense>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="automations" element={<TriggersPage />} />
              <Route path="feedback" element={<FeedbackPage />} />
              <Route path="settings/*" element={<Settings />} />
            </Route>

            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>

          <Toaster />
        </Suspense>
      </SettingsProvider>
    </div>
  );
}

export default App;
