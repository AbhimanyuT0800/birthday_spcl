import React, { useState } from 'react';
import { ArrowLeft, Settings2, Flame, Sparkles, Volume2, VolumeX, Maximize2, X } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { sounds } from '../utils/audio';
import { BirthdayWishReply } from './BirthdayWishReply';
import { MiniGame } from './MiniGame';
import { PersonalMoments } from './PersonalMoments';

interface CelebrationViewProps {
  config: BirthdayConfig;
  onOpenSettings: () => void;
  onBackToCountdown: () => void;
}

interface SwissPhoto {
  title: string;
  location: string;
  url: string;
  caption: string;
}

const SWISS_PHOTOS: SwissPhoto[] = [
  {
    title: 'Lauterbrunnen Valley',
    location: 'Bernese Oberland, Switzerland',
    url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=85',
    caption: 'Misty vertical cliffs and 72 roaring waterfalls. Where your morning coffee will overlook true peace.',
  },
  {
    title: 'Zermatt & The Matterhorn',
    location: 'Valais, Switzerland',
    url: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1200&q=85',
    caption: 'Snowcapped peaks touched by golden sunset light, quiet cobblestone streets, and starlit alpine nights.',
  },
  {
    title: 'Grindelwald Chalets',
    location: 'Jungfrau Region, Switzerland',
    url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=85',
    caption: 'Wooden chalets scattered along green alpine hills. The cozy future home you dream of settling into.',
  },
  {
    title: 'The Glacier Express',
    location: 'Swiss Alps',
    url: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=85',
    caption: 'Panoramic train windows framing frozen lakes and snowbanks, watching the world drift by with hot cocoa.',
  },
];

