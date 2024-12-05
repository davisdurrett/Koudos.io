import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MailIcon,
  PhoneIcon,
  SearchIcon,
  StarIcon,
  ArrowUpDownIcon,
  FlagIcon,
  ArchiveIcon,
  MessageSquareIcon,
  AlertCircleIcon,
} from "lucide-react";

interface FeedbackItem {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  content: string;
  timestamp: string;
  status: "new" | "read" | "flagged" | "archived";
  rating: 1 | 2 | 3 | 4;
  source: "email" | "sms";
}

const Feedback = () => {
  const [sortBy, setSortBy] = React.useState("newest");
  const [search, setSearch] = React.useState("");

  const mockFeedback: FeedbackItem[] = [
    {
      id: "1",
      customerName: "John Smith",
      customerEmail: "john@example.com",
      customerPhone: "+1234567890",
      content: "Good service but room for improvement.",
      timestamp: new Date().toISOString(),
      status: "new",
      rating: 4,
      source: "email",
    },
    {
      id: "2",
      customerName: "Sarah Wilson",
      customerEmail: "sarah@example.com",
      customerPhone: "+1987654321",
      content: "Service was not up to expectations.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      status: "flagged",
      rating: 2,
      source: "sms",
    },
    {
      id: "3",
      customerName: "Mike Brown",
      customerEmail: "mike@example.com",
      customerPhone: "+1122334455",
      content: "The wait time was excessive and the staff seemed disorganized.",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      status: "new",
      rating: 2,
      source: "email",
    },
    {
      id: "4",
      customerName: "Emily Davis",
      customerEmail: "emily@example.com",
      customerPhone: "+1987654321",
      content: "Food quality was not up to the usual standards. Disappointed.",
      timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      status: "flagged",
      rating: 3,
      source: "sms",
    },
    {
      id: "5",
      customerName: "Alex Johnson",
      customerEmail: "alex@example.com",
      customerPhone: "+1555666777",
      content:
        "Service was okay but there's room for improvement in cleanliness.",
      timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
      status: "read",
      rating: 3,
      source: "email",
    },
  ];

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  const StatusBadge = ({ status }: { status: FeedbackItem["status"] }) => {
    const variants = {
      new: "bg-blue-100 text-blue-800",
      read: "bg-green-100 text-green-800",
      flagged: "bg-red-100 text-red-800",
      archived: "bg-gray-100 text-gray-800",
    };

    const icons = {
      new: <AlertCircleIcon className="w-3 h-3 mr-1" />,
      read: <MessageSquareIcon className="w-3 h-3 mr-1" />,
      flagged: <FlagIcon className="w-3 h-3 mr-1" />,
      archived: <ArchiveIcon className="w-3 h-3 mr-1" />,
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
        <h2 className="text-2xl font-semibold tracking-tight">
          Feedback Inbox
        </h2>
        <p className="text-sm text-muted-foreground">
          View and manage customer feedback (4 stars and below)
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
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
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {mockFeedback.map((feedback) => (
          <Card key={feedback.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <h3 className="font-medium">{feedback.customerName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {feedback.customerEmail && (
                        <div className="flex items-center gap-1">
                          <MailIcon className="w-3 h-3" />
                          {feedback.customerEmail}
                        </div>
                      )}
                      {feedback.customerPhone && (
                        <div className="flex items-center gap-1">
                          <PhoneIcon className="w-3 h-3" />
                          {feedback.customerPhone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StarRating rating={feedback.rating} />
                  <StatusBadge status={feedback.status} />
                </div>
              </div>

              <div className="pl-4 border-l-2 border-muted">
                <p className="text-sm">{feedback.content}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(feedback.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  {feedback.customerEmail && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEmail(feedback.customerEmail!)}
                    >
                      <MailIcon className="w-4 h-4 mr-2" />
                      Reply via Email
                    </Button>
                  )}
                  {feedback.customerPhone && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCall(feedback.customerPhone!)}
                    >
                      <PhoneIcon className="w-4 h-4 mr-2" />
                      Call Customer
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <FlagIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ArchiveIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
