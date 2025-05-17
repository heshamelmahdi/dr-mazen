# Repository Structure

This document outlines the directory structure and architecture for the nutrition website built with Next.js App Router. The structure follows modern Next.js best practices and is organized to support the specific requirements of the project.

## Root Directory Structure

```
nutrition-website/
├── .env                    # Environment variables
├── .env.example            # Example environment variables for documentation
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration for Tailwind
├── prisma/                 # Prisma ORM files
│   ├── schema.prisma       # Database schema definition
│   └── migrations/         # Database migrations
├── public/                 # Static assets
│   ├── favicon.ico         # Site favicon
│   ├── images/             # Static images
│   └── fonts/              # Custom fonts
├── src/                    # Source code
│   ├── app/                # Next.js App Router
│   ├── components/         # Reusable React components
│   ├── lib/                # Utility functions and shared code
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## App Directory Structure

The `src/app` directory follows Next.js App Router conventions, with each route segment having its own directory:

```
src/app/
├── api/                    # API routes if needed
├── (admin)/dashboard       # Admin dashboard routes
│   ├── layout.tsx          # Admin layout
│   ├── page.tsx            # Admin dashboard home
│   ├── users/              # User management
│   ├── program/            # Program video management
│   ├── recipes/            # Recipe management
│   └── qa/                 # Q&A management
├── login/                  # Login page
│   └── page.tsx            # Login page component
├── program/                # Program explanation section
│   ├── layout.tsx          # Program section layout
│   ├── page.tsx            # Program section home
│   └── [id]/               # Individual video page
│       └── page.tsx        # Video player page
├── recipes/                # Recipes section
│   ├── layout.tsx          # Recipes section layout
│   ├── page.tsx            # Recipes listing page
│   └── [id]/               # Individual recipe page
│       └── page.tsx        # Recipe detail page
├── qa/                     # Q&A section
│   ├── layout.tsx          # Q&A section layout
│   └── page.tsx            # Q&A listing and form page
├── profile/                # User profile
│   └── page.tsx            # User profile page
├── not-found.tsx           # 404 Not Found page
├── error.tsx               # Error boundary component
├── layout.tsx              # Root layout
├── page.tsx                # Home page
└── globals.css             # Global CSS
```

## Components Directory Structure

The `src/components` directory is organized by feature and component type:

```
src/components/
├── ui/                     # Basic UI components
│   ├── button.tsx          # Button component
│   ├── card.tsx            # Card component
│   ├── input.tsx           # Input component
│   ├── select.tsx          # Select component
│   └── ...                 # Other UI components
├── layout/                 # Layout components
│   ├── header.tsx          # Header component
│   ├── footer.tsx          # Footer component
│   ├── sidebar.tsx         # Sidebar component
│   └── ...                 # Other layout components
├── auth/                   # Authentication components
│   ├── login-form.tsx      # Login form
│   └── ...                 # Other auth components
├── program/                # Program section components
│   ├── video-player.tsx    # Video player component
│   ├── video-card.tsx      # Video card component
│   ├── progress-tracker.tsx # Progress tracking component
│   └── ...                 # Other program components
├── recipes/                # Recipe section components
│   ├── recipe-card.tsx     # Recipe card component
│   ├── recipe-filter.tsx   # Recipe filtering component
│   ├── youtube-embed.tsx   # YouTube video embedding component
│   └── ...                 # Other recipe components
├── qa/                     # Q&A section components
│   ├── qa-card.tsx         # Q&A card component
│   ├── question-form.tsx   # Question submission form
│   ├── audio-player.tsx    # Audio player for voice answers
│   └── ...                 # Other Q&A components
└── admin/                  # Admin dashboard components
    ├── user-form.tsx       # User creation/edit form
    ├── content-uploader.tsx # Content upload component
    ├── video-recorder.tsx  # Browser video recording component
    └── ...                 # Other admin components
```

## Lib Directory Structure

The `src/lib` directory contains utility functions and shared code:

```
src/lib/
├── prisma.ts               # Prisma client singleton
├── auth.ts                 # Authentication utilities
├── s3.ts                   # AWS S3 utilities
├── youtube.ts              # YouTube API utilities
├── utils/                  # General utility functions
│   ├── date-utils.ts       # Date formatting utilities
│   ├── string-utils.ts     # String manipulation utilities
│   └── ...                 # Other utility functions
└── validators/             # Form validation schemas
    ├── user-validators.ts  # User form validation
    ├── recipe-validators.ts # Recipe form validation
    └── ...                 # Other validation schemas
