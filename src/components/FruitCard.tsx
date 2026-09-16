import React from 'react';
import { motion } from 'motion/react';
import { Plus, Check } from 'lucide-react';
import { Fruit } from '../types/fruit';

interface FruitCardProps {
  fruit: Fruit;
  isSelected: boolean;
  disabled?: boolean;
  onToggle: (fruit: Fruit) => void;
}

export const FruitCard: React.FC<FruitCardProps> = ({
  fruit,
  isSelected,
  disabled = false,
  onToggle,
}) => {
  return (
    <motion.div
      id={`fruit-card-${fruit.id}`}
      whileHover={!disabled || isSelected ? { y: -3, scale: 1.01 } : undefined}
      whileTap={!disabled || isSelected ? { scale: 0.97 } : undefined}
      onClick={() => onToggle(fruit)}
      className={`group relative rounded-[24px] p-5 sm:p-6 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between overflow-hidden ${
        isSelected
          ? 'bg-white ring-2 ring-[#111111] shadow-[0_12px_28px_-6px_rgba(0,0,0,0.12)]'
          : disabled
          ? 'bg-white/60 opacity-60 cursor-not-allowed border border-[#D9DADD]/50'
          : 'bg-white hover:bg-white border border-[#D9DADD]/70 hover:border-[#BFC1C5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_24px_-4px_rgba(0,0,0,0.08)]'
      }`}
    >
      {/* Background Soft Fruit Glow */}
      <div
        className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full blur-2xl opacity-15 pointer-events-none transition-opacity duration-300 group-hover:opacity-25"
        style={{ backgroundColor: fruit.color }}
      />

      {/* Top Header: Category Tag & Select Indicator */}
      <div className="flex items-center justify-between z-10">
        <span className="text-[11px] font-medium tracking-wider text-[#6E6E73] uppercase">
          {fruit.englishName}
        </span>

        {/* Status Chip / Button */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
            isSelected
              ? 'bg-[#111111] text-white shadow-sm'
              : 'bg-[#F5F5F7] text-[#6E6E73] group-hover:bg-[#E5E6E9] group-hover:text-[#111111]'
          }`}
        >
          {isSelected ? (
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : (
            <Plus className="w-3.5 h-3.5 stroke-[2]" />
          )}
        </div>
      </div>

      {/* Center Fruit Visual */}
      <div className="py-6 sm:py-7 flex flex-col items-center justify-center z-10">
        <motion.div
          animate={isSelected ? { scale: [1, 1.15, 1], rotate: [0, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="text-6xl sm:text-7xl filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-300"
        >
          {fruit.emoji}
        </motion.div>
      </div>

      {/* Bottom Information */}
      <div className="space-y-1.5 z-10">
        <div className="flex items-baseline justify-between">
          <h3 className="text-lg font-bold tracking-tight text-[#111111]">
            {fruit.name}
          </h3>
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${fruit.color}15`,
              color: fruit.accentColor,
            }}
          >
            {fruit.taste.split(' · ')[0]}
          </span>
        </div>

        <p className="text-xs text-[#6E6E73] line-clamp-1">
          {fruit.tagline}
        </p>
      </div>
    </motion.div>
  );
};
