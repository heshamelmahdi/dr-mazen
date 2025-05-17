# Database Schema

This document outlines the database schema for the nutrition website, detailing all entities, their relationships, and interactions. The schema is designed to support the core functionality of the website, including user authentication, content management, and progress tracking.

## Database Technology

- **Database**: PostgreSQL (hosted on Supabase)
- **ORM**: Prisma
- **Access Pattern**: Server-side access through Prisma client

## Schema Overview

The database schema consists of the following primary entities:

1. **User** - Represents both admin and client users
2. **ProgramVideo** - Educational videos in the Program Explanation section
3. **VideoProgress** - Tracks user progress through program videos
4. **Recipe** - Recipe content including YouTube links or self-hosted videos
5. **QAEntry** - Question and answer pairs for the Q&A section
6. **UserQuestion** - Questions submitted by users

## Entity Relationships

```
User 1──N VideoProgress
User 1──N UserQuestion
ProgramVideo 1──N VideoProgress
```

## Prisma Schema

```prisma
// This is your Prisma schema file

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  ADMIN
  CLIENT
}

model User {
  id                String           @id @default(uuid())
  email             String           @unique
  password          String           // Hashed password
  name              String?
  role              UserRole         @default(CLIENT)
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
  subscriptionEndDate DateTime?
  isActive          Boolean          @default(true)
  videoProgress     VideoProgress[]
  userQuestions     UserQuestion[]
}

model ProgramVideo {
  id                String           @id @default(uuid())
  title             String
  description       String?
  videoPath         String           // S3 path to video file
  thumbnailPath     String?          // S3 path to thumbnail image
  sequenceNumber    Int              // Order in the sequence
  durationSeconds   Int?
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
  isActive          Boolean          @default(true)
  videoProgress     VideoProgress[]
}

model VideoProgress {
  id                String           @id @default(uuid())
  userId            String
  videoId           String
  watchedSeconds    Int              @default(0)
  isCompleted       Boolean          @default(false)
  lastWatchedAt     DateTime         @default(now())
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
  
  user              User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  video             ProgramVideo     @relation(fields: [videoId], references: [id], onDelete: Cascade)
  
  @@unique([userId, videoId])
  @@index([userId])
  @@index([videoId])
}

enum RecipeType {
  YOUTUBE
  SELF_HOSTED
}

model Recipe {
  id                String           @id @default(uuid())
  title             String
  description       String?
  recipeType        RecipeType
  youtubeUrl        String?          // URL for YouTube videos
  videoPath         String?          // S3 path for self-hosted videos
  thumbnailPath     String?          // S3 path to thumbnail image
  calories          Int?
  protein           Float?           // in grams
  carbs             Float?           // in grams
  fat               Float?           // in grams
  mealType          String?          // e.g., "Breakfast", "Lunch", "Dinner", "Snack"
  tags              String[]         // Array of tags
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
  isActive          Boolean          @default(true)
}

enum AnswerType {
  TEXT
  AUDIO
}

model QAEntry {
  id                String           @id @default(uuid())
  question          String
  answerType        AnswerType
  answerText        String?          // Text answer
  answerAudioPath   String?          // S3 path to audio file
  isPrivate         Boolean          @default(false) // If true, only visible to specific users
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
  isActive          Boolean          @default(true)
}

model UserQuestion {
  id                String           @id @default(uuid())
  userId            String
  question          String
  isAnswered        Boolean          @default(false)
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
  
  user              User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}
```

## Schema Details

### User

The `User` model represents both admin and client users of the system.

- **id**: Unique identifier (UUID)
- **email**: User's email address (unique)
- **password**: Hashed password
- **name**: User's display name (optional)
- **role**: Either ADMIN or CLIENT
- **createdAt**: Timestamp of account creation
- **updatedAt**: Timestamp of last update
- **subscriptionEndDate**: Date when user's subscription expires
- **isActive**: Whether the user account is active
- **Relations**:
  - One-to-many with VideoProgress
  - One-to-many with UserQuestion

### ProgramVideo

The `ProgramVideo` model represents educational videos in the Program Explanation section.

- **id**: Unique identifier (UUID)
- **title**: Video title
- **description**: Video description (optional)
- **videoPath**: S3 path to the video file
- **thumbnailPath**: S3 path to thumbnail image (optional)
- **sequenceNumber**: Order in the sequence (for sequential viewing)
- **durationSeconds**: Video duration in seconds (optional)
- **createdAt**: Timestamp of creation
- **updatedAt**: Timestamp of last update
- **isActive**: Whether the video is active and visible
- **Relations**:
  - One-to-many with VideoProgress

### VideoProgress

The `VideoProgress` model tracks user progress through program videos.

- **id**: Unique identifier (UUID)
- **userId**: Reference to User
- **videoId**: Reference to ProgramVideo
- **watchedSeconds**: Number of seconds watched
- **isCompleted**: Whether the video has been completed
- **lastWatchedAt**: Timestamp of last watch
- **createdAt**: Timestamp of creation
- **updatedAt**: Timestamp of last update
- **Relations**:
  - Many-to-one with User
  - Many-to-one with ProgramVideo
