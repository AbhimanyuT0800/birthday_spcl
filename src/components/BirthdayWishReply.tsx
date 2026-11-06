import React, { useState } from 'react';
import { Sparkles, Check, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

const PROD_WISH_ENDPOINT =
  'https://form2email.terragohan.com/f/U1_W96LtWjYAehp2AVp_0S_BOHqYmbq1V96yQdHyCOQ';

const WISH_ENDPOINT =
  typeof window !== 'undefined' &&
  window.location.hostname === 'abhimanyut0800.github.io'
    ? PROD_WISH_ENDPOINT
    : '/wish-relay';

interface BirthdayWishReplyProps {
  bestieName: string;
  recipientEmail?: string;
  senderName?: string;
}

export const BirthdayWishReply: React.FC<BirthdayWishReplyProps> = ({
  bestieName,
  recipientEmail,
}) => {
  const targetEmail = (recipientEmail || '').trim() || 'abhimanyua0800@gmail.com';
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const wishSubject = `A Secret Birthday Wish from ${bestieName || 'Bestie'} 🌠`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    targetEmail
  )}&su=${encodeURIComponent(wishSubject)}&body=${encodeURIComponent(message)}`;
  const mailtoHref = `mailto:${targetEmail}?subject=${encodeURIComponent(
    wishSubject
  )}&body=${encodeURIComponent(message)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('sending');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 10000); // 10s max

    try {
      const res = await fetch(WISH_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams({
          name: bestieName || 'Bestie',
          subject: wishSubject,
          message,
        }).toString(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let delivered = res.ok;
      try {
        const data = await res.json();
        if (data && data.ok === false) delivered = false;
      } catch {
        // Non-JSON response: trust the HTTP status.
      }

      if (!delivered) {
        setStatus('error');
        return;
      }

      sounds.playSparkle();
      setStatus('sent');
    } catch {
      clearTimeout(timeoutId);
      setStatus('error');
    }
  };

  return (
    <div className="clean-card p-6 sm:p-10 relative text-left select-none">
      <div className="text-[10px] uppercase tracking-[0.25em] text-sky-400 font-semibold mb-3 flex items-center justify-between">
        <span>A Secret Wish</span>
        <span className="text-sky-300">✦ 🌠</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl text-blue-50 font-normal mb-2 italic">
        Wishhhh... ✨
      </h2>
      <p className="text-xs sm:text-sm text-blue-200/70 font-light mb-6 leading-relaxed">
        Leave your deepest wish, a dream for this year, or whatever is on your mind. Once released, it will find its way...
      </p>

      {status === 'sent' ? (
        <div className="p-8 rounded-xl bg-slate-900/60 border border-blue-500/20 text-center flex flex-col items-center animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-sky-400 text-slate-950 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            <Check className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h3 className="font-serif text-2xl text-blue-50 font-normal mb-2 italic">
            Wish Released Into The Stars 🌠
          </h3>
          <p className="text-xs text-blue-200/70 font-light max-w-sm mb-6 leading-relaxed">
            Your wish has flown quietly into the universe. May this year give you everything your heart silently hopes for.
          </p>
          <button
            onClick={() => {
              setMessage('');
              setStatus('idle');
            }}
            className="inline-flex min-h-11 items-center justify-center px-3 text-xs text-sky-300 underline underline-offset-4 hover:text-white transition-colors"
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
              className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 border border-blue-500/20 text-white text-base sm:text-sm focus:border-sky-400 outline-none leading-relaxed placeholder:text-blue-300/40 transition-colors select-text resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="p-4 rounded-xl bg-slate-900/70 border border-sky-500/25 text-xs text-blue-100 space-y-3 animate-fadeIn">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-sky-300" />
                <div className="space-y-1">
                  <p className="font-semibold text-sky-200">
                    Your wish didn't reach the stars this time.
                  </p>
                  <p className="text-blue-200/70">
                    Make it personally instead — it will still find its way:
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={gmailHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playSparkle()}
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 text-slate-950 font-semibold text-[11px] tracking-wide active:scale-95 transition-all"
                >
                  Send with Gmail
                </a>
                <a
                  href={mailtoHref}
                  onClick={() => sounds.playSparkle()}
                  className="inline-flex min-h-11 items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-sky-400/40 text-sky-200 font-medium text-[11px] tracking-wide hover:bg-sky-400/10 active:scale-95 transition-all"
                >
                  Open Mail App
                </a>
              </div>
              <p className="text-[10px] text-blue-300/60 italic">
                Your message is already filled in — just press Send in your email.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-blue-300/60 font-light italic">
              ✦ A silent wish between you and the stars
            </p>

            <button
              type="submit"
              disabled={status === 'sending' || !message.trim()}
              className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 text-slate-950 font-semibold text-xs tracking-wider transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_25px_rgba(56,189,248,0.35)]"
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
