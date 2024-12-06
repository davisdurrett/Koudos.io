import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./pages/dashboard";
import DashboardHome from "./pages/dashboard/home";
import Reviews from "./pages/dashboard/reviews";
import Analytics from "./pages/dashboard/analytics";
import FeedbackPage from "./pages/dashboard/feedback";
import TemplatesPage from "./pages/dashboard/templates";
import Settings from "./pages/dashboard/settings";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";
import { SettingsProvider } from "./lib/contexts/settings-context";
import OnboardingPage from "./pages/onboarding";
import PublicFeedbackForm from "./pages/feedback";
import { Toaster } from "@/components/ui/toaster";
import ChatPopup from "@/components/chat/ChatPopup";

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
            <Route path="/public/feedback" element={<PublicFeedbackForm />} />

            {/* Protected Dashboard Routes */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="feedback" element={<FeedbackPage />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch all redirect */}
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>

          <ChatPopup />
          <Toaster />
        </Suspense>
      </SettingsProvider>
    </div>
  );
}

export default App;