- **Constraints**:
  - Unique constraint on [userId, videoId]
  - Indexes on userId and videoId for query performance

### Recipe

The `Recipe` model represents recipe content including YouTube links or self-hosted videos.

- **id**: Unique identifier (UUID)
- **title**: Recipe title
- **description**: Recipe description (optional)
- **recipeType**: Either YOUTUBE or SELF_HOSTED
- **youtubeUrl**: URL for YouTube videos (optional)
- **videoPath**: S3 path for self-hosted videos (optional)
- **thumbnailPath**: S3 path to thumbnail image (optional)
- **calories**: Calorie count (optional)
- **protein**: Protein content in grams (optional)
- **carbs**: Carbohydrate content in grams (optional)
- **fat**: Fat content in grams (optional)
- **mealType**: Type of meal (optional)
- **tags**: Array of tags for categorization
- **createdAt**: Timestamp of creation
- **updatedAt**: Timestamp of last update
- **isActive**: Whether the recipe is active and visible

### QAEntry

The `QAEntry` model represents question and answer pairs for the Q&A section.

- **id**: Unique identifier (UUID)
- **question**: The question text
- **answerType**: Either TEXT or AUDIO
- **answerText**: Text answer (optional)
- **answerAudioPath**: S3 path to audio file (optional)
- **isPrivate**: Whether the Q&A is private
- **createdAt**: Timestamp of creation
- **updatedAt**: Timestamp of last update
- **isActive**: Whether the Q&A entry is active and visible

### UserQuestion

The `UserQuestion` model represents questions submitted by users.

- **id**: Unique identifier (UUID)
- **userId**: Reference to User
- **question**: The question text
- **isAnswered**: Whether the question has been answered
- **createdAt**: Timestamp of creation
- **updatedAt**: Timestamp of last update
- **Relations**:
  - Many-to-one with User
- **Constraints**:
  - Index on userId for query performance

## Database Access Patterns

### User Authentication and Authorization

- Retrieve user by email for login
- Check subscription end date for access control
- Verify user role for admin functionality

```typescript
// Login verification
const user = await prisma.user.findUnique({
  where: { email }
});

// Subscription check
const hasActiveSubscription = user.subscriptionEndDate > new Date();

// Admin check
const isAdmin = user.role === 'ADMIN';
```

### Program Videos

- Retrieve all program videos in sequence order
- Get video progress for a specific user
- Update video progress when user watches content

```typescript
// Get all videos in sequence
const videos = await prisma.programVideo.findMany({
  where: { isActive: true },
  orderBy: { sequenceNumber: 'asc' }
});

// Get user progress for all videos
const progress = await prisma.videoProgress.findMany({
  where: { userId }
});

// Update progress
await prisma.videoProgress.upsert({
  where: { 
    userId_videoId: { userId, videoId } 
  },
  update: { 
    watchedSeconds,
    isCompleted,
    lastWatchedAt: new Date()
  },
  create: {
    userId,
    videoId,
    watchedSeconds,
    isCompleted
  }
});
```

### Recipes

- Retrieve all recipes with optional filtering
- Get recipe details by ID

```typescript
// Get all recipes with filtering
const recipes = await prisma.recipe.findMany({
  where: {
    isActive: true,
    ...(mealType ? { mealType } : {}),
    ...(tags ? { tags: { hasSome: tags } } : {})
  }
});

// Get recipe by ID
const recipe = await prisma.recipe.findUnique({
  where: { id }
});
```

### Q&A

- Retrieve all public Q&A entries
- Submit new user question
- Get all user questions (admin only)

```typescript
// Get all public Q&A entries
const qaEntries = await prisma.qAEntry.findMany({
  where: { 
    isActive: true,
    isPrivate: false
  }
});

// Submit new question
await prisma.userQuestion.create({
  data: {
    userId,
    question
  }
});

// Get all user questions (admin)
const userQuestions = await prisma.userQuestion.findMany({
  include: { user: true }
});
```

## Indexing Strategy

The schema includes strategic indexes to optimize common query patterns:

- Index on `VideoProgress.userId` for quick retrieval of a user's progress
- Index on `VideoProgress.videoId` for quick retrieval of all progress for a video
- Unique constraint on `[VideoProgress.userId, VideoProgress.videoId]` to prevent duplicates
- Index on `UserQuestion.userId` for quick retrieval of a user's questions

## Data Integrity

The schema enforces referential integrity through:

- Foreign key constraints with `onDelete: Cascade` to ensure that when a user or video is deleted, related progress records are also deleted
- Required fields marked without `?` to ensure essential data is always present
- Default values for fields like `isActive` and `createdAt` to ensure consistency

## Schema Evolution

As the application evolves, the schema may need to be updated. Prisma makes this process straightforward through migrations:

1. Update the schema.prisma file
2. Run `npx prisma migrate dev --name descriptive_name`
3. Prisma will generate and apply the necessary SQL migrations

This approach ensures that schema changes are tracked and can be applied consistently across environments.