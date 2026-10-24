import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Trophy } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerBurst } from '../utils/confetti';

interface CardItem {
  id: number;
  emoji: string;
  name: string;
  matched: boolean;
}

const MEMORY_ITEMS = [
  { emoji: '🏔️', name: 'Alps' },
  { emoji: '🇨🇭', name: 'Switzerland' },
  { emoji: '☕', name: 'Coffee' },
  { emoji: '✈️', name: 'Wanderlust' },
  { emoji: '🎂', name: 'Birthday' },
  { emoji: '💖', name: 'Bestie' },
];

export const MiniGame: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Initialize and shuffle cards
  const initGame = () => {
    const deck = [...MEMORY_ITEMS, ...MEMORY_ITEMS]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        emoji: item.emoji,
        name: item.name,
        matched: false,
      }));
    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    // Ignore click if already flipped, matched, or 2 cards currently open
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      cards[index].matched
    ) {
      return;
    }

    sounds.playPop();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].emoji === cards[secondIdx].emoji) {
        // Matched!
        setTimeout(() => {
          sounds.playSparkle();
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, matched: true } : c
            )
          );
          setFlippedIndices([]);

          // Check if all matched
          const remaining = cards.filter(
            (c, i) => !c.matched && i !== firstIdx && i !== secondIdx
          );
          if (remaining.length === 0) {
            sounds.playFanfare();
            triggerBurst();
            setIsWon(true);
          }
        }, 500);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          setFlippedIndices([]);
        }, 850);
      }
    }
  };

  return (
    <div className="clean-card p-6 sm:p-10 text-center select-none">
      <div className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-semibold mb-3 flex items-center justify-between">
        <span>Mini Game</span>
        <span className="text-stone-400">Memory Match ✦</span>
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal mb-2">
        Match The Alpine Memories
      </h2>
      <p className="text-xs text-stone-400 font-light mb-6 max-w-sm mx-auto">
        A quick game for the birthday girl. Flip the cards and match all the pairs!
      </p>

      {/* Game Board */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 max-w-xs mx-auto mb-6">
        {cards.map((card, index) => {
          const isFlipped = flippedIndices.includes(index) || card.matched;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-all duration-300 transform active:scale-95 ${
                card.matched
                  ? 'bg-stone-800/80 border border-stone-600/40 opacity-70'
                  : isFlipped
                  ? 'bg-stone-200 text-stone-900 shadow-md rotate-0'
                  : 'bg-white/[0.04] border border-white/10 hover:border-white/20'
              }`}
            >
              {isFlipped ? card.emoji : <span className="text-stone-600 text-sm">✦</span>}
            </button>
          );
        })}
      </div>

      {/* Status & Controls */}
      <div className="flex items-center justify-between max-w-xs mx-auto text-xs text-stone-400 pt-2 border-t border-white/5">
        <span className="font-light">Moves: {moves}</span>
        <button
          onClick={initGame}
          className="inline-flex items-center gap-1.5 hover:text-stone-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Won Modal / Banner */}
      {isWon && (
        <div className="mt-6 p-5 rounded-2xl bg-white/[0.04] border border-white/15 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-2 text-stone-100">
            <Trophy className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif text-xl font-normal">You Did It!</h3>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <p className="text-xs text-stone-300 font-light max-w-xs mx-auto leading-relaxed">
            Completed in {moves} moves! You've unlocked the secret birthday blessing: may all your Swiss alpine dreams come true this year! 🏔️✨
          </p>
        </div>
      )}
    </div>
  );
};
