import React from "react";
import { cn } from "@/lib/utils";
import GoogleBusinessConnector from "./integrations/GoogleBusinessConnector";
import YelpConnector from "./integrations/YelpConnector";
import CRMConnector from "./CRMConnector";

interface IntegrationPanelProps {
  className?: string;
}

const IntegrationPanel = ({ className }: IntegrationPanelProps) => {
  return (
    <div className={cn("h-full bg-background p-6 space-y-6", className)}>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Integrations</h2>
        <p className="text-sm text-muted-foreground">
          Connect and manage your external services
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <GoogleBusinessConnector />
        <YelpConnector />
        <CRMConnector />
      </div>
    </div>
  );
};

export default IntegrationPanel;
