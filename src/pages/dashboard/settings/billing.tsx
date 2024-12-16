import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCardIcon,
  CheckIcon,
  DownloadIcon,
  StarIcon,
  ZapIcon,
  HeartIcon,
  SparklesIcon,
  FormInputIcon,
  LineChartIcon,
  GlobeIcon,
  UsersIcon,
  HeadphonesIcon,
  ArrowRightIcon,
} from "lucide-react";

const plans = {
  monthly: {
    name: "Monthly",
    price: 499,
    billingAmount: 499,
    billingPeriod: "monthly",
    features: [
      "Automated Review Requests",
      "Rating-Based Routing",
      "Reputation Recovery Tools",
      "AI-Powered Review Responses",
      "Customizable Feedback Forms",
      "Advanced Analytics Dashboard",
      "Sentiment Analysis for Customer Feedback",
      "Google Business Profile Integration",
      "CRM Integration",
      "Unlimited User Access for Teams",
      "Hands-On Onboarding with the Koudos Team",
      "Email Support & FAQ Access",
    ],
  },
  annually: {
    name: "Annual",
    price: 399,
    billingAmount: 4788,
    billingPeriod: "annually",
    features: [
      "Automated Review Requests",
      "Rating-Based Routing",
      "Reputation Recovery Tools",
      "AI-Powered Review Responses",
      "Customizable Feedback Forms",
      "Advanced Analytics Dashboard",
      "Sentiment Analysis for Customer Feedback",
      "Google Business Profile Integration",
      "CRM Integration",
      "Unlimited User Access for Teams",
      "Hands-On Onboarding with the Koudos Team",
      "Email Support & FAQ Access",
    ],
  },
};

const getFeatureIcon = (feature: string) => {
  if (feature.includes("AI-Powered"))
    return <SparklesIcon className="w-4 h-4" />;
  if (feature.includes("Review") && !feature.includes("Rating"))
    return <StarIcon className="w-4 h-4" />;
  if (feature.includes("Routing"))
    return <ArrowRightIcon className="w-4 h-4" />;
  if (feature.includes("Analytics"))
    return <LineChartIcon className="w-4 h-4" />;
  if (feature.includes("Team")) return <UsersIcon className="w-4 h-4" />;
  if (feature.includes("Support"))
    return <HeadphonesIcon className="w-4 h-4" />;
  if (feature.includes("Google") || feature.includes("CRM"))
    return <GlobeIcon className="w-4 h-4" />;
  if (feature.includes("Recovery")) return <HeartIcon className="w-4 h-4" />;
  if (feature.includes("Automated")) return <ZapIcon className="w-4 h-4" />;
  if (feature.includes("Form")) return <FormInputIcon className="w-4 h-4" />;
  return <CheckIcon className="w-4 h-4" />;
};

const BillingPage = () => {
  const [currentPlan] = React.useState("monthly");

  const annualSavings = (499 - 399) * 12;

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">Current Plan</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {plans[currentPlan as keyof typeof plans].name}
              </Badge>
              <span className="text-sm text-muted-foreground">
                ${plans[currentPlan as keyof typeof plans].price}/month
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">**** 4242</span>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:bg-red-50"
            >
              Cancel Subscription
            </Button>
          </div>
        </div>
      </Card>

      {/* Plans */}
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(plans).map(([key, plan]) => (
          <Card
            key={key}
            className={`p-6 space-y-6 ${key === currentPlan ? "border-primary" : ""}`}
          >
            <div className="space-y-2">
              <h3 className="font-medium">{plan.name}</h3>
              <div className="text-3xl font-bold">${plan.price}</div>
              <p className="text-sm text-muted-foreground">per month</p>
              <p className="text-sm text-muted-foreground">
                Billed {plan.billingPeriod} at ${plan.billingAmount}
              </p>
              {key === "annually" && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Save ${annualSavings}/year
                </Badge>
              )}
            </div>
            <Separator />
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  {getFeatureIcon(feature)}
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              variant={key === currentPlan ? "secondary" : "default"}
              disabled={key === currentPlan}
            >
              {key === currentPlan ? "Current Plan" : `Switch to ${plan.name}`}
            </Button>
          </Card>
        ))}
      </div>

      {/* Invoices */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Invoices</h3>
            <Button variant="outline">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>
          <div className="space-y-2">
            {[
              {
                date: "2024-02-15",
                amount: 499,
                status: "paid",
              },
              {
                date: "2024-01-15",
                amount: 499,
                status: "paid",
              },
            ].map((invoice) => (
              <div
                key={invoice.date}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    ${invoice.amount} - Monthly Plan
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(invoice.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {invoice.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <DownloadIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BillingPage;
