import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CircleDotIcon, RefreshCwIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";

interface YelpConnectorProps {
  className?: string;
}

const YelpConnector = ({ className = "" }: YelpConnectorProps) => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [businesses, setBusinesses] = React.useState([
    {
      id: "1",
      name: "Main Street Location",
      status: "connected",
      lastSync: new Date().toISOString(),
      reviewCount: 89,
      rating: 4.5,
    },
  ]);

  return (
    <Card className={`p-6 bg-background ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-red-100">
            <CircleDotIcon className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Yelp Business</h3>
            <p className="text-sm text-muted-foreground">
              Connect your Yelp Business Account to manage reviews
            </p>
          </div>
        </div>

        <Separator />

        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Auto-sync Reviews</Label>
            <p className="text-sm text-muted-foreground">
              Automatically import new reviews every hour
            </p>
          </div>
          <Switch checked={isConnected} onCheckedChange={setIsConnected} />
        </div>

        {/* Businesses */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Connected Businesses</h4>
          {businesses.map((business) => (
            <div
              key={business.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h5 className="font-medium">{business.name}</h5>
                  <Badge
                    variant="secondary"
                    className={business.status === "connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {business.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{business.reviewCount} reviews</span>
                  <span>{business.rating} average rating</span>
                  <span>Last synced: {new Date(business.lastSync).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCwIcon className="w-4 h-4 mr-2" />
                  Sync Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Business */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Add New Business</h4>
          <div className="flex gap-4">
            <Input
              placeholder="Enter Yelp Business ID"
              className="flex-1"
            />
            <Button>
              Connect Business
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            You can find your Business ID in your Yelp Business Account settings
          </p>
        </div>

        {/* Permissions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Required Permissions</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              <span>Read reviews and ratings</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              <span>Respond to reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4 text-green-500" />
              <span>Access business information</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default YelpConnector;
