import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeftIcon,
  BuildingIcon,
  UserIcon,
  StarIcon,
  DollarSignIcon,
  SaveIcon,
  LogInIcon,
  CreditCardIcon,
  ReceiptIcon,
} from "lucide-react";

const AdminBusinessDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [business, setBusiness] = React.useState({
    id,
    name: "Acme Corp",
    owner: "John Smith",
    email: "john@acme.com",
    phone: "(555) 123-4567",
    address: "123 Business St, City, ST 12345",
    plan: "pro",
    status: "active",
    users: 25,
    reviews: 156,
    avgRating: 4.8,
    revenue: 2500,
    joinedAt: "2024-01-15",
    billingInfo: {
      card: "**** 4242",
      expiryDate: "12/25",
      nextBillingDate: "2024-03-15",
    },
  });

  const handleLoginAsBusiness = () => {
    localStorage.setItem("currentBusinessId", business.id!);
    localStorage.setItem("currentBusinessName", business.name);
    window.location.href = "/";
  };

  const handleSave = () => {
    toast({
      title: "Changes Saved",
      description: "Business details have been updated successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/businesses")}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Business Details
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage business information and settings
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleLoginAsBusiness}>
            <LogInIcon className="w-4 h-4 mr-2" />
            Login as Business
          </Button>
          <Button onClick={handleSave}>
            <SaveIcon className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Users
              </p>
              <p className="text-2xl font-bold mt-2">{business.users}</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <UserIcon className="w-4 h-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Reviews
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <p className="text-2xl font-bold">{business.reviews}</p>
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  {business.avgRating}
                </div>
              </div>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <StarIcon className="w-4 h-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Monthly Revenue
              </p>
              <p className="text-2xl font-bold mt-2">
                ${business.revenue.toLocaleString()}
              </p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <DollarSignIcon className="w-4 h-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Status
              </p>
              <div className="mt-2">
                <Badge
                  variant="secondary"
                  className={
                    business.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {business.status}
                </Badge>
              </div>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <BuildingIcon className="w-4 h-4 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Business Details</TabsTrigger>
          <TabsTrigger value="billing">Billing & Subscription</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input
                    value={business.name}
                    onChange={(e) =>
                      setBusiness((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Owner Name</Label>
                  <Input
                    value={business.owner}
                    onChange={(e) =>
                      setBusiness((prev) => ({
                        ...prev,
                        owner: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={business.email}
                    onChange={(e) =>
                      setBusiness((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={business.phone}
                    onChange={(e) =>
                      setBusiness((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label>Address</Label>
                  <Input
                    value={business.address}
                    onChange={(e) =>
                      setBusiness((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Plan</Label>
                  <Select
                    value={business.plan}
                    onValueChange={(value) =>
                      setBusiness((prev) => ({ ...prev, plan: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={business.status}
                    onValueChange={(value) =>
                      setBusiness((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">Current Plan</h3>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={
                        business.plan === "enterprise"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }
                    >
                      {business.plan}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      $99/month
                    </span>
                  </div>
                </div>
                <Button variant="outline">Change Plan</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <div className="flex items-center gap-4">
                  <div className="p-4 border rounded-lg flex items-center gap-3">
                    <CreditCardIcon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{business.billingInfo.card}</p>
                      <p className="text-sm text-muted-foreground">
                        Expires {business.billingInfo.expiryDate}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Update Card</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Billing History</h3>
                  <Button variant="outline">
                    <ReceiptIcon className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                </div>

                <div className="space-y-2">
                  {[
                    {
                      date: "2024-02-15",
                      amount: 99,
                      status: "paid",
                    },
                    {
                      date: "2024-01-15",
                      amount: 99,
                      status: "paid",
                    },
                  ].map((invoice) => (
                    <div
                      key={invoice.date}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          ${invoice.amount} - {business.plan} Plan
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
                          <ReceiptIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminBusinessDetails;
