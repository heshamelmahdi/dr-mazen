# Admin Dashboard

This document outlines the implementation details for the Admin Dashboard of the nutrition website.

## Overview

The Admin Dashboard provides the doctor (admin) with tools to manage users, content, and view user-submitted questions. It includes sections for user management, program video management, recipe management, and Q&A management.

## File Location

```
src/app/dashboard/page.tsx
```

## Page Structure

The Admin Dashboard will be implemented as a server component that checks for admin privileges and renders the appropriate dashboard components.

## Components

### AdminDashboardPage (Server Component)

```typescript
// src/app/dashboard/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminDashboard from "@/components/dashboard/admin-dashboard";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  return <AdminDashboard />;
}
```

### AdminDashboard (Client Component)

```typescript
// src/components/dashboard/admin-dashboard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import RecentActivity from "@/components/dashboard/recent-activity";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard 
            title="Users"
            count="--"
            icon="👤"
            href="/dashboard/users"
            color="bg-blue-500"
          />
          <DashboardCard 
            title="Program Videos"
            count="--"
            icon="🎬"
            href="/dashboard/program"
            color="bg-green-500"
          />
          <DashboardCard 
            title="Recipes"
            count="--"
            icon="🍲"
            href="/dashboard/recipes"
            color="bg-orange-500"
          />
          <DashboardCard 
            title="Q&A"
            count="--"
            icon="❓"
            href="/dashboard/qa"
            color="bg-purple-500"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Activity
              </h2>
              <RecentActivity />
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <QuickActionButton 
                  label="Add New User"
                  href="/dashboard/users/new"
                  icon="👤"
                />
                <QuickActionButton 
                  label="Upload Program Video"
                  href="/dashboard/program/new"
                  icon="🎬"
                />
                <QuickActionButton 
                  label="Add New Recipe"
                  href="/dashboard/recipes/new"
                  icon="🍲"
                />
                <QuickActionButton 
                  label="Create Q&A Entry"
                  href="/dashboard/qa/new"
                  icon="❓"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  count: string;
  icon: string;
  href: string;
  color: string;
}

function DashboardCard({ title, count, icon, href, color }: DashboardCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className={`h-2 ${color}`}></div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-2xl font-bold mt-1">{count}</p>
            </div>
            <div className="text-3xl">{icon}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

interface QuickActionButtonProps {
  label: string;
  href: string;
  icon: string;
}

function QuickActionButton({ label, href, icon }: QuickActionButtonProps) {
  return (
    <Link href={href}>
      <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <div className="text-xl mr-3">{icon}</div>
        <span className="font-medium text-gray-700">{label}</span>
      </div>
    </Link>
  );
}
```

## User Management Section

### UsersPage (Server Component)

```typescript
// src/app/dashboard/users/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import UsersList from "@/components/dashboard/users/users-list";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Fetch all users
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          User Management
        </h1>
        <a 
          href="/dashboard/users/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New User
        </a>
      </div>
      
      <UsersList users={users} />
    </div>
  );
}
```

### NewUserPage (Server Component)

```typescript
// src/app/dashboard/users/new/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserForm from "@/components/dashboard/users/user-form";

export default async function NewUserPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Add New User
      </h1>
      
      <UserForm />
    </div>
  );
}
```

### UserForm Component

```typescript
// src/components/dashboard/users/user-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/dashboard/users/actions";

export default function UserForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const formData = new FormData(e.currentTarget);
      const result = await createUser(formData);
      
      if (result.success) {
        router.push("/dashboard/users");
        router.refresh();
      } else {
        setError(result.error || "Failed to create user");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="subscriptionEndDate" className="block text-sm font-medium text-gray-700 mb-1">
            Subscription End Date
          </label>
          <input
            type="date"
            id="subscriptionEndDate"
            name="subscriptionEndDate"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/users")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
}
```

## Program Video Management Section

### ProgramVideosPage (Server Component)

