"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VideoCard from "@/components/program/video-card";
import ProgressBar from "@/components/program/progress-bar";

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

interface ProgramContentProps {
  videos: VideoWithProgress[];
  userId: string;
}

export default function ProgramContent({ videos, userId }: ProgramContentProps) {
  const router = useRouter();
  
  // Calculate overall progress
  const completedVideos = videos.filter(video => video.progress.isCompleted).length;
  const totalVideos = videos.length;
  const progressPercentage = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
  
  // Find the next unwatched video
  const nextUnwatchedVideo = videos.find(video => !video.progress.isCompleted);
  
  const handleContinue = () => {
    if (nextUnwatchedVideo) {
      router.push(`/program/${nextUnwatchedVideo.id}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-cream-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
          Program Explanation
        </h1>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Your Progress</h2>
          <ProgressBar percentage={progressPercentage} />
          <p className="mt-2 text-gray-600">
            {completedVideos} of {totalVideos} videos completed
          </p>
          
          {nextUnwatchedVideo && (
            <button
              onClick={handleContinue}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              Continue Learning
            </button>
          )}
          
          {!nextUnwatchedVideo && totalVideos > 0 && (
            <div className="mt-4 px-6 py-3 bg-green-100 text-green-800 rounded-lg">
              Congratulations! You've completed all the program videos.
            </div>
          )}
        </div>
        
        <h2 className="text-2xl font-semibold text-green-700 mb-6">
          Program Videos
        </h2>
        
        <div className="space-y-6">
          {videos.map((video) => (
            <VideoCard 
              key={video.id}
              video={video}
              onClick={() => router.push(`/program/${video.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 