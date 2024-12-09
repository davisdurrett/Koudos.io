import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
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
  PlusIcon,
  StarIcon,
  PencilIcon,
} from "lucide-react";

const TemplatesPage = () => {
  const navigate = useNavigate();
  const { settings, updateTemplates } = useSettings();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = React.useState(
    settings.templates[0],
  );

  const handleCreateTemplate = () => {
    const newTemplate = {
      id: Date.now().toString(),
      name: "New Template",
      type: "email",
      status: "inactive",
      steps: [
        {
          id: "1",
          type: "message",
          config: {
            subject: "We'd Love Your Feedback!",
            content:
              "Hi {name},\n\nThank you for choosing {business}! We'd love to hear about your experience.",
          },
        },
        {
          id: "2",
          type: "condition",
          config: {
            ratingThreshold: 4,
            incentive: {
              type: "discount",
              value: "10% off next visit",
              expiryDays: 30,
            },
            internalAlert: {
              enabled: true,
              recipients: "",
              priority: "high",
            },
          },
        },
      ],
    };

    updateTemplates([...settings.templates, newTemplate]);
    navigate(`/templates/${newTemplate.id}/edit`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Templates</h2>
          <p className="text-sm text-muted-foreground">
            Manage your feedback collection templates
          </p>
        </div>
        <Button onClick={handleCreateTemplate}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="grid gap-4">
        {settings.templates.map((template) => (
          <Card key={template.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {template.type === "email" ? (
                    <MailIcon className="w-5 h-5 text-primary" />
                  ) : (
                    <MessageSquareIcon className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{template.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={
                        template.status === "active" ? "default" : "secondary"
                      }
                    >
                      {template.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {template.type === "email" ? "Email" : "SMS"} Template
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/templates/${template.id}/edit`)}
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
