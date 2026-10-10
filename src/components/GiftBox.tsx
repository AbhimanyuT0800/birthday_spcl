import React, { useState } from 'react';
import { Gift, Sparkles, Check, Coffee, PhoneCall, IceCream, Film, Award } from 'lucide-react';
import { CouponGift } from '../types';
import { triggerBurst, triggerFireworks } from '../utils/confetti';
import { sounds } from '../utils/audio';

interface GiftBoxProps {
  coupons: CouponGift[];
  onClaimCoupon: (id: string) => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ coupons, onClaimCoupon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBox = () => {
    sounds.playFanfare();
    sounds.playPop();
    triggerFireworks();
    triggerBurst();
    setIsOpen(true);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'coffee':
        return <Coffee className="w-5 h-5 text-amber-400" />;
      case 'phone':
        return <PhoneCall className="w-5 h-5 text-emerald-400" />;
      case 'icecream':
        return <IceCream className="w-5 h-5 text-pink-400" />;
      case 'movie':
        return <Film className="w-5 h-5 text-purple-400" />;
      default:
        return <Award className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-md mx-auto text-center relative overflow-hidden">
      {/* Decorative tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card-gold text-amber-300 text-xs font-semibold mb-3">
        <Gift className="w-3.5 h-3.5 text-amber-400" />
        <span>Surprise Mystery Gift 🎁</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        A Special Present For You
      </h2>
      <p className="text-slate-300 text-xs sm:text-sm mb-6">
        {!isOpen
          ? 'Wrapped with ribbons and golden blessings. Tap the box to unwrap it!'
          : 'Official Bestie Vouchers! You can claim these anytime in real life! 💖'}
      </p>

      {/* Gift Box Graphic */}
      {!isOpen ? (
        <div
          onClick={handleOpenBox}
          className="group cursor-pointer my-6 py-6 flex flex-col items-center justify-center select-none"
        >
          {/* Animated 3D Gift Box */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-400 rounded-3xl shadow-2xl flex items-center justify-center group-hover:scale-105 active:scale-95 transition-all duration-300 animate-bounce">
            {/* Ribbon horizontal & vertical */}
            <div className="absolute inset-x-0 h-7 bg-amber-300/90 shadow-md border-y border-amber-200" />
            <div className="absolute inset-y-0 w-7 bg-amber-300/90 shadow-md border-x border-amber-200" />

            {/* Giant Bow knot on top */}
            <div className="absolute -top-5 w-14 h-12 flex justify-center items-center z-10">
              <div className="w-7 h-7 rounded-full border-4 border-amber-300 bg-amber-400/90 shadow-lg -mr-2 rotate-[-25deg]" />
              <div className="w-7 h-7 rounded-full border-4 border-amber-300 bg-amber-400/90 shadow-lg -ml-2 rotate-[25deg]" />
            </div>

            <Sparkles className="w-6 h-6 text-yellow-200 absolute top-2 right-2 animate-pulse" />
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-pink-500/80 hover:bg-pink-500 text-white font-bold text-xs shadow-lg transition-colors">
            <Gift className="w-4 h-4" />
            <span>Tap To Unwrap Box</span>
          </span>
        </div>
      ) : (
        /* Unboxed Coupons List */
        <div className="space-y-3.5 my-4 text-left">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className={`p-4 rounded-2xl border transition-all ${
                coupon.claimed
                  ? 'bg-emerald-950/20 border-emerald-500/30 opacity-80'
                  : 'bg-white/5 border-pink-400/25 hover:border-pink-400/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-center">
                    {getIcon(coupon.iconName)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      {coupon.title}
                      {coupon.claimed && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-normal">
                          Claimed!
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">{coupon.description}</p>
                  </div>
                </div>

                {!coupon.claimed ? (
                  <button
                    onClick={() => {
                      sounds.playPop();
                      triggerBurst();
                      onClaimCoupon(coupon.id);
                    }}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold shadow-sm active:scale-95 transition-all"
                  >
                    Redeem
                  </button>
                ) : (
                  <div className="shrink-0 p-1.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="pt-2 text-center">
            <span className="text-xs text-pink-300 font-handwriting text-base">
              Non-refundable, no expiry date, valid forever! 💖
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
