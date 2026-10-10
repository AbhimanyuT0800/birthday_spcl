import React, { useState } from 'react';
import { Sparkles, Heart, Shuffle, ArrowRight } from 'lucide-react';
import { triggerBurst } from '../utils/confetti';
import { sounds } from '../utils/audio';

interface ReasonsJarProps {
  reasons: string[];
  bestieName: string;
}

export const ReasonsJar: React.FC<ReasonsJarProps> = ({ reasons, bestieName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    sounds.playPop();
    triggerBurst(0.5, 0.6);
    const nextIdx = (currentIndex + 1) % reasons.length;
    setCurrentIndex(nextIdx);
  };

  const handleRandom = () => {
    sounds.playSparkle();
    const randomIdx = Math.floor(Math.random() * reasons.length);
    setCurrentIndex(randomIdx);
    triggerBurst(0.5, 0.6);
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-md mx-auto text-center relative overflow-hidden">
      {/* Decorative tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card-pink text-pink-300 text-xs font-semibold mb-3">
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        <span>The Bestie Reasons Jar ⭐</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        Why You Are Irreplaceable
      </h2>
      <p className="text-slate-300 text-xs sm:text-sm mb-6">
        Here are just a few of the thousands of reasons why you are the best girl best friend ever!
      </p>

      {/* The Glow Card for Current Reason */}
      <div className="relative min-h-[170px] flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-pink-950/40 via-purple-900/30 to-pink-900/40 border border-pink-400/30 shadow-xl mb-6">
        {/* Star Badge */}
        <div className="flex items-center justify-between text-xs text-pink-300 font-semibold mb-3">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            Reason #{currentIndex + 1}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-[10px]">
            {currentIndex + 1} of {reasons.length}
          </span>
        </div>

        {/* Reason Text */}
        <p className="font-handwriting text-2xl sm:text-3xl text-pink-100 font-medium leading-relaxed my-auto select-none">
          "{reasons[currentIndex]}"
        </p>

        {/* Bottom subtle note */}
        <div className="text-[11px] text-pink-300/60 mt-3 italic">
          To {bestieName || 'Bestie'} with all my love ✨
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleNext}
          className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>Next Reason</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleRandom}
          className="py-3 px-4 rounded-2xl glass-card text-pink-200 hover:text-white hover:bg-white/10 text-xs font-semibold active:scale-95 transition-all flex items-center justify-center gap-1.5"
          title="Pick a random reason"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Surprise</span>
        </button>
      </div>

      {/* Progress pill indicator */}
      <div className="mt-5 flex justify-center gap-1.5 flex-wrap max-w-xs mx-auto">
        {reasons.map((_, idx) => (
          <div
            key={idx}
            onClick={() => {
              setCurrentIndex(idx);
              sounds.playPop();
            }}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
              idx === currentIndex
                ? 'bg-pink-400 scale-125 shadow-sm shadow-pink-400'
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
