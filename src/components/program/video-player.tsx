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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialProgress);
  const [duration, setDuration] = useState(video.durationSeconds || 0);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const [showControls, setShowControls] = useState(true);
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
    // YouTube state: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    const playerState = event.data;
    
    if (playerState === 1) {
      setIsPlaying(true);
      markVideoAsWatched();
    } else if (playerState === 2) {
      setIsPlaying(false);
    } else if (playerState === 0) {
      setIsPlaying(false);
      setIsCompleted(true);
    }
  };
  
  // Mark video as watched once
  const markVideoAsWatched = async () => {
    if (!progressMarked) {
      try {
        await updateVideoProgress(userId, video.id, true);
        setProgressMarked(true);
        setIsCompleted(true);
      } catch (error) {
        console.error("Failed to mark video as watched:", error);
      }
    }
  };
  
  // Set initial progress when self-hosted video loads
  useEffect(() => {
    if (!isYouTube && videoRef.current && initialProgress > 0) {
      videoRef.current.currentTime = initialProgress;
    }
  }, [initialProgress, isYouTube]);
  
  // Mark video as watched when playback starts
  useEffect(() => {
    if (isPlaying && !progressMarked) {
      markVideoAsWatched();
    }
  }, [isPlaying, progressMarked]);
  
  // Track current time for UI without sending to server
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      let currentTime = 0;
      
      if (isYouTube && youtubePlayer) {
        currentTime = Math.floor(youtubePlayer.getCurrentTime());
      } else if (videoRef.current) {
        currentTime = Math.floor(videoRef.current.currentTime);
      }
      
      setCurrentTime(currentTime);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying, isYouTube, youtubePlayer]);
  
  // Handle self-hosted video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(Math.floor(videoRef.current.duration));
    }
  };
  
  // Handle play/pause for self-hosted video
  const togglePlay = () => {
    if (isYouTube && youtubePlayer) {
      if (isPlaying) {
        youtubePlayer.pauseVideo();
      } else {
        youtubePlayer.playVideo();
      }
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
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
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsCompleted(true)}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={() => videoRef.current && setCurrentTime(Math.floor(videoRef.current.currentTime))}
                onClick={togglePlay}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              />
              
              {/* Custom Video Controls for self-hosted videos */}
              {!isYouTube && (
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="w-full bg-gray-600 rounded-full h-1.5 mb-2">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full" 
                      style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={togglePlay}
                      className="text-white focus:outline-none"
                    >
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </button>
                    
                    <div className="text-white text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                </div>
              )}
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