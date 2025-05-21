"use client";

interface ProgressBarProps {
  percentage: number;
  color?: string;
  height?: number;
  backgroundColor?: string;
}

export default function ProgressBar({
  percentage,
  color = "bg-green-600",
  height = 8,
  backgroundColor = "bg-gray-200"
}: ProgressBarProps) {
  // Ensure percentage is between 0 and 100
  const boundedPercentage = Math.min(100, Math.max(0, percentage));
  
  return (
    <div className={`w-full ${backgroundColor} rounded-full overflow-hidden`} style={{ height: `${height}px` }}>
      <div
        className={`${color} h-full transition-all duration-500 ease-in-out`}
        style={{ width: `${boundedPercentage}%` }}
        role="progressbar"
        aria-valuenow={boundedPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
} 