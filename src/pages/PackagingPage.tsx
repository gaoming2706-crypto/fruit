import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, RefreshCw, Share2, Check } from 'lucide-react';
import { FruitInBox, BoxType } from '../types/fruit';
import { PackingAnimation } from '../components/PackingAnimation';
import { FruitBox } from '../components/FruitBox';
import { NutritionRadar } from '../components/NutritionRadar';

interface PackagingPageProps {
  fruits: FruitInBox[];
  boxType: BoxType;
  onBackToBox: () => void;
  onReopenBox: () => void;
  onGoToShareCard: () => void;
}

export const PackagingPage: React.FC<PackagingPageProps> = ({
  fruits,
  boxType,
  onBackToBox,
  onReopenBox,
  onGoToShareCard,
}) => {
  const [isPackingDone, setIsPackingDone] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);

  const handlePackingFinished = () => {
    setIsPackingDone(true);
    setIsReplaying(false);
  };

  const handleReplay = () => {
    setIsPackingDone(false);
    setIsReplaying(true);
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
      {/* Top Header Row */}
      <div className="w-full flex items-center justify-between py-4">
        <button
          id="btn-pack-back"
          onClick={onBackToBox}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6E6E73] hover:text-[#111111] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>返回果盒</span>
        </button>

        {isPackingDone && (
          <div className="flex items-center gap-2">
            <button
              id="btn-pack-replay"
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#D9DADD] text-xs font-medium text-[#111111] hover:bg-[#F5F5F7] transition-all cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#6E6E73]" />
              <span>重新演示打包</span>
            </button>
          </div>
        )}
      </div>

      {/* Hero Guidance Section */}
      <div className="py-4 sm:py-6 space-y-2 text-center max-w-md mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D9DADD]/60 text-[11px] font-medium text-[#6E6E73]">
          <span>Stage 8 · 极简一键打包</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
          {isPackingDone ? '果盒已严选封装。' : '正在为你的果盒打包。'}
        </h1>
        <p className="text-sm text-[#6E6E73]">
          {isPackingDone
            ? '微晶顶盖已扣合，金属封条已锁紧。这份天然纯粹已为您锁鲜封装。'
            : '透明晶盖下落 · 机械咬合阻尼 · 防伪激光贴封'}
        </p>
      </div>

      {/* Main Center Display Area */}
      {!isPackingDone || isReplaying ? (
        /* 8-Phase Live Packing Animation */
        <div className="w-full py-2">
          <PackingAnimation
            fruits={fruits}
            boxType={boxType}
            onPackingFinished={handlePackingFinished}
          />
        </div>
      ) : (
        /* Packed Final Inspection View */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center py-6"
        >
          {/* Finished Packed 3D Box */}
          <div className="relative py-4 flex justify-center w-full">
            <FruitBox
              fruits={fruits}
              boxType={boxType}
              isOpen={false}
              isPacked={true}
            />

            {/* Floating Spec Ribbon & Badge Overlay for inspection */}
            <div className="absolute top-2 right-4 sm:right-16 bg-white/90 backdrop-blur-md border border-[#D9DADD] px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-2 text-xs font-semibold text-[#111111]">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              <span>真空锁鲜 100% PASS</span>
            </div>
          </div>

          {/* Nutrition & Spec Recap */}
          <div className="w-full max-w-xl pt-6">
            <NutritionRadar fruits={fruits.map((f) => f.fruit)} />
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              id="btn-reopen-box"
              onClick={onReopenBox}
              className="px-6 py-3 rounded-full bg-white border border-[#D9DADD] text-sm font-medium text-[#111111] hover:bg-[#F5F5F7] active:scale-[0.97] transition-all cursor-pointer shadow-sm"
            >
              开盒重调水果
            </button>

            <button
              id="btn-to-share-card"
              onClick={onGoToShareCard}
              className="px-8 py-3 rounded-full bg-[#111111] text-white text-sm font-medium tracking-tight hover:bg-[#222222] active:scale-[0.97] transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Share2 className="w-4 h-4" />
              <span>生成小红书分享卡 (Stage 9)</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
