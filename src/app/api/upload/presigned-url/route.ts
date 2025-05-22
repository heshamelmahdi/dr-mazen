import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPresignedUploadUrl, generateUniqueFileName } from "@/lib/s3";

export async function POST(request: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }
  
  try {
    // Parse request body
    const body = await request.json();
    const { fileName, fileType, fileCategory } = body;
    
    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: "Missing required fields: fileName and fileType" },
        { status: 400 }
      );
    }
    
    // Generate unique filename
    const uniqueFileName = generateUniqueFileName(fileName);
    
    // Determine folder based on fileCategory
    let folder = "uploads";
    if (fileCategory === "video") {
      folder = "videos";
    } else if (fileCategory === "thumbnail") {
      folder = "thumbnails";
    }
    
    // Get presigned URL
    const { url, key } = await getPresignedUploadUrl(
      uniqueFileName,
      fileType,
      folder
    );
    
    return NextResponse.json({ url, key });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 }
    );
  }
} 