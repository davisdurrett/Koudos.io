import React from "react";
import { Card } from "@/components/ui/card";

interface SMSPreviewProps {
  content: string;
}

const SMSPreview = ({ content }: SMSPreviewProps) => {
  // Replace template variables with sample data
  const previewContent = content
    .replace("{name}", "John Smith")
    .replace("{business}", "Acme Inc")
    .replace("{business_name}", "The Acme Team");

  return (
    <Card className="w-full p-4 bg-gray-50">
      <div className="max-w-[80%] space-y-4">
        {/* Business Message */}
        <div className="bg-primary/10 text-primary rounded-lg p-3">
          {previewContent}
        </div>

        {/* Sample Customer Response */}
        <div className="bg-gray-200 text-gray-800 rounded-lg p-3 ml-auto">
          5
        </div>

        {/* Follow-up Message */}
        <div className="bg-primary/10 text-primary rounded-lg p-3">
          Thanks for the great rating! Would you mind sharing your experience on
          Google? https://g.page/review/...
        </div>
      </div>
    </Card>
  );
};

export default SMSPreview;
