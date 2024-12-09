import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  UsersIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  LogOutIcon,
  BuildingIcon,
} from "lucide-react";

export const Sidebar = () => {
  const location = useLocation();
  const activePath = location.pathname;

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboardIcon className="w-5 h-5" />,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: <UsersIcon className="w-5 h-5" />,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: <SettingsIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex flex-col w-[280px] h-screen bg-background border-r px-4 py-6">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <BuildingIcon className="w-6 h-6 text-primary" />
        <span className="text-2xl font-bold text-primary tracking-tight">
          Koudos Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={activePath === item.path ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 text-base font-normal",
              activePath === item.path &&
                "bg-primary/10 text-primary hover:bg-primary/20",
            )}
            asChild
          >
            <Link to={item.path}>
              {item.icon}
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="pt-4 border-t">
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
