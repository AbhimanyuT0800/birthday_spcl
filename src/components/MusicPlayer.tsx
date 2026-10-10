import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sounds } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Sync state
    setIsPlaying(sounds.isMusicPlaying());
  }, []);

  const handleToggleBgm = () => {
    const active = sounds.toggleBgm();
    setIsPlaying(active);
  };

  const handlePlayThemeSong = () => {
    sounds.playHappyBirthdayTheme();
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      {/* Quick Play Birthday Song chime */}
      <button
        onClick={handlePlayThemeSong}
        className="px-3 py-2 rounded-full glass-card-pink text-pink-200 hover:text-white text-xs font-semibold shadow-lg backdrop-blur-md active:scale-95 transition-all flex items-center gap-1.5"
        title="Play Birthday Melody Chime"
      >
        <Music className="w-3.5 h-3.5 text-pink-400" />
        <span className="hidden sm:inline">Play Melody</span>
      </button>

      {/* Background Ambience Toggle */}
      <button
        onClick={handleToggleBgm}
        className={`p-2.5 sm:px-3 sm:py-2 rounded-full glass-card text-xs font-semibold shadow-lg backdrop-blur-md active:scale-95 transition-all flex items-center gap-2 ${
          isPlaying ? 'text-pink-300 border-pink-400/50 bg-pink-500/20' : 'text-slate-300'
        }`}
        title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-pink-400 animate-pulse" />
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-3.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="hidden sm:inline text-[11px]">Music Playing</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Music Off</span>
          </>
        )}
      </button>
    </div>
  );
};
