import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, X, Grid } from 'lucide-react';
import { FruitInBox } from '../types/fruit';
import { FruitCube } from './FruitCube';

interface FruitActionSheetProps {
  fruitInBox: FruitInBox | null;
  onClose: () => void;
  onDelete: (fruitInBox: FruitInBox) => void;
}

export const FruitActionSheet: React.FC<FruitActionSheetProps> = ({
  fruitInBox,
  onClose,
  onDelete,
}) => {
  if (!fruitInBox) return null;
  const fruit = fruitInBox.fruit;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        />

        {/* Modal / Action Sheet Container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-sm rounded-[32px] bg-white border border-[#D9DADD] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] p-6 z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            id="btn-sheet-close"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#E5E6E9] flex items-center justify-center text-[#6E6E73] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Fruit Cut Cube Display Header */}
          <div className="flex flex-col items-center text-center pt-2 pb-5">
            <div className="relative mb-3 flex items-center justify-center">
              {/* Organic Stacked Mini Pile with Varied Cube Sizes */}
              <div className="relative w-28 h-24 rounded-2xl bg-[#F5F5F7] border border-[#E5E6E9] shadow-inner flex items-center justify-center overflow-hidden">
                <div className="absolute left-2.5 top-3">
                  <FruitCube fruit={fruit} size={32} seed={1} depth={0} rotation={-8} />
                </div>
                <div className="absolute right-2.5 top-2.5">
                  <FruitCube fruit={fruit} size={36} seed={2} depth={0} rotation={6} />
                </div>
                <div className="absolute left-7 bottom-2">
                  <FruitCube fruit={fruit} size={42} seed={3} depth={1} rotation={-3} />
                </div>
                <div className="absolute right-4 bottom-3">
                  <FruitCube fruit={fruit} size={30} seed={4} depth={1} rotation={9} />
                </div>
                <div className="absolute top-4 left-9">
                  <FruitCube fruit={fruit} size={34} seed={5} depth={2} rotation={4} />
                </div>
              </div>

              {/* Floating Fruit Emoji badge */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md border border-[#E5E6E9] flex items-center justify-center text-lg">
                {fruit.emoji}
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5F5F7] text-[10px] font-medium text-[#6E6E73] mb-1.5">
              <Grid className="w-3 h-3 text-[#111111]" />
              <span>拟真切块 · 大小不一堆叠</span>
            </div>

            <h3 className="text-xl font-bold tracking-tight text-[#111111]">
              {fruit.name}
            </h3>
            <p className="text-xs text-[#6E6E73] mt-1 max-w-[240px]">
              {fruit.tagline} · {fruit.taste}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              id="btn-action-delete"
              onClick={() => onDelete(fruitInBox)}
              className="w-full py-3.5 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100/80 active:scale-[0.98] text-rose-600 transition-all flex items-center justify-center gap-2 text-sm font-medium cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>从果盒移出此水果</span>
            </button>

            <button
              id="btn-action-cancel"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-2xl bg-transparent hover:bg-[#F5F5F7] text-xs font-medium text-[#86868B] hover:text-[#111111] transition-all cursor-pointer"
            >
              保留并返回
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
