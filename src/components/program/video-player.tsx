"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateVideoProgress } from "@/app/program/actions";
import { formatTime } from "@/lib/utils/date-utils";
import YouTube from "react-youtube";

interface VideoPlayerProps {
  video: {
    id: string;
    title: string;
    description: string | null;
    sequenceNumber: number;
    durationSeconds: number | null;
    videoType?: string | null;
    youtubeId?: string | null;
  };
  videoUrl: string;
  initialProgress: number;
  isCompleted: boolean;
  userId: string;
  nextVideoId: string | null;
}

export default function VideoPlayer({
  video,
  videoUrl,
  initialProgress,
  isCompleted: initialIsCompleted,
  userId,
  nextVideoId
}: VideoPlayerProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [youtubePlayer, setYoutubePlayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(initialProgress);
  const [duration, setDuration] = useState(video.durationSeconds || 0);
  const [isCompleted] = useState(initialIsCompleted);
  const [progressMarked, setProgressMarked] = useState(initialIsCompleted);
  
  const isYouTube = video.videoType === "YOUTUBE" && video.youtubeId;
  
  // YouTube event handlers
  const onYouTubeReady = (event: any) => {
    const player = event.target;
    setYoutubePlayer(player);
    
    if (initialProgress > 0) {
      player.seekTo(initialProgress);
    }
    
    setDuration(player.getDuration());
  };
  
  const onYouTubeStateChange = (event: any) => {
    // Only track when video starts playing to mark as watched
    if (event.data === 1 && !progressMarked) {
      markVideoAsWatched();
    }
  };
  
  // Mark video as watched once
  const markVideoAsWatched = () => {
    if (!progressMarked) {
      // Fire and forget - don't block UI or update local state
      updateVideoProgress(userId, video.id, true).catch(error => {
        console.error("Failed to mark video as watched:", error);
      });
      
      // Only update the local flag to prevent repeated API calls
      setProgressMarked(true);
    }
  };
  
  // Set initial progress when self-hosted video loads
  useEffect(() => {
    if (!isYouTube && videoRef.current && initialProgress > 0) {
      videoRef.current.currentTime = initialProgress;
    }
  }, [initialProgress, isYouTube]);
  
  // Track YouTube video time for UI without sending to server
  useEffect(() => {
    if (!isYouTube || !youtubePlayer) return;
    
    const interval = setInterval(() => {
      try {
        const currentTime = Math.floor(youtubePlayer.getCurrentTime());
        setCurrentTime(currentTime);
      } catch (e) {
        // Handle any potential YouTube API errors
        console.error("Error getting YouTube time:", e);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isYouTube, youtubePlayer]);
  
  // Handle self-hosted video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(Math.floor(videoRef.current.duration));
    }
  };
  
  // Handle next video navigation
  const handleNextVideo = () => {
    if (nextVideoId) {
      router.push(`/program/${nextVideoId}`);
    } else {
      router.push('/program');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Video Player */}
        <div className="md:w-3/4 relative bg-black flex items-center justify-center">
          {isYouTube ? (
            <YouTube
              videoId={video.youtubeId ? video.youtubeId : ""}
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 0,
                  modestbranding: 1,
                  rel: 0,
                  controls: 1,
                  vq: 'hd1080',
                  suggestedQuality: 'large',
                },
              }}
              onReady={onYouTubeReady}
              onStateChange={onYouTubeStateChange}
              className="w-full h-full aspect-video"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                src={videoUrl}
                className="max-h-screen w-full md:h-auto"
                playsInline
                controls
                preload="auto"
                // onTimeUpdate={() => {
                //   if (videoRef.current && !progressMarked && videoRef.current.currentTime > 0) {
                //     setCurrentTime(Math.floor(videoRef.current.currentTime));
                //     markVideoAsWatched();
                //   } else if (videoRef.current) {
                //     setCurrentTime(Math.floor(videoRef.current.currentTime));
                //   }
                // }}
                // onLoadedMetadata={handleLoadedMetadata}
              />
            </>
          )}
        </div>
        
        {/* Video Info Sidebar */}
        <div className="md:w-1/4 bg-white p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {video.title}
          </h1>
          
          <div className="flex items-center mb-4">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
              Video {video.sequenceNumber}
            </span>
            {isCompleted && (
              <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                Completed
              </span>
            )}
          </div>
          
          {video.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
              <p className="text-gray-600">{video.description}</p>
            </div>
          )}
          
          <div className="mt-auto">
            <button
              onClick={() => router.push('/program')}
              className="w-full mb-3 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Program
            </button>
            
            {nextVideoId && (
              <button
                onClick={handleNextVideo}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Next Video
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 