"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { createUser, updateUser } from "@/app/(admin)/dashboard/user-management/actions";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "CLIENT";
  subscriptionEndDate: Date | null;
  isActive: boolean;
}

interface UserFormProps {
  user?: User;
  editMode?: boolean;
}

export default function UserForm({ user, editMode = false }: UserFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [role, setRole] = useState<"ADMIN" | "CLIENT">(user?.role || "CLIENT");
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<string>(
    user?.subscriptionEndDate ? new Date(user.subscriptionEndDate).toISOString().split("T")[0] : ""
  );
  const [isActive, setIsActive] = useState(user?.isActive !== false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("email", email);
      
      if (!editMode || password) {
        formData.append("password", password);
      }
      
      formData.append("name", name);
      formData.append("role", role);
      
      if (subscriptionEndDate) {
        formData.append("subscriptionEndDate", subscriptionEndDate);
      }
      
      formData.append("isActive", isActive.toString());
      
      if (editMode && user) {
        await updateUser(user.id, formData);
        toast.success("User updated successfully");
      } else {
        await createUser(formData);
        toast.success("User created successfully");
      }
      
      router.push("/dashboard/user-management");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">
                {editMode ? "New Password (leave blank to keep current)" : "Password *"}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!editMode}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as "ADMIN" | "CLIENT")}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="CLIENT">Client</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subscriptionEndDate">Subscription End Date</Label>
              <Input
                id="subscriptionEndDate"
                type="date"
                value={subscriptionEndDate}
                onChange={(e) => setSubscriptionEndDate(e.target.value)}
                disabled={isSubmitting}
              />
              {role === "ADMIN" && (
                <p className="text-xs text-gray-500 mt-1">Not applicable for admin users</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
                disabled={isSubmitting}
              />
              <Label htmlFor="isActive">Active Account</Label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/user-management")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editMode ? "Update User" : "Create User"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 