```typescript
// src/app/dashboard/program/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProgramVideosList from "@/components/dashboard/program/program-videos-list";

export default async function ProgramVideosPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Fetch all program videos
  const videos = await prisma.programVideo.findMany({
    orderBy: { sequenceNumber: 'asc' }
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Program Videos
        </h1>
        <a 
          href="/dashboard/program/new" 
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Upload New Video
        </a>
      </div>
      
      <ProgramVideosList videos={videos} />
    </div>
  );
}
```

### NewProgramVideoPage (Server Component)

```typescript
// src/app/dashboard/program/new/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProgramVideoForm from "@/components/dashboard/program/program-video-form";

export default async function NewProgramVideoPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Get the highest sequence number to suggest the next one
  const highestSequence = await prisma.programVideo.findFirst({
    orderBy: { sequenceNumber: 'desc' },
    select: { sequenceNumber: true }
  });
  
  const nextSequenceNumber = highestSequence ? highestSequence.sequenceNumber + 1 : 1;
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Upload New Program Video
      </h1>
      
      <ProgramVideoForm nextSequenceNumber={nextSequenceNumber} />
    </div>
  );
}
```

## Recipe Management Section

### RecipesAdminPage (Server Component)

```typescript
// src/app/dashboard/recipes/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import RecipesAdminList from "@/components/dashboard/recipes/recipes-admin-list";

export default async function RecipesAdminPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Fetch all recipes
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Recipe Management
        </h1>
        <a 
          href="/dashboard/recipes/new" 
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          Add New Recipe
        </a>
      </div>
      
      <RecipesAdminList recipes={recipes} />
    </div>
  );
}
```

### NewRecipePage (Server Component)

```typescript
// src/app/dashboard/recipes/new/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RecipeForm from "@/components/dashboard/recipes/recipe-form";

export default async function NewRecipePage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Add New Recipe
      </h1>
      
      <RecipeForm />
    </div>
  );
}
```

## Q&A Management Section

### QAAdminPage (Server Component)

```typescript
// src/app/dashboard/qa/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import QAAdminTabs from "@/components/dashboard/qa/qa-admin-tabs";

export default async function QAAdminPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  // Fetch all Q&A entries
  const qaEntries = await prisma.qAEntry.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  // Fetch all user questions
  const userQuestions = await prisma.userQuestion.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Q&A Management
        </h1>
        <a 
          href="/dashboard/qa/new" 
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Create New Q&A
        </a>
      </div>
      
      <QAAdminTabs qaEntries={qaEntries} userQuestions={userQuestions} />
    </div>
  );
}
```

### NewQAPage (Server Component)

```typescript
// src/app/dashboard/qa/new/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import QAForm from "@/components/dashboard/qa/qa-form";

export default async function NewQAPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Q&A Entry
      </h1>
      
      <QAForm />
    </div>
  );
}
```

## Server Actions

### User Management Actions

```typescript
// src/app/dashboard/users/actions.ts
"use server";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createUser(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const subscriptionEndDateStr = formData.get("subscriptionEndDate") as string;
  
  // Validate inputs
  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }
  
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return { success: false, error: "User with this email already exists" };
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10);
    
    // Parse subscription end date
    const subscriptionEndDate = subscriptionEndDateStr 
      ? new Date(subscriptionEndDateStr) 
      : undefined;
    
    // Create user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || undefined,
        role: "CLIENT",
        subscriptionEndDate,
      },
    });
    
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}

export async function updateUserSubscription(userId: string, subscriptionEndDate: Date) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }
  
  try {
    // Update user subscription
    await prisma.user.update({
      where: { id: userId },
      data: { subscriptionEndDate },
    });
    
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error updating subscription:", error);
    return { success: false, error: "Failed to update subscription" };
  }
}

export async function deactivateUser(userId: string) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }
  
  try {
    // Deactivate user
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });
    
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    console.error("Error deactivating user:", error);
    return { success: false, error: "Failed to deactivate user" };
  }
}
```

### Program Video Actions

