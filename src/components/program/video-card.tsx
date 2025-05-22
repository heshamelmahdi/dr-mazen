"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { formatDuration } from "@/lib/utils/date-utils";

interface VideoWithProgress {
  id: string;
  title: string;
  description: string | null;
  videoPath: string;
  thumbnailPath: string | null;
  sequenceNumber: number;
  durationSeconds: number | null;
  progress: {
    watchedSeconds: number;
    isCompleted: boolean;
    lastWatchedAt: Date | null;
  };
}

interface VideoCardProps {
  video: VideoWithProgress;
  onClick: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch presigned URL for thumbnail
  useEffect(() => {
    const fetchThumbnailUrl = async () => {
      if (video.thumbnailPath) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/thumbnails/presigned-url?key=${encodeURIComponent(video.thumbnailPath)}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const data = await response.json();
          setThumbnailUrl(data.url);
        } catch (error) {
          console.error(`Failed to get presigned URL for thumbnail:`, error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    fetchThumbnailUrl();
  }, [video.thumbnailPath]);
  
  // Calculate progress percentage
  const progressPercentage = video.durationSeconds 
    ? Math.min(100, Math.round((video.progress.watchedSeconds / video.durationSeconds) * 100))
    : video.progress.isCompleted ? 100 : 0;
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-[1.01] ${
        video.progress.isCompleted ? 'border-l-4 border-green-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative h-48 md:h-auto">
          {video.thumbnailPath ? (
            isLoading ? (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Loading...</span>
              </div>
            ) : thumbnailUrl ? (
              <Image 
                src={thumbnailUrl} 
                alt={video.title} 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Error loading thumbnail</span>
              </div>
            )
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No thumbnail</span>
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {video.durationSeconds ? formatDuration(video.durationSeconds) : 'N/A'}
          </div>
        </div>
        
        <div className="p-6 md:w-2/3">
          <div className="flex items-center mb-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
              Video {video.sequenceNumber}
            </span>
            {video.progress.isCompleted && (
              <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                Completed
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{video.title}</h3>
          
          {video.description && (
            <p className="text-gray-600 mb-4 line-clamp-2">{video.description}</p>
          )}
          
          <div className="mt-auto">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">{progressPercentage}% complete</span>
              {video.progress.lastWatchedAt && (
                <span className="text-xs text-gray-400">
                  Last watched: {new Date(video.progress.lastWatchedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 