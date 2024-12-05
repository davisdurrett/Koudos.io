import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatabaseIcon, CheckCircleIcon } from "lucide-react";

interface CRMConnectorProps {
  className?: string;
}

const CRMConnector = ({ className }: CRMConnectorProps) => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [selectedCRM, setSelectedCRM] = React.useState<string>("");
  const [apiKey, setApiKey] = React.useState("");

  const handleConnect = () => {
    if (selectedCRM && apiKey) {
      setIsConnected(true);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSelectedCRM("");
    setApiKey("");
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DatabaseIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">CRM Integration</h3>
              <p className="text-sm text-muted-foreground">
                Connect your CRM to sync customer data
              </p>
            </div>
          </div>
          {isConnected ? (
            <Badge className="bg-green-100 text-green-800">Connected</Badge>
          ) : (
            <Badge variant="outline">Not Connected</Badge>
          )}
        </div>

        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">{selectedCRM}</p>
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
              <Label>CRM Provider</Label>
              <Select value={selectedCRM} onValueChange={setSelectedCRM}>
                <SelectTrigger>
                  <SelectValue placeholder="Select CRM provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hubspot">HubSpot</SelectItem>
                  <SelectItem value="zoho">Zoho</SelectItem>
                  <SelectItem value="salesforce">Salesforce</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>API Key</Label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your CRM API key"
              />
            </div>

            <Button
              className="w-full"
              onClick={handleConnect}
              disabled={!selectedCRM || !apiKey}
            >
              Connect CRM
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CRMConnector;
