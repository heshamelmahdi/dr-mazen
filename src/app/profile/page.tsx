"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  return (
    <ProtectedRoute checkSubscription>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { data: session } = useSession();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6">My Profile</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Name</h2>
              <p className="text-lg font-medium">{session?.user?.name || 'Not provided'}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-medium text-gray-500">Email</h2>
              <p className="text-lg font-medium">{session?.user?.email}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-medium text-gray-500">Account Type</h2>
              <p className="text-lg font-medium capitalize">{session?.user?.role?.toLowerCase()}</p>
            </div>
            
            {session?.user?.role === "CLIENT" && session?.user?.subscriptionEndDate && (
              <div>
                <h2 className="text-sm font-medium text-gray-500">Subscription Ends</h2>
                <p className="text-lg font-medium">
                  {new Date(session.user.subscriptionEndDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}