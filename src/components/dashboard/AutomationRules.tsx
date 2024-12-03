import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ZapIcon,
  PlusIcon,
  ClockIcon,
  StarIcon,
  MessageSquareIcon,
  BellIcon,
  SendIcon,
  TrashIcon,
  AlertCircleIcon,
} from "lucide-react";
import FeedbackManager from "./FeedbackManager";

interface AutomationRulesProps {
  className?: string;
}

const AutomationRules = ({ className = "" }: AutomationRulesProps) => {
  const [workflows, setWorkflows] = React.useState([
    {
      id: "1",
      name: "Low Rating Alert",
      trigger: "rating_below_3",
      actions: ["notify_team", "create_escalation"],
      enabled: true,
    },
    {
      id: "2",
      name: "5-Star Review Follow-up",
      trigger: "rating_5_stars",
      actions: ["send_incentive", "request_google_review"],
      enabled: true,
    },
  ]);

  const [autoResponses, setAutoResponses] = React.useState([
    {
      id: "1",
      name: "5-Star Response",
      condition: "rating_equals_5",
      template:
        "Thank you for your wonderful {rating}-star review, {name}! We're delighted to hear about your experience at {business}.",
      enabled: true,
    },
    {
      id: "2",
      name: "Critical Response",
      condition: "rating_below_3",
      template:
        "We apologize for your experience, {name}. Our team will reach out to you directly to address your concerns.",
      enabled: true,
    },
  ]);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="feedback" className="space-y-6">
        <TabsList>
          <TabsTrigger value="feedback">Feedback Collection</TabsTrigger>
          <TabsTrigger value="workflows">Review Workflows</TabsTrigger>
          <TabsTrigger value="responses">Auto Responses</TabsTrigger>
        </TabsList>

        {/* Feedback Collection Tab */}
        <TabsContent value="feedback">
          <FeedbackManager />
        </TabsContent>

        {/* Review Workflows Tab */}
        <TabsContent value="workflows">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Review Workflows</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure automated workflows for review management
                  </p>
                </div>
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Workflow
                </Button>
              </div>
              <Separator />

              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="p-4 border rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <ZapIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{workflow.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {workflow.trigger
                                .replace(/_/g, " ")
                                .toUpperCase()}
                            </Badge>
                            {workflow.actions.map((action) => (
                              <Badge
                                key={action}
                                variant="outline"
                                className="text-xs"
                              >
                                {action.replace(/_/g, " ").toUpperCase()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={workflow.enabled} />
                        <Button variant="ghost" size="icon">
                          <TrashIcon className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-4">
                    Available Triggers
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <StarIcon className="w-4 h-4 mb-2 text-yellow-500" />
                      <h5 className="font-medium">Rating Based</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Trigger on specific star ratings
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <MessageSquareIcon className="w-4 h-4 mb-2 text-blue-500" />
                      <h5 className="font-medium">Review Content</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Trigger on review text analysis
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <ClockIcon className="w-4 h-4 mb-2 text-green-500" />
                      <h5 className="font-medium">Time Based</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Trigger after specific time periods
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Auto Responses Tab */}
        <TabsContent value="responses">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Automated Responses</h3>
                  <p className="text-sm text-muted-foreground">
                    Set up rules for automated review responses
                  </p>
                </div>
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Response Rule
                </Button>
              </div>
              <Separator />

              <div className="space-y-4">
                {autoResponses.map((response) => (
                  <div
                    key={response.id}
                    className="p-4 border rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <SendIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{response.name}</h4>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {response.condition
                              .replace(/_/g, " ")
                              .toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={response.enabled} />
                        <Button variant="ghost" size="icon">
                          <TrashIcon className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm text-muted-foreground">
                        {response.template}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertCircleIcon className="w-4 h-4" />
                      <span>
                        Available variables: {"{name}"}, {"{rating}"},{" "}
                        {"{business}"}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-4">
                    Response Settings
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>AI Enhancement</Label>
                        <p className="text-sm text-muted-foreground">
                          Use AI to improve response quality and personalization
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Response Delay</Label>
                        <p className="text-sm text-muted-foreground">
                          Add random delay to appear more natural
                        </p>
                      </div>
                      <Select defaultValue="1-4">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select delay" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No delay</SelectItem>
                          <SelectItem value="1-4">1-4 hours</SelectItem>
                          <SelectItem value="4-8">4-8 hours</SelectItem>
                          <SelectItem value="8-24">8-24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutomationRules;
