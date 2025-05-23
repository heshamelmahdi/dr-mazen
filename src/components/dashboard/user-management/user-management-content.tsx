"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import Link from "next/link";
import { formatDate } from "@/lib/utils/date-utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toggleUserActive, updateUser } from "@/app/(admin)/dashboard/user-management/actions";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  subscriptionEndDate: Date | null;
  createdAt: Date;
  isActive: boolean;
}

interface UserManagementContentProps {
  users: User[];
}

export default function UserManagementContent({ users }: UserManagementContentProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Calculate which users have expired subscriptions
  const today = new Date();

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleToggleUserStatus = async (userId: string) => {
    setIsLoading(true);
    try {
      await toggleUserActive(userId);
      router.refresh();
    } catch (error) {
      console.error('Error toggling user status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await updateUser(selectedUser.id, formData);
      // Programmatically close the dialog using the DialogClose ref
      if (closeButtonRef.current) {
        closeButtonRef.current.click();
      }
      router.refresh();
    } catch (error) {
      console.error('Error updating user:', error);
      setIsLoading(false);
    }
  };

  // Clean up function when dialog closes
  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      // Force a complete page reload
      window.location.reload();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={() => router.push("/dashboard/user-management/create")}>
          Add New User
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-center py-4 text-gray-500">No users found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Subscription Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  // Determine subscription status
                  let subscriptionStatus = "No subscription";
                  let statusClass = "bg-gray-100 text-gray-800";
                  
                  if (user.subscriptionEndDate) {
                    if (user.subscriptionEndDate < today) {
                      subscriptionStatus = "Expired";
                      statusClass = "bg-red-100 text-red-800";
                    } else {
                      const daysLeft = Math.ceil((user.subscriptionEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      
                      if (daysLeft <= 7) {
                        subscriptionStatus = `Expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`;
                        statusClass = "bg-yellow-100 text-yellow-800";
                      } else {
                        subscriptionStatus = `Active (${formatDate(user.subscriptionEndDate)})`;
                        statusClass = "bg-green-100 text-green-800";
                      }
                    }
                  }
                  
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name || "—"}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "ADMIN" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                          {subscriptionStatus}
                        </span>
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className={user.isActive ? "text-red-600" : "text-green-600"}
                              onClick={() => handleToggleUserStatus(user.id)}
                            >
                              {user.isActive ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateUser}>
            <div className="grid gap-4 py-4">
              <input type="hidden" name="id" value={selectedUser?.id || ''} />
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedUser?.name || ''}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={selectedUser?.email || ''}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Leave blank to keep current password"
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subscriptionEndDate" className="text-right">
                  Subscription End
                </Label>
                <Input
                  id="subscriptionEndDate"
                  name="subscriptionEndDate"
                  type="date"
                  defaultValue={selectedUser?.subscriptionEndDate ? 
                    new Date(selectedUser.subscriptionEndDate).toISOString().split('T')[0] : 
                    ''}
                  className="col-span-3"
                />
              </div>
              
              <input 
                type="hidden" 
                name="role" 
                value={selectedUser?.role || 'CLIENT'} 
              />
              
              <input 
                type="hidden" 
                name="isActive" 
                value={selectedUser?.isActive ? 'true' : 'false'} 
              />
            </div>
            <DialogFooter className="flex justify-between">
              <DialogClose asChild>
                <Button type="button" variant="outline" ref={closeButtonRef}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 