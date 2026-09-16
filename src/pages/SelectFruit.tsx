import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Filter } from 'lucide-react';
import { Fruit, FruitCategory } from '../types/fruit';
import { FRUITS, CATEGORIES } from '../data/fruits';
import { FruitCard } from '../components/FruitCard';
import { SelectionBar } from '../components/SelectionBar';
import { NutritionRadar } from '../components/NutritionRadar';

interface SelectFruitProps {
  selectedFruits: Fruit[];
  onToggleFruit: (fruit: Fruit) => void;
  onRemoveFruit: (fruitId: string) => void;
  onProceedToBox: () => void;
  onRandomMix: () => void;
  onBackToHome: () => void;
}

export const SelectFruit: React.FC<SelectFruitProps> = ({
  selectedFruits,
  onToggleFruit,
  onRemoveFruit,
  onProceedToBox,
  onRandomMix,
  onBackToHome,
}) => {
  const [activeCategory, setActiveCategory] = useState<FruitCategory>('all');

  const filteredFruits = FRUITS.filter((fruit) => {
    if (activeCategory === 'all') return true;
    return fruit.category === activeCategory;
  });

  const isFull = selectedFruits.length >= 4;

  return (
    <div className="min-h-screen pt-20 pb-36 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col">
      {/* Top Breadcrumb & Action Row */}
      <div className="flex items-center justify-between py-4">
        <button
          id="btn-back-home"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6E6E73] hover:text-[#111111] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>返回首页</span>
        </button>

        <button
          id="btn-select-random"
          onClick={onRandomMix}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D9DADD] text-xs font-medium text-[#111111] hover:bg-[#F5F5F7] transition-all cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8E9096]" />
          <span>一键随机搭配</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="py-6 sm:py-8 space-y-2 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D9DADD]/60 text-[11px] font-medium text-[#6E6E73]">
          <span>自由水果组合</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
          挑选水果组合
        </h1>
        <p className="text-sm sm:text-base text-[#6E6E73] max-w-xl">
          支持 1 至 4 拼自由搭配。点击挑选你心仪的水果，一键定制装盒。
        </p>
      </div>

      {/* Dynamic Nutrition & Flavor Balance Radar when fruits are chosen */}
      {selectedFruits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <NutritionRadar fruits={selectedFruits} />
        </motion.div>
      )}

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar">
        <div className="flex items-center gap-1.5 text-xs text-[#86868B] pr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>分类</span>
        </div>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`tab-category-${cat.id}`}
              onClick={() => setActiveCategory(cat.id as FruitCategory)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-white/80 hover:bg-white text-[#6E6E73] hover:text-[#111111] border border-[#D9DADD]/70'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Fruits Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 pt-4"
      >
        {filteredFruits.map((fruit) => {
          const isSelected = selectedFruits.some((f) => f.id === fruit.id);
          const isDisabled = isFull && !isSelected;

          return (
            <FruitCard
              key={fruit.id}
              fruit={fruit}
              isSelected={isSelected}
              disabled={isDisabled}
              onToggle={onToggleFruit}
            />
          );
        })}
      </motion.div>

      {/* Floating Selection Dock Bar */}
      <SelectionBar
        selectedFruits={selectedFruits}
        onRemoveFruit={onRemoveFruit}
        onProceedToBox={onProceedToBox}
        onRandomMix={onRandomMix}
      />
    </div>
  );
};
