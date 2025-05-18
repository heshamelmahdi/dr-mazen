"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { Spinner } from "@/components/ui/spinner";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  checkSubscription?: boolean;
  fallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
  checkSubscription = false,
  fallback,
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Handle unauthenticated users
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // Skip additional checks if still loading
    if (status !== "authenticated") return;

    // Check admin role if required
    if (requireAdmin && session?.user?.role !== "ADMIN") {
      router.push("/unauthorized");
      return;
    }

    // Check subscription if needed
    if (
      checkSubscription &&
      session?.user?.role === "CLIENT" &&
      session?.user?.subscriptionEndDate
    ) {
      const subscriptionEnd = new Date(session.user.subscriptionEndDate);
      if (subscriptionEnd < new Date()) {
        router.push("/subscription-expired");
      }
    }
  }, [status, session, router, requireAdmin, checkSubscription]);

  // Show loading spinner while checking authentication
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // Show fallback or loading if not authenticated yet
  if (status !== "authenticated") {
    return fallback || (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // If admin check is required but user is not admin
  if (requireAdmin && session?.user?.role !== "ADMIN") {
    return null;
  }

  // If subscription check is required but subscription is expired
  if (
    checkSubscription &&
    session?.user?.role === "CLIENT" &&
    session?.user?.subscriptionEndDate
  ) {
    const subscriptionEnd = new Date(session.user.subscriptionEndDate);
    if (subscriptionEnd < new Date()) {
      return null;
    }
  }

  // User is authenticated and passes all checks
  return <>{children}</>;
} 