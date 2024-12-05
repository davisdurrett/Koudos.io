import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  TrashIcon,
  MailIcon,
  MessageSquareIcon,
  ClockIcon,
} from "lucide-react";

export interface TriggerRule {
  id: string;
  name: string;
  type: "appointment" | "follow_up" | "custom";
  status: "active" | "inactive";
  delay: number;
  channel: "email" | "sms" | "both";
  conditions?: {
    appointmentType?: string[];
    customerType?: string[];
  };
}

interface TriggerCardProps {
  trigger: TriggerRule;
  onUpdate: (id: string, updates: Partial<TriggerRule>) => void;
  onDelete: (id: string) => void;
}

const TriggerCard = ({ trigger, onUpdate, onDelete }: TriggerCardProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ZapIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Input
                value={trigger.name}
                onChange={(e) => onUpdate(trigger.id, { name: e.target.value })}
                className="text-lg font-medium bg-transparent border-none p-0 focus-visible:ring-0"
              />
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={
                    trigger.status === "active" ? "default" : "secondary"
                  }
                >
                  {trigger.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={trigger.status === "active"}
              onCheckedChange={(checked) =>
                onUpdate(trigger.id, {
                  status: checked ? "active" : "inactive",
                })
              }
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(trigger.id)}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-2 gap-6">
          {/* Basic Settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Trigger Type</Label>
              <Select
                value={trigger.type}
                onValueChange={(value: TriggerRule["type"]) =>
                  onUpdate(trigger.id, { type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appointment">After Appointment</SelectItem>
                  <SelectItem value="follow_up">Follow-up</SelectItem>
                  <SelectItem value="custom">Custom Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Delay</Label>
              <Select
                value={trigger.delay.toString()}
                onValueChange={(value) =>
                  onUpdate(trigger.id, { delay: parseInt(value) })
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

            <div className="space-y-2">
              <Label>Delivery Method</Label>
              <Select
                value={trigger.channel}
                onValueChange={(value: TriggerRule["channel"]) =>
                  onUpdate(trigger.id, { channel: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Only</SelectItem>
                  <SelectItem value="sms">SMS Only</SelectItem>
                  <SelectItem value="both">Email & SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conditions */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Appointment Types</Label>
              <Select
                value={trigger.conditions?.appointmentType?.[0] || "all"}
                onValueChange={(value) =>
                  onUpdate(trigger.id, {
                    conditions: {
                      ...trigger.conditions,
                      appointmentType: [value],
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Customer Types</Label>
              <Select
                value={trigger.conditions?.customerType?.[0] || "all"}
                onValueChange={(value) =>
                  onUpdate(trigger.id, {
                    conditions: {
                      ...trigger.conditions,
                      customerType: [value],
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="new">New Customers</SelectItem>
                  <SelectItem value="returning">Returning Customers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex items-center gap-4 mt-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              {trigger.delay === 0
                ? "Immediately"
                : `${trigger.delay}h after ${trigger.type.replace("_", " ")}`}
            </span>
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="flex items-center gap-2">
            {trigger.channel === "email" ? (
              <MailIcon className="w-4 h-4 text-muted-foreground" />
            ) : trigger.channel === "sms" ? (
              <MessageSquareIcon className="w-4 h-4 text-muted-foreground" />
            ) : (
              <>
                <MailIcon className="w-4 h-4 text-muted-foreground" />
                <MessageSquareIcon className="w-4 h-4 text-muted-foreground" />
              </>
            )}
            <span className="text-sm">
              Send{" "}
              {trigger.channel === "both" ? "Email & SMS" : trigger.channel}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TriggerCard;
