import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  SmileIcon,
  MehIcon,
  FrownIcon,
  MailIcon,
  MessageSquareIcon,
  PencilIcon,
  PhoneIcon,
  ExternalLinkIcon,
} from "lucide-react";
import EmailTemplateEditor from "./EmailTemplateEditor";

interface FeedbackManagerProps {
  className?: string;
}

const FeedbackManager = ({ className = "" }: FeedbackManagerProps) => {
  const [emailEnabled, setEmailEnabled] = React.useState(true);
  const [smsEnabled, setSmsEnabled] = React.useState(true);
  const [isTemplateEditorOpen, setIsTemplateEditorOpen] = React.useState(false);
  const [showEmailPreview, setShowEmailPreview] = React.useState(false);
  const [showSMSPreview, setShowSMSPreview] = React.useState(false);

  const renderEmailPreview = () => (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Email Preview</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowEmailPreview(false)}
        >
          ×
        </Button>
      </div>
      <div className="space-y-4 bg-white p-4 rounded shadow-sm">
        <div className="flex justify-center gap-8">
          <Button
            variant="ghost"
            className="flex-col gap-2 hover:bg-green-50"
            onClick={() => window.open("https://g.page/review/...", "_blank")}
          >
            <SmileIcon className="w-8 h-8 text-green-500" />
            <span className="text-sm">Great!</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col gap-2 hover:bg-yellow-50"
            onClick={() => window.open("https://feedback/...", "_blank")}
          >
            <MehIcon className="w-8 h-8 text-yellow-500" />
            <span className="text-sm">Okay</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col gap-2 hover:bg-red-50"
            onClick={() => window.open("https://feedback/...", "_blank")}
          >
            <FrownIcon className="w-8 h-8 text-red-500" />
            <span className="text-sm">Not Good</span>
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSMSPreview = () => (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">SMS Preview</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSMSPreview(false)}
        >
          ×
        </Button>
      </div>
      <div className="space-y-4">
        <div className="bg-muted p-3 rounded-lg max-w-[80%]">
          Hi John, how was your experience at Acme Inc? Reply with a number 1-5
          (1=poor, 5=excellent)
        </div>
        <div className="bg-primary/10 p-3 rounded-lg max-w-[80%] ml-auto">
          5
        </div>
        <div className="bg-muted p-3 rounded-lg max-w-[80%]">
          Thanks for the great rating! Would you mind sharing your experience on
          Google? https://g.page/review/...
        </div>
      </div>
    </div>
  );

  return (
    <Card className={`p-6 bg-background ${className}`}>
      <div className="space-y-6">
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
              Email Template
            </TabsTrigger>
            <TabsTrigger value="sms">
              <MessageSquareIcon className="w-4 h-4 mr-2" />
              SMS Template
            </TabsTrigger>
          </TabsList>

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
              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MailIcon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">
                        Feedback Request Email
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Sent after customer interaction
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowEmailPreview(!showEmailPreview)}
                    >
                      {showEmailPreview ? "Hide Preview" : "Show Preview"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsTemplateEditorOpen(true)}
                    >
                      <PencilIcon className="w-4 h-4 mr-2" />
                      Edit Template
                    </Button>
                  </div>
                </div>
                {showEmailPreview && renderEmailPreview()}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sms" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Feedback Collection</Label>
                <p className="text-sm text-muted-foreground">
                  Send automated SMS requests with rating system
                </p>
              </div>
              <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
            </div>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">SMS Rating Request</p>
                      <p className="text-sm text-muted-foreground">
                        1-5 rating collection via text
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSMSPreview(!showSMSPreview)}
                  >
                    {showSMSPreview ? "Hide Preview" : "Show Preview"}
                  </Button>
                </div>
                {showSMSPreview && renderSMSPreview()}
              </div>

              <div className="space-y-2">
                <Label>Initial Message</Label>
                <Textarea
                  placeholder="Hi {name}, how was your experience at {business}? Reply with a number 1-5 (1=poor, 5=excellent)"
                  className="min-h-[100px]"
                  disabled={!smsEnabled}
                />
              </div>

              <div className="space-y-2">
                <Label>Follow-up Messages</Label>
                <div className="grid gap-4">
                  <Textarea
                    placeholder="Thanks for the great rating! Would you mind sharing your experience on Google? {review_link}"
                    className="min-h-[100px]"
                    disabled={!smsEnabled}
                  />
                  <p className="text-sm text-muted-foreground">
                    This message is sent for ratings 4-5
                  </p>
                  <Textarea
                    placeholder="We're sorry to hear that. Please let us know how we can improve: {feedback_link}"
                    className="min-h-[100px]"
                    disabled={!smsEnabled}
                  />
                  <p className="text-sm text-muted-foreground">
                    This message is sent for ratings 1-3
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>

      <Dialog
        open={isTemplateEditorOpen}
        onOpenChange={setIsTemplateEditorOpen}
      >
        <DialogContent className="max-w-6xl h-[80vh] overflow-hidden">
          <EmailTemplateEditor
            defaultTemplate={{
              id: "1",
              name: "Feedback Request Email",
              subject: "How was your experience?",
              content:
                "Dear {name},\n\nThank you for choosing {business}. We'd love to hear about your experience!\n\nPlease click one of the buttons below to share your feedback.\n\nBest regards,\n{business_name}",
              style: {
                backgroundColor: "#ffffff",
                textColor: "#333333",
                accentColor: "#FF6B2B",
                fontFamily: "Arial",
                fontSize: "16px",
                buttonStyle: "rounded",
                showSocialLinks: false,
              },
            }}
            onSave={() => setIsTemplateEditorOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default FeedbackManager;
