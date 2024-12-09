import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
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
  MessageSquareIcon,
  StarIcon,
  ImageIcon,
  BellIcon,
  XIcon,
  BellRingIcon,
  VolumeIcon,
  MailIcon,
  GlobeIcon,
  CircleDotIcon,
  RefreshCwIcon,
  CheckCircleIcon,
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBusinessSettings({
          logo: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addEmailField = () => {
    updateNotificationSettings({
      urgentNotifications: [...settings.notifications.urgentNotifications, ""],
    });
  };

  const removeEmailField = (index: number) => {
    updateNotificationSettings({
      urgentNotifications: settings.notifications.urgentNotifications.filter(
        (_, i) => i !== index,
      ),
    });
  };

  const updateEmail = (index: number, value: string) => {
    updateNotificationSettings({
      urgentNotifications: settings.notifications.urgentNotifications.map(
        (email, i) => (i === index ? value : email),
      ),
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

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="business">
            <BuildingIcon className="w-4 h-4 mr-2" />
            Business
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellIcon className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageSquareIcon className="w-4 h-4 mr-2" />
            Feedback Form
          </TabsTrigger>
          <TabsTrigger value="account">
            <UserIcon className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="team">
            <UsersIcon className="w-4 h-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <DatabaseIcon className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="security">
            <ShieldIcon className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

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

              {/* Urgent Notifications */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Urgent Notifications</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Rating Threshold for Urgent Alerts</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Slider
                          value={[settings.notifications.urgentRatingThreshold]}
                          min={1}
                          max={4}
                          step={1}
                          onValueChange={([value]) =>
                            updateNotificationSettings({
                              urgentRatingThreshold: value,
                            })
                          }
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center gap-1 min-w-[80px]">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {settings.notifications.urgentRatingThreshold} or
                          below
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Send urgent alerts for ratings at or below this threshold
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Alert Recipients</Label>
                    {settings.notifications.urgentNotifications.map(
                      (email, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => updateEmail(index, e.target.value)}
                            placeholder="Enter email address"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeEmailField(index)}
                            disabled={
                              settings.notifications.urgentNotifications
                                .length === 1
                            }
                          >
                            <XIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      ),
                    )}
                    <Button
                      variant="outline"
                      onClick={addEmailField}
                      className="w-full"
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add Another Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Other tabs content... */}
      </Tabs>
    </div>
  );
};

export default Settings;
