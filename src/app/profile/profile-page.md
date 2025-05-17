# Profile Page

This document outlines the implementation details for the Profile page of the nutrition website.

## Overview

The Profile page allows users to view their account information, subscription status, and track their progress through the program videos. It provides a personalized dashboard for each user.

## File Location

```
src/app/profile/page.tsx
```

## Page Structure

The Profile page will be implemented as a server component that fetches user data and progress information, then passes this data to client components for rendering.

## Components

### ProfilePage (Server Component)

```typescript
// src/app/profile/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import ProfileContent from "@/components/profile/profile-content";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if client's subscription is expired
  if (
    session.user.role === "CLIENT" && 
    session.user.subscriptionEndDate && 
    new Date(session.user.subscriptionEndDate) < new Date()
  ) {
    redirect("/subscription-expired");
  }
  
  // Fetch user details
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });
  
  if (!user) {
    redirect("/login");
  }
  
  // Fetch user's video progress
  const videoProgress = await prisma.videoProgress.findMany({
    where: { userId: user.id },
    include: { video: true }
  });
  
  // Fetch total number of videos for progress calculation
  const totalVideos = await prisma.programVideo.count({
    where: { isActive: true }
  });
  
  // Calculate overall progress
  const completedVideos = videoProgress.filter(progress => progress.isCompleted).length;
  const progressPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
  
  return (
    <ProfileContent 
      user={user}
      videoProgress={videoProgress}
      totalVideos={totalVideos}
      completedVideos={completedVideos}
      progressPercentage={progressPercentage}
    />
  );
}
```

### ProfileContent (Client Component)

```typescript
// src/components/profile/profile-content.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { formatDate } from "@/lib/utils/date-utils";
import ProgressBar from "@/components/shared/progress-bar";
import VideoProgressList from "@/components/profile/video-progress-list";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  subscriptionEndDate: Date | null;
  createdAt: Date;
}

interface VideoWithProgress {
  video: {
    id: string;
    title: string;
    sequenceNumber: number;
    durationSeconds: number | null;
  };
  isCompleted: boolean;
  watchedSeconds: number;
  lastWatchedAt: Date;
}

interface ProfileContentProps {
  user: User;
  videoProgress: VideoWithProgress[];
  totalVideos: number;
  completedVideos: number;
  progressPercentage: number;
}

export default function ProfileContent({
  user,
  videoProgress,
  totalVideos,
  completedVideos,
  progressPercentage
}: ProfileContentProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  
  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  };
  
  const daysUntilExpiration = user.subscriptionEndDate 
    ? Math.max(0, Math.ceil((new Date(user.subscriptionEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : null;
  
  return (
    <div className="min-h-screen bg-cream-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          Your Profile
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Account Information */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Account Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{user.name || "Not set"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-medium">{user.role === "ADMIN" ? "Administrator" : "Client"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{formatDate(user.createdAt)}</p>
                </div>
                
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  {isSigningOut ? "Signing Out..." : "Sign Out"}
                </button>
              </div>
            </div>
          </div>
          
          {/* Subscription Status */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Subscription Status
              </h2>
              
              {user.subscriptionEndDate ? (
                <div>
                  <div className={`p-4 rounded-lg mb-4 ${
                    daysUntilExpiration && daysUntilExpiration < 7 
                      ? "bg-yellow-50 text-yellow-800" 
                      : "bg-green-50 text-green-800"
                  }`}>
                    <div className="flex items-center">
                      <div className={`text-2xl mr-3 ${
                        daysUntilExpiration && daysUntilExpiration < 7 
                          ? "text-yellow-500" 
                          : "text-green-500"
                      }`}>
                        {daysUntilExpiration && daysUntilExpiration < 7 ? "⚠️" : "✓"}
                      </div>
                      <div>
                        <p className="font-medium">
                          {daysUntilExpiration && daysUntilExpiration < 7 
                            ? "Your subscription is ending soon" 
                            : "Your subscription is active"}
                        </p>
                        <p className="text-sm">
                          {daysUntilExpiration === 0 
                            ? "Your subscription expires today" 
                            : `Expires on ${formatDate(user.subscriptionEndDate)}`}
                        </p>
                        {daysUntilExpiration && daysUntilExpiration < 7 && (
                          <p className="text-sm mt-2">
                            Please contact your nutrition doctor to extend your subscription.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 text-gray-700 rounded-lg">
                  <p>No subscription end date set. Please contact your nutrition doctor.</p>
                </div>
              )}
            </div>
            
            {/* Program Progress */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">
                Program Progress
              </h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Overall Progress</span>
                  <span className="text-gray-700 font-medium">{progressPercentage}%</span>
                </div>
                <ProgressBar percentage={progressPercentage} />
                <p className="mt-2 text-sm text-gray-600">
                  {completedVideos} of {totalVideos} videos completed
                </p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-700">Recent Activity</h3>
                  <button
                    onClick={() => router.push("/program")}
                    className="text-green-600 text-sm hover:underline"
                  >
                    View All Videos
                  </button>
                </div>
                
                <VideoProgressList videoProgress={videoProgress} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### VideoProgressList Component

```typescript
// src/components/profile/video-progress-list.tsx
"use client";

