import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  StarIcon,
  TrendingUpIcon,
  MessageSquareIcon,
  ClockIcon,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
}

interface MetricsGridProps {
  className?: string;
  metrics?: MetricCardProps[];
}

const MetricCard = ({ title, value, change, trend, icon }: MetricCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="p-6 bg-background">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">
          {title}
        </span>
        <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold">{value}</h3>
        {change && (
          <p className={cn("text-sm", getTrendColor())}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {change}
          </p>
        )}
      </div>
    </Card>
  );
};

const MetricsGrid = ({
  className = "",
  metrics = [
    {
      title: "Average Rating",
      value: "4.8",
      change: "+0.2 this month",
      trend: "up",
      icon: <StarIcon className="w-5 h-5 text-primary" />,
    },
    {
      title: "Total Reviews",
      value: "1,284",
      change: "+48 this month",
      trend: "up",
      icon: <MessageSquareIcon className="w-5 h-5 text-primary" />,
    },
    {
      title: "Response Rate",
      value: "92%",
      change: "-3% this month",
      trend: "down",
      icon: <TrendingUpIcon className="w-5 h-5 text-primary" />,
    },
    {
      title: "Average Response Time",
      value: "2.4h",
      change: "Same as last month",
      trend: "neutral",
      icon: <ClockIcon className="w-5 h-5 text-primary" />,
    },
  ],
}: MetricsGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        className,
      )}
    >
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default MetricsGrid;
