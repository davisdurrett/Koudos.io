import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BuildingIcon,
  ShieldIcon,
  DatabaseIcon,
  SaveIcon,
  BellIcon,
} from "lucide-react";

const AdminSettings = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Admin Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure global platform settings
          </p>
        </div>
        <Button>
          <SaveIcon className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger
            value="general"
            className="data-[state=active]:text-[#f5794d]"
          >
            <BuildingIcon className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:text-[#f5794d]"
          >
            <ShieldIcon className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:text-[#f5794d]"
          >
            <BellIcon className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="data-[state=active]:text-[#f5794d]"
          >
            <DatabaseIcon className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">Platform Settings</h3>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Platform Name</Label>
                  <Input defaultValue="Koudos" />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input type="email" defaultValue="support@koudos.io" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <ShieldIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">Security Settings</h3>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require 2FA for Admins</Label>
                    <p className="text-sm text-muted-foreground">
                      Enforce two-factor authentication for admin accounts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BellIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">Notification Settings</h3>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts about system performance and issues
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <DatabaseIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">Integration Settings</h3>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Default CRM Integration</Label>
                  <Select defaultValue="hubspot">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hubspot">HubSpot</SelectItem>
                      <SelectItem value="salesforce">Salesforce</SelectItem>
                      <SelectItem value="zoho">Zoho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
