// app/components/SoundMixer.tsx
'use client'; // Mark as a Client Component
import { useState } from 'react';

export default function SoundMixer() {
  const [rainVolume, setRainVolume] = useState<number>(0.5);
  const [cafeVolume, setCafeVolume] = useState<number>(0.5);

  const handleVolumeChange = (sound: string, volume: number) => {
    if (sound === 'rain') {
      setRainVolume(volume);
    } else if (sound === 'cafe') {
      setCafeVolume(volume);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Ambient Sounds</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Rain</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={rainVolume}
            onChange={(e) => handleVolumeChange('rain', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Café Chatter</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={cafeVolume}
            onChange={(e) => handleVolumeChange('cafe', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}