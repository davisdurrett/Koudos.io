import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TrendsChartProps {
  data: Array<{
    date: string;
    rating?: number;
    reviews?: number;
  }>;
  type?: "rating" | "volume" | "both";
  className?: string;
}

const TrendsChart = ({
  data = [],
  type = "both",
  className = "",
}: TrendsChartProps) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="date" />
          {(type === "rating" || type === "both") && (
            <YAxis
              yAxisId="rating"
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              orientation="left"
            />
          )}
          {(type === "volume" || type === "both") && (
            <YAxis yAxisId="reviews" orientation="right" />
          )}
          <Tooltip />
          <Legend />
          {(type === "rating" || type === "both") && (
            <Line
              yAxisId="rating"
              type="monotone"
              dataKey="rating"
              name="Average Rating"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: "#22c55e" }}
            />
          )}
          {(type === "volume" || type === "both") && (
            <Line
              yAxisId="reviews"
              type="monotone"
              dataKey="reviews"
              name="Review Count"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: "#8b5cf6" }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendsChart;
