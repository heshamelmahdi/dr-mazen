// Environment variables with type safety and validation
import { z } from 'zod';

// Schema for validating environment variables
const envSchema = z.object({
  // AWS S3 configuration
  AWS_REGION: z.string().min(1, "AWS_REGION is required"),
  AWS_ACCESS_KEY_ID: z.string().min(1, "AWS_ACCESS_KEY_ID is required"),
  AWS_SECRET_ACCESS_KEY: z.string().min(1, "AWS_SECRET_ACCESS_KEY is required"),
  AWS_S3_BUCKET_NAME: z.string().min(1, "AWS_S3_BUCKET_NAME is required"),
  
  // Database configuration
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  
  // NextAuth configuration
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL"),
  
  // Application environment
  NODE_ENV: z.enum(["development", "production", "test"]),
});

// Process environment variables
const processEnv = {
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NODE_ENV: process.env.NODE_ENV,
  ERROR_REPORTING_API_KEY: process.env.ERROR_REPORTING_API_KEY,
};

// Validate environment variables
const validateEnv = () => {
  try {
    return envSchema.parse(processEnv);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path}: ${err.message}`).join('\n  ');
      console.error(`❌ Invalid environment variables:\n  ${missingVars}`);
      
      // In development, we can continue with warnings
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Proceeding with development environment despite missing variables');
        return processEnv as z.infer<typeof envSchema>;
      }
    }
    throw new Error('Invalid environment variables. Check server logs for more details.');
  }
};

// Export validated environment variables
export const env = validateEnv(); 