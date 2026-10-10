import confetti from 'canvas-confetti';

export const triggerFireworks = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#ff6b8b', '#ffb6c1', '#ffd166', '#a78bfa', '#ec4899', '#38bdf8']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#ff6b8b', '#ffb6c1', '#ffd166', '#a78bfa', '#ec4899', '#38bdf8']
    });
  }, 250);
};

export const triggerBurst = (x = 0.5, y = 0.5) => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x, y },
    colors: ['#ff69b4', '#ff1493', '#ffd700', '#c084fc', '#f43f5e', '#38bdf8'],
    zIndex: 9999,
  });
};

export const triggerHearts = () => {
  const count = 25;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f43f5e', '#ec4899']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#fb7185', '#fda4af']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#ffccd5', '#ffd166']
  });
};
