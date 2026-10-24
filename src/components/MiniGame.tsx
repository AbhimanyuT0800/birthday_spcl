import React, { useState } from 'react';
import { Sparkles, RotateCcw, Laugh } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerBurst } from '../utils/confetti';

interface Question {
  question: string;
  options: {
    text: string;
    reaction: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    question: 'Who takes 3 to 5 business days to reply to a simple text?',
    options: [
      {
        text: 'Definitely Her 📱',
        reaction: 'Accurate! Carrier pigeons fly faster than her replies. 😂',
      },
      {
        text: 'Still Her (claims she was "sleeping") 😴',
        reaction: 'Sleeping? More like watching reels until 3 AM! 💀',
      },
    ],
  },
  {
    question: 'Who is more likely to secretly move to Switzerland tomorrow without telling anyone?',
    options: [
      {
        text: 'Her, escaping to the mountains 🏔️',
        reaction: 'She would already be drinking hot cocoa in a wooden chalet. ☕',
      },
      {
        text: 'Her, but she is forcing me to be her roommate 🧳',
        reaction: 'Deal! I am packing my bags right now. ✈️🇨🇭',
      },
    ],
  },
  {
    question: 'Who makes the questionable life decisions in this friendship?',
    options: [
      {
        text: 'She makes them, I provide moral support 🤡',
        reaction: 'A true partnership in crime! 🤝',
      },
      {
        text: 'We both make them together and regret nothing ✨',
        reaction: 'Partners in chaos for life! 🥂',
      },
    ],
  },
  {
    question: 'Who is officially the most dramatic, yet most irreplaceable best friend?',
    options: [
      {
        text: 'Her (obviously) 👑',
        reaction: '100% correct! The world would be boring without her. 💖',
      },
      {
        text: 'Also Her (there is no other option) 💖',
        reaction: 'Undisputed Queen of our friendship! 🌸',
      },
    ],
  },
];

export const MiniGame: React.FC<{ bestieName: string }> = ({ bestieName }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (reaction: string) => {
    sounds.playPop();
    setSelectedReaction(reaction);

    setTimeout(() => {
      setSelectedReaction(null);
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ((prev) => prev + 1);
      } else {
        sounds.playFanfare();
        triggerBurst();
        setIsCompleted(true);
      }
    }, 1400);
  };

  const handleRestart = () => {
    sounds.playSparkle();
    setCurrentQ(0);
    setSelectedReaction(null);
    setIsCompleted(false);
  };

  return (
    <div className="clean-card p-6 sm:p-10 text-center select-none relative overflow-hidden">
      <div className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-semibold mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Laugh className="w-3.5 h-3.5 text-stone-400" />
          <span>Bestie Reality Check</span>
        </span>
        <span className="text-stone-400">
          {!isCompleted ? `${currentQ + 1} of ${QUESTIONS.length}` : 'Completed'} ✦
        </span>
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal mb-2">
        {!isCompleted ? 'The Friendship Truth Test' : 'Official Diagnosis 🏆'}
      </h2>
      <p className="text-xs text-stone-400 font-light mb-8 max-w-sm mx-auto">
        {!isCompleted
          ? 'A 100% scientific, totally unbiased mini-quiz for the birthday girl.'
          : 'The science has spoken. Here are your official friendship lab results:'}
      </p>

      {!isCompleted ? (
        <div className="max-w-md mx-auto">
          {/* Question Text */}
          <div className="min-h-[70px] flex items-center justify-center mb-6">
            <h3 className="font-serif text-xl sm:text-2xl text-stone-100 font-normal leading-snug">
              "{QUESTIONS[currentQ].question}"
            </h3>
          </div>

          {/* Reaction Banner if just tapped */}
          {selectedReaction ? (
            <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/15 text-stone-200 text-sm font-medium animate-bounce mb-4">
              {selectedReaction}
            </div>
          ) : (
            /* 2 Funny Options */
            <div className="space-y-3">
              {QUESTIONS[currentQ].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.reaction)}
                  className="w-full p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/25 text-left text-xs sm:text-sm text-stone-200 font-light flex items-center justify-between transition-all active:scale-[0.98] group"
                >
                  <span>{opt.text}</span>
                  <span className="text-stone-500 group-hover:text-stone-300 font-serif text-xs">
                    Tap →
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Results Card */
        <div className="max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 text-center animate-fadeIn">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Diagnosis: 100% Certified Bestie</span>
          </div>

          <h3 className="font-serif text-3xl text-stone-100 font-normal mb-3">
            {bestieName || 'Bestie'}, You Passed!
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed mb-6">
            Results confirm: You are <strong>50% Switzerland wanderlust</strong>, <strong>40% unread voice notes</strong>, and <strong>100% the most irreplaceable human</strong> in the universe.
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-100 hover:bg-white text-stone-900 text-xs font-medium tracking-wide transition-all active:scale-95 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </button>
        </div>
      )}
    </div>
  );
};
