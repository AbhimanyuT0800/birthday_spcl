import React, { useState } from 'react';
import { Camera, Heart, Plus, X } from 'lucide-react';
import { PhotoMemory } from '../types';
import { triggerBurst } from '../utils/confetti';
import { sounds } from '../utils/audio';

interface PhotoGalleryProps {
  photos: PhotoMemory[];
  onAddPhoto: (photo: PhotoMemory) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onAddPhoto }) => {
  const [activePhoto, setActivePhoto] = useState<PhotoMemory | null>(null);
  const [reactions, setReactions] = useState<{ [id: string]: number }>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');

  const handleReact = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playPop();
    triggerBurst(0.5, 0.7);
    setReactions((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const newPhoto: PhotoMemory = {
      id: Date.now().toString(),
      url: newUrl.trim(),
      caption: newCaption.trim() || 'A priceless memory ✨',
      date: 'Today',
      rotation: Math.floor(Math.random() * 6) - 3,
    };

    onAddPhoto(newPhoto);
    setNewUrl('');
    setNewCaption('');
    setShowAddModal(false);
    sounds.playSparkle();
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto text-center relative overflow-hidden">
      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card-pink text-pink-300 text-xs font-semibold mb-3">
        <Camera className="w-3.5 h-3.5 text-pink-400" />
        <span>Memory Lane 📸</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        Moments We Cherish Forever
      </h2>
      <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-md mx-auto">
        A snapshot of our chaos, laughter, and unbreakable friendship. Tap any polaroid to zoom in!
      </p>

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-items-center mb-6">
        {photos.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => {
              setActivePhoto(item);
              sounds.playSparkle();
            }}
            className="group cursor-pointer bg-white p-3.5 pb-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-0 max-w-[260px] w-full text-left relative"
            style={{
              transform: `rotate(${item.rotation || (idx % 2 === 0 ? -2 : 2)}deg)`,
            }}
          >
            {/* Washi tape decoration on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-200/80 backdrop-blur-sm border border-white/40 transform -rotate-1 shadow-sm rounded-sm" />

            {/* Photo frame */}
            <div className="w-full aspect-[4/3] rounded overflow-hidden bg-slate-100 mb-3 relative">
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  // Fallback pleasant friendship placeholder
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>

            {/* Caption & Date in handwritten style */}
            <div className="flex items-start justify-between">
              <div>
                <p className="font-handwriting text-lg text-slate-800 leading-tight">
                  {item.caption}
                </p>
                {item.date && (
                  <span className="text-[10px] text-slate-400 font-sans">{item.date}</span>
                )}
              </div>

              {/* Heart reaction button */}
              <button
                onClick={(e) => handleReact(item.id, e)}
                className="flex items-center gap-1 text-xs text-rose-500 hover:scale-110 active:scale-95 transition-transform"
                title="Send love"
              >
                <Heart
                  className={`w-4 h-4 ${
                    reactions[item.id] ? 'fill-rose-500 text-rose-500' : 'text-rose-400'
                  }`}
                />
                <span className="font-bold text-[11px]">{reactions[item.id] || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Photo Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl glass-card text-pink-300 hover:text-white hover:bg-white/10 text-xs font-semibold active:scale-95 transition-all"
      >
        <Plus className="w-4 h-4" />
        <span>Add a Memory Photo</span>
      </button>

      {/* Zoom Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 pb-6 rounded-2xl max-w-sm w-full shadow-2xl relative text-left"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-rose-500 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={activePhoto.url}
              alt={activePhoto.caption}
              className="w-full aspect-[4/3] object-cover rounded-lg mb-4"
            />

            <h3 className="font-handwriting text-2xl text-slate-900 mb-1">
              {activePhoto.caption}
            </h3>
            {activePhoto.date && (
              <p className="text-xs text-slate-500 mb-4">{activePhoto.date}</p>
            )}

            <button
              onClick={(e) => handleReact(activePhoto.id, e)}
              className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Send Heart Love ({reactions[activePhoto.id] || 0})</span>
            </button>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {showAddModal && (
        <div
          onClick={() => setShowAddModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <form
            onSubmit={handleAddNew}
            onClick={(e) => e.stopPropagation()}
            className="glass-card bg-slate-900/90 border border-pink-500/30 p-6 rounded-3xl max-w-sm w-full text-left relative"
          >
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Camera className="w-5 h-5 text-pink-400" />
              <span>Add Bestie Memory</span>
            </h3>

            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs text-pink-200/80 mb-1 block">Photo Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-xs focus:border-pink-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-pink-200/80 mb-1 block">Caption / Memory Note</label>
                <input
                  type="text"
                  placeholder="That unforgettable night..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-xs focus:border-pink-500 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold shadow hover:from-pink-600 hover:to-rose-600"
              >
                Save Photo
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 rounded-xl glass-card text-slate-300 text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
