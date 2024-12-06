import React, { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
  PlusIcon,
  Settings2Icon,
  SaveIcon,
  GiftIcon,
  StarIcon,
  ArrowRightIcon,
  FlagIcon,
  BellIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  ClockIcon,
  SplitIcon,
  SendIcon,
} from "lucide-react";

interface FlowStep {
  id: string;
  type: "message" | "condition" | "action";
  config: {
    channel?: "email" | "sms" | "both";
    content?: string;
    smsContent?: string;
    condition?: "rating" | "response";
    conditionValue?: string;
    action?: "google_review" | "feedback_form" | "alert";
    actionConfig?: {
      incentive?: string;
      incentiveType?: "discount" | "gift" | "points";
    };
    delay?: number;
  };
}

interface Template {
  id: string;
  name: string;
  trigger: "appointment" | "manual" | "scheduled";
  steps: FlowStep[];
  lastEdited: string;
}

const variables = [
  { name: "{name}", desc: "Customer's name" },
  { name: "{business}", desc: "Business name" },
  { name: "{rating}", desc: "Rating value" },
  { name: "{rating_url}", desc: "Rating collection URL" },
  { name: "{google_url}", desc: "Google review URL" },
  { name: "{feedback_url}", desc: "Feedback form URL" },
  { name: "{incentive}", desc: "Incentive offer" },
];

const defaultTemplate: Template = {
  id: "1",
  name: "Default Flow",
  trigger: "appointment",
  steps: [
    {
      id: "1",
      type: "message",
      config: {
        channel: "both",
        content:
          "Hi {name}, thank you for visiting {business}! We'd love to hear your feedback.",
        smsContent:
          "Hi {name}, how was your visit to {business}? Rate us 1-5: {rating_url}",
        delay: 24,
      },
    },
    {
      id: "2",
      type: "condition",
      config: {
        condition: "rating",
      },
    },
    {
      id: "3",
      type: "action",
      config: {
        action: "google_review",
        actionConfig: {
          incentive: "10% off next visit",
          incentiveType: "discount",
        },
      },
    },
  ],
  lastEdited: new Date().toISOString(),
};

