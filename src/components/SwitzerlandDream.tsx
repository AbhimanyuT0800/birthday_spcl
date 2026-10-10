import React, { useState } from 'react';
import { Plane, Compass, Sparkles, MapPin, Heart, Check } from 'lucide-react';
import { triggerBurst, triggerFireworks } from '../utils/confetti';
import { sounds } from '../utils/audio';

interface SwissDestination {
  id: string;
  name: string;
  region: string;
  image: string;
  description: string;
  vibe: string;
  dreamActivity: string;
}

const SWISS_DESTINATIONS: SwissDestination[] = [
  {
    id: 'lauterbrunnen',
    name: 'Lauterbrunnen Valley',
    region: 'Bernese Oberland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80',
    description: 'The real-life fairytale valley with 72 roaring waterfalls dropping from vertical rock faces into emerald green pastures.',
    vibe: 'Fairytale Serenity 🌸',
    dreamActivity: 'Morning coffee on a wooden chalet balcony with waterfall mist in the air ☕',
  },
  {
    id: 'zermatt',
    name: 'Zermatt & The Matterhorn',
    region: 'Valais Alps',
    image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=900&q=80',
    description: 'The iconic pyramid mountain kissed by alpine glow, car-free cobblestone paths, and winter dreamscapes.',
    vibe: 'Alpine Royalty 🏔️',
    dreamActivity: 'Watching the sunset turn the snowy peak into glowing gold 🌅',
  },
  {
    id: 'grindelwald',
    name: 'Grindelwald & First',
    region: 'Jungfrau Region',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=80',
    description: 'Classic Swiss wooden chalets dotted across rolling green hills under giant snowcapped glaciers.',
    vibe: 'Cozy Dream Life 🏡',
    dreamActivity: 'Living in a quiet cottage surrounded by wildflower meadows and cowbells 🔔',
  },
  {
    id: 'glacier-express',
    name: 'The Glacier Express & St. Moritz',
    region: 'Swiss Alps Railway',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=900&q=80',
    description: 'The slowest express train in the world with panoramic glass ceilings crossing deep gorges and snowy bridges.',
    vibe: 'Wanderlust Elegance 🚂',
    dreamActivity: 'Taking the scenic train across snowy mountain passes with a cozy playlist 🎶',
  },
  {
    id: 'lucerne',
    name: 'Lake Lucerne & Chapel Bridge',
    region: 'Central Switzerland',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80',
    description: 'Crystal-clear glacial waters reflecting medieval towers, swans drifting by, and mountains ringing the horizon.',
    vibe: 'Lakeside Magic ⛵',
    dreamActivity: 'Evening boat rides across calm emerald water with cool mountain breezes 🦢',
  },
];

