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
  Youtube
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
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  // Handle video file change
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setVideoPreview(null);
    }
  };
  
  // Handle thumbnail file change
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setThumbnailFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview(null);
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
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      // Add video file to form data if selected
      if (videoFile && videoType === "SELF_HOSTED") {
        formData.set("videoFile", videoFile);
      }
      
      // Add thumbnail file to form data if selected
      if (thumbnailFile) {
        formData.set("thumbnailFile", thumbnailFile);
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
                  onClick={() => triggerFileInput(videoInputRef)}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {videoPreview ? (
                    <div className="space-y-2">
                      <video
                        src={videoPreview}
                        controls
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="text-sm text-green-600 font-medium">
                        {videoFile?.name} ({videoFile && videoFile.size ? (videoFile.size / 1024 / 1024).toFixed(2) : 0} MB)
                      </p>
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
                onClick={() => triggerFileInput(thumbnailInputRef)}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {thumbnailPreview ? (
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
        <Button type="submit" disabled={isSubmitting}>
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