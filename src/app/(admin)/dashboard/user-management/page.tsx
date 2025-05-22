import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import UserManagementContent from "@/components/dashboard/user-management/user-management-content";

export default async function UserManagementPage() {
  const session = await getServerSession(authOptions);
  
  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Fetch all users
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  return <UserManagementContent users={users} />;
}
