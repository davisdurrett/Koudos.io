import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useSettings } from "@/lib/contexts/settings-context";
import SupportPanel from "@/components/dashboard/SupportPanel";
import {
  BuildingIcon,
  UserIcon,
  SaveIcon,
  DatabaseIcon,
  BellIcon,
  MailIcon,
  HelpCircleIcon,
  ExternalLinkIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CRMConnector from "@/components/dashboard/CRMConnector";
import GoogleBusinessConnector from "@/components/dashboard/integrations/GoogleBusinessConnector";

const Settings = () => {
  const { toast } = useToast();
  const {
    settings,
    updateBusinessSettings,
    updateNotificationSettings,
    saveSettings,
  } = useSettings();

  const handleSaveConfig = () => {
    saveSettings();
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your account and business settings
          </p>
        </div>
        <Button onClick={handleSaveConfig}>
          <SaveIcon className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList>
          <TabsTrigger value="organization">
            <BuildingIcon className="w-4 h-4 mr-2" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellIcon className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <DatabaseIcon className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="support">
            <HelpCircleIcon className="w-4 h-4 mr-2" />
            Support
          </TabsTrigger>
        </TabsList>

        {/* Organization Tab */}
        <TabsContent value="organization">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">Business Information</h3>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input
                    value={settings.business.name}
                    onChange={(e) =>
                      updateBusinessSettings({ name: e.target.value })
                    }
                    placeholder="Enter business name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Owner</Label>
                  <Input
                    value={settings.business.owner}
                    onChange={(e) =>
                      updateBusinessSettings({ owner: e.target.value })
                    }
                    placeholder="Enter owner name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input
                    value={settings.business.address}
                    onChange={(e) =>
                      updateBusinessSettings({ address: e.target.value })
                    }
                    placeholder="Enter business address"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={settings.business.phone}
                    onChange={(e) =>
                      updateBusinessSettings({ phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    value={settings.business.email}
                    onChange={(e) =>
                      updateBusinessSettings({ email: e.target.value })
                    }
                    placeholder="Enter email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Website URL</Label>
                  <Input
                    value={settings.business.website}
                    onChange={(e) =>
                      updateBusinessSettings({ website: e.target.value })
                    }
                    placeholder="Enter website URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <Select
                    value={settings.business.type}
                    onValueChange={(value) =>
                      updateBusinessSettings({ type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automotive">Automotive</SelectItem>
                      <SelectItem value="beauty">
                        Beauty & Personal Care
                      </SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="dental">Dental</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="financial">
                        Financial Services
                      </SelectItem>
                      <SelectItem value="fitness">
                        Fitness & Wellness
                      </SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="medical">Medical Practice</SelectItem>
                      <SelectItem value="pet">Pet Services</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="professional">
                        Professional Services
                      </SelectItem>
                      <SelectItem value="real_estate">Real Estate</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="salon">Salon & Spa</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="travel">Travel & Tourism</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {settings.business.type === "other" && (
                    <Input
                      className="mt-2"
                      placeholder="Please specify your business type"
                      value={settings.business.customType}
                      onChange={(e) =>
                        updateBusinessSettings({ customType: e.target.value })
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
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
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailEnabled}
                    onCheckedChange={(checked) =>
                      updateNotificationSettings({ emailEnabled: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive browser notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.pushEnabled}
                    onCheckedChange={(checked) =>
                      updateNotificationSettings({ pushEnabled: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <DatabaseIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">Connected Services</h3>
              </div>
              <Separator />
              <CRMConnector />
              <GoogleBusinessConnector className="mt-6" />
            </div>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support">
          <Card className="p-6">
            <SupportPanel />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
