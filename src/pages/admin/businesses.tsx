import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SearchIcon,
  PlusIcon,
  BuildingIcon,
  StarIcon,
  UsersIcon,
  DollarSignIcon,
  LogInIcon,
  MoreVerticalIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Business {
  id: string;
  name: string;
  owner: string;
  email: string;
  plan: "free" | "pro" | "enterprise";
  status: "active" | "inactive" | "pending";
  users: number;
  reviews: number;
  avgRating: number;
  revenue: number;
  joinedAt: string;
}

const AdminBusinesses = () => {
  const [businesses, setBusinesses] = React.useState<Business[]>([
    {
      id: "1",
      name: "Acme Corp",
      owner: "John Smith",
      email: "john@acme.com",
      plan: "pro",
      status: "active",
      users: 25,
      reviews: 156,
      avgRating: 4.8,
      revenue: 2500,
      joinedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "TechStart Inc",
      owner: "Sarah Johnson",
      email: "sarah@techstart.com",
      plan: "enterprise",
      status: "active",
      users: 50,
      reviews: 312,
      avgRating: 4.6,
      revenue: 5000,
      joinedAt: "2024-02-01",
    },
  ]);

  const handleLoginAsBusiness = (business: Business) => {
    // Store business context
    localStorage.setItem("currentBusinessId", business.id);
    localStorage.setItem("currentBusinessName", business.name);
    // Redirect to dashboard
    window.location.href = "/";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Businesses</h2>
          <p className="text-sm text-muted-foreground">
            Manage and monitor business accounts
          </p>
        </div>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Business
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Businesses
          </h3>
          <p className="text-2xl font-bold mt-2">{businesses.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Users
          </h3>
          <p className="text-2xl font-bold mt-2">
            {businesses.reduce((sum, b) => sum + b.users, 0)}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Revenue
          </h3>
          <p className="text-2xl font-bold mt-2">
            $
            {businesses.reduce((sum, b) => sum + b.revenue, 0).toLocaleString()}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Avg Rating
          </h3>
          <p className="text-2xl font-bold mt-2">
            {(
              businesses.reduce((sum, b) => sum + b.avgRating, 0) /
              businesses.length
            ).toFixed(1)}
          </p>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search businesses..." className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Businesses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Reviews</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businesses.map((business) => (
              <TableRow key={business.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <BuildingIcon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{business.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {business.owner}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      business.plan === "enterprise"
                        ? "bg-purple-100 text-purple-800"
                        : business.plan === "pro"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800",
                    )}
                  >
                    {business.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      business.status === "active"
                        ? "bg-green-100 text-green-800"
                        : business.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800",
                    )}
                  >
                    {business.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <UsersIcon className="w-4 h-4 text-muted-foreground" />
                    {business.users}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    {business.avgRating} ({business.reviews})
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSignIcon className="w-4 h-4 text-green-500" />
                    {business.revenue.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(business.joinedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVerticalIcon className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleLoginAsBusiness(business)}
                      >
                        <LogInIcon className="w-4 h-4 mr-2" />
                        Login as Business
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Deactivate Business
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminBusinesses;
