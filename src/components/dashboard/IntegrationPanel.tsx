import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlobeIcon, StarIcon, BuildingIcon } from "lucide-react";

interface IntegrationPanelProps {
  className?: string;
}

const IntegrationPanel = ({ className = "" }: IntegrationPanelProps) => {
  return (
    <div className="space-y-6">
      {/* CRM Integration */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <BuildingIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">CRM Integration</h3>
              <p className="text-sm text-muted-foreground">
                Connect your CRM to sync customer data
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="capitalize">
            Not Connected
          </Badge>
        </div>

        <Separator className="mb-4" />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select CRM Platform</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose your CRM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hubspot">HubSpot</SelectItem>
                <SelectItem value="salesforce">Salesforce</SelectItem>
                <SelectItem value="zoho">Zoho CRM</SelectItem>
                <SelectItem value="pipedrive">Pipedrive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full">Connect CRM</Button>
        </div>
      </Card>

      {/* Google Business Profile Integration */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <GlobeIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Google Business Profile</h3>
              <p className="text-sm text-muted-foreground">
                Connect your GBP to manage reviews
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="capitalize">
            Not Connected
          </Badge>
        </div>

        <Separator className="mb-4" />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Location ID</Label>
            <Input placeholder="Enter your GBP Location ID" />
          </div>

          <Button className="w-full">Connect GBP</Button>
        </div>
      </Card>

      {/* Yelp Integration */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <StarIcon className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Yelp Integration</h3>
              <p className="text-sm text-muted-foreground">
                Connect your Yelp Business Account
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="capitalize">
            Not Connected
          </Badge>
        </div>

        <Separator className="mb-4" />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Business ID</Label>
            <Input placeholder="Enter your Yelp Business ID" />
          </div>

          <Button className="w-full">Connect Yelp</Button>
        </div>
      </Card>
    </div>
  );
};

export default IntegrationPanel;
