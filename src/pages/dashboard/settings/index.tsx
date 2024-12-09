import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useSettings } from "@/lib/contexts/settings-context";
import {
  BuildingIcon,
  UserIcon,
  SaveIcon,
  DatabaseIcon,
  ShieldIcon,
  UsersIcon,
  PlusIcon,
  BellIcon,
  XIcon,
  BellRingIcon,
  VolumeIcon,
  MailIcon,
  GlobeIcon,
  CircleDotIcon,
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
          <TabsTrigger value="security">
            <ShieldIcon className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="support">
            <HelpCircleIcon className="w-4 h-4 mr-2" />
            Support
          </TabsTrigger>
        </TabsList>

        {/* Organization Settings Tab */}
        <TabsContent value="organization">
          <Card className="p-6">
            <div className="space-y-8">
              {/* Business Information */}
              <div>
                <div className="flex items-center gap-2">
                  <BuildingIcon className="w-5 h-5" />
                  <h3 className="text-lg font-medium">Business Information</h3>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <Input
                      value={settings.business.name}
                      onChange={(e) =>
                        updateBusinessSettings({ name: e.target.value })
                      }
                      placeholder="Enter your business name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Email</Label>
                    <Input
                      type="email"
                      value={settings.business.email}
                      onChange={(e) =>
                        updateBusinessSettings({ email: e.target.value })
                      }
                      placeholder="contact@yourbusiness.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Phone</Label>
                    <Input
                      type="tel"
                      value={settings.business.phone}
                      onChange={(e) =>
                        updateBusinessSettings({ phone: e.target.value })
                      }
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Website</Label>
                    <Input
                      type="url"
                      value={settings.business.website}
                      onChange={(e) =>
                        updateBusinessSettings({ website: e.target.value })
                      }
                      placeholder="https://yourbusiness.com"
                    />
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div>
                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  <h3 className="text-lg font-medium">Account Settings</h3>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input type="email" placeholder="you@example.com" />
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5" />
                    <h3 className="text-lg font-medium">Team Members</h3>
                  </div>
                  <Button>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>
                <Separator className="my-4" />
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground text-center">
                    No team members added yet
                  </p>
                </Card>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure how and when you receive notifications
                  </p>
                </div>
              </div>

              <Separator />

              {/* Notification Channels */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Notification Channels</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <MailIcon className="w-4 h-4" />
                        <Label>Email Notifications</Label>
                      </div>
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
                      <div className="flex items-center gap-2">
                        <BellRingIcon className="w-4 h-4" />
                        <Label>Push Notifications</Label>
                      </div>
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
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <VolumeIcon className="w-4 h-4" />
                        <Label>Sound Alerts</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Play sound for urgent notifications
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.soundEnabled}
                      onCheckedChange={(checked) =>
                        updateNotificationSettings({ soundEnabled: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card className="p-6">
            <div className="space-y-8">
              {/* Google Business Profile */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <GlobeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Google Business Profile</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect your Google Business Profile to sync reviews
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">Not Connected</Badge>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Business Profile ID</Label>
                    <Input placeholder="Enter your Google Business Profile ID" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="Enter your business location" />
                  </div>
                  <Button className="w-full">
                    <GlobeIcon className="w-4 h-4 mr-2" />
                    Connect Google Business Profile
                  </Button>
                </div>
              </div>

              {/* Yelp Business */}
              <div className="space-y-6">
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
                  <Badge variant="outline">Not Connected</Badge>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Business ID</Label>
                    <Input placeholder="Enter your Yelp Business ID" />
                  </div>
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <Input
                      type="password"
                      placeholder="Enter your Yelp API Key"
                    />
                  </div>
                  <Button className="w-full">
                    <CircleDotIcon className="w-4 h-4 mr-2" />
                    Connect Yelp Business
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
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
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <HelpCircleIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">Support</h3>
              </div>
              <Separator />

              <div className="grid gap-6">
                {/* Contact Support */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Contact Support</h4>
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-muted-foreground">
                          Get help via email within 24 hours
                        </p>
                      </div>
                      <Button variant="outline">
                        <MailIcon className="w-4 h-4 mr-2" />
                        Email Us
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* FAQs */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">
                    Frequently Asked Questions
                  </h4>
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">Knowledge Base</p>
                        <p className="text-sm text-muted-foreground">
                          Browse our FAQ and troubleshooting guides
                        </p>
                      </div>
                      <Button variant="outline">
                        <ExternalLinkIcon className="w-4 h-4 mr-2" />
                        View FAQs
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
