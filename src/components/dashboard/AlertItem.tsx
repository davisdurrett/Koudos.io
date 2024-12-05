import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BellIcon, ExternalLinkIcon, FlagIcon } from "lucide-react";

interface AlertItemProps {
  alert?: {
    id: string;
    type: "review" | "response" | "system";
    priority: "high" | "medium" | "low";
    title: string;
    message: string;
    time: string;
    isRead?: boolean;
    actionUrl?: string;
  };
  onRead?: (id: string) => void;
  onAction?: (id: string) => void;
}

const AlertItem = ({
  alert = {
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
  onRead = () => {},
  onAction = () => {},
}: AlertItemProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "review":
        return <FlagIcon className="w-5 h-5" />;
      case "response":
        return <ExternalLinkIcon className="w-5 h-5" />;
      default:
        return <BellIcon className="w-5 h-5" />;
    }
  };

  return (
    <Card
      className={cn(
        "w-full p-4 bg-background",
        !alert.isRead && "bg-primary/5",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "p-2 rounded-full",
            getPriorityColor(alert.priority).replace("bg-", "bg-opacity-20 "),
          )}
        >
          {getTypeIcon(alert.type)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-medium truncate">{alert.title}</h4>
            <Badge
              variant="secondary"
              className={cn("capitalize", getPriorityColor(alert.priority))}
            >
              {alert.priority}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {alert.message}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <time className="text-xs text-muted-foreground">
              {new Date(alert.time).toLocaleString()}
            </time>
            {alert.actionUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => onAction(alert.id)}
              >
                View Details
                <ExternalLinkIcon className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AlertItem;
