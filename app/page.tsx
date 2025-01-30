// app/page.tsx
import Timer from './components/Timer';
import SoundMixer from './components/SoundMixer';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Focus Timer</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <Timer />
        <SoundMixer />
      </div>
    </main>
  );
}