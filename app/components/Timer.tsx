// app/components/Timer.tsx
'use client'; // Mark as a Client Component
import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

export default function Timer() {
  const [time, setTime] = useState<number>(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && time > 0) {
      interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0) {
      clearInterval(interval);
      // Trigger timer end logic (e.g., play a sound)
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const progress = 1 -time / (25 * 60); // Calculate progress (0 to 1)
  

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
  };

  return (
    <div className="text-center">
        <ProgressBar progress={progress} size={150} strokeWidth={12} />
      <div className="text-2xl font-bold mb-4">
        {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
      </div>
      <div className="space-x-4">
        <button
          onClick={startTimer}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}