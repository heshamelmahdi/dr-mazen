import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth(redirectTo = "/login") {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(redirectTo);
    }
  }, [status, router, redirectTo]);
  
  return { session, status };
}

export function useRequireAdmin(redirectTo = "/unauthorized") {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push(redirectTo);
    }
  }, [status, session, router, redirectTo]);
  
  return { session, status };
}

export function useSubscriptionCheck(redirectTo = "/subscription-expired") {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "authenticated" && 
        session?.user?.role === "CLIENT" && 
        session?.user?.subscriptionEndDate) {
      const subscriptionEnd = new Date(session.user.subscriptionEndDate);
      if (subscriptionEnd < new Date()) {
        router.push(redirectTo);
      }
    }
  }, [status, session, router, redirectTo]);
  
  return { session, status };
} 