import { useRouter } from "next/navigation";
import { formatDate, formatDuration } from "@/lib/utils/date-utils";

interface VideoWithProgress {
  video: {
    id: string;
    title: string;
    sequenceNumber: number;
    durationSeconds: number | null;
  };
  isCompleted: boolean;
  watchedSeconds: number;
  lastWatchedAt: Date;
}

interface VideoProgressListProps {
  videoProgress: VideoWithProgress[];
}

export default function VideoProgressList({ videoProgress }: VideoProgressListProps) {
  const router = useRouter();
  
  // Sort by last watched date (most recent first)
  const sortedProgress = [...videoProgress].sort(
    (a, b) => new Date(b.lastWatchedAt).getTime() - new Date(a.lastWatchedAt).getTime()
  );
  
  // Take only the 5 most recent
  const recentProgress = sortedProgress.slice(0, 5);
  
  if (recentProgress.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600">
          You haven't watched any videos yet. Start your journey now!
        </p>
        <button
          onClick={() => router.push("/program")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Go to Program
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {recentProgress.map((progress) => (
        <div 
          key={progress.video.id}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
          onClick={() => router.push(`/program/${progress.video.id}`)}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-gray-800">
                {progress.video.title}
              </h4>
              <p className="text-sm text-gray-500">
                Video {progress.video.sequenceNumber}
              </p>
            </div>
            {progress.isCompleted && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Completed
              </span>
            )}
          </div>
          
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ 
                  width: `${progress.video.durationSeconds 
                    ? Math.min(100, Math.round((progress.watchedSeconds / progress.video.durationSeconds) * 100)) 
                    : progress.isCompleted ? 100 : 0}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">
                {progress.video.durationSeconds 
                  ? `${formatDuration(progress.watchedSeconds)} / ${formatDuration(progress.video.durationSeconds)}`
                  : progress.isCompleted ? "Completed" : "In progress"}
              </span>
              <span className="text-xs text-gray-500">
                Last watched: {formatDate(progress.lastWatchedAt)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Data Operations

### Profile Page

1. Fetch user details:
```typescript
const user = await prisma.user.findUnique({
  where: { id: session.user.id }
});
```

2. Fetch user's video progress:
```typescript
const videoProgress = await prisma.videoProgress.findMany({
  where: { userId: user.id },
  include: { video: true }
});
```

3. Fetch total number of videos for progress calculation:
```typescript
const totalVideos = await prisma.programVideo.count({
  where: { isActive: true }
});
```

4. Calculate overall progress:
```typescript
const completedVideos = videoProgress.filter(progress => progress.isCompleted).length;
const progressPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
```

5. Sign out:
```typescript
await signOut({ redirect: false });
```

## Authentication and Access

- **Role**: Accessible to both admin and client users
- **Authentication**: Required
- **Subscription Check**: For client users, checks if subscription is active

## UI/UX Considerations

1. **Profile Layout**:
   - Three-column grid on desktop, single column on mobile
   - Clear sections for account information, subscription status, and program progress
   - Visual indicators for subscription status (active, expiring soon)
   - Progress bar for overall program completion

2. **Account Information**:
   - Display of user details (name, email, role)
   - Member since date
   - Sign out button

3. **Subscription Status**:
   - Clear indication of subscription end date
   - Warning when subscription is ending soon (less than 7 days)
   - Instructions for contacting the doctor to extend subscription

4. **Program Progress**:
   - Overall progress percentage and bar
   - List of recently watched videos
   - Progress indicators for each video
   - Quick access to continue watching

5. **Responsive Design**:
   - Adapts to different screen sizes
   - Reflows from multi-column to single column on mobile

## Implementation Notes

1. The profile page uses a combination of server and client components:
   - Server component for data fetching and authentication
   - Client components for interactive UI elements

2. The page includes three main sections:
   - Account Information: Basic user details
   - Subscription Status: Subscription end date and status
   - Program Progress: Overall progress and recent activity

3. The subscription status section includes:
   - Visual indicators for active or expiring subscriptions
   - Clear display of the expiration date
   - Warning when subscription is ending soon

4. The program progress section includes:
   - Overall progress bar and percentage
   - List of recently watched videos
   - Progress indicators for each video
   - Quick access to continue watching

5. The design follows the brand identity established in the provided inspiration images:
   - Clean, minimalist aesthetic
   - Earthy color palette
   - Soft, rounded shapes

## Dependencies

- Next.js App Router
- NextAuth.js for authentication and session management
- Prisma for database access
- Tailwind CSS for styling
