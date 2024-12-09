import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/lib/contexts/settings-context";
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
import { ImageIcon, SendIcon, PlusIcon, XIcon } from "lucide-react";

interface FeedbackFormEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: any) => void;
  formData: {
    title: string;
    description: string;
    categories: string[];
    logo?: string;
    showCategories?: boolean;
    showComments?: boolean;
  };
}

const FeedbackFormEditor = ({
  isOpen,
  onClose,
  onSave,
  formData,
}: FeedbackFormEditorProps) => {
  const { settings, updateBusinessSettings } = useSettings();
  const [localFormData, setLocalFormData] = React.useState({
    ...formData,
    showCategories: formData.showCategories ?? true,
    showComments: formData.showComments ?? true,
  });
  const [newCategory, setNewCategory] = React.useState("");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBusinessSettings({
          logo: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setLocalFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (index: number) => {
    setLocalFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1000px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>Edit Feedback Form</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 overflow-y-auto pr-2">
          {/* Editor Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Logo Upload */}
              <div className="space-y-2">
                <Label>Form Logo</Label>
                <Card className="p-4 border-dashed">
                  <div className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload your logo to brand your feedback form. Recommended
                      size: 200x60px
                    </p>
                  </div>
                </Card>
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Categories Section</Label>
                  <Switch
                    checked={localFormData.showCategories}
                    onCheckedChange={(checked) =>
                      setLocalFormData((prev) => ({
                        ...prev,
                        showCategories: checked,
                      }))
                    }
                  />
                </div>
                {localFormData.showCategories && (
                  <div className="space-y-2">
                    {localFormData.categories.map((category, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input value={category} disabled />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveCategory(index)}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Add new category"
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleAddCategory()
                        }
                      />
                      <Button onClick={handleAddCategory}>
                        <PlusIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Comments Section</Label>
                  <Switch
                    checked={localFormData.showComments}
                    onCheckedChange={(checked) =>
                      setLocalFormData((prev) => ({
                        ...prev,
                        showComments: checked,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="border-l pl-6">
            <h3 className="text-sm font-medium mb-4">Live Preview</h3>
            <Card className="p-6 bg-background">
              <div className="space-y-6">
                {settings.business.logo ? (
                  <div className="flex justify-center">
                    <img
                      src={settings.business.logo}
                      alt="Business logo"
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

                <div className="space-y-4">
                  {localFormData.showCategories && (
                    <div className="space-y-2">
                      <Label>What was the main issue? 🤔</Label>
                      <Select disabled>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {localFormData.categories.map((category) => (
                            <SelectItem
                              key={category}
                              value={category.toLowerCase().replace(/ /g, "_")}
                            >
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {localFormData.showComments && (
                    <div className="space-y-2">
                      <Label>Additional Comments 📝</Label>
                      <Textarea
                        placeholder="Tell us more about your experience..."
                        className="min-h-[100px] resize-none"
                        disabled
                      />
                    </div>
                  )}

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
          <Button onClick={() => onSave(localFormData)}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackFormEditor;
