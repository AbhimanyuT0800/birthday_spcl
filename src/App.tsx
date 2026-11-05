import React, { useState, useEffect } from 'react';
import { BirthdayConfig } from './types';
import { FloatingParticles } from './components/FloatingParticles';
import { CountdownView } from './components/CountdownView';
import { CelebrationView } from './components/CelebrationView';
import { CustomizeModal } from './components/CustomizeModal';
import { LoadingScreen } from './components/LoadingScreen';
import ferreroTop from './assets/images/ferrero-1.png';
import choc1 from './assets/images/choc-1.png';
import choc2 from './assets/images/choc-2.png';
import choc3 from './assets/images/choc-3.png';
import choc4 from './assets/images/choc-4.png';
import choc5 from './assets/images/choc-5.png';
import choc6 from './assets/images/choc-6.png';
import choc7 from './assets/images/choc-7.png';
import choc8 from './assets/images/choc-8.png';

const DEFAULT_CONFIG: BirthdayConfig = {
  bestieName: 'SHEL',
  bestieNickname: '',
  senderName: 'ABHI',
  birthdayDate: '2026-11-07T23:59:00',
  birthDate: '2001-11-08',
  targetSeconds: 10,
  useSecondsCountdown: false,
  letterMessage: '',
  recipientEmail: 'abhimanyua0800@gmail.com',
  photos: [],
  reasons: [],
  coupons: [],
};

const STORAGE_KEY = 'bestie_birthday_shel_abhi_v4';

const CHOC_IMGS = [
  ferreroTop,
  choc1,
  choc2,
  choc3,
  choc4,
  choc5,
  choc6,
  choc7,
  choc8,
];

const COLLAGE_POSITIONS = [
  '50% 50%',
  '50% 42%',
  '45% 58%',
  '55% 46%',
  '50% 62%',
  '42% 50%',
  '58% 54%',
];

const COLLAGE_TILES = Array.from({ length: 48 }, (_, i) => ({
  src: CHOC_IMGS[(i * 5 + Math.floor(i / 7)) % CHOC_IMGS.length],
  pos: COLLAGE_POSITIONS[i % COLLAGE_POSITIONS.length],
  opacity: [0.3, 0.42, 0.24, 0.36, 0.46, 0.28][i % 6],
  flip: i % 3 === 0,
}));

export const App: React.FC = () => {
  const [config, setConfig] = useState<BirthdayConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_CONFIG;
  });

  const [currentView, setCurrentView] = useState<'countdown' | 'celebration'>('countdown');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEnterCelebration = () => {
    // Mount the celebration underneath the loader immediately, so fading the
    // loader out reveals the celebration instead of flashing the countdown.
    setCurrentView('celebration');
    setIsLoading(true);
  };

  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Storage error fallback
    }
  }, [config]);

  const handleSaveConfig = (newConfig: BirthdayConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050a17] text-[#f0f4fc] flex flex-col justify-between overflow-x-hidden selection:bg-blue-600/40 selection:text-white">
      {/* Flower loading screen (shown after the countdown button press) */}
      {isLoading && <LoadingScreen duration={3000} onFinish={handleLoadingFinish} />}

      {/* Subtle ambient lighting */}
      <FloatingParticles />

      {/* Deep Midnight Blue Ambient Glow & Accents */}
      {currentView === 'celebration' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Ferrero Rocher chocolate collage filling the background */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-[repeat(12,1fr)] sm:grid-cols-6 sm:grid-rows-[repeat(8,1fr)] lg:grid-cols-8 lg:grid-rows-[repeat(6,1fr)] scale-105">
            {COLLAGE_TILES.map((tile, i) => (
              <img
                key={i}
                src={tile.src}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                style={{
                  opacity: tile.opacity,
                  objectPosition: tile.pos,
                  transform: tile.flip ? 'scaleX(-1)' : undefined,
                }}
              />
            ))}
          </div>

          {/* Midnight vignette keeps the collage readable behind the content */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050a17]/50 via-[#071126]/20 to-[#050a17]/72" />
        </div>
      )}

      {/* Main View Transition */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        {currentView === 'countdown' ? (
          <CountdownView
            bestieName={config.bestieName}
            useSecondsCountdown={config.useSecondsCountdown}
            targetSeconds={config.targetSeconds}
            birthdayDate={config.birthdayDate}
            onComplete={handleEnterCelebration}
          />
        ) : (
          <CelebrationView
            config={config}
            onBackToCountdown={() => setCurrentView('countdown')}
          />
        )}
      </div>

      {/* Customization Drawer / Modal */}
      <CustomizeModal
        config={config}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveConfig}
      />
    </div>
  );
};

export default App;
