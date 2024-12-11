import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MailIcon, SearchIcon } from "lucide-react";

const commonQuestions = [
  {
    question: "How do I respond to a negative review?",
    answer:
      "When responding to a negative review, stay professional and empathetic. Acknowledge their concerns, apologize for their experience, and offer to make things right. Use our AI response suggestions to help craft an appropriate response.",
  },
  {
    question: "How can I improve my review rating?",
    answer:
      "Focus on addressing common issues mentioned in reviews, implement customer feedback, and use our review recovery tools to proactively resolve negative experiences. Consistently engaging with reviews and showing that you value customer feedback can help improve ratings over time.",
  },
  {
    question: "How do I connect my Google Business Profile?",
    answer:
      "Go to Settings > Integrations and click on 'Connect Google Business Profile'. Follow the authentication steps and select the business location you want to connect. Once connected, your reviews will automatically sync.",
  },
  {
    question: "What are review recovery tools?",
    answer:
      "Review recovery tools help you turn negative experiences into positive ones. When you receive a low rating, use our recovery workflow to track outreach efforts, document conversations, and offer resolutions to improve customer satisfaction.",
  },
];

const SupportPanel = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredQuestions = commonQuestions.filter(
    (q) =>
      !searchQuery ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Email Support Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="font-medium">Need help?</h3>
          <p className="text-sm text-muted-foreground">
            Our support team is here to help you with any questions or issues
            you may have.
          </p>
          <Button asChild>
            <a href="mailto:support@koudos.io">
              <MailIcon className="w-4 h-4 mr-2" />
              Contact Support
            </a>
          </Button>
        </div>
      </Card>

      {/* FAQ Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Frequently Asked Questions</h3>
          <div className="relative w-[300px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredQuestions.map((item, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-medium">{item.question}</h3>
              <p className="text-sm text-muted-foreground">{item.answer}</p>
              <Separator className="mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportPanel;
