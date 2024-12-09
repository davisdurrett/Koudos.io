import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon, GiftIcon } from "lucide-react";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { useToast } from "@/components/ui/use-toast";

const FeedbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const rating = parseInt(searchParams.get("rating") || "0");
  const businessId = searchParams.get("businessId") || "";
  const [showGoogleReview, setShowGoogleReview] = React.useState(false);

  const handleSubmitFeedback = async (data: {
    rating: number;
    category: string;
    comment: string;
  }) => {
    try {
      // Create feedback object with high priority for 1-4 star ratings
      const feedback = {
        ...data,
        businessId,
        priority: "high",
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Store in localStorage for now (in a real app this would go to a database)
      const existingFeedback = JSON.parse(
        localStorage.getItem("feedback") || "[]",
      );
      localStorage.setItem(
        "feedback",
        JSON.stringify([...existingFeedback, feedback]),
      );

      toast({
        title: "Thank you for your feedback",
        description:
          "We appreciate you taking the time to share your experience.",
      });

      // For 5-star ratings, show the Google review request
      if (rating === 5) {
        setShowGoogleReview(true);
      } else {
        // For lower ratings, close the window after a delay
        setTimeout(() => {
          window.close();
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (rating === 5 && showGoogleReview) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-6 space-y-6 text-center">
          <div className="flex justify-center">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-8 h-8 text-yellow-400 fill-current"
                />
              ))}
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Thank you for your amazing feedback!
          </h1>
          <div className="p-4 bg-green-50 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <GiftIcon className="w-5 h-5" />
              <p className="font-medium">Special Offer</p>
            </div>
            <p className="text-green-600">
              Share your experience on Google and receive 10% off your next
              visit!
            </p>
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={() => window.open("https://g.page/review/...", "_blank")}
          >
            Leave a Review on Google
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <FeedbackForm
        rating={rating}
        businessId={businessId}
        onSubmit={handleSubmitFeedback}
      />
    </div>
  );
};

export default FeedbackPage;
