import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { BellIcon, XIcon } from "lucide-react";
import AlertItem from "./AlertItem";

interface NotificationCenterProps {
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const mockNotifications = [
  {
    id: "1",
    type: "review",
    priority: "high",
    title: "New 2-Star Review",
    message:
      "A customer left a 2-star review mentioning slow service and quality concerns.",
    time: new Date().toISOString(),
    isRead: false,
    actionUrl: "/reviews/123",
  },
  {
    id: "2",
    type: "review",
    priority: "medium",
    title: "New 3-Star Review",
    message:
      "Customer feedback about wait times and pricing - requires attention.",
    time: new Date(Date.now() - 30 * 60000).toISOString(),
    isRead: false,
    actionUrl: "/reviews/124",
  },
  {
    id: "3",
    type: "system",
    priority: "low",
    title: "Weekly Review Summary",
    message:
      "Your weekly review performance report is now available. Overall rating: 4.5",
    time: new Date(Date.now() - 2 * 3600000).toISOString(),
    isRead: true,
    actionUrl: "/analytics",
  },
  {
    id: "4",
    type: "review",
    priority: "high",
    title: "Urgent: 1-Star Review",
    message:
      "Critical feedback received regarding staff behavior and cleanliness.",
    time: new Date(Date.now() - 4 * 3600000).toISOString(),
    isRead: false,
    actionUrl: "/reviews/125",
  },
  {
    id: "5",
    type: "response",
    priority: "medium",
    title: "Response Needed",
    message:
      "3 reviews from last week still need responses. Maintain response rate above 90%.",
    time: new Date(Date.now() - 12 * 3600000).toISOString(),
    isRead: true,
    actionUrl: "/reviews/pending",
  },
  {
    id: "6",
    type: "system",
    priority: "low",
    title: "AI Response Training Complete",
    message:
      "Your AI response model has been updated with your latest approved responses.",
    time: new Date(Date.now() - 24 * 3600000).toISOString(),
    isRead: true,
  },
];

const NotificationCenter = ({
  className = "",
  isOpen = true,
  onToggle = () => {},
}: NotificationCenterProps) => {
  const [notifications, setNotifications] = React.useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleAction = (id: string) => {
    // Handle clicking on a notification
    console.log("Clicked notification:", id);
  };

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
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Notifications List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <AlertItem
                key={notification.id}
                alert={notification}
                onAction={handleAction}
                onDismiss={handleDismiss}
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
