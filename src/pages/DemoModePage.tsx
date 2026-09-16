import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, RotateCcw, Check, Sparkles, Box, Package, ArrowRight } from 'lucide-react';
import { FRUITS } from '../data/fruits';
import { Fruit, FruitInBox } from '../types/fruit';
import { FruitBox } from '../components/FruitBox';
import { ShareCard } from '../components/ShareCard';
import { NutritionRadar } from '../components/NutritionRadar';

interface DemoModePageProps {
  onExitDemo: () => void;
  onEnterManualMode: () => void;
}

type DemoStep =
  | 'welcome'     // 0: 演示开场
  | 'selecting'   // 1: 智能自选 3 拼高端水果
  | 'packing_in'  // 2: 水果直接自适应装入银色果盒
  | 'box_review'  // 3: 果盒 3D 悬浮透视与风味雷达分析
  | 'packaging'   // 4: 自动盖上透明微晶顶盖与银色封条
  | 'share_card'  // 5: 最终渲染出小红书打卡卡片
  | 'complete';   // 6: 演示达成

export const DemoModePage: React.FC<DemoModePageProps> = ({
  onExitDemo,
  onEnterManualMode,
}) => {
  // Pre-selected Demo fruits: 甜颜草莓、热带香芒、润滑牛油果
  const demoFruitList: Fruit[] = [
    FRUITS.find((f) => f.id === 'strawberry') || FRUITS[0],
    FRUITS.find((f) => f.id === 'mango') || FRUITS[1],
    FRUITS.find((f) => f.id === 'avocado') || FRUITS[7],
  ];

  const [currentStep, setCurrentStep] = useState<DemoStep>('welcome');
  const [isPlaying, setIsPlaying] = useState(true);
  const [boxFruits, setBoxFruits] = useState<FruitInBox[]>([]);

  // Automatic choreography sequence (Streamlined without cutting step)
  useEffect(() => {
    if (!isPlaying) return;

    const sequence: { step: DemoStep; delay: number; action?: () => void }[] = [
      { step: 'welcome', delay: 1800 },
      {
        step: 'selecting',
        delay: 2200,
        action: () => setBoxFruits([]),
      },
      {
        step: 'packing_in',
        delay: 2400,
        action: () => {
          setBoxFruits(
            demoFruitList.map((fruit, idx) => ({
              fruit,
              piecesCount: 6,
              slotIndex: idx,
              cutAt: Date.now(),
              rotationOffset: idx === 0 ? -6 : idx === 1 ? 8 : -4,
            }))
          );
        },
      },
      { step: 'box_review', delay: 3000 },
      { step: 'packaging', delay: 3200 },
      { step: 'share_card', delay: 4000 },
      { step: 'complete', delay: 0 },
    ];

    const currentIdx = sequence.findIndex((s) => s.step === currentStep);
    if (currentIdx === -1 || currentIdx >= sequence.length - 1) return;

    const next = sequence[currentIdx + 1];
    const timer = setTimeout(() => {
      if (next.action) next.action();
      setCurrentStep(next.step);
    }, sequence[currentIdx].delay);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying]);

  const handleRestartDemo = () => {
    setBoxFruits([]);
    setCurrentStep('welcome');
    setIsPlaying(true);
  };

  const getStepProgress = () => {
    const steps: DemoStep[] = [
      'welcome',
      'selecting',
      'packing_in',
      'box_review',
      'packaging',
      'share_card',
      'complete',
    ];
    return Math.round(((steps.indexOf(currentStep) + 1) / steps.length) * 100);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
      {/* Top Demo Bar */}
      <div className="w-full flex items-center justify-between py-3 border-b border-[#D9DADD]/50">
        <button
          id="btn-exit-demo"
          onClick={onExitDemo}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6E6E73] hover:text-[#111111] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>退出演示</span>
        </button>

        {/* Progress pill & Play/Pause controls */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D9DADD] text-xs font-mono text-[#111111]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>自动演示中 {getStepProgress()}%</span>
          </div>

          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="w-8 h-8 rounded-full bg-white border border-[#D9DADD] hover:bg-[#F5F5F7] flex items-center justify-center text-[#111111] transition-colors cursor-pointer"
            title={isPlaying ? '暂停' : '继续'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          <button
            onClick={handleRestartDemo}
            className="w-8 h-8 rounded-full bg-white border border-[#D9DADD] hover:bg-[#F5F5F7] flex items-center justify-center text-[#111111] transition-colors cursor-pointer"
            title="从头重新播放"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onEnterManualMode}
            className="px-3.5 py-1.5 rounded-full bg-[#111111] text-white text-xs font-medium hover:bg-[#222222] transition-colors cursor-pointer"
          >
            开始亲自制作
          </button>
        </div>
      </div>

      {/* Main Dynamic Stage Display based on currentStep */}
      <div className="w-full flex-1 flex flex-col items-center justify-center py-6">
        {/* Step 0: Welcome Announcement */}
        {currentStep === 'welcome' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="text-center max-w-lg space-y-4 py-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D9DADD] text-xs font-medium text-[#111111] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>极简自选拼配演示</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]">
              Fruit Cut 全景体验
            </h1>
            <p className="text-base text-[#6E6E73] leading-relaxed">
              水果自选 → 直接装盒 → 营养风味罗盘 → 8阶段真空打包 → 小红书分享卡全流程。
            </p>
          </motion.div>
        )}

        {/* Step 1: Selecting Fruits Visual */}
        {currentStep === 'selecting' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 max-w-xl py-10"
          >
            <span className="text-xs font-mono text-[#86868B] uppercase tracking-widest">
              STEP 1 / 4 · 挑选水果组合
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#111111]">
              已为你精选 3 拼高光果盒阵容
            </h2>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {demoFruitList.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="p-4 rounded-3xl bg-white border border-[#D9DADD] shadow-sm flex flex-col items-center space-y-2"
                >
                  <span className="text-5xl">{f.emoji}</span>
                  <span className="text-sm font-bold text-[#111111]">{f.name}</span>
                  <span className="text-[10px] text-[#6E6E73]">{f.tagline}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Fruit Directly Placing into Box */}
        {currentStep === 'packing_in' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center space-y-6"
          >
            <div className="text-center space-y-1">
              <span className="text-xs font-mono text-[#86868B] uppercase tracking-widest">
                STEP 2 / 4 · 正方形切块满盒装配
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#111111]">
                水果切为正方形块并填满果盒
              </h2>
            </div>

            <FruitBox
              fruits={boxFruits}
              boxType="triple"
              isOpen={true}
              className="max-w-[340px]"
            />
          </motion.div>
        )}

        {/* Step 3: Box Review & Nutrition Radar */}
        {currentStep === 'box_review' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center space-y-6"
          >
            <div className="text-center space-y-1">
              <span className="text-xs font-mono text-[#86868B] uppercase tracking-widest">
                STEP 3 / 4 · 果盒赏鉴与风味罗盘
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#111111]">
                3 拼专属果盒呈现完毕
              </h2>
            </div>

            <FruitBox
              fruits={boxFruits}
              boxType="triple"
              isOpen={true}
              className="max-w-[340px]"
            />

            <div className="w-full max-w-xl">
              <NutritionRadar fruits={demoFruitList} />
            </div>
          </motion.div>
        )}

        {/* Step 4: Automatic Packaging */}
        {currentStep === 'packaging' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center space-y-6"
          >
            <div className="text-center space-y-1">
              <span className="text-xs font-mono text-[#86868B] uppercase tracking-widest">
                STEP 4 / 4 · 8阶段真空微晶封装
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#111111]">
                顶盖扣合与激光防伪锁鲜
              </h2>
            </div>

            <FruitBox
              fruits={boxFruits}
              boxType="triple"
              isOpen={false}
              isPacked={true}
              className="max-w-[340px]"
            />

            <div className="px-4 py-2 rounded-full bg-white border border-[#D9DADD] text-xs font-medium text-[#111111] shadow-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>真空阻尼咬合密封已锁定</span>
            </div>
          </motion.div>
        )}

        {/* Step 5 & 6: Share Card Final Display */}
        {(currentStep === 'share_card' || currentStep === 'complete') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center space-y-6"
          >
            <div className="text-center space-y-1">
              <span className="text-xs font-mono text-[#86868B] uppercase tracking-widest">
                小红书高光卡片生成
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-[#111111]">
                全流程演示圆满达成
              </h2>
              <p className="text-sm text-[#6E6E73]">
                现在，轮到你亲自选配专属于你的第一盒水果！
              </p>
            </div>

            <div className="pt-2">
              <ShareCard
                fruits={boxFruits}
                cardTitle="Fruit Cut 演示高光果盒"
                creatorName="Fruit Cut 体验官"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                id="btn-demo-start-real"
                onClick={onEnterManualMode}
                className="px-8 py-3.5 rounded-full bg-[#111111] text-white text-sm font-medium hover:bg-[#222222] active:scale-[0.97] transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>亲自制作我的果盒</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-demo-replay"
                onClick={handleRestartDemo}
                className="px-6 py-3 rounded-full bg-white border border-[#D9DADD] text-sm font-medium text-[#111111] hover:bg-[#F5F5F7] active:scale-[0.97] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>再看一遍演示</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
