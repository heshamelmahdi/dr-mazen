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