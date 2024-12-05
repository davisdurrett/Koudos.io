import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  DownloadIcon,
  AlertCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import TrendsChart from "@/components/dashboard/TrendsChart";

const Analytics = () => {
  const [timeRange, setTimeRange] = React.useState("30d");

  const handleExport = (type: string) => {
    console.log(`Exporting ${type} data...`);
  };

  return (
    <div className="h-full bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Review performance metrics and insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Comparison */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Average Rating
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold">4.8</h3>
                <span className="text-sm text-green-600 flex items-center">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +0.3
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                vs last period: 4.5
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
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold">1,284</h3>
                <span className="text-sm text-green-600 flex items-center">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +48
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                vs last period: 1,236
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
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold">92%</h3>
                <span className="text-sm text-red-600 flex items-center">
                  <ArrowDownIcon className="w-3 h-3 mr-1" />
                  -3%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                vs last period: 95%
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <TrendingUpIcon className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Avg Response Time
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold">2.4h</h3>
                <span className="text-sm text-green-600 flex items-center">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  -0.6h
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                vs last period: 3.0h
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <ClockIcon className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Key Improvement Areas */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Key Improvement Areas</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
            <AlertCircleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium">Response Time Needs Attention</h4>
              <p className="text-sm text-muted-foreground mt-1">
                20% of reviews from the past week took over 24 hours to receive
                a response. Consider enabling automated responses for faster
                engagement.
              </p>
              <Button
                variant="link"
                className="text-yellow-600 p-0 h-auto mt-2"
              >
                View affected reviews
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
            <AlertCircleIcon className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-medium">
                Negative Review Trend in Service Category
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                There's been a 15% increase in negative reviews mentioning "wait
                times" this month. Consider reviewing staffing levels during
                peak hours.
              </p>
              <Button variant="link" className="text-red-600 p-0 h-auto mt-2">
                View analysis
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Rating Distribution</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("ratings")}
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>{rating}</span>
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <span>42%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${rating * 20}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Review Volume Trends</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("volume")}
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <TrendsChart
            data={[
              { date: "Jan", reviews: 42 },
              { date: "Feb", reviews: 48 },
              { date: "Mar", reviews: 52 },
              { date: "Apr", reviews: 58 },
              { date: "May", reviews: 55 },
              { date: "Jun", reviews: 62 },
            ]}
            type="volume"
          />
        </Card>
      </div>

      {/* Sentiment Analysis */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Sentiment Analysis</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("sentiment")}
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Top Positive Keywords
            </h4>
            {[
              { word: "friendly", count: 128, change: "+12%" },
              { word: "helpful", count: 98, change: "+8%" },
              { word: "professional", count: 87, change: "+15%" },
            ].map((item) => (
              <div
                key={item.word}
                className="flex items-center justify-between"
              >
                <span className="text-sm">{item.word}</span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {item.count}
                  </Badge>
                  <span className="text-xs text-green-600">{item.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Top Negative Keywords
            </h4>
            {[
              { word: "wait", count: 45, change: "+18%" },
              { word: "slow", count: 32, change: "+5%" },
              { word: "expensive", count: 28, change: "-3%" },
            ].map((item) => (
              <div
                key={item.word}
                className="flex items-center justify-between"
              >
                <span className="text-sm">{item.word}</span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-800"
                  >
                    {item.count}
                  </Badge>
                  <span className="text-xs text-red-600">{item.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Emerging Topics
            </h4>
            {[
              { word: "parking", count: 23, change: "new" },
              { word: "app", count: 18, change: "new" },
              { word: "delivery", count: 15, change: "new" },
            ].map((item) => (
              <div
                key={item.word}
                className="flex items-center justify-between"
              >
                <span className="text-sm">{item.word}</span>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800"
                  >
                    {item.count}
                  </Badge>
                  <span className="text-xs text-blue-600">{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
