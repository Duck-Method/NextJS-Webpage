// app/components/ProgressBar.tsx
'use client'; // Mark as a Client Component
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // Progress value (0 to 1)
  size?: number;    // Size of the progress bar (default: 100)
  strokeWidth?: number; // Stroke width of the circle (default: 10)
}

export default function ProgressBar({
  progress,
  size = 100,
  strokeWidth = 10,
}: ProgressBarProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#e2e8f0" // Background circle color
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#3b82f6" // Progress circle color
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-xl font-bold">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}