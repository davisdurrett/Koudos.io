import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-[400px] p-8">
        <Button
          variant="ghost"
          className="mb-4 -ml-2"
          onClick={() => navigate("/signin")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-koudos mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-muted-foreground">
            {!submitted
              ? "Enter your email to receive reset instructions"
              : "Check your email for reset instructions"}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Send Reset Instructions
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              We've sent password reset instructions to your email address.
              Please check your inbox and follow the link to reset your
              password.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSubmitted(false)}
            >
              Resend Instructions
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
