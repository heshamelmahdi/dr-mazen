"use client";

import { useState } from "react";
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
  
  // Calculate which users have expired subscriptions
  const today = new Date();
  
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
                            <DropdownMenuItem onClick={() => router.push(`/dashboard/user-management/${user.id}`)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/dashboard/user-management/${user.id}/subscription`)}>
                              Manage Subscription
                            </DropdownMenuItem>
                            <DropdownMenuItem className={user.isActive ? "text-red-600" : "text-green-600"}>
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
    </div>
  );
} 