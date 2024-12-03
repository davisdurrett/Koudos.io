import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  StarIcon,
  TrendingUpIcon,
  ClockIcon,
  AlertCircleIcon,
  MessageSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronRightIcon,
} from "lucide-react";

const DashboardHome = () => {
  // Sample data - replace with real data
  const ratingTrends = [
    { date: "Jan", value: 4.2 },
    { date: "Feb", value: 4.3 },
    { date: "Mar", value: 4.5 },
    { date: "Apr", value: 4.4 },
    { date: "May", value: 4.6 },
    { date: "Jun", value: 4.8 },
  ];

  const reviewVolume = [
    { date: "Jan", count: 45 },
    { date: "Feb", count: 52 },
    { date: "Mar", count: 48 },
    { date: "Apr", count: 65 },
    { date: "May", count: 58 },
    { date: "Jun", count: 72 },
  ];

  const sentimentData = [
    { name: "Positive", value: 65 },
    { name: "Neutral", value: 25 },
    { name: "Negative", value: 10 },
  ];

  const SENTIMENT_COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  const recentReviews = [
    {
      id: "1",
      author: "John D.",
      rating: 2,
      text: "Service was slower than expected...",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: "2",
      author: "Sarah M.",
      rating: 5,
      text: "Excellent experience! The staff was...",
      time: "4 hours ago",
      status: "responded",
    },
    {
      id: "3",
      author: "Mike R.",
      rating: 1,
      text: "Very disappointed with the...",
      time: "6 hours ago",
      status: "escalated",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your review performance and recent activity
          </p>
        </div>
        <Button>
          <MessageSquareIcon className="w-4 h-4 mr-2" />
          View All Reviews
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Average Rating
              </p>
              <h3 className="text-2xl font-bold mt-2">4.8</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUpIcon className="w-3 h-3 mr-1" /> +0.3 this month
              </p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <StarIcon className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Reviews
              </p>
              <h3 className="text-2xl font-bold mt-2">1,284</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUpIcon className="w-3 h-3 mr-1" /> +48 this month
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <MessageSquareIcon className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Response Rate
              </p>
              <h3 className="text-2xl font-bold mt-2">95%</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUpIcon className="w-3 h-3 mr-1" /> +5% this month
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <ClockIcon className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pending Reviews
              </p>
              <h3 className="text-2xl font-bold mt-2">3</h3>
              <p className="text-xs text-yellow-600 flex items-center mt-1">
                <AlertCircleIcon className="w-3 h-3 mr-1" /> Needs attention
              </p>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <AlertCircleIcon className="w-4 h-4 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4">
        {/* Rating Trends */}
        <Card className="col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">Rating Trends</h3>
              <p className="text-sm text-muted-foreground">
                Average rating over time
              </p>
            </div>
            <Tabs defaultValue="6m" className="w-[200px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="1m">1M</TabsTrigger>
                <TabsTrigger value="6m">6M</TabsTrigger>
                <TabsTrigger value="1y">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ratingTrends}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#FF6B2B"
                  strokeWidth={2}
                  dot={{ fill: "#FF6B2B" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sentiment Distribution */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Sentiment Distribution</h3>
            <p className="text-sm text-muted-foreground">
              Review sentiment analysis
            </p>
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
                    <Cell
                      key={`cell-${index}`}
                      fill={SENTIMENT_COLORS[index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {sentimentData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: SENTIMENT_COLORS[index] }}
                />
                <span className="text-sm text-muted-foreground">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Recent Reviews</h3>
              <p className="text-sm text-muted-foreground">
                Latest customer feedback
              </p>
            </div>
            <Button variant="ghost" className="gap-2">
              View All <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="divide-y">
          {recentReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {review.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.author}</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {review.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {review.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant="secondary"
                  className={cn(
                    review.status === "pending" &&
                      "bg-yellow-100 text-yellow-800",
                    review.status === "responded" &&
                      "bg-green-100 text-green-800",
                    review.status === "escalated" && "bg-red-100 text-red-800",
                  )}
                >
                  {review.status === "pending" && (
                    <ClockIcon className="w-3 h-3 mr-1" />
                  )}
                  {review.status === "responded" && (
                    <CheckCircleIcon className="w-3 h-3 mr-1" />
                  )}
                  {review.status === "escalated" && (
                    <AlertCircleIcon className="w-3 h-3 mr-1" />
                  )}
                  {review.status.charAt(0).toUpperCase() +
                    review.status.slice(1)}
                </Badge>
                <Button size="sm">
                  {review.status === "pending" ? "Respond" : "View"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardHome;
