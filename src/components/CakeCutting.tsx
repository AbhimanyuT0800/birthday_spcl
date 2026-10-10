import React, { useState } from 'react';
import { Sparkles, Flame, Heart, RefreshCw, Scissors } from 'lucide-react';
import { triggerBurst, triggerHearts } from '../utils/confetti';
import { sounds } from '../utils/audio';

export const CakeCutting: React.FC<{ bestieName: string }> = ({ bestieName }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    sounds.playSparkle();
    setCandlesBlown(true);
    setWishMade(true);
    triggerHearts();
  };

  const handleCutCake = () => {
    sounds.playFanfare();
    sounds.playPop();
    setCakeCut(true);
    triggerBurst();
  };

  const handleReset = () => {
    sounds.playPop();
    setCandlesBlown(false);
    setCakeCut(false);
    setWishMade(false);
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden max-w-md mx-auto">
      {/* Decorative tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card-pink text-pink-300 text-xs font-semibold mb-4">
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        <span>Make a Wish & Cut the Cake</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        Happy Birthday, {bestieName || 'Bestie'}! 🎂
      </h2>
      <p className="text-slate-300 text-xs sm:text-sm mb-6">
        {!candlesBlown
          ? 'Make a secret wish in your heart, then tap the button to blow out your candles!'
          : !cakeCut
          ? 'Your wish has flown to the stars! ⭐ Now slice the birthday cake!'
          : 'Hooray! The sweetest slice of happiness is served! 💕'}
      </p>

      {/* 3D-styled Interactive Cake Graphic */}
      <div className="relative py-6 flex flex-col items-center justify-center select-none">
        {/* Floating Wish Bubble if wish is made */}
        {wishMade && !cakeCut && (
          <div className="absolute top-0 px-4 py-1.5 rounded-full bg-pink-500/90 text-white text-xs font-bold shadow-lg animate-bounce z-20">
            ✨ Wish Sent to the Universe! 🌠
          </div>
        )}

        {/* Candles row */}
        <div className="flex gap-4 sm:gap-6 justify-center mb-1 z-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Flame */}
              {!candlesBlown ? (
                <div className="relative">
                  <div className="w-4 h-6 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full animate-bounce filter drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                  <Flame className="w-3 h-3 text-yellow-200 absolute -top-1 left-0.5 animate-pulse" />
                </div>
              ) : (
                <div className="w-2 h-4 text-slate-400 text-[10px] animate-pulse">💨</div>
              )}
              {/* Candle Body */}
              <div
                className={`w-3.5 h-9 rounded-t-sm shadow-inner transition-colors ${
                  i === 1
                    ? 'bg-gradient-to-b from-pink-300 to-pink-500'
                    : i === 0
                    ? 'bg-gradient-to-b from-purple-300 to-purple-500'
                    : 'bg-gradient-to-b from-amber-200 to-amber-400'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Cake Tier 1 (Top) */}
        <div className="w-32 sm:w-36 h-12 bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200 rounded-2xl shadow-lg border-b-4 border-pink-400 flex items-center justify-center relative overflow-hidden">
          {/* Frosting dripping */}
          <div className="absolute top-0 inset-x-0 h-4 bg-white/70 rounded-full blur-[1px]" />
          <span className="text-xs font-semibold text-pink-700 font-cursive text-base">
            Sweetest Bestie
          </span>
        </div>

        {/* Cake Tier 2 (Bottom) */}
        <div
          className={`w-48 sm:w-56 h-16 bg-gradient-to-r from-purple-300 via-pink-200 to-purple-300 rounded-3xl shadow-2xl border-b-4 border-purple-400 flex items-center justify-center relative mt-[-6px] transition-transform duration-500 ${
            cakeCut ? 'translate-x-1 rotate-1' : ''
          }`}
        >
          {/* Strawberry decorations */}
          <div className="flex gap-4">
            <span className="text-lg">🍓</span>
            <span className="text-lg">💖</span>
            <span className="text-lg">🍓</span>
          </div>

          {/* Sliced line effect if cut */}
          {cakeCut && (
            <div className="absolute inset-y-0 left-1/2 w-1 bg-pink-600/60 shadow-lg transform -rotate-12 animate-pulse" />
          )}
        </div>

        {/* Cake Stand / Plate */}
        <div className="w-56 sm:w-64 h-3.5 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 rounded-full shadow-xl mt-1 border border-amber-300/60" />
      </div>

      {/* Interactive Action Buttons */}
      <div className="mt-4 flex flex-col gap-2.5">
        {!candlesBlown ? (
          <button
            onClick={handleBlowCandles}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-pink-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-amber-200" />
            <span>Blow the Candles & Make a Wish 🕯️</span>
          </button>
        ) : !cakeCut ? (
          <button
            onClick={handleCutCake}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:to-rose-600 text-white font-bold text-sm shadow-lg shadow-purple-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 animate-bounce"
          >
            <Scissors className="w-4 h-4" />
            <span>Cut the Cake! 🍰</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <div className="flex-1 py-3 px-4 rounded-2xl bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs font-semibold flex items-center justify-center gap-1.5">
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
              <span>Enjoy your slice of joy!</span>
            </div>
            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-2xl glass-card text-slate-300 hover:text-white text-xs font-medium active:scale-95 transition-all flex items-center gap-1.5"
              title="Light candles again"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
