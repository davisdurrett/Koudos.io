import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  BuildingIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  ImageIcon,
  ArrowRightIcon,
  GiftIcon,
} from "lucide-react";

interface BusinessDetails {
  name: string;
  googleReviewUrl: string;
  incentiveMessage: string;
  contactEmail: string;
  phoneNumber: string;
  logo: File | null;
  feedbackEmail: string;
}

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [details, setDetails] = React.useState<BusinessDetails>({
    name: "",
    googleReviewUrl: "",
    incentiveMessage: "",
    contactEmail: "",
    phoneNumber: "",
    logo: null,
    feedbackEmail: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDetails((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically send the data to your backend
      const formData = new FormData();
      Object.entries(details).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "Business details saved successfully",
      });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save business details",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to Koudos
          </h1>
          <p className="text-muted-foreground">
            Let's get your business set up to start collecting reviews
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            {/* Business Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" />
                <h2 className="text-lg font-medium">Business Information</h2>
              </div>
              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input
                    value={details.name}
                    onChange={(e) =>
                      setDetails((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter your business name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Google Review URL</Label>
                  <Input
                    value={details.googleReviewUrl}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        googleReviewUrl: e.target.value,
                      }))
                    }
                    placeholder="Your Google Business review URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Incentive Message (Optional)</Label>
                  <Input
                    value={details.incentiveMessage}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        incentiveMessage: e.target.value,
                      }))
                    }
                    placeholder="e.g., 10% off your next visit"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Business Logo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MailIcon className="w-5 h-5" />
                <h2 className="text-lg font-medium">Contact Information</h2>
              </div>
              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Business Email</Label>
                  <Input
                    type="email"
                    value={details.contactEmail}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        contactEmail: e.target.value,
                      }))
                    }
                    placeholder="contact@yourbusiness.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Business Phone</Label>
                  <Input
                    type="tel"
                    value={details.phoneNumber}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Feedback Email Recipient</Label>
                  <Input
                    type="email"
                    value={details.feedbackEmail}
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        feedbackEmail: e.target.value,
                      }))
                    }
                    placeholder="Where to send internal feedback"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                onClick={handleSubmit}
                disabled={
                  !details.name ||
                  !details.googleReviewUrl ||
                  !details.contactEmail ||
                  !details.phoneNumber ||
                  !details.feedbackEmail
                }
              >
                Complete Setup
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;
