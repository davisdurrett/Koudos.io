import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  UserIcon,
  StarIcon,
  SendIcon,
  CheckCircleIcon,
  CopyIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FeedbackItem {
  id: string;
  customerName: string;
  customerPhone: string;
  rating: number;
  comment: string;
  category?: string;
  createdAt: string;
  resolvedBy?: string;
  resolvedAt?: string;
  resolutionNote?: string;
}

const FeedbackPage = () => {
  const { toast } = useToast();
  const [search, setSearch] = React.useState("");
  const [filterBy, setFilterBy] = React.useState("all");
  const [loading, setLoading] = React.useState(true);
  const [sortBy, setSortBy] = React.useState("newest");
  const [feedback, setFeedback] = React.useState<FeedbackItem[]>([
    {
      id: "1",
      customerName: "Michael Chen",
      customerPhone: "(555) 987-6543",
      rating: 2,
      category: "Wait Time",
      comment:
        "Had to wait over 45 minutes past my appointment time. No explanation or apology was given. This is unacceptable for a scheduled appointment.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      customerPhone: "(555) 123-4567",
      rating: 1,
      category: "Service Quality",
      comment:
        "Very disappointed with the service quality. Staff was dismissive of my concerns and seemed more interested in rushing through the appointment than addressing my needs.",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      customerName: "David Wilson",
      customerPhone: "(555) 345-6789",
      rating: 2,
      category: "Cleanliness",
      comment:
        "The facility was not as clean as expected. Found dust in several areas and the equipment didn't appear to be properly sanitized between uses.",
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      resolvedBy: "John Smith",
      resolvedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      resolutionNote:
        "Contacted customer and scheduled a follow-up visit. Cleaning procedures have been updated and staff retraining scheduled.",
    },
    {
      id: "4",
      customerName: "Lisa Anderson",
      customerPhone: "(555) 789-0123",
      rating: 2,
      category: "Pricing",
      comment:
        "The recent price increases are unreasonable. $75 more than last time for the same service. No warning or explanation was given about the price change.",
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "5",
      customerName: "James Thompson",
      customerPhone: "(555) 234-5678",
      rating: 1,
      category: "Staff",
      comment:
        "The staff member was rude and dismissive of my concerns. When I asked to speak to a manager, I was told they were unavailable and no one followed up.",
      createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
      resolvedBy: "Mark Wilson",
      resolvedAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      resolutionNote:
        "Called customer personally to apologize. Scheduled a meeting to discuss concerns and offered a complimentary service. Staff member has been counseled on proper customer service protocols.",
    },
    {
      id: "6",
      customerName: "Rachel Kim",
      customerPhone: "(555) 456-7890",
      rating: 2,
      category: "Technical Issues",
      comment:
        "The online booking system has been broken for weeks. Called to book instead but was put on hold for 15 minutes. This is basic customer service that needs to be fixed.",
      createdAt: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
      resolvedBy: "Tech Support Team",
      resolvedAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
      resolutionNote:
        "Identified and fixed the booking system bug. Implemented a new phone queue system to reduce hold times. Followed up with customer to confirm everything is working properly.",
    },
    {
      id: "7",
      customerName: "Thomas Brown",
      customerPhone: "(555) 567-8901",
      rating: 2,
      category: "Communication",
      comment:
        "No one notified me that my appointment was delayed. Waited 30 minutes before someone explained there was an emergency with another client. Better communication needed.",
      createdAt: new Date(Date.now() - 144 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "8",
      customerName: "Emma Davis",
      customerPhone: "(555) 678-9012",
      rating: 2,
      category: "Facility",
      comment:
        "The waiting area was overcrowded and uncomfortable. Temperature was too high and the water dispenser was empty. These are basic amenities that should be maintained.",
      createdAt: new Date(Date.now() - 168 * 60 * 60 * 1000).toISOString(),
      resolvedBy: "Facility Manager",
      resolvedAt: new Date(Date.now() - 144 * 60 * 60 * 1000).toISOString(),
      resolutionNote:
        "Adjusted HVAC settings and implemented hourly checks of waiting area amenities. Added more seating and reorganized layout for better comfort. Daily checklist created for maintenance staff.",
    },
    {
      id: "9",
      customerName: "Carlos Rodriguez",
      customerPhone: "(555) 789-0123",
      rating: 1,
      category: "Scheduling",
      comment:
        "Tried to reschedule my appointment but was told I'd have to wait 3 weeks. When I explained it was urgent, staff was unhelpful and suggested I 'try somewhere else.'",
      createdAt: new Date(Date.now() - 192 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "10",
      customerName: "Patricia White",
      customerPhone: "(555) 890-1234",
      rating: 2,
      category: "Follow-up",
      comment:
        "Never received the follow-up information that was promised during my visit. Called twice to request it but still nothing. This impacts my ongoing treatment plan.",
      createdAt: new Date(Date.now() - 216 * 60 * 60 * 1000).toISOString(),
      resolvedBy: "Customer Care Team",
      resolvedAt: new Date(Date.now() - 192 * 60 * 60 * 1000).toISOString(),
      resolutionNote:
        "Information package sent via express mail with apology letter. Implemented new system to track and automatically send follow-up materials. Staff retraining scheduled on follow-up protocols.",
    },
  ]);

  const [selectedFeedback, setSelectedFeedback] =
    React.useState<FeedbackItem | null>(null);
  const [resolutionNote, setResolutionNote] = React.useState("");
  const [isResolutionDialogOpen, setIsResolutionDialogOpen] =
    React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleResolve = (item: FeedbackItem) => {
    setSelectedFeedback(item);
    setIsResolutionDialogOpen(true);
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast({
      description: "Phone number copied to clipboard",
    });
  };

  const handleSubmitResolution = () => {
    if (!selectedFeedback || !resolutionNote) return;

    const updatedFeedback = feedback.map((item) => {
      if (item.id === selectedFeedback.id) {
        return {
          ...item,
          resolvedBy: "Current User",
          resolvedAt: new Date().toISOString(),
          resolutionNote,
        };
      }
      return item;
    });

    setFeedback(updatedFeedback);
    setIsResolutionDialogOpen(false);
    setResolutionNote("");
    setSelectedFeedback(null);

    toast({
      description: "Feedback marked as resolved",
    });
  };

  const filteredFeedback = feedback
    .filter((item) => {
      if (filterBy === "all") return true;
      if (filterBy === "resolved") return item.resolvedBy;
      if (filterBy === "unresolved") return !item.resolvedBy;
      if (filterBy === "low_rating") return item.rating <= 2;
      return true;
    })
    .filter(
      (item) =>
        item.customerName.toLowerCase().includes(search.toLowerCase()) ||
        item.comment.toLowerCase().includes(search.toLowerCase()) ||
        item.customerPhone.includes(search),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "rating-high":
          return b.rating - a.rating;
        case "rating-low":
          return a.rating - b.rating;
        case "newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

  return (
    <div className="h-full bg-background p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Customer Feedback
        </h2>
        <p className="text-sm text-muted-foreground">
          Review and resolve customer feedback
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
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
            <SelectItem value="all">All Feedback</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="unresolved">Unresolved</SelectItem>
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

      {/* Feedback List */}
      <div className="space-y-4">
        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Loading feedback...</p>
          </Card>
        ) : filteredFeedback.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No feedback submissions found
            </p>
          </Card>
        ) : (
          filteredFeedback.map((item) => (
            <Card key={item.id} className="w-full p-6 space-y-4">
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${i < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                {/* Customer Info */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{item.customerName}</span>
                    </div>
                    <button
                      className="text-sm text-muted-foreground hover:text-foreground ml-6"
                      onClick={() => handleCopyPhone(item.customerPhone)}
                    >
                      {item.customerPhone}
                      <CopyIcon className="w-3 h-3 ml-1 inline-block" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                    {item.resolvedBy && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Resolved
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Feedback Content */}
                <p className="text-sm">{item.comment}</p>

                {/* Category and Action Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.category && (
                      <Badge variant="outline">{item.category}</Badge>
                    )}
                  </div>
                  {!item.resolvedBy && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleResolve(item)}
                    >
                      Mark as Resolved
                    </Button>
                  )}
                </div>

                {/* Resolution Status */}
                {item.resolvedBy && (
                  <div className="pl-4 border-l-2 border-green-200 bg-green-50/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-green-800 flex-wrap">
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>Resolved by {item.resolvedBy}</span>
                      <span>•</span>
                      <span>{new Date(item.resolvedAt!).toLocaleString()}</span>
                    </div>
                    {item.resolutionNote && (
                      <p className="mt-2 text-sm text-green-700">
                        {item.resolutionNote}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Resolution Dialog */}
      <Dialog
        open={isResolutionDialogOpen}
        onOpenChange={setIsResolutionDialogOpen}
        className="sm:max-w-[600px]"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolution Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Resolution Note</Label>
              <div className="relative">
                <Textarea
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="Describe how this issue was resolved..."
                  className="min-h-[150px] resize-none"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsResolutionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitResolution}
              disabled={!resolutionNote.trim()}
            >
              <SendIcon className="w-4 h-4 mr-2" />
              Complete Resolution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackPage;
