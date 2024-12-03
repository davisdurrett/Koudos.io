import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  SmileIcon,
  FrownIcon,
  StarIcon,
  MailIcon,
  MessageSquareIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from "lucide-react";

interface FeedbackManagerProps {
  className?: string;
}

const FeedbackManager = ({ className = "" }: FeedbackManagerProps) => {
  const [emailEnabled, setEmailEnabled] = React.useState(true);
  const [smsEnabled, setSmsEnabled] = React.useState(true);
  const [autoRedirect, setAutoRedirect] = React.useState(true);

  return (
    <Card className={`p-6 bg-background ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold">Feedback Collection</h3>
          <p className="text-sm text-muted-foreground">
            Configure automated feedback requests and response flows
          </p>
        </div>

        <Tabs defaultValue="email" className="space-y-6">
          <TabsList>
            <TabsTrigger value="email">
              <MailIcon className="w-4 h-4 mr-2" />
              Email Templates
            </TabsTrigger>
            <TabsTrigger value="sms">
              <MessageSquareIcon className="w-4 h-4 mr-2" />
              SMS Templates
            </TabsTrigger>
          </TabsList>

          {/* Email Templates */}
          <TabsContent value="email" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Feedback Collection</Label>
                <p className="text-sm text-muted-foreground">
                  Send automated email requests with sentiment buttons
                </p>
              </div>
              <Switch
                checked={emailEnabled}
                onCheckedChange={setEmailEnabled}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email Subject</Label>
                <Input
                  placeholder="How was your experience with {business}?"
                  disabled={!emailEnabled}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Happy Face Button</Label>
                  <div className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <SmileIcon className="w-5 h-5 text-green-500" />
                      <Input
                        placeholder="Great!"
                        className="flex-1"
                        disabled={!emailEnabled}
                      />
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-muted-foreground mx-auto" />
                    <div className="flex items-center gap-2">
                      <ExternalLinkIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Redirect to Google Review
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sad Face Button</Label>
                  <div className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <FrownIcon className="w-5 h-5 text-red-500" />
                      <Input
                        placeholder="Not Great"
                        className="flex-1"
                        disabled={!emailEnabled}
                      />
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-muted-foreground mx-auto" />
                    <div className="flex items-center gap-2">
                      <MessageSquareIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Show Feedback Form
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email Body Template</Label>
                <Textarea
                  placeholder="Dear {name},\n\nThank you for choosing {business}. We'd love to hear about your experience!"
                  className="min-h-[100px]"
                  disabled={!emailEnabled}
                />
              </div>
            </div>
          </TabsContent>

          {/* SMS Templates */}
          <TabsContent value="sms" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Feedback Collection</Label>
                <p className="text-sm text-muted-foreground">
                  Send automated SMS requests with star rating system
                </p>
              </div>
              <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Initial SMS Template</Label>
                <Textarea
                  placeholder="Hi {name}, please rate your experience at {business} from 1-5 stars by replying with a number."
                  className="min-h-[100px]"
                  disabled={!smsEnabled}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>High Rating Response (4-5 ★)</Label>
                  <div className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <Textarea
                      placeholder="Thanks for the great rating! Would you mind sharing your experience on Google? {review_link}"
                      className="min-h-[100px]"
                      disabled={!smsEnabled}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Low Rating Response (1-3 ★)</Label>
                  <div className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <StarIcon className="w-4 h-4 text-gray-300" />
                      <StarIcon className="w-4 h-4 text-gray-300" />
                      <StarIcon className="w-4 h-4 text-gray-300" />
                    </div>
                    <Textarea
                      placeholder="We're sorry to hear that. Please let us know how we can improve: {feedback_link}"
                      className="min-h-[100px]"
                      disabled={!smsEnabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        {/* Global Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Feedback Flow Settings</h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatic Platform Redirect</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically redirect satisfied customers to leave reviews
                </p>
              </div>
              <Switch
                checked={autoRedirect}
                onCheckedChange={setAutoRedirect}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Positive Feedback Threshold</Label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="4" className="w-20" />
                  <span className="text-sm text-muted-foreground">
                    stars and above
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Review Platform Priority</Label>
                <div className="flex items-center gap-2">
                  <Input value="Google" className="flex-1" readOnly />
                  <Input value="Yelp" className="flex-1" readOnly />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </Card>
  );
};

export default FeedbackManager;
