import React, { useState, useEffect, useMemo } from 'react';
import { Clock, RefreshCw, Zap, Award } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LivingStatsProps {
  bestieName: string;
}

const FUNNY_DIAGNOSES = [
  "Diagnosed with: 100% chronic cuteness, zero tolerance for bad vibes, and an incurable Switzerland obsession.",
  "Warning: Subject may become highly dangerous if deprived of Ferrero Rochers or sleep for more than 4 hours.",
  "Status: Currently operating on 2% battery, 98% iced coffee/cocoa energy, and pure determination.",
  "System Notice: Main character energy levels are at critical maximum. No action required.",
  "Official Notice: You have legally survived 100% of your worst days and 0% of your morning alarms.",
  "Diagnostic Report: Highly flammable when told 'calm down'. Best approached with chocolates and plane tickets.",
  "Alert: Subject has approximately 47 open browser tabs in mind and 3 outfits planned for Switzerland.",
];

export const LivingStats: React.FC<LivingStatsProps> = ({
  bestieName = 'SHEL',
}) => {
  const [randomFactIdx, setRandomFactIdx] = useState(0);
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
    const totalWeeks = Math.floor(totalDays / 7);

    return {
      totalDays,
      hoursRemainder,
      minutesRemainder,
      secondsRemainder,
      totalWeeks,
    };
  }, [now]);

  const handleNextFact = () => {
    sounds.playSparkle();
    setRandomFactIdx((prev) => (prev + 1) % FUNNY_DIAGNOSES.length);
  };

  // Fun pseudo-metrics mathematically derived from days living
  const funnyMetrics = [
    {
      title: 'Ferrero Rochers & Treats Demolished',
      count: Math.round(stats.totalDays * 0.45).toLocaleString(),
      note: 'Strictly prescribed for soul enrichment 🍫',
      icon: '🍫',
    },
    {
      title: 'Said "I\'ll Sleep Early Tonight"',
      count: Math.round(stats.totalDays * 0.38).toLocaleString(),
      note: 'Actual success rate: ~1.2%',
      icon: '😴',
    },
    {
      title: '"I Have Absolutely Nothing to Wear"',
      count: Math.round(stats.totalDays * 0.32).toLocaleString(),
      note: 'In front of a closet collapsing with clothes',
      icon: '👗',
    },
    {
      title: 'Mental Trips to the Swiss Alps',
      count: Math.round(stats.totalDays * 1.6).toLocaleString(),
      note: 'Luggage packed in daydreams 24/7 🇨🇭',
      icon: '🏔️',
    },
    {
      title: '3 AM Unhinged Reels & Memes Sent',
      count: Math.round(stats.totalDays * 2.8).toLocaleString(),
      note: 'Crucial bestie diplomacy & foreign policy',
      icon: '📱',
    },
    {
      title: '"I Deserve a Little Sweet Treat" Decisions',
      count: Math.round(stats.totalDays * 1.15).toLocaleString(),
      note: '100% validated by supreme court of besties',
      icon: '🧁',
    },
    {
      title: 'Estimated Heartbeats Pumped',
      count: Math.round(stats.totalDays * 101200).toLocaleString(),
      note: 'Surviving plot twists, gossips & 1% battery',
      icon: '🫀',
    },
    {
      title: 'Days Blessed by Being My Best Friend',
      count: stats.totalDays.toLocaleString(),
      note: 'Every single day without exception ✨',
      icon: '👑',
    },
  ];

  return (
    <section className="mb-16 sm:mb-24">
      {/* Section Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-sky-400 font-medium mb-2 justify-center sm:justify-start">
          <Clock className="w-3.5 h-3.5" />
          <span>The Official Earth Rental & Mileage Report</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-blue-50 font-normal">
          Look How Long You’ve Been Living
        </h2>
        <p className="text-xs sm:text-sm text-blue-200/70 font-light mt-1 max-w-lg">
          A mathematically validated, strictly scientific, and slightly unhinged record of {bestieName}’s time on planet Earth.
        </p>
      </div>

      {/* Main Living Counter Showcase Card */}
      <div className="clean-card p-6 sm:p-8 mb-6 relative overflow-hidden">
        {/* Subtle deep blue background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between gap-4 border-b border-blue-500/15 pb-5 mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-sky-400/80 font-medium">
              Continuous Planet Residency
            </span>
            <div className="font-serif text-2xl sm:text-3xl text-white mt-1 flex items-baseline gap-2">
              <span>{stats.totalDays.toLocaleString()}</span>
              <span className="text-sm font-light text-blue-200/70 font-sans">Days on Earth</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-sky-400 font-medium block">
              Status
            </span>
            <span className="text-xs text-sky-200 font-light">
              Living & Thriving ✦
            </span>
          </div>
        </div>

        {/* 4 Units: Total Days + Balance Hours + Balance Minutes + Balance Seconds */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Days */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-blue-500/20 flex flex-col items-center sm:items-start">
            <span className="text-[10px] uppercase tracking-widest text-sky-400/80 font-medium">
              Days Living
            </span>
            <span className="font-serif text-2xl sm:text-3xl text-white font-light mt-1 tabular-nums">
              {stats.totalDays.toLocaleString()}
            </span>
            <span className="text-[11px] text-blue-200/60 font-light mt-0.5">
              days on Earth
            </span>
          </div>

          {/* Balance Hours */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-blue-500/20 flex flex-col items-center sm:items-start">
            <span className="text-[10px] uppercase tracking-widest text-sky-400/80 font-medium">
              Balance Hours
            </span>
            <span className="font-serif text-2xl sm:text-3xl text-white font-light mt-1 tabular-nums">
              {stats.hoursRemainder.toString().padStart(2, '0')}
            </span>
            <span className="text-[11px] text-blue-200/60 font-light mt-0.5">
              hours past midnight
            </span>
          </div>

          {/* Balance Minutes */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-blue-500/20 flex flex-col items-center sm:items-start">
            <span className="text-[10px] uppercase tracking-widest text-sky-400/80 font-medium">
              Balance Mins
            </span>
            <span className="font-serif text-2xl sm:text-3xl text-white font-light mt-1 tabular-nums">
              {stats.minutesRemainder.toString().padStart(2, '0')}
            </span>
            <span className="text-[11px] text-blue-200/60 font-light mt-0.5">
              minutes counting
            </span>
          </div>

          {/* Balance Seconds (Live Ticker) */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-blue-500/20 flex flex-col items-center sm:items-start relative overflow-hidden group">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-widest text-sky-400 font-medium">
                Balance Secs
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping inline-block" />
            </div>
            <span className="font-serif text-2xl sm:text-3xl text-sky-300 font-light mt-1 tabular-nums">
              {stats.secondsRemainder.toString().padStart(2, '0')}
            </span>
            <span className="text-[11px] text-blue-200/60 font-light mt-0.5">
              live ticking now
            </span>
          </div>
        </div>

        {/* Detailed Human Time breakdown badge */}
        <div className="p-3.5 rounded-xl bg-blue-500/[0.08] border border-blue-500/20 text-xs text-blue-200 font-light flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>
              Exact Residency: <strong className="text-white font-medium">{stats.totalDays.toLocaleString()} Days</strong>,{' '}
              <strong className="text-white font-medium">{stats.hoursRemainder} Hours</strong>,{' '}
              <strong className="text-white font-medium">{stats.minutesRemainder} Minutes</strong>, and{' '}
              <strong className="text-sky-300 font-medium tabular-nums">{stats.secondsRemainder} Seconds</strong>.
            </span>
          </div>
          <span className="text-[10px] text-blue-300/60 uppercase tracking-widest">
            ({stats.totalWeeks.toLocaleString()} Weeks)
          </span>
        </div>
      </div>

      {/* Funny Bestie Breakdown Stats Grid */}
      <div className="mb-6">
        <h3 className="font-serif text-lg text-blue-100 font-medium mb-3 flex items-center gap-2">
          <span>Surviving & Thriving Diagnostics</span>
          <span className="text-xs font-normal text-blue-300/60 font-sans">(Confidential Bestie Stats)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {funnyMetrics.map((item, idx) => (
            <div
              key={idx}
              className="clean-card p-4 flex items-start gap-3.5 hover:border-sky-400/30 transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs text-slate-200 font-medium truncate">
                    {item.title}
                  </span>
                  <span className="font-serif text-sm text-sky-300 font-semibold tabular-nums shrink-0">
                    {item.count}
                  </span>
                </div>
                <p className="text-[11px] text-blue-200/60 font-light mt-0.5 leading-snug">
                  {item.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Bestie Manufacturer Warranty Card (Hilarious!) */}
      <div className="clean-card p-5 sm:p-6 mb-6 border border-blue-500/25 bg-gradient-to-br from-slate-900/90 to-[#071126]/95">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-sky-400 font-semibold border-b border-blue-500/15 pb-3 mb-4">
          <div className="flex items-center gap-1.5 text-sky-200">
            <Award className="w-3.5 h-3.5 text-sky-400" />
            <span>Official Bestie Manufacturer Certificate</span>
          </div>
          <span className="text-blue-300/60">REF: SHEL-EDITION-2026</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-light mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-blue-300/60">Subject Name</p>
            <p className="text-blue-100 font-medium font-serif text-sm mt-0.5">{bestieName}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-blue-300/60">Manufacturer Warranty</p>
            <p className="text-sky-300/90 font-medium text-xs mt-0.5">Expired at age 18 (Non-Refundable)</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-blue-300/60">Return & Exchange Policy</p>
            <p className="text-blue-200/70 text-xs mt-0.5">Zero returns accepted. Best friend is stuck with you forever.</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-[11px] text-blue-200/80 font-light leading-relaxed">
          <strong className="text-sky-200 font-medium">Care & Maintenance Instructions:</strong> Keep well-hydrated with chocolate, provide quiet alpine scenery on demand, agree without question that everyone else is wrong, and deliver Ferrero Rochers when stress levels exceed tolerable limits.
        </div>
      </div>

      {/* Interactive Random Diagnostic / Mood Generator */}
      <div className="clean-card p-5 text-center flex flex-col items-center justify-center">
        <p className="text-[10px] uppercase tracking-widest text-sky-400/80 font-medium mb-1.5">
          Live Bestie Diagnostic
        </p>
        <p className="font-serif italic text-blue-100 text-sm sm:text-base max-w-md my-2 px-2 leading-relaxed">
          “{FUNNY_DIAGNOSES[randomFactIdx]}”
        </p>
        <button
          onClick={handleNextFact}
          className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-sky-200 text-xs transition-all active:scale-95 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
        >
          <RefreshCw className="w-3 h-3 text-sky-400" />
          <span>Generate Another Diagnosis ✨</span>
        </button>
      </div>
    </section>
  );
};
