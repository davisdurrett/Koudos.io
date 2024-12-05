import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/lib/contexts/settings-context";
import {
  BuildingIcon,
  UserIcon,
  BellIcon,
  KeyIcon,
  CreditCardIcon,
  SaveIcon,
  DatabaseIcon,
  ShieldIcon,
  UsersIcon,
  PlusIcon,
  TrashIcon,
  PaletteIcon,
  SearchIcon,
  CheckIcon,
  XIcon,
  EditIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  ImageIcon,
  GiftIcon,
} from "lucide-react";

const Settings = () => {
  const { business, updateBusinessSettings } = useSettings();
  const [businessDetails, setBusinessDetails] = React.useState({
    name: "",
    googleReviewUrl: "",
    incentiveMessage: "",
    contactEmail: "",
    phoneNumber: "",
    logo: null as File | null,
    feedbackEmail: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBusinessDetails((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
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
      </div>

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList>
          <TabsTrigger value="business">
            <BuildingIcon className="w-4 h-4 mr-2" />
            Business Details
          </TabsTrigger>
          <TabsTrigger value="team">
            <UsersIcon className="w-4 h-4 mr-2" />
            Team
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

        {/* Business Details Tab */}
        <TabsContent value="business">
          <Card className="p-6">
            <div className="space-y-6">
              {/* Business Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BuildingIcon className="w-5 h-5" />
                  <h3 className="text-lg font-medium">Business Information</h3>
                </div>
                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <Input
                      value={businessDetails.name}
                      onChange={(e) =>
                        setBusinessDetails((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter your business name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Google Review URL</Label>
                    <Input
                      value={businessDetails.googleReviewUrl}
                      onChange={(e) =>
                        setBusinessDetails((prev) => ({
                          ...prev,
                          googleReviewUrl: e.target.value,
                        }))
                      }
                      placeholder="Your Google Business review URL"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Incentive Message (Optional)</Label>
                    <Input
                      value={businessDetails.incentiveMessage}
                      onChange={(e) =>
                        setBusinessDetails((prev) => ({
                          ...prev,
                          incentiveMessage: e.target.value,
                        }))
                      }
                      placeholder="e.g., 10% off your next visit"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Business Logo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MailIcon className="w-5 h-5" />
                  <h3 className="text-lg font-medium">Contact Information</h3>
                </div>
                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Business Email</Label>
                    <Input
                      type="email"
                      value={businessDetails.contactEmail}
                      onChange={(e) =>
                        setBusinessDetails((prev) => ({
                          ...prev,
                          contactEmail: e.target.value,
                        }))
                      }
                      placeholder="contact@yourbusiness.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Business Phone</Label>
                    <Input
                      type="tel"
                      value={businessDetails.phoneNumber}
                      onChange={(e) =>
                        setBusinessDetails((prev) => ({
                          ...prev,
                          phoneNumber: e.target.value,
                        }))
                      }
                      placeholder="(555) 555-5555"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Feedback Email Recipient</Label>
                    <Input
                      type="email"
                      value={businessDetails.feedbackEmail}
                      onChange={(e) =>
                        setBusinessDetails((prev) => ({
                          ...prev,
                          feedbackEmail: e.target.value,
                        }))
                      }
                      placeholder="Where to send internal feedback"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Other tabs content remains the same */}
        <TabsContent value="team">{/* Existing team content */}</TabsContent>

        <TabsContent value="notifications">
          {/* Existing notifications content */}
        </TabsContent>

        <TabsContent value="integrations">
          {/* Existing integrations content */}
        </TabsContent>

        <TabsContent value="security">
          {/* Existing security content */}
        </TabsContent>

        <TabsContent value="billing">
          {/* Existing billing content */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
