import React, { useState, useEffect } from 'react';
import { ArrowRight, Settings2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface CountdownViewProps {
  bestieName: string;
  useSecondsCountdown: boolean;
  targetSeconds: number;
  birthdayDate: string;
  onComplete: () => void;
  onOpenSettings: () => void;
}

export const CountdownView: React.FC<CountdownViewProps> = ({
  bestieName,
  useSecondsCountdown,
  targetSeconds,
  birthdayDate,
  onComplete,
  onOpenSettings,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(targetSeconds);
  const [isFinished, setIsFinished] = useState(false);
  const [realTimeLeft, setRealTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!useSecondsCountdown) return;

    if (secondsLeft <= 0) {
      if (!isFinished) {
        setIsFinished(true);
        sounds.playSparkle();
      }
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, useSecondsCountdown, isFinished]);

  useEffect(() => {
    if (useSecondsCountdown) return;

    const calculateTime = () => {
      const target = new Date(birthdayDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setRealTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!isFinished) {
          setIsFinished(true);
          sounds.playSparkle();
        }
      } else {
        setRealTimeLeft({
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
  }, [birthdayDate, useSecondsCountdown, isFinished]);

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

        {/* Minimal Digit Display */}
        <div className="mb-8">
          {useSecondsCountdown ? (
            <div className="flex flex-col items-center">
              <span className="font-serif text-7xl sm:text-8xl text-stone-100 font-light tracking-tight tabular-nums">
                {secondsLeft.toString().padStart(2, '0')}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500 mt-2">
                seconds
              </span>

              {/* Minimal Progress Line */}
              <div className="w-48 h-[2px] bg-white/10 rounded-full mt-6 overflow-hidden">
                <div
                  className="h-full bg-stone-300 transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${((targetSeconds - secondsLeft) / targetSeconds) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { val: realTimeLeft.days, label: 'days' },
                { val: realTimeLeft.hours, label: 'hours' },
                { val: realTimeLeft.minutes, label: 'mins' },
                { val: realTimeLeft.seconds, label: 'secs' },
              ].map((t, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="font-serif text-3xl sm:text-4xl text-stone-100 font-light tabular-nums">
                    {t.val.toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-stone-500 mt-1">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          )}
          {!useSecondsCountdown && (
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500 mt-4">
              Midnight • November 8th ✦
            </p>
          )}
        </div>

        {/* Enter Button */}
        <button
          onClick={handleEnter}
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-stone-100 text-stone-900 text-xs font-medium tracking-wide hover:bg-white active:scale-95 transition-all shadow-sm"
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