```typescript
// src/app/dashboard/program/actions.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";

export async function createProgramVideo(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const sequenceNumber = parseInt(formData.get("sequenceNumber") as string);
  const videoFile = formData.get("video") as File;
  const thumbnailFile = formData.get("thumbnail") as File;
  
  // Validate inputs
  if (!title || !sequenceNumber || !videoFile) {
    return { success: false, error: "Title, sequence number, and video are required" };
  }
  
  try {
    // Upload video to S3
    const videoPath = await uploadToS3(videoFile, "program");
    
    // Upload thumbnail to S3 if provided
    let thumbnailPath = null;
    if (thumbnailFile && thumbnailFile.size > 0) {
      thumbnailPath = await uploadToS3(thumbnailFile, "thumbnails");
    }
    
    // Create program video
    await prisma.programVideo.create({
      data: {
        title,
        description: description || undefined,
        sequenceNumber,
        videoPath,
        thumbnailPath,
        durationSeconds: 0, // This would be updated after processing
        isActive: true
      }
    });
    
    revalidatePath("/dashboard/program");
    revalidatePath("/program");
    return { success: true };
  } catch (error) {
    console.error("Error creating program video:", error);
    return { success: false, error: "Failed to create program video" };
  }
}

export async function updateProgramVideo(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const sequenceNumber = parseInt(formData.get("sequenceNumber") as string);
  const videoFile = formData.get("video") as File;
  const thumbnailFile = formData.get("thumbnail") as File;
  
  // Validate inputs
  if (!title || !sequenceNumber) {
    return { success: false, error: "Title and sequence number are required" };
  }
  
  try {
    // Prepare update data
    const updateData: any = {
      title,
      description: description || undefined,
      sequenceNumber
    };
    
    // Upload new video if provided
    if (videoFile && videoFile.size > 0) {
      updateData.videoPath = await uploadToS3(videoFile, "program");
    }
    
    // Upload new thumbnail if provided
    if (thumbnailFile && thumbnailFile.size > 0) {
      updateData.thumbnailPath = await uploadToS3(thumbnailFile, "thumbnails");
    }
    
    // Update program video
    await prisma.programVideo.update({
      where: { id },
      data: updateData
    });
    
    revalidatePath("/dashboard/program");
    revalidatePath("/program");
    revalidatePath(`/program/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating program video:", error);
    return { success: false, error: "Failed to update program video" };
  }
}
```

### Recipe Actions

```typescript
// src/app/dashboard/recipes/actions.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";

export async function createRecipe(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const recipeType = formData.get("recipeType") as string;
  const youtubeUrl = formData.get("youtubeUrl") as string;
  const videoFile = formData.get("video") as File;
  const thumbnailFile = formData.get("thumbnail") as File;
  const calories = formData.get("calories") ? parseInt(formData.get("calories") as string) : null;
  const protein = formData.get("protein") ? parseFloat(formData.get("protein") as string) : null;
  const carbs = formData.get("carbs") ? parseFloat(formData.get("carbs") as string) : null;
  const fat = formData.get("fat") ? parseFloat(formData.get("fat") as string) : null;
  const mealType = formData.get("mealType") as string;
  const tagsString = formData.get("tags") as string;
  
  // Validate inputs
  if (!title || !recipeType) {
    return { success: false, error: "Title and recipe type are required" };
  }
  
  if (recipeType === "YOUTUBE" && !youtubeUrl) {
    return { success: false, error: "YouTube URL is required for YouTube recipes" };
  }
  
  if (recipeType === "SELF_HOSTED" && (!videoFile || videoFile.size === 0)) {
    return { success: false, error: "Video file is required for self-hosted recipes" };
  }
  
  try {
    // Process tags
    const tags = tagsString.split(",").map(tag => tag.trim()).filter(Boolean);
    
    // Prepare recipe data
    const recipeData: any = {
      title,
      description: description || undefined,
      recipeType: recipeType as "YOUTUBE" | "SELF_HOSTED",
      youtubeUrl: recipeType === "YOUTUBE" ? youtubeUrl : null,
      calories,
      protein,
      carbs,
      fat,
      mealType: mealType || undefined,
      tags,
      isActive: true
    };
    
    // Upload video if self-hosted
    if (recipeType === "SELF_HOSTED" && videoFile && videoFile.size > 0) {
      recipeData.videoPath = await uploadToS3(videoFile, "recipes");
    }
    
    // Upload thumbnail if provided
    if (thumbnailFile && thumbnailFile.size > 0) {
      recipeData.thumbnailPath = await uploadToS3(thumbnailFile, "thumbnails");
    }
    
    // Create recipe
    await prisma.recipe.create({
      data: recipeData
    });
    
    revalidatePath("/dashboard/recipes");
    revalidatePath("/recipes");
    return { success: true };
  } catch (error) {
    console.error("Error creating recipe:", error);
    return { success: false, error: "Failed to create recipe" };
  }
}
```

### Q&A Actions

```typescript
// src/app/dashboard/qa/actions.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";

