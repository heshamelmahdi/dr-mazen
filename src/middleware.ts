import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  
  // Path the user is trying to access
  const path = request.nextUrl.pathname;
  
  // Public paths that don't require authentication
  const publicPaths = ["/login", "/unauthorized", "/not-found"];
  const isPublicPath = publicPaths.some(publicPath => path === publicPath);
  
  // Admin-only paths
  const adminPaths = ["/admin"];
  const isAdminPath = adminPaths.some(adminPath => path.startsWith(adminPath));
  
  // Check if subscription is expired
  const isSubscriptionExpired = token?.subscriptionEndDate 
    ? new Date(token.subscriptionEndDate) < new Date() 
    : false;
  
  // Redirect logic
  if (!isAuthenticated && !isPublicPath) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  if (isAuthenticated) {
    // Redirect authenticated users away from login
    if (path === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
    // Check admin access
    if (isAdminPath && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    
    // Check subscription for client users
    if (token.role === "CLIENT" && isSubscriptionExpired && !isPublicPath) {
      return NextResponse.redirect(new URL("/subscription-expired", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Add paths that should be protected
    "/",
    "/login",
    "/admin/:path*",
    "/program/:path*",
    "/recipes/:path*",
    "/qa/:path*",
    "/profile/:path*"
  ],
}; 