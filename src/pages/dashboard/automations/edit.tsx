import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeftIcon,
  SaveIcon,
  MessageSquareIcon,
  StarIcon,
  InfoIcon,
  GiftIcon,
  GlobeIcon,
  FormInputIcon,
  BellIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";

interface AutomationStep {
  id: string;
  type: "initial" | "5_star" | "low_star";
  message: string;
  incentiveEnabled?: boolean;
  incentive?: {
    type: "discount" | "gift_card";
    value: string;
  };
}

const AutomationEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = React.useState<AutomationStep | null>(null);

  React.useEffect(() => {
    // In a real app, fetch from API
    if (id === "1") {
      setStep({
        id: "1",
        type: "initial",
        message:
          "Hi {customer_first_name}, thank you for visiting {business}! How would you rate your experience from 1-5 stars?",
      });
    } else if (id === "2") {
      setStep({
        id: "2",
        type: "5_star",
        message:
          "Thank you for your amazing feedback! Would you mind sharing your experience on Google? {google_url}\n\nAs a thank you, you'll receive {incentive}!",
        incentiveEnabled: true,
        incentive: {
          type: "discount",
          value: "10% off next visit",
        },
      });
    } else if (id === "3") {
      setStep({
        id: "3",
        type: "low_star",
        message:
          "We apologize that your experience wasn't perfect. We'd love to hear more about what went wrong: {feedback_url}",
        incentiveEnabled: false,
      });
    }
  }, [id]);

  if (!step) return null;

  const handleSave = () => {
    // Save changes
    navigate("/automations");
  };

  const getStepTitle = (type: AutomationStep["type"]) => {
    switch (type) {
      case "initial":
        return "Initial Message";
      case "5_star":
        return "5-Star Response";
      case "low_star":
        return "1-4 Star Response";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/automations")}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {getStepTitle(step.type)}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Edit the message template and settings
            </p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <SaveIcon className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-2">
        {/* Message Template */}
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <MessageSquareIcon className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Message Template</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Message Content</Label>
              <Textarea
                value={step.message}
                onChange={(e) =>
                  setStep((prev) =>
                    prev ? { ...prev, message: e.target.value } : null,
                  )
                }
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <InfoIcon className="w-4 h-4" />
                <span className="font-medium">Available Variables</span>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>
                  <code>{"{customer_first_name}"}</code> - Customer's first name
                </li>
                <li>
                  <code>{"{business}"}</code> - Business name
                </li>
                {step.type === "5_star" && (
                  <>
                    <li>
                      <code>{"{google_url}"}</code> - Google review link
                    </li>
                    {step.incentiveEnabled && (
                      <li>
                        <code>{"{incentive}"}</code> - Incentive offer
                      </li>
                    )}
                  </>
                )}
                {step.type === "low_star" && (
                  <li>
                    <code>{"{feedback_url}"}</code> - Feedback form link
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <div className="space-y-6">
          {/* Delivery Settings */}
          <Card className="p-6 space-y-6">
            <div className="flex items-center gap-2">
              <BellIcon className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Delivery Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Send via SMS</Label>
                  <p className="text-sm text-muted-foreground">
                    Send this message via text message
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Send via Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Send this message via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Delay Before Sending</Label>
                <Select defaultValue="0">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Send Immediately</SelectItem>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Response Settings */}
          {step.type !== "initial" && (
            <Card className="p-6 space-y-6">
              <div className="flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-primary" />
                <h3 className="font-medium">Response Settings</h3>
              </div>

              <div className="space-y-6">
                {step.type === "5_star" && (
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
                          placeholder="https://g.page/r/..."
                          className="w-full"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Enable Incentive</Label>
                        <p className="text-sm text-muted-foreground">
                          Offer an incentive for leaving a Google review
                        </p>
                      </div>
                      <Switch
                        checked={step.incentiveEnabled}
                        onCheckedChange={(checked) =>
                          setStep((prev) =>
                            prev
                              ? { ...prev, incentiveEnabled: checked }
                              : null,
                          )
                        }
                      />
                    </div>

                    {step.incentiveEnabled && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Incentive Type</Label>
                          <Select
                            value={step.incentive?.type}
                            onValueChange={(value: "discount" | "gift_card") =>
                              setStep((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      incentive: {
                                        ...prev.incentive!,
                                        type: value,
                                      },
                                    }
                                  : null,
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="discount">Discount</SelectItem>
                              <SelectItem value="gift_card">
                                Gift Card
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Incentive Value</Label>
                          <Input
                            value={step.incentive?.value}
                            onChange={(e) =>
                              setStep((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      incentive: {
                                        ...prev.incentive!,
                                        value: e.target.value,
                                      },
                                    }
                                  : null,
                              )
                            }
                            placeholder="e.g., 10% off next visit"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step.type === "low_star" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Feedback Form Link</Label>
                        <p className="text-sm text-muted-foreground">
                          Link to your detailed feedback form
                        </p>
                      </div>
                      <div className="w-[300px]">
                        <Input
                          placeholder="https://feedback.example.com/..."
                          className="w-full"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Notification Recipients</Label>
                      <Input
                        type="email"
                        placeholder="Enter email addresses (comma-separated)"
                      />
                      <p className="text-sm text-muted-foreground">
                        Recipients will be notified when low ratings are
                        received
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutomationEditPage;
