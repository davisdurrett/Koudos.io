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
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  WandIcon,
  SendIcon,
  StarIcon,
} from "lucide-react";

interface AIResponseEditorProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (response: string) => void;
  reviewText?: string;
  customerName?: string;
  rating?: number;
  initialResponse?: string;
}

const AIResponseEditor = ({
  isOpen = true,
  onClose = () => {},
  onSubmit = () => {},
  reviewText = "Great service and friendly staff! The food was delicious and arrived quickly.",
  customerName = "John",
  rating = 5,
  initialResponse = "",
}: AIResponseEditorProps) => {
  const [selectedResponse, setSelectedResponse] =
    React.useState(initialResponse);
  const [activeTab, setActiveTab] = React.useState(
    initialResponse ? "custom" : "suggestions",
  );

  // Get first name only
  const firstName = customerName.split(" ")[0];

  const suggestions = [
    {
      text:
        rating >= 4
          ? `Thank you for your wonderful ${rating}-star feedback, ${firstName}! We're delighted to hear that you enjoyed your experience with us. Our team takes great pride in delivering excellent service, and your kind words mean a lot to us. We appreciate you taking the time to share your thoughts!`
          : `Thank you for your feedback, ${firstName}. We sincerely apologize that your experience didn't meet your expectations. We take all feedback seriously and would love to learn more about how we can improve. Please feel free to reach out to our customer service team directly so we can make things right.`,
      tone: "Professional",
      confidence: 0.95,
    },
    {
      text:
        rating >= 4
          ? `Hi ${firstName}! 😊 We're so happy you had a great experience with us! Your ${rating}-star review means the world to us. Thank you for taking the time to share your feedback - we can't wait to serve you again soon!`
          : `Hi ${firstName}, we're really sorry to hear about your experience. This isn't the level of service we aim to provide. We'd love to hear more about what went wrong and how we can make it right. Could you please reach out to us directly? We value your feedback and want to ensure a better experience next time.`,
      tone: "Casual",
      confidence: 0.88,
    },
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setSelectedResponse(suggestion);
    setActiveTab("custom");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] bg-background">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <WandIcon className="w-5 h-5 text-[#8B5CF6]" />
            <span className="text-[#8B5CF6]">AI Response Editor</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Original Review */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                from {customerName}
              </span>
            </div>
            <p className="text-sm mt-2">{reviewText}</p>
          </div>

          {/* Response Editor Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="suggestions"
                className="text-[#8B5CF6] border-[#8B5CF6] data-[state=active]:bg-[#8B5CF6]/10"
              >
                <WandIcon className="w-4 h-4 mr-2" />
                AI Suggestions
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="text-[#8B5CF6] border-[#8B5CF6] data-[state=active]:bg-[#8B5CF6]/10"
              >
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
                      ? "border-[#8B5CF6] bg-[#8B5CF6]/5"
                      : "hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/5",
                  )}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]"
                    >
                      {suggestion.tone}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(suggestion.confidence * 100)}% confidence
                    </span>
                  </div>
                  <p className="text-sm">{suggestion.text}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#8B5CF6] hover:bg-[#8B5CF6]/10 border-[#8B5CF6]"
                    >
                      <ThumbsUpIcon className="w-4 h-4 mr-1" /> Helpful
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#8B5CF6] hover:bg-[#8B5CF6]/10 border-[#8B5CF6]"
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
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-[#8B5CF6] hover:bg-[#8B5CF6]/10 border-[#8B5CF6]"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onSubmit(selectedResponse)}
            disabled={!selectedResponse}
            className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white border-[#8B5CF6]"
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