```

## Hooks Directory Structure

The `src/hooks` directory contains custom React hooks:

```
src/hooks/
├── useAuth.ts              # Authentication hooks
├── useVideoProgress.ts     # Video progress tracking hooks
├── useRecipes.ts           # Recipe data hooks
├── useQA.ts                # Q&A data hooks
└── ...                     # Other custom hooks
```

## Types Directory Structure

The `src/types` directory contains TypeScript type definitions:

```
src/types/
├── next-auth.d.ts          # NextAuth type extensions
├── database.ts             # Database model types
├── api.ts                  # API request/response types
└── ...                     # Other type definitions
```

## Styles Directory Structure

The `src/styles` directory contains global styles:

```
src/styles/
├── globals.css             # Global CSS (imported in app/globals.css)
└── tailwind.css            # Tailwind directives
```

## Prisma Directory Structure

The `prisma` directory contains Prisma ORM files:

```
prisma/
├── schema.prisma           # Database schema definition
```

## Public Directory Structure

The `public` directory contains static assets:

```
public/
├── favicon.ico             # Site favicon
├── logo.svg                # Site logo
├── images/                 # Static images
│   ├── brand/              # Brand images
│   ├── icons/              # Icon images
│   └── placeholders/       # Placeholder images
└── fonts/                  # Custom fonts
```

## Architecture Patterns

### Server Components vs. Client Components

Following Next.js App Router best practices:

1. **Server Components (default):**
   - Used for components that don't need client-side interactivity
   - Used for data fetching directly from the database
   - File naming: Regular `.tsx` files

2. **Client Components:**
   - Used for components that need interactivity or browser APIs
   - Marked with `"use client"` directive at the top of the file
   - File naming: Regular `.tsx` files with "use client" directive

### Data Fetching Pattern

1. **Server Components:**
   - Fetch data directly using Prisma client
   - Pass data to client components as props

2. **Client Components:**
   - Receive data as props from server components
   - Use React hooks for client-side state management
   - Use server actions for mutations

### Authentication Pattern

1. **NextAuth.js Integration:**
   - Configuration in `src/app/api/auth/[...nextauth]/route.ts`
   - Session management through NextAuth hooks and middleware

2. **Protected Routes:**
   - Middleware in `src/middleware.ts` for route protection
   - Role-based access control using session data

### Media Handling Pattern

1. **S3 Integration:**
   - Utility functions in `src/lib/s3.ts`
   - Pre-signed URLs for secure access to videos and audio

2. **YouTube Embedding:**
   - Component in `src/components/recipes/youtube-embed.tsx`
   - Error handling for unavailable videos

## File Naming Conventions

1. **Component Files:**
   - Kebab-case for filenames: `video-player.tsx`
   - PascalCase for component names: `VideoPlayer`

2. **Utility Files:**
   - Kebab-case for filenames: `date-utils.ts`
   - Camel case for function names: `formatDate`

3. **Page Files:**
   - Next.js App Router conventions: `page.tsx`, `layout.tsx`, etc.

## Code Organization Principles

1. **Feature-First Organization:**
   - Components, hooks, and utilities are organized by feature
   - Common components are placed in shared directories

2. **Separation of Concerns:**
   - UI components are separated from data fetching logic
   - Business logic is separated from presentation

3. **Reusability:**
   - Common UI components are placed in the `ui` directory
   - Shared utilities are placed in the `lib` directory

4. **Type Safety:**
   - TypeScript is used throughout the project
   - Type definitions are centralized in the `types` directory

## Environment Variables

The project requires the following environment variables:

```
# Supabase
DATABASE_URL="your-supabase-url"
DIRECT_URL="your-supabase-direct-url"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# AWS S3
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="your-region"
AWS_S3_BUCKET="your-bucket-name"
```

These variables should be defined in the `.env` file (not committed to version control) and documented in the `.env.example` file.

## Development Workflow

1. **Local Development:**
   - Run `npm run dev` to start the development server
   - Access the site at `http://localhost:3000`

2. **Database Migrations:**
   - Run `npx prisma migrate dev` to create and apply migrations
   - Run `npx prisma generate` to update the Prisma client

3. **Building for Production:**
   - Run `npm run build` to build the production version
   - Run `npm start` to start the production server

## Conclusion

This repository structure is designed to support the specific requirements of the nutrition website while following Next.js best practices. The organization promotes:

1. **Maintainability:** Clear separation of concerns and consistent naming conventions
2. **Scalability:** Feature-based organization that can grow with the project
3. **Performance:** Proper use of server and client components
4. **Security:** Centralized authentication and authorization

By following this structure, the development team can efficiently build and maintain the nutrition website, ensuring a high-quality user experience for both the doctor and clients.
