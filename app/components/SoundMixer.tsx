// app/components/SoundMixer.tsx
'use client'; // Mark as a Client Component
import { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';

//define the sound types
type SoundType = 'rain' | 'cafe' | 'fireplace' | 'whiteNoise';

//Sound Urls
const soundUrls: Record<SoundType, string> = {
    rain: '/sounds/rain.mp3',
    cafe: '/sounds/cafe.mp3',
    fireplace: '/sounds/fireplace.mp3',
    whiteNoise: '/sounds/white-noise.mp3'
};

export default function SoundMixer() {
    //state for volume levels
    const [volumes, setVolumes] = useState<Record<SoundType, number>>({
        rain: 0.5,
        cafe: 0.5,
        fireplace: 0.5,
        whiteNoise: 0.5,
    });

    //state for sound instances
    const [sounds, setSounds] = useState<Record<SoundType, Howl | null>>({
        rain:null,
        cafe:null,
        fireplace:null,
        whiteNoise:null,
    });

    const [isMuted, setIsMuted] = useState<boolean>(false);

    //initialize sounds on component mount
    useEffect(() => {
        const initializeSounds = () => {
            const newSounds = Object.keys(soundUrls).reduce((acc, key) => {
                const soundType = key as SoundType;
                acc[soundType] = new Howl({
                    src: [soundUrls[soundType]],
                    loop: true,
                    volume: volumes[soundType],
                });
                return acc;
            }, {} as Record<SoundType, Howl>);

            setSounds(newSounds);
        };

        initializeSounds();

        // Cleanup sounds on component unmount
        return () => {
            Object.values(sounds).forEach((sound) => sound?.unload());
        };
    }, []);

    //update volume for a specific sound
    const handleVolumeChange = (soundType: SoundType, volume: number) => {
        const sound = sounds[soundType];
        if (sound) {
            sound.volume(volume);
        }
        setVolumes((prev) => ({...prev, [soundType]: volume }));
    };

    // Toggle play/pause for a specific sound
    const toggleSound = (soundType: SoundType) => {
        const sound = sounds[soundType];
        if (sound) {
            if (sound.playing()) {
                sound.pause();
            } else {
                sound.play();
            }
        }
    };

    // Toggle mute for all sounds
    const toggleMute = () => {
        const newMuteState = !isMuted;
        Howler.mute(newMuteState);
        setIsMuted(newMuteState);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Ambient Sounds</h2>
            {/* Global mute for all sounds */}
            <button
                onClick={toggleMute}
                className="px-4 py-2 bg-gray-500 text-white rounded">{isMuted ? 'Unmute All' : 'Mute All'}
            </button>

            {/* Volume controls for each sound */}
            {Object.keys(soundUrls).map((key) => {
            const soundType = key as SoundType;
                return (
                    <div key={soundType} className="space-y-2">
                    <label className="block text-sm font-medium">
                    {soundType.charAt(0).toUpperCase() + soundType.slice(1)}
                    </label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volumes[soundType]}
                    onChange={(e) =>
                    handleVolumeChange(soundType, parseFloat(e.target.value))
                    }
                    className="w-full"
                />
                <button
                    onClick={() => toggleSound(soundType)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {sounds[soundType]?.playing() ? 'Pause' : 'Play'}
                </button>
                </div>
            );
            })}
        </div>
    );
}