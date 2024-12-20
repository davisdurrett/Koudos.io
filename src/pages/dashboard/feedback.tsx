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
}

const FeedbackPage = () => {
  const [search, setSearch] = React.useState("");
  const [feedback, setFeedback] = React.useState<FeedbackItem[]>([]);
  const [selectedFeedback, setSelectedFeedback] =
    React.useState<FeedbackItem | null>(null);
  const [resolutionNote, setResolutionNote] = React.useState("");
  const [isResolutionDialogOpen, setIsResolutionDialogOpen] =
    React.useState(false);

  // Load feedback from localStorage
  React.useEffect(() => {
    const loadFeedback = () => {
      const storedFeedback = localStorage.getItem("feedback");
      if (storedFeedback) {
        setFeedback(JSON.parse(storedFeedback));
      }
    };

    loadFeedback();
    // Set up an interval to check for new feedback
    const interval = setInterval(loadFeedback, 5000);
    return () => clearInterval(interval);
  }, []);

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
          resolvedBy: "Current User", // In a real app, this would be the logged-in user
          resolvedAt: new Date().toISOString(),
          resolutionNote,
        };
      }
      return item;
    });

    setFeedback(updatedFeedback);
    localStorage.setItem("feedback", JSON.stringify(updatedFeedback));
    setIsResolutionDialogOpen(false);
    setResolutionNote("");
    setSelectedFeedback(null);
  };

  const filteredFeedback = feedback.filter(
    (item) =>
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.comment.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Customer Feedback
          </h2>
          <p className="text-sm text-muted-foreground">
            Review and resolve customer feedback
          </p>
        </div>
        <div className="relative w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredFeedback.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No feedback submissions yet</p>
          </Card>
        ) : (
          filteredFeedback.map((item, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-4">
                {/* Customer Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{item.customerName}</span>
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
