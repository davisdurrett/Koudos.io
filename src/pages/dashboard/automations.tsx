import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  MailIcon,
  MessageSquareIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  FormInputIcon,
  GiftIcon,
  PencilIcon,
  BellIcon,
  SaveIcon,
} from "lucide-react";

interface Automation {
  id: string;
  name: string;
  delay: number;
  channel: "email" | "sms" | "both";
  status: "active" | "inactive";
  templates: {
    initial: {
      subject?: string;
      content: string;
    };
    high: {
      subject?: string;
      content: string;
      googleReview: {
        url: string;
        incentive: {
          enabled: boolean;
          type: string;
          value: string;
          expiryDays: number;
        };
      };
    };
    low: {
      subject?: string;
      content: string;
      internalAlert: {
        enabled: boolean;
        recipients: string;
        priority: "high" | "medium" | "low";
        notifyOn: string[];
      };
    };
  };
}

const AutomationsPage = () => {
  const [automations, setAutomations] = React.useState<Automation[]>([
    {
      id: "1",
      name: "Post-Appointment Feedback",
      delay: 24,
      channel: "both",
      status: "active",
      templates: {
        initial: {
          subject: "We'd Love Your Feedback!",
          content:
            "Hi {customer_name},\n\nThank you for choosing {business_name}! We'd love to hear about your experience.",
        },
        high: {
          subject: "Thank you for your amazing feedback!",
          content:
            "Thank you for your 5-star rating! Would you mind sharing your experience on Google?",
          googleReview: {
            url: "https://g.page/r/...",
            incentive: {
              enabled: true,
              type: "discount",
              value: "10% off next visit",
              expiryDays: 30,
            },
          },
        },
        low: {
          subject: "We value your feedback",
          content:
            "We appreciate your feedback and would love to hear more about your experience.",
          internalAlert: {
            enabled: true,
            recipients: "team@example.com",
            priority: "high",
            notifyOn: ["1", "2", "3"],
          },
        },
      },
    },
  ]);

  const [isEditing, setIsEditing] = React.useState(false);
  const [editingAutomation, setEditingAutomation] =
    React.useState<Automation | null>(null);
  const [activeTab, setActiveTab] = React.useState("initial");

  const handleEdit = (automation: Automation) => {
    setEditingAutomation({ ...automation });
    setActiveTab("initial");
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingAutomation) {
      setAutomations((prev) =>
        prev.map((a) =>
          a.id === editingAutomation.id ? editingAutomation : a,
        ),
      );
      setIsEditing(false);
      setEditingAutomation(null);
    }
  };

  const handleCreate = () => {
    const newAutomation: Automation = {
      id: Date.now().toString(),
      name: "New Automation",
      delay: 24,
      channel: "both",
      status: "inactive",
      templates: {
        initial: {
          subject: "We'd Love Your Feedback!",
          content:
            "Hi {customer_name},\n\nThank you for choosing {business_name}! We'd love to hear about your experience.",
        },
        high: {
          subject: "Thank you for your amazing feedback!",
          content:
            "Thank you for your 5-star rating! Would you mind sharing your experience on Google?",
          googleReview: {
            url: "https://g.page/r/...",
            incentive: {
              enabled: true,
              type: "discount",
              value: "10% off next visit",
              expiryDays: 30,
            },
          },
        },
        low: {
          subject: "We value your feedback",
          content:
            "We appreciate your feedback and would love to hear more about your experience.",
          internalAlert: {
            enabled: true,
            recipients: "team@example.com",
            priority: "high",
            notifyOn: ["1", "2", "3"],
          },
        },
      },
    };
    setEditingAutomation(newAutomation);
    setIsEditing(true);
  };

  return (
    <div className="h-full bg-background p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Automations</h2>
          <p className="text-sm text-muted-foreground">
            Configure your feedback collection workflows
          </p>
        </div>
        <Button onClick={handleCreate}>
          <PencilIcon className="w-4 h-4 mr-2" />
          Add New Automation
        </Button>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <Card key={automation.id} className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {automation.channel === "email" ? (
                      <MailIcon className="w-5 h-5" />
                    ) : automation.channel === "sms" ? (
                      <MessageSquareIcon className="w-5 h-5" />
                    ) : (
                      <div className="flex -space-x-1">
                        <MailIcon className="w-5 h-5" />
                        <MessageSquareIcon className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{automation.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={
                          automation.status === "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {automation.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {automation.delay}h after appointment
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={automation.status === "active"}
                    onCheckedChange={(checked) =>
                      setAutomations((prev) =>
                        prev.map((a) =>
                          a.id === automation.id
                            ? { ...a, status: checked ? "active" : "inactive" }
                            : a,
                        ),
                      )
                    }
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(automation)}
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>

              {/* Flow Preview */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg overflow-x-auto">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm whitespace-nowrap">
                    {automation.delay}h delay
                  </span>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex items-center gap-2">
                  <StarIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm whitespace-nowrap">
                    Rating Collection
                  </span>
                </div>
                <ArrowRightIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex items-center gap-2">
                  <GiftIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm whitespace-nowrap">
                    5★ → Google Review
                  </span>
                  {automation.templates.high.googleReview.incentive.enabled && (
                    <Badge variant="secondary" className="text-xs">
                      {automation.templates.high.googleReview.incentive.value}
                    </Badge>
                  )}
                </div>
                <ArrowRightIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex items-center gap-2">
                  <FormInputIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm whitespace-nowrap">
                    1-4★ → Feedback Form
                  </span>
                  {automation.templates.low.internalAlert.enabled && (
                    <Badge variant="secondary" className="text-xs">
                      Alert: {automation.templates.low.internalAlert.priority}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-[90vw] w-full h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAutomation?.id ? "Edit Automation" : "New Automation"}
            </DialogTitle>
          </DialogHeader>

          {editingAutomation && (
            <div className="space-y-8">
              {/* Basic Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Automation Name</Label>
                  <Input
                    value={editingAutomation.name}
                    onChange={(e) =>
                      setEditingAutomation({
                        ...editingAutomation,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Delay (hours)</Label>
                  <Select
                    value={editingAutomation.delay.toString()}
                    onValueChange={(value) =>
                      setEditingAutomation({
                        ...editingAutomation,
                        delay: parseInt(value),
                      })
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

              {/* Templates */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="initial">Initial Request</TabsTrigger>
                  <TabsTrigger value="high">5-Star Follow-up</TabsTrigger>
                  <TabsTrigger value="low">1-4 Star Follow-up</TabsTrigger>
                </TabsList>

                <TabsContent value="initial" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Subject Line</Label>
                    <Input
                      value={editingAutomation.templates.initial.subject}
                      onChange={(e) =>
                        setEditingAutomation({
                          ...editingAutomation,
                          templates: {
                            ...editingAutomation.templates,
                            initial: {
                              ...editingAutomation.templates.initial,
                              subject: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Message Content</Label>
                    <Textarea
                      value={editingAutomation.templates.initial.content}
                      onChange={(e) =>
                        setEditingAutomation({
                          ...editingAutomation,
                          templates: {
                            ...editingAutomation.templates,
                            initial: {
                              ...editingAutomation.templates.initial,
                              content: e.target.value,
                            },
                          },
                        })
                      }
                      className="min-h-[200px]"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="high" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Subject Line</Label>
                    <Input
                      value={editingAutomation.templates.high.subject}
                      onChange={(e) =>
                        setEditingAutomation({
                          ...editingAutomation,
                          templates: {
                            ...editingAutomation.templates,
                            high: {
                              ...editingAutomation.templates.high,
                              subject: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Message Content</Label>
                    <Textarea
                      value={editingAutomation.templates.high.content}
                      onChange={(e) =>
                        setEditingAutomation({
                          ...editingAutomation,
                          templates: {
                            ...editingAutomation.templates,
                            high: {
                              ...editingAutomation.templates.high,
                              content: e.target.value,
                            },
                          },
                        })
                      }
                      className="min-h-[200px]"
                    />
                  </div>

                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GiftIcon className="w-4 h-4" />
                          <Label>Review Incentive</Label>
                        </div>
                        <Switch
                          checked={
                            editingAutomation.templates.high.googleReview
                              .incentive.enabled
                          }
                          onCheckedChange={(checked) =>
                            setEditingAutomation({
                              ...editingAutomation,
                              templates: {
                                ...editingAutomation.templates,
                                high: {
                                  ...editingAutomation.templates.high,
                                  googleReview: {
                                    ...editingAutomation.templates.high
                                      .googleReview,
                                    incentive: {
                                      ...editingAutomation.templates.high
                                        .googleReview.incentive,
                                      enabled: checked,
                                    },
                                  },
                                },
                              },
                            })
                          }
                        />
                      </div>

                      {editingAutomation.templates.high.googleReview.incentive
                        .enabled && (
                        <div className="space-y-4 pl-6">
                          <div className="space-y-2">
                            <Label>Google Review URL</Label>
                            <Input
                              value={
                                editingAutomation.templates.high.googleReview
                                  .url
                              }
                              onChange={(e) =>
                                setEditingAutomation({
                                  ...editingAutomation,
                                  templates: {
                                    ...editingAutomation.templates,
                                    high: {
                                      ...editingAutomation.templates.high,
                                      googleReview: {
                                        ...editingAutomation.templates.high
                                          .googleReview,
                                        url: e.target.value,
                                      },
                                    },
                                  },
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Incentive Type</Label>
                            <Select
                              value={
                                editingAutomation.templates.high.googleReview
                                  .incentive.type
                              }
                              onValueChange={(value) =>
                                setEditingAutomation({
                                  ...editingAutomation,
                                  templates: {
                                    ...editingAutomation.templates,
                                    high: {
                                      ...editingAutomation.templates.high,
                                      googleReview: {
                                        ...editingAutomation.templates.high
                                          .googleReview,
                                        incentive: {
                                          ...editingAutomation.templates.high
                                            .googleReview.incentive,
                                          type: value,
                                        },
                                      },
                                    },
                                  },
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
                              value={
                                editingAutomation.templates.high.googleReview
                                  .incentive.value
                              }
                              onChange={(e) =>
                                setEditingAutomation({
                                  ...editingAutomation,
                                  templates: {
                                    ...editingAutomation.templates,
                                    high: {
                                      ...editingAutomation.templates.high,
                                      googleReview: {
                                        ...editingAutomation.templates.high
                                          .googleReview,
                                        incentive: {
                                          ...editingAutomation.templates.high
                                            .googleReview.incentive,
                                          value: e.target.value,
                                        },
                                      },
                                    },
                                  },
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Expiry (Days)</Label>
                            <Select
                              value={editingAutomation.templates.high.googleReview.incentive.expiryDays.toString()}
                              onValueChange={(value) =>
                                setEditingAutomation({
                                  ...editingAutomation,
                                  templates: {
                                    ...editingAutomation.templates,
                                    high: {
                                      ...editingAutomation.templates.high,
                                      googleReview: {
                                        ...editingAutomation.templates.high
                                          .googleReview,
                                        incentive: {
                                          ...editingAutomation.templates.high
                                            .googleReview.incentive,
                                          expiryDays: parseInt(value),
                                        },
                                      },
                                    },
                                  },
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
                  </Card>
                </TabsContent>

                <TabsContent value="low" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Subject Line</Label>
                    <Input
                      value={editingAutomation.templates.low.subject}
                      onChange={(e) =>
                        setEditingAutomation({
                          ...editingAutomation,
                          templates: {
                            ...editingAutomation.templates,
                            low: {
                              ...editingAutomation.templates.low,
                              subject: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Message Content</Label>
                    <Textarea
                      value={editingAutomation.templates.low.content}
                      onChange={(e) =>
                        setEditingAutomation({
                          ...editingAutomation,
                          templates: {
                            ...editingAutomation.templates,
                            low: {
                              ...editingAutomation.templates.low,
                              content: e.target.value,
                            },
                          },
                        })
                      }
                      className="min-h-[200px]"
                    />
                  </div>

                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BellIcon className="w-4 h-4" />
                          <Label>Internal Alert</Label>
                        </div>
                        <Switch
                          checked={
                            editingAutomation.templates.low.internalAlert
                              .enabled
                          }
                          onCheckedChange={(checked) =>
                            setEditingAutomation({
                              ...editingAutomation,
                              templates: {
                                ...editingAutomation.templates,
                                low: {
                                  ...editingAutomation.templates.low,
                                  internalAlert: {
                                    ...editingAutomation.templates.low
                                      .internalAlert,
                                    enabled: checked,
                                  },
                                },
                              },
                            })
                          }
                        />
                      </div>

                      {editingAutomation.templates.low.internalAlert
                        .enabled && (
                        <div className="space-y-4 pl-6">
                          <div className="space-y-2">
                            <Label>Alert Recipients</Label>
                            <Input
                              value={
                                editingAutomation.templates.low.internalAlert
                                  .recipients
                              }
                              onChange={(e) =>
                                setEditingAutomation({
                                  ...editingAutomation,
                                  templates: {
                                    ...editingAutomation.templates,
                                    low: {
                                      ...editingAutomation.templates.low,
                                      internalAlert: {
                                        ...editingAutomation.templates.low
                                          .internalAlert,
                                        recipients: e.target.value,
                                      },
                                    },
                                  },
                                })
                              }
                              placeholder="Enter email addresses (comma-separated)"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Alert Priority</Label>
                            <Select
                              value={
                                editingAutomation.templates.low.internalAlert
                                  .priority
                              }
                              onValueChange={(
                                value: "high" | "medium" | "low",
                              ) =>
                                setEditingAutomation({
                                  ...editingAutomation,
                                  templates: {
                                    ...editingAutomation.templates,
                                    low: {
                                      ...editingAutomation.templates.low,
                                      internalAlert: {
                                        ...editingAutomation.templates.low
                                          .internalAlert,
                                        priority: value,
                                      },
                                    },
                                  },
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Notify On Ratings</Label>
                            <Select
                              value={editingAutomation.templates.low.internalAlert.notifyOn.join(
                                ",",
                              )}
                              onValueChange={(value) =>
                                setEditingAutomation({
                                  ...editingAutomation,
                                  templates: {
                                    ...editingAutomation.templates,
                                    low: {
                                      ...editingAutomation.templates.low,
                                      internalAlert: {
                                        ...editingAutomation.templates.low
                                          .internalAlert,
                                        notifyOn: value.split(","),
                                      },
                                    },
                                  },
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1,2,3">1-3 Stars</SelectItem>
                                <SelectItem value="1,2">1-2 Stars</SelectItem>
                                <SelectItem value="1">1 Star Only</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setEditingAutomation(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <SaveIcon className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AutomationsPage;
