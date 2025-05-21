# Dr. Mazen Nutrition Website

A Next.js application for Dr. Mazen's nutrition program, allowing clients to access educational content, recipes, and Q&A resources.

## Features

- **Authentication**: Secure login for clients with role-based access control
- **Program Videos**: Sequential educational videos with progress tracking
- **Recipes**: Collection of nutrition recipes with filtering capabilities
- **Q&A**: Questions and answers section with audio response support
- **Admin Dashboard**: Content management for videos, recipes, and Q&A
- **User Management**: Admin tools for managing client accounts and subscriptions

## Technology Stack

- **Frontend**: Next.js 15 with App Router, React, TypeScript
- **Styling**: TailwindCSS with ShadCN UI components
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL via Prisma ORM
- **Storage**: AWS S3 for media files (videos, images, audio)
- **Hosting**: Vercel (recommended)

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- AWS account with S3 bucket
- Environment variables configured (see below)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/drmazen

# AWS S3
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET_NAME=your-bucket-name

# NextAuth
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Optional: Error reporting (for production)
ERROR_REPORTING_API_KEY=your-error-reporting-key
```

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dr-mazen-website.git
cd dr-mazen-website

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at http://localhost:3000.

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Database Setup

1. Create a PostgreSQL database
2. Update the `DATABASE_URL` in your `.env.local` file
3. Run the initial migration:

```bash
npx prisma migrate dev --name init
```

4. (Optional) Seed the database with initial data:

```bash
npx prisma db seed
```

## AWS S3 Setup

1. Create an S3 bucket in your AWS account
2. Configure the following folders in your S3 bucket:
   - `program-videos/` - For program videos
   - `thumbnails/` - For video/recipe thumbnails
   - `qa-audio/` - For Q&A audio responses
3. Create an IAM user with the following permissions:
   - `s3:PutObject`
   - `s3:GetObject`
   - `s3:DeleteObject`
4. Update the AWS environment variables in your `.env.local` file

## Deployment

### Vercel Deployment (Recommended)

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy the application

### Alternative Deployment

The application can also be deployed to any platform that supports Next.js applications:

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Health Check

The application includes a health check endpoint at `/api/health` that checks:
- Database connectivity
- S3 connectivity
- Environment variables

Use this endpoint for monitoring the application health in production.

## Administration

### Initial Setup

1. Create an admin user in the database:

```bash
npx prisma studio
```

2. Add a user with role "ADMIN"
3. Log in with the admin credentials

### Managing Users

As an admin, you can:
- Create new user accounts
- Manage subscription dates
- Activate/deactivate users

### Content Management

The admin dashboard provides tools for:
- Uploading and managing program videos
- Adding and editing recipes
- Managing Q&A content

## Troubleshooting

### Database Connectivity Issues

- Verify your PostgreSQL server is running
- Check the DATABASE_URL in your environment variables
- Run `npx prisma db pull` to verify connectivity

### S3 Connectivity Issues

- Verify your AWS credentials are correct
- Check that your IAM user has the required permissions
- Ensure your S3 bucket exists and is properly configured

### Application Errors

- Check the application logs
- Visit the `/api/health` endpoint to verify system health
- Check browser console for client-side errors

## Monitoring and Logging

In production, it's recommended to use:
- Application monitoring service (like New Relic, DataDog, or Sentry)
- AWS CloudWatch for S3 activity monitoring
- Database monitoring through your PostgreSQL provider

## Performance Optimization

The application includes several performance optimizations:
- Code splitting with dynamic imports
- Image optimization with Next.js Image component
- API response caching where appropriate
- Lazy loading of heavy components

## License

This project is proprietary software.

## Contact

For support or inquiries, contact [your-email@example.com](mailto:your-email@example.com).