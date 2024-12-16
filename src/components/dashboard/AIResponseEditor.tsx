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
import { useSettings } from "@/lib/contexts/settings-context";
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
  reviewText = "",
  customerName = "John",
  rating = 5,
  initialResponse = "",
}: AIResponseEditorProps) => {
  const { settings } = useSettings();
  const [selectedResponse, setSelectedResponse] =
    React.useState(initialResponse);
  const [activeTab, setActiveTab] = React.useState(
    initialResponse ? "custom" : "suggestions",
  );
  const [selectedTone, setSelectedTone] = React.useState<"formal" | "casual">(
    "formal",
  );

  // Get first name only
  const firstName = customerName.split(" ")[0];

  // Extract key themes from review text
  const getReviewThemes = () => {
    const text = reviewText.toLowerCase();
    const themes = [];

    if (
      text.includes("wait") ||
      text.includes("slow") ||
      text.includes("time")
    ) {
      themes.push("wait time");
    }
    if (
      text.includes("staff") ||
      text.includes("service") ||
      text.includes("rude")
    ) {
      themes.push("service quality");
    }
    if (
      text.includes("clean") ||
      text.includes("dirty") ||
      text.includes("mess")
    ) {
      themes.push("cleanliness");
    }
    if (
      text.includes("price") ||
      text.includes("expensive") ||
      text.includes("cost")
    ) {
      themes.push("pricing");
    }
    return themes;
  };

  const generateResponse = (tone: "formal" | "casual") => {
    const themes = getReviewThemes();
    const businessName = settings.business.name || "our business";

    if (rating >= 4) {
      if (tone === "formal") {
        return [
          {
            text: `Thank you for your wonderful ${rating}-star review, ${firstName}! We're delighted to hear about your positive experience${reviewText.includes("staff") ? ", especially regarding our staff" : ""} at ${businessName}. Your kind words mean a lot to our team, and we look forward to serving you again soon.`,
            tone: "Professional",
            confidence: 0.95,
          },
          {
            text: `We greatly appreciate your ${rating}-star feedback, ${firstName}. ${reviewText.includes("service") ? "It's wonderful to hear that you received excellent service. " : ""}Your satisfaction is our top priority, and we're pleased that your experience met our high standards. Thank you for choosing ${businessName}.`,
            tone: "Corporate",
            confidence: 0.88,
          },
        ];
      } else {
        return [
          {
            text: `Hey ${firstName}! 😊 Thanks so much for the amazing ${rating}-star review! ${reviewText.includes("staff") ? "Our team will be thrilled to hear your kind words! " : ""}We love having customers like you and can't wait to see you again soon! 🌟`,
            tone: "Friendly",
            confidence: 0.95,
          },
          {
            text: `You just made our day, ${firstName}! 🎉 Thank you for the awesome ${rating}-star review${reviewText.includes("service") ? " and for highlighting our great service" : ""}! We're so happy you had a great experience with us. Hope to see you back at ${businessName} soon! ⭐`,
            tone: "Casual",
            confidence: 0.88,
          },
        ];
      }
    } else {
      if (tone === "formal") {
        return [
          {
            text: `${firstName}, we sincerely apologize for your experience${themes.length > 0 ? ` with our ${themes.join(" and ")}` : ""}. We have already addressed this with our team${themes.includes("service quality") ? " to improve our service standards" : ""}${themes.includes("wait time") ? " and adjusted our staffing to reduce wait times" : ""}. We value your feedback and will use it to ensure a better experience for all our customers.`,
            tone: "Professional",
            confidence: 0.95,
          },
          {
            text: `${firstName}, thank you for bringing this to our attention. We take full responsibility for the issues${themes.length > 0 ? ` with ${themes.join(" and ")}` : ""}. We have implemented immediate changes${themes.includes("cleanliness") ? " to our cleaning protocols" : ""}${themes.includes("service quality") ? " to our service standards" : ""} to prevent this from happening again.`,
            tone: "Corporate",
            confidence: 0.88,
          },
        ];
      } else {
        return [
          {
            text: `${firstName}, we're really sorry about the issues${themes.length > 0 ? ` with our ${themes.join(" and ")}` : ""}. 😔 We've already made changes${themes.includes("service quality") ? " to improve our service" : ""} to make sure this doesn't happen again. Thanks for helping us get better!`,
            tone: "Friendly",
            confidence: 0.95,
          },
          {
            text: `${firstName}, thanks for letting us know about this. We're sorry we dropped the ball${themes.length > 0 ? ` on ${themes.join(" and ")}` : ""}. 😔 We've already fixed these issues and made improvements to do better going forward.`,
            tone: "Casual",
            confidence: 0.88,
          },
        ];
      }
    }
  };

  const suggestions = generateResponse(selectedTone);

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

          {/* Tone Selection */}
          <div className="flex justify-end">
            <Tabs
              value={selectedTone}
              onValueChange={(v) => setSelectedTone(v as "formal" | "casual")}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="formal" className="text-sm">
                  Professional Tone
                </TabsTrigger>
                <TabsTrigger value="casual" className="text-sm">
                  Casual Tone
                </TabsTrigger>
              </TabsList>
            </Tabs>
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