export async function createQAEntry(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }
  
  const question = formData.get("question") as string;
  const answerType = formData.get("answerType") as string;
  const answerText = formData.get("answerText") as string;
  const audioFile = formData.get("audioFile") as File;
  const isPrivate = formData.get("isPrivate") === "true";
  
  // Validate inputs
  if (!question || !answerType) {
    return { success: false, error: "Question and answer type are required" };
  }
  
  if (answerType === "TEXT" && !answerText) {
    return { success: false, error: "Answer text is required for text answers" };
  }
  
  if (answerType === "AUDIO" && (!audioFile || audioFile.size === 0)) {
    return { success: false, error: "Audio file is required for audio answers" };
  }
  
  try {
    // Prepare Q&A data
    const qaData: any = {
      question,
      answerType: answerType as "TEXT" | "AUDIO",
      answerText: answerType === "TEXT" ? answerText : null,
      isPrivate,
      isActive: true
    };
    
    // Upload audio if provided
    if (answerType === "AUDIO" && audioFile && audioFile.size > 0) {
      qaData.answerAudioPath = await uploadToS3(audioFile, "qa-audio");
    }
    
    // Create Q&A entry
    await prisma.qAEntry.create({
      data: qaData
    });
    
    revalidatePath("/dashboard/qa");
    revalidatePath("/qa");
    return { success: true };
  } catch (error) {
    console.error("Error creating Q&A entry:", error);
    return { success: false, error: "Failed to create Q&A entry" };
  }
}

