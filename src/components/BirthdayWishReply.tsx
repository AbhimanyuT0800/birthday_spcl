import React, { useState } from 'react';
import { Send, Check, Mail, Sparkles, AlertCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

interface BirthdayWishReplyProps {
  bestieName: string;
  recipientEmail?: string;
  senderName?: string;
}

export const BirthdayWishReply: React.FC<BirthdayWishReplyProps> = ({
  bestieName,
  recipientEmail = 'abhimanyut0800@gmail.com',
  senderName,
}) => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorDetails, setErrorDetails] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('sending');
    setErrorDetails('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `💌 Birthday Note & Wish from ${bestieName || 'Bestie'}!`,
          name: bestieName || 'Your Best Friend',
          message: message,
          _template: 'box',
        }),
      });

      if (response.ok) {
        sounds.playSparkle();
        setStatus('sent');
      } else {
        throw new Error('Could not send message');
      }
    } catch {
      setStatus('error');
      setErrorDetails('Network issue. You can still send it via your email app!');
    }
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`Birthday Note & Wish from ${bestieName || 'Bestie'}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="clean-card p-6 sm:p-10 relative text-left">
      <div className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold mb-3 flex items-center justify-between">
        <span>Write Back</span>
        <span className="flex items-center gap-1 text-stone-400">
          <Mail className="w-3.5 h-3.5" />
          <span>Direct to My Inbox</span>
        </span>
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal mb-2">
        Send Me Your Birthday Wish
      </h2>
      <p className="text-xs sm:text-sm text-stone-400 font-light mb-6 leading-relaxed">
        Got a thought, a wish in return, or something you want to say? Write it here — when you tap send, it will be delivered straight to my email.
      </p>

      {status === 'sent' ? (
        <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-900 flex items-center justify-center mb-3">
            <Check className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl text-stone-100 font-medium mb-1">
            Sent to My Inbox! 💌
          </h3>
          <p className="text-xs text-stone-400 font-light max-w-sm mb-4 leading-relaxed">
            Your note has flown straight to {senderName || 'my'} inbox. Thank you for being such an irreplaceable best friend.
          </p>
          <button
            onClick={() => {
              setMessage('');
              setStatus('idle');
            }}
            className="text-xs text-stone-300 underline underline-offset-4 hover:text-white"
          >
            Send another note
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
              placeholder={`Write your birthday wish or message back to ${senderName || 'me'}...`}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-stone-100 text-sm focus:border-stone-400 outline-none leading-relaxed placeholder:text-stone-600 transition-colors"
            />
          </div>

          {status === 'error' && (
            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorDetails}</span>
              </span>
              <button
                type="button"
                onClick={handleMailtoFallback}
                className="underline underline-offset-2 hover:text-white font-medium"
              >
                Send via Mail App
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <p className="text-[11px] text-stone-500 font-light">
              ✦ Sent privately to {senderName || 'your best friend'}
            </p>

            <button
              type="submit"
              disabled={status === 'sending' || !message.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-stone-100 hover:bg-white text-stone-900 font-medium text-xs tracking-wide transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              {status === 'sending' ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Sending wish...</span>
                </>
              ) : (
                <>
                  <span>Send Wish To Me</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
