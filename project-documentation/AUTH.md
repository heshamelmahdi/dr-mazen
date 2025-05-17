# Authentication System

This document outlines the authentication system for the nutrition website, detailing the workflow, user roles, and security considerations.

## Authentication Overview

The website uses NextAuth.js for authentication, providing a secure and flexible solution for handling user sessions and access control. The authentication system is designed to support the specific requirements of the nutrition website, where users are created by the administrator rather than through self-registration.

## User Roles

The system supports two distinct user roles:

1. **Admin (Doctor)**
   - Full access to all content and administrative functions
   - Ability to create and manage user accounts
   - Access to the admin dashboard
   - Content management capabilities

2. **Client**
   - Access to content based on subscription status
   - Ability to view program videos, recipes, and Q&A content
   - Ability to submit questions
   - No administrative capabilities

## Authentication Workflow

### User Creation (Admin Only)

1. Admin logs into the admin dashboard
2. Admin navigates to the user management section
3. Admin creates a new user by entering:
   - Email address
   - Password
   - Name (optional)
   - Subscription end date
4. System creates the user account with CLIENT role
5. Admin provides the credentials to the user through offline channels

### User Login

1. User navigates to the login page
2. User enters email and password
3. System validates credentials against the database
4. If valid, system creates a session and redirects to the home page
5. If invalid, system displays an error message

### Session Management

1. Upon successful authentication, NextAuth creates a session
2. Session contains user ID, email, role, and subscription end date
3. Session is stored in a cookie and/or JWT token
4. Session is validated on each protected route access
5. Session expires after a configured timeout or on logout

### Access Control

1. On each page or API request, the system checks:
   - If the user is authenticated
   - If the user has the required role (admin or client)
   - If the client's subscription is active (subscription end date > current date)
2. If any check fails, the user is redirected to the appropriate page:
   - Unauthenticated users to login page
   - Unauthorized users to unauthorized page
   - Expired subscription users to subscription expired page

## NextAuth Configuration

```typescript
// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscriptionEndDate: user.subscriptionEndDate
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.subscriptionEndDate = user.subscriptionEndDate;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.subscriptionEndDate = token.subscriptionEndDate;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

## User Types and Interfaces

```typescript
// types/next-auth.d.ts

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "CLIENT";
      subscriptionEndDate?: Date;
    } & DefaultSession["user"];
  }

  interface User {
    role: "ADMIN" | "CLIENT";
    subscriptionEndDate?: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "CLIENT";
    subscriptionEndDate?: Date;
  }
}
```

## Authentication Middleware

```typescript
// middleware.ts

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
```

## Authentication Hooks

```typescript
// hooks/useAuth.ts

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
```

## User Management (Admin Functions)

```typescript
// app/admin/users/actions.ts

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
    throw new Error("Unauthorized");
  }
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const subscriptionEndDateStr = formData.get("subscriptionEndDate") as string;
  
  // Validate inputs
  if (!email || !password) {
    throw new Error("Email and password are required");
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
  
  revalidatePath("/admin/users");
}

export async function updateUserSubscription(userId: string, subscriptionEndDate: Date) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  
  // Update user subscription
  await prisma.user.update({
    where: { id: userId },
    data: { subscriptionEndDate },
  });
  
  revalidatePath("/admin/users");
}

export async function deactivateUser(userId: string) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  
  // Deactivate user
  await prisma.user.update({
    where: { id: userId },
    data: { isActive: false },
  });
  
  revalidatePath("/admin/users");
}
```

## Security Considerations

### Password Storage

- Passwords are hashed using bcrypt before storage
- Raw passwords are never stored in the database
- Password reset functionality is not implemented (admin creates new passwords)

### Session Security

- Sessions are JWT-based for stateless operation
- Session secret is stored in environment variables
- Session expiration is set to 30 days by default

### CSRF Protection

- NextAuth includes built-in CSRF protection
- Form submissions use server actions with built-in CSRF protection

### Environment Variables

Required environment variables:

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Login Page Implementation

The login page should be implemented as a client component that uses the NextAuth `signIn` function:

```typescript
// app/login/page.tsx

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      
      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Login to Your Account</h1>
          <p className="mt-2 text-gray-600">
            Enter your credentials to access your nutrition program
          </p>
        </div>
        
        {error && (
          <div className="p-4 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

## Conclusion

This authentication system provides a secure and straightforward way to manage user access to the nutrition website. By leveraging NextAuth.js and implementing proper role-based access control, the system ensures that:

1. Only authenticated users can access protected content
2. Admin users have exclusive access to administrative functions
3. Client users can only access content if their subscription is active
4. User credentials are securely stored and managed

The system is designed to be simple yet effective, focusing on the specific requirements of the nutrition website rather than implementing unnecessary complexity.