export const SwitzerlandDream: React.FC<{ bestieName: string }> = ({ bestieName }) => {
  const [selectedDest, setSelectedDest] = useState<SwissDestination>(SWISS_DESTINATIONS[0]);
  const [stampClaimed, setStampClaimed] = useState(false);
  const [likes, setLikes] = useState<{ [id: string]: number }>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playPop();
    triggerBurst(0.5, 0.6);
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleStampPassport = () => {
    sounds.playFanfare();
    sounds.playPop();
    triggerFireworks();
    setStampClaimed(true);
  };

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-8 max-w-2xl mx-auto text-center relative overflow-hidden">
      {/* Decorative badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-200 text-xs font-semibold mb-3">
        <span className="text-base">🇨🇭</span>
        <span>Her Untold Secret Dream • Switzerland Bound</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        Destination: Settling in Switzerland
      </h2>
      <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-md mx-auto">
        Because while others just dream of vacation, you belong among the Swiss Alps. Here is the vision board of your future home! 🏔️✨
      </p>

      {/* Interactive Boarding Pass Card */}
      <div className="relative mb-8 bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-red-400/40 text-left overflow-hidden">
        {/* Swiss cross watermark */}
        <div className="absolute right-4 -bottom-6 text-9xl text-white/5 select-none font-bold">
          +
        </div>

        {/* Boarding Pass Header */}
        <div className="flex items-center justify-between border-b border-red-400/40 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-amber-300 transform -rotate-45" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-200">
              Swiss International Dream Airways
            </span>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/20 text-white">
            VIP 1-WAY TICKET
          </span>
        </div>

        {/* Boarding Pass Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
          <div>
            <p className="text-[10px] text-red-200 uppercase font-medium">Passenger</p>
            <p className="font-bold text-sm text-white truncate">{bestieName || 'My Bestie'}</p>
          </div>
          <div>
            <p className="text-[10px] text-red-200 uppercase font-medium">Destination</p>
            <p className="font-bold text-sm text-white">Zürich / Alps 🇨🇭</p>
          </div>
          <div>
            <p className="text-[10px] text-red-200 uppercase font-medium">Life Goal</p>
            <p className="font-bold text-sm text-amber-200">Settle Forever 🏡</p>
          </div>
          <div>
            <p className="text-[10px] text-red-200 uppercase font-medium">Seat</p>
            <p className="font-bold text-sm text-white">First Class 01A</p>
          </div>
        </div>

        {/* Bottom Passport Stamp Section */}
        <div className="pt-3 border-t border-dashed border-red-400/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-red-100 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-300" />
            <span>Official Swiss Resident in the Making ✨</span>
          </div>

          {!stampClaimed ? (
            <button
              onClick={handleStampPassport}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Stamp Passport to Settle</span>
              <Check className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="px-3 py-1.5 rounded-xl bg-white/20 border border-white/40 text-amber-200 text-xs font-bold flex items-center gap-1.5 animate-pulse">
              <span>✦ RESIDENCY VISA APPROVED ✦</span>
            </div>
          )}
        </div>
      </div>

      {/* Featured Switzerland Dream Spot Hero */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-6 text-left group">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
          <img
            src={selectedDest.image}
            alt={selectedDest.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              {selectedDest.region}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium">
              {selectedDest.vibe}
            </span>
          </div>

          {/* Like button on top right */}
          <button
            onClick={(e) => handleLike(selectedDest.id, e)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 backdrop-blur-md text-rose-400 hover:scale-110 active:scale-95 transition-all flex items-center gap-1"
          >
            <Heart className={`w-4 h-4 ${likes[selectedDest.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="text-xs text-white font-bold">{likes[selectedDest.id] || 0}</span>
          </button>

          {/* Bottom Card Info */}
          <div className="absolute bottom-4 inset-x-4">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-1 flex items-center gap-2">
              <span>{selectedDest.name}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-light mb-2 line-clamp-2">
              {selectedDest.description}
            </p>
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs text-amber-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span><strong>Your Future Routine:</strong> {selectedDest.dreamActivity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Destination Selector Carousel / Thumbnails */}
      <div className="text-left mb-2">
        <p className="text-xs uppercase tracking-wider text-pink-300/80 font-bold mb-3 flex items-center justify-between">
          <span>Explore Your Future Swiss Hometowns</span>
          <span className="text-[11px] lowercase text-slate-400">tap to view spot</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {SWISS_DESTINATIONS.map((dest) => {
            const isSelected = selectedDest.id === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => {
                  sounds.playSparkle();
                  setSelectedDest(dest);
                }}
                className={`group relative rounded-2xl p-1.5 overflow-hidden transition-all text-left flex flex-col ${
                  isSelected
                    ? 'ring-2 ring-red-400 bg-red-950/40 scale-105 shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-1.5">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="font-bold text-[11px] text-white truncate px-1">
                  {dest.name}
                </p>
                <span className="text-[9px] text-pink-300/70 truncate px-1">
                  {dest.region}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secret Promise Note */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-red-950/30 to-purple-950/30 border border-red-500/20 text-xs text-pink-200 text-center font-handwriting text-lg">
        “One day you'll be having your morning tea looking at snow-covered Swiss Alps — and I will be visiting your chalet as your #1 guest!” 🇨🇭🏔️☕
      </div>
    </div>
  );
};
