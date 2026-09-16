import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Sparkles, Box } from 'lucide-react';
import { Fruit } from '../types/fruit';

interface SelectionBarProps {
  selectedFruits: Fruit[];
  onRemoveFruit: (fruitId: string) => void;
  onProceedToBox: () => void;
  onRandomMix: () => void;
}

export const SelectionBar: React.FC<SelectionBarProps> = ({
  selectedFruits,
  onRemoveFruit,
  onProceedToBox,
  onRandomMix,
}) => {
  const count = selectedFruits.length;
  const isFull = count >= 4;

  const boxLabel =
    count === 1
      ? '单拼果盒 (1/4)'
      : count === 2
      ? '双拼果盒 (2/4)'
      : count === 3
      ? '三拼果盒 (3/4)'
      : count === 4
      ? '满配四拼果盒 (4/4)'
      : '专属果盒待装入';

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-4 sm:px-6 pointer-events-none">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto backdrop-blur-2xl bg-white/90 border border-[#D9DADD]/80 rounded-[28px] p-3 sm:p-4 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.14),0_0_0_1px_rgba(255,255,255,0.8)_inset] pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
      >
        {/* Left Section: Selected Fruit Avatars & Box Status */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5 bg-[#F5F5F7] p-1.5 rounded-full border border-[#D9DADD]/40 min-h-[46px]">
            <AnimatePresence mode="popLayout">
              {selectedFruits.map((fruit) => (
                <motion.div
                  key={fruit.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                  className="relative group w-9 h-9 rounded-full bg-white flex items-center justify-center text-lg shadow-sm border border-[#D9DADD]/50 cursor-pointer"
                  onClick={() => onRemoveFruit(fruit.id)}
                  title={`点击移除 ${fruit.name}`}
                >
                  <span>{fruit.emoji}</span>
                  <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-150">
                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty Slot Placeholders up to 4 */}
            {Array.from({ length: 4 - count }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="w-9 h-9 rounded-full border border-dashed border-[#D9DADD] flex items-center justify-center text-[#86868B] text-xs font-mono"
              >
                +
              </div>
            ))}
          </div>

          {/* Status Text Info */}
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-[#111111] tracking-tight">
              {boxLabel}
            </span>
            <span className="text-[11px] text-[#6E6E73]">
              {count === 0
                ? '挑选 1~4 种水果自由搭配'
                : isFull
                ? '已达到四拼上限，可直接装盒'
                : `还可再选 ${4 - count} 种`}
            </span>
          </div>
        </div>

        {/* Right Section: Action Controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            id="btn-random-bar"
            onClick={onRandomMix}
            className="px-3.5 py-2.5 rounded-full bg-white border border-[#D9DADD] text-xs font-medium text-[#111111] hover:bg-[#F5F5F7] active:scale-[0.97] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8E9096]" />
            <span className="hidden sm:inline">帮我搭配</span>
          </button>

          <button
            id="btn-proceed-box"
            onClick={onProceedToBox}
            disabled={count === 0}
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-sm font-medium tracking-tight transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
              count > 0
                ? 'bg-[#111111] text-white hover:bg-[#222222] hover:-translate-y-0.5 active:scale-[0.97]'
                : 'bg-[#D9DADD] text-[#86868B] cursor-not-allowed shadow-none'
            }`}
          >
            <Box className="w-4 h-4 text-white/80" />
            <span>直接装入果盒</span>
            <ArrowRight className="w-4 h-4 text-white/80" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
