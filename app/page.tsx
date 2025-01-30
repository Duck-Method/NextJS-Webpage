// app/page.tsx
// this is the default route 

import Timer from './components/Timer.tsx'
import SoundMixer from './components/SoundMixer.tsx';

export default function Home() {
    return (
        <main>
            <h1>Focus Timer</h1>
            <div>
                <Timer />
                <SoundMixer />
            </div>
        </main>
    );
}