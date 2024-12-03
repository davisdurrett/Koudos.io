import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MessageSquareIcon,
  StarIcon,
  ThumbsUpIcon,
  PencilIcon,
  CheckIcon,
  ClockIcon,
  GlobeIcon,
  CircleDotIcon,
  SearchIcon,
  PhoneIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import AIResponseEditor from "./AIResponseEditor";
import { escalationService } from "@/lib/services/escalation";
import { crmService } from "@/lib/services/crm";

interface ReviewCardProps {
  review?: {
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
  };
  onRespond?: (reviewId: string, response: string) => void;
}

const ReviewCard = ({
  review = {
    id: "1",
    author: {
      name: "John Smith",
      avatar: undefined,
    },
    rating: 4,
    date: "2024-03-15",
    text: "Really enjoyed my experience here. The staff was friendly and professional. Would definitely recommend to others!",
    sentiment: "positive",
    status: "pending",
    source: "google",
  },
  onRespond = () => {},
}: ReviewCardProps) => {
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);
  const [isCRMModalOpen, setIsCRMModalOpen] = React.useState(false);
  const [crmCustomer, setCRMCustomer] = React.useState<any>(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const { toast } = useToast();

  const handleResponse = (response: string) => {
    // If it's a low rating review (1-2 stars), create an escalation
    if (review.rating <= 2) {
      escalationService
        .createEscalation({
          reviewId: review.id,
          customerId: "customer-123",
          rating: review.rating,
          reviewText: review.text,
        })
        .then(() => {
          toast({
            title: "Escalation Created",
            description:
              "This review has been escalated for further attention.",
            variant: "default",
          });
        });
    }

    onRespond(review.id, response);
    setIsEditorOpen(false);
  };

  const handleSearchCRM = async () => {
    setIsSearching(true);
    try {
      // Search CRM by reviewer name
      const customer = await crmService.searchCustomer(review.author.name);
      if (customer) {
        setCRMCustomer(customer);
        setIsCRMModalOpen(true);
      } else {
        toast({
          title: "No Match Found",
          description: "No matching customer found in your CRM.",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Failed to search CRM. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800";
      case "negative":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "responded":
        return "bg-green-100 text-green-800";
      case "flagged":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "google":
        return <GlobeIcon className="w-4 h-4 text-blue-500" />;
      case "yelp":
        return <CircleDotIcon className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Card className="w-full bg-background p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10 bg-primary/10">
              {review.author.avatar ? (
                <img
                  src={review.author.avatar}
                  alt={review.author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium">
                  {review.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </Avatar>
            <div>
              <h3 className="font-medium">{review.author.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {review.source && (
                  <div className="flex items-center gap-1">
                    {getSourceIcon(review.source)}
                    <span className="capitalize">{review.source}</span>
                  </div>
                )}
                <span>•</span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300",
                      )}
                    />
                  ))}
                </div>
                <span>•</span>
                <time dateTime={review.date}>
                  {new Date(review.date).toLocaleDateString()}
                </time>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {review.sentiment && (
              <Badge
                variant="secondary"
                className={cn(
                  "capitalize",
                  getSentimentColor(review.sentiment),
                )}
              >
                {review.sentiment}
              </Badge>
            )}
            {review.status && (
              <Badge
                variant="secondary"
                className={cn("capitalize", getStatusColor(review.status))}
              >
                <span className="flex items-center gap-1">
                  {review.status === "responded" && (
                    <CheckIcon className="w-3 h-3" />
                  )}
                  {review.status === "pending" && (
                    <ClockIcon className="w-3 h-3" />
                  )}
                  {review.status}
                </span>
              </Badge>
            )}
          </div>
        </div>

        {/* Review Content */}
        <div className="pl-14">
          <p className="text-sm text-foreground">{review.text}</p>

          {/* Response Section */}
          {review.response && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-2">
                <MessageSquareIcon className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <span className="text-sm font-medium">Your Response</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {review.response}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground"
              onClick={() => setIsEditorOpen(true)}
            >
              <PencilIcon className="w-4 h-4 mr-1" />
              {review.response ? "Edit Response" : "Respond"}
            </Button>
            {review.rating <= 2 && (
              <Button
                variant="outline"
                size="sm"
                className="text-muted-foreground"
                onClick={handleSearchCRM}
                disabled={isSearching}
              >
                <SearchIcon className="w-4 h-4 mr-1" />
                {isSearching ? "Searching..." : "Search CRM"}
              </Button>
            )}
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ThumbsUpIcon className="w-4 h-4 mr-1" />
              Mark as Helpful
            </Button>
          </div>
        </div>
      </Card>

      {/* AI Response Editor */}
      <AIResponseEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSubmit={handleResponse}
        reviewText={review.text}
      />

      {/* CRM Customer Modal */}
      <Dialog open={isCRMModalOpen} onOpenChange={setIsCRMModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {crmCustomer && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{crmCustomer.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Customer since{" "}
                    {new Date(crmCustomer.createdAt).getFullYear()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MailIcon className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`mailto:${crmCustomer.email}`}
                    className="text-primary hover:underline"
                  >
                    {crmCustomer.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <PhoneIcon className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`tel:${crmCustomer.phone}`}
                    className="text-primary hover:underline"
                  >
                    {crmCustomer.phone}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
                <div className="space-y-2">
                  {crmCustomer.recentActivity?.map(
                    (activity: any, index: number) => (
                      <div
                        key={index}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-24 text-xs">
                          {new Date(activity.date).toLocaleDateString()}
                        </span>
                        <span>{activity.description}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewCard;
