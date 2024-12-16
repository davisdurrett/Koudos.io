import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
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
  UserIcon,
  BuildingIcon,
  MailIcon,
  PhoneIcon,
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

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "owner" | "admin" | "staff";
  status: "active" | "inactive";
  businessName: string;
  businessId: string;
  lastActive: string;
}

const AdminUsers = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = React.useState<User[]>([
    {
      id: "1",
      businessId: "1",
      name: "John Smith",
      email: "john@acme.com",
      phone: "(555) 123-4567",
      role: "owner",
      status: "active",
      businessName: "Acme Corp",
      lastActive: new Date().toISOString(),
    },
    {
      id: "2",
      businessId: "2",
      name: "Sarah Johnson",
      email: "sarah@techstart.com",
      phone: "(555) 987-6543",
      role: "admin",
      status: "active",
      businessName: "TechStart Inc",
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      businessId: "1",
      name: "Mike Wilson",
      email: "mike@acme.com",
      phone: "(555) 456-7890",
      role: "staff",
      status: "inactive",
      businessName: "Acme Corp",
      lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [editForm, setEditForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    role: "staff" as const,
    status: "active" as const,
  });

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              ...editForm,
            }
          : user,
      ),
    );

    toast({
      title: "User Updated",
      description: "User details have been successfully updated.",
    });

    setIsEditDialogOpen(false);
  };

  const handleLoginAsUser = (user: User) => {
    // Store business context
    localStorage.setItem("currentBusinessId", user.businessId);
    localStorage.setItem("currentBusinessName", user.businessName);
    // Redirect to dashboard
    window.location.href = "/";
  };

  const handleDeactivateUser = (user: User) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? {
              ...u,
              status: "inactive",
            }
          : u,
      ),
    );

    toast({
      title: "User Deactivated",
      description: `${user.name} has been deactivated.`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Users</h2>
          <p className="text-sm text-muted-foreground">
            Manage users across all businesses
          </p>
        </div>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Users
          </h3>
          <p className="text-2xl font-bold mt-2">{users.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Active Users
          </h3>
          <p className="text-2xl font-bold mt-2">
            {users.filter((u) => u.status === "active").length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Business Owners
          </h3>
          <p className="text-2xl font-bold mt-2">
            {users.filter((u) => u.role === "owner").length}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Staff Members
          </h3>
          <p className="text-2xl font-bold mt-2">
            {users.filter((u) => u.role === "staff").length}
          </p>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" />
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="owner">Owners</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
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

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <BuildingIcon className="w-4 h-4 text-muted-foreground" />
                    {user.businessName}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      user.role === "owner"
                        ? "bg-purple-100 text-purple-800"
                        : user.role === "admin"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800",
                    )}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800",
                    )}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <MailIcon className="w-3 h-3 text-muted-foreground" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <PhoneIcon className="w-3 h-3 text-muted-foreground" />
                      {user.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(user.lastActive).toLocaleDateString()}
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
                      <DropdownMenuItem onClick={() => handleEditUser(user)}>
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleLoginAsUser(user)}>
                        <LogInIcon className="w-4 h-4 mr-2" />
                        Login as User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeactivateUser(user)}
                        className="text-red-600"
                      >
                        Deactivate User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={editForm.role}
                onValueChange={(value: "owner" | "admin" | "staff") =>
                  setEditForm((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={editForm.status}
                onValueChange={(value: "active" | "inactive") =>
                  setEditForm((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
