import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  StarIcon,
  SettingsIcon,
  MessageSquareTextIcon,
  HomeIcon,
  LogOutIcon,
  ZapIcon,
  InboxIcon,
  BuildingIcon,
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
  onSignOut?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  notifications?: number;
}

const Sidebar = ({ className = "", onSignOut = () => {} }: SidebarProps) => {
  const location = useLocation();
  const activePath = location.pathname;

  // Load and manage notification counts
  const [reviewNotifications, setReviewNotifications] = React.useState(
    parseInt(localStorage.getItem("unreadReviews") || "0"),
  );
  const [feedbackNotifications, setFeedbackNotifications] = React.useState(
    parseInt(localStorage.getItem("unreadFeedback") || "0"),
  );

  // Clear notifications when visiting respective pages
  React.useEffect(() => {
    if (activePath === "/reviews") {
      setReviewNotifications(0);
      localStorage.setItem("unreadReviews", "0");
    } else if (activePath === "/feedback") {
      setFeedbackNotifications(0);
      localStorage.setItem("unreadFeedback", "0");
    }
  }, [activePath]);

  // Simulate receiving new notifications
  React.useEffect(() => {
    // Check for new reviews every 30 seconds
    const reviewInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance of new review
        const currentReviews = parseInt(
          localStorage.getItem("unreadReviews") || "0",
        );
        const newReviews = currentReviews + 1;
        localStorage.setItem("unreadReviews", newReviews.toString());
        setReviewNotifications(newReviews);
      }
    }, 30000);

    // Check for new feedback every 45 seconds
    const feedbackInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        // 20% chance of new feedback
        const currentFeedback = parseInt(
          localStorage.getItem("unreadFeedback") || "0",
        );
        const newFeedback = currentFeedback + 1;
        localStorage.setItem("unreadFeedback", newFeedback.toString());
        setFeedbackNotifications(newFeedback);
      }
    }, 45000);

    return () => {
      clearInterval(reviewInterval);
      clearInterval(feedbackInterval);
    };
  }, []);

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      label: "Reviews",
      path: "/reviews",
      icon: <StarIcon className="w-5 h-5" />,
      notifications: reviewNotifications,
    },
    {
      label: "Automations",
      path: "/automations",
      icon: <ZapIcon className="w-5 h-5" />,
    },
    {
      label: "Feedback",
      path: "/feedback",
      icon: <MessageSquareTextIcon className="w-5 h-5" />,
      notifications: feedbackNotifications,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: <SettingsIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col w-[280px] h-screen bg-background border-r px-4 py-6",
        className,
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-8">
        <span className="text-2xl font-bold text-primary tracking-tight">
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
                "bg-primary/10 text-primary hover:bg-primary/20",
            )}
            asChild
          >
            <Link to={item.path} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </div>
              {item.notifications ? (
                <Badge
                  variant="secondary"
                  className="ml-auto bg-primary/10 text-primary hover:bg-primary/15"
                >
                  {item.notifications}
                </Badge>
              ) : null}
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
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
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
            <DropdownMenuItem asChild>
              <Link to="/admin">
                <BuildingIcon className="w-4 h-4 mr-2" />
                Admin Panel
              </Link>
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
