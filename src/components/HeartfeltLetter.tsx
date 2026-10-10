import React, { useState } from 'react';
import { Mail, Heart, Sparkles, X } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerHearts } from '../utils/confetti';

interface HeartfeltLetterProps {
  bestieName: string;
  senderName: string;
  message: string;
}

export const HeartfeltLetter: React.FC<HeartfeltLetterProps> = ({
  bestieName,
  senderName,
  message,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      sounds.playSparkle();
      triggerHearts();
    } else {
      sounds.playPop();
    }
    setIsOpen(!isOpen);
  };

  const defaultMessage = `Dearest ${bestieName || 'Bestie'},

From our endless late-night talks to planning our wildest travel escapes, having you as my best friend is one of the greatest blessings in my life.

I know your secret, deepest dream — to one day pack your bags, leave the noise behind, and build your life among the breathtaking peaks of Switzerland 🇨🇭. Waking up to the Swiss Alps, sipping warm coffee on a wooden chalet balcony overlooking Lauterbrunnen's waterfalls, and breathing that crisp mountain air.

You deserve that fairytale life more than anyone I know. You have an adventurous soul, a golden heart that lights up everyone around you, and the courage to chase whatever sets your spirit on fire.

On your birthday today, I promise to always cheer for your wanderlust dreams, travel anywhere with you, and be the very first person knocking on the door of your cozy Swiss chalet! 🏔️✨

Happy Birthday to my favorite human and the future Swiss resident! 💖`;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 text-center max-w-md mx-auto relative overflow-hidden">
      {/* Decorative tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card-pink text-pink-300 text-xs font-semibold mb-3">
        <Mail className="w-3.5 h-3.5 text-pink-400" />
        <span>For Your Eyes Only 💌</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        A Letter From The Heart
      </h2>
      <p className="text-slate-300 text-xs sm:text-sm mb-6">
        {!isOpen
          ? 'There is a sealed message waiting for you. Tap the envelope to unseal it!'
          : 'Read slowly, because every word was written just for you.'}
      </p>

      {/* Envelope Graphic / Sealed Letter */}
      {!isOpen ? (
        <div
          onClick={handleToggle}
          className="cursor-pointer group relative mx-auto w-64 sm:w-72 h-44 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl shadow-2xl p-4 flex flex-col items-center justify-center transform hover:scale-105 active:scale-95 transition-all"
        >
          {/* Envelope flap aesthetic */}
          <div className="absolute top-0 inset-x-0 h-20 bg-pink-300/40 rounded-b-3xl border-b border-pink-200/50" />

          {/* Golden / Red Wax Stamp */}
          <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 border-2 border-amber-300/70 shadow-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Heart className="w-7 h-7 text-amber-200 fill-amber-200" />
          </div>

          <span className="relative z-10 text-white font-medium text-xs mt-3 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
            Tap to Break the Seal 💌
          </span>

          <Sparkles className="w-5 h-5 text-amber-200 absolute top-3 right-3 animate-pulse" />
        </div>
      ) : (
        /* Unfolded Aesthetic Letter Modal / Card */
        <div className="relative bg-[#fffdfa] text-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl border border-pink-200 text-left animate-fadeIn transition-all">
          {/* Cute Stamp on top right */}
          <div className="absolute top-4 right-4 w-11 h-14 border-2 border-dashed border-rose-400/60 rounded bg-rose-50/50 flex flex-col items-center justify-center select-none rotate-3">
            <span className="text-sm">🌸</span>
            <span className="text-[8px] font-bold text-rose-600 uppercase tracking-tighter">
              BESTIE
            </span>
          </div>

          {/* Letter Body */}
          <div className="font-handwriting text-lg sm:text-xl leading-relaxed text-slate-700 whitespace-pre-line pr-8">
            {message || defaultMessage}
          </div>

          {/* Signature */}
          <div className="mt-6 pt-4 border-t border-rose-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-rose-500 font-semibold uppercase tracking-wider">
                With all my love & support,
              </p>
              <p className="font-cursive text-2xl text-rose-700 font-bold">
                {senderName || 'Your Best Friend'}
              </p>
            </div>

            <button
              onClick={handleToggle}
              className="p-2 rounded-full hover:bg-rose-100 text-rose-600 transition-colors"
              title="Close letter"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
