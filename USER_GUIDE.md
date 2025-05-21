# Dr. Mazen Nutrition Website - User Guide

This guide provides comprehensive documentation for using the Dr. Mazen Nutrition Website, covering all features and functionality for both client and admin users.

## Table of Contents

- [1. Setup and Configuration](#1-setup-and-configuration)
- [2. Authentication and User Management](#2-authentication-and-user-management)
- [3. Client User Features](#3-client-user-features)
  - [3.1 Home Page](#31-home-page)
  - [3.2 Program Page](#32-program-page)
  - [3.3 Recipes Page](#33-recipes-page)
  - [3.4 Q&A Page](#34-qa-page)
  - [3.5 Profile Page](#35-profile-page)
- [4. Admin Features](#4-admin-features)
  - [4.1 Admin Dashboard](#41-admin-dashboard)
  - [4.2 User Management](#42-user-management)
  - [4.3 Program Video Management](#43-program-video-management)
  - [4.4 Recipe Management](#44-recipe-management)
  - [4.5 Q&A Management](#45-qa-management)
- [5. Technical Reference](#5-technical-reference)
- [6. Troubleshooting](#6-troubleshooting)
- [7. Security Considerations](#7-security-considerations)

## 1. Setup and Configuration

### Environment Variables

The following environment variables are required for the application to function properly:

| Variable | Description | Example |
|----------|-------------|---------|
| `AWS_REGION` | AWS region for S3 storage | `us-east-1` |
| `AWS_ACCESS_KEY_ID` | AWS access key with S3 permissions | `AKIAXXXXXXXXXXXXXXXX` |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `AWS_S3_BUCKET_NAME` | Name of S3 bucket for file storage | `dr-mazen-nutrition` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@host:port/database` |
| `DIRECT_URL` | Direct PostgreSQL connection string for Prisma | `postgresql://user:password@host:port/database` |
| `NEXTAUTH_SECRET` | Secret for NextAuth session encryption | `your-random-secret-key` |
| `NEXTAUTH_URL` | Base URL for NextAuth | `https://yourwebsite.com` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `ERROR_REPORTING_API_KEY` | (Optional) API key for error reporting service | `your-reporting-service-key` |

### External Services Configuration

#### AWS S3

1. Create an AWS account if you don't have one
2. Create an S3 bucket with the following structure:
   - `program-videos/` - For program explanation videos
   - `thumbnails/` - For video and recipe thumbnails
   - `recipe-videos/` - For self-hosted recipe videos
   - `qa-audio/` - For Q&A audio responses
3. Configure CORS for the bucket to allow access from your website domain
4. Create an IAM user with the following permissions:
   - `s3:PutObject`
   - `s3:GetObject`
   - `s3:DeleteObject`
   - `s3:ListBucket`
5. Generate and securely store the access key and secret key

#### PostgreSQL (Supabase)

1. Create a Supabase account
2. Create a new project
3. Get the PostgreSQL connection string from the project settings
4. Obtain the direct connection URL for Prisma

### Initial Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/dr-mazen-website.git
   cd dr-mazen-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add all required environment variables

4. Set up the database schema:
   ```bash
   npx prisma migrate dev
   ```

5. Create an initial admin user:
   ```bash
   npx ts-node scripts/create-admin.ts
   ```

6. Build and start the application:
   ```bash
   npm run build
   npm start
   ```

### System Requirements

- Node.js 18.x or higher
- npm 8.x or higher
- PostgreSQL 14.x or higher
- Modern web browser with JavaScript enabled

## 2. Authentication and User Management

### Login Process

The website uses email and password authentication through NextAuth.js.

#### Client Login

1. Navigate to the login page at `/login`
2. Enter your email address and password provided by the administrator
3. Click "Sign In"
4. Upon successful authentication, you will be redirected to the home page
5. If your subscription has expired, you will be redirected to the subscription expired page

#### Admin Login

1. Follow the same login process as clients
2. Admin users will have access to additional features and the admin dashboard
3. Admin users are not subject to subscription restrictions

### User Account Management

#### Account Creation

- User accounts can only be created by administrators
- Self-registration is not available
- Administrators create accounts from the User Management section in the admin dashboard

#### Subscription System

- Each client user has a subscription end date
- When a subscription expires, client users cannot access content
- Clients with expired subscriptions will be redirected to the subscription expired page
- Only administrators can extend subscription end dates

### User Roles and Permissions

| Feature | ADMIN | CLIENT (Active Subscription) | CLIENT (Expired Subscription) |
|---------|-------|------------------------------|-------------------------------|
| Home Page | ✅ | ✅ | ❌ |
| Program Videos | ✅ | ✅ | ❌ |
| Recipes | ✅ | ✅ | ❌ |
| Q&A | ✅ | ✅ | ❌ |
| Profile | ✅ | ✅ | ❌ |
| Admin Dashboard | ✅ | ❌ | ❌ |
| User Management | ✅ | ❌ | ❌ |
| Content Management | ✅ | ❌ | ❌ |

## 3. Client User Features

### 3.1 Home Page

The home page serves as the main entry point to the website and provides navigation to all main sections.

#### Features

- **Welcome Message**: Displays a personalized greeting with your name
- **Navigation Cards**: Three large cards to access the main content sections:
  - **Program Explanation**: Access educational videos about nutrition
  - **Recipes**: Browse healthy recipes with nutrition information
  - **Q&A**: View frequently asked questions and submit your own
- **Features Overview**: Summary of the key features of the nutrition program

#### Navigation

- Click on any of the three main cards to navigate to that section
- Use the navigation bar at the top to access your profile or sign out

### 3.2 Program Page

The Program Page provides access to the educational video content in a structured, sequential format.

#### Browsing Program Videos

1. Navigate to the Program page by clicking "Program Explanation" on the home page
2. Videos are displayed in a sequential order and should be watched in sequence
3. Each video card shows:
   - Video title and description
   - Sequence number (e.g., "Video 1")
   - Thumbnail image
   - Progress indicator
   - Duration
   - Last watched date (if applicable)

#### Watching Videos

1. Click on any video card to begin watching
2. The video player will open with the selected video
3. Use the play/pause button to control playback
4. The progress bar shows your current position in the video
5. Your progress is automatically saved as you watch

#### Progress Tracking

- The program page displays your overall progress through the program
- The progress bar shows the percentage of videos you've completed
- Each video card shows individual progress for that video
- Completed videos are marked with a green indicator
- The "Continue Learning" button takes you to your next unwatched video

#### Video Player Controls

- **Play/Pause**: Click the play/pause button or click on the video itself
- **Progress Bar**: Click anywhere on the progress bar to jump to that position
- **Time Display**: Shows current time and total duration
- **Back to Program**: Returns to the program list
- **Next Video**: Goes directly to the next video in the sequence (if available)

### 3.3 Recipes Page

The Recipes page provides access to healthy recipes with nutrition information.

#### Browsing Recipes

1. Navigate to the Recipes page by clicking "Recipes" on the home page
2. Recipes are displayed in a grid layout with thumbnail images
3. Each recipe card shows:
   - Recipe title and short description
   - Meal type (e.g., Breakfast, Lunch, Dinner)
   - Nutrition information highlights (calories, protein, etc.)
   - Tags
   - Video source indicator (YouTube or self-hosted)

#### Filtering and Searching Recipes

1. Use the search box to find recipes by title, description, or tags
2. Filter recipes using the sidebar filters:
   - **Meal Type**: Select a specific meal type (e.g., Breakfast, Lunch, Dinner)
   - **Calories**: Set minimum and maximum calorie ranges
   - **Tags**: Select specific tags to filter recipes
3. Click "Apply Filters" to update the recipe list
4. Click "Reset" to clear all filters

#### Viewing Recipe Details

1. Click on any recipe card to view detailed information
2. The recipe detail page shows:
   - Full recipe title and description
   - Video content (YouTube or self-hosted)
   - Detailed nutrition information (calories, protein, carbs, fat)
   - All tags and meal type
3. Click "Back to Recipes" to return to the recipe list

#### Recipe Videos

- **YouTube Videos**: Embedded YouTube player with standard YouTube controls
- **Self-Hosted Videos**: Custom video player with play/pause controls
- If a video is unavailable (e.g., YouTube video removed), an error message will be displayed

### 3.4 Q&A Page

The Q&A page allows you to browse answers to frequently asked questions and submit your own questions.

#### Browsing Q&A Entries

1. Navigate to the Q&A page by clicking "Q&A" on the home page
2. Q&A entries are displayed in an accordion list
3. Click on a question to expand and view the answer
4. Q&A entries show the date when they were created

#### Submitting Questions

1. Click the "Ask a Question" button at the top of the page
2. Enter your question in the text area
3. Click "Submit Question"
4. A confirmation message will appear upon successful submission
5. Your question will be reviewed and answered by the doctor

#### Using the Audio Player

For Q&A entries with audio answers:

1. Click on the question to expand it
2. The audio player will appear with the recorded answer
3. Click the play button to listen to the answer
4. Use the progress bar to navigate through the audio
5. The time display shows current position and total duration

#### Searching Q&A Entries

1. Use the search box at the top of the page
2. Enter keywords related to your question
3. The list will update in real-time to show matching entries
4. If no matching entries are found, you'll see a message with the option to ask a new question

### 3.5 Profile Page

The Profile page allows you to view your account information, subscription status, and track your progress.

#### Account Information

The account section displays:
- Your name
- Email address
- Account type (Client or Administrator)
- Member since date
- Sign Out button

#### Subscription Status

The subscription section shows:
- Current subscription status (active or expired)
- Expiration date of your subscription
- Warning if your subscription is ending soon (less than 7 days)
- Instructions for contacting the doctor to extend your subscription

#### Program Progress

The progress section displays:
- Overall progress percentage through the program
- Number of completed videos out of total videos
- List of recently watched videos with:
  - Video title and sequence number
  - Completion status
  - Progress bar showing how much of each video you've watched
  - Last watched date
  - Option to continue watching by clicking on the video

#### Sign Out Process

1. Click the "Sign Out" button in the account information section
2. You will be redirected to the login page
3. Your session will be terminated

## 4. Admin Features

### 4.1 Admin Dashboard

The Admin Dashboard provides an overview of the website and quick access to administrative functions.

#### Dashboard Overview

The dashboard displays:
- Total number of active users
- Subscription statistics (active, expiring soon, expired)
- Content statistics (videos, recipes, Q&A entries)
- Recent user activity

#### Quick Actions

The dashboard provides quick action buttons for common tasks:
- Create New User
- Add Program Video
- Add Recipe
- Add Q&A Entry
- View User Questions

#### Recent Activity

The recent activity section shows:
- New user registrations
- New user questions
- Recent video progress
- Subscription changes

### 4.2 User Management

The User Management section allows administrators to create and manage user accounts.

#### Creating New Users

1. Navigate to the Admin Dashboard
2. Go to User Management section
3. Click "Create New User"
4. Fill in the required information:
   - Email Address
   - Password
   - Name (optional)
   - Subscription End Date
5. Click "Create User"
6. The new user will be created with CLIENT role by default

#### Editing User Information

1. Find the user in the user list
2. Click "Edit" next to the user's name
3. Update the necessary information
4. Click "Save Changes"

#### Managing Subscriptions

1. Find the user in the user list
2. Click "Edit Subscription"
3. Set a new subscription end date
4. Click "Update Subscription"

#### Deactivating Accounts

1. Find the user in the user list
2. Click "Deactivate Account"
3. Confirm the deactivation
4. The user will no longer be able to log in

### 4.3 Program Video Management

The Program Video Management section allows administrators to manage educational videos.

#### Uploading New Videos

1. Navigate to the Admin Dashboard
2. Go to Program Management section
3. Click "Add New Video"
4. Fill in the video details:
   - Title
   - Description
   - Sequence Number (order in the program)
   - Duration (in seconds)
   - Video Type (YouTube or Self-Hosted)
5. For Self-Hosted videos:
   - Upload the video file (MP4 format recommended)
   - Upload a thumbnail image (optional)
6. For YouTube videos:
   - Enter the YouTube video ID or URL
7. Click "Save Video"

#### Editing Video Information

1. Find the video in the program video list
2. Click "Edit" next to the video's title
3. Update the necessary information
4. Click "Save Changes"

#### Managing Video Sequence

1. Navigate to the Program Management section
2. Click "Manage Sequence"
3. Drag and drop videos to reorder them
4. Click "Save Sequence"
5. The sequence numbers will be updated automatically

#### Handling Video Thumbnails

1. When editing a video, scroll to the thumbnail section
2. To replace the thumbnail, upload a new image
3. To remove the thumbnail, click "Remove Thumbnail"
4. Click "Save Changes"

### 4.4 Recipe Management

The Recipe Management section allows administrators to create and manage recipes.

#### Creating New Recipes

1. Navigate to the Admin Dashboard
2. Go to Recipe Management section
3. Click "Add New Recipe"
4. Fill in the recipe details:
   - Title
   - Description
   - Meal Type (Breakfast, Lunch, Dinner, Snack)
   - Tags (comma-separated)
   - Nutrition Information:
     - Calories
     - Protein (g)
     - Carbs (g)
     - Fat (g)
   - Recipe Type (YouTube or Self-Hosted)
5. For Self-Hosted videos:
   - Upload the video file (MP4 format recommended)
   - Upload a thumbnail image
6. For YouTube videos:
   - Enter the YouTube video URL
7. Click "Save Recipe"

#### Editing Recipes

1. Find the recipe in the recipe list
2. Click "Edit" next to the recipe's title
3. Update the necessary information
4. Click "Save Changes"

#### Managing Recipe Categories and Tags

1. When creating or editing a recipe, you can:
   - Select an existing Meal Type or create a new one
   - Add existing tags or create new ones
   - Remove tags by clicking the "X" next to each tag
2. The system will maintain a list of all unique meal types and tags

#### Handling Recipe Videos

1. When creating or editing a recipe, select the video type:
   - YouTube: Enter the YouTube URL
   - Self-Hosted: Upload a video file
2. For YouTube videos, the system will extract the video ID and check if the video exists
3. For Self-Hosted videos, the system will upload the file to S3 and generate a secure URL

### 4.5 Q&A Management

The Q&A Management section allows administrators to manage Q&A entries and answer user questions.

#### Creating New Q&A Entries

1. Navigate to the Admin Dashboard
2. Go to Q&A Management section
3. Click "Add New Q&A Entry"
4. Fill in the Q&A details:
   - Question
   - Answer Type (Text or Audio)
   - Answer Text (if Text type)
   - Is Private (toggle for private Q&A entries)
5. For Audio answers:
   - Record an audio answer directly in the browser, or
   - Upload an audio file (MP3 format recommended)
6. Click "Save Q&A Entry"

#### Answering User Questions

1. Navigate to the User Questions section
2. Questions are displayed with the user's name and submission date
3. Click on a question to answer it
4. Choose the answer type (Text or Audio)
5. Provide the answer
6. Click "Submit Answer"
7. The question will be marked as answered

#### Recording or Uploading Audio Answers

For Audio answers:
1. When creating or answering a Q&A, select "Audio" as the answer type
2. You can:
   - Click "Record" to record an answer directly in the browser
   - Click "Stop" to end the recording
   - Click "Play" to review your recording
   - Click "Upload" to use an existing audio file instead
3. Click "Save" to use the current audio

#### Managing Private vs. Public Q&A Entries

1. When creating or editing a Q&A entry, toggle the "Private" switch
2. Private Q&A entries are only visible to specific users (specified in the admin interface)
3. Public Q&A entries are visible to all users
4. You can filter the Q&A list to show only public or private entries

## 5. Technical Reference

### API Endpoints

The website provides the following API endpoints:

| Endpoint | Method | Description | Authentication Required |
|----------|--------|-------------|-------------------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth.js authentication | No |
| `/api/health` | GET | System health check | Yes (Admin only) |
| `/api/audio/:path` | GET | Fetch audio files | Yes |
| `/api/audio-proxy` | GET | Proxy for audio files | Yes |

### Webhook Integrations

The system supports webhooks for the following events:
- User creation
- Subscription changes
- Content updates

To configure webhooks, add the following to your environment variables:
```
WEBHOOK_URL=https://your-webhook-endpoint.com
WEBHOOK_SECRET=your-webhook-secret
```

### Scheduled Tasks

The system includes the following scheduled tasks:
- Daily check for expiring subscriptions (sends notifications)
- Weekly content analytics report
- Daily database backup

### Database Schema

The database schema consists of the following models:

- **User**: Represents both admin and client users
- **ProgramVideo**: Educational videos in sequential order
- **VideoProgress**: Tracks user progress through videos
- **Recipe**: Recipe content including videos and nutrition information
- **QAEntry**: Q&A entries with text or audio answers
- **UserQuestion**: Questions submitted by users

### File Storage Structure

Files are stored in AWS S3 with the following structure:

- `/program-videos/[uuid].[extension]` - Program videos
- `/thumbnails/[uuid].[extension]` - Video thumbnails
- `/recipe-videos/[uuid].[extension]` - Recipe videos
- `/qa-audio/[uuid].[extension]` - Q&A audio answers

## 6. Troubleshooting

### Common Issues and Solutions

#### Login Issues

| Issue | Solution |
|-------|----------|
| "Invalid email or password" | Verify your credentials and try again. Contact the administrator if the issue persists. |
| Redirected to subscription expired | Your subscription has expired. Contact the administrator to renew it. |
| Cannot access admin dashboard | Your account does not have ADMIN role. Contact the administrator. |

#### Video Playback Issues

| Issue | Solution |
|-------|----------|
| Video doesn't play | Check your internet connection. Try refreshing the page. The video might be processing or unavailable. |
| YouTube video unavailable | The YouTube video may have been removed or made private. Contact the administrator. |
| Progress not saving | Ensure you're logged in and have an active subscription. Try watching for at least 10 seconds. |

#### Recipe Issues

| Issue | Solution |
|-------|----------|
| No recipes found | Try clearing filters or search terms. There might be no recipes matching your criteria. |
| Recipe video not loading | Check your internet connection. The video might be processing or unavailable. |

#### Q&A Issues

| Issue | Solution |
|-------|----------|
| Audio not playing | Check your device volume. Try using headphones. The audio file might be processing or corrupted. |
| Question not appearing after submission | New questions need to be answered by the administrator before appearing in the Q&A list. |

### Error Messages and Their Meanings

| Error Message | Meaning | Solution |
|---------------|---------|----------|
| "Unauthorized" | You don't have permission to access this resource | Log in with an account that has the necessary permissions |
| "Subscription Expired" | Your subscription has ended | Contact the administrator to renew your subscription |
| "Failed to fetch" | Network issue or server error | Check your internet connection and try again |
| "Invalid input" | Form input validation error | Check the form for any invalid or missing fields |

### Debugging Steps

1. Clear your browser cache and cookies
2. Try using a different browser
3. Check your internet connection
4. Verify your subscription status in the profile page
5. Contact support with specific details about the issue

### Support Contact

For technical support, please contact:
- Email: support@dr-mazen-nutrition.com
- Phone: +1-234-567-8910
- Support Hours: Monday-Friday, 9 AM - 5 PM EST

## 7. Security Considerations

### Admin Account Management

- Use strong, unique passwords for admin accounts
- Change admin passwords regularly (at least every 90 days)
- Use separate admin accounts for each administrator
- Log out from admin accounts when not in use
- Avoid accessing the admin dashboard on public networks

### Sensitive Data Handling

- User passwords are securely hashed and never stored in plain text
- Password reset is handled via secure, time-limited tokens
- Personal information is only accessible to administrators
- Subscription information is encrypted in the database
- Audio and video files are accessed via secure, time-limited URLs

### Backup and Recovery

The system automatically creates backups with the following schedule:
- Daily incremental backups (retained for 30 days)
- Weekly full backups (retained for 3 months)
- Monthly archives (retained for 1 year)

To restore from a backup:
1. Contact the system administrator
2. Specify the date you want to restore from
3. The administrator will restore the data and notify you when complete

### Rate Limiting and Protection

The system implements the following protection mechanisms:
- Login attempts are limited to 5 per minute per IP address
- API requests are limited to 100 per minute per user
- File uploads are limited to 100MB per file
- Concurrent video streams are limited to 3 per user

---

*This user guide was last updated on [current date]. For the latest version, please visit the documentation section of the admin dashboard.* 