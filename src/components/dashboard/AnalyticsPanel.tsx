import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
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
  TrendingUpIcon,
  MessageSquareIcon,
  ArrowRightIcon,
  ClockIcon,
  MailIcon,
} from "lucide-react";
import MetricsGrid from "./MetricsGrid";
import TrendsChart from "./TrendsChart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AnalyticsPanelProps {
  className?: string;
}

const SENTIMENT_COLORS = {
  positive: "#22c55e",
  neutral: "#f59e0b",
  negative: "#ef4444",
};

const AnalyticsPanel = ({ className = "" }: AnalyticsPanelProps) => {
  const [timeRange, setTimeRange] = React.useState("30d");

  const sentimentData = [
    { name: "Positive", value: 65, color: SENTIMENT_COLORS.positive },
    { name: "Neutral", value: 25, color: SENTIMENT_COLORS.neutral },
    { name: "Negative", value: 10, color: SENTIMENT_COLORS.negative },
  ];

  const trendData = [
    { date: "Jan", rating: 4.2, reviews: 42 },
    { date: "Feb", rating: 4.5, reviews: 48 },
    { date: "Mar", rating: 4.6, reviews: 52 },
    { date: "Apr", rating: 4.8, reviews: 58 },
    { date: "May", rating: 4.7, reviews: 55 },
    { date: "Jun", rating: 4.9, reviews: 62 },
  ];

  return (
    <div
      className={cn(
        "h-full bg-background p-6 space-y-6 overflow-auto",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Monitor your review performance and trends
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
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

      {/* Review Performance */}
      <div>
        <h3 className="text-lg font-medium mb-4">Review Performance</h3>
        <MetricsGrid
          metrics={[
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
              title: "Customer Sentiment",
              value: "78%",
              change: "+3% this month",
              trend: "up",
              icon: <TrendingUpIcon className="w-5 h-5 text-purple-500" />,
            },
            {
              title: "Response Time",
              value: "2.4h",
              change: "-0.3h this month",
              trend: "up",
              icon: <ClockIcon className="w-5 h-5 text-green-500" />,
            },
          ]}
        />
      </div>

      {/* Campaign Performance */}
      <div>
        <h3 className="text-lg font-medium mb-4">Campaign Performance</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Email Campaign */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <MailIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Emails</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold">2,847</p>
                    <span className="text-xs text-green-600">+156</span>
                  </div>
                  <p className="text-xs text-muted-foreground">this month</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <ArrowRightIcon className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email Conversion</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold">42%</p>
                    <span className="text-xs text-green-600">+3%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">this month</p>
                </div>
              </div>
            </Card>
          </div>

          {/* SMS Campaign */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <MessageSquareIcon className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total SMS</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold">1,563</p>
                    <span className="text-xs text-green-600">+89</span>
                  </div>
                  <p className="text-xs text-muted-foreground">this month</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <ArrowRightIcon className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">SMS Conversion</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold">38%</p>
                    <span className="text-xs text-green-600">+2%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">this month</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-4 gap-6">
        {/* Sentiment Distribution */}
        <Card className="p-6 col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Sentiment Distribution</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Rating Trends */}
        <Card className="p-6 col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Rating Trends</h3>
            <Select defaultValue="rating">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rating"
                  name="Avg Rating"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="reviews"
                  name="Reviews"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
