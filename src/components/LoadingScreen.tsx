import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onFinish: () => void;
  duration?: number;
  label?: string;
}

const OUTER_PETALS = 8;
const INNER_PETALS = 8;

const SPARKLES = [
  { top: '-2%', left: '34%', size: 10, delay: 0.2 },
  { top: '8%', right: '-4%', size: 8, delay: 1.1 },
  { top: '24%', left: '-8%', size: 7, delay: 0.6 },
  { top: '40%', right: '-8%', size: 9, delay: 1.5 },
  { top: '2%', left: '2%', size: 7, delay: 1.8 },
  { top: '52%', left: '-2%', size: 6, delay: 0.9 },
];

const STAMENS = Array.from({ length: 6 }, (_, i) => {
  const angle = (Math.PI * 2 * i) / 6;
  return {
    x: 50 + Math.cos(angle) * 19,
    y: 50 + Math.sin(angle) * 19,
    delay: 0.9 + i * 0.08,
  };
});

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

  const outerPetals = Array.from({ length: OUTER_PETALS });
  const innerPetals = Array.from({ length: INNER_PETALS });

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
        {/* Rising flower with stem and leaves */}
        <div className="flower-rise">
          <div className="relative flex flex-col items-center animate-float">
            {/* Flower head */}
            <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56">
            {/* Soft halos behind flower */}
            <div className="flower-glow absolute inset-[-20%] rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute inset-[6%] rounded-full bg-blue-500/10 blur-2xl" />

            {/* Outer petals */}
            {outerPetals.map((_, index) => (
              <div
                key={`outer-${index}`}
                className="absolute inset-0 flex justify-center items-start"
                style={{ transform: `rotate(${(360 / OUTER_PETALS) * index}deg)` }}
              >
                <div
                  className="flower-petal relative h-[52%] w-10 sm:w-12 origin-bottom border border-sky-200/25"
                  style={{
                    borderRadius: '50% 50% 46% 46% / 64% 64% 36% 36%',
                    background:
                      'linear-gradient(180deg, rgba(224,242,254,0.96) 0%, rgba(125,211,252,0.92) 26%, rgba(56,189,248,0.88) 58%, rgba(37,99,235,0.92) 82%, rgba(29,78,216,0.95) 100%)',
                    boxShadow:
                      '0 0 20px rgba(56,189,248,0.35), inset 0 3px 8px rgba(255,255,255,0.55), inset 0 -8px 14px rgba(29,78,216,0.45)',
                    animationDelay: `${0.15 + index * 0.06}s`,
                  }}
                >
                  {/* Petal highlight vein */}
                  <span className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[2px] h-[55%] rounded-full bg-white/45 blur-[1px]" />
                </div>
              </div>
            ))}

            {/* Inner petals (offset for depth) */}
            {innerPetals.map((_, index) => (
              <div
                key={`inner-${index}`}
                className="absolute inset-0 flex justify-center items-start z-[1]"
                style={{
                  transform: `rotate(${(360 / INNER_PETALS) * index + 22.5}deg)`,
                }}
              >
                <div
                  className="flower-petal relative h-[42%] w-7 sm:w-9 origin-bottom border border-white/30"
                  style={{
                    borderRadius: '50% 50% 48% 48% / 62% 62% 38% 38%',
                    background:
                      'linear-gradient(180deg, #ffffff 0%, #e0f2fe 22%, #7dd3fc 48%, #38bdf8 74%, #2563eb 100%)',
                    boxShadow:
                      '0 0 16px rgba(186,230,253,0.55), inset 0 2px 6px rgba(255,255,255,0.85)',
                    animationDelay: `${0.5 + index * 0.05}s`,
                  }}
                >
                  <span className="absolute left-1/2 top-[12%] -translate-x-1/2 w-[2px] h-[50%] rounded-full bg-white/60 blur-[0.5px]" />
                </div>
              </div>
            ))}

            {/* Flower core */}
            <div
              className="flower-core absolute top-1/2 left-1/2 z-[2] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border border-white/40"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, #ffffff 0%, #e0f2fe 22%, #7dd3fc 45%, #38bdf8 68%, #1d4ed8 100%)',
                boxShadow:
                  '0 0 34px rgba(56,189,248,0.75), inset 0 0 14px rgba(255,255,255,0.75)',
              }}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/35 border border-white/50 flex items-center justify-center backdrop-blur-[1px]">
                <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white/90 blur-[0.4px]" />
              </div>

              {/* Stamens / pollen dots */}
              {STAMENS.map((dot, index) => (
                <span
                  key={`stamen-${index}`}
                  className="flower-stamen absolute w-1.5 h-1.5 rounded-full bg-sky-100 shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${dot.delay}s`,
                  }}
                />
              ))}
            </div>

            {/* Twinkling sparkles */}
            {SPARKLES.map(({ size, delay, ...position }, index) => (
              <span
                key={`sparkle-${index}`}
                className="absolute text-sky-200 animate-sparkle select-none pointer-events-none"
                style={{
                  ...position,
                  fontSize: `${size}px`,
                  animationDelay: `${delay}s`,
                  lineHeight: 1,
                }}
              >
                ✦
              </span>
            ))}
            </div>

            {/* Stem */}
            <div
              className="relative z-0 flex justify-center"
              style={{ marginTop: '-1.5rem' }}
            >
              <div
                className="flower-stem w-2.5 sm:w-3 rounded-full"
                style={{
                  height: 'clamp(76px, 23vw, 116px)',
                  background:
                    'linear-gradient(180deg, #5eead4 0%, #2dd4bf 32%, #14b8a6 62%, #0f766e 100%)',
                  boxShadow:
                    '0 0 16px rgba(45,212,191,0.35), inset -2px 0 4px rgba(255,255,255,0.35)',
                  transformOrigin: 'bottom center',
                }}
              />

              {/* Left leaf */}
              <div
                className="absolute"
                style={{ left: '50%', bottom: '42%', transform: 'rotate(-34deg)' }}
              >
                <div
                  className="flower-leaf absolute"
                  style={{
                    right: 0,
                    top: '-15px',
                    width: 54,
                    height: 30,
                    borderRadius: '0 100% 0 100%',
                    transformOrigin: 'right center',
                    background:
                      'linear-gradient(140deg, #99f6e4 0%, #2dd4bf 38%, #0d9488 72%, #115e59 100%)',
                    boxShadow:
                      '0 4px 16px rgba(13,148,136,0.4), inset 0 2px 5px rgba(255,255,255,0.4)',
                    animationDelay: '0.8s',
                  }}
                >
                  <span className="absolute left-2 right-6 top-1/2 h-px bg-white/40 -rotate-12" />
                </div>
              </div>

              {/* Right leaf */}
              <div
                className="absolute"
                style={{ left: '50%', bottom: '20%', transform: 'rotate(30deg)' }}
              >
                <div
                  className="flower-leaf absolute"
                  style={{
                    left: 0,
                    top: '-13px',
                    width: 46,
                    height: 26,
                    borderRadius: '0 100% 0 100%',
                    transformOrigin: 'left center',
                    background:
                      'linear-gradient(140deg, #99f6e4 0%, #2dd4bf 38%, #0d9488 72%, #115e59 100%)',
                    boxShadow:
                      '0 4px 16px rgba(13,148,136,0.4), inset 0 2px 5px rgba(255,255,255,0.4)',
                    animationDelay: '1s',
                  }}
                >
                  <span className="absolute left-6 right-2 top-1/2 h-px bg-white/40 rotate-12" />
                </div>
              </div>
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
