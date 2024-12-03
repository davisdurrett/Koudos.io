import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import NotificationCenter from "@/components/dashboard/NotificationCenter";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";

const DashboardLayout = () => {
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(true);
  // Remove trailing slash and get the first part of the path
  const activePath =
    "/" + (location.pathname.replace(/^\/|\/$/g, "").split("/")[0] || "");

  return (
    <div className="flex h-screen w-screen bg-background overflow-hidden">
      <Sidebar activePath={activePath} />
      <div className="flex-1 flex">
        <div
          className={`flex-1 overflow-auto ${isNotificationsOpen ? "mr-[400px]" : ""}`}
        >
          <Outlet />
        </div>

        {/* Notification Panel */}
        <div
          className={`fixed right-0 top-0 w-[400px] border-l h-screen bg-background transition-all duration-300 ease-in-out transform ${isNotificationsOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <NotificationCenter
            onToggle={() => setIsNotificationsOpen(!isNotificationsOpen)}
            isOpen={isNotificationsOpen}
          />
        </div>

        {/* Notification Toggle Button (only shown when panel is closed) */}
        {!isNotificationsOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 right-4 z-50"
            onClick={() => setIsNotificationsOpen(true)}
          >
            <BellIcon className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
