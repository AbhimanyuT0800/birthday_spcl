import React, { useState, useEffect } from 'react';
import { BirthdayConfig } from './types';
import { FloatingParticles } from './components/FloatingParticles';
import { CountdownView } from './components/CountdownView';
import { CelebrationView } from './components/CelebrationView';
import { CustomizeModal } from './components/CustomizeModal';

const DEFAULT_CONFIG: BirthdayConfig = {
  bestieName: 'Bestie',
  bestieNickname: '',
  senderName: 'Your Best Friend',
  birthdayDate: '2026-11-07T23:59:00',
  targetSeconds: 10,
  useSecondsCountdown: false,
  letterMessage: '',
  recipientEmail: 'abhimanyua0800@gmail.com',
  photos: [],
  reasons: [],
  coupons: [],
};

const STORAGE_KEY = 'bestie_birthday_surprise_simple_v3';

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
    <div className="relative min-h-screen w-full bg-[#0b0c0e] text-[#e6e7eb] flex flex-col justify-between overflow-x-hidden selection:bg-stone-700 selection:text-white">
      {/* Subtle ambient lighting */}
      <FloatingParticles />

      {/* Main View Transition */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        {currentView === 'countdown' ? (
          <CountdownView
            bestieName={config.bestieName}
            useSecondsCountdown={config.useSecondsCountdown}
            targetSeconds={config.targetSeconds}
            birthdayDate={config.birthdayDate}
            onComplete={() => setCurrentView('celebration')}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        ) : (
          <CelebrationView
            config={config}
            onOpenSettings={() => setIsSettingsOpen(true)}
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
