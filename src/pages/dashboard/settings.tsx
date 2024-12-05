import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BuildingIcon,
  UserIcon,
  MailIcon,
  BellIcon,
  KeyIcon,
  CreditCardIcon,
  SaveIcon,
  GlobeIcon,
  DatabaseIcon,
  BellRingIcon,
  ShieldIcon,
  CheckIcon,
  UsersIcon,
  PlusIcon,
  TrashIcon,
  LockIcon,
} from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = React.useState({
    business: {
      name: "",
      website: "",
      email: "",
      phone: "",
      googleBusinessId: "",
      timezone: "America/New_York",
    },
    team: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        status: "active",
      },
    ],
    account: {
      name: "John Doe",
      email: "john@example.com",
      password: "",
    },
    notifications: {
      email: true,
      push: true,
      urgentAlerts: true,
      weeklyReports: true,
    },
    integrations: {
      googleBusiness: true,
      yelp: false,
      crm: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: "30",
      ipWhitelist: "",
    },
    billing: {
      plan: "monthly",
      interval: "monthly",
    },
  });

  const [newTeamMember, setNewTeamMember] = React.useState({
    email: "",
    role: "user",
  });

  const handleSave = async () => {
    // Save settings to backend
    console.log("Saving settings:", settings);
  };

  const handleAddTeamMember = () => {
    if (newTeamMember.email) {
      setSettings((prev) => ({
        ...prev,
        team: [
          ...prev.team,
          {
            id: Math.random().toString(),
            name: "",
            email: newTeamMember.email,
            role: newTeamMember.role,
            status: "pending",
          },
        ],
      }));
      setNewTeamMember({ email: "", role: "user" });
    }
  };

  const handleRemoveTeamMember = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      team: prev.team.filter((member) => member.id !== id),
    }));
  };

  return (
    <div className="h-full bg-background p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your account and business settings
          </p>
        </div>
        <Button onClick={handleSave}>
          <SaveIcon className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList>
          <TabsTrigger value="business">
            <BuildingIcon className="w-4 h-4 mr-2" />
            Business
          </TabsTrigger>
          <TabsTrigger value="team">
            <UsersIcon className="w-4 h-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="account">
            <UserIcon className="w-4 h-4 mr-2" />
            Account
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
          <TabsTrigger value="billing">
            <CreditCardIcon className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Business Settings */}
        <TabsContent value="business">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">Business Profile</h3>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input
                    value={settings.business.name}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        business: { ...prev.business, name: e.target.value },
                      }))
                    }
                    placeholder="Enter your business name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Website</Label>
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 w-[100px]">
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                        <option value="https">https://</option>
                        <option value="http">http://</option>
                      </select>
                    </div>
                    <Input
                      value={settings.business.website}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          business: {
                            ...prev.business,
                            website: e.target.value,
                          },
                        }))
                      }
                      placeholder="www.example.com"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Business Email</Label>
                  <Input
                    type="email"
                    value={settings.business.email}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        business: { ...prev.business, email: e.target.value },
                      }))
                    }
                    placeholder="contact@business.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    value={settings.business.phone}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        business: { ...prev.business, phone: e.target.value },
                      }))
                    }
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Google Business ID</Label>
                  <Input
                    value={settings.business.googleBusinessId}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        business: {
                          ...prev.business,
                          googleBusinessId: e.target.value,
                        },
                      }))
                    }
                    placeholder="Enter your Google Business ID"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    value={settings.business.timezone}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        business: {
                          ...prev.business,
                          timezone: e.target.value,
                        },
                      }))
                    }
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Team Settings */}
        <TabsContent value="team">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5" />
                  <h3 className="text-lg font-medium">Team Members</h3>
                </div>
                <div className="flex items-end gap-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Email address"
                      value={newTeamMember.email}
                      onChange={(e) =>
                        setNewTeamMember((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <select
                      className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                      value={newTeamMember.role}
                      onChange={(e) =>
                        setNewTeamMember((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                    >
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <Button onClick={handleAddTeamMember}>
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                {settings.team.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {member.name
                            ? member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                            : member.email[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">
                          {member.name || member.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <select
                        className="h-9 px-3 rounded-md border border-input bg-background text-sm"
                        value={member.role}
                        onChange={(e) => {
                          setSettings((prev) => ({
                            ...prev,
                            team: prev.team.map((m) =>
                              m.id === member.id
                                ? { ...m, role: e.target.value }
                                : m,
                            ),
                          }));
                        }}
                      >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                      <Badge
                        variant={
                          member.status === "active" ? "default" : "secondary"
                        }
                      >
                        {member.status}
                      </Badge>
                      {member.id !== "1" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveTeamMember(member.id)}
                        >
                          <TrashIcon className="w-4 h-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 text-sm text-muted-foreground">
                <p>Role Permissions:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Admin: Full access to all features and settings</li>
                  <li>Manager: Can manage reviews and automations</li>
                  <li>User: Can view and respond to reviews</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">Account Settings</h3>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={settings.account.name}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        account: { ...prev.account, name: e.target.value },
                      }))
                    }
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={settings.account.email}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        account: { ...prev.account, email: e.target.value },
                      }))
                    }
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline">
                  <KeyIcon className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BellRingIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">
                  Notification Preferences
                </h3>
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
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          email: checked,
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications in the browser
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: { ...prev.notifications, push: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Urgent Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified immediately for urgent issues
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.urgentAlerts}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          urgentAlerts: checked,
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly performance reports
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyReports}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          weeklyReports: checked,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <DatabaseIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">Connected Services</h3>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Google Business Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Sync with your Google Business listing
                    </p>
                  </div>
                  <Switch
                    checked={settings.integrations.googleBusiness}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        integrations: {
                          ...prev.integrations,
                          googleBusiness: checked,
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Yelp Business</Label>
                    <p className="text-sm text-muted-foreground">
                      Connect your Yelp business account
                    </p>
                  </div>
                  <Switch
                    checked={settings.integrations.yelp}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        integrations: {
                          ...prev.integrations,
                          yelp: checked,
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>CRM Integration</Label>
                    <p className="text-sm text-muted-foreground">
                      Connect to your CRM system
                    </p>
                  </div>
                  <Switch
                    checked={settings.integrations.crm}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        integrations: {
                          ...prev.integrations,
                          crm: checked,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <ShieldIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">Security Settings</h3>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactor}
                    onCheckedChange={(checked) =>
                      setSettings((prev) => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          twoFactor: checked,
                        },
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          sessionTimeout: e.target.value,
                        },
                      }))
                    }
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>IP Whitelist</Label>
                  <Input
                    value={settings.security.ipWhitelist}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          ipWhitelist: e.target.value,
                        },
                      }))
                    }
                    placeholder="Enter comma-separated IP addresses"
                  />
                  <p className="text-sm text-muted-foreground">
                    Leave empty to allow all IPs
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <CreditCardIcon className="w-5 h-5" />
                <h3 className="text-lg font-medium">Billing & Subscription</h3>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="p-6 relative">
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium">Monthly Plan</h4>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">$599</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Billed monthly
                      </p>
                    </div>
                    {settings.billing.plan === "monthly" && (
                      <div className="absolute top-4 right-4 bg-primary/10 text-primary p-2 rounded-full">
                        <CheckIcon className="w-4 h-4" />
                      </div>
                    )}
                  </Card>

                  <Card className="p-6 relative">
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium">Annual Plan</h4>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">$499</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Billed annually ($5,988/year)
                      </p>
                      <span className="inline-block mt-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        Save $1,200/year
                      </span>
                    </div>
                    {settings.billing.plan === "annual" && (
                      <div className="absolute top-4 right-4 bg-primary/10 text-primary p-2 rounded-full">
                        <CheckIcon className="w-4 h-4" />
                      </div>
                    )}
                  </Card>
                </div>

                <div className="pt-4">
                  <Button variant="outline">
                    <CreditCardIcon className="w-4 h-4 mr-2" />
                    Update Payment Method
                  </Button>
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
