import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./pages/dashboard";
import DashboardHome from "./pages/dashboard/home";
import Reviews from "./pages/dashboard/reviews";
import ReviewsPage from "./pages/dashboard/reviews/index";
import FeedbackPage from "./pages/dashboard/feedback/index";
import AutomationsPage from "./pages/dashboard/automations/index";
import AutomationEditPage from "./pages/dashboard/automations/edit";
import Settings from "./pages/dashboard/settings/index";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";
import { SettingsProvider } from "./lib/contexts/settings-context";
import OnboardingPage from "./pages/onboarding";
import { Toaster } from "@/components/ui/toaster";
import AdminLayout from "./pages/admin/layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminBusinesses from "./pages/admin/businesses";
import AdminBusinessDetails from "./pages/admin/businesses/[id]";
import AdminUsers from "./pages/admin/users";
import AdminPayments from "./pages/admin/payments";
import AdminSettings from "./pages/admin/settings";

// Lazy load the feedback form page
const BusinessFeedbackPage = React.lazy(
  () => import("./pages/feedback/[businessId]"),
);

function App() {
  useEffect(() => {
    // Check for business ID in URL params
    const params = new URLSearchParams(window.location.search);
    const businessId = params.get("business");
    if (businessId) {
      // Store business context
      localStorage.setItem("currentBusinessId", businessId);
      // Store business name for display
      localStorage.setItem("currentBusinessName", `Business ${businessId}`);
      // Clean up URL
      window.history.replaceState({}, "", "/");
    }
  }, []);

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

            {/* Protected Dashboard Routes */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="automations" element={<AutomationsPage />} />
              <Route
                path="automations/:id/edit"
                element={<AutomationEditPage />}
              />
              <Route path="feedback" element={<FeedbackPage />} />
              <Route path="settings/*" element={<Settings />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="businesses" element={<AdminBusinesses />} />
              <Route path="businesses/:id" element={<AdminBusinessDetails />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="settings" element={<AdminSettings />} />
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
