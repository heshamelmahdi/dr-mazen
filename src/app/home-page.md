# Home Page

This document outlines the implementation details for the home page of the nutrition website.

## Overview

The home page serves as the entry point to the website, featuring three prominent buttons that direct users to the main content sections: Program Explanation, Recipes, and Q&A. The design should be clean, visually appealing, and aligned with the brand identity established in the design inspiration images.

## File Location

```
src/app/page.tsx
```

## Page Structure

The home page will be implemented as a server component that checks authentication status and renders the appropriate content.

## Components

### HomePage (Server Component)

```typescript
// src/app/page.tsx

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HomeContent from "@/components/home/home-content";

export default async function HomePage() {
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
  
  return <HomeContent userName={session.user.name || "there"} />;
}
```

### HomeContent (Client Component)

```typescript
// src/components/home/home-content.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface HomeContentProps {
  userName: string;
}

export default function HomeContent({ userName }: HomeContentProps) {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-background.jpg" 
            alt="Fresh vegetables and fruits" 
            fill 
            className="object-cover opacity-20"
            priority
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Welcome, {userName}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Your journey to better nutrition starts here
          </p>
        </div>
      </section>
      
      {/* Main Navigation Buttons */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-green-700 mb-12">
            Explore Your Nutrition Program
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Program Button */}
            <NavigationCard 
              title="Program Explanation" 
              description="Learn the fundamentals of nutrition through our educational videos"
              imageSrc="/images/program-icon.jpg"
              href="/program"
            />
            
            {/* Recipes Button */}
            <NavigationCard 
              title="Recipes" 
              description="Discover healthy and delicious recipes for your nutrition plan"
              imageSrc="/images/recipes-icon.jpg"
              href="/recipes"
            />
            
            {/* Q&A Button */}
            <NavigationCard 
              title="Q&A" 
              description="Find answers to common questions about nutrition and health"
              imageSrc="/images/qa-icon.jpg"
              href="/qa"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-green-700 mb-12">
            Features of Your Nutrition Program
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon="🎓"
              title="Educational Content"
              description="Learn at your own pace with our structured program"
            />
            <FeatureCard 
              icon="🍲"
              title="Healthy Recipes"
              description="Discover nutritious and delicious meal options"
            />
            <FeatureCard 
              icon="❓"
              title="Expert Answers"
              description="Get answers to your nutrition questions"
            />
            <FeatureCard 
              icon="📊"
              title="Track Progress"
              description="Monitor your learning journey through the program"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

interface NavigationCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

function NavigationCard({ title, description, imageSrc, href }: NavigationCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <Link href={href} className="block h-full">
        <div className="h-48 relative">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <div className="mt-4 flex justify-end">
            <span className="text-green-600 font-medium flex items-center">
              Explore
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-green-700 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
```

## Data Operations

### Authentication Check

The home page performs the following data operations:

1. Retrieves the user's session using NextAuth's `getServerSession`
2. Checks if the user is authenticated
3. For client users, checks if their subscription is expired

```typescript
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
```

## Authentication and Access

- **Role**: Accessible to both admin and client users
- **Authentication**: Required
- **Subscription Check**: For client users, checks if subscription is active

## UI/UX Considerations

1. **Responsive Design**:
   - The layout adapts to different screen sizes
   - On mobile, the navigation cards stack vertically
   - On desktop, they display in a row

2. **Visual Elements**:
   - Hero section with background image and welcome message
   - Three prominent navigation cards with images
   - Feature highlights section
   - Consistent color scheme using the brand's earthy tones

3. **Animations**:
   - Subtle hover effects on navigation cards using Framer Motion
   - Smooth transitions between sections

4. **Accessibility**:
   - Semantic HTML structure
   - Proper alt text for images
   - Sufficient color contrast
   - Keyboard navigable elements

## Assets Required

1. **Images**:
   - Hero background image (`/images/hero-background.jpg`)
   - Program icon image (`/images/program-icon.jpg`)
   - Recipes icon image (`/images/recipes-icon.jpg`)
   - Q&A icon image (`/images/qa-icon.jpg`)

2. **Icons**:
   - Arrow icon (included as inline SVG)
   - Emoji icons for features

## Implementation Notes

1. The home page uses a combination of server and client components:
   - Server component for authentication and session checks
   - Client component for interactive UI elements

2. The design follows the brand identity established in the provided inspiration images:
   - Clean, minimalist aesthetic
   - Focus on natural elements
   - Earthy color palette
   - Soft, rounded shapes

3. The three main navigation buttons are prominently displayed and visually distinct, making it clear to users how to access the main content sections.

4. The features section provides additional context about the nutrition program's benefits.

5. The page includes subtle animations to enhance the user experience without being distracting.

## Dependencies

- Next.js App Router
- NextAuth.js for authentication
- Framer Motion for animations
- Tailwind CSS for styling
- ShadCN UI components (implicitly used through the design system)