export const CelebrationView: React.FC<CelebrationViewProps> = ({
  config,
  onOpenSettings,
  onBackToCountdown,
}) => {
  const [candleBlown, setCandleBlown] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SwissPhoto | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleCandleClick = () => {
    if (!candleBlown) {
      sounds.playSparkle();
      setCandleBlown(true);
    }
  };

  const handleToggleMusic = () => {
    const active = sounds.toggleBgm();
    setIsMusicPlaying(active);
  };

  const defaultLetter = `Dearest ${config.bestieName || 'Bestie'},

From our endless conversations to the comfortable silences, having you as my best friend has been one of the quiet constants I am most grateful for.

I know your untold, secret dream — to one day pack your life, leave the chaos behind, and settle quietly among the mountains of Switzerland 🇨🇭. Waking up to the fresh alpine air, watching the mist rise over Lauterbrunnen, and having a peaceful wooden chalet to call your own.

You have an adventurous, gentle soul, and you deserve a life filled with that kind of stillness and wonder. 

On your birthday today, I hope this new year brings you genuine peace, deep laughter, and takes you one step closer to your dream home in the Alps.

I promise to always cheer for you, listen to you, and be the first one visiting your Swiss cottage.

Happy Birthday. Always here for you.`;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 sm:py-16 max-w-2xl mx-auto w-full text-stone-200">
      {/* Top Quiet Navigation */}
      <nav className="flex items-center justify-between text-xs text-stone-400 font-light mb-12">
        <button
          onClick={onBackToCountdown}
          className="inline-flex items-center gap-1.5 hover:text-stone-200 transition-colors py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Countdown</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleMusic}
            className="inline-flex items-center gap-1.5 hover:text-stone-200 transition-colors py-1"
            title="Ambient sound"
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-stone-200" />
                <span className="hidden sm:inline">Music on</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">Music off</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenSettings}
            className="hover:text-stone-200 transition-colors p-1"
            title="Edit details"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="mb-14 sm:mb-20 text-center sm:text-left">
        <p className="text-[11px] uppercase tracking-[0.25em] text-stone-400 font-medium mb-3">
          Birthday Note • To {config.bestieName || 'My Best Friend'}
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl text-stone-100 font-normal leading-[1.1] mb-4">
          Happy Birthday,{' '}
          <span className="italic text-stone-300 font-light">
            {config.bestieName || 'Bestie'}
          </span>
          .
        </h1>
        <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed max-w-lg">
          A small place for your day, your wanderlust, and your dream of the Swiss Alps.
        </p>
      </header>

      {/* 1. The Personal Letter */}
      <section className="mb-16 sm:mb-24">
        <div className="clean-card p-6 sm:p-10 relative">
          <div className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-6 flex items-center justify-between">
            <span>A Letter For You</span>
            <span>🇨🇭 ✦</span>
          </div>

          <div className="font-serif text-lg sm:text-xl text-stone-200 font-normal leading-relaxed whitespace-pre-line">
            {config.letterMessage || defaultLetter}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-stone-400 font-light">
            <span>With love,</span>
            <span className="font-serif italic text-base text-stone-200 font-medium">
              {config.senderName || 'Your Best Friend'}
            </span>
          </div>
        </div>
      </section>

      {/* 2. The Switzerland Vision Board */}
      <section className="mb-16 sm:mb-24">
        <div className="mb-8 text-center sm:text-left">
          <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-medium mb-2">
            The Untold Dream
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal">
            Where You Belong: Switzerland
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Tap any photograph to take a closer look at your future hometowns.
          </p>
        </div>

        {/* Clean Photography Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {SWISS_PHOTOS.map((photo, index) => (
            <div
              key={index}
              onClick={() => {
                sounds.playSparkle();
                setSelectedPhoto(photo);
              }}
              className="clean-card clean-card-hover group cursor-pointer overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-900 relative">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity text-stone-300">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif text-lg text-stone-100 font-medium">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">
                    {photo.location}
                  </p>
                </div>
                <p className="text-xs text-stone-400 font-light leading-relaxed mt-3">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Personal Captured Moments */}
      <section className="mb-16 sm:mb-24">
        <PersonalMoments photos={config.photos} bestieName={config.bestieName} />
      </section>

      {/* 4. Interactive Birthday Candle (Minimalist) */}
      <section className="mb-16 sm:mb-24">
        <div className="clean-card p-8 sm:p-10 text-center flex flex-col items-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-medium mb-3">
            A Moment For Yourself
          </p>
          <h2 className="font-serif text-2xl text-stone-100 font-normal mb-2">
            Make A Quiet Birthday Wish
          </h2>
          <p className="text-xs text-stone-400 font-light max-w-sm mb-8">
            {!candleBlown
              ? 'Think of the thing you wish for most in this coming year, then tap the candle.'
              : 'Your wish is out there in the quiet stars.'}
          </p>

          {/* Minimal Candle Illustration */}
          <div
            onClick={handleCandleClick}
            className={`cursor-pointer group flex flex-col items-center select-none py-2 transition-transform active:scale-95 ${
              candleBlown ? 'opacity-80' : ''
            }`}
          >
            {/* Flame */}
            {!candleBlown ? (
              <div className="relative mb-2">
                <div className="w-3.5 h-6 bg-gradient-to-t from-amber-400 to-yellow-100 rounded-full animate-pulse shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                <Flame className="w-3 h-3 text-yellow-200 absolute -top-0.5 left-0.5 opacity-60" />
              </div>
            ) : (
              <div className="h-6 flex items-center justify-center text-stone-500 text-xs mb-2">
                <Sparkles className="w-3.5 h-3.5 text-stone-400 animate-pulse" />
              </div>
            )}

            {/* Candle Stick */}
            <div className="w-3 h-14 bg-stone-300 rounded-t-sm shadow-sm" />
            {/* Candle Base */}
            <div className="w-12 h-1.5 bg-stone-600 rounded-full mt-0.5" />
          </div>

          <div className="mt-6 text-xs text-stone-400 font-light">
            {!candleBlown ? (
              <span className="text-stone-300 underline underline-offset-4 cursor-pointer">
                Tap candle to blow it out
              </span>
            ) : (
              <span className="font-serif italic text-sm text-stone-300">
                “May every wish find its way to you.” ✨
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 5. Alpine Mini Game */}
      <section className="mb-16 sm:mb-24">
        <MiniGame />
      </section>

      {/* 6. Three Simple Promises */}
      <section className="mb-16">
        <div className="mb-8 text-center sm:text-left">
          <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-medium mb-2">
            Always
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal">
            Three Birthday Promises
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              title: 'The Switzerland Journey',
              desc: 'Whenever you decide to visit or pack up to move to the Alps, I promise to be by your side and your very first houseguest.',
            },
            {
              title: 'A Safe Haven Anytime',
              desc: 'No matter the time of night or what is happening, you will always have someone to talk to, vent to, or sit in silence with.',
            },
            {
              title: 'Unconditional Support',
              desc: 'In every decision, every chapter, and every dream you choose to chase, I will always be cheering for you.',
            },
          ].map((item, idx) => (
            <div key={idx} className="clean-card p-5 sm:p-6 flex items-start gap-4">
              <span className="font-serif text-lg text-stone-400 font-light">
                0{idx + 1}
              </span>
              <div>
                <h3 className="font-serif text-lg text-stone-100 font-medium mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Birthday Wish Reply Area */}
      <section className="mb-16">
        <BirthdayWishReply
          bestieName={config.bestieName}
          recipientEmail={config.recipientEmail}
          senderName={config.senderName}
        />
      </section>

      {/* Minimal Footer */}
      <footer className="text-center pt-8 border-t border-white/5 text-stone-500 text-xs font-light tracking-wider">
        <p>FOR {config.bestieName?.toUpperCase() || 'BESTIE'} • HAPPY BIRTHDAY</p>
      </footer>

      {/* Full Photo Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full text-left relative"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 p-2 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="rounded-2xl overflow-hidden bg-stone-900 border border-white/10">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="p-5">
                <h3 className="font-serif text-2xl text-stone-100 font-normal">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-stone-400 uppercase tracking-wider mt-1 mb-3">
                  {selectedPhoto.location}
                </p>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
