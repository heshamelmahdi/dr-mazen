"use client";

import { useRouter } from "next/navigation";
import { formatDate, formatDuration } from "@/lib/utils/date-utils";

interface VideoWithProgress {
  video: {
    id: string;
    title: string;
    sequenceNumber: number;
    durationSeconds: number | null;
  };
  isCompleted: boolean;
  watchedSeconds: number;
  lastWatchedAt: Date;
}

interface VideoProgressListProps {
  videoProgress: VideoWithProgress[];
}

export default function VideoProgressList({ videoProgress }: VideoProgressListProps) {
  const router = useRouter();
  
  // Sort by last watched date (most recent first)
  const sortedProgress = [...videoProgress].sort(
    (a, b) => new Date(b.lastWatchedAt).getTime() - new Date(a.lastWatchedAt).getTime()
  );
  
  // Take only the 5 most recent
  const recentProgress = sortedProgress.slice(0, 5);
  
  if (recentProgress.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600">
          You haven't watched any videos yet. Start your journey now!
        </p>
        <button
          onClick={() => router.push("/program")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Go to Program
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {recentProgress.map((progress) => (
        <div 
          key={progress.video.id}
          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
          onClick={() => router.push(`/program/${progress.video.id}`)}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-gray-800">
                {progress.video.title}
              </h4>
              <p className="text-sm text-gray-500">
                Video {progress.video.sequenceNumber}
              </p>
            </div>
            {progress.isCompleted && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Completed
              </span>
            )}
          </div>
          
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ 
                  width: `${progress.video.durationSeconds 
                    ? Math.min(100, Math.round((progress.watchedSeconds / progress.video.durationSeconds) * 100)) 
                    : progress.isCompleted ? 100 : 0}%` 
                }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">
                {progress.video.durationSeconds 
                  ? `${formatDuration(progress.watchedSeconds)} / ${formatDuration(progress.video.durationSeconds)}`
                  : progress.isCompleted ? "Completed" : "In progress"}
              </span>
              <span className="text-xs text-gray-500">
                Last watched: {formatDate(progress.lastWatchedAt)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 