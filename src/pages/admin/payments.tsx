import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  DollarSignIcon,
  BuildingIcon,
  CreditCardIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ReceiptIcon,
  DownloadIcon,
  FilterIcon,
} from "lucide-react";

const AdminPayments = () => {
  const [payments] = React.useState([
    {
      id: "1",
      businessId: "1",
      businessName: "Acme Corp",
      amount: 99,
      status: "successful",
      type: "subscription",
      plan: "pro",
      date: new Date().toISOString(),
      paymentMethod: "**** 4242",
    },
    {
      id: "2",
      businessId: "2",
      businessName: "TechStart Inc",
      amount: 299,
      status: "successful",
      type: "subscription",
      plan: "enterprise",
      date: new Date().toISOString(),
      paymentMethod: "**** 5555",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Billing</h2>
          <p className="text-sm text-muted-foreground">
            Monitor revenue and manage subscriptions
          </p>
        </div>
        <Button>
          <DownloadIcon className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Monthly Revenue
              </p>
              <p className="text-2xl font-bold mt-2">$12,450</p>
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
                Active Subscriptions
              </p>
              <p className="text-2xl font-bold mt-2">156</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpIcon className="w-3 h-3 mr-1" />8 new this month
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
                Pro Plans
              </p>
              <p className="text-2xl font-bold mt-2">89</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpIcon className="w-3 h-3 mr-1" />5 upgrades
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <CreditCardIcon className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Enterprise Plans
              </p>
              <p className="text-2xl font-bold mt-2">24</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpIcon className="w-3 h-3 mr-1" />2 upgrades
              </p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <BuildingIcon className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="successful">Successful</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transactions Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <BuildingIcon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.businessName}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: {payment.businessId}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 font-medium">
                    <DollarSignIcon className="w-4 h-4" />
                    {payment.amount}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      payment.status === "successful"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{payment.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      payment.plan === "enterprise"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }
                  >
                    {payment.plan}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
                    {payment.paymentMethod}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(payment.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <ReceiptIcon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminPayments;
