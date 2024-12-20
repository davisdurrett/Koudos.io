import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, SearchIcon, ZapIcon, BoltIcon } from "lucide-react";
import TriggerCard, { TriggerRule } from "@/components/dashboard/TriggerCard";
import AutomationsPanel from "@/components/dashboard/AutomationsPanel";

const Workflows = () => {
  const [activeTab, setActiveTab] = React.useState("automations");

  return (
    <div className="h-full bg-background p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Workflows</h2>
          <p className="text-sm text-muted-foreground">
            Manage your feedback collection automations and triggers
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="automations">
            <ZapIcon className="w-4 h-4 mr-2" />
            Feedback Flows
          </TabsTrigger>
          <TabsTrigger value="triggers">
            <BoltIcon className="w-4 h-4 mr-2" />
            Collection Triggers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="automations" className="mt-6">
          <AutomationsPanel />
        </TabsContent>

        <TabsContent value="triggers" className="mt-6">
          <TriggerPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Extracted TriggerPanel component
const TriggerPanel = () => {
  const [triggers, setTriggers] = React.useState<TriggerRule[]>([
    {
      id: "1",
      name: "Post-Appointment Feedback",
      type: "appointment",
      status: "active",
      delay: 24,
      channel: "both",
      conditions: {
        appointmentType: ["all"],
        customerType: ["all"],
      },
    },
    {
      id: "2",
      name: "Follow-up Request",
      type: "follow_up",
      status: "active",
      delay: 48,
      channel: "email",
      conditions: {
        appointmentType: ["service"],
        customerType: ["all"],
      },
    },
  ]);

  const [search, setSearch] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<
    "all" | "active" | "inactive"
  >("all");

  const handleAddTrigger = () => {
    const newTrigger: TriggerRule = {
      id: Date.now().toString(),
      name: "New Trigger",
      type: "appointment",
      status: "inactive",
      delay: 24,
      channel: "email",
      conditions: {
        appointmentType: ["all"],
        customerType: ["all"],
      },
    };
    setTriggers([...triggers, newTrigger]);
  };

  const handleUpdateTrigger = (id: string, updates: Partial<TriggerRule>) => {
    setTriggers(triggers.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const handleDeleteTrigger = (id: string) => {
    setTriggers(triggers.filter((t) => t.id !== id));
  };

  const filteredTriggers = triggers
    .filter((trigger) => {
      if (filterStatus !== "all") {
        return trigger.status === filterStatus;
      }
      return true;
    })
    .filter((trigger) =>
      trigger.name.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search triggers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-4">
          <Tabs
            value={filterStatus}
            onValueChange={(v) => setFilterStatus(v as typeof filterStatus)}
          >
            <TabsList>
              <TabsTrigger value="all">
                All
                <Badge variant="secondary" className="ml-2">
                  {triggers.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="active">
                Active
                <Badge variant="secondary" className="ml-2">
                  {triggers.filter((t) => t.status === "active").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Inactive
                <Badge variant="secondary" className="ml-2">
                  {triggers.filter((t) => t.status === "inactive").length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={handleAddTrigger}>
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Trigger
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-380px)]">
        <div className="space-y-4">
          {filteredTriggers.map((trigger) => (
            <TriggerCard
              key={trigger.id}
              trigger={trigger}
              onUpdate={handleUpdateTrigger}
              onDelete={handleDeleteTrigger}
            />
          ))}

          {filteredTriggers.length === 0 && (
            <Card className="p-8 flex flex-col items-center justify-center text-center">
              <p className="text-muted-foreground mb-4">
                No triggers found. Create your first trigger to start collecting
                feedback automatically.
              </p>
              <Button onClick={handleAddTrigger}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Trigger
              </Button>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Workflows;
