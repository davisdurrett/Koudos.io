import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  UsersIcon,
  BuildingIcon,
  MessageSquareIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Admin Dashboard
        </h2>
        <p className="text-sm text-muted-foreground">
          Overview of all businesses and users
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Businesses
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold">156</h3>
                <span className="text-sm text-green-600 flex items-center">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +12
                </span>
              </div>
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
                Total Users
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold">892</h3>
                <span className="text-sm text-green-600 flex items-center">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +48
                </span>
              </div>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <UsersIcon className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total SMS Sent
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold">15.2k</h3>
                <span className="text-sm text-green-600 flex items-center">
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                  +1.2k
                </span>
              </div>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <MessageSquareIcon className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Businesses
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold">92%</h3>
                <span className="text-sm text-red-600 flex items-center">
                  <ArrowDownIcon className="w-3 h-3 mr-1" />
                  -2%
                </span>
              </div>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <BuildingIcon className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Businesses */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Businesses</h3>
        <div className="space-y-4">
          {[
            {
              name: "Acme Corp",
              users: 24,
              smsSent: 1284,
              status: "active",
            },
            {
              name: "TechStart Inc",
              users: 12,
              smsSent: 856,
              status: "active",
            },
            {
              name: "Global Services LLC",
              users: 8,
              smsSent: 432,
              status: "inactive",
            },
          ].map((business, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BuildingIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{business.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={
                        business.status === "active" ? "default" : "secondary"
                      }
                    >
                      {business.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {business.users} users
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {business.smsSent} SMS sent
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
