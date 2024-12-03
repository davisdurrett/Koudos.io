import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  PaletteIcon,
  EyeIcon,
  LayoutIcon,
  TypeIcon,
  SmileIcon,
  MehIcon,
  FrownIcon,
} from "lucide-react";

interface EmailTemplateEditorProps {
  defaultTemplate?: EmailTemplate;
  onSave?: (template: EmailTemplate) => void;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  style: {
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    fontFamily: string;
    fontSize: string;
    buttonStyle: "rounded" | "square" | "pill";
    headerImage?: string;
    logo?: string;
    showSocialLinks: boolean;
  };
}

const EmailTemplateEditor = ({
  defaultTemplate = {
    id: "1",
    name: "Default Template",
    subject: "How was your appointment?",
    content:
      "Dear {name},\n\nThank you for visiting {business}. We'd love to hear about your experience!\n\nPlease click one of the buttons below to share your feedback.\n\nBest regards,\n{business_name}",
    style: {
      backgroundColor: "#ffffff",
      textColor: "#333333",
      accentColor: "#FF6B2B",
      fontFamily: "Arial",
      fontSize: "16px",
      buttonStyle: "rounded",
      showSocialLinks: false,
    },
  },
  onSave = () => {},
}: EmailTemplateEditorProps) => {
  const [template, setTemplate] = React.useState(defaultTemplate);
  const [activeTab, setActiveTab] = React.useState("content");
  const [previewMode, setPreviewMode] = React.useState(false);

  const updateTemplate = (updates: Partial<EmailTemplate>) => {
    setTemplate((prev) => ({ ...prev, ...updates }));
  };

  const updateStyle = (updates: Partial<EmailTemplate["style"]>) => {
    setTemplate((prev) => ({
      ...prev,
      style: { ...prev.style, ...updates },
    }));
  };

  const renderPreview = () => {
    const { style } = template;
    const previewContent = template.content
      .replace("{name}", "John Smith")
      .replace("{business}", "Acme Inc")
      .replace("{business_name}", "The Acme Team");

    return (
      <div className="w-full max-w-2xl mx-auto">
        <div
          style={{
            backgroundColor: style.backgroundColor,
            color: style.textColor,
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            padding: "2rem",
            borderRadius: "0.5rem",
          }}
          className="shadow-lg"
        >
          {style.headerImage && (
            <img
              src={style.headerImage}
              alt="Header"
              className="w-full h-48 object-cover rounded-t-lg mb-6"
            />
          )}

          {style.logo && (
            <img src={style.logo} alt="Logo" className="h-12 mb-6" />
          )}

          <h1
            style={{ color: style.accentColor }}
            className="text-2xl font-bold mb-4"
          >
            {template.subject}
          </h1>

          <div className="whitespace-pre-wrap mb-6">{previewContent}</div>

          <div className="flex justify-center gap-8">
            <Button
              variant="ghost"
              className="flex-col gap-2 hover:bg-green-50 transition-colors"
            >
              <SmileIcon className="w-12 h-12 text-green-500" />
              <span className="text-sm font-medium">Great!</span>
            </Button>

            <Button
              variant="ghost"
              className="flex-col gap-2 hover:bg-yellow-50 transition-colors"
            >
              <MehIcon className="w-12 h-12 text-yellow-500" />
              <span className="text-sm font-medium">Okay</span>
            </Button>

            <Button
              variant="ghost"
              className="flex-col gap-2 hover:bg-red-50 transition-colors"
            >
              <FrownIcon className="w-12 h-12 text-red-500" />
              <span className="text-sm font-medium">Not Good</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex gap-6">
      {/* Editor */}
      <div className={cn("flex-1 space-y-6", previewMode && "hidden md:block")}>
        <div className="flex items-center justify-between">
          <Input
            value={template.name}
            onChange={(e) => updateTemplate({ name: e.target.value })}
            className="text-lg font-semibold w-auto"
          />
          <Button onClick={() => setPreviewMode(!previewMode)}>
            <EyeIcon className="w-4 h-4 mr-2" />
            {previewMode ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="content">
              <TypeIcon className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="style">
              <PaletteIcon className="w-4 h-4 mr-2" />
              Style
            </TabsTrigger>
            <TabsTrigger value="layout">
              <LayoutIcon className="w-4 h-4 mr-2" />
              Layout
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="space-y-2">
              <Label>Subject Line</Label>
              <Input
                value={template.subject}
                onChange={(e) => updateTemplate({ subject: e.target.value })}
                placeholder="Enter email subject"
              />
            </div>

            <div className="space-y-2">
              <Label>Email Content</Label>
              <Textarea
                value={template.content}
                onChange={(e) => updateTemplate({ content: e.target.value })}
                placeholder="Enter email content"
                className="min-h-[200px]"
              />
              <p className="text-sm text-muted-foreground">
                Available variables: {"{name}"}, {"{business}"},{" "}
                {"{business_name}"}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Background Color</Label>
                <Input
                  type="color"
                  value={template.style.backgroundColor}
                  onChange={(e) =>
                    updateStyle({ backgroundColor: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Text Color</Label>
                <Input
                  type="color"
                  value={template.style.textColor}
                  onChange={(e) => updateStyle({ textColor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <Input
                  type="color"
                  value={template.style.accentColor}
                  onChange={(e) => updateStyle({ accentColor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Font Family</Label>
                <Select
                  value={template.style.fontFamily}
                  onValueChange={(value) => updateStyle({ fontFamily: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                    <SelectItem value="Times New Roman">
                      Times New Roman
                    </SelectItem>
                    <SelectItem value="Georgia">Georgia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
            <div className="space-y-2">
              <Label>Header Image URL</Label>
              <Input
                value={template.style.headerImage || ""}
                onChange={(e) => updateStyle({ headerImage: e.target.value })}
                placeholder="https://example.com/header.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label>Logo URL</Label>
              <Input
                value={template.style.logo || ""}
                onChange={(e) => updateStyle({ logo: e.target.value })}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={() => onSave(template)}>Save Template</Button>
        </div>
      </div>

      {/* Preview */}
      <div
        className={cn(
          "w-full md:w-1/2 bg-muted/50 p-6 rounded-lg overflow-auto",
          !previewMode && "hidden md:block",
        )}
      >
        <div className="sticky top-0 bg-muted/50 pb-4 mb-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <p className="text-sm text-muted-foreground">
            See how your email will look
          </p>
        </div>
        {renderPreview()}
      </div>
    </div>
  );
};

export default EmailTemplateEditor;
