import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import UserForm from "@/components/dashboard/user-management/user-form";

export default async function CreateUserPage() {
  const session = await getServerSession(authOptions);
  
  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New User</h1>
      <UserForm />
    </div>
  );
} 