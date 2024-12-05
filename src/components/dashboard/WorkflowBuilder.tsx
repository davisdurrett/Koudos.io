import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  PlusIcon,
  XIcon,
  PencilIcon,
} from "lucide-react";

interface WorkflowStep {
  id: string;
  type: "wait" | "message" | "rating" | "action" | "condition";
  config: {
    delay?: number;
    messageType?: "email" | "sms";
    content?: string;
    ratingThreshold?: number;
    action?: string;
  };
}

interface WorkflowPath {
  id: string;
  condition: string;
  steps: WorkflowStep[];
}

interface WorkflowBuilderProps {
  type: "email" | "sms";
  initialDelay: number;
  onUpdateDelay: (delay: number) => void;
  onUpdateStep?: (stepId: string, updates: Partial<WorkflowStep>) => void;
}

const WorkflowBuilder = ({
  type,
  initialDelay,
  onUpdateDelay,
  onUpdateStep,
}: WorkflowBuilderProps) => {
  const [selectedStep, setSelectedStep] = React.useState<WorkflowStep | null>(
    null,
  );
  const [isStepModalOpen, setIsStepModalOpen] = React.useState(false);

  const paths: WorkflowPath[] = [
    {
      id: "high",
      condition: "Rating ≥ 4",
      steps: [
        {
          id: "thank-you",
          type: "message",
          config: {
            messageType: type,
            content: "Thank you for your positive feedback!",
          },
        },
        {
          id: "redirect",
          type: "action",
          config: {
            action: "redirect_google",
          },
        },
      ],
    },
    {
      id: "low",
      condition: "Rating < 4",
      steps: [
        {
          id: "feedback",
          type: "message",
          config: {
            messageType: type,
            content: "We'd love to hear more about your experience.",
          },
        },
        {
          id: "form",
          type: "action",
          config: {
            action: "show_form",
          },
        },
      ],
    },
  ];

  const handleStepClick = (step: WorkflowStep) => {
    setSelectedStep(step);
    setIsStepModalOpen(true);
  };

  const StepIcon = ({ type }: { type: WorkflowStep["type"] }) => {
    switch (type) {
      case "wait":
        return <ClockIcon className="w-4 h-4" />;
      case "message":
        return type === "email" ? (
          <MailIcon className="w-4 h-4" />
        ) : (
          <MessageSquareIcon className="w-4 h-4" />
        );
      case "rating":
        return <StarIcon className="w-4 h-4" />;
      case "action":
        return <ExternalLinkIcon className="w-4 h-4" />;
      case "condition":
        return <FormInputIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Initial Flow */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Initial Request
        </h3>
        <div className="flex items-center gap-4">
          <Card className="p-4 hover:border-primary cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ClockIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium">Wait</p>
                <p className="text-xs text-muted-foreground">
                  {initialDelay}h delay
                </p>
              </div>
            </div>
          </Card>
          <ArrowRightIcon className="w-4 h-4 text-muted-foreground" />
          <Card className="p-4 hover:border-primary cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                {type === "email" ? (
                  <MailIcon className="w-4 h-4" />
                ) : (
                  <MessageSquareIcon className="w-4 h-4" />
                )}
              </div>
              <div>
                <p className="font-medium">Initial Message</p>
                <p className="text-xs text-muted-foreground">
                  Rate your experience
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Rating-based Paths */}
      <div className="grid grid-cols-2 gap-8">
        {paths.map((path) => (
          <div key={path.id} className="space-y-4">
            <Card className="p-4 bg-muted/50">
              <h3 className="font-medium">{path.condition}</h3>
            </Card>
            <div className="space-y-4 pl-4 border-l-2 border-dashed border-muted-foreground/20">
              {path.steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <Card
                    className="p-4 hover:border-primary cursor-pointer transition-colors"
                    onClick={() => handleStepClick(step)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <StepIcon type={step.type} />
                      </div>
                      <div>
                        <p className="font-medium capitalize">{step.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {step.config.content || step.config.action}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-auto">
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                  {index < path.steps.length - 1 && (
                    <div className="flex items-center justify-center py-2">
                      <ArrowRightIcon className="w-4 h-4 text-muted-foreground rotate-90" />
                    </div>
                  )}
                </React.Fragment>
              ))}
              <Button variant="outline" className="w-full">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Step
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Step Configuration Modal */}
      <Dialog open={isStepModalOpen} onOpenChange={setIsStepModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedStep && <StepIcon type={selectedStep.type} />}
              Configure{" "}
              {selectedStep?.type.charAt(0).toUpperCase() +
                selectedStep?.type.slice(1)}{" "}
              Step
            </DialogTitle>
          </DialogHeader>

          {selectedStep && (
            <div className="space-y-4">
              {selectedStep.type === "message" && (
                <div className="space-y-2">
                  <Label>Message Content</Label>
                  <Textarea
                    value={selectedStep.config.content}
                    onChange={(e) =>
                      onUpdateStep?.(selectedStep.id, {
                        ...selectedStep,
                        config: {
                          ...selectedStep.config,
                          content: e.target.value,
                        },
                      })
                    }
                    placeholder={`Enter ${type} content`}
                  />
                </div>
              )}

              {selectedStep.type === "action" && (
                <div className="space-y-2">
                  <Label>Action Type</Label>
                  <Select
                    value={selectedStep.config.action}
                    onValueChange={(value) =>
                      onUpdateStep?.(selectedStep.id, {
                        ...selectedStep,
                        config: { ...selectedStep.config, action: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="redirect_google">
                        Redirect to Google Review
                      </SelectItem>
                      <SelectItem value="show_form">
                        Show Feedback Form
                      </SelectItem>
                      <SelectItem value="send_coupon">Send Coupon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStepModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsStepModalOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkflowBuilder;
