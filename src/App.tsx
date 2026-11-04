import React, { useState, useEffect } from 'react';
import { BirthdayConfig } from './types';
import { FloatingParticles } from './components/FloatingParticles';
import { CountdownView } from './components/CountdownView';
import { CelebrationView } from './components/CelebrationView';
import { CustomizeModal } from './components/CustomizeModal';
import { LoadingScreen } from './components/LoadingScreen';

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
  'https://images.unsplash.com/photo-1604175358450-6abc0ea2af2c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1587705904110-fdb1a5e8e9a9?auto=format&fit=crop&w=800&q=80',
];

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
    setIsLoading(true);
  };

  const handleLoadingFinish = () => {
    setIsLoading(false);
    setCurrentView('celebration');
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
      {isLoading && <LoadingScreen duration={5000} onFinish={handleLoadingFinish} />}

      {/* Subtle ambient lighting */}
      <FloatingParticles />

      {/* Deep Midnight Blue Ambient Glow & Accents */}
      {currentView === 'celebration' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Subtle midnight vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050a17]/80 via-[#071126]/65 to-[#050a17]/95 z-[1]" />

          {/* Top-Right Decorative Chocolate Accent with Celestial Blue Border */}
          <div className="absolute -top-12 -right-12 w-64 h-64 sm:w-[420px] sm:h-[420px] opacity-50 sm:opacity-60 filter contrast-110 drop-shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all">
            <img
              src={CHOC_IMGS[0]}
              alt="Ferrero Rocher Background"
              className="w-full h-full object-cover rounded-full border-2 border-sky-400/30 shadow-2xl"
            />
          </div>

          {/* Bottom-Left Decorative Accent with Celestial Blue Border */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 sm:w-[420px] sm:h-[420px] opacity-50 sm:opacity-60 filter contrast-110 drop-shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all">
            <img
              src={CHOC_IMGS[1]}
              alt="Chocolate Truffles Background"
              className="w-full h-full object-cover rounded-full border-2 border-sky-400/30 shadow-2xl"
            />
          </div>
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
