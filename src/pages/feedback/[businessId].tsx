import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GiftIcon, HeartIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSettings } from "@/lib/contexts/settings-context";

interface BusinessConfig {
  businessName: string;
  logo?: string;
  email?: string;
  phone?: string;
}

const BusinessFeedbackPage = () => {
  const { businessId } = useParams();
  const { toast } = useToast();
  const { settings } = useSettings();
  const [comment, setComment] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [config, setConfig] = React.useState<BusinessConfig>({
    businessName: "Business Name",
  });

  // Load business config from localStorage
  React.useEffect(() => {
    const storedConfig = localStorage.getItem("formConfig");
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig));
    }
  }, [businessId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      // Create feedback object
      const feedback = {
        businessId,
        comment,
        createdAt: new Date().toISOString(),
        status: "pending",
        priority: "high",
      };

      // Store in localStorage
      const existingFeedback = JSON.parse(
        localStorage.getItem("feedback") || "[]",
      );
      localStorage.setItem(
        "feedback",
        JSON.stringify([...existingFeedback, feedback]),
      );

      setSubmitted(true);
      toast({
        title: "Thank you for your feedback",
        description:
          "We take your concerns seriously and will address them promptly.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="max-w-lg w-full p-6 space-y-6 text-center">
          {config.logo && (
            <div className="flex justify-center">
              <img
                src={config.logo}
                alt={config.businessName}
                className="h-12 object-contain"
              />
            </div>
          )}
          <div className="space-y-4">
            <HeartIcon className="w-12 h-12 mx-auto text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">
              We appreciate your honesty
            </h1>
            <p className="text-muted-foreground">
              Thank you for taking the time to share your experience. We take
              all feedback seriously and will use it to improve our service.
            </p>
          </div>
          <div className="p-4 bg-primary/5 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary">
              <GiftIcon className="w-5 h-5" />
              <p className="font-medium">Our Thanks to You</p>
            </div>
            <p className="text-muted-foreground">
              We'd like to make it right. Please enjoy{" "}
              {settings.templates[0].steps[1].config.incentive?.value} on your
              next visit.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-lg w-full p-6 space-y-6">
        {config.logo && (
          <div className="flex justify-center">
            <img
              src={config.logo}
              alt={config.businessName}
              className="h-12 object-contain"
            />
          </div>
        )}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Help Us Improve</h1>
          <p className="text-muted-foreground">
            We noticed your experience wasn't perfect. Please share what went
            wrong so we can make it right.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What specific issues did you encounter? How can we improve our service?"
            className="min-h-[150px]"
          />

          <Button type="submit" className="w-full" disabled={!comment.trim()}>
            Submit Feedback
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default BusinessFeedbackPage;
