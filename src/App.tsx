import React, { Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./pages/dashboard";
import DashboardHome from "./pages/dashboard/home";
import Reviews from "./pages/dashboard/reviews";
import Analytics from "./pages/dashboard/analytics";
import Notifications from "./pages/dashboard/notifications";
import Settings from "./pages/dashboard/settings";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";
import { SettingsProvider } from "./lib/contexts/settings-context";
import { Toaster } from "@/components/ui/toaster";
import ChatPopup from "@/components/chat/ChatPopup";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon } from "lucide-react";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  return (
    <SettingsProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        }
      >
        <Routes>
          {/* Auth Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Dashboard Routes */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch all redirect */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>

        {/* Chat Button & Popup */}
        {!isChatOpen && (
          <Button
            className="fixed bottom-4 right-4 shadow-lg"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageSquareIcon className="w-4 h-4 mr-2" />
            Ask AI Assistant
          </Button>
        )}
        <ChatPopup
          isOpen={isChatOpen}
          isMinimized={isChatMinimized}
          onClose={() => setIsChatOpen(false)}
          onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
        />

        <Toaster />
      </Suspense>
    </SettingsProvider>
  );
}

export default App;
