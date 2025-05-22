"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createProgramVideo, updateProgramVideo } from "@/app/(admin)/dashboard/program/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Upload, 
  Film, 
  Image as ImageIcon, 
  Youtube,
  Loader2
} from "lucide-react";

interface ProgramVideoFormProps {
  nextSequenceNumber?: number;
  editMode?: boolean;
  video?: {
    id: string;
    title: string;
    description: string | null;
    sequenceNumber: number;
    videoPath?: string;
    thumbnailPath?: string | null;
    videoType?: string;
    youtubeId?: string | null;
    durationSeconds?: number | null;
  };
}

export default function ProgramVideoForm({ 
  nextSequenceNumber = 1, 
  editMode = false,
  video 
}: ProgramVideoFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoType, setVideoType] = useState<string>(video?.videoType || "SELF_HOSTED");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    video?.thumbnailPath || null
  );
  // Track uploaded file paths
  const [videoPath, setVideoPath] = useState<string | null>(video?.videoPath || null);
  const [thumbnailPath, setThumbnailPath] = useState<string | null>(video?.thumbnailPath || null);
  // Track upload progress
  const [videoUploading, setVideoUploading] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  // Handle video file change
  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    
    setVideoFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setVideoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Upload to S3
    await uploadFileToS3(file, "video");
  };
  
  // Handle thumbnail file change
  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    
    setThumbnailFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Upload to S3
    await uploadFileToS3(file, "thumbnail");
  };
  
  // Function to upload file to S3 using presigned URL
  const uploadFileToS3 = async (file: File, fileCategory: "video" | "thumbnail") => {
    try {
      // Set uploading state
      if (fileCategory === "video") {
        setVideoUploading(true);
        setVideoUploadProgress(0);
      } else {
        setThumbnailUploading(true);
        setThumbnailUploadProgress(0);
      }
      
      // 1. Get presigned URL from backend
      const response = await fetch("/api/upload/presigned-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileCategory,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to get presigned URL");
      }
      
      const { url, key } = await response.json();
      
      // 2. Upload file directly to S3
      const uploadResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      
      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }
      
      // 3. Store the S3 key for form submission
      if (fileCategory === "video") {
        setVideoPath(key);
        toast.success("Video uploaded successfully");
      } else {
        setThumbnailPath(key);
        toast.success("Thumbnail uploaded successfully");
      }
      
      // Return the key for immediate use
      return key;
    } catch (error) {
      console.error(`Error uploading ${fileCategory}:`, error);
      toast.error(`Failed to upload ${fileCategory}`);
      return null;
    } finally {
      // Reset uploading state
      if (fileCategory === "video") {
        setVideoUploading(false);
      } else {
        setThumbnailUploading(false);
      }
    }
  };
  
  // Trigger file input click
  const triggerFileInput = (inputRef: React.RefObject<HTMLInputElement | null>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if uploads are still in progress
    if (videoUploading || thumbnailUploading) {
      toast.error("Please wait for uploads to complete");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      // Add S3 file paths to form data
      if (videoPath) {
        formData.set("videoPath", videoPath);
      }
      
      // If video was uploaded but no thumbnail, extract the first frame
      if (videoPath && !thumbnailPath && videoType === "SELF_HOSTED" && videoFile) {
        try {
          toast.info("No thumbnail provided, extracting from video...");
          const thumbnailBlob = await extractFirstFrameFromVideo(videoFile);
          const thumbnailFile = new File([thumbnailBlob], `thumbnail-${Date.now()}.jpg`, { type: 'image/jpeg' });
          
          // Upload the thumbnail to S3 and get the key directly
          const thumbnailKey = await uploadFileToS3(thumbnailFile, "thumbnail");
          
          // Use the returned key directly instead of depending on state update
          if (thumbnailKey) {
            formData.set("thumbnailPath", thumbnailKey);
          }
        } catch (error) {
          console.error("Error extracting thumbnail from video:", error);
          toast.error("Failed to extract thumbnail from video");
        }
      } else if (thumbnailPath) {
        formData.set("thumbnailPath", thumbnailPath);
      }
      
      let result;
      if (editMode && video?.id) {
        result = await updateProgramVideo(video.id, formData);
      } else {
        result = await createProgramVideo(formData);
      }
      
      if (result.success) {
        toast.success(`Video ${editMode ? "updated" : "created"} successfully`);
        
        // Redirect to program videos list
        router.push("/dashboard/program");
        router.refresh();
      } else {
        toast.error(`Failed to ${editMode ? "update" : "create"} video`, {
          description: result.error
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred", {
        description: "Please try again later"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Function to extract the first frame from a video file
  const extractFirstFrameFromVideo = (videoFile: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadeddata = () => {
        try {
          // Seek to the first frame
          video.currentTime = 0;
          
          // Wait for the video to be seeked
          video.onseeked = () => {
            // Create a canvas and draw the video frame
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Failed to get canvas context'));
              return;
            }
            
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Convert the canvas to a blob
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to convert canvas to blob'));
              }
            }, 'image/jpeg', 0.9);
          };
        } catch (error) {
          reject(error);
        }
      };
      
      video.onerror = () => {
        reject(new Error('Error loading video'));
      };
      
      // Set the video source to the file
      video.src = URL.createObjectURL(videoFile);
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Video Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="videoType">Video Type</Label>
              <Select
                name="videoType"
                defaultValue={video?.videoType || "SELF_HOSTED"}
                onValueChange={setVideoType}
              >
                <SelectTrigger id="videoType">
                  <SelectValue placeholder="Select video type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SELF_HOSTED">Self Hosted</SelectItem>
                  <SelectItem value="YOUTUBE">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {videoType === "YOUTUBE" ? (
              <div className="space-y-2">
                <Label htmlFor="youtubeId">YouTube Video ID</Label>
                <div className="relative">
                  <Input
                    id="youtubeId"
                    name="youtubeId"
                    placeholder="e.g. dQw4w9WgXcQ"
                    defaultValue={video?.youtubeId || ""}
                    className="pl-10"
                  />
                  <Youtube className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">
                  Enter the YouTube video ID from the video URL (e.g., youtube.com/watch?v=<strong>dQw4w9WgXcQ</strong>)
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Video File</Label>
                <input
                  type="file"
                  ref={videoInputRef}
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />
                
                <div 
                  onClick={() => !videoUploading && triggerFileInput(videoInputRef)}
                  className={`border-2 border-dashed border-gray-300 rounded-lg p-6 ${!videoUploading ? 'cursor-pointer hover:bg-gray-50' : ''} transition-colors`}
                >
                  {videoUploading ? (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
                      <p className="text-sm text-emerald-600 font-medium">
                        Uploading video... Please wait.
                      </p>
                    </div>
                  ) : videoPreview ? (
                    <div className="space-y-2">
                      <video
                        src={videoPreview}
                        controls
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-sm text-green-600 font-medium">
                        {videoFile?.name} ({videoFile && videoFile.size ? (videoFile.size / 1024 / 1024).toFixed(2) : 0} MB)
                      </p>
                      {videoPath && (
                        <p className="text-xs text-gray-500">
                          Uploaded successfully. Path: {videoPath}
                        </p>
                      )}
                    </div>
                  ) : video?.videoPath ? (
                    <div className="space-y-2">
                      <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                        <Film className="h-12 w-12 text-gray-400" />
                        <p className="text-sm text-gray-500 mt-2">Current video will be used</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-500">
                        Click to upload video file (.mp4, .webm, .ogg)
                      </p>
                      <p className="text-xs text-gray-400">
                        Max file size: 500MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label>Thumbnail Image</Label>
              <input
                type="file"
                ref={thumbnailInputRef}
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
              
              <div 
                onClick={() => !thumbnailUploading && triggerFileInput(thumbnailInputRef)}
                className={`border-2 border-dashed border-gray-300 rounded-lg p-6 ${!thumbnailUploading ? 'cursor-pointer hover:bg-gray-50' : ''} transition-colors`}
              >
                {thumbnailUploading ? (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
                    <p className="text-sm text-emerald-600 font-medium">
                      Uploading thumbnail... Please wait.
                    </p>
                  </div>
                ) : thumbnailPreview ? (
                  <div className="space-y-2">
                    <div className="relative h-40 w-full">
                      <Image
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    {thumbnailFile && (
                      <p className="text-sm text-green-600 font-medium">
                        {thumbnailFile.name} ({(thumbnailFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                    {thumbnailPath && (
                      <p className="text-xs text-gray-500">
                        Uploaded successfully. Path: {thumbnailPath}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
                    <p className="text-sm text-gray-500">
                      Click to upload thumbnail image (16:9 ratio recommended)
                    </p>
                    <p className="text-xs text-gray-400">
                      Max file size: 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Basic Information */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter video title"
                defaultValue={video?.title || ""}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter video description"
                defaultValue={video?.description || ""}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sequenceNumber">Sequence Number</Label>
              <Input
                id="sequenceNumber"
                name="sequenceNumber"
                type="number"
                min="1"
                placeholder="Enter sequence number"
                defaultValue={video?.sequenceNumber || nextSequenceNumber}
                required
              />
              <p className="text-sm text-gray-500">
                The order in which this video will appear in the program sequence
              </p>
            </div>
            
            {editMode && (
              <div className="space-y-2">
                <Label htmlFor="durationSeconds">Duration (seconds)</Label>
                <Input
                  id="durationSeconds"
                  name="durationSeconds"
                  type="number"
                  min="0"
                  placeholder="Enter video duration in seconds"
                  defaultValue={video?.durationSeconds || ""}
                />
                <p className="text-sm text-gray-500">
                  Video duration in seconds (optional)
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/program")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || videoUploading || thumbnailUploading}
        >
          {isSubmitting
            ? editMode
              ? "Updating..."
              : "Creating..."
            : editMode
            ? "Update Video"
            : "Create Video"}
        </Button>
      </div>
    </form>
  );
} 