import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EyeIcon,
  StarIcon,
  SmartphoneIcon,
  MailIcon,
  CopyIcon,
  GiftIcon,
  GlobeIcon,
} from "lucide-react";

interface TemplateEditorProps {
  type: "initial" | "high" | "low";
  channel: "email" | "sms" | "both";
  onSave?: (templates: {
    email?: { subject: string; content: string };
    sms?: { content: string };
  }) => void;
}

const TemplateEditor = ({ type, channel, onSave }: TemplateEditorProps) => {
  const [activeTab, setActiveTab] = React.useState<"email" | "sms">("email");
  const [showPreview, setShowPreview] = React.useState(false);
  const [templates, setTemplates] = React.useState({
    email: {
      subject: getDefaultSubject(type),
      content: getDefaultEmailContent(type),
    },
    sms: {
      content: getDefaultSMSContent(type),
    },
  });

  const [googleReview, setGoogleReview] = React.useState({
    url: "https://g.page/r/...",
    incentive: {
      enabled: true,
      type: "discount",
      value: "10% off next visit",
      expiryDays: 30,
    },
  });

  const availableVariables = [
    { name: "customer_name", description: "Customer's name", example: "Sarah" },
    {
      name: "business_name",
      description: "Your business name",
      example: "Acme Spa",
    },
    { name: "rating", description: "Customer's rating", example: "5" },
    {
      name: "google_url",
      description: "Google review URL",
      example: googleReview.url,
    },
    {
      name: "incentive",
      description: "Incentive offer",
      example: googleReview.incentive.value,
    },
  ];

  const getPreviewContent = (content: string) => {
    let preview = content;
    availableVariables.forEach((variable) => {
      preview = preview.replace(
        new RegExp(`\{${variable.name}\}`, "g"),
        variable.example,
      );
    });
    return preview;
  };

  return (
    <div className="space-y-6">
      {channel === "both" && (
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "email" | "sms")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">
              <MailIcon className="w-4 h-4 mr-2" />
              Email Template
            </TabsTrigger>
            <TabsTrigger value="sms">
              <SmartphoneIcon className="w-4 h-4 mr-2" />
              SMS Template
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              {getTemplateTitle(type, activeTab)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {getTemplateDescription(type, activeTab)}
            </p>
          </div>

          <Separator />

          {type === "high" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GlobeIcon className="w-4 h-4" />
                <Label>Google Review Settings</Label>
              </div>
              <div className="space-y-4 pl-6">
                <div className="space-y-2">
                  <Label>Google Review URL</Label>
                  <Input
                    value={googleReview.url}
                    onChange={(e) =>
                      setGoogleReview((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                    placeholder="Your Google Business review URL"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GiftIcon className="w-4 h-4" />
                    <Label>Review Incentive</Label>
                  </div>
                  <Switch
                    checked={googleReview.incentive.enabled}
                    onCheckedChange={(checked) =>
                      setGoogleReview((prev) => ({
                        ...prev,
                        incentive: { ...prev.incentive, enabled: checked },
                      }))
                    }
                  />
                </div>

                {googleReview.incentive.enabled && (
                  <div className="space-y-4 pl-6">
                    <div className="space-y-2">
                      <Label>Incentive Type</Label>
                      <Select
                        value={googleReview.incentive.type}
                        onValueChange={(value) =>
                          setGoogleReview((prev) => ({
                            ...prev,
                            incentive: { ...prev.incentive, type: value },
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="discount">Discount</SelectItem>
                          <SelectItem value="gift_card">Gift Card</SelectItem>
                          <SelectItem value="loyalty_points">
                            Loyalty Points
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Incentive Value</Label>
                      <Input
                        value={googleReview.incentive.value}
                        onChange={(e) =>
                          setGoogleReview((prev) => ({
                            ...prev,
                            incentive: {
                              ...prev.incentive,
                              value: e.target.value,
                            },
                          }))
                        }
                        placeholder="e.g., 10% off next visit"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Expiry (Days)</Label>
                      <Select
                        value={googleReview.incentive.expiryDays.toString()}
                        onValueChange={(value) =>
                          setGoogleReview((prev) => ({
                            ...prev,
                            incentive: {
                              ...prev.incentive,
                              expiryDays: parseInt(value),
                            },
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "email" && (
            <div className="space-y-2">
              <Label>Subject Line</Label>
              <Input
                value={templates.email.subject}
                onChange={(e) =>
                  setTemplates((prev) => ({
                    ...prev,
                    email: { ...prev.email, subject: e.target.value },
                  }))
                }
                placeholder="Enter email subject"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Message Content</Label>
            <Textarea
              value={
                activeTab === "email"
                  ? templates.email.content
                  : templates.sms.content
              }
              onChange={(e) =>
                setTemplates((prev) => ({
                  ...prev,
                  [activeTab]: {
                    ...prev[activeTab],
                    content: e.target.value,
                  },
                }))
              }
              placeholder={`Enter ${activeTab} content`}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label>Available Variables</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableVariables.map((variable) => (
                <Button
                  key={variable.name}
                  variant="outline"
                  className="justify-between h-auto py-2 px-3"
                  onClick={() =>
                    navigator.clipboard.writeText(`{${variable.name}}`)
                  }
                >
                  <div className="text-left">
                    <p className="font-mono text-xs">
                      {"{" + variable.name + "}"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {variable.example}
                    </p>
                  </div>
                  <CopyIcon className="w-3 h-3 opacity-50" />
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Click to copy variable to clipboard
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Preview</h3>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
            >
              <EyeIcon className="w-4 h-4 mr-2" />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
          </div>

          <Separator />

          <Card className="p-6 bg-muted/50">
            {activeTab === "email" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Subject
                  </Label>
                  <p className="font-medium">
                    {getPreviewContent(templates.email.subject)}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Body</Label>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap">
                      {getPreviewContent(templates.email.content)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="max-w-[300px] mx-auto bg-background rounded-lg p-4 shadow-sm">
                  <p className="text-sm whitespace-pre-wrap">
                    {getPreviewContent(templates.sms.content)}
                  </p>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  {templates.sms.content.length} characters
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

function getTemplateTitle(
  type: "initial" | "high" | "low",
  channel: "email" | "sms",
): string {
  switch (type) {
    case "initial":
      return `Initial ${channel.toUpperCase()} Request`;
    case "high":
      return `5-Star Follow-up ${channel.toUpperCase()}`;
    case "low":
      return `1-4 Star Follow-up ${channel.toUpperCase()}`;
    default:
      return "Template Editor";
  }
}

function getTemplateDescription(
  type: "initial" | "high" | "low",
  channel: "email" | "sms",
): string {
  switch (type) {
    case "initial":
      return "The first message sent to collect feedback";
    case "high":
      return "Sent after receiving a 5-star rating";
    case "low":
      return "Sent after receiving a 1-4 star rating";
    default:
      return "";
  }
}

function getDefaultSubject(type: "initial" | "high" | "low"): string {
  switch (type) {
    case "initial":
      return "We'd Love Your Feedback!";
    case "high":
      return "Thank you for your amazing feedback!";
    case "low":
      return "We value your feedback";
    default:
      return "";
  }
}

function getDefaultEmailContent(type: "initial" | "high" | "low"): string {
  switch (type) {
    case "initial":
      return "Hi {customer_name},\n\nThank you for choosing {business_name}! We'd love to hear about your experience.\n\nPlease take a moment to rate your experience by clicking one of the stars below:\n\n[Star Rating Buttons]\n\nBest regards,\n{business_name}";
    case "high":
      return "Thank you for your amazing feedback! We're thrilled that you had a great experience.\n\nWould you mind sharing your experience on Google? As a thank you, we'll send you {incentive}!\n\n{google_url}";
    case "low":
      return "We appreciate your feedback and would love to hear more about your experience. Your input helps us improve our service.\n\nPlease take a moment to share more details about your visit:\n\n{feedback_url}";
    default:
      return "";
  }
}

function getDefaultSMSContent(type: "initial" | "high" | "low"): string {
  switch (type) {
    case "initial":
      return "Hi {customer_name}, how was your experience at {business_name}? Rate us 1-5 stars: {rating_url}";
    case "high":
      return "Thanks for the great rating! Share your experience on Google ({google_url}) and receive {incentive}!";
    case "low":
      return "We value your feedback. Please help us improve by sharing more details: {feedback_url}";
    default:
      return "";
  }
}

export default TemplateEditor;
