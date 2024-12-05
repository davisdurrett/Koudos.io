import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon, SaveIcon } from "lucide-react";
import TemplateEditor from "@/components/dashboard/TemplateEditor";

const EditAutomation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("initial");

  return (
    <div className="h-full bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/automations")}
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h2 className="text-2xl font-semibold tracking-tight">
              Edit Automation
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Configure your feedback collection workflow
          </p>
        </div>
        <Button onClick={() => navigate("/automations")}>
          <SaveIcon className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-8">
          {/* Basic Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Automation Name</Label>
                <Input placeholder="Enter automation name" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center gap-2">
                  <Switch />
                  <span className="text-sm">Active</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Templates */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Message Templates</h3>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="initial">Initial Request</TabsTrigger>
                <TabsTrigger value="high">5-Star Follow-up</TabsTrigger>
                <TabsTrigger value="low">1-4 Star Follow-up</TabsTrigger>
              </TabsList>

              <TabsContent value="initial" className="mt-4">
                <TemplateEditor type="initial" channel="both" />
              </TabsContent>

              <TabsContent value="high" className="mt-4">
                <TemplateEditor type="high" channel="both" />
              </TabsContent>

              <TabsContent value="low" className="mt-4">
                <TemplateEditor type="low" channel="both" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EditAutomation;
