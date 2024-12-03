import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUpIcon, ThumbsDownIcon, WandIcon, SendIcon } from "lucide-react";

interface AIResponseEditorProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (response: string) => void;
  reviewText?: string;
  suggestions?: Array<{
    text: string;
    tone: string;
    confidence: number;
  }>;
}

const AIResponseEditor = ({
  isOpen = true,
  onClose = () => {},
  onSubmit = () => {},
  reviewText = "Great service and friendly staff! The food was delicious and arrived quickly.",
  suggestions = [
    {
      text: "Thank you for your wonderful feedback! We're delighted to hear that you enjoyed both our service and food. Our team takes great pride in delivering quick, friendly service and delicious meals. We appreciate you taking the time to share your experience!",
      tone: "Professional",
      confidence: 0.95,
    },
    {
      text: "We're so happy you had a great time with us! 😊 Your kind words about our staff and food mean the world to us. Quick service is always our goal, and we're glad we hit the mark! Hope to see you again soon!",
      tone: "Casual",
      confidence: 0.88,
    },
  ],
}: AIResponseEditorProps) => {
  const [selectedResponse, setSelectedResponse] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("suggestions");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] bg-background">
        <DialogHeader>
          <DialogTitle>AI Response Editor</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Original Review */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-sm font-medium mb-2">Original Review</h3>
            <p className="text-sm text-muted-foreground">{reviewText}</p>
          </div>

          {/* Response Editor Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suggestions">
                <WandIcon className="w-4 h-4 mr-2" />
                AI Suggestions
              </TabsTrigger>
              <TabsTrigger value="custom">
                <SendIcon className="w-4 h-4 mr-2" />
                Custom Response
              </TabsTrigger>
            </TabsList>

            <TabsContent value="suggestions" className="space-y-4 mt-4">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-4 border rounded-lg space-y-2 cursor-pointer transition-colors",
                    selectedResponse === suggestion.text
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50",
                  )}
                  onClick={() => setSelectedResponse(suggestion.text)}
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{suggestion.tone}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(suggestion.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm">{suggestion.text}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <ThumbsUpIcon className="w-4 h-4 mr-1" /> Helpful
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <ThumbsDownIcon className="w-4 h-4 mr-1" /> Not Helpful
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="custom" className="space-y-4 mt-4">
              <Textarea
                placeholder="Write your custom response..."
                value={selectedResponse}
                onChange={(e) => setSelectedResponse(e.target.value)}
                className="min-h-[200px]"
              />
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => onSubmit(selectedResponse)}
            disabled={!selectedResponse}
          >
            <SendIcon className="w-4 h-4 mr-2" />
            Send Response
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIResponseEditor;
