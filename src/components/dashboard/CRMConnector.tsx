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
    <div className="space-y-4">
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

          <div>
            <Button onClick={handleConnect}>
              <DatabaseIcon className="w-4 h-4 mr-2" />
              Connect {selectedCRM || "CRM"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMConnector;
