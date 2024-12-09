import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = () => {
  const location = useLocation();
  // Remove trailing slash and get the first part of the path
  const activePath =
    "/" + (location.pathname.replace(/^\/|\/$/g, "").split("/")[0] || "");

  return (
    <div className="flex h-screen w-screen bg-background overflow-hidden">
      <Sidebar activePath={activePath} />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
