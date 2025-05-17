# Project Overview: Nutrition Website

## Project Vision

This project aims to create a modern, user-friendly nutrition website for a doctor who currently communicates with clients through Telegram channels. The website will transform the existing three-channel communication structure into an elegant, organized web platform while maintaining the same content categories and enhancing the user experience.

The website will serve as a comprehensive nutrition portal where clients can access educational content, recipes, and answers to common questions. It will provide a streamlined experience for both the doctor (admin) and clients, with clear navigation and intuitive interfaces.

## Current Situation

The doctor currently manages client communication through three separate Telegram channels:

1. **Program Explanation Channel**: Contains sequential educational videos about nutrition concepts
2. **Recipes Channel**: Features links to YouTube videos of recommended recipes
3. **Q&A Channel**: Houses frequently asked questions answered with voice notes

This structure works but lacks the professional presentation and organization that a dedicated website can provide.

## Project Goals

1. Recreate the three Telegram channels as website sections with improved UI/UX
2. Provide a centralized platform for all nutrition content
3. Enable sequential video watching with progress tracking
4. Allow recipe browsing with additional metadata (calories, macros, meal types)
5. Facilitate Q&A interaction between clients and the doctor
6. Create an admin dashboard for content management
7. Implement user authentication and subscription management
8. Present all content in a visually appealing, brand-consistent manner

## Target Audience

- **Primary**: Existing clients of the nutrition doctor
- **Secondary**: Potential new clients who may be referred to the website

## Technical Architecture

### Frontend

- **Framework**: Next.js with App Router
- **Styling**: TailwindCSS for utility-first styling
- **UI Components**: ShadCN for elegant, consistent UI elements
- **Client-Side Logic**: React components with client-side interactivity where needed
- **Server Components**: For pages requiring backend data access

### Backend

- **Framework**: Next.js (unified full-stack approach)
- **Server Functions**: For data fetching and mutations
- **Authentication**: NextAuth.js for user authentication and session management
- **Database Access**: Prisma ORM for type-safe database operations

### Database

- **Type**: PostgreSQL
- **Hosting**: Supabase
- **Access Pattern**: Prisma ORM for all database operations

### Media Storage

- **Service**: AWS S3
- **Organization**: Single bucket with folder structure for different content types
- **Access**: Pre-signed URLs for secure video streaming
- **Content Types**: 
  - Self-hosted videos (program explanation, some recipes)
  - Audio files (Q&A answers)
  - Embedded YouTube content (most recipes)

## Content Structure

### Home Page

Central entry point featuring three prominent buttons that direct users to the main content sections:
- Program Explanation
- Recipes
- Q&A

### Program Explanation Section

- Sequential educational videos about nutrition concepts
- Progress tracking for each user
- Primarily vertical video orientation
- Videos hosted on S3 bucket

### Recipes Section

- Collection of recipe videos
- Mix of embedded YouTube videos and self-hosted content
- Metadata including calories, macros, and meal-type tags
- Filtering and search capabilities

### Q&A Section

- Display of existing Q&A entries
- Question submission form for clients
- Admin-only view of submitted questions
- Multiple answer formats (text, audio)

### Admin Dashboard

- Content management interface
- User management with subscription control
- Question review and answer creation
- Video and recipe upload functionality

## User Roles and Authentication

### Roles

1. **Admin (Doctor)**
   - Full access to all content
   - Ability to create and manage user accounts
   - Content creation and management capabilities
   - Access to user-submitted questions

2. **Client**
   - Access to all content sections based on subscription status
   - Ability to track progress through program videos
   - Question submission capability
   - No content management permissions

### Authentication Flow

- No self-registration
- Admin creates user accounts (email/password)
- Admin provides credentials to users offline
- Users log in with provided credentials
- Subscription end dates managed by admin
- Content access restricted after subscription expiration

## Design Direction

Based on the provided brand inspiration images, the website will feature:

- Clean, minimalist aesthetic with focus on natural elements
- White/off-white space with organic food imagery
- Simple, slightly artistic font for logo and text
- Soft, rounded shapes (pill-shaped buttons/containers)
- Natural imagery as accents
- Modern but warm tone with light backgrounds
- Earthy color palette: warm beige, leaf green, orange accents
- Friendly sans-serif typography
- Dark charcoal or deep green for headings
- Secondary earthy tones (light greens, oranges)
- Wide, open layout with large sectional divisions
- Simple iconography for key features

## Development Approach

- Server components for pages requiring backend resources
- Client components for UI rendering and interactivity
- API routes or server actions for data mutations
- Responsive design for all screen sizes
- Progressive enhancement for optimal performance
- Error handling for external dependencies (YouTube videos)
- Secure authentication and authorization checks

## Out of Scope

- Payment processing (handled offline)
- User self-registration
- Bulk content import
- Audio normalization
- Captions/transcripts for videos

## Success Criteria

A successful implementation will:

1. Provide a seamless transition from Telegram channels to website sections
2. Maintain all existing content categories and functionality
3. Enhance user experience through improved navigation and design
4. Enable efficient content management for the admin
5. Support secure user authentication and subscription management
6. Present a professional, brand-consistent visual identity
7. Function reliably across devices and connection speeds

This overview serves as the foundation for the detailed technical specifications and page designs that follow in subsequent documentation.
