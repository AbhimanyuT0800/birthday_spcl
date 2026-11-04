import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onFinish: () => void;
  duration?: number;
  label?: string;
}

const PETAL_COUNT = 8;

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onFinish,
  duration = 2200,
  label = 'Preparing something special',
}) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(
      () => setLeaving(true),
      Math.max(0, duration - 700)
    );
    const doneTimer = window.setTimeout(onFinish, duration);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [duration, onFinish]);

  const petals = Array.from({ length: PETAL_COUNT });

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050a17] transition-opacity duration-700 ease-out ${
        leaving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-label={label}
    >
      {/* Deep midnight blue ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-blue-600/15 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[340px] h-[340px] bg-indigo-600/15 blur-[140px] rounded-full" />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-sky-500/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* Rising flower */}
        <div className="flower-rise">
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 animate-float">
            {/* Soft halo behind flower */}
            <div className="flower-glow absolute inset-[-14%] rounded-full bg-sky-500/20 blur-2xl" />

            {/* Petals */}
            {petals.map((_, index) => (
              <div
                key={index}
                className="absolute inset-0 flex justify-center items-start"
                style={{ transform: `rotate(${(360 / PETAL_COUNT) * index}deg)` }}
              >
                <div
                  className="flower-petal h-1/2 w-9 sm:w-11 rounded-full origin-bottom shadow-[0_0_18px_rgba(56,189,248,0.35)]"
                  style={{
                    background:
                      'linear-gradient(180deg, #e0f2fe 0%, #7dd3fc 28%, #38bdf8 58%, #1d4ed8 100%)',
                    animationDelay: `${0.15 + index * 0.07}s`,
                  }}
                />
              </div>
            ))}

            {/* Flower core */}
            <div className="flower-core absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-sky-200 via-sky-400 to-blue-700 shadow-[0_0_30px_rgba(56,189,248,0.6)] flex items-center justify-center">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/80 blur-[0.5px]" />
            </div>
          </div>
        </div>

        {/* Loading label */}
        <div className="mt-10 sm:mt-12">
          <p className="font-serif text-lg sm:text-xl text-blue-50/90 tracking-wide">
            {label}
          </p>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="loading-dot w-1.5 h-1.5 rounded-full bg-sky-400"
                style={{ animationDelay: `${dot * 0.18}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
