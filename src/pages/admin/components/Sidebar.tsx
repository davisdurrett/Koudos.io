import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BuildingIcon, LogOutIcon } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="flex flex-col w-[240px] h-screen bg-background border-r px-3 py-6">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <BuildingIcon className="w-6 h-6 text-primary" />
        <span className="text-xl font-semibold text-primary tracking-tight">
          Admin Panel
        </span>
      </div>

      {/* Sign Out */}
      <div className="mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-base font-normal text-red-600 hover:text-red-600 hover:bg-red-50"
        >
          <LogOutIcon className="w-5 h-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
