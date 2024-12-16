import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  PhoneIcon,
  MailIcon,
  GiftIcon,
  CopyIcon,
  StarIcon,
  SparklesIcon,
  CheckCircleIcon,
} from "lucide-react";

interface ReviewRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate?: (status: "pending" | "in_recovery" | "resolved") => void;
  review: {
    id: string;
    author: {
      name: string;
      email?: string;
      phone?: string;
    };
    rating: number;
    text: string;
  };
}

const ReviewRecoveryModal = ({
  isOpen,
  onClose,
  onStatusUpdate = () => {},
  review,
}: ReviewRecoveryModalProps) => {
  const [notes, setNotes] = React.useState("");
  const [recoveryStatus, setRecoveryStatus] = React.useState({
    callMade: false,
    emailSent: false,
    discountOffered: false,
  });

  const handleCopyEmail = () => {
    if (review.author.email) {
      navigator.clipboard.writeText(review.author.email);
      toast({
        description: "Email copied to clipboard",
      });
    }
  };

  const handleCopyPhone = () => {
    if (review.author.phone) {
      navigator.clipboard.writeText(review.author.phone);
      toast({
        description: "Phone number copied to clipboard",
      });
    }
  };

  const handleStatusToggle = (type: "call" | "email" | "discount") => {
    setRecoveryStatus((prev) => ({
      ...prev,
      [type === "call"
        ? "callMade"
        : type === "email"
          ? "emailSent"
          : "discountOffered"]:
        !prev[
          type === "call"
            ? "callMade"
            : type === "email"
              ? "emailSent"
              : "discountOffered"
        ],
    }));
  };

  const generateRecoveryActions = () => {
    const reviewText = review.text.toLowerCase();
    const actions = [];

    // Contact Actions
    actions.push("Contact customer directly to understand their concerns");
    actions.push("Document conversation and resolution plan");

    // Follow-up Actions
    if (review.rating <= 2) {
      actions.push("Schedule manager follow-up call within 24 hours");
      actions.push("Send personal email addressing specific concerns");
    }

    // Resolution Actions
    if (reviewText.includes("wait") || reviewText.includes("time")) {
      actions.push("Review appointment scheduling and staffing");
    }
    if (reviewText.includes("staff") || reviewText.includes("service")) {
      actions.push("Discuss service standards with team");
    }
    if (reviewText.includes("quality")) {
      actions.push("Review quality control procedures");
    }

    return actions;
  };

  const recoveryActions = generateRecoveryActions();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-500">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
            >
              <path d="M12 4v16m-8-8h16" />
            </svg>
            <span className="ml-2">Review Recovery</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info Card */}
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="space-y-1 flex-1">
                <h3 className="font-medium">{review.author.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {review.author.email && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 p-0 h-auto hover:bg-transparent"
                      onClick={handleCopyEmail}
                    >
                      <MailIcon className="w-4 h-4" />
                      <span>{review.author.email}</span>
                      <CopyIcon className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                  {review.author.phone && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 p-0 h-auto hover:bg-transparent"
                      onClick={handleCopyPhone}
                    >
                      <PhoneIcon className="w-4 h-4" />
                      <span>{review.author.phone}</span>
                      <CopyIcon className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {review.rating} Star Review
              </Badge>
            </div>
          </Card>

          {/* Review Content */}
          <Card className="p-4 bg-muted/50">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm">{review.text}</p>
            </div>
          </Card>

          {/* Recovery Status */}
          <Card className="p-4">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={recoveryStatus.callMade ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusToggle("call")}
                className={`w-full ${recoveryStatus.callMade ? "bg-[#f5794d] hover:bg-[#e66b45]" : "hover:bg-[#f5794d]/10 hover:text-[#f5794d] hover:border-[#f5794d]"}`}
              >
                {recoveryStatus.callMade ? (
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                ) : (
                  <PhoneIcon className="w-4 h-4 mr-2" />
                )}
                {recoveryStatus.callMade ? "Call Made" : "No Call Made"}
              </Button>

              <Button
                variant={recoveryStatus.emailSent ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusToggle("email")}
                className={`w-full ${recoveryStatus.emailSent ? "bg-[#f5794d] hover:bg-[#e66b45]" : "hover:bg-[#f5794d]/10 hover:text-[#f5794d] hover:border-[#f5794d]"}`}
              >
                {recoveryStatus.emailSent ? (
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                ) : (
                  <MailIcon className="w-4 h-4 mr-2" />
                )}
                {recoveryStatus.emailSent ? "Email Sent" : "No Email Sent"}
              </Button>

              <Button
                variant={recoveryStatus.discountOffered ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusToggle("discount")}
                className={`w-full ${recoveryStatus.discountOffered ? "bg-[#f5794d] hover:bg-[#e66b45]" : "hover:bg-[#f5794d]/10 hover:text-[#f5794d] hover:border-[#f5794d]"}`}
              >
                {recoveryStatus.discountOffered ? (
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                ) : (
                  <GiftIcon className="w-4 h-4 mr-2" />
                )}
                {recoveryStatus.discountOffered
                  ? "Discount Offered"
                  : "No Discount Offered"}
              </Button>
            </div>
          </Card>

          {/* Recovery Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-purple-500" />
              <Label className="text-purple-500">AI Recovery Tips</Label>
            </div>
            <Card className="p-3 bg-purple-50">
              <ul className="list-disc list-inside space-y-1">
                {recoveryActions.map((action, index) => (
                  <li key={index} className="text-sm text-purple-700">
                    {action}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Recovery Notes</Label>
            <Textarea
              placeholder="Document your conversation and next steps..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewRecoveryModal;
