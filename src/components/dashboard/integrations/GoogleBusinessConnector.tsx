import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  GlobeIcon,
  CheckCircleIcon,
  RefreshCwIcon,
  StoreIcon,
} from "lucide-react";

interface GoogleBusinessConnectorProps {
  className?: string;
}

const GoogleBusinessConnector = ({
  className = "",
}: GoogleBusinessConnectorProps) => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [businessId, setBusinessId] = React.useState("");
  const [location, setLocation] = React.useState("");

  const handleConnect = () => {
    if (businessId) {
      setIsConnected(true);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setBusinessId("");
    setLocation("");
  };

  return (
    <div className="space-y-4">
      {isConnected ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">Google Business Profile</p>
                <p className="text-sm text-muted-foreground">
                  Last synced: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="text-destructive"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Business Profile ID</Label>
            <Input
              value={businessId}
              onChange={(e) => setBusinessId(e.target.value)}
              placeholder="Enter your Google Business Profile ID"
            />
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your business location"
            />
          </div>

          <div>
            <Button onClick={handleConnect}>
              <GlobeIcon className="w-4 h-4 mr-2" />
              Connect Google Business Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleBusinessConnector;
