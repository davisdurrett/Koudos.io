import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReviewFilters from "./ReviewFilters";
import ReviewCard from "./ReviewCard";

interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  date: string;
  text: string;
  sentiment?: "positive" | "neutral" | "negative";
  status?: "pending" | "responded" | "flagged";
  source?: "google" | "yelp";
  response?: string;
}

interface ReviewFeedProps {
  className?: string;
  reviews?: Review[];
  onFilterChange?: (filterType: string, value: string) => void;
  onRespond?: (reviewId: string, response: string) => void;
}

const ReviewFeed = ({
  className = "",
  reviews = [
    {
      id: "1",
      author: {
        name: "John Smith",
      },
      rating: 4,
      date: "2024-03-15",
      text: "Really enjoyed my experience here. The staff was friendly and professional. Would definitely recommend to others!",
      sentiment: "positive",
      status: "pending",
      source: "google",
    },
    {
      id: "2",
      author: {
        name: "Sarah Johnson",
      },
      rating: 5,
      date: "2024-03-14",
      text: "Absolutely fantastic service! Everything was perfect from start to finish. The attention to detail was impressive.",
      sentiment: "positive",
      status: "responded",
      source: "yelp",
      response:
        "Thank you for your wonderful feedback, Sarah! We're thrilled to hear you had such a great experience.",
    },
    {
      id: "3",
      author: {
        name: "Mike Brown",
      },
      rating: 2,
      date: "2024-03-13",
      text: "Service was slow and the staff seemed disorganized. Not what I expected based on the reviews.",
      sentiment: "negative",
      status: "flagged",
      source: "google",
    },
  ],
  onFilterChange = () => {},
  onRespond = () => {},
}: ReviewFeedProps) => {
  const [selectedFilters, setSelectedFilters] = React.useState({
    rating: "all",
    sentiment: "all",
    flags: "all",
    source: "all",
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterType]: value }));
    onFilterChange(filterType, value);
  };

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Filters Section */}
      <div className="p-4">
        <ReviewFilters
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Reviews List */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 pb-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} onRespond={onRespond} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ReviewFeed;
