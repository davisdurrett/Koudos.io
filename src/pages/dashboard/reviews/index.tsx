import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ReviewCard from "@/components/dashboard/ReviewCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";

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
  status?: "pending" | "responded" | "flagged";
  response?: string;
}

const Reviews = () => {
  const [sortBy, setSortBy] = React.useState("newest");
  const [search, setSearch] = React.useState("");
  const [filterBy, setFilterBy] = React.useState("all");

  const mockReviews: Review[] = [
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
      },
      rating: 2,
      date: new Date().toISOString(),
      text: "Service was slow and the staff seemed disorganized. Not what I expected based on the reviews.",
      status: "pending",
    },
    {
      id: "2",
      author: {
        name: "Michael Chen",
        phone: "(555) 987-6543",
      },
      rating: 5,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      text: "Absolutely fantastic experience! The staff was incredibly friendly and professional.",
      status: "responded",
      response:
        "Thank you for your wonderful feedback, Michael! We're thrilled to hear you had such a great experience with us.",
    },
    {
      id: "3",
      author: {
        name: "Emily Davis",
        email: "emily@example.com",
        phone: "(555) 345-6789",
      },
      rating: 1,
      date: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      text: "Very disappointed with my recent visit. The facility wasn't clean and the service was poor.",
      status: "flagged",
    },
    {
      id: "4",
      author: {
        name: "David Wilson",
      },
      rating: 4,
      date: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      text: "Great service overall, though the wait was a bit longer than expected. Staff was very helpful.",
      status: "responded",
      response:
        "Thank you for your feedback, David! We appreciate your patience and are working on improving our wait times.",
    },
    {
      id: "5",
      author: {
        name: "Jennifer Martinez",
        email: "jennifer@example.com",
      },
      rating: 3,
      date: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
      text: "Average experience. Some things were good but there's definitely room for improvement.",
      status: "pending",
    },
    {
      id: "6",
      author: {
        name: "Robert Brown",
        phone: "(555) 999-0000",
      },
      rating: 5,
      date: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
      text: "Outstanding service! Everyone was professional and attentive. Will definitely come back!",
      status: "responded",
      response:
        "Thank you for your kind words, Robert! We look forward to serving you again soon.",
    },
  ];

  const handleRespond = (reviewId: string, response: string) => {
    console.log("Submitting response:", { reviewId, response });
  };

  const filteredReviews = mockReviews
    .filter((review) => {
      if (filterBy === "all") return true;
      if (filterBy === "needs_response") return review.status === "pending";
      if (filterBy === "responded") return review.status === "responded";
      if (filterBy === "flagged") return review.status === "flagged";
      if (filterBy === "positive") return review.rating >= 4;
      if (filterBy === "negative") return review.rating <= 2;
      return true;
    })
    .filter((review) => {
      if (!search) return true;
      const searchLower = search.toLowerCase();
      return (
        review.author.name.toLowerCase().includes(searchLower) ||
        review.text.toLowerCase().includes(searchLower) ||
        review.author.email?.toLowerCase().includes(searchLower) ||
        review.author.phone?.includes(search)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "rating-high":
          return b.rating - a.rating;
        case "rating-low":
          return a.rating - b.rating;
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  return (
    <div className="h-full bg-background p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Reviews</h2>
        <p className="text-sm text-muted-foreground">
          Manage and respond to your customer reviews
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reviews</SelectItem>
            <SelectItem value="needs_response">Needs Response</SelectItem>
            <SelectItem value="responded">Responded</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="positive">Positive (4-5★)</SelectItem>
            <SelectItem value="negative">Negative (1-2★)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="rating-high">Highest Rating</SelectItem>
            <SelectItem value="rating-low">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onRespond={handleRespond}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
