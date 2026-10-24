import React from 'react';
import { Camera, Sparkles } from 'lucide-react';
import { PhotoMemory } from '../types';

interface PersonalMomentsProps {
  photos?: PhotoMemory[];
  bestieName: string;
}

// Default curated aesthetic placeholders until user drops in her real photos
const DEFAULT_PLACEHOLDERS: PhotoMemory[] = [
  {
    id: 'p1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    caption: 'Golden hour smiles & pure warmth ✨',
    date: 'A timeless moment',
    rotation: -1,
  },
  {
    id: 'p2',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    caption: 'Unstoppable laughter & good vibes ☕',
    date: 'Our favorite day',
    rotation: 1,
  },
  {
    id: 'p3',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    caption: 'The girl who deserves the whole world 🌸',
    date: 'Forever memory',
    rotation: -2,
  },
];

export const PersonalMoments: React.FC<PersonalMomentsProps> = ({
  photos = [],
  bestieName,
}) => {
  const displayPhotos = photos.length > 0 ? photos : DEFAULT_PLACEHOLDERS;

  return (
    <div className="text-left select-none">
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-stone-400 font-medium mb-2">
          <Camera className="w-3.5 h-3.5" />
          <span>Captured Moments</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal">
          Through The Lens: {bestieName || 'Bestie'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
          Moments of laughter, light, and the unmistakable glow of your favorite human.
        </p>
      </div>

      {/* Editorial Polaroid-Inspired Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {displayPhotos.map((photo, index) => (
          <div
            key={photo.id || index}
            className="clean-card clean-card-hover p-3 flex flex-col group transition-all duration-300"
            style={{
              transform: `rotate(${photo.rotation || (index % 2 === 0 ? -1 : 1)}deg)`,
            }}
          >
            <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-stone-900 mb-3 relative">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 p-1 rounded-full bg-black/40 backdrop-blur-sm text-amber-300 opacity-80">
                <Sparkles className="w-3 h-3" />
              </div>
            </div>

            <div className="px-1 pb-1">
              <p className="font-serif text-base text-stone-200 font-medium leading-snug">
                {photo.caption}
              </p>
              {photo.date && (
                <p className="text-[10px] uppercase tracking-wider text-stone-500 mt-1">
                  {photo.date}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
