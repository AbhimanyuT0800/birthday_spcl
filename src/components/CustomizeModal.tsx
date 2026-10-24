import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface CustomizeModalProps {
  config: BirthdayConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: BirthdayConfig) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  config,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<BirthdayConfig>({ ...config });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121316] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full text-left relative my-8 shadow-2xl text-stone-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="font-serif text-2xl text-stone-100 font-normal mb-1">
          Customize Page
        </h2>
        <p className="text-xs text-stone-400 font-light mb-6">
          Update names, the birthday date, or personal note.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-stone-400 font-medium block mb-1.5">
              Her Name
            </label>
            <input
              type="text"
              required
              value={formData.bestieName}
              onChange={(e) => setFormData({ ...formData, bestieName: e.target.value })}
              placeholder="e.g. Maya"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-stone-100 text-xs focus:border-stone-400 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-stone-400 font-medium block mb-1.5">
              Your Name (Signature)
            </label>
            <input
              type="text"
              value={formData.senderName}
              onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
              placeholder="Your Name"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-stone-100 text-xs focus:border-stone-400 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-stone-400 font-medium block mb-1.5">
              Your Email Address (To Receive Her Wishes)
            </label>
            <input
              type="email"
              value={formData.recipientEmail || ''}
              onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
              placeholder="e.g. yourname@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-stone-100 text-xs focus:border-stone-400 outline-none"
            />
          </div>

          {/* Countdown Mode */}
          <div className="pt-2">
            <label className="text-[11px] uppercase tracking-wider text-stone-400 font-medium block mb-1.5">
              Countdown Mode
            </label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, useSecondsCountdown: true })}
                className={`py-2 rounded-xl text-xs transition-colors ${
                  formData.useSecondsCountdown
                    ? 'bg-stone-200 text-stone-900 font-medium'
                    : 'bg-white/[0.03] text-stone-400 border border-white/5'
                }`}
              >
                10s Test Mode
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, useSecondsCountdown: false })}
                className={`py-2 rounded-xl text-xs transition-colors ${
                  !formData.useSecondsCountdown
                    ? 'bg-stone-200 text-stone-900 font-medium'
                    : 'bg-white/[0.03] text-stone-400 border border-white/5'
                }`}
              >
                Real Birthday Date
              </button>
            </div>

            {!formData.useSecondsCountdown && (
              <input
                type="datetime-local"
                value={formData.birthdayDate}
                onChange={(e) => setFormData({ ...formData, birthdayDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-stone-100 text-xs focus:border-stone-400 outline-none mt-1"
              />
            )}
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider text-stone-400 font-medium block mb-1.5">
              Personal Letter Note (Optional Override)
            </label>
            <textarea
              rows={4}
              value={formData.letterMessage}
              onChange={(e) => setFormData({ ...formData, letterMessage: e.target.value })}
              placeholder="Leave blank to use the default Switzerland dream letter..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-stone-100 text-xs focus:border-stone-400 outline-none leading-relaxed"
            />
          </div>

          <div className="flex gap-2 pt-3">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-stone-100 text-stone-950 font-medium text-xs hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-stone-400 hover:text-stone-200 text-xs"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
