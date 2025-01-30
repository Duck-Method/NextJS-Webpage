// app/components/Timer.tsx
'use client'; // Mark as a Client Component
import { useState, useEffect } from 'react';

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

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
  };

  return (
    <div>
      <div>
        {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
      </div>
      <div>
        <button
          onClick={startTimer}
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
}