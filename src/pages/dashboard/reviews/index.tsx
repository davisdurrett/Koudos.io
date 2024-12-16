import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/contexts/settings-context";
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
import { SearchIcon, SparklesIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

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
  const { settings, updateNotificationSettings } = useSettings();
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
      text: "Had to wait over 45 minutes past my appointment time. Staff seemed disorganized and there was no communication about the delay. Very frustrating experience.",
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
      text: "Absolutely fantastic experience! Dr. Smith and his team were incredibly thorough and took the time to explain everything. The new facility is beautiful and spotlessly clean. Highly recommend!",
      status: "responded",
      response:
        "Thank you for your wonderful feedback, Michael! We're thrilled to hear you had such a great experience with Dr. Smith and our team. We work hard to provide top-notch care in a comfortable environment, and it's great to know we met your expectations. Looking forward to seeing you at your next visit!",
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
      text: "Very disappointed with my recent visit. The facility wasn't clean, and I found dust and debris in several areas. The staff was unprofessional and spent more time chatting with each other than helping patients. Will not be returning.",
      status: "flagged",
    },
    {
      id: "4",
      author: {
        name: "Robert Martinez",
        email: "robert@example.com",
      },
      rating: 2,
      date: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      text: "Prices have gone up significantly since my last visit with no improvement in service. $200 for a basic service is excessive. Looking for alternatives.",
      status: "pending",
    },
    {
      id: "5",
      author: {
        name: "Jennifer Lee",
        phone: "(555) 234-5678",
      },
      rating: 5,
      date: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
      text: "Amanda at the front desk is amazing! She remembered my name from my last visit and helped sort out an issue with my insurance right away. The whole team is professional and caring.",
      status: "responded",
      response:
        "Thank you for the kind words, Jennifer! We're lucky to have Amanda on our team, and I'll make sure to share your feedback with her. We strive to provide personal attention to each of our clients, and it's wonderful to hear that it shows!",
    },
    {
      id: "6",
      author: {
        name: "David Wilson",
        email: "david@example.com",
        phone: "(555) 876-5432",
      },
      rating: 3,
      date: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
      text: "Service itself was good but there were issues with the payment system and I had to wait 20 minutes for it to be resolved. Also, the online booking system was down when I tried to schedule.",
      status: "pending",
    },
    {
      id: "7",
      author: {
        name: "Maria Garcia",
        email: "maria@example.com",
      },
      rating: 5,
      date: new Date(Date.now() - 144 * 60 * 60 * 1000).toISOString(),
      text: "I've been coming here for 2 years and the quality has been consistently excellent. The staff is well-trained, the equipment is modern, and they're always on time. They also sent me a thoughtful birthday card last month - such a nice personal touch!",
      status: "responded",
      response:
        "Thank you for being such a loyal client, Maria! We're honored to have served you for the past 2 years. Our team loves adding personal touches, and we're glad the birthday card brightened your day. Here's to many more years of serving you!",
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

      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-[#f5794d]" />
            <span className="text-sm text-muted-foreground">
              AI Auto-Response
            </span>
            <Switch
              checked={settings.notifications.aiAutoResponse}
              onCheckedChange={(checked) =>
                updateNotificationSettings({ aiAutoResponse: checked })
              }
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
