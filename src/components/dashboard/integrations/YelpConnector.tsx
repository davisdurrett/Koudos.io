import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CircleDotIcon, CheckCircleIcon, RefreshCwIcon, StoreIcon } from "lucide-react";

interface YelpConnectorProps {
  className?: string;
}

const YelpConnector = ({ className = "" }: YelpConnectorProps) => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [autoSync, setAutoSync] = React.useState(true);
  const [responseSync, setResponseSync] = React.useState(true);

  return (
    <Card className={`p-6 bg-background ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <CircleDotIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold">Yelp Business</h3>
              <p className="text-sm text-muted-foreground">
                Connect your Yelp Business account to sync reviews
              </p>
            </div>
          </div>
          {isConnected ? (
            <Badge className="bg-green-100 text-green-800">Connected</Badge>
          ) : (
            <Badge variant="outline">Not Connected</Badge>
          )}
        </div>

        <Separator />

        {isConnected ? (
          <div className="space-y-6">
            {/* Connected Account */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-full">
                  <StoreIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Koudos Demo Store</p>
                  <p className="text-sm text-muted-foreground">
                    Last synced: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCwIcon className="w-4 h-4 mr-2" />
                Sync Now
              </Button>
            </div>

            {/* Sync Settings */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Sync Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Sync</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync reviews every hour
                    </p>
                  </div>
                  <Switch
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Response Sync</Label>
                    <p className="text-sm text-muted-foreground">
                      Sync responses back to Yelp
                    </p>
                  </div>
                  <Switch
                    checked={responseSync}
                    onCheckedChange={setResponseSync}
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="text-sm font-medium">Total Reviews</h4>
                <p className="text-2xl font-bold mt-1">248</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="text-sm font-medium">Average Rating</h4>
                <p className="text-2xl font-bold mt-1">4.5</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="text-sm font-medium">Response Rate</h4>
                <p className="text-2xl font-bold mt-1">92%</p>
              </div>
            </div>

            {/* Disconnect Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                className="text-destructive"
                onClick={() => setIsConnected(false)}
              >
                Disconnect Account
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Connection Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Business ID</Label>
                <Input placeholder="Enter your Yelp Business ID" />
              </div>

              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" placeholder="Enter your Yelp API Key" />
              </div>
            </div>

            {/* Connect Button */}
            <Button
              className="w-full"
              onClick={() => setIsConnected(true)}
            >
              <CircleDotIcon className="w-4 h-4 mr-2" />
              Connect Yelp Business
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default YelpConnector;
