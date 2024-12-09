import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  StarIcon,
  MessageSquareIcon,
  ArrowRightIcon,
  ClockIcon,
  MailIcon,
} from "lucide-react";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import TrendsChart from "@/components/dashboard/TrendsChart";

const DashboardHome = () => {
  const [timeRange, setTimeRange] = React.useState("30d");

  return (
    <div className="h-full bg-background p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Overview of your review performance
        </p>
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
              title: "Response Rate",
              value: "92%",
              change: "-3% this month",
              trend: "down",
              icon: <ClockIcon className="w-5 h-5 text-green-500" />,
            },
            {
              title: "Average Response Time",
              value: "2.4h",
              change: "Same as last month",
              trend: "neutral",
              icon: <MailIcon className="w-5 h-5 text-purple-500" />,
            },
          ]}
        />
      </div>

      {/* Recent Reviews */}
      <div>
        <h3 className="text-lg font-medium mb-4">Recent Reviews</h3>
        <div className="space-y-4">
          {[
            {
              author: "Sarah J.",
              rating: 5,
              text: "Absolutely fantastic experience! The staff was incredibly friendly and professional.",
              date: "2 hours ago",
              responded: true,
            },
            {
              author: "Mike R.",
              rating: 2,
              text: "Long wait times and disorganized service. Not what I expected.",
              date: "5 hours ago",
              responded: false,
            },
            {
              author: "Emily D.",
              rating: 4,
              text: "Great service overall, though the wait was a bit longer than expected.",
              date: "1 day ago",
              responded: true,
            },
          ].map((review, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.author}</span>
                    <span className="text-sm text-muted-foreground">
                      {review.date}
                    </span>
                    {review.responded ? (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Responded
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800"
                      >
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm">{review.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Rating Trends */}
      <div>
        <h3 className="text-lg font-medium mb-4">Rating Trends</h3>
        <Card className="p-6">
          <TrendsChart
            data={[
              { date: "Jan", rating: 4.2, reviews: 42 },
              { date: "Feb", rating: 4.5, reviews: 48 },
              { date: "Mar", rating: 4.6, reviews: 52 },
              { date: "Apr", rating: 4.8, reviews: 58 },
              { date: "May", rating: 4.7, reviews: 55 },
              { date: "Jun", rating: 4.9, reviews: 62 },
            ]}
          />
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
