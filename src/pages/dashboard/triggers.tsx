import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useSettings } from "@/lib/contexts/settings-context";
import MessageTemplateInput from "@/components/dashboard/MessageTemplateInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BoltIcon,
  MessageSquareIcon,
  StarIcon,
  GiftIcon,
  SaveIcon,
  EyeIcon,
  SendIcon,
  ImageIcon,
  PencilIcon,
} from "lucide-react";
import SMSPreviewDialog from "@/components/dashboard/SMSPreviewDialog";
import FeedbackFormEditor from "@/components/dashboard/FeedbackFormEditor";

const TriggersPage = () => {
  const { settings, updateBusinessSettings } = useSettings();
  const [trigger, setTrigger] = React.useState({
    enabled: true,
    delay: "24",
    initialMessage:
      "Hi {name} 👋 Thank you for visiting {business}! How would you rate your experience from 1-5 stars? ⭐",
    highRatingMessage:
      "Amazing feedback! 🌟 We'd love if you could share your experience on Google: {google_url}\n\nAs a thank you, you'll receive {incentive}! 🎁",
    highRatingMessageNoIncentive:
      "Amazing feedback! 🌟 We'd love if you could share your experience on Google: {google_url}",
    lowRatingMessage:
      "Thank you for your feedback 🙏 We're sorry to hear that your experience wasn't perfect.\n\nWe'd love to hear more about what went wrong so we can improve: {feedback_url}",
    incentiveEnabled: true,
    incentiveType: "discount",
    incentiveValue: "10% off next visit",
    incentiveExpiry: "30",
    formTitle: "Help Us Improve 🎯",
    formDescription:
      "We noticed your experience wasn't perfect. Please share what went wrong so we can make it right.",
    formCategories: [
      "Service Quality",
      "Wait Time",
      "Cleanliness",
      "Pricing",
      "Other",
    ],
  });

  const [showPreview, setShowPreview] = React.useState<"high" | "low" | null>(
    null,
  );
  const [showFormEditor, setShowFormEditor] = React.useState(false);

  const handleSave = () => {
    // Save trigger settings
    console.log("Saving trigger:", trigger);
  };

  const getPreviewMessages = (type: "high" | "low") => {
    const highRatingMessage = trigger.incentiveEnabled
      ? "Amazing feedback! 🌟 We'd love if you could share your experience on Google: https://g.page/review/...\n\nAs a thank you, you'll receive 10% off your next visit! 🎁"
      : "Amazing feedback! 🌟 We'd love if you could share your experience on Google: https://g.page/review/...";

    return [
      {
        text: "Hi John 👋 Thank you for visiting Acme Inc! How would you rate your experience from 1-5 stars? ⭐",
        sender: "business",
      },
      {
        text: type === "high" ? "5" : "2",
        sender: "customer",
      },
      {
        text:
          type === "high"
            ? highRatingMessage
            : "Thank you for your feedback 🙏 We're sorry to hear that your experience wasn't perfect.\n\nWe'd love to hear more about what went wrong so we can improve: https://feedback.koudos.io/...",
        sender: "business",
      },
    ] as const;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Feedback Automations
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure automated SMS feedback collection
          </p>
        </div>
        <Button onClick={handleSave}>
          <SaveIcon className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Basic Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable SMS Trigger</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically send SMS after appointments
                </p>
              </div>
              <Switch
                checked={trigger.enabled}
                onCheckedChange={(checked) =>
                  setTrigger((prev) => ({ ...prev, enabled: checked }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Delay After Appointment</Label>
              <Select
                value={trigger.delay}
                onValueChange={(value) =>
                  setTrigger((prev) => ({ ...prev, delay: value }))
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
                  <SelectItem value="48">48 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Message Templates */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Message Templates</h3>

            <div className="space-y-2 mb-6">
              <Label>Initial Message</Label>
              <MessageTemplateInput
                value={trigger.initialMessage}
                onChange={(value) =>
                  setTrigger((prev) => ({
                    ...prev,
                    initialMessage: value,
                  }))
                }
                placeholder="Enter initial message"
                variables={[
                  { name: "name", description: "Customer's name" },
                  { name: "business", description: "Your business name" },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* 5-Star Response */}
              <div className="p-4 border rounded-lg bg-green-50/50 border-green-100">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-green-700">5-Star Response</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setShowPreview(showPreview === "high" ? null : "high")
                      }
                    >
                      <EyeIcon className="w-4 h-4 mr-2" />
                      {showPreview === "high" ? "Hide Preview" : "Preview"}
                    </Button>
                  </div>

                  <MessageTemplateInput
                    value={
                      trigger.incentiveEnabled
                        ? trigger.highRatingMessage
                        : trigger.highRatingMessageNoIncentive
                    }
                    onChange={(value) =>
                      setTrigger((prev) => ({
                        ...prev,
                        [prev.incentiveEnabled
                          ? "highRatingMessage"
                          : "highRatingMessageNoIncentive"]: value,
                      }))
                    }
                    placeholder="Enter response for 5-star ratings"
                    variables={[
                      { name: "name", description: "Customer's name" },
                      { name: "business", description: "Your business name" },
                      { name: "google_url", description: "Google review link" },
                      ...(trigger.incentiveEnabled
                        ? [
                            {
                              name: "incentive",
                              description: "Incentive offer",
                            },
                          ]
                        : []),
                    ]}
                  />
                </div>

                <SMSPreviewDialog
                  isOpen={showPreview === "high"}
                  onClose={() => setShowPreview(null)}
                  messages={getPreviewMessages("high")}
                />

                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-green-700">Review Incentive</Label>
                      <p className="text-sm text-green-600">
                        Offer an incentive for Google reviews
                      </p>
                    </div>
                    <Switch
                      checked={trigger.incentiveEnabled}
                      onCheckedChange={(checked) =>
                        setTrigger((prev) => ({
                          ...prev,
                          incentiveEnabled: checked,
                        }))
                      }
                    />
                  </div>

                  {trigger.incentiveEnabled && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Incentive Type</Label>
                        <Select
                          value={trigger.incentiveType}
                          onValueChange={(value) =>
                            setTrigger((prev) => ({
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
                            <SelectItem value="loyalty_points">
                              Loyalty Points
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Incentive Value</Label>
                        <Input
                          value={trigger.incentiveValue}
                          onChange={(e) =>
                            setTrigger((prev) => ({
                              ...prev,
                              incentiveValue: e.target.value,
                            }))
                          }
                          placeholder="e.g., 10% off next visit"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Expiry (Days)</Label>
                        <Select
                          value={trigger.incentiveExpiry}
                          onValueChange={(value) =>
                            setTrigger((prev) => ({
                              ...prev,
                              incentiveExpiry: value,
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

              {/* 1-4 Star Response */}
              <div className="p-4 border rounded-lg bg-red-50/50 border-red-100">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-red-700">1-4 Star Response</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setShowPreview(showPreview === "low" ? null : "low")
                      }
                    >
                      <EyeIcon className="w-4 h-4 mr-2" />
                      {showPreview === "low" ? "Hide Preview" : "Preview"}
                    </Button>
                  </div>

                  <MessageTemplateInput
                    value={trigger.lowRatingMessage}
                    onChange={(value) =>
                      setTrigger((prev) => ({
                        ...prev,
                        lowRatingMessage: value,
                      }))
                    }
                    placeholder="Enter response for 1-4 star ratings"
                    variables={[
                      { name: "name", description: "Customer's name" },
                      { name: "business", description: "Your business name" },
                      {
                        name: "feedback_url",
                        description: "Feedback form link",
                      },
                    ]}
                  />
                </div>

                <SMSPreviewDialog
                  isOpen={showPreview === "low"}
                  onClose={() => setShowPreview(null)}
                  messages={getPreviewMessages("low")}
                />

                {/* Feedback Form Preview */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-red-700">Feedback Form</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFormEditor(true)}
                    >
                      <PencilIcon className="w-4 h-4 mr-2" />
                      Edit Form
                    </Button>
                  </div>

                  {/* Form Preview */}
                  <Card className="p-6 bg-background border-red-100">
                    <div className="space-y-6">
                      {settings.business.logo ? (
                        <div className="flex justify-center">
                          <img
                            src={settings.business.logo}
                            alt="Business logo"
                            className="h-12 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <ImageIcon className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="text-center space-y-2">
                        <h3 className="text-lg font-medium">
                          {trigger.formTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {trigger.formDescription}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>What was the main issue? 🤔</Label>
                          <Select disabled>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {trigger.formCategories.map((category) => (
                                <SelectItem
                                  key={category}
                                  value={category
                                    .toLowerCase()
                                    .replace(/ /g, "_")}
                                >
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Additional Comments 📝</Label>
                          <Textarea
                            placeholder="Tell us more about your experience..."
                            className="min-h-[100px] resize-none"
                            disabled
                          />
                        </div>

                        <Button className="w-full" disabled>
                          <SendIcon className="w-4 h-4 mr-2" />
                          Submit Feedback
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <FeedbackFormEditor
        isOpen={showFormEditor}
        onClose={() => setShowFormEditor(false)}
        formData={{
          title: trigger.formTitle,
          description: trigger.formDescription,
          categories: trigger.formCategories,
          logo: settings.business.logo,
        }}
        onSave={(formData) => {
          setTrigger((prev) => ({
            ...prev,
            formTitle: formData.title,
            formDescription: formData.description,
            formCategories: formData.categories,
          }));
          setShowFormEditor(false);
        }}
      />
    </div>
  );
};

export default TriggersPage;
