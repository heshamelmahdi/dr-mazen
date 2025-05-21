import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

// Initialize S3 client
const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Custom error class for S3 operations
 */
export class S3Error extends Error {
  statusCode?: number;
  
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'S3Error';
    this.statusCode = statusCode;
  }
}

/**
 * Uploads a file to S3
 * @param file The file to upload
 * @param folder The folder to upload the file to (e.g., "qa-audio", "thumbnails")
 * @returns The S3 path of the uploaded file
 * @throws {S3Error} If upload fails
 */
export async function uploadToS3(file: File, folder: string): Promise<string> {
  if (!file) {
    throw new S3Error('No file provided for upload');
  }

  try {
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    
    // Create unique filename
    const fileExtension = file.name.split(".").pop();
    const randomId = crypto.randomUUID();
    const filename = `${randomId}.${fileExtension}`;
    const key = `${folder}/${filename}`;
    
    // Upload file to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: bytes,
        ContentType: file.type,
      })
    );
    
    logger.info(`File uploaded successfully to S3: ${key}`, { size: file.size, type: file.type });
    return key;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Failed to upload file to S3', { folder, fileName: file.name, error: errorMessage }, error as Error);
    throw new S3Error(`Failed to upload file: ${errorMessage}`, 500);
  }
}

/**
 * Deletes a file from S3
 * @param key The S3 key of the file to delete
 * @throws {S3Error} If deletion fails
 */
export async function deleteFromS3(key: string): Promise<void> {
  if (!key) {
    throw new S3Error('No key provided for deletion');
  }
  
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: key,
      })
    );
    
    logger.info(`File deleted successfully from S3: ${key}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Failed to delete file from S3', { key, error: errorMessage }, error as Error);
    throw new S3Error(`Failed to delete file: ${errorMessage}`, 500);
  }
}

/**
 * Generates a pre-signed URL for a file in S3
 * @param key The S3 key of the file
 * @param expiresIn Expiration time in seconds (default: 3600)
 * @returns A pre-signed URL for accessing the file
 * @throws {S3Error} If URL generation fails
 */
export async function getS3PresignedUrl(key: string, expiresIn = 3600): Promise<string> {
  if (!key) {
    throw new S3Error('No key provided for presigned URL generation');
  }
  
  try {
    const command = new GetObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: key,
    });
    
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    logger.debug(`Generated presigned URL for S3 object: ${key}`, { expiresIn });
    return url;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Error generating presigned URL', { key, expiresIn, error: errorMessage }, error as Error);
    throw new S3Error(`Failed to generate URL: ${errorMessage}`, 500);
  }
} 