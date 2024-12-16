import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useSettings } from "@/lib/contexts/settings-context";

interface AIResponseSuggestionsProps {
  reviewText: string;
  onSelectResponse: (response: string) => void;
}

const AIResponseSuggestions = ({
  reviewText,
  onSelectResponse,
}: AIResponseSuggestionsProps) => {
  const { settings } = useSettings();
  const [selectedResponse, setSelectedResponse] = React.useState<number | null>(
    null,
  );

  // Generate responses based on business type
  const getResponses = () => {
    const isFormal =
      settings.business.type === "medical" ||
      settings.business.type === "dental" ||
      settings.business.type === "legal" ||
      settings.business.type === "financial";

    const isCasual =
      settings.business.type === "restaurant" ||
      settings.business.type === "retail" ||
      settings.business.type === "entertainment" ||
      settings.business.type === "salon";

    if (isFormal) {
      return [
        {
          tone: "Professional",
          text: `Thank you for taking the time to share your feedback. We sincerely apologize for any inconvenience you experienced. Your satisfaction is our top priority, and we would appreciate the opportunity to address your concerns directly. Please contact our office at your earliest convenience.`,
        },
        {
          tone: "Empathetic",
          text: `We greatly value your feedback and sincerely apologize for not meeting your expectations. As a professional practice, we strive to provide the highest level of service to all our clients. We would welcome the opportunity to discuss your experience in detail and address any concerns you may have.`,
        },
        {
          tone: "Direct",
          text: `Thank you for bringing this to our attention. We take all feedback seriously and would like to resolve any issues you've experienced. Please contact our office to discuss this matter further. Your satisfaction is important to us.`,
        },
      ];
    } else if (isCasual) {
      return [
        {
          tone: "Friendly",
          text: `Hey there! Thanks so much for letting us know about this. We're really sorry things weren't perfect during your visit. We'd love to make it up to you - drop us a message and we'll sort this out right away! 😊`,
        },
        {
          tone: "Casual",
          text: `Thanks for your feedback! We're bummed that we didn't meet your expectations. We'd love to hear more about what went wrong and make things right. Give us a shout and let's chat about it!`,
        },
        {
          tone: "Upbeat",
          text: `We appreciate you taking the time to share your experience! While we're sad to hear it wasn't great, we're all about making things better. Let us know how we can improve - we're all ears! 🙌`,
        },
      ];
    } else {
      return [
        {
          tone: "Balanced",
          text: `Thank you for your feedback. We're sorry to hear about your experience and would like to make things right. Please let us know how we can help improve your next visit with us.`,
        },
        {
          tone: "Professional",
          text: `We appreciate you taking the time to share your concerns. Your feedback helps us improve our service. We would welcome the opportunity to discuss this further and ensure a better experience in the future.`,
        },
        {
          tone: "Friendly",
          text: `Thank you for letting us know about your experience. We're sorry we didn't meet your expectations, and we'd love the chance to make it right. Please reach out to us so we can address your concerns personally.`,
        },
      ];
    }
  };

  const responses = getResponses();

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
