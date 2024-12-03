import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3Icon,
  StarIcon,
  ClockIcon,
  TrendingUpIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react";
import MetricsGrid from "./MetricsGrid";
import TrendsChart from "./TrendsChart";
import IncentiveTracker from "./IncentiveTracker";
import CompetitorBenchmark from "./CompetitorBenchmark";
import EscalationManager from "./EscalationManager";

interface AnalyticsPanelProps {
  className?: string;
  metrics?: Array<{
    title: string;
    value: string | number;
    change?: string;
    trend?: "up" | "down" | "neutral";
    icon: React.ReactNode;
  }>;
  trends?: {
    ratings: Array<{
      date: string;
      value: number;
    }>;
    sentiment: Array<{
      date: string;
      positive: number;
      neutral: number;
      negative: number;
    }>;
  };
}

const AnalyticsPanel = ({
  className = "",
  metrics = [
    {
      title: "Average Rating",
      value: "4.8",
      change: "+0.2 this month",
      trend: "up",
      icon: <StarIcon className="w-5 h-5 text-yellow-500" />,
    },
    {
      title: "Total Reviews",
      value: "1,284",
      change: "+48 this month",
      trend: "up",
      icon: <MessageSquareIcon className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Response Rate",
      value: "95%",
      change: "+5% this month",
      trend: "up",
      icon: <ClockIcon className="w-5 h-5 text-green-500" />,
    },
    {
      title: "Customer Sentiment",
      value: "78%",
      change: "+3% this month",
      trend: "up",
      icon: <TrendingUpIcon className="w-5 h-5 text-purple-500" />,
    },
    {
      title: "Active Customers",
      value: "856",
      change: "+12 this month",
      trend: "up",
      icon: <UsersIcon className="w-5 h-5 text-orange-500" />,
    },
    {
      title: "Review Conversion",
      value: "32%",
      change: "+2% this month",
      trend: "up",
      icon: <BarChart3Icon className="w-5 h-5 text-pink-500" />,
    },
  ],
  trends = {
    ratings: [
      { date: "2024-01", value: 4.2 },
      { date: "2024-02", value: 4.5 },
      { date: "2024-03", value: 4.8 },
    ],
    sentiment: [
      { date: "2024-01", positive: 65, neutral: 25, negative: 10 },
      { date: "2024-02", positive: 70, neutral: 20, negative: 10 },
      { date: "2024-03", positive: 75, neutral: 20, negative: 5 },
    ],
  },
}: AnalyticsPanelProps) => {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [timeRange, setTimeRange] = React.useState("30d");

  return (
    <div className={cn("h-full bg-background p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Monitor your review performance and trends
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <BarChart3Icon className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="incentives">Incentives</TabsTrigger>
          <TabsTrigger value="escalations">Escalations</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <MetricsGrid metrics={metrics} />
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Rating Distribution</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="yelp">Yelp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <TrendsChart data={trends} type="distribution" />
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Response Performance</h3>
                <Select defaultValue="response_time">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="response_time">Response Time</SelectItem>
                    <SelectItem value="response_rate">Response Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <TrendsChart data={trends} type="response" />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Review Trends</h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="rating">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="volume">Volume</SelectItem>
                      <SelectItem value="sentiment">Sentiment</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <BarChart3Icon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <TrendsChart data={trends} type="trends" />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="incentives" className="space-y-6">
          <IncentiveTracker />
        </TabsContent>

        <TabsContent value="escalations" className="space-y-6">
          <EscalationManager />
        </TabsContent>

        <TabsContent value="competitors" className="space-y-6">
          <CompetitorBenchmark />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPanel;
