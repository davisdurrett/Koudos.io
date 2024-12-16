import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusIcon, XIcon } from "lucide-react";

interface FormField {
  id: string;
  type: "category" | "comment";
  label: string;
  required: boolean;
  options?: string[];
}

interface FeedbackFormBuilderProps {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
}

const FeedbackFormBuilder = ({
  fields,
  onChange,
}: FeedbackFormBuilderProps) => {
  const addOption = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field && field.options) {
      updateField(fieldId, {
        options: [...field.options, `Option ${field.options.length + 1}`],
      });
    }
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    onChange(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    );
  };

  const updateOption = (fieldId: string, index: number, value: string) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field && field.options) {
      const newOptions = [...field.options];
      newOptions[index] = value;
      updateField(fieldId, { options: newOptions });
    }
  };

  const removeOption = (fieldId: string, index: number) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field && field.options) {
      updateField(fieldId, {
        options: field.options.filter((_, i) => i !== index),
      });
    }
  };

  const hasCategories = fields.some((f) => f.type === "category");
  const hasComments = fields.some((f) => f.type === "comment");

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Categories</Label>
            <Switch
              checked={hasCategories}
              onCheckedChange={(checked) => {
                if (checked) {
                  onChange([
                    ...fields,
                    {
                      id: Math.random().toString(36).substr(2, 9),
                      type: "category",
                      label: "What was the main issue?",
                      required: true,
                      options: ["Service", "Wait Time", "Cleanliness", "Other"],
                    },
                  ]);
                } else {
                  onChange(fields.filter((f) => f.type !== "category"));
                }
              }}
            />
          </div>

          {hasCategories &&
            fields
              .filter((field) => field.type === "category")
              .map((field) => (
                <div key={field.id} className="space-y-4">
                  <Input
                    value={field.label}
                    onChange={(e) =>
                      updateField(field.id, { label: e.target.value })
                    }
                    placeholder="Category question"
                  />
                  <div className="space-y-2">
                    {field.options?.map((option, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={(e) =>
                            updateOption(field.id, i, e.target.value)
                          }
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(field.id, i)}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addOption(field.id)}
                    >
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                </div>
              ))}
        </div>
      </Card>

      {/* Comments */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Comments</Label>
            <Switch
              checked={hasComments}
              onCheckedChange={(checked) => {
                if (checked) {
                  onChange([
                    ...fields,
                    {
                      id: Math.random().toString(36).substr(2, 9),
                      type: "comment",
                      label: "Additional Comments",
                      required: false,
                    },
                  ]);
                } else {
                  onChange(fields.filter((f) => f.type !== "comment"));
                }
              }}
            />
          </div>

          {hasComments &&
            fields
              .filter((field) => field.type === "comment")
              .map((field) => (
                <div key={field.id} className="space-y-2">
                  <Input
                    value={field.label}
                    onChange={(e) =>
                      updateField(field.id, { label: e.target.value })
                    }
                    placeholder="Comment field label"
                  />
                </div>
              ))}
        </div>
      </Card>
    </div>
  );
};

export default FeedbackFormBuilder;
