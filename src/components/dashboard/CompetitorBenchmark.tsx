import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  StarIcon,
  MessageSquareIcon,
  ClockIcon,
  AlertCircleIcon,
} from "lucide-react";
import { competitorService } from "@/lib/services/competitor";

interface CompetitorBenchmarkProps {
  className?: string;
  businessMetrics?: {
    averageRating: number;
    totalReviews: number;
    responseRate: number;
    averageResponseTime: number;
  };
}

const CompetitorBenchmark = ({
  className = "",
  businessMetrics = {
    averageRating: 4.5,
    totalReviews: 850,
    responseRate: 95,
    averageResponseTime: 8,
  },
}: CompetitorBenchmarkProps) => {
  const { toast } = useToast();
  const [competitors, setCompetitors] = React.useState<Array<any>>([]);
  const [insights, setInsights] = React.useState<Array<any>>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadCompetitors();
  }, []);

  const loadCompetitors = async () => {
    const data = await competitorService.getAllCompetitors();
    setCompetitors(data);
    const insights =
      await competitorService.getCompetitorInsights(businessMetrics);
    setInsights(insights);
  };

  const handleAddCompetitor = async () => {
    try {
      setLoading(true);
      const competitor = await competitorService.addCompetitor({
        name: "Sample Competitor",
        location: "Local Area",
        googlePlaceId: "sample-place-id",
      });

      setCompetitors((prev) => [...prev, competitor]);
      toast({
        title: "Competitor Added",
        description: "Successfully added new competitor to tracking.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add competitor.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (id: string) => {
    try {
      const updated = await competitorService.refreshCompetitorData(id);
      setCompetitors((prev) => prev.map((c) => (c.id === id ? updated : c)));
      toast({
        title: "Data Refreshed",
        description: "Successfully updated competitor data.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh competitor data.",
        variant: "destructive",
      });
    }
  };

  const getComparisonIcon = (comparison: string) => {
    switch (comparison) {
      case "better":
        return <TrendingUpIcon className="w-4 h-4 text-green-500" />;
      case "worse":
        return <TrendingDownIcon className="w-4 h-4 text-red-500" />;
      default:
        return <MinusIcon className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getMetricIcon = (type: string) => {
    switch (type) {
      case "rating":
        return <StarIcon className="w-4 h-4" />;
      case "volume":
        return <MessageSquareIcon className="w-4 h-4" />;
      case "response":
        return <ClockIcon className="w-4 h-4" />;
      default:
        return <AlertCircleIcon className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`p-6 bg-background ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Competitor Benchmarking</h3>
            <p className="text-sm text-muted-foreground">
              Track and compare your performance against local competitors
            </p>
          </div>
          <Button onClick={handleAddCompetitor} disabled={loading}>
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Competitor
          </Button>
        </div>

        {/* Insights Section */}
        {insights.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getMetricIcon(insight.type)}
                      <span className="font-medium capitalize">
                        {insight.type}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">
                        {insight.metric}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        avg. competitor
                      </span>
                    </div>
                  </div>
                  {getComparisonIcon(insight.comparison)}
                </div>
                {insight.recommendation && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {insight.recommendation}
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Competitors Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Tracked Competitors</h4>
            <div className="flex items-center gap-2">
              <div className="relative">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search competitors..."
                  className="pl-8 w-[200px]"
                />
              </div>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Competitor</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                  <TableHead className="text-right">Reviews</TableHead>
                  <TableHead className="text-right">Response Rate</TableHead>
                  <TableHead className="text-right">Last Updated</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitors.map((competitor) => (
                  <TableRow key={competitor.id}>
                    <TableCell className="font-medium">
                      {competitor.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        {competitor.metrics.averageRating.toFixed(1)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {competitor.metrics.totalReviews}
                    </TableCell>
                    <TableCell className="text-right">
                      {competitor.metrics.responseRate}%
                    </TableCell>
                    <TableCell className="text-right">
                      {new Date(competitor.lastUpdated).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRefresh(competitor.id)}
                      >
                        <RefreshCwIcon className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Trends Chart */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Rating Trends</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={competitors[0]?.trends.ratings}
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
                <Tooltip />
                {competitors.map((competitor, index) => (
                  <Line
                    key={competitor.id}
                    type="monotone"
                    data={competitor.trends.ratings}
                    dataKey="value"
                    name={competitor.name}
                    stroke={`hsl(${index * 60}, 70%, 50%)`}
                    strokeWidth={2}
                    dot={{ fill: `hsl(${index * 60}, 70%, 50%)` }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CompetitorBenchmark;
