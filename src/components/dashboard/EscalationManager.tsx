import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  UserIcon,
  MessageSquareIcon,
  SendIcon,
} from "lucide-react";
import {
  escalationService,
  type EscalationStatus,
  type EscalationPriority,
} from "@/lib/services/escalation";

interface EscalationManagerProps {
  className?: string;
}

const EscalationManager = ({ className = "" }: EscalationManagerProps) => {
  const [activeTab, setActiveTab] = React.useState("active");
  const [escalations, setEscalations] = React.useState<Array<any>>([]);
  const [stats, setStats] = React.useState<any>(null);

  React.useEffect(() => {
    loadEscalations();
    loadStats();
  }, [activeTab]);

  const loadEscalations = async () => {
    const filters: { status?: EscalationStatus } = {};
    if (activeTab === "active") {
      filters.status = "pending";
    } else if (activeTab === "resolved") {
      filters.status = "resolved";
    }
    const data = await escalationService.getEscalations(filters);
    setEscalations(data);
  };

  const loadStats = async () => {
    const data = await escalationService.getEscalationStats();
    setStats(data);
  };

  const getPriorityColor = (priority: EscalationPriority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: EscalationStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const isOverdue = date < now;
    const timeLeft = Math.abs(date.getTime() - now.getTime());
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));

    return (
      <span className={isOverdue ? "text-red-500" : "text-muted-foreground"}>
        {isOverdue ? `Overdue by ${hoursLeft}h` : `${hoursLeft}h remaining`}
      </span>
    );
  };

  return (
    <Card className={`p-6 bg-background ${className}`}>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Escalation Manager</h2>
            <p className="text-sm text-muted-foreground">
              Manage and resolve escalated reviews
            </p>
          </div>
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Active
                  </p>
                  <h3 className="text-2xl font-bold mt-2">
                    {stats.byStatus.pending || 0}
                  </h3>
                </div>
                <div className="p-2 bg-yellow-100 rounded-full">
                  <AlertCircleIcon className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Overdue
                  </p>
                  <h3 className="text-2xl font-bold mt-2">
                    {stats.overdueCount}
                  </h3>
                </div>
                <div className="p-2 bg-red-100 rounded-full">
                  <ClockIcon className="w-4 h-4 text-red-800" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Resolved
                  </p>
                  <h3 className="text-2xl font-bold mt-2">
                    {stats.byStatus.resolved || 0}
                  </h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircleIcon className="w-4 h-4 text-green-800" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg. Resolution Time
                  </p>
                  <h3 className="text-2xl font-bold mt-2">
                    {Math.round(stats.averageResolutionTime / (1000 * 60 * 60))}
                    h
                  </h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <UserIcon className="w-4 h-4 text-blue-800" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Escalation List */}
        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            {escalations.map((escalation) => (
              <Card key={escalation.id} className="p-4">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={getPriorityColor(escalation.priority)}
                      >
                        {escalation.priority}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(escalation.status)}
                      >
                        {escalation.status}
                      </Badge>
                      {escalation.deadline && (
                        <span className="text-sm">
                          {formatDeadline(escalation.deadline)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {escalation.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <UserIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {escalation.assignedTo}
                          </span>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm">
                          Assign to me
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MessageSquareIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {escalation.rating}-star review
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {escalation.reviewText}
                    </p>
                  </div>

                  {/* Actions */}
                  {escalation.status !== "resolved" && (
                    <div className="flex items-center gap-2">
                      <Select>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apology">
                            Apology Template
                          </SelectItem>
                          <SelectItem value="discount">
                            Offer Discount
                          </SelectItem>
                          <SelectItem value="improvement">
                            Service Improvement
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="flex-1">
                        <SendIcon className="w-4 h-4 mr-2" />
                        Send Response
                      </Button>
                    </div>
                  )}

                  {/* Resolution Details */}
                  {escalation.status === "resolved" && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">
                          Resolved on{" "}
                          {new Date(escalation.resolvedAt).toLocaleDateString()}
                        </span>
                      </div>
                      {escalation.resolutionTemplate && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">
                            {escalation.resolutionTemplate.content}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Tabs>
    </Card>
  );
};

export default EscalationManager;
