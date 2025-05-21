"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

// Create a new user
export async function createUser(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as "ADMIN" | "CLIENT";
  const subscriptionEndDateStr = formData.get("subscriptionEndDate") as string;
  const isActive = formData.get("isActive") === "true";
  
  // Validate inputs
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });
  
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  
  // Hash password
  const hashedPassword = await hash(password, 10);
  
  // Parse subscription end date
  const subscriptionEndDate = subscriptionEndDateStr 
    ? new Date(subscriptionEndDateStr) 
    : null;
  
  // Create user
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: name || null,
      role,
      subscriptionEndDate,
      isActive,
    },
  });
  
  revalidatePath("/dashboard/user-management");
}

// Update an existing user
export async function updateUser(userId: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as "ADMIN" | "CLIENT";
  const subscriptionEndDateStr = formData.get("subscriptionEndDate") as string;
  const isActive = formData.get("isActive") === "true";
  
  // Validate inputs
  if (!email) {
    throw new Error("Email is required");
  }
  
  // Check if another user has this email
  const existingUser = await prisma.user.findFirst({
    where: { 
      email,
      NOT: { id: userId }
    }
  });
  
  if (existingUser) {
    throw new Error("Another user with this email already exists");
  }
  
  // Prepare update data
  const updateData: any = {
    email,
    name: name || null,
    role,
    isActive,
  };
  
  // Update password if provided
  if (password) {
    updateData.password = await hash(password, 10);
  }
  
  // Update subscription end date if provided
  if (subscriptionEndDateStr) {
    updateData.subscriptionEndDate = new Date(subscriptionEndDateStr);
  } else {
    updateData.subscriptionEndDate = null;
  }
  
  // Update user
  await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
  
  revalidatePath("/dashboard/user-management");
}

// Update user subscription
export async function updateUserSubscription(userId: string, subscriptionEndDate: Date) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  
  // Update user subscription
  await prisma.user.update({
    where: { id: userId },
    data: { subscriptionEndDate },
  });
  
  revalidatePath("/dashboard/user-management");
}

// Toggle user active status
export async function toggleUserActive(userId: string) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  
  // Get current status
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isActive: true }
  });
  
  if (!user) {
    throw new Error("User not found");
  }
  
  // Toggle status
  await prisma.user.update({
    where: { id: userId },
    data: { isActive: !user.isActive },
  });
  
  revalidatePath("/dashboard/user-management");
} 