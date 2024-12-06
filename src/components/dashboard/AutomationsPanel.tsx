import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  SearchIcon,
  ClockIcon,
  PlayIcon,
  PauseIcon,
  EyeIcon,
  StarIcon,
  CalendarIcon,
  Settings2Icon,
  ArrowRightIcon,
  SaveIcon,
} from "lucide-react";

interface Automation {
  id: string;
  name: string;
  type: "email" | "sms";
  status: "active" | "paused";
  trigger: string;
  lastEdited: string;
  templates: {
    initialEmail?: string;
    highRatingEmail?: string;
    lowRatingEmail?: string;
    initialSms?: string;
    highRatingSms?: string;
    lowRatingSms?: string;
  };
}

const AutomationsPanel = ({ className = "" }: { className?: string }) => {
  const [automations, setAutomations] = React.useState<Automation[]>([
    {
      id: "1",
      name: "Post-Appointment Email",
      type: "email",
      status: "active",
      trigger: "After Appointment",
      lastEdited: new Date().toISOString(),
      templates: {
        initialEmail:
          "Hi {name}, thank you for visiting {business}! We'd love to hear your feedback.",
        highRatingEmail:
          "Thank you for your {rating}-star rating! Would you mind sharing your experience on Google? {google_url}",
        lowRatingEmail:
          "Thank you for your feedback. We'd like to learn more about your experience. {feedback_url}",
      },
    },
    {
      id: "3",
      name: "Follow-up Email",
      type: "email",
      status: "active",
      trigger: "2 Days After Visit",
      lastEdited: new Date().toISOString(),
      templates: {
        initialEmail:
          "Hi {name}, we hope you enjoyed your recent visit to {business}! Could you take a moment to share your experience?",
        highRatingEmail:
          "We're thrilled you had a great experience! Would you consider sharing your thoughts on Google? {google_url}",
        lowRatingEmail:
          "We appreciate your feedback and would love to hear more about how we can improve. {feedback_url}",
      },
    },
    {
      id: "2",
      name: "Post-Appointment SMS",
      type: "sms",
      status: "active",
      trigger: "After Appointment",
      lastEdited: new Date().toISOString(),
      templates: {
        initialSms:
          "Hi {name}, how was your visit to {business}? Rate us 1-5: {rating_url}",
        highRatingSms:
          "Thanks for the {rating}-star rating! Share your experience: {google_url}",
        lowRatingSms:
          "Thanks for your feedback. Help us improve: {feedback_url}",
      },
    },
    {
      id: "4",
      name: "Follow-up SMS",
      type: "sms",
      status: "active",
      trigger: "2 Days After Visit",
      lastEdited: new Date().toISOString(),
      templates: {
        initialSms:
          "Hi {name}, we hope you enjoyed your visit to {business}! Mind sharing your experience? Rate 1-5: {rating_url}",
        highRatingSms:
          "Thanks for the amazing rating! Share your experience on Google and get {incentive}: {google_url}",
        lowRatingSms:
          "We value your feedback and want to improve. Tell us more: {feedback_url}",
      },
    },
  ]);

  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedAutomation, setSelectedAutomation] =
    React.useState<Automation | null>(null);
  const [activeTab, setActiveTab] = React.useState("email");
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewTab, setPreviewTab] = React.useState("initial");

  const emailAutomations = automations.filter((a) => a.type === "email");
  const smsAutomations = automations.filter((a) => a.type === "sms");

  const handleCreate = (type: "email" | "sms") => {
    const newAutomation: Automation = {
      id: Date.now().toString(),
      name: `New ${type.toUpperCase()} Automation`,
      type,
      status: "paused",
      trigger: "After Appointment",
      lastEdited: new Date().toISOString(),
      templates:
        type === "email"
          ? {
              initialEmail:
                "Hi {name}, thank you for visiting {business}! We'd love to hear your feedback.",
              highRatingEmail:
                "Thank you for your {rating}-star rating! Would you mind sharing your experience on Google? {google_url}",
              lowRatingEmail:
                "Thank you for your feedback. We'd like to learn more about your experience. {feedback_url}",
            }
          : {
              initialSms:
                "Hi {name}, how was your visit to {business}? Rate us 1-5: {rating_url}",
              highRatingSms:
                "Thanks for the {rating}-star rating! Share your experience: {google_url}",
              lowRatingSms:
                "Thanks for your feedback. Help us improve: {feedback_url}",
            },
    };
    setSelectedAutomation(newAutomation);
    setIsEditing(true);
  };

  const PreviewDialog = () => {
    if (!selectedAutomation) return null;

    const getPreviewContent = () => {
      const type = selectedAutomation.type;
      const templates = selectedAutomation.templates;

      let template = "";
      switch (previewTab) {
        case "initial":
          template =
            type === "email"
              ? templates.initialEmail || ""
              : templates.initialSms || "";
          break;
        case "high":
          template =
            type === "email"
              ? templates.highRatingEmail || ""
              : templates.highRatingSms || "";
          break;
        case "low":
          template =
            type === "email"
              ? templates.lowRatingEmail || ""
              : templates.lowRatingSms || "";
          break;
      }

      return template
        .replace("{name}", "John Smith")
        .replace("{business}", "Acme Inc")
        .replace("{rating}", "5")
        .replace("{rating_url}", "[Rating Link]")
        .replace("{google_url}", "[Google Review Link]")
        .replace("{feedback_url}", "[Feedback Form Link]")
        .replace("{incentive}", "10% off your next visit");
    };

    return (
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAutomation.type === "email" ? (
                <MailIcon className="w-5 h-5" />
              ) : (
                <MessageSquareIcon className="w-5 h-5" />
              )}
              Preview Template
            </DialogTitle>
          </DialogHeader>

          <Tabs value={previewTab} onValueChange={setPreviewTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="initial">Initial Request</TabsTrigger>
              <TabsTrigger value="high">5-Star Follow-up</TabsTrigger>
              <TabsTrigger value="low">1-4 Star Follow-up</TabsTrigger>
            </TabsList>

            <div className="mt-4">
              {selectedAutomation.type === "email" ? (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <div className="border-b pb-4 mb-4">
                    <p className="text-sm text-muted-foreground">
                      From: Acme Inc &lt;feedback@acmeinc.com&gt;
                    </p>
                    <p className="text-sm text-muted-foreground">
                      To: John Smith &lt;john@example.com&gt;
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="whitespace-pre-wrap">{getPreviewContent()}</p>
                    {previewTab === "initial" && (
                      <div className="flex justify-center gap-4 pt-4 border-t">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            variant="outline"
                            className="flex-col gap-2"
                          >
                            <StarIcon className="w-8 h-8 text-yellow-400" />
                            <span>{rating}</span>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-gray-100 rounded-lg">
                  <div className="space-y-4">
                    <div className="bg-primary text-white p-3 rounded-lg max-w-[80%]">
                      {getPreviewContent()}
                    </div>
                    {previewTab === "initial" && (
                      <div className="bg-gray-300 p-3 rounded-lg max-w-[80%] ml-auto">
                        5
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className={cn("h-full bg-background p-6 space-y-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-green-600">
            Automations
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure your feedback collection workflows
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <MailIcon className="w-4 h-4" />
              Email Templates
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center gap-2">
              <MessageSquareIcon className="w-4 h-4" />
              SMS Templates
            </TabsTrigger>
          </TabsList>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => handleCreate(activeTab as "email" | "sms")}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Create New {activeTab === "email" ? "Email" : "SMS"} Template
          </Button>
        </div>

        <TabsContent value="email" className="space-y-4">
          {emailAutomations.map((automation) => (
            <Card key={automation.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MailIcon className="w-5 h-5 text-primary" />
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
                        {automation.trigger}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAutomation(automation);
                      setPreviewOpen(true);
                    }}
                  >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAutomation(automation);
                      setIsEditing(true);
                    }}
                  >
                    <Settings2Icon className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          {smsAutomations.map((automation) => (
            <Card key={automation.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MessageSquareIcon className="w-5 h-5 text-primary" />
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
                        {automation.trigger}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAutomation(automation);
                      setPreviewOpen(true);
                    }}
                  >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAutomation(automation);
                      setIsEditing(true);
                    }}
                  >
                    <Settings2Icon className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <PreviewDialog />
    </div>
  );
};

export default AutomationsPanel;