const TemplatesPage = () => {
  const [templates, setTemplates] = React.useState<Template[]>([
    defaultTemplate,
  ]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    React.useState<Template | null>(null);

  const handleCreate = () => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: "New Flow",
      trigger: "appointment",
      steps: [
        {
          id: "1",
          type: "message",
          config: {
            channel: "both",
            content: "",
            smsContent: "",
            delay: 0,
          },
        },
      ],
      lastEdited: new Date().toISOString(),
    };
    setSelectedTemplate(newTemplate);
    setIsEditing(true);
  };

  const handleAddStep = (template: Template, type: FlowStep["type"]) => {
    const newStep: FlowStep = {
      id: Date.now().toString(),
      type,
      config: {},
    };

    if (type === "message") {
      newStep.config = {
        channel: "both",
        content: "",
        smsContent: "",
        delay: 0,
      };
    } else if (type === "condition") {
      newStep.config = {
        condition: "rating",
      };
    } else if (type === "action") {
      newStep.config = {
        action: "google_review",
      };
    }

    setSelectedTemplate({
      ...template,
      steps: [...template.steps, newStep],
    });
  };

  const handleRemoveStep = (template: Template, stepId: string) => {
    setSelectedTemplate({
      ...template,
      steps: template.steps.filter((step) => step.id !== stepId),
    });
  };

  const handleSave = () => {
    if (!selectedTemplate) return;

    setTemplates((prev) =>
      prev.some((t) => t.id === selectedTemplate.id)
        ? prev.map((t) => (t.id === selectedTemplate.id ? selectedTemplate : t))
        : [...prev, selectedTemplate],
    );

    setIsEditing(false);
    setSelectedTemplate(null);
  };

  const EditDialog = () => {
    if (!selectedTemplate) return null;

    return (
      <Dialog open={isEditing} onOpenChange={() => setIsEditing(false)}>
        <DialogContent className="max-w-4xl h-[85vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit Flow</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-6">
              {/* Basic Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Flow Name</Label>
                  <Input
                    value={selectedTemplate.name}
                    onChange={(e) =>
                      setSelectedTemplate({
                        ...selectedTemplate,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Trigger</Label>
                  <Select
                    value={selectedTemplate.trigger}
                    onValueChange={(value: Template["trigger"]) =>
                      setSelectedTemplate({
                        ...selectedTemplate,
                        trigger: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appointment">
                        After Appointment
                      </SelectItem>
                      <SelectItem value="manual">Manual Trigger</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Flow Steps */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Flow Steps</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddStep(selectedTemplate, "message")}
                    >
                      <MessageSquareIcon className="w-4 h-4 mr-2" />
                      Add Message
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleAddStep(selectedTemplate, "condition")
                      }
                    >
                      <StarIcon className="w-4 h-4 mr-2" />
                      Add Condition
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddStep(selectedTemplate, "action")}
                    >
                      <ArrowRightIcon className="w-4 h-4 mr-2" />
                      Add Action
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedTemplate.steps.map((step, index) => (
                    <Card key={step.id} className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Step {index + 1}</Badge>
                            <Badge variant="outline" className="capitalize">
                              {step.type}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemoveStep(selectedTemplate, step.id)
                            }
                          >
                            <MinusCircleIcon className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>

                        {step.type === "message" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Channel</Label>
                              <Select
                                value={step.config.channel}
                                onValueChange={(value) =>
                                  setSelectedTemplate({
                                    ...selectedTemplate,
                                    steps: selectedTemplate.steps.map((s) =>
                                      s.id === step.id
                                        ? {
                                            ...s,
                                            config: {
                                              ...s.config,
                                              channel: value,
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
                                  <SelectItem value="both">
                                    Email & SMS
                                  </SelectItem>
                                  <SelectItem value="email">
                                    Email Only
                                  </SelectItem>
                                  <SelectItem value="sms">SMS Only</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Email Content</Label>
                              <Textarea
                                value={step.config.content}
                                onChange={(e) =>
                                  setSelectedTemplate({
                                    ...selectedTemplate,
                                    steps: selectedTemplate.steps.map((s) =>
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
                                placeholder="Enter email content..."
                              />
                            </div>

                            {step.config.channel !== "email" && (
                              <div className="space-y-2">
                                <Label>SMS Content</Label>
                                <Textarea
                                  value={step.config.smsContent}
                                  onChange={(e) =>
                                    setSelectedTemplate({
                                      ...selectedTemplate,
                                      steps: selectedTemplate.steps.map((s) =>
                                        s.id === step.id
                                          ? {
                                              ...s,
                                              config: {
                                                ...s.config,
                                                smsContent: e.target.value,
                                              },
                                            }
                                          : s,
                                      ),
                                    })
                                  }
                                  placeholder="Enter SMS content..."
                                />
                              </div>
                            )}

                            <div className="space-y-2">
                              <Label>Delay (hours)</Label>
                              <Input
                                type="number"
                                value={step.config.delay}
                                onChange={(e) =>
                                  setSelectedTemplate({
                                    ...selectedTemplate,
                                    steps: selectedTemplate.steps.map((s) =>
                                      s.id === step.id
                                        ? {
                                            ...s,
                                            config: {
                                              ...s.config,
                                              delay: parseInt(e.target.value),
                                            },
                                          }
                                        : s,
                                    ),
                                  })
                                }
                                min="0"
                              />
                            </div>
                          </div>
                        )}

                        {step.type === "condition" && (
                          <div className="space-y-2">
                            <Label>Condition Type</Label>
                            <Select
                              value={step.config.condition}
                              onValueChange={(value) =>
                                setSelectedTemplate({
                                  ...selectedTemplate,
                                  steps: selectedTemplate.steps.map((s) =>
                                    s.id === step.id
                                      ? {
                                          ...s,
                                          config: {
                                            ...s.config,
                                            condition: value,
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
                                <SelectItem value="rating">
                                  Rating Check
                                </SelectItem>
                                <SelectItem value="response">
                                  Response Check
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {step.type === "action" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Action Type</Label>
                              <Select
                                value={step.config.action}
                                onValueChange={(value) =>
                                  setSelectedTemplate({
                                    ...selectedTemplate,
                                    steps: selectedTemplate.steps.map((s) =>
                                      s.id === step.id
                                        ? {
                                            ...s,
                                            config: {
                                              ...s.config,
                                              action: value,
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
                                  <SelectItem value="google_review">
                                    Request Google Review
                                  </SelectItem>
                                  <SelectItem value="feedback_form">
                                    Show Feedback Form
                                  </SelectItem>
                                  <SelectItem value="alert">
                                    Alert Business
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {step.config.action === "google_review" && (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <Label>Include Incentive</Label>
                                  <Switch
                                    checked={Boolean(
                                      step.config.actionConfig?.incentive,
                                    )}
                                    onCheckedChange={(checked) =>
                                      setSelectedTemplate({
                                        ...selectedTemplate,
                                        steps: selectedTemplate.steps.map(
                                          (s) =>
                                            s.id === step.id
                                              ? {
                                                  ...s,
                                                  config: {
                                                    ...s.config,
                                                    actionConfig: checked
                                                      ? {
                                                          incentive: "",
                                                          incentiveType:
                                                            "discount",
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

                                {step.config.actionConfig?.incentive !==
                                  undefined && (
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label>Incentive Type</Label>
                                      <Select
                                        value={
                                          step.config.actionConfig
                                            ?.incentiveType
                                        }
                                        onValueChange={(value) =>
                                          setSelectedTemplate({
                                            ...selectedTemplate,
                                            steps: selectedTemplate.steps.map(
                                              (s) =>
                                                s.id === step.id
                                                  ? {
                                                      ...s,
                                                      config: {
                                                        ...s.config,
                                                        actionConfig: {
                                                          ...s.config
                                                            .actionConfig!,
                                                          incentiveType: value,
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
                                          <SelectItem value="gift">
                                            Gift Card
                                          </SelectItem>
                                          <SelectItem value="points">
                                            Loyalty Points
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="space-y-2">
                                      <Label>Incentive Value</Label>
                                      <Input
                                        value={
                                          step.config.actionConfig?.incentive
                                        }
                                        onChange={(e) =>
                                          setSelectedTemplate({
                                            ...selectedTemplate,
                                            steps: selectedTemplate.steps.map(
                                              (s) =>
                                                s.id === step.id
                                                  ? {
                                                      ...s,
                                                      config: {
                                                        ...s.config,
                                                        actionConfig: {
                                                          ...s.config
                                                            .actionConfig!,
                                                          incentive:
                                                            e.target.value,
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
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <SaveIcon className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="h-full bg-background p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Feedback Flows
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure your feedback collection and response workflows
          </p>
        </div>
        <Button onClick={handleCreate}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Flow
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{template.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="capitalize">
                      {template.trigger.replace("_", " ")}
                    </Badge>
                    <Badge variant="outline">
                      {template.steps.length} steps
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setIsEditing(true);
                  }}
                >
                  <Settings2Icon className="w-4 h-4 mr-2" />
                  Edit Flow
                </Button>
              </div>

              {/* Flow Steps */}
              <div className="relative bg-muted/10 rounded-lg border border-border/50 p-6">
                <div className="flex flex-col gap-6">
                  {template.steps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4">
                      {/* Step Number */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {index + 1}
                        </span>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {step.type}
                          </Badge>
                          {step.config.delay && (
                            <Badge
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <ClockIcon className="w-3 h-3" />
                              {step.config.delay}h delay
                            </Badge>
                          )}
                          {step.config.channel && (
                            <Badge
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {step.config.channel === "both" ? (
                                <>
                                  <MailIcon className="w-3 h-3" />
                                  <MessageSquareIcon className="w-3 h-3" />
                                </>
                              ) : step.config.channel === "email" ? (
                                <MailIcon className="w-3 h-3" />
                              ) : (
                                <MessageSquareIcon className="w-3 h-3" />
                              )}
                              {step.config.channel}
                            </Badge>
                          )}
                        </div>

                        {step.type === "message" && (
                          <div className="text-sm text-muted-foreground">
                            {step.config.content && (
                              <div className="flex items-start gap-2">
                                <MailIcon className="w-4 h-4 mt-0.5" />
                                <p className="line-clamp-1">
                                  {step.config.content}
                                </p>
                              </div>
                            )}
                            {step.config.smsContent && (
                              <div className="flex items-start gap-2 mt-1">
                                <MessageSquareIcon className="w-4 h-4 mt-0.5" />
                                <p className="line-clamp-1">
                                  {step.config.smsContent}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {step.type === "condition" && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <SplitIcon className="w-4 h-4" />
                            <span>
                              {step.config.condition === "rating"
                                ? "Split based on rating"
                                : "Split based on response"}
                            </span>
                          </div>
                        )}

                        {step.type === "action" && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {step.config.action === "google_review" ? (
                              <>
                                <StarIcon className="w-4 h-4" />
                                <span>Request Google Review</span>
                                {step.config.actionConfig?.incentive && (
                                  <Badge
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                  >
                                    <GiftIcon className="w-3 h-3" />
                                    {step.config.actionConfig.incentive}
                                  </Badge>
                                )}
                              </>
                            ) : step.config.action === "feedback_form" ? (
                              <>
                                <MessageSquareIcon className="w-4 h-4" />
                                <span>Show Feedback Form</span>
                              </>
                            ) : (
                              <>
                                <BellIcon className="w-4 h-4" />
                                <span>Alert Business</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Connector Line */}
                      {index < template.steps.length - 1 && (
                        <div
                          className="absolute left-10 ml-[-1px] w-[2px] h-6 bg-border/50"
                          style={{ top: `${(index + 1) * 100}px` }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <EditDialog />
    </div>
  );
};

export default TemplatesPage;
