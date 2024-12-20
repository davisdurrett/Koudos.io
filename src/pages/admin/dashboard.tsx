import React from "react";
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
  BuildingIcon,
  DollarSignIcon,
  ArrowUpIcon,
  MoreVerticalIcon,
  LogInIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminDashboard = () => {
  const [businesses] = React.useState([
    {
      id: "1",
      name: "Acme Corp",
      owner: "John Smith",
      email: "john@acme.com",
      plan: "monthly",
      status: "active",
      revenue: 49,
      nextBilling: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
    {
      id: "2",
      name: "TechStart Inc",
      owner: "Sarah Johnson",
      email: "sarah@techstart.com",
      plan: "annually",
      status: "active",
      revenue: 490,
      nextBilling: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
  ]);

  const handleLoginAsBusiness = (businessId: string) => {
    localStorage.setItem("currentBusinessId", businessId);
    window.location.href = "/";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Admin Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Monitor and manage all businesses
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Monthly Revenue
              </p>
              <p className="text-2xl font-bold mt-2">$539</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpIcon className="w-3 h-3 mr-1" />
                12% vs last month
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSignIcon className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Businesses
              </p>
              <p className="text-2xl font-bold mt-2">{businesses.length}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpIcon className="w-3 h-3 mr-1" />2 new this month
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <BuildingIcon className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </p>
              <p className="text-2xl font-bold mt-2">
                $
                {businesses
                  .reduce((sum, b) => sum + b.revenue, 0)
                  .toLocaleString()}
              </p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpIcon className="w-3 h-3 mr-1" />
                8% growth
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <DollarSignIcon className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search businesses..." className="pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="monthly">Monthly ($49/mo)</SelectItem>
              <SelectItem value="annually">Annual ($490/yr)</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Businesses Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Next Billing</TableHead>
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
                    className={
                      business.plan === "annually"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }
                  >
                    {business.plan === "annually"
                      ? "Annual Plan"
                      : "Monthly Plan"}
                  </Badge>
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSignIcon className="w-4 h-4 text-green-500" />
                    {business.revenue.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(business.nextBilling).toLocaleDateString()}
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
                        onClick={() => handleLoginAsBusiness(business.id)}
                      >
                        <LogInIcon className="w-4 h-4 mr-2" />
                        Login as Business
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Settings</DropdownMenuItem>
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

export default AdminDashboard;
