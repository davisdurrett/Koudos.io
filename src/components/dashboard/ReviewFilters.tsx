import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StarIcon, TrendingUpIcon, FlagIcon, GlobeIcon } from "lucide-react";

interface ReviewFiltersProps {
  className?: string;
  onFilterChange?: (filterType: string, value: string) => void;
  selectedFilters?: {
    rating?: string;
    sentiment?: string;
    flags?: string;
    source?: string;
  };
}

const ReviewFilters = ({
  className = "",
  onFilterChange = () => {},
  selectedFilters = {
    rating: "all",
    sentiment: "all",
    flags: "all",
    source: "all",
  },
}: ReviewFiltersProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 bg-background border rounded-lg",
        className,
      )}
    >
      {/* Star Rating Filter */}
      <div className="flex items-center gap-2">
        <StarIcon className="w-5 h-5 text-muted-foreground" />
        <Select
          defaultValue={selectedFilters.rating}
          onValueChange={(value) => onFilterChange("rating", value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Source Filter */}
      <div className="flex items-center gap-2">
        <GlobeIcon className="w-5 h-5 text-muted-foreground" />
        <Select
          defaultValue={selectedFilters.source}
          onValueChange={(value) => onFilterChange("source", value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="yelp">Yelp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sentiment Filter */}
      <div className="flex items-center gap-2">
        <TrendingUpIcon className="w-5 h-5 text-muted-foreground" />
        <Select
          defaultValue={selectedFilters.sentiment}
          onValueChange={(value) => onFilterChange("sentiment", value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sentiment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sentiment</SelectItem>
            <SelectItem value="positive">Positive</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="negative">Negative</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Flags Filter */}
      <div className="flex items-center gap-2">
        <FlagIcon className="w-5 h-5 text-muted-foreground" />
        <Select
          defaultValue={selectedFilters.flags}
          onValueChange={(value) => onFilterChange("flags", value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Flags" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Issues</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      <div className="flex items-center gap-2 ml-auto">
        {Object.entries(selectedFilters).map(
          ([key, value]) =>
            value !== "all" && (
              <Badge key={key} variant="secondary" className="capitalize">
                {key}: {value}
              </Badge>
            ),
        )}
        {Object.values(selectedFilters).some((value) => value !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              Object.keys(selectedFilters).forEach((key) => {
                onFilterChange(key, "all");
              });
            }}
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReviewFilters;
