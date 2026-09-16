import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { Fruit, FruitInBox, BoxType } from '../types/fruit';
import { CuttingBoard } from '../components/CuttingBoard';
import { FruitBox } from '../components/FruitBox';
import { FlyingFruitPiece } from '../components/FlyingFruitPiece';

interface CutFruitPageProps {
  fruitsToCut: Fruit[];
  fruitsInBox: FruitInBox[];
  boxType: BoxType;
  onFruitSlicedAndPlaced: (fruit: Fruit) => void;
  onFinishCutting: () => void;
  onBackToSelect: () => void;
}

interface FlyingItem {
  id: string;
  fruit: Fruit;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export const CutFruitPage: React.FC<CutFruitPageProps> = ({
  fruitsToCut,
  fruitsInBox,
  boxType,
  onFruitSlicedAndPlaced,
  onFinishCutting,
  onBackToSelect,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slicedFruitIds, setSlicedFruitIds] = useState<string[]>([]);
  const [flyingItem, setFlyingItem] = useState<FlyingItem | null>(null);
  const [boxImpact, setBoxImpact] = useState(false);

  const cuttingAreaRef = useRef<HTMLDivElement>(null);
  const targetBoxRef = useRef<HTMLDivElement>(null);

  const currentFruit = fruitsToCut[currentIndex] || fruitsToCut[0];

  const handleFruitCut = () => {
    if (!currentFruit || flyingItem) return;

    // Calculate start position (center of cutting board)
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight * 0.45;
    if (cuttingAreaRef.current) {
      const rect = cuttingAreaRef.current.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    }

    // Calculate end position (target fruit box receiver)
    let endX = window.innerWidth / 2;
    let endY = window.innerHeight * 0.85;
    if (targetBoxRef.current) {
      const rect = targetBoxRef.current.getBoundingClientRect();
      endX = rect.left + rect.width / 2;
      endY = rect.top + rect.height / 2;
    }

    // Trigger flying arc
    setFlyingItem({
      id: `${currentFruit.id}-${Date.now()}`,
      fruit: currentFruit,
      startX,
      startY,
      endX,
      endY,
    });
  };

  const handleFlightArrived = () => {
    if (!flyingItem) return;
    const justCutFruit = flyingItem.fruit;

    // Trigger box impact recoil
    setBoxImpact(true);
    setTimeout(() => setBoxImpact(false), 400);

    // Sync state: fruit lands inside box
    setSlicedFruitIds((prev) => [...prev, justCutFruit.id]);
    onFruitSlicedAndPlaced(justCutFruit);
    setFlyingItem(null);

    // Advance to next fruit or finish
    if (currentIndex + 1 < fruitsToCut.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all fruits
      setTimeout(() => {
        onFinishCutting();
      }, 700);
    }
  };

  if (!currentFruit) {
    return (
      <div className="min-h-screen pt-28 px-6 text-center">
        <p className="text-sm text-[#6E6E73]">请先挑选要切的水果。</p>
        <button
          onClick={onBackToSelect}
          className="mt-4 px-6 py-2.5 rounded-full bg-[#111111] text-white text-sm"
        >
          返回选水果
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-20 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
      {/* Flight Particle Component */}
      {flyingItem && (
        <FlyingFruitPiece
          key={flyingItem.id}
          fruit={flyingItem.fruit}
          startX={flyingItem.startX}
          startY={flyingItem.startY}
          endX={flyingItem.endX}
          endY={flyingItem.endY}
          onArrived={handleFlightArrived}
        />
      )}

      {/* Top Header Row */}
      <div className="w-full flex items-center justify-between py-3 sm:py-4">
        <button
          id="btn-cut-back"
          onClick={onBackToSelect}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6E6E73] hover:text-[#111111] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>重选水果</span>
        </button>

        {/* Progress Queue Pills */}
        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D9DADD]">
          {fruitsToCut.map((fruit, idx) => {
            const isDone = slicedFruitIds.includes(fruit.id);
            const isCurrent = idx === currentIndex;
            return (
              <div
                key={fruit.id}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-all ${
                  isDone
                    ? 'bg-[#111111] text-white font-medium'
                    : isCurrent
                    ? 'bg-[#F5F5F7] text-[#111111] font-semibold ring-1 ring-[#111111]'
                    : 'opacity-40 text-[#6E6E73]'
                }`}
              >
                <span>{fruit.emoji}</span>
                {isDone && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero Guidance Section */}
      <div className="py-2 sm:py-4 space-y-1.5 text-center max-w-md mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D9DADD]/60 text-[11px] font-medium text-[#6E6E73]">
          <span>Stage 5 · 现切飞入果盒</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          沿着水果划一刀。
        </h1>
        <p className="text-xs sm:text-sm text-[#6E6E73]">
          切开后水果将自动沿弧线飞入你的银色果盒。
        </p>
      </div>

      {/* Two-Column / Split Stage: Cutting Stage on Left/Top, Fruit Box Receiver on Right/Bottom */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 sm:pt-6">
        
        {/* Left/Top: Interactive Cutting Board Stage */}
        <div ref={cuttingAreaRef} className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[420px] flex items-center justify-between pb-3 px-2">
            <span className="text-sm font-semibold text-[#111111]">
              正在切割：{currentFruit.name}
            </span>
            <span className="text-xs font-mono text-[#86868B]">
              {currentIndex + 1} / {fruitsToCut.length}
            </span>
          </div>

          <CuttingBoard
            key={currentFruit.id}
            fruit={currentFruit}
            onFruitCut={handleFruitCut}
            isCuttingComplete={!!flyingItem}
          />

          <div className="pt-3 text-center">
            <span className="text-[11px] text-[#86868B]">
              按住鼠标或手指划过水果切面
            </span>
          </div>
        </div>

        {/* Right/Bottom: Real-time Fruit Box Receiver Dock */}
        <div ref={targetBoxRef} className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[320px] flex items-center justify-between pb-3 px-2">
            <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
              果盒实时预览
            </span>
            <span className="text-xs text-[#6E6E73]">
              已入盒：{fruitsInBox.length} 种
            </span>
          </div>

          {/* Fruit Box with Landing Recoil Animation */}
          <motion.div
            animate={
              boxImpact
                ? {
                    scale: [1, 1.06, 0.98, 1],
                    rotateX: [16, 12, 17, 16],
                    y: [0, 6, -3, 0],
                  }
                : {}
            }
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-[300px] sm:max-w-[340px]"
          >
            <FruitBox
              fruits={fruitsInBox}
              boxType={boxType}
              isOpen={true}
              className="max-w-[300px] sm:max-w-[340px]"
            />
          </motion.div>

          {/* Quick Skip or Box Button */}
          <div className="pt-6">
            <button
              id="btn-direct-box"
              onClick={onFinishCutting}
              className="px-5 py-2 rounded-full bg-white border border-[#D9DADD] text-xs font-medium text-[#111111] hover:bg-[#F5F5F7] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>查看完整果盒</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
