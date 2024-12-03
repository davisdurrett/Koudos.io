import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BellIcon, XIcon } from "lucide-react";
import AlertItem from "./AlertItem";

interface NotificationCenterProps {
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  notifications?: Array<{
    id: string;
    type: "review" | "response" | "system";
    priority: "high" | "medium" | "low";
    title: string;
    message: string;
    time: string;
    isRead?: boolean;
    actionUrl?: string;
  }>;
  onClearAll?: () => void;
  onRead?: (id: string) => void;
  onAction?: (id: string) => void;
}

const NotificationCenter = ({
  className = "",
  isOpen = true,
  onToggle = () => {},
  notifications = [
    {
      id: "1",
      type: "review",
      priority: "high",
      title: "New Low Rating Review",
      message:
        "A customer left a 2-star review that requires immediate attention.",
      time: new Date().toISOString(),
      isRead: false,
      actionUrl: "/reviews/123",
    },
    {
      id: "2",
      type: "system",
      priority: "medium",
      title: "Weekly Review Summary",
      message: "Your weekly review performance report is now available.",
      time: new Date(Date.now() - 86400000).toISOString(),
      isRead: true,
      actionUrl: "/analytics",
    },
    {
      id: "3",
      type: "review",
      priority: "high",
      title: "Response Needed",
      message: "3 reviews from the past 24 hours still need responses.",
      time: new Date(Date.now() - 3600000).toISOString(),
      isRead: false,
      actionUrl: "/reviews",
    },
    {
      id: "4",
      type: "system",
      priority: "low",
      title: "Review Milestone Reached",
      message: "Congratulations! You've received your 1,000th review.",
      time: new Date(Date.now() - 7200000).toISOString(),
      isRead: false,
      actionUrl: "/analytics",
    },
    {
      id: "5",
      type: "response",
      priority: "medium",
      title: "Response Approved",
      message:
        "Your response to John D.'s review has been approved and published.",
      time: new Date(Date.now() - 14400000).toISOString(),
      isRead: true,
      actionUrl: "/reviews/456",
    },
    {
      id: "6",
      type: "system",
      priority: "medium",
      title: "Rating Improvement",
      message:
        "Your average rating has improved from 4.2 to 4.5 stars this month!",
      time: new Date(Date.now() - 28800000).toISOString(),
      isRead: false,
      actionUrl: "/analytics",
    },
    {
      id: "7",
      type: "review",
      priority: "high",
      title: "Trending Keywords Detected",
      message:
        "Multiple recent reviews mention 'wait times'. Consider addressing this issue.",
      time: new Date(Date.now() - 43200000).toISOString(),
      isRead: false,
      actionUrl: "/analytics/trends",
    },
  ],
  onClearAll = () => {},
  onRead = () => {},
  onAction = () => {},
}: NotificationCenterProps) => {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <BellIcon className="w-5 h-5" />
          <h2 className="font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={onClearAll}
          >
            Clear All
          </Button>
          <Button variant="ghost" size="icon" onClick={onToggle}>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <AlertItem
                key={notification.id}
                alert={notification}
                onRead={onRead}
                onAction={onAction}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <BellIcon className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No notifications to display
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotificationCenter;
