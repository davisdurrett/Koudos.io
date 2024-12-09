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
  PhoneIcon,
  StarIcon,
  CheckCircleIcon,
  SendIcon,
} from "lucide-react";

interface FeedbackItem {
  businessId: string;
  customerName: string;
  customerPhone: string;
  rating: number;
  comment: string;
  createdAt: string;
  resolvedBy?: string;
  resolvedAt?: string;
  resolutionNote?: string;
  isNew?: boolean;
}

const FeedbackPage = () => {
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("newest");
  const [selectedFeedback, setSelectedFeedback] =
    React.useState<FeedbackItem | null>(null);
  const [resolutionNote, setResolutionNote] = React.useState("");
  const [isResolutionDialogOpen, setIsResolutionDialogOpen] =
    React.useState(false);
  const [feedback, setFeedback] = React.useState<FeedbackItem[]>([
    {
      businessId: "1",
      customerName: "Michael Chen",
      customerPhone: "(555) 987-6543",
      rating: 2,
      comment:
        "The prices have gone up significantly while the service quality has declined. Had to wait over an hour past my appointment time.",
      createdAt: new Date().toISOString(),
      isNew: true,
    },
    {
      businessId: "1",
      customerName: "Rachel Thompson",
      customerPhone: "(555) 234-5678",
      rating: 1,
      comment:
        "Very disappointed with my recent visit. The staff was unprofessional and the facility wasn't clean. Not what I expected based on previous experiences.",
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      isNew: true,
    },
    {
      businessId: "1",
      customerName: "David Wilson",
      customerPhone: "(555) 345-6789",
      rating: 2,
      comment:
        "Service has really gone downhill. Long wait times and poor communication. Will be looking for alternatives.",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      isNew: true,
    },
    {
      businessId: "1",
      customerName: "Sarah Johnson",
      customerPhone: "(555) 123-4567",
      rating: 2,
      comment:
        "The wait time was too long and the staff seemed disorganized. I had to wait over 45 minutes past my appointment time.",
      createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      isNew: true,
    },
    {
      businessId: "1",
      customerName: "Jennifer Martinez",
      customerPhone: "(555) 777-8888",
      rating: 3,
      comment:
        "Average experience. Some things were good but there's definitely room for improvement in terms of wait times and staff attentiveness.",
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      resolvedBy: "Alex Smith",
      resolvedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      resolutionNote:
        "Called customer to discuss concerns. Offered complimentary service on next visit and assured improvements in wait time management.",
      isNew: false,
    },
    {
      businessId: "1",
      customerName: "Robert Brown",
      customerPhone: "(555) 999-0000",
      rating: 2,
      comment:
        "Pricing is too high for the quality of service provided. Staff seemed rushed and unorganized.",
      createdAt: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(),
      isNew: true,
    },
    {
      businessId: "1",
      customerName: "Emily Davis",
      customerPhone: "(555) 345-6789",
      rating: 3,
      comment:
        "Service was okay but there's definitely room for improvement. The facility could be cleaner.",
      createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      resolvedBy: "John Smith",
      resolvedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      resolutionNote:
        "Called customer and offered a complimentary service on their next visit. Will address cleanliness concerns with staff.",
      isNew: false,
    },
  ]);

  const sortedAndFilteredFeedback = React.useMemo(() => {
    let sorted = [...feedback];

    // Apply sorting
    switch (sortBy) {
      case "newest":
        sorted = sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "oldest":
        sorted = sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "highest":
        sorted = sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        sorted = sorted.sort((a, b) => a.rating - b.rating);
        break;
    }

    // Apply search filter
    if (search) {
      sorted = sorted.filter(
        (item) =>
          item.customerName.toLowerCase().includes(search.toLowerCase()) ||
          item.comment.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return sorted;
  }, [feedback, sortBy, search]);

  const handleResolve = (item: FeedbackItem) => {
    setSelectedFeedback(item);
    setIsResolutionDialogOpen(true);
  };

  const handleSubmitResolution = () => {
    if (!selectedFeedback || !resolutionNote) return;

    const updatedFeedback = feedback.map((item) => {
      if (item === selectedFeedback) {
        return {
          ...item,
          resolvedBy: "Current User",
          resolvedAt: new Date().toISOString(),
          resolutionNote,
          isNew: false,
        };
      }
      return item;
    });

    setFeedback(updatedFeedback);
    setIsResolutionDialogOpen(false);
    setResolutionNote("");
    setSelectedFeedback(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Customer Feedback
        </h2>
        <p className="text-sm text-muted-foreground">
          Review and resolve customer feedback
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or feedback..."
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
            <SelectItem value="highest">Highest Rating</SelectItem>
            <SelectItem value="lowest">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {sortedAndFilteredFeedback.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No feedback submissions yet</p>
          </Card>
        ) : (
          sortedAndFilteredFeedback.map((item, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-4">
                {/* Customer Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{item.customerName}</span>
                        {item.isNew && (
                          <Badge className="bg-primary text-primary-foreground">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="w-4 h-4 text-muted-foreground" />
                        <a
                          href={`tel:${item.customerPhone}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {item.customerPhone}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Feedback Message */}
                <div className="pl-4 border-l-2 border-muted">
                  <p className="text-sm">{item.comment}</p>
                </div>

                {/* Resolution Status */}
                {item.resolvedBy ? (
                  <div className="pl-4 border-l-2 border-green-200 bg-green-50/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-green-800">
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
                ) : (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleResolve(item)}
                    >
                      Mark as Resolved
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      <Dialog
        open={isResolutionDialogOpen}
        onOpenChange={setIsResolutionDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolution Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Resolution Note</Label>
              <Textarea
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                placeholder="Describe how this issue was resolved..."
                className="min-h-[100px]"
              />
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
