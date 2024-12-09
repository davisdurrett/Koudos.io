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
        name: "Jennifer Lee",
        email: "jennifer@example.com",
        phone: "(555) 777-8888",
      },
      rating: 1,
      date: "2024-03-15",
      text: "Extremely disappointed with my visit today. The wait time was unacceptable - over an hour past my appointment time. Staff was unapologetic and seemed disorganized. Not the level of service I expect for these prices.",
      sentiment: "negative",
      status: "pending",
      source: "google",
    },
    {
      id: "2",
      author: {
        name: "David Wilson",
        email: "david@example.com",
        phone: "(555) 666-7777",
      },
      rating: 5,
      date: "2024-03-15",
      text: "Outstanding service! The staff went above and beyond to make sure I had a great experience. The attention to detail and professionalism was impressive. Will definitely be returning and recommending to others!",
      sentiment: "positive",
      status: "pending",
      source: "yelp",
    },
    {
      id: "3",
      author: {
        name: "Michael Chen",
        email: "michael@example.com",
        phone: "(555) 555-9999",
      },
      rating: 2,
      date: "2024-03-14",
      text: "Service quality has declined significantly. Long wait times, poor communication, and the facility wasn't as clean as it should be. Really disappointed as I've been a regular customer.",
      sentiment: "negative",
      status: "pending",
      source: "google",
    },
    {
      id: "4",
      author: {
        name: "Rachel Thompson",
        email: "rachel@example.com",
        phone: "(555) 444-3333",
      },
      rating: 4,
      date: "2024-03-14",
      text: "Very good experience overall. The staff was friendly and professional. Only minor suggestion would be to improve the waiting area comfort. Otherwise, great service!",
      sentiment: "positive",
      status: "pending",
      source: "google",
    },
    {
      id: "5",
      author: {
        name: "Emma Rodriguez",
        email: "emma@example.com",
        phone: "(555) 222-1111",
      },
      rating: 5,
      date: "2024-03-13",
      text: "Absolutely fantastic! From the moment I walked in, I felt welcomed and valued. The staff is incredibly skilled and professional. The results exceeded my expectations. Highly recommend!",
      sentiment: "positive",
      status: "responded",
      source: "yelp",
      response:
        "Thank you so much for your wonderful feedback, Emma! We're thrilled to hear about your great experience. Our team takes pride in providing exceptional service, and we look forward to seeing you again!",
    },
  ];

  const sortedAndFilteredReviews = React.useMemo(() => {
    let sorted = [...mockReviews];

    // Apply sorting
    switch (sortBy) {
      case "newest":
        sorted = sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        break;
      case "oldest":
        sorted = sorted.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case "rating-high":
        sorted = sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-low":
        sorted = sorted.sort((a, b) => a.rating - b.rating);
        break;
    }

    // Apply search filter
    if (search) {
      sorted = sorted.filter(
        (review) =>
          review.author.name.toLowerCase().includes(search.toLowerCase()) ||
          review.text.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return sorted;
  }, [mockReviews, sortBy, search]);

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
        {sortedAndFilteredReviews.map((review) => (
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
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: selectedReview?.rating || 0 }).map(
                    (_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ),
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(selectedReview?.date || "").toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm">{selectedReview?.text}</p>
            </div>

            {/* AI Response Suggestions */}
            <div className="space-y-4">
              <Label>AI-Suggested Responses</Label>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(aiResponses).map(([tone, text]) => (
                  <Card
                    key={tone}
                    className="p-4 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => setResponse(text)}
                  >
                    <div className="space-y-2">
                      <Badge variant="secondary" className="capitalize">
                        {tone}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Response Input */}
            <div className="space-y-2">
              <Label>Your Response</Label>
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Write your response..."
                className="min-h-[100px]"
              />
            </div>
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
