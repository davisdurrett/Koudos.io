import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon, TrendingUpIcon, CalendarIcon } from "lucide-react";
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
  Legend,
} from "recharts";

interface TrendsChartProps {
  className?: string;
  data?: {
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

const TrendsChart = ({
  className = "",
  data = {
    ratings: [
      { date: "Jan", value: 4.2 },
      { date: "Feb", value: 4.5 },
      { date: "Mar", value: 4.3 },
      { date: "Apr", value: 4.6 },
      { date: "May", value: 4.8 },
      { date: "Jun", value: 4.7 },
    ],
    sentiment: [
      { date: "Jan", positive: 65, neutral: 25, negative: 10 },
      { date: "Feb", positive: 70, neutral: 20, negative: 10 },
      { date: "Mar", positive: 68, neutral: 22, negative: 10 },
      { date: "Apr", positive: 72, neutral: 18, negative: 10 },
      { date: "May", positive: 75, neutral: 20, negative: 5 },
      { date: "Jun", positive: 78, neutral: 17, negative: 5 },
    ],
  },
}: TrendsChartProps) => {
  const [timeRange, setTimeRange] = React.useState("6m");
  const [chartType, setChartType] = React.useState("ratings");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === "Rating" ? " stars" : "%"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn("p-6 bg-background", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Review Trends</h3>
          <p className="text-sm text-muted-foreground">
            Track your review performance over time
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chart Tabs */}
      <Tabs
        value={chartType}
        onValueChange={setChartType}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ratings">
            <StarIcon className="w-4 h-4 mr-2" />
            Rating Trends
          </TabsTrigger>
          <TabsTrigger value="sentiment">
            <TrendingUpIcon className="w-4 h-4 mr-2" />
            Sentiment Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ratings" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.ratings}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 5]}
                ticks={[0, 1, 2, 3, 4, 5]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                name="Rating"
                stroke="#FF6B2B"
                strokeWidth={2}
                dot={{ fill: "#FF6B2B" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>

        <TabsContent value="sentiment" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data.sentiment}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="positive"
                name="Positive"
                stackId="1"
                stroke="#22C55E"
                fill="#22C55E"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="neutral"
                name="Neutral"
                stackId="1"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="negative"
                name="Negative"
                stackId="1"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6">
        {chartType === "ratings" ? (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">
              Average Rating
            </span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
              <span className="text-sm text-muted-foreground">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
              <span className="text-sm text-muted-foreground">Neutral</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="text-sm text-muted-foreground">Negative</span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default TrendsChart;
