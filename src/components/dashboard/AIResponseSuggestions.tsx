import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";

interface AIResponseSuggestionsProps {
  reviewText: string;
  onSelectResponse: (response: string) => void;
}

const AIResponseSuggestions = ({
  reviewText,
  onSelectResponse,
}: AIResponseSuggestionsProps) => {
  const [selectedResponse, setSelectedResponse] = React.useState<number | null>(
    null,
  );

  // Simulated AI responses with different tones
  const responses = [
    {
      tone: "Formal",
      text: "Thank you for taking the time to share your feedback. We sincerely apologize for any inconvenience you experienced. Your satisfaction is our top priority, and we would appreciate the opportunity to address your concerns directly. Please contact our customer service team at your earliest convenience.",
    },
    {
      tone: "Neutral",
      text: "Thanks for your feedback. We're sorry to hear about your experience and would like to make things right. Please let us know how we can help improve your next visit with us.",
    },
    {
      tone: "Informal",
      text: "Hey there! Thanks so much for letting us know about this. We're really sorry things weren't perfect during your visit. We'd love to make it up to you - drop us a message and we'll sort this out right away! 😊",
    },
  ];

  const handleSelect = (index: number) => {
    setSelectedResponse(index);
    onSelectResponse(responses[index].text);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground">
        AI-Generated Response Suggestions
      </h3>
      <div className="grid gap-4">
        {responses.map((response, index) => (
          <Card
            key={index}
            className={cn(
              "p-4 cursor-pointer transition-colors",
              selectedResponse === index
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50",
            )}
            onClick={() => handleSelect(index)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={cn(
                    "px-2 py-0.5 text-xs",
                    selectedResponse === index && "bg-primary/10 text-primary",
                  )}
                >
                  {response.tone}
                </Badge>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(response.text);
                    }}
                  >
                    <CopyIcon className="h-3 w-3" />
                  </Button>
                  {selectedResponse === index && (
                    <CheckIcon className="h-4 w-4 text-primary" />
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm">{response.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIResponseSuggestions;
