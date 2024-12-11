import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SparklesIcon } from "lucide-react";
import { RedPlusIcon } from "@/components/icons/RedPlusIcon";
import { StarRating } from "@/components/ui/star";
import AIResponseEditor from "./AIResponseEditor";
import ReviewRecoveryModal from "./ReviewRecoveryModal";

interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
    email?: string;
    phone?: string;
  };
  rating: number;
  date: string;
  text: string;
  sentiment?: "positive" | "neutral" | "negative";
  status?: "pending" | "responded" | "flagged" | "in_recovery";
  response?: string;
}

interface ReviewCardProps {
  review: Review;
  onRespond?: (reviewId: string, response: string) => void;
  onStatusUpdate?: (
    reviewId: string,
    status: "pending" | "in_recovery" | "resolved",
  ) => void;
}

const ReviewCard = ({ review, onRespond = () => {} }: ReviewCardProps) => {
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = React.useState(false);

  const handleSubmitResponse = (response: string) => {
    onRespond(review.id, response);
    setIsEditorOpen(false);
  };

  const handleStatusUpdate = (
    status: "pending" | "in_recovery" | "resolved",
  ) => {
    onStatusUpdate?.(review.id, status);
    setIsRecoveryModalOpen(false);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Needs Response";
      case "responded":
        return "Responded";
      case "flagged":
        return "Flagged";
      case "in_recovery":
        return "In Recovery";
      default:
        return status;
    }
  };

  return (
    <>
      <Card className="w-full bg-background p-6 space-y-4">
        <div className="space-y-4">
          {/* Star Rating */}
          <StarRating rating={review.rating} />

          {/* Author Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.author.name}</span>
                  {review.status && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        review.status === "responded" &&
                          "bg-green-100 text-green-800",
                        review.status === "pending" &&
                          "bg-yellow-100 text-yellow-800",
                        review.status === "flagged" &&
                          "bg-red-100 text-red-800",
                        review.status === "in_recovery" &&
                          "bg-blue-100 text-blue-800",
                      )}
                    >
                      {getStatusText(review.status)}
                    </Badge>
                  )}
                </div>
                {review.author.email && (
                  <span className="text-sm text-muted-foreground">
                    {review.author.email}
                  </span>
                )}
                {review.author.phone && (
                  <span className="text-sm text-muted-foreground">
                    {review.author.phone}
                  </span>
                )}
              </div>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>

          {/* Review Content */}
          <div className="space-y-2">
            <p className="text-sm">{review.text}</p>
          </div>

          {/* Response Section */}
          {review.response && (
            <div className="pl-4 border-l-2 border-muted space-y-1">
              <p className="text-sm font-medium">Your Response:</p>
              <p className="text-sm text-muted-foreground">{review.response}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={
                review.response
                  ? "text-gray-600 hover:bg-gray-100"
                  : "text-[#8B5CF6] border-[#8B5CF6] hover:bg-[#8B5CF6]/10"
              }
              onClick={() => setIsEditorOpen(true)}
            >
              <SparklesIcon
                className={cn(
                  "w-4 h-4 mr-1",
                  !review.response && "text-[#8B5CF6]",
                )}
              />
              {review.response ? "Edit Response" : "AI Response"}
            </Button>
            {review.rating <= 3 && review.status !== "in_recovery" && (
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 border-red-500 hover:bg-red-500/10"
                onClick={() => setIsRecoveryModalOpen(true)}
              >
                <RedPlusIcon className="w-4 h-4 mr-1" />
                Review Recovery
              </Button>
            )}
          </div>
        </div>
      </Card>

      <AIResponseEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSubmit={handleSubmitResponse}
        reviewText={review.text}
        customerName={review.author.name}
        rating={review.rating}
        initialResponse={review.response}
      />

      <ReviewRecoveryModal
        isOpen={isRecoveryModalOpen}
        onClose={() => setIsRecoveryModalOpen(false)}
        onStatusUpdate={handleStatusUpdate}
        review={review}
      />
    </>
  );
};

export default ReviewCard;
