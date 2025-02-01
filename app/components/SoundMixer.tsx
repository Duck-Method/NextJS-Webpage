// app/components/SoundMixer.tsx
'use client'; // Mark as a Client Component
import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Howl } from 'howler';

//define the sound types
type SoundType = 'rain' | 'cafe' | 'fireplace' | 'whiteNoise';

//Sound Urls
const soundUrls: Record<SoundType, string> = {
    rain: '/sounds/rain.mp3',
    cafe: '/sounds/cafe.mp3',
    fireplace: '/sounds/fireplace.mp3',
    whiteNoise: '/sounds/white-noise.mp3'
};

//define the ref type
export type SoundMixerHandle = {
    fadeOutSounds: () => void;
};

//sound played upon timer reaching 0
const completionSound = new Howl({
src: ['/sounds/chime.mp3'],
volume: 0.5,
});

const SoundMixer = forwardRef<SoundMixerHandle>((props, ref) => {
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

    const [isPlayingMap, setIsPlayingMap] = useState<Record<SoundType, boolean>>({
        rain: false,
        cafe: false,
        fireplace: false,
        whiteNoise: false,
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
        setVolumes((prev) => ({...prev, [soundType]: volume })); //update state
    };

    // Toggle play/pause for a specific sound
    const toggleSound = (soundType: SoundType) => {
        const sound = sounds[soundType];
        if (sound) {
            if (sound.playing()) {
                sound.pause();
                setIsPlayingMap((prev) => ({...prev, [soundType]: false})); //this line of code updates the satate to render the change in the browser
            } else {
                sound.play();
                setIsPlayingMap((prev) => ({...prev, [soundType]: true}));
            }
        }
    };

    // Toggle mute for all sounds
    const toggleMute = () => {
        const newMuteState = !isMuted;
        Object.values(sounds).forEach((sound) =>{
            if (sound) {
                sound.mute(newMuteState); // mute/unmute individual sounds
            }
        });
        setIsMuted(newMuteState);
    };

    //function to fade out all sounds and restore volumes
    const fadeOutSounds = () => {
        const fadeDuration = 3000; // 3 seconds

        Object.entries(sounds).forEach(([key, sound]) => {
            const soundType = key as SoundType;
            if (sound) {
                sound.fade(sound.volume(), 0, fadeDuration);

                //after fade-out, stop the sound and restore its volume
                setTimeout(() => {
                    sound.stop();
                    setIsPlayingMap((prev) => ({...prev, [soundType]: false}));
                    completionSound.play();
                    sound.volume(volumes[soundType]); //restore user-set volume
                }, fadeDuration);
            }
        });
    };

    // expose the fadeout function via ref
    useImperativeHandle(ref, () => ({
        fadeOutSounds
    }));

    return (
        <div className="circle">
            <h2 className="">Ambient Sounds</h2>
            {/* Global mute for all sounds */}
            <button
                onClick={toggleMute}
                className="">{isMuted ? 'Unmute All' : 'Mute All'}
            </button>

            {/* Volume controls for each sound */}
            {Object.keys(soundUrls).map((key) => {
            const soundType = key as SoundType;
                return (
                    <div key={soundType} className="sliders">
                    <label className="left">
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
                        className="center"
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
});

export default SoundMixer;