import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/lib/contexts/settings-context";
import AutomationRules from "@/components/dashboard/AutomationRules";
import IntegrationPanel from "@/components/dashboard/IntegrationPanel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BuildingIcon,
  BellIcon,
  ShieldIcon,
  PaletteIcon,
  UserIcon,
  GlobeIcon,
  CreditCardIcon,
  KeyIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  LanguageIcon,
  BrushIcon,
  UsersIcon,
  LockIcon,
  MessageSquareIcon,
  SendIcon,
  WrenchIcon,
  ZapIcon,
} from "lucide-react";

const Settings = () => {
  const {
    business,
    notifications,
    security,
    appearance,
    templates,
    team,
    updateBusinessSettings,
    updateNotificationSettings,
    updateSecuritySettings,
    updateAppearanceSettings,
    updateTemplateSettings,
    updateTeamSettings,
    inviteTeamMember,
    removeTeamMember,
  } = useSettings();

  return (
    <div className="h-full p-6 space-y-6 overflow-auto">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and application settings
        </p>
      </div>

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList className="grid grid-cols-7 w-full">
          <TabsTrigger value="business">
            <BuildingIcon className="w-4 h-4 mr-2" />
            Business
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellIcon className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="automation">
            <ZapIcon className="w-4 h-4 mr-2" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <WrenchIcon className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="team">
            <UserIcon className="w-4 h-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="security">
            <ShieldIcon className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCardIcon className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Business Profile Tab */}
        <TabsContent value="business" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Business Information</h3>
                <p className="text-sm text-muted-foreground">
                  Update your business details and preferences
                </p>
              </div>
              <Separator />

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input
                    value={business.name}
                    onChange={(e) =>
                      updateBusinessSettings({ name: e.target.value })
                    }
                    placeholder="Enter your business name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Website</Label>
                  <div className="flex gap-2">
                    <div className="flex-shrink-0">
                      <Select
                        value={business.protocol}
                        onValueChange={(value) =>
                          updateBusinessSettings({
                            protocol: value as "http" | "https",
                          })
                        }
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="https">https://</SelectItem>
                          <SelectItem value="http">http://</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      value={business.website}
                      onChange={(e) =>
                        updateBusinessSettings({ website: e.target.value })
                      }
                      placeholder="www.example.com"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Business Email</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="email"
                      value={business.email}
                      onChange={(e) =>
                        updateBusinessSettings({ email: e.target.value })
                      }
                      placeholder="contact@business.com"
                    />
                    <Badge variant="secondary">Primary</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="flex gap-2">
                    <Select
                      value={business.countryCode}
                      onValueChange={(value) =>
                        updateBusinessSettings({ countryCode: value })
                      }
                    >
                      <SelectTrigger className="w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">+1</SelectItem>
                        <SelectItem value="44">+44</SelectItem>
                        <SelectItem value="91">+91</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="tel"
                      value={business.phone}
                      onChange={(e) =>
                        updateBusinessSettings({ phone: e.target.value })
                      }
                      placeholder="(555) 555-5555"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">
                  Notification Preferences
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configure how and when you want to be notified
                </p>
              </div>
              <Separator />

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">
                    Review Notifications
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>All New Reviews</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified for every new review
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <MailIcon className="w-4 h-4 text-muted-foreground" />
                          <Switch
                            checked={notifications.newReviews.email}
                            onCheckedChange={(checked) =>
                              updateNotificationSettings({
                                newReviews: {
                                  ...notifications.newReviews,
                                  email: checked,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <BellIcon className="w-4 h-4 text-muted-foreground" />
                          <Switch
                            checked={notifications.newReviews.push}
                            onCheckedChange={(checked) =>
                              updateNotificationSettings({
                                newReviews: {
                                  ...notifications.newReviews,
                                  push: checked,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Low Rating Reviews</Label>
                        <p className="text-sm text-muted-foreground">
                          Immediate alerts for reviews below 3 stars
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <MailIcon className="w-4 h-4 text-muted-foreground" />
                          <Switch
                            checked={notifications.lowRatings.email}
                            onCheckedChange={(checked) =>
                              updateNotificationSettings({
                                lowRatings: {
                                  ...notifications.lowRatings,
                                  email: checked,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <BellIcon className="w-4 h-4 text-muted-foreground" />
                          <Switch
                            checked={notifications.lowRatings.push}
                            onCheckedChange={(checked) =>
                              updateNotificationSettings({
                                lowRatings: {
                                  ...notifications.lowRatings,
                                  push: checked,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="space-y-6">
          <AutomationRules />
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <IntegrationPanel />
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Team Management</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your team members and their permissions
                </p>
              </div>
              <Separator />

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">
                    Invite Team Members
                  </h4>
                  <div className="flex gap-4">
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      className="flex-1"
                    />
                    <Select defaultValue="member">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>
                      <UsersIcon className="w-4 h-4 mr-2" />
                      Invite
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-4">Team Permissions</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Response Editing</Label>
                        <p className="text-sm text-muted-foreground">
                          Let team members edit each other's responses
                        </p>
                      </div>
                      <Switch
                        checked={team.allowResponseEditing}
                        onCheckedChange={(checked) =>
                          updateTeamSettings({ allowResponseEditing: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require Response Approval</Label>
                        <p className="text-sm text-muted-foreground">
                          Responses need admin approval before posting
                        </p>
                      </div>
                      <Switch
                        checked={team.requireApproval}
                        onCheckedChange={(checked) =>
                          updateTeamSettings({ requireApproval: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Security Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account security and authentication preferences
                </p>
              </div>
              <Separator />

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-4">Password</h4>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input type="password" />
                    </div>
                    <Button>
                      <KeyIcon className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-4">
                    Two-Factor Authentication
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable 2FA</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        checked={security.twoFactorEnabled}
                        onCheckedChange={(checked) =>
                          updateSecuritySettings({ twoFactorEnabled: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Billing & Subscription</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your subscription and billing details
                </p>
              </div>
              <Separator />

              <div className="space-y-6">
                {/* Current Plan */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Professional Plan</h4>
                    <p className="text-sm text-muted-foreground">$499/month</p>
                    <p className="text-xs text-muted-foreground">
                      Billed annually ($5,988/year)
                    </p>
                  </div>
                  <Badge>Current Plan</Badge>
                </div>

                {/* Payment Method */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <CreditCardIcon className="w-6 h-6 text-muted-foreground" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">
                        Expires 12/24
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Update</Button>
                </div>

                {/* Available Plans */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Available Plans</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium">Monthly Plan</h5>
                      <p className="text-2xl font-bold mt-1">
                        $599
                        <span className="text-sm font-normal text-muted-foreground">
                          /month
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed monthly ($7,188/year)
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-primary/5">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium">Annual Plan</h5>
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary"
                        >
                          Save 17%
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold">
                        $499
                        <span className="text-sm font-normal text-muted-foreground">
                          /month
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Billed annually ($5,988/year)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" className="text-destructive">
                  Cancel Subscription
                </Button>
                <Button>Update Plan</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
