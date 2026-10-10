import React from 'react';
import { Award, Star, Crown, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { triggerFireworks } from '../utils/confetti';
import { sounds } from '../utils/audio';

interface BestieAwardProps {
  bestieName: string;
  senderName: string;
}

export const BestieAward: React.FC<BestieAwardProps> = ({ bestieName, senderName }) => {
  const handleCelebrate = () => {
    sounds.playFanfare();
    triggerFireworks();
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-md mx-auto text-center relative overflow-hidden">
      {/* Decorative tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card-gold text-amber-300 text-xs font-semibold mb-3">
        <Crown className="w-3.5 h-3.5 text-amber-400" />
        <span>Official Hall of Fame 🏆</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        Best Friend of the Century
      </h2>
      <p className="text-slate-300 text-xs sm:text-sm mb-6">
        Formally awarded by the High Council of True Friendship.
      </p>

      {/* Certificate Frame */}
      <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-100/90 text-slate-800 border-4 border-amber-400 shadow-2xl text-center select-none">
        {/* Golden corner flourishes */}
        <div className="absolute top-2 left-2 text-amber-500 text-xs">✦</div>
        <div className="absolute top-2 right-2 text-amber-500 text-xs">✦</div>
        <div className="absolute bottom-2 left-2 text-amber-500 text-xs">✦</div>
        <div className="absolute bottom-2 right-2 text-amber-500 text-xs">✦</div>

        {/* Header */}
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-md">
            <Award className="w-6 h-6 text-amber-900" />
          </div>
        </div>

        <h3 className="text-xs uppercase font-extrabold tracking-widest text-amber-800 mb-1">
          Certificate of Supreme Friendship
        </h3>
        <p className="text-[11px] text-slate-500 italic mb-3">
          This prestigious accolade is proudly presented to:
        </p>

        {/* Recipient Name */}
        <div className="border-b-2 border-amber-400 pb-1 mb-4">
          <h1 className="font-handwriting text-3xl sm:text-4xl text-rose-700 font-bold tracking-wide">
            {bestieName || 'The Best Girl Best Friend'}
          </h1>
        </div>

        {/* Badges / Verified skills */}
        <div className="space-y-2 text-left mb-6 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Lifetime Secret Keeper:</strong> Grade A+ classified lock
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Chief Laugh Officer:</strong> Infinite smile generator
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 shrink-0" />
            <span>
              <strong>Unmatched Loyalty:</strong> Best human in the galaxy
            </span>
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-3 border-t border-amber-200 flex justify-between items-end text-left">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
              Authorized Signature
            </p>
            <p className="font-cursive text-xl text-slate-800 font-bold">
              {senderName || 'Your Best Friend'}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full border-2 border-rose-500 flex flex-col items-center justify-center bg-rose-50 rotate-[-12deg]">
            <span className="text-[7px] font-bold text-rose-600 uppercase">OFFICIAL</span>
            <span className="text-[6px] text-rose-500 font-semibold">100% REAL</span>
          </div>
        </div>
      </div>

      {/* Celebrate Button */}
      <button
        onClick={handleCelebrate}
        className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        <span>Celebrate Her Honor! 🥂</span>
      </button>
    </div>
  );
};
