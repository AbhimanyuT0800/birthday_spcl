import React from 'react';

interface Star {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  twinkle: number;
  glow: boolean;
}

let seed = 20261108;

const random = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const STARS: Star[] = Array.from({ length: 40 }, (_, i) => ({
  left: random() * 100,
  size: 1 + random() * 2.4,
  duration: 10 + random() * 10,
  delay: -random() * 20,
  drift: (random() - 0.5) * 64,
  opacity: 0.35 + random() * 0.55,
  twinkle: 2.4 + random() * 3.6,
  glow: i % 6 === 0,
}));

export const FallingStars: React.FC = () => {
  return (
    <div
      className="starfall-layer absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {STARS.map((star, i) => (
        <span
          key={i}
          className="starfall"
          style={
            {
              left: `${star.left}%`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              '--drift': `${star.drift}px`,
            } as React.CSSProperties
          }
        >
          <span
            className={`starfall-dot${star.glow ? ' starfall-glow' : ''}`}
            style={
              {
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDuration: `${star.twinkle}s`,
                animationDelay: `${star.delay / 2}s`,
                '--star-opacity': `${star.opacity}`,
              } as React.CSSProperties
            }
          />
        </span>
      ))}
    </div>
  );
};
