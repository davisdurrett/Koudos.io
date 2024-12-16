import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/lib/contexts/settings-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ImageIcon, SendIcon, UploadIcon } from "lucide-react";
import FeedbackFormBuilder from "./FeedbackFormBuilder";

interface FormField {
  id: string;
  type: "category" | "comment";
  label: string;
  required: boolean;
  options?: string[];
}

interface FeedbackFormEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: any) => void;
  formData: {
    title: string;
    description: string;
    fields?: FormField[];
    logo?: string;
  };
}

const defaultFields: FormField[] = [
  {
    id: "category",
    type: "category",
    label: "What was the main issue?",
    required: true,
    options: ["Service Quality", "Wait Time", "Cleanliness", "Staff", "Other"],
  },
  {
    id: "comments",
    type: "comment",
    label: "Additional Comments",
    required: false,
  },
];

const FeedbackFormEditor = ({
  isOpen,
  onClose,
  onSave,
  formData,
}: FeedbackFormEditorProps) => {
  const { settings } = useSettings();
  const [localFormData, setLocalFormData] = React.useState({
    ...formData,
    fields: formData.fields || defaultFields,
    logo: formData.logo || "",
  });

  const handleSave = () => {
    onSave(localFormData);
    onClose();
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Logo file size must be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // Create an image element to check dimensions
        const img = new Image();
        img.onload = () => {
          if (img.width > 300 || img.height > 100) {
            alert("Logo dimensions should be 300x100px or smaller");
            return;
          }
          setLocalFormData((prev) => ({
            ...prev,
            logo: reader.result as string,
          }));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1000px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>Customize Feedback Form</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 overflow-y-auto pr-2">
          {/* Editor Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Basic Settings */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Form Logo</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        document.getElementById("logo-upload")?.click()
                      }
                    >
                      <UploadIcon className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    {localFormData.logo && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          setLocalFormData((prev) => ({ ...prev, logo: "" }))
                        }
                      >
                        Remove Logo
                      </Button>
                    )}
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recommended: 300x100px PNG or SVG with transparent
                    background. Max size: 2MB
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Form Title</Label>
                  <Input
                    value={localFormData.title}
                    onChange={(e) =>
                      setLocalFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter form title"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Form Description</Label>
                  <Textarea
                    value={localFormData.description}
                    onChange={(e) =>
                      setLocalFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter form description"
                  />
                </div>
              </div>

              {/* Form Builder */}
              <div className="space-y-4">
                <Label>Form Fields</Label>
                <FeedbackFormBuilder
                  fields={localFormData.fields}
                  onChange={(fields) =>
                    setLocalFormData((prev) => ({ ...prev, fields }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="border-l pl-6">
            <h3 className="text-sm font-medium mb-4">Live Preview</h3>
            <Card className="p-6 bg-background">
              <div className="space-y-6">
                {localFormData.logo ? (
                  <div className="flex justify-center">
                    <img
                      src={localFormData.logo}
                      alt="Form logo"
                      className="h-12 object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium">{localFormData.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {localFormData.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {localFormData.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label>
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </Label>
                      {field.type === "category" && (
                        <select
                          disabled
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select an option</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                      {field.type === "comment" && (
                        <Textarea
                          disabled
                          placeholder="Enter your feedback here..."
                          className="min-h-[100px]"
                        />
                      )}
                    </div>
                  ))}

                  <Button className="w-full" disabled>
                    <SendIcon className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackFormEditor;
