import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LinkIcon,
  PlusIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";
import { crmService } from "@/lib/services/crm";
import { useToast } from "@/components/ui/use-toast";

interface CRMConnectorProps {
  className?: string;
  onConnect?: (connectionId: string) => void;
  isConnecting?: boolean;
}

const CRMConnector = ({
  className = "",
  onConnect = () => {},
  isConnecting = false,
}: CRMConnectorProps) => {
  const { toast } = useToast();
  const [platform, setPlatform] = React.useState("hubspot");
  const [apiKey, setApiKey] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [connecting, setConnecting] = React.useState(false);
  const [connections, setConnections] = React.useState<
    Array<{
      id: string;
      platform: string;
      status: "connected" | "disconnected" | "error";
      lastSync?: string;
    }>
  >([]);

  // Load existing connections
  React.useEffect(() => {
    loadConnections();
  }, []);

  const loadConnections = async () => {
    try {
      const existingConnections = await crmService.getAllConnections();
      setConnections(existingConnections);
    } catch (error) {
      console.error("Failed to load connections:", error);
    }
  };

  const handleConnect = async () => {
    try {
      setConnecting(true);
      const connection = await crmService.connect({ platform, apiKey, domain });

      // Update connections list
      setConnections((prev) => [...prev, connection]);

      // Clear form
      setApiKey("");
      setDomain("");

      // Notify success
      toast({
        title: "CRM Connected",
        description: `Successfully connected to ${platform}`,
        variant: "default",
      });

      // Callback
      onConnect(connection.id);
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async (connectionId: string) => {
    try {
      await crmService.disconnect(connectionId);
      await loadConnections(); // Reload connections

      toast({
        title: "CRM Disconnected",
        description: "Successfully disconnected CRM integration",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Disconnection Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={cn("w-[600px] p-6 bg-background", className)}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary/10">
            <LinkIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Connect CRM Platform</h3>
            <p className="text-sm text-muted-foreground">
              Link your CRM system to automate review collection
            </p>
          </div>
        </div>

        {/* Existing Connections */}
        {connections.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Active Connections</h4>
            {connections.map((conn) => (
              <div
                key={conn.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {conn.status === "connected" ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium capitalize">{conn.platform}</p>
                    <p className="text-sm text-muted-foreground">
                      Last synced:{" "}
                      {new Date(conn.lastSync || "").toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDisconnect(conn.id)}
                >
                  Disconnect
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* New Connection Form */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Add New Connection</h4>

          {/* Platform Selection */}
          <div className="space-y-2">
            <Label>CRM Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Select CRM platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hubspot">HubSpot</SelectItem>
                <SelectItem value="zoho">Zoho CRM</SelectItem>
                <SelectItem value="salesforce">Salesforce</SelectItem>
                <SelectItem value="pipedrive">Pipedrive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <Label>API Key</Label>
            <Input
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Find your API key in your CRM platform's developer settings
            </p>
          </div>

          {/* Domain Input (Optional) */}
          {platform === "hubspot" && (
            <div className="space-y-2">
              <Label>Domain</Label>
              <Input
                type="text"
                placeholder="your-domain.hubspot.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleConnect}
              disabled={!platform || !apiKey || connecting}
              className="flex-1"
            >
              {connecting ? (
                <>
                  <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Connect Platform
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-xs text-muted-foreground text-center">
          Need help? Check our{" "}
          <a
            href="#"
            className="text-primary hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            integration guide
          </a>{" "}
          for detailed instructions
        </p>
      </div>
    </Card>
  );
};

export default CRMConnector;
