// app/components/Timer.tsx
'use client'; // Mark as a Client Component
import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

interface TimerProps {
    onTimerEnd: () => void; //callback to notify when the timer ends
}

export default function Timer({ onTimerEnd }: TimerProps) {
  const [time, setTime] = useState<number>(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState<boolean>(false);


  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0) {
      clearInterval(interval);
      onTimerEnd(); //fade out sounds when timer reaches zero
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
    <div className="">
        <ProgressBar progress={progress} size={150} strokeWidth={12} />
      <div className="countdown">
        {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
      </div>
      <div className="center">
        <button
          onClick={startTimer}
          className=""
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          className=""
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className=""
        >
          Reset
        </button>
      </div>
    </div>
  );
}