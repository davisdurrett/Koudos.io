import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquareIcon,
  StarIcon,
  BellIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  BarChart3Icon,
  ClockIcon,
  SmartphoneIcon,
  InfoIcon,
  PencilIcon,
  MailIcon,
} from "lucide-react";
import FeedbackFormEditor from "@/components/dashboard/FeedbackFormEditor";

const AutomationsPage = () => {
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [showFormEditor, setShowFormEditor] = React.useState(false);
  const [settings, setSettings] = React.useState({
    initialMessage:
      "Hi {customer_first_name}, thank you for visiting {business}! How would you rate your experience from 1-5 stars?",
    lowStarMessage:
      "We're sorry to hear that. We'd love to learn more about your experience: {feedback_url}",
    highStarMessage:
      "Amazing! Thank you for the 5-star rating! Would you mind sharing your experience on Google? {google_url}\n\nAs a thank you, you'll receive {incentive}!",
    delay: "24",
    googleReviewUrl: "https://g.page/r/...",
    feedbackFormUrl: "https://feedback.example.com/...",
    notificationEmails: ["support@example.com"],
    incentiveEnabled: true,
    incentiveType: "discount",
    incentiveValue: "10% off next visit",
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Message Templates
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure your automated review collection messages
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SmartphoneIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Automations</span>
            <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
          </div>
        </div>
      </div>

      {/* Timing Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-medium">Timing</h3>
        </div>
        <div className="mt-4 w-[300px]">
          <Label>Send Message After</Label>
          <Select
            value={settings.delay}
            onValueChange={(value) =>
              setSettings((prev) => ({ ...prev, delay: value }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Immediately</SelectItem>
              <SelectItem value="1">1 hour</SelectItem>
              <SelectItem value="2">2 hours</SelectItem>
              <SelectItem value="4">4 hours</SelectItem>
              <SelectItem value="24">24 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Message Templates */}
      <Tabs defaultValue="initial" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="initial"
            className="data-[state=active]:text-[#f5794d]"
          >
            <MessageSquareIcon className="w-4 h-4 mr-2" />
            Initial Message
          </TabsTrigger>
          <TabsTrigger
            value="low-star"
            className="data-[state=active]:text-red-600"
          >
            <XCircleIcon className="w-4 h-4 mr-2" />
            1-4 Star Response
          </TabsTrigger>
          <TabsTrigger
            value="high-star"
            className="data-[state=active]:text-green-600"
          >
            <CheckCircleIcon className="w-4 h-4 mr-2" />5 Star Response
          </TabsTrigger>
        </TabsList>

        {/* Initial Message Tab */}
        <TabsContent value="initial">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquareIcon className="w-5 h-5 text-muted-foreground" />
                  <h3 className="font-medium">Initial Message</h3>
                </div>
                <Select
                  onValueChange={(value) => {
                    const text = `{${value}}`;
                    navigator.clipboard.writeText(text);
                    toast({
                      description: `Variable ${text} copied to clipboard`,
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Insert variable..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer_first_name">
                      customer_first_name
                    </SelectItem>
                    <SelectItem value="business">business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                value={settings.initialMessage}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    initialMessage: e.target.value,
                  }))
                }
                className="min-h-[100px] font-mono text-sm"
              />
            </div>
          </Card>
        </TabsContent>

        {/* Low Star Response Tab */}
        <TabsContent value="low-star">
          <Card className="p-6 border-red-200 bg-red-50/50">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <XCircleIcon className="w-5 h-5 text-red-600" />
                <h3 className="font-medium text-red-600">1-4 Star Response</h3>
              </div>

              <div className="space-y-4">
                <Textarea
                  value={settings.lowStarMessage}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      lowStarMessage: e.target.value,
                    }))
                  }
                  className="min-h-[100px] font-mono text-sm"
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Feedback Form Link</Label>
                      <p className="text-sm text-muted-foreground">
                        Link to your feedback form
                      </p>
                    </div>
                    <div className="w-[300px]">
                      <Input
                        value={settings.feedbackFormUrl}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            feedbackFormUrl: e.target.value,
                          }))
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowFormEditor(true)}
                    >
                      <PencilIcon className="w-4 h-4 mr-2" />
                      Customize Form
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Notification Recipients</Label>
                    <Input
                      type="email"
                      placeholder="Enter email addresses (comma-separated)"
                      value={settings.notificationEmails.join(", ")}
                      onChange={(e) => {
                        const emails = e.target.value
                          .split(",")
                          .map((email) => email.trim())
                          .filter(Boolean);
                        setSettings((prev) => ({
                          ...prev,
                          notificationEmails: emails,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* High Star Response Tab */}
        <TabsContent value="high-star">
          <Card className="p-6 border-green-200 bg-green-50/50">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <h3 className="font-medium text-green-600">5 Star Response</h3>
              </div>

              <div className="space-y-4">
                <Textarea
                  value={settings.highStarMessage}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      highStarMessage: e.target.value,
                    }))
                  }
                  className="min-h-[100px] font-mono text-sm"
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Google Review Link</Label>
                      <p className="text-sm text-muted-foreground">
                        Link to your Google Business Profile
                      </p>
                    </div>
                    <div className="w-[300px]">
                      <Input
                        value={settings.googleReviewUrl}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            googleReviewUrl: e.target.value,
                          }))
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Enable Incentive</Label>
                      <p className="text-sm text-muted-foreground">
                        Offer an incentive for Google reviews
                      </p>
                    </div>
                    <Switch
                      checked={settings.incentiveEnabled}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          incentiveEnabled: checked,
                        }))
                      }
                    />
                  </div>

                  {settings.incentiveEnabled && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Incentive Type</Label>
                        <Select
                          value={settings.incentiveType}
                          onValueChange={(value) =>
                            setSettings((prev) => ({
                              ...prev,
                              incentiveType: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="discount">Discount</SelectItem>
                            <SelectItem value="gift_card">Gift Card</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Incentive Value</Label>
                        <Input
                          value={settings.incentiveValue}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              incentiveValue: e.target.value,
                            }))
                          }
                          placeholder="e.g., 10% off next visit"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <FeedbackFormEditor
        isOpen={showFormEditor}
        onClose={() => setShowFormEditor(false)}
        onSave={(formData) => {
          toast({
            title: "Form Updated",
            description: "Feedback form customization saved successfully.",
          });
          setShowFormEditor(false);
        }}
        formData={{
          title: "Help Us Improve",
          description:
            "We noticed your experience wasn't perfect. Please share what went wrong so we can make it right.",
          categories: [
            "Service Quality",
            "Wait Time",
            "Cleanliness",
            "Staff",
            "Other",
          ],
          showCategories: true,
          showComments: true,
        }}
      />
    </div>
  );
};

export default AutomationsPage;
