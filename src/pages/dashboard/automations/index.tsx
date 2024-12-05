import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  StarIcon,
  ArrowRightIcon,
  FormInputIcon,
  ExternalLinkIcon,
  ClockIcon,
  PencilIcon,
} from "lucide-react";

const AutomationsPage = () => {
  const [activeTab, setActiveTab] = React.useState<"email" | "sms">("email");
  const [delay, setDelay] = React.useState("24");
  const [selectedTemplate, setSelectedTemplate] = React.useState<
    "initial" | "high" | "low"
  >("initial");

  const templates = {
    email: {
      initial: {
        subject: "We'd Love Your Feedback!",
        content:
          "Hi [Name], thank you for choosing [Business Name]! Please click below to rate your experience:\n\n⭐ ⭐ ⭐ ⭐ ⭐\n\nEach star above is a clickable link that will record your rating.",
        links: {
          rating:
            "https://koudos.io/feedback?rating=[Star]&business=[BusinessID]",
        },
      },
      high: {
        subject: "Thank You for Your Feedback!",
        content:
          "Thank you for your glowing feedback! As a token of our appreciation, you'll receive [Incentive Message]. Please share your experience on Google: [Google Review URL]",
      },
      low: {
        subject: "Help Us Improve",
        content:
          "We appreciate your feedback and would love to hear more about your experience. Please take a moment to share your thoughts:\n\nWhat could we improve?\n- Service Quality\n- Wait Time\n- Pricing\n- Other\n\n[Feedback Form URL]",
      },
    },
    sms: {
      initial: {
        content:
          "Hi [Name], thank you for visiting [Business Name]! We'd love to hear your feedback. On a scale of 1-5, how was your experience?",
      },
      high: {
        content:
          "Thank you for your amazing feedback! 🌟 We'd love it if you shared your experience on Google: [Google Review URL]. As a thank-you, you'll receive [Incentive Message]!",
      },
      low: {
        content:
          "We're sorry we didn't meet your expectations. Could you share how we can improve? Reply here or fill out this feedback form: [Dynamic Feedback Link].",
      },
    },
  };

  return (
    <div className="h-full bg-background p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Review Collection Automations
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure your feedback collection workflows
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "email" | "sms")}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="email">
            <MailIcon className="w-4 h-4 mr-2" />
            Email Automation
          </TabsTrigger>
          <TabsTrigger value="sms">
            <MessageSquareIcon className="w-4 h-4 mr-2" />
            SMS Automation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              {/* Initial Request */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Initial Request
                  </h3>
                  <Select value={delay} onValueChange={setDelay}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select delay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Immediate</SelectItem>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="48">48 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MailIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">Initial Email</p>
                          <p className="text-xs text-muted-foreground">
                            Sent {delay}h after appointment
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Input
                        value={templates.email.initial.subject}
                        placeholder="Email subject"
                      />
                      <Textarea
                        value={templates.email.initial.content}
                        placeholder="Email content"
                        className="min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        Available variables: [Name], [Business Name],
                        [BusinessID], [Star], [Incentive Message]
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Separator />

              {/* Rating Based Paths */}
              <div className="grid grid-cols-2 gap-8">
                {/* 5-Star Path */}
                <div className="space-y-4">
                  <Card className="p-4 bg-muted/50">
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <h3 className="font-medium">5-Star Rating</h3>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MailIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">Thank You Email</p>
                          <p className="text-xs text-muted-foreground">
                            With Google Review link
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Input
                          value={templates.email.high.subject}
                          placeholder="Email subject"
                        />
                        <Textarea
                          value={templates.email.high.content}
                          placeholder="Email content"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* 1-4 Star Path */}
                <div className="space-y-4">
                  <Card className="p-4 bg-muted/50">
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <h3 className="font-medium">1-4 Star Rating</h3>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FormInputIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">Feedback Form</p>
                          <p className="text-xs text-muted-foreground">
                            Collect detailed feedback
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Input
                          value={templates.email.low.subject}
                          placeholder="Email subject"
                        />
                        <Textarea
                          value={templates.email.low.content}
                          placeholder="Email content"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              {/* Initial Request */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Initial Request
                  </h3>
                  <Select value={delay} onValueChange={setDelay}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select delay" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Immediate</SelectItem>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="48">48 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MessageSquareIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">Initial SMS</p>
                          <p className="text-xs text-muted-foreground">
                            Sent {delay}h after appointment
                          </p>
                        </div>
                      </div>
                    </div>
                    <Textarea
                      value={templates.sms.initial.content}
                      placeholder="SMS content"
                      className="min-h-[100px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Available variables: [Name], [Business Name],
                      [BusinessID], [Incentive Message]
                    </p>
                  </div>
                </Card>
              </div>

              <Separator />

              {/* Rating Based Paths */}
              <div className="grid grid-cols-2 gap-8">
                {/* 5-Star Path */}
                <div className="space-y-4">
                  <Card className="p-4 bg-muted/50">
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <h3 className="font-medium">5-Star Rating</h3>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <MessageSquareIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">Thank You Message</p>
                          <p className="text-xs text-muted-foreground">
                            With Google Review link
                          </p>
                        </div>
                      </div>
                      <Textarea
                        value={templates.sms.high.content}
                        placeholder="SMS content"
                        className="min-h-[100px]"
                      />
                    </div>
                  </Card>
                </div>

                {/* 1-4 Star Path */}
                <div className="space-y-4">
                  <Card className="p-4 bg-muted/50">
                    <div className="flex items-center gap-2">
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                      <h3 className="font-medium">1-4 Star Rating</h3>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FormInputIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">Feedback Request</p>
                          <p className="text-xs text-muted-foreground">
                            With feedback form link
                          </p>
                        </div>
                      </div>
                      <Textarea
                        value={templates.sms.low.content}
                        placeholder="SMS content"
                        className="min-h-[100px]"
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutomationsPage;
