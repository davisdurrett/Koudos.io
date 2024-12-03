import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart3Icon,
  MessageSquareIcon,
  SettingsIcon,
  HomeIcon,
  LogOutIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  className?: string;
  activePath?: string;
  onSignOut?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    label: "Reviews",
    path: "/reviews",
    icon: <MessageSquareIcon className="w-5 h-5" />,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: <BarChart3Icon className="w-5 h-5" />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <SettingsIcon className="w-5 h-5" />,
  },
];

const Sidebar = ({
  className = "",
  activePath = "/",
  onSignOut = () => {},
}: SidebarProps) => {
  return (
    <div
      className={cn(
        "flex flex-col w-[280px] h-screen bg-background border-r px-4 py-6",
        className,
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <span className="text-2xl font-bold text-koudos tracking-tight">
          Koudos
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
                "bg-koudos/10 text-koudos hover:bg-koudos/20",
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-base font-normal"
            >
              <div className="w-8 h-8 rounded-full bg-koudos/10 text-koudos flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">
                  john@example.com
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[240px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SettingsIcon className="w-4 h-4 mr-2" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={onSignOut}>
              <LogOutIcon className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
