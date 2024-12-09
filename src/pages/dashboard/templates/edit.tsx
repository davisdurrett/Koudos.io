import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettings } from "@/lib/contexts/settings-context";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MailIcon,
  MessageSquareIcon,
  SaveIcon,
  GiftIcon,
  StarIcon,
  ArrowLeftIcon,
  FlagIcon,
  BellIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";

const TemplateEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { settings, updateTemplates } = useSettings();
  const [template, setTemplate] = React.useState(
    settings.templates.find((t) => t.id === id) || settings.templates[0],
  );

  const handleSave = () => {
    updateTemplates(
      settings.templates.map((t) => (t.id === template.id ? template : t)),
    );
    toast({
      title: "Template saved",
      description: "Your template has been updated successfully.",
    });
    navigate("/templates");
  };

  const handleAddRecipient = (stepId: string) => {
    setTemplate({
      ...template,
      steps: template.steps.map((s) =>
        s.id === stepId
          ? {
              ...s,
              config: {
                ...s.config,
                internalAlert: {
                  ...s.config.internalAlert!,
                  recipients: [
                    ...(s.config.internalAlert?.recipients || []),
                    "",
                  ],
                },
              },
            }
          : s,
      ),
    });
  };

  const handleRemoveRecipient = (stepId: string, index: number) => {
    setTemplate({
      ...template,
      steps: template.steps.map((s) =>
        s.id === stepId
          ? {
              ...s,
              config: {
                ...s.config,
                internalAlert: {
                  ...s.config.internalAlert!,
                  recipients: s.config.internalAlert!.recipients.filter(
                    (_, i) => i !== index,
                  ),
                },
              },
            }
          : s,
      ),
    });
  };

  const handleUpdateRecipient = (
    stepId: string,
    index: number,
    value: string,
  ) => {
    setTemplate({
      ...template,
      steps: template.steps.map((s) =>
        s.id === stepId
          ? {
              ...s,
              config: {
                ...s.config,
                internalAlert: {
                  ...s.config.internalAlert!,
                  recipients: s.config.internalAlert!.recipients.map((r, i) =>
                    i === index ? value : r,
                  ),
                },
              },
            }
          : s,
      ),
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/templates")}
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Edit Template
            </h2>
            <p className="text-sm text-muted-foreground">
              Configure your feedback collection template
            </p>
          </div>
        </div>
        <Button onClick={handleSave}>
          <SaveIcon className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Template Name</Label>
              <Input
                value={template.name}
                onChange={(e) =>
                  setTemplate({ ...template, name: e.target.value })
                }
                placeholder="Enter template name"
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={template.type}
                onValueChange={(value: "email" | "sms") =>
                  setTemplate({ ...template, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {template.steps.map((step) => (
            <Card key={step.id} className="p-4">
              {step.type === "message" ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {template.type === "email" ? (
                      <MailIcon className="w-4 h-4" />
                    ) : (
                      <MessageSquareIcon className="w-4 h-4" />
                    )}
                    <h3 className="font-medium">Message Content</h3>
                  </div>

                  {template.type === "email" && (
                    <div className="space-y-2">
                      <Label>Subject Line</Label>
                      <Input
                        value={step.config.subject}
                        onChange={(e) =>
                          setTemplate({
                            ...template,
                            steps: template.steps.map((s) =>
                              s.id === step.id
                                ? {
                                    ...s,
                                    config: {
                                      ...s.config,
                                      subject: e.target.value,
                                    },
                                  }
                                : s,
                            ),
                          })
                        }
                        placeholder="Enter email subject"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Initial Message</Label>
                    <Textarea
                      value={step.config.content}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          steps: template.steps.map((s) =>
                            s.id === step.id
                              ? {
                                  ...s,
                                  config: {
                                    ...s.config,
                                    content: e.target.value,
                                  },
                                }
                              : s,
                          ),
                        })
                      }
                      placeholder="Enter initial message content"
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* 5-Star Response Section */}
                  <div className="p-4 border rounded-lg bg-green-50/50 border-green-100">
                    <div className="space-y-2">
                      <Label className="text-green-700">
                        High Rating Response (5 stars)
                      </Label>
                      <Textarea
                        value={step.config.highRatingResponse}
                        onChange={(e) =>
                          setTemplate({
                            ...template,
                            steps: template.steps.map((s) =>
                              s.id === step.id
                                ? {
                                    ...s,
                                    config: {
                                      ...s.config,
                                      highRatingResponse: e.target.value,
                                    },
                                  }
                                : s,
                            ),
                          })
                        }
                        placeholder="Enter response for 5-star ratings"
                        className="min-h-[100px] bg-green-50/50 border-green-100"
                      />
                    </div>
                  </div>

                  {/* 1-4 Star Response Section */}
                  <div className="p-4 border rounded-lg bg-red-50/50 border-red-100">
                    <div className="space-y-2">
                      <Label className="text-red-700">
                        Low Rating Response (1-4 stars)
                      </Label>
                      <Textarea
                        value={step.config.lowRatingResponse}
                        onChange={(e) =>
                          setTemplate({
                            ...template,
                            steps: template.steps.map((s) =>
                              s.id === step.id
                                ? {
                                    ...s,
                                    config: {
                                      ...s.config,
                                      lowRatingResponse: e.target.value,
                                    },
                                  }
                                : s,
                            ),
                          })
                        }
                        placeholder="Enter response for 1-4 star ratings"
                        className="min-h-[100px] bg-red-50/50 border-red-100"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <StarIcon className="w-4 h-4" />
                    <h3 className="font-medium">Rating Conditions</h3>
                  </div>

                  <div className="space-y-4">
                    {/* 5-Star Section */}
                    <div className="p-4 border rounded-lg bg-green-50/50 border-green-100">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-green-700">
                            Google Review Incentive
                          </Label>
                          <p className="text-sm text-green-600">
                            Offer an incentive for 5-star Google reviews
                          </p>
                        </div>
                        <Switch
                          checked={step.config.incentive !== undefined}
                          onCheckedChange={(checked) =>
                            setTemplate({
                              ...template,
                              steps: template.steps.map((s) =>
                                s.id === step.id
                                  ? {
                                      ...s,
                                      config: {
                                        ...s.config,
                                        incentive: checked
                                          ? {
                                              type: "discount",
                                              value: "10% off next visit",
                                              expiryDays: 30,
                                            }
                                          : undefined,
                                      },
                                    }
                                  : s,
                              ),
                            })
                          }
                        />
                      </div>

                      {step.config.incentive && (
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label>Incentive Type</Label>
                            <Select
                              value={step.config.incentive.type}
                              onValueChange={(value) =>
                                setTemplate({
                                  ...template,
                                  steps: template.steps.map((s) =>
                                    s.id === step.id && s.config.incentive
                                      ? {
                                          ...s,
                                          config: {
                                            ...s.config,
                                            incentive: {
                                              ...s.config.incentive,
                                              type: value,
                                            },
                                          },
                                        }
                                      : s,
                                  ),
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="discount">
                                  Discount
                                </SelectItem>
                                <SelectItem value="gift_card">
                                  Gift Card
                                </SelectItem>
                                <SelectItem value="loyalty_points">
                                  Loyalty Points
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Incentive Value</Label>
                            <Input
                              value={step.config.incentive.value}
                              onChange={(e) =>
                                setTemplate({
                                  ...template,
                                  steps: template.steps.map((s) =>
                                    s.id === step.id && s.config.incentive
                                      ? {
                                          ...s,
                                          config: {
                                            ...s.config,
                                            incentive: {
                                              ...s.config.incentive,
                                              value: e.target.value,
                                            },
                                          },
                                        }
                                      : s,
                                  ),
                                })
                              }
                              placeholder="e.g., 10% off next visit"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Expiry (Days)</Label>
                            <Select
                              value={step.config.incentive.expiryDays.toString()}
                              onValueChange={(value) =>
                                setTemplate({
                                  ...template,
                                  steps: template.steps.map((s) =>
                                    s.id === step.id && s.config.incentive
                                      ? {
                                          ...s,
                                          config: {
                                            ...s.config,
                                            incentive: {
                                              ...s.config.incentive,
                                              expiryDays: parseInt(value),
                                            },
                                          },
                                        }
                                      : s,
                                  ),
                                })
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

                    {/* 1-4 Star Section */}
                    <div className="p-4 border rounded-lg bg-red-50/50 border-red-100">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-red-700">
                            Low Rating Alerts
                          </Label>
                          <p className="text-sm text-red-600">
                            Get notified for 1-4 star ratings
                          </p>
                        </div>
                        <Switch
                          checked={step.config.internalAlert?.enabled}
                          onCheckedChange={(checked) =>
                            setTemplate({
                              ...template,
                              steps: template.steps.map((s) =>
                                s.id === step.id
                                  ? {
                                      ...s,
                                      config: {
                                        ...s.config,
                                        internalAlert: {
                                          enabled: checked,
                                          recipients: [],
                                        },
                                      },
                                    }
                                  : s,
                              ),
                            })
                          }
                        />
                      </div>

                      {step.config.internalAlert?.enabled && (
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label>Alert Recipients</Label>
                            {(step.config.internalAlert.recipients || []).map(
                              (recipient, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 mb-2"
                                >
                                  <Input
                                    value={recipient}
                                    onChange={(e) =>
                                      handleUpdateRecipient(
                                        step.id,
                                        index,
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Enter email address"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      handleRemoveRecipient(step.id, index)
                                    }
                                  >
                                    <XIcon className="w-4 h-4" />
                                  </Button>
                                </div>
                              ),
                            )}
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => handleAddRecipient(step.id)}
                            >
                              <PlusIcon className="w-4 h-4 mr-2" />
                              Add Another Recipient
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TemplateEditPage;
