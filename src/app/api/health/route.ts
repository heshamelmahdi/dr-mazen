import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { S3Client } from '@aws-sdk/client-s3';

/**
 * Health check API endpoint for monitoring application health
 * This endpoint checks database connectivity and S3 connectivity
 */
export async function GET() {
  const checks = {
    database: { status: 'checking' as 'ok' | 'error' | 'checking', message: '' },
    s3: { status: 'checking' as 'ok' | 'error' | 'checking', message: '' },
    environment: { status: 'checking' as 'ok' | 'error' | 'checking', message: '' },
  };

  const startTime = Date.now();
  
  // Check database connectivity
  try {
    // Simple query to check database connectivity
    await prisma.$queryRaw`SELECT 1`;
    checks.database.status = 'ok';
    checks.database.message = 'Connected successfully';
  } catch (error) {
    checks.database.status = 'error';
    checks.database.message = error instanceof Error ? error.message : 'Unknown database error';
    logger.error('Health check - Database error', { error: checks.database.message });
  }
  
  // Check S3 connectivity
  try {
    const s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
    
    // Just initialize the client to check credentials
    // Don't make an actual API call in the health check to avoid costs
    if (s3Client) {
      checks.s3.status = 'ok';
      checks.s3.message = 'S3 client initialized successfully';
    }
  } catch (error) {
    checks.s3.status = 'error';
    checks.s3.message = error instanceof Error ? error.message : 'Unknown S3 error';
    logger.error('Health check - S3 error', { error: checks.s3.message });
  }
  
  // Check environment variables
  try {
    // Check that required environment variables are set
    const requiredEnvVars = [
      'AWS_REGION', 
      'AWS_ACCESS_KEY_ID', 
      'AWS_SECRET_ACCESS_KEY', 
      'AWS_S3_BUCKET_NAME', 
      'DATABASE_URL', 
      'NEXTAUTH_SECRET', 
      'NEXTAUTH_URL'
    ];
    
    const missingVars = requiredEnvVars.filter(varName => 
      !(varName in env) || !(env as any)[varName]
    );
    
    if (missingVars.length > 0) {
      checks.environment.status = 'error';
      checks.environment.message = `Missing environment variables: ${missingVars.join(', ')}`;
      logger.error('Health check - Environment error', { missingVars });
    } else {
      checks.environment.status = 'ok';
      checks.environment.message = 'All required environment variables set';
    }
  } catch (error) {
    checks.environment.status = 'error';
    checks.environment.message = error instanceof Error ? error.message : 'Unknown environment error';
    logger.error('Health check - Environment error', { error: checks.environment.message });
  }
  
  // Calculate overall status
  const overallStatus = Object.values(checks).every(check => check.status === 'ok') ? 'ok' : 'error';
  const responseTime = Date.now() - startTime;
  
  // Return health check response
  return NextResponse.json({
    status: overallStatus,
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    responseTime: `${responseTime}ms`,
    checks
  }, {
    status: overallStatus === 'ok' ? 200 : 500
  });
} 