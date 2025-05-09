"use client";

import { useEffect, useRef, useState } from "react";

export default function BacksoundToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.loop = true;
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleAudio}
        className=" opacity-50 bg-[#927DE4] text-white px-4 py-2 rounded shadow text-shadow-lg hover:cursor-pointer hover:opacity-70"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
      <audio ref={audioRef} src="/audio/backsound.mp3" />
    </div>
  );
}