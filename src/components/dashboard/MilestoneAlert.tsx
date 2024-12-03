import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  TrendingUpIcon,
  StarIcon,
  MessageSquareIcon,
  CheckCircleIcon,
  ShareIcon,
} from "lucide-react";

interface MilestoneAlertProps {
  milestone: {
    id: string;
    type: "rating_improvement" | "review_count" | "response_rate" | "custom";
    title: string;
    description: string;
    value: number;
    previousValue?: number;
    timeframe?: {
      start: string;
      end: string;
    };
    achieved: boolean;
    achievedAt?: string;
  };
  progress?: {
    currentValue: number;
    targetValue: number;
    percentageComplete: number;
  };
  onShare?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const MilestoneAlert = ({
  milestone,
  progress,
  onShare = () => {},
  onDismiss = () => {},
  className = "",
}: MilestoneAlertProps) => {
  const getIcon = () => {
    switch (milestone.type) {
      case "rating_improvement":
        return <StarIcon className="w-5 h-5 text-yellow-500" />;
      case "review_count":
        return <MessageSquareIcon className="w-5 h-5 text-blue-500" />;
      case "response_rate":
        return <TrendingUpIcon className="w-5 h-5 text-green-500" />;
      default:
        return <CheckCircleIcon className="w-5 h-5 text-primary" />;
    }
  };

  const getTimeframeText = () => {
    if (!milestone.timeframe) return "";
    const start = new Date(milestone.timeframe.start);
    const end = new Date(milestone.timeframe.end);
    const diffDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    return `in the last ${diffDays} days`;
  };

  return (
    <Card className={cn("p-4 bg-background", className)}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">{getIcon()}</div>
            <div>
              <h4 className="font-medium">{milestone.title}</h4>
              <p className="text-sm text-muted-foreground">
                {milestone.description} {getTimeframeText()}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            New Milestone
          </Badge>
        </div>

        {/* Progress (if applicable) */}
        {progress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {progress.currentValue} / {progress.targetValue}
              </span>
            </div>
            <Progress value={progress.percentageComplete} className="h-2" />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={onDismiss}
          >
            Dismiss
          </Button>
          <Button size="sm" onClick={onShare}>
            <ShareIcon className="w-4 h-4 mr-2" />
            Share Achievement
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MilestoneAlert;
