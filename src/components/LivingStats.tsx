import React, { useEffect, useMemo, useState } from 'react';
import { Clock } from 'lucide-react';

interface LivingStatsProps {
  bestieName: string;
}

export const LivingStats: React.FC<LivingStatsProps> = () => {
  const [now, setNow] = useState<Date>(new Date());

  // Live ticker updating every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute living times with fixed DOB (November 8, 2001)
  const stats = useMemo(() => {
    // Exact birth date: November 8, 2001
    const birth = new Date(2001, 10, 8, 0, 0, 0); // Month 10 = November in JS 0-indexed months
    const diffMs = Math.max(0, now.getTime() - birth.getTime());

    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hoursRemainder = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemainder = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemainder = Math.floor((diffMs % (1000 * 60)) / 1000);

    return {
      totalDays,
      hoursRemainder,
      minutesRemainder,
      secondsRemainder,
    };
  }, [now]);

  return (
    <section className="mb-16 sm:mb-24">
      {/* Section Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-sky-400 font-medium mb-2 justify-center sm:justify-start">
          <Clock className="w-3.5 h-3.5" />
          <span>The Official Earth Rental &amp; Mileage Report</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-blue-50 font-normal">
          Look How Long You've Been Living
        </h2>
        <p className="text-xs sm:text-sm text-blue-200/70 font-light mt-1 max-w-lg">
         An unofficial record of life's so far   </p>
      </div>

      {/* Main Living Counter Showcase Card */}
      <div className="clean-card p-6 sm:p-8 mb-6 relative overflow-hidden">
        {/* Subtle deep blue background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 border-b border-blue-500/15 pb-5 mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-sky-400/80 font-medium">
              Continuous Planet Residency
            </span>
            <div className="font-serif text-2xl sm:text-3xl text-white mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span>{stats.totalDays.toLocaleString()}</span>
              <span className="text-sm font-light text-blue-200/70 font-sans">Days on Earth</span>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase tracking-widest text-sky-400 font-medium block">
              Status
            </span>
            <span className="text-xs text-sky-200 font-light">
              Living &amp; Thriving ✦
            </span>
          </div>
        </div>

        {/* 4 Units: Days + Hours + Minutes + Seconds */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Days */}
          <div className="px-3 py-4 sm:p-4 rounded-xl bg-slate-900/60 border border-blue-500/20 flex flex-col items-center text-center sm:items-start sm:text-left">
            <span className="text-[10px] uppercase tracking-[0.18em] text-sky-400/80 font-medium">
              Days
            </span>
            <span className="font-serif text-2xl sm:text-3xl text-white font-light mt-1 tabular-nums">
              {stats.totalDays.toLocaleString()}
            </span>
            <span className="text-[10px] sm:text-[11px] text-blue-200/60 font-light mt-0.5 leading-tight">
              on Earth
            </span>
          </div>

          {/* Hours */}
          <div className="px-3 py-4 sm:p-4 rounded-xl bg-slate-900/60 border border-blue-500/20 flex flex-col items-center text-center sm:items-start sm:text-left">
            <span className="text-[10px] uppercase tracking-[0.18em] text-sky-400/80 font-medium">
              Hours
            </span>
            <span className="font-serif text-2xl sm:text-3xl text-white font-light mt-1 tabular-nums">
              {stats.hoursRemainder.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-[11px] text-blue-200/60 font-light mt-0.5 leading-tight">
              ticking away
            </span>
          </div>

          {/* Minutes */}
          <div className="px-3 py-4 sm:p-4 rounded-xl bg-slate-900/60 border border-blue-500/20 flex flex-col items-center text-center sm:items-start sm:text-left">
            <span className="text-[10px] uppercase tracking-[0.18em] text-sky-400/80 font-medium">
              Minutes
            </span>
            <span className="font-serif text-2xl sm:text-3xl text-white font-light mt-1 tabular-nums">
              {stats.minutesRemainder.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-[11px] text-blue-200/60 font-light mt-0.5 leading-tight">
              counting
            </span>
          </div>

          {/* Seconds (Live Ticker) */}
          <div className="px-3 py-4 sm:p-4 rounded-xl bg-slate-900/60 border border-blue-500/20 flex flex-col items-center text-center sm:items-start sm:text-left relative overflow-hidden group">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.18em] text-sky-400 font-medium">
                Seconds
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping inline-block" />
            </div>
            <span className="font-serif text-2xl sm:text-3xl text-sky-300 font-light mt-1 tabular-nums">
              {stats.secondsRemainder.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-[11px] text-blue-200/60 font-light mt-0.5 leading-tight">
              live right now
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
