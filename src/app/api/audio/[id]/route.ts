import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getS3PresignedUrl } from "@/lib/s3";

type Params = Promise<{ id: string }>;

export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authentication
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401 }
      );
    }
    
    const { id } = await params;
    
    // Find the Q&A entry
    const qaEntry = await prisma.qAEntry.findUnique({
      where: { id }
    });
    
    if (!qaEntry) {
      return new NextResponse(
        JSON.stringify({ error: "Q&A entry not found" }),
        { status: 404 }
      );
    }
    
    // Check permissions for private entries
    if (qaEntry.isPrivate && session.user.role !== "ADMIN") {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 403 }
      );
    }
    
    // Check if entry has audio
    if (!qaEntry.answerAudioPath) {
      return new NextResponse(
        JSON.stringify({ error: "No audio available for this Q&A entry" }),
        { status: 404 }
      );
    }
    
    // Generate presigned URL for audio file
    const url = await getS3PresignedUrl(qaEntry.answerAudioPath);
    
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error fetching audio:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
} 