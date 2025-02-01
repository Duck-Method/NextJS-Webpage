// app/page.tsx
'use client';
import Timer from './components/Timer';
import SoundMixer, { SoundMixerHandle } from './components/SoundMixer';
import { useRef } from 'react';

export default function Home() {
    const soundMixerRef = useRef<SoundMixerHandle>(null);

    const handleTimerEnd = () => {
        if (soundMixerRef.current) {
            soundMixerRef.current.fadeOutSounds(); //call fadeOutSounds on SoundMixer
        }
    };

    return (
        <main className="">
            <h1 className="">Focus Timer</h1>
            <div className="">
                <Timer onTimerEnd={handleTimerEnd} />
                <SoundMixer ref= {soundMixerRef}/>
            </div>
        </main>
    );
}