import React, { useState } from 'react';
import { Sparkles, Check, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

interface BirthdayWishReplyProps {
  bestieName: string;
  recipientEmail?: string;
  senderName?: string;
}

export const BirthdayWishReply: React.FC<BirthdayWishReplyProps> = ({
  bestieName,
  recipientEmail = 'abhimanyua0800@gmail.com',
}) => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('sending');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `🌠 A Secret Birthday Wish from ${bestieName || 'Bestie'}!`,
          name: bestieName || 'Bestie',
          wish: message,
          _template: 'box',
        }),
      });

      if (response.ok) {
        sounds.playSparkle();
        setStatus('sent');
      } else {
        throw new Error('Failed to send wish');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`A Secret Birthday Wish from ${bestieName || 'Bestie'} 🌠`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="clean-card p-6 sm:p-10 relative text-left select-none">
      <div className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-semibold mb-3 flex items-center justify-between">
        <span>A Secret Wish</span>
        <span className="text-stone-400">✦ 🌠</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-normal mb-2 italic">
        Wishhhh... ✨
      </h2>
      <p className="text-xs sm:text-sm text-stone-400 font-light mb-6 leading-relaxed">
        Leave your deepest wish, a dream for this year, or whatever is on your mind. Once released, it will find its way...
      </p>

      {status === 'sent' ? (
        <div className="p-8 rounded-xl bg-white/[0.03] border border-white/10 text-center flex flex-col items-center animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-900 flex items-center justify-center mb-4 shadow-sm">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-stone-100 font-normal mb-2 italic">
            Wish Released Into The Stars 🌠
          </h3>
          <p className="text-xs text-stone-400 font-light max-w-sm mb-6 leading-relaxed">
            Your wish has flown quietly into the universe. May this year give you everything your heart silently hopes for.
          </p>
          <button
            onClick={() => {
              setMessage('');
              setStatus('idle');
            }}
            className="text-xs text-stone-300 underline underline-offset-4 hover:text-white transition-colors"
          >
            Wish again
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your wish or dream here... 🌠"
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-stone-100 text-sm focus:border-stone-400 outline-none leading-relaxed placeholder:text-stone-600 transition-colors"
            />
          </div>

          {status === 'error' && (
            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Could not connect to the stars. Try again or release via mail:</span>
              </span>
              <button
                type="button"
                onClick={handleMailtoFallback}
                className="underline underline-offset-2 hover:text-white font-medium ml-2 shrink-0"
              >
                Send via Mail
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <p className="text-[11px] text-stone-500 font-light italic">
              ✦ A silent wish between you and the stars
            </p>

            <button
              type="submit"
              disabled={status === 'sending' || !message.trim()}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-stone-100 hover:bg-white text-stone-900 font-medium text-xs tracking-wider transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              {status === 'sending' ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Releasing wish...</span>
                </>
              ) : (
                <>
                  <span>Wishhhh ✨</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
