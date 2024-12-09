import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SearchIcon,
  StarIcon,
  MessageSquareIcon,
  SendIcon,
  Globe2Icon,
  MapPinIcon,
  UserIcon,
  CalendarIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";

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
  status?: "pending" | "responded";
  source?: "google" | "yelp";
  response?: string;
}

const Reviews = () => {
  const [sortBy, setSortBy] = React.useState("newest");
  const [search, setSearch] = React.useState("");
  const [selectedReview, setSelectedReview] = React.useState<Review | null>(
    null,
  );
  const [response, setResponse] = React.useState("");
  const [showResponseDialog, setShowResponseDialog] = React.useState(false);
  const [aiResponses, setAiResponses] = React.useState<Record<string, string>>(
    {},
  );

  const mockReviews: Review[] = [
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "(555) 123-4567",
      },
      rating: 5,
      date: "2024-03-15",
      text: "Absolutely fantastic experience! The staff was incredibly friendly and professional. Everything was perfect from start to finish. The attention to detail really impressed me.",
      sentiment: "positive",
      status: "pending",
      source: "google",
    },
    {
      id: "2",
      author: {
        name: "Mike Roberts",
        email: "mike@example.com",
        phone: "(555) 234-5678",
      },
      rating: 2,
      text: "Very disappointed with the service. Long wait times and the staff seemed disorganized. Not what I expected based on the reviews.",
      date: "2024-03-14",
      status: "pending",
      source: "yelp",
    },
    {
      id: "3",
      author: {
        name: "John Smith",
        email: "john@example.com",
        phone: "(555) 345-6789",
      },
      rating: 4,
      text: "Great service overall, but the wait time was a bit longer than expected. Staff was friendly and helpful though.",
      date: "2024-03-13",
      status: "responded",
      source: "google",
      response:
        "Thank you for your feedback! We appreciate your patience and are actively working on improving our wait times. We're glad you enjoyed the service otherwise!",
    },
  ];

  const getAIResponses = (review: Review) => {
    const firstName = review.author.name.split(" ")[0];

    if (review.rating >= 4) {
      return {
        professional: `Thank you for taking the time to share your experience with us. We're delighted to hear about your positive visit and particularly appreciate your comments about our staff. We look forward to serving you again soon.`,
        balanced: `Thanks for the wonderful feedback, ${firstName}! We're really happy to hear you had a great experience with us. Looking forward to your next visit!`,
        friendly: `${firstName}, you just made our day! Thanks for the awesome ${review.rating}-star review! 😊 It means a lot to hear you had such a great time with us. Can't wait to see you again!`,
      };
    } else if (review.rating === 3) {
      return {
        professional: `Thank you for your feedback. We value your honest assessment and would welcome the opportunity to better understand your experience. Please feel free to reach out to us directly so we can address your concerns.`,
        balanced: `${firstName}, thanks for sharing your thoughts with us. While we're glad some things went well, we'd love to hear how we can make your next visit even better.`,
        friendly: `${firstName}, thanks for letting us know how we did! We aim for 5-star experiences, so we'd love to hear what we could do better. Drop us a line anytime! 🙌`,
      };
    } else {
      return {
        professional: `We sincerely apologize that we fell short of your expectations. Your feedback is important to us, and we would appreciate the opportunity to discuss your concerns. Please contact us directly so we can work to resolve any issues.`,
        balanced: `${firstName}, we're sorry your visit wasn't up to our usual standards. Your feedback helps us improve, and we'd really appreciate the chance to make things right.`,
        friendly: `${firstName}, we're really sorry we let you down! 😔 This isn't the experience we aim for at all. We'd love a chance to make it up to you - let us know what we can do better!`,
      };
    }
  };

  const handleRespond = (review: Review) => {
    setSelectedReview(review);
    setResponse("");
    setShowResponseDialog(true);
    setAiResponses(getAIResponses(review));
  };

  const handleSubmitResponse = () => {
    if (!selectedReview || !response) return;
    console.log("Submitting response:", {
      reviewId: selectedReview.id,
      response,
    });
    setShowResponseDialog(false);
  };

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
        {mockReviews.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">{review.author.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          review.source === "google"
                            ? "text-blue-600 border-blue-200 bg-blue-50"
                            : "text-red-600 border-red-200 bg-red-50"
                        }
                      >
                        <div className="flex items-center gap-1">
                          {review.source === "google" ? (
                            <Globe2Icon className="w-3 h-3" />
                          ) : (
                            <MapPinIcon className="w-3 h-3" />
                          )}
                          <span className="capitalize">{review.source}</span>
                        </div>
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={
                          review.status === "responded"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }
                      >
                        {review.status === "responded"
                          ? "Responded"
                          : "Needs Response"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="pl-4 border-l-2 border-muted">
                <p className="text-sm">{review.text}</p>
                {review.response && (
                  <div className="mt-4 pl-4 py-2 border-l-2 border-primary/20 bg-primary/5 rounded">
                    <p className="text-sm text-muted-foreground">
                      {review.response}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button
                  variant={review.response ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleRespond(review)}
                >
                  <MessageSquareIcon className="w-4 h-4 mr-2" />
                  {review.response ? "Edit Response" : "Respond"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Respond to Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Customer Info */}
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{selectedReview?.author.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  {selectedReview?.author.email && (
                    <div className="flex items-center gap-1">
                      <MailIcon className="w-3 h-3" />
                      <a
                        href={`mailto:${selectedReview.author.email}`}
                        className="hover:underline"
                      >
                        {selectedReview.author.email}
                      </a>
                    </div>
                  )}
                  {selectedReview?.author.phone && (
                    <div className="flex items-center gap-1">
                      <PhoneIcon className="w-3 h-3" />
                      <a
                        href={`tel:${selectedReview.author.phone}`}
                        className="hover:underline"
                      >
                        {selectedReview.author.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" />
                    {selectedReview?.date &&
                      new Date(selectedReview.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${i < (selectedReview?.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="p-4 border rounded-lg">
              <p className="text-sm">{selectedReview?.text}</p>
            </div>

            <div className="space-y-2">
              <Label>AI Response Suggestions</Label>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(aiResponses).map(([type, text]) => (
                  <div
                    key={type}
                    className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                    onClick={() => setResponse(text)}
                  >
                    <div className="space-y-2">
                      <span className="font-medium capitalize block">
                        {type}
                      </span>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Textarea
              placeholder="Type your response..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowResponseDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitResponse} disabled={!response.trim()}>
              <SendIcon className="w-4 h-4 mr-2" />
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reviews;
