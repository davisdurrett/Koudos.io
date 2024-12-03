import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-[400px] p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-koudos mb-2">Koudos</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your reviews
          </p>
        </div>

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

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </Button>
            <Button
              type="button"
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => navigate("/signup")}
            >
              Create account
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
