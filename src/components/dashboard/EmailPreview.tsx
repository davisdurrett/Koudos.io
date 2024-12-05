import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";

interface EmailPreviewProps {
  subject: string;
  content: string;
  style: {
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    fontFamily: string;
    fontSize: string;
  };
}

const EmailPreview = ({ subject, content, style }: EmailPreviewProps) => {
  // Replace template variables with sample data
  const previewContent = content
    .replace("{name}", "John Smith")
    .replace("{business}", "Acme Inc")
    .replace("{business_name}", "The Acme Team");

  return (
    <Card className="w-full overflow-hidden">
      <div
        style={{
          backgroundColor: style.backgroundColor,
          color: style.textColor,
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          padding: "2rem",
        }}
      >
        <h2
          style={{ color: style.accentColor }}
          className="text-xl font-semibold mb-4"
        >
          {subject}
        </h2>

        <div className="whitespace-pre-wrap mb-8">{previewContent}</div>

        <div className="flex justify-center gap-8">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              variant="outline"
              className="flex-col gap-2 hover:bg-primary/10 transition-colors"
              style={{
                borderColor: style.accentColor,
                color: style.accentColor,
              }}
            >
              <StarIcon className="w-8 h-8" />
              <span className="text-sm">{rating}</span>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default EmailPreview;
