import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  CalendarIcon,
  Settings2Icon,
  ArrowRightIcon,
} from "lucide-react";

interface Automation {
  id: string;
  name: string;
  type: "email" | "sms";
  status: "active" | "paused";
  trigger: string;
  lastEdited: string;
  metrics: {
    sent: number;
    openRate: number;
    clickRate: number;
    conversionRate: number;
  };
  steps: Array<{
    id: string;
    type: "email" | "sms" | "wait" | "condition";
    content?: string;
    delay?: number;
    condition?: string;
  }>;
}

const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "Email First",
    type: "email",
    status: "active",
    trigger: "After Appointment",
    lastEdited: "2024-03-15",
    metrics: {
      sent: 1284,
      openRate: 68,
      clickRate: 42,
      conversionRate: 35,
    },
    steps: [
      { id: "1", type: "wait", delay: 24 },
      { id: "2", type: "email", content: "Initial review request" },
      { id: "3", type: "condition", condition: "If no response" },
      { id: "4", type: "wait", delay: 48 },
      { id: "5", type: "sms", content: "Follow-up message" },
    ],
  },
  {
    id: "2",
    name: "SMS First",
    type: "sms",
    status: "active",
    trigger: "After Appointment",
    lastEdited: "2024-03-14",
    metrics: {
      sent: 856,
      openRate: 92,
      clickRate: 38,
      conversionRate: 32,
    },
    steps: [
      { id: "1", type: "wait", delay: 2 },
      { id: "2", type: "sms", content: "Rating request" },
      { id: "3", type: "condition", condition: "If no response" },
      { id: "4", type: "wait", delay: 48 },
      { id: "5", type: "email", content: "Follow-up email" },
    ],
  },
];

const AutomationsPanel = ({ className = "" }: { className?: string }) => {
  const [filter, setFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");

  const AutomationCard = ({ automation }: { automation: Automation }) => (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "p-2 rounded-full",
                automation.type === "email"
                  ? "bg-blue-100 text-blue-500"
                  : "bg-purple-100 text-purple-500",
              )}
            >
              {automation.type === "email" ? (
                <MailIcon className="w-5 h-5" />
              ) : (
                <MessageSquareIcon className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{automation.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="w-4 h-4" />
                <span>
                  Last edited{" "}
                  {new Date(automation.lastEdited).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={automation.status === "active" ? "default" : "secondary"}
              className="capitalize"
            >
              {automation.status}
            </Badge>
            <Button variant="ghost" size="icon">
              {automation.status === "active" ? (
                <PauseIcon className="w-4 h-4" />
              ) : (
                <PlayIcon className="w-4 h-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Settings2Icon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Workflow */}
        <div className="flex items-center gap-2 py-4 px-2 bg-muted/50 rounded-lg overflow-x-auto">
          {automation.steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "flex-shrink-0 p-2 rounded border bg-background",
                  "hover:border-primary cursor-pointer transition-colors",
                )}
              >
                {step.type === "email" && <MailIcon className="w-4 h-4" />}
                {step.type === "sms" && (
                  <MessageSquareIcon className="w-4 h-4" />
                )}
                {step.type === "wait" && <ClockIcon className="w-4 h-4" />}
                {step.type === "condition" && (
                  <Settings2Icon className="w-4 h-4" />
                )}
                <span className="text-xs mt-1">
                  {step.type === "wait"
                    ? `Wait ${step.delay}h`
                    : step.type === "condition"
                      ? step.condition
                      : `Send ${step.type}`}
                </span>
              </div>
              {index < automation.steps.length - 1 && (
                <ArrowRightIcon className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4 pt-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Sent</p>
            <p className="text-lg font-medium">{automation.metrics.sent}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Open Rate</p>
            <p className="text-lg font-medium">
              {automation.metrics.openRate}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Click Rate</p>
            <p className="text-lg font-medium">
              {automation.metrics.clickRate}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Conversion</p>
            <p className="text-lg font-medium">
              {automation.metrics.conversionRate}%
            </p>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className={cn("h-full bg-background p-6 space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Automations</h2>
          <p className="text-sm text-muted-foreground">
            Manage your feedback collection workflows
          </p>
        </div>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Create New Automation
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search automations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-[300px]"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Automations</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="email">Email Only</SelectItem>
              <SelectItem value="sms">SMS Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Automations List */}
      <div className="grid grid-cols-2 gap-6">
        {mockAutomations.map((automation) => (
          <AutomationCard key={automation.id} automation={automation} />
        ))}
      </div>
    </div>
  );
};

export default AutomationsPanel;