export async function answerUserQuestion(questionId: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }
  
  const answerType = formData.get("answerType") as string;
  const answerText = formData.get("answerText") as string;
  const audioFile = formData.get("audioFile") as File;
  const isPrivate = formData.get("isPrivate") === "true";
  
  // Validate inputs
  if (!answerType) {
    return { success: false, error: "Answer type is required" };
  }
  
  if (answerType === "TEXT" && !answerText) {
    return { success: false, error: "Answer text is required for text answers" };
  }
  
  if (answerType === "AUDIO" && (!audioFile || audioFile.size === 0)) {
    return { success: false, error: "Audio file is required for audio answers" };
  }
  
  try {
    // Get the user question
    const userQuestion = await prisma.userQuestion.findUnique({
      where: { id: questionId }
    });
    
    if (!userQuestion) {
      return { success: false, error: "Question not found" };
    }
    
    // Prepare Q&A data
    const qaData: any = {
      question: userQuestion.question,
      answerType: answerType as "TEXT" | "AUDIO",
      answerText: answerType === "TEXT" ? answerText : null,
      isPrivate,
      isActive: true
    };
    
    // Upload audio if provided
    if (answerType === "AUDIO" && audioFile && audioFile.size > 0) {
      qaData.answerAudioPath = await uploadToS3(audioFile, "qa-audio");
    }
    
    // Create Q&A entry
    await prisma.qAEntry.create({
      data: qaData
    });
    
    // Mark user question as answered
    await prisma.userQuestion.update({
      where: { id: questionId },
      data: { isAnswered: true }
    });
    
    revalidatePath("/dashboard/qa");
    revalidatePath("/qa");
    return { success: true };
  } catch (error) {
    console.error("Error answering user question:", error);
    return { success: false, error: "Failed to answer question" };
  }
}
```

## Data Operations

### Admin Dashboard

1. Authentication and authorization checks:
```typescript
const session = await getServerSession(authOptions);
if (!session) {
  redirect("/login");
}
if (session.user.role !== "ADMIN") {
  redirect("/unauthorized");
}
```

### User Management

1. Fetch all users:
```typescript
const users = await prisma.user.findMany({
  orderBy: { createdAt: 'desc' }
});
```

2. Create a new user:
```typescript
await prisma.user.create({
  data: {
    email,
    password: hashedPassword,
    name: name || undefined,
    role: "CLIENT",
    subscriptionEndDate,
  },
});
```

3. Update user subscription:
```typescript
await prisma.user.update({
  where: { id: userId },
  data: { subscriptionEndDate },
});
```

### Program Video Management

1. Fetch all program videos:
```typescript
const videos = await prisma.programVideo.findMany({
  orderBy: { sequenceNumber: 'asc' }
});
```

2. Get the highest sequence number:
```typescript
const highestSequence = await prisma.programVideo.findFirst({
  orderBy: { sequenceNumber: 'desc' },
  select: { sequenceNumber: true }
});
```

3. Create a new program video:
```typescript
await prisma.programVideo.create({
  data: {
    title,
    description: description || undefined,
    sequenceNumber,
    videoPath,
    thumbnailPath,
    durationSeconds: 0,
    isActive: true
  }
});
```

### Recipe Management

1. Fetch all recipes:
```typescript
const recipes = await prisma.recipe.findMany({
  orderBy: { createdAt: 'desc' }
});
```

2. Create a new recipe:
```typescript
await prisma.recipe.create({
  data: recipeData
});
```

### Q&A Management

1. Fetch all Q&A entries:
```typescript
const qaEntries = await prisma.qAEntry.findMany({
  orderBy: { createdAt: 'desc' }
});
```

2. Fetch all user questions:
```typescript
const userQuestions = await prisma.userQuestion.findMany({
  include: { user: true },
  orderBy: { createdAt: 'desc' }
});
```

3. Create a new Q&A entry:
```typescript
await prisma.qAEntry.create({
  data: qaData
});
```

4. Answer a user question:
```typescript
await prisma.qAEntry.create({
  data: qaData
});

await prisma.userQuestion.update({
  where: { id: questionId },
  data: { isAnswered: true }
});
```

## Authentication and Access

- **Role**: Accessible only to users with ADMIN role
- **Authentication**: Required
- **Authorization**: Checks user role before allowing access

## UI/UX Considerations

1. **Dashboard Overview**:
   - Card-based layout for key metrics
   - Quick access to common actions
   - Recent activity feed
   - Clear navigation to management sections

2. **User Management**:
   - List of all users with key information
   - Form for creating new users
   - Controls for updating subscription dates
   - Ability to deactivate users

3. **Content Management**:
   - Organized sections for program videos, recipes, and Q&A
   - Forms for creating and editing content
   - File upload interfaces for videos, images, and audio
   - Preview capabilities for content

4. **Responsive Design**:
   - Dashboard adapts to different screen sizes
   - Forms and tables are usable on mobile devices
   - Touch-friendly controls for mobile admin use

## Implementation Notes

1. The admin dashboard uses a combination of server and client components:
   - Server components for data fetching and authorization
   - Client components for interactive UI elements and forms

2. File uploads are handled through server actions:
   - Files are uploaded directly to S3
   - Paths are stored in the database
   - Presigned URLs are used for access

3. Form validation is implemented on both client and server:
   - Client-side validation for immediate feedback
   - Server-side validation for security
   - Clear error messages for validation failures

4. The design follows the brand identity established in the provided inspiration images:
   - Clean, minimalist aesthetic
   - Earthy color palette with section-specific accent colors
   - Soft, rounded shapes

5. Security is a priority:
   - All admin routes check for admin role
   - Server actions verify admin privileges
   - Password hashing for user creation

## Dependencies

- Next.js App Router
- NextAuth.js for authentication
- Prisma for database access
- AWS SDK for S3 file uploads
- Tailwind CSS for styling
- bcrypt for password hashing
