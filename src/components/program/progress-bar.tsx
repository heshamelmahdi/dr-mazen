"use client";

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div 
        className="bg-green-600 h-4 rounded-full transition-all duration-500 ease-in-out" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
} 