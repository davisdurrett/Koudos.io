import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FeedbackFormProps {
  rating: number;
  businessId: string;
  onSubmit: (data: {
    rating: number;
    category: string;
    comment: string;
  }) => void;
}

const FeedbackForm = ({ rating, businessId, onSubmit }: FeedbackFormProps) => {
  const [category, setCategory] = React.useState("");
  const [comment, setComment] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      rating,
      category,
      comment,
    });
  };

  const categories =
    rating === 5
      ? [
          { value: "service", label: "Great Service" },
          { value: "staff", label: "Friendly Staff" },
          { value: "quality", label: "Product Quality" },
          { value: "atmosphere", label: "Atmosphere" },
          { value: "other", label: "Other" },
        ]
      : [
          { value: "service", label: "Service Quality" },
          { value: "wait_time", label: "Wait Time" },
          { value: "cleanliness", label: "Cleanliness" },
          { value: "price", label: "Pricing" },
          { value: "other", label: "Other" },
        ];

  return (
    <Card className="w-full max-w-lg p-6 space-y-6">
      <div className="space-y-2 text-center">
        <div className="flex justify-center">
          <div className="flex items-center gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <StarIcon
                key={i}
                className="w-8 h-8 text-yellow-400 fill-current"
              />
            ))}
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          {rating === 5
            ? "Thank you for your amazing feedback!"
            : "We'd love to hear more"}
        </h1>
        <p className="text-muted-foreground">
          {rating === 5
            ? "What did you love about your experience?"
            : "Please help us understand how we can improve"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>
            {rating === 5
              ? "What did you love most?"
              : "What was the main issue?"}
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Additional Comments</Label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={
              rating === 5
                ? "Tell us more about your experience"
                : "Please share any additional feedback or suggestions"
            }
            className="min-h-[120px]"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Feedback
        </Button>
      </form>
    </Card>
  );
};

export default FeedbackForm;
