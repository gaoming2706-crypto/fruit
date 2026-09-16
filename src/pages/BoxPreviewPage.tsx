import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Trash2, ArrowRight, Package, Sparkles } from 'lucide-react';
import { FruitBox } from '../components/FruitBox';
import { FruitActionSheet } from '../components/FruitActionSheet';
import { NutritionRadar } from '../components/NutritionRadar';
import { Toast } from '../components/Toast';
import { FruitInBox, BoxType } from '../types/fruit';

interface BoxPreviewPageProps {
  fruits: FruitInBox[];
  boxType: BoxType;
  onBackToSelect: () => void;
  onRemoveFruit: (fruitId: string) => void;
  onStartPack?: () => void;
}

export const BoxPreviewPage: React.FC<BoxPreviewPageProps> = ({
  fruits,
  boxType,
  onBackToSelect,
  onRemoveFruit,
  onStartPack,
}) => {
  const [inspectingFruit, setInspectingFruit] = useState<FruitInBox | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2400);
  };

  const handleDelete = (item: FruitInBox) => {
    const fruitName = item.fruit.name;
    setInspectingFruit(null);
    onRemoveFruit(item.fruit.id);
    showToast(`已从果盒移出「${fruitName}」`);
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col">
      {/* Dynamic Floating Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Fruit Inspection Action Sheet */}
      {inspectingFruit && (
        <FruitActionSheet
          fruitInBox={inspectingFruit}
          onClose={() => setInspectingFruit(null)}
          onDelete={handleDelete}
        />
      )}

      {/* Top Header Controls */}
      <div className="flex items-center justify-between py-4">
        <button
          id="btn-box-back"
          onClick={onBackToSelect}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6E6E73] hover:text-[#111111] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>继续挑选水果</span>
        </button>
      </div>

      {/* Page Title & Status */}
      <div className="py-4 sm:py-6 space-y-2 text-center max-w-lg mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D9DADD]/60 text-[11px] font-medium text-[#6E6E73]">
          <span>专属果盒系统</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
          我的专属果盒
        </h1>
        <p className="text-sm text-[#6E6E73]">
          {fruits.length === 0
            ? '当前果盒为空。请挑选水果放入果盒。'
            : `已盛装 ${fruits.length} 种精选水果，自动切为大小不一的拟真果块层叠堆满全盒。轻点可查看或移除。`}
        </p>
      </div>

      {/* Flagship Silver Box Centerpiece */}
      <div className="py-6 sm:py-10 flex justify-center">
        <FruitBox
          fruits={fruits}
          boxType={boxType}
          onSelectFruit={(item) => setInspectingFruit(item)}
        />
      </div>

      {/* Fruit List Quick Chips below box */}
      {fruits.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto pt-2">
          {fruits.map((item) => (
            <button
              key={item.fruit.id}
              onClick={() => setInspectingFruit(item)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D9DADD] text-xs font-medium text-[#111111] hover:bg-[#F5F5F7] hover:border-[#BFC1C5] transition-all cursor-pointer shadow-xs"
            >
              <span>{item.fruit.emoji}</span>
              <span>{item.fruit.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Dynamic Nutrition & Flavor Balance Radar */}
      {fruits.length > 0 && (
        <div className="max-w-xl mx-auto w-full pt-8">
          <NutritionRadar fruits={fruits.map((f) => f.fruit)} />
        </div>
      )}

      {/* Bottom Actions Bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
        {fruits.length === 0 ? (
          <button
            id="btn-empty-select"
            onClick={onBackToSelect}
            className="px-8 py-3 rounded-full bg-[#111111] text-white text-sm font-medium tracking-tight hover:bg-[#222222] active:scale-[0.97] transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>去挑选水果</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <>
            <button
              id="btn-add-more-fruits"
              onClick={onBackToSelect}
              className="px-6 py-3 rounded-full bg-white border border-[#D9DADD] text-sm font-medium text-[#111111] hover:bg-[#F5F5F7] active:scale-[0.97] transition-all cursor-pointer shadow-sm"
            >
              继续添加水果
            </button>

            {onStartPack && (
              <button
                id="btn-box-start-pack"
                onClick={onStartPack}
                className="px-8 py-3 rounded-full bg-[#111111] text-white text-sm font-medium tracking-tight hover:bg-[#222222] active:scale-[0.97] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Package className="w-4 h-4" />
                <span>开始一键打包</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
