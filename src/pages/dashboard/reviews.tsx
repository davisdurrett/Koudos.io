import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  SearchIcon,
  StarIcon,
  MessageCircleIcon,
  DatabaseIcon,
  SendIcon,
  Globe2Icon,
  MapPinIcon,
  AlertCircleIcon,
  FlagIcon,
} from "lucide-react";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  content: string;
  timestamp: string;
  source: "google" | "yelp";
  responded: boolean;
  status: "pending" | "responded" | "flagged";
}

const Reviews = () => {
  const [sortBy, setSortBy] = React.useState("newest");
  const [search, setSearch] = React.useState("");
  const [selectedReview, setSelectedReview] = React.useState<Review | null>(
    null,
  );
  const [response, setResponse] = React.useState("");
  const [showResponseDialog, setShowResponseDialog] = React.useState(false);
  const [showCRMDialog, setShowCRMDialog] = React.useState(false);
  const [crmResults, setCrmResults] = React.useState<any[]>([]);

  const mockReviews: Review[] = [
    {
      id: "1",
      customerName: "John Smith",
      rating: 4,
      content: "Great service overall, but wait time was a bit long.",
      timestamp: new Date().toISOString(),
      source: "google",
      responded: false,
      status: "pending",
    },
    {
      id: "2",
      customerName: "Sarah Wilson",
      rating: 3,
      content: "Service was okay but could be better.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      source: "yelp",
      responded: true,
      status: "responded",
    },
    {
      id: "3",
      customerName: "Mike Brown",
      rating: 1,
      content:
        "Very disappointed with the service. Staff was rude and food was cold.",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      source: "google",
      responded: false,
      status: "flagged",
    },
    {
      id: "4",
      customerName: "Emily Davis",
      rating: 2,
      content: "Long wait times and mediocre service. Expected better.",
      timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      source: "yelp",
      responded: false,
      status: "pending",
    },
    {
      id: "5",
      customerName: "Alex Johnson",
      rating: 4,
      content:
        "Good experience overall. Staff was friendly but the place was a bit crowded.",
      timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
      source: "google",
      responded: true,
      status: "responded",
    },
  ];

  const handleRespond = (review: Review) => {
    setSelectedReview(review);
    setResponse("");
    setShowResponseDialog(true);
  };

  const handleSearchCRM = (review: Review) => {
    setSelectedReview(review);
    setShowCRMDialog(true);
    // Simulate CRM search
    setTimeout(() => {
      setCrmResults([
        {
          id: "1",
          name: review.customerName,
          email: "customer@example.com",
          phone: "+1234567890",
          lastVisit: new Date().toLocaleDateString(),
          totalVisits: 5,
        },
      ]);
    }, 1000);
  };

  const handleSubmitResponse = () => {
    console.log("Submitting response:", {
      reviewId: selectedReview?.id,
      response,
    });
    setShowResponseDialog(false);
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  const SourceBadge = ({ source }: { source: "google" | "yelp" }) => {
    if (source === "google") {
      return (
        <Badge
          variant="outline"
          className="flex items-center gap-1 text-blue-600 border-blue-200 bg-blue-50"
        >
          <Globe2Icon className="w-3 h-3" />
          <span className="text-xs">Google Review</span>
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="flex items-center gap-1 text-red-600 border-red-200 bg-red-50"
      >
        <MapPinIcon className="w-3 h-3" />
        <span className="text-xs">Yelp Review</span>
      </Badge>
    );
  };

  const StatusBadge = ({ status }: { status: Review["status"] }) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      responded: "bg-green-100 text-green-800",
      flagged: "bg-red-100 text-red-800",
    };

    const icons = {
      pending: <AlertCircleIcon className="w-3 h-3 mr-1" />,
      responded: <MessageCircleIcon className="w-3 h-3 mr-1" />,
      flagged: <FlagIcon className="w-3 h-3 mr-1" />,
    };

    return (
      <Badge variant="secondary" className={variants[status]}>
        <div className="flex items-center">
          {icons[status]}
          <span className="capitalize">{status}</span>
        </div>
      </Badge>
    );
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
                    <h3 className="font-medium">{review.customerName}</h3>
                    <div className="flex items-center gap-2">
                      <SourceBadge source={review.source} />
                      <StatusBadge status={review.status} />
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>

              <div className="pl-4 border-l-2 border-muted">
                <p className="text-sm">{review.content}</p>
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearchCRM(review)}
                >
                  <DatabaseIcon className="w-4 h-4 mr-2" />
                  Search CRM
                </Button>
                <Button
                  variant={review.responded ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleRespond(review)}
                >
                  <MessageCircleIcon className="w-4 h-4 mr-2" />
                  {review.responded ? "View Response" : "Respond"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={showResponseDialog} onOpenChange={setShowResponseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respond to Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <SourceBadge source={selectedReview?.source || "google"} />
                <StarRating rating={selectedReview?.rating || 0} />
              </div>
              <p className="mt-2 text-sm">{selectedReview?.content}</p>
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
            <Button onClick={handleSubmitResponse}>
              <SendIcon className="w-4 h-4 mr-2" />
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCRMDialog} onOpenChange={setShowCRMDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer CRM Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {crmResults.map((result) => (
              <div key={result.id} className="space-y-2">
                <div className="flex justify-between">
                  <h4 className="font-medium">{result.name}</h4>
                  <Badge variant="secondary">{result.totalVisits} visits</Badge>
                </div>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    {result.email}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Phone:</span>{" "}
                    {result.phone}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Last Visit:</span>{" "}
                    {result.lastVisit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reviews;
