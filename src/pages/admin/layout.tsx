import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
