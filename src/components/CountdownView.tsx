import React, { useState, useEffect } from 'react';
import { ArrowRight, Settings2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface CountdownViewProps {
  bestieName: string;
  useSecondsCountdown?: boolean;
  targetSeconds?: number;
  birthdayDate?: string;
  onComplete: () => void;
  onOpenSettings: () => void;
}

export const CountdownView: React.FC<CountdownViewProps> = ({
  bestieName,
  onComplete,
  onOpenSettings,
}) => {
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Target: November 7 at 11:59:00 PM (ready for Nov 8 midnight)
      // Month 10 = November in JavaScript 0-indexed months
      let target = new Date(currentYear, 10, 7, 23, 59, 0);
      
      // If Nov 7 23:59 this year has already passed, target next year
      if (target.getTime() < now.getTime()) {
        target = new Date(currentYear + 1, 10, 7, 23, 59, 0);
      }

      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!isFinished) {
          setIsFinished(true);
          sounds.playSparkle();
        }
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  const handleEnter = () => {
    sounds.playSparkle();
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-6 py-12 max-w-lg mx-auto w-full text-center select-none">
      {/* Top subtle bar */}
      <div className="w-full flex justify-between items-center text-xs text-stone-400 font-light tracking-widest uppercase">
        <span>A Little Gift</span>
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-full hover:bg-white/5 transition-colors text-stone-500 hover:text-stone-300"
          title="Settings"
        >
          <Settings2 className="w-4 h-4" />
        </button>
      </div>

      {/* Center Countdown Unit */}
      <div className="my-auto w-full flex flex-col items-center">
        <p className="text-xs uppercase tracking-[0.25em] text-stone-400 font-medium mb-3">
          For {bestieName || 'You'}
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl text-stone-100 font-normal mb-8">
          {isFinished ? 'Your Day Is Here.' : 'Counting down to your birthday'}
        </h1>

        {/* Real Date Digit Display (Nov 7 11:59 PM -> Nov 8) */}
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-3 sm:gap-4 text-center">
            {[
              { val: timeLeft.days, label: 'days' },
              { val: timeLeft.hours, label: 'hours' },
              { val: timeLeft.minutes, label: 'mins' },
              { val: timeLeft.seconds, label: 'secs' },
            ].map((t, idx) => (
              <div key={idx} className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 min-w-[65px] sm:min-w-[80px]">
                <span className="font-serif text-3xl sm:text-4xl text-stone-100 font-light tabular-nums">
                  {t.val.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500 mt-1">
                  {t.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] uppercase tracking-[0.25em] text-stone-400 mt-4 font-light">
            Midnight • November 8th ✦
          </p>
        </div>

        {/* Enter / Skip Button */}
        <button
          onClick={handleEnter}
          className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-stone-100 text-stone-900 text-xs font-medium tracking-wide hover:bg-white active:scale-95 transition-all shadow-sm"
        >
          <span>{isFinished ? 'Open Your Birthday Note' : 'Skip & View Message'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Quiet Quote */}
      <div className="text-stone-500 text-xs font-serif italic tracking-wide">
        “One flight closer to the Swiss Alps.” 🏔️
      </div>
    </div>
  );
};
