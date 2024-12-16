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
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background shadow-lg p-3">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 py-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-sm text-muted-foreground">
                {entry.name}: <span className="font-medium">{entry.value}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex justify-center gap-6 mt-4">
        {payload.map((entry: any, index: number) => (
          <div
            key={index}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5794d" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#f5794d" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="reviewsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
            opacity={0.4}
          />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
            tick={{ fill: "#6b7280" }}
          />
          {(type === "rating" || type === "both") && (
            <YAxis
              yAxisId="rating"
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              orientation="left"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dx={-10}
              tick={{ fill: "#6b7280" }}
            />
          )}
          {(type === "volume" || type === "both") && (
            <YAxis
              yAxisId="reviews"
              orientation="right"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dx={10}
              tick={{ fill: "#6b7280" }}
            />
          )}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#e5e7eb",
              strokeWidth: 1,
              strokeDasharray: "3 3",
            }}
          />
          <Legend content={<CustomLegend />} />
          {(type === "rating" || type === "both") && (
            <Line
              yAxisId="rating"
              type="monotone"
              dataKey="rating"
              name="Average Rating"
              stroke="#f5794d"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#f5794d",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              fill="url(#ratingGradient)"
            />
          )}
          {(type === "volume" || type === "both") && (
            <Line
              yAxisId="reviews"
              type="monotone"
              dataKey="reviews"
              name="Review Count"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#8b5cf6",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              fill="url(#reviewsGradient)"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendsChart;
