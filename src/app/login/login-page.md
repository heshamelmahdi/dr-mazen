# Login Page

This document outlines the implementation details for the Login page of the nutrition website.

## Overview

The Login page provides the authentication entry point for both admin and client users. It features a simple form where users can enter their email and password to access the website.

## File Location

```
src/app/login/page.tsx
```

## Page Structure

The Login page will be implemented as a client component that handles authentication through NextAuth.js.

## Components

### LoginPage (Client Component)

```typescript
// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      
      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred during login");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <Image 
              src="/logo.svg" 
              alt="Nutrition Website Logo" 
              width={120} 
              height={120}
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-green-800">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">
            Sign in to access your nutrition program
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
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
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="your@email.com"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              If you don't have an account, please contact your nutrition doctor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Authentication Flow

1. User enters email and password
2. Form submits credentials to NextAuth.js
3. NextAuth.js verifies credentials against the database
4. If valid, user is redirected to the home page
5. If invalid, error message is displayed

## Data Operations

The login page interacts with NextAuth.js to authenticate users:

```typescript
const result = await signIn("credentials", {
  redirect: false,
  email,
  password,
});
```

NextAuth.js then performs the following operations:

1. Retrieves the user from the database by email
2. Compares the provided password with the hashed password in the database
3. If valid, creates a session for the user
4. Returns success or error result

## UI/UX Considerations

1. **Form Design**:
   - Clean, minimal layout
   - Clear labels for input fields
   - Validation feedback for required fields
   - Error message display for failed login attempts
   - Loading state for the submit button

2. **Visual Elements**:
   - Logo at the top for brand recognition
   - Consistent color scheme with the rest of the site
   - Soft shadows and rounded corners for form elements
   - Adequate spacing for readability

3. **Accessibility**:
   - Semantic HTML structure
   - Proper labels for form fields
   - Focus states for keyboard navigation
   - Disabled states during form submission

4. **Responsive Design**:
   - Centered layout that works on all screen sizes
   - Appropriate padding and margins for mobile devices
   - Touch-friendly input fields and buttons

## Implementation Notes

1. The login page is implemented as a client component to handle form state and submission.

2. NextAuth.js is used for authentication, with the credentials provider configured to check against the database.

3. The page includes:
   - Logo and welcome message
   - Email and password input fields
   - Sign in button
   - Error message display
   - Loading state for the form

4. The design follows the brand identity established in the provided inspiration images:
   - Clean, minimalist aesthetic
   - Earthy color palette
   - Soft, rounded shapes

5. The page includes a note that users cannot sign up themselves, reinforcing that accounts are created by the admin.

## Dependencies

- Next.js App Router
- NextAuth.js for authentication
- Tailwind CSS for styling
