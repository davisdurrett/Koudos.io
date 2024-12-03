import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GlobeIcon, CheckCircleIcon, RefreshCwIcon, StoreIcon } from "lucide-react";

interface GoogleBusinessConnectorProps {
  className?: string;
}

const GoogleBusinessConnector = ({ className = "" }: GoogleBusinessConnectorProps) => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [autoSync, setAutoSync] = React.useState(true);
  const [locationSync, setLocationSync] = React.useState(true);

  return (
    <Card className={`p-6 bg-background ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <GlobeIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold">Google Business Profile</h3>
              <p className="text-sm text-muted-foreground">
                Connect your Google Business Profile to sync reviews
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
                    <Label>Location Sync</Label>
                    <p className="text-sm text-muted-foreground">
                      Sync business location and hours
                    </p>
                  </div>
                  <Switch
                    checked={locationSync}
                    onCheckedChange={setLocationSync}
                  />
                </div>
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
                <Label>Business Profile ID</Label>
                <Input placeholder="Enter your Google Business Profile ID" />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="Enter your business location" />
              </div>
            </div>

            {/* Connect Button */}
            <Button
              className="w-full"
              onClick={() => setIsConnected(true)}
            >
              <GlobeIcon className="w-4 h-4 mr-2" />
              Connect Google Business Profile
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GoogleBusinessConnector;
