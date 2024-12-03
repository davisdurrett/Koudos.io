import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  GiftIcon,
  TicketIcon,
  CoinsIcon,
  FilterIcon,
  BarChart3Icon,
} from "lucide-react";
import { incentiveService } from "@/lib/services/incentives";

interface IncentiveTrackerProps {
  className?: string;
}

const IncentiveTracker = ({ className = "" }: IncentiveTrackerProps) => {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [stats, setStats] = React.useState({
    totalSent: 0,
    totalRedeemed: 0,
    totalCost: 0,
    redemptionRate: 0,
  });
  const [incentives, setIncentives] = React.useState<
    Array<{
      id: string;
      type: string;
      value: number;
      status: string;
      createdAt: string;
      redeemedAt?: string;
    }>
  >([]);

  React.useEffect(() => {
    loadStats();
    loadIncentives();
  }, []);

  const loadStats = async () => {
    const stats = await incentiveService.getIncentiveStats();
    setStats(stats);
  };

  const loadIncentives = async () => {
    const incentives = await incentiveService.getIncentives();
    setIncentives(incentives);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "sent":
        return "bg-yellow-100 text-yellow-800";
      case "redeemed":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIncentiveIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <TicketIcon className="w-4 h-4" />;
      case "gift_card":
        return <GiftIcon className="w-4 h-4" />;
      case "loyalty_points":
        return <CoinsIcon className="w-4 h-4" />;
      default:
        return <GiftIcon className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`p-6 bg-background ${className}`}>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Incentive Management</h2>
            <p className="text-sm text-muted-foreground">
              Track and manage review incentives
            </p>
          </div>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="incentives">Incentives</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Sent
                  </p>
                  <h3 className="text-2xl font-bold mt-2">{stats.totalSent}</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <GiftIcon className="w-4 h-4 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Redeemed
                  </p>
                  <h3 className="text-2xl font-bold mt-2">
                    {stats.totalRedeemed}
                  </h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <TicketIcon className="w-4 h-4 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Cost
                  </p>
                  <h3 className="text-2xl font-bold mt-2">
                    ${stats.totalCost}
                  </h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <CoinsIcon className="w-4 h-4 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Redemption Rate
                  </p>
                  <h3 className="text-2xl font-bold mt-2">
                    {stats.redemptionRate.toFixed(1)}%
                  </h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <BarChart3Icon className="w-4 h-4 text-primary" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="incentives" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="redeemed">Redeemed</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="discount">Discount</SelectItem>
                  <SelectItem value="gift_card">Gift Card</SelectItem>
                  <SelectItem value="loyalty_points">Loyalty Points</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button>
              <GiftIcon className="w-4 h-4 mr-2" />
              Create Incentive
            </Button>
          </div>

          <div className="space-y-4">
            {incentives.map((incentive) => (
              <Card key={incentive.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      {getIncentiveIcon(incentive.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium capitalize">
                          {incentive.type.replace("_", " ")}
                        </h4>
                        <Badge
                          variant="secondary"
                          className={getStatusColor(incentive.status)}
                        >
                          {incentive.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Value: ${incentive.value} • Created:{" "}
                        {new Date(incentive.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default IncentiveTracker;
