import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import ChatPopup from "@/components/chat/ChatPopup";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <ChatPopup />
    </div>
  );
};

export default DashboardLayout;
