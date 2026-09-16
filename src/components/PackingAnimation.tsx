import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { FruitInBox, BoxType } from '../types/fruit';
import { FruitBox } from './FruitBox';

interface PackingAnimationProps {
  fruits: FruitInBox[];
  boxType: BoxType;
  onPackingFinished: () => void;
}

type PackPhase =
  | 'settle'      // Phase 1: 水果自动整理，微弹跳归位
  | 'focus'       // Phase 2: 果盒进入视觉中心，微放大
  | 'lid_rise'    // Phase 3: 银色金属透明顶盖自上方升起
  | 'lid_close'   // Phase 4: 盒盖平滑扣合，产生气密边缘咬合
  | 'seal_wrap'   // Phase 5: 极简防伪封条与包装铝带环绕
  | 'stamping'    // Phase 6: 激光刻印质检标识与产地戳记
  | 'rotation'    // Phase 7: 果盒展示级轻微三维旋转
  | 'done';       // Phase 8: 封装圆满达成

export const PackingAnimation: React.FC<PackingAnimationProps> = ({
  fruits,
  boxType,
  onPackingFinished,
}) => {
  const [currentPhase, setCurrentPhase] = useState<PackPhase>('settle');

  useEffect(() => {
    // Precise stage timing choreography
    const t1 = setTimeout(() => setCurrentPhase('focus'), 800);
    const t2 = setTimeout(() => setCurrentPhase('lid_rise'), 1600);
    const t3 = setTimeout(() => setCurrentPhase('lid_close'), 2500);
    const t4 = setTimeout(() => setCurrentPhase('seal_wrap'), 3500);
    const t5 = setTimeout(() => setCurrentPhase('stamping'), 4500);
    const t6 = setTimeout(() => setCurrentPhase('rotation'), 5400);
    const t7 = setTimeout(() => {
      setCurrentPhase('done');
      onPackingFinished();
    }, 6600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [onPackingFinished]);

  const phaseStep =
    currentPhase === 'settle'
      ? 1
      : currentPhase === 'focus'
      ? 2
      : currentPhase === 'lid_rise'
      ? 3
      : currentPhase === 'lid_close'
      ? 4
      : currentPhase === 'seal_wrap'
      ? 5
      : currentPhase === 'stamping'
      ? 6
      : currentPhase === 'rotation'
      ? 7
      : 8;

  const phaseText = {
    settle: '阶段 1 · 果盒整理水果自适应归位',
    focus: '阶段 2 · 果盒移至光学透镜对焦中心',
    lid_rise: '阶段 3 · 航空级微晶顶盖就位升起',
    lid_close: '阶段 4 · 真空扣合边缘微阻尼封装',
    seal_wrap: '阶段 5 · 极简冷银铝制封条环抱',
    stamping: '阶段 6 · 激光防伪质检印记成型',
    rotation: '阶段 7 · 3D 全景透视终审巡礼',
    done: '阶段 8 · 专属果盒封装圆满完成',
  }[currentPhase];

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[540px] px-4 py-8 select-none">
      {/* Top Status Capsule */}
      <motion.div
        key={currentPhase}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D9DADD] shadow-sm mb-6"
      >
        <span className="w-2 h-2 rounded-full bg-[#111111] animate-pulse" />
        <span className="text-xs font-semibold text-[#111111] tracking-wide">
          {phaseText}
        </span>
        <span className="text-[10px] font-mono text-[#86868B] bg-[#F5F5F7] px-2 py-0.5 rounded-full">
          {phaseStep}/8
        </span>
      </motion.div>

      {/* Center 3D Staging Container */}
      <div className="relative flex items-center justify-center my-auto w-full">
        {/* Ambient Packaging Light Halo */}
        <motion.div
          animate={{
            scale: currentPhase === 'lid_close' || currentPhase === 'stamping' ? [1, 1.25, 1] : 1,
            opacity: currentPhase === 'lid_close' ? 0.6 : 0.25,
          }}
          transition={{ duration: 0.6 }}
          className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-transparent via-[#E2E3E6] to-white blur-3xl pointer-events-none"
        />

        {/* Fruit Box with progressive packaging states */}
        <motion.div
          animate={
            currentPhase === 'settle'
              ? { scale: 0.96, y: 10 }
              : currentPhase === 'focus'
              ? { scale: 1.04, y: 0 }
              : currentPhase === 'lid_close'
              ? { scale: [1.04, 1.01, 1.03], y: [0, 6, 0] }
              : currentPhase === 'rotation'
              ? { rotateY: [-10, 15, -6], rotateX: [16, 12, 16], scale: 1.03 }
              : { scale: 1.03 }
          }
          transition={{
            duration: currentPhase === 'rotation' ? 1.4 : 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative"
        >
          {/* Base Fruit Box */}
          <FruitBox
            fruits={fruits}
            boxType={boxType}
            isOpen={currentPhase === 'settle' || currentPhase === 'focus'}
            isPacked={phaseStep >= 4}
          />

          {/* Transparent Acrylic/Silver Micro-Bevel Lid Cover (Phases 3 to 8) */}
          <AnimatePresence>
            {phaseStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: -90, scale: 0.94 }}
                animate={{
                  opacity: 1,
                  y: phaseStep >= 4 ? 0 : -35,
                  scale: phaseStep >= 4 ? 1 : 0.97,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 22,
                }}
                className="absolute inset-[3px] rounded-[31px] pointer-events-none z-30 overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(240,241,245,0.2) 50%, rgba(217,218,221,0.3) 100%)',
                  backdropFilter: 'blur(3px)',
                  boxShadow:
                    'inset 0 1.5px 3px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(100,103,110,0.3), 0 8px 24px rgba(0,0,0,0.12)',
                  border: '1.5px solid rgba(255,255,255,0.7)',
                }}
              >
                {/* Diagonal Specular Sheen across Lid */}
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-35 transform -translate-x-10" />

                {/* Lid Center Laser Engraved Brand Stamp */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border border-white/60 bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xs">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#111111]/75">
                      FC
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimalist Packaging Aluminium Seal Ribbon (Phases 5 to 8) */}
          <AnimatePresence>
            {phaseStep >= 5 && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-16 pointer-events-none z-40 flex flex-col justify-between py-2"
              >
                {/* Silver Ribbon Band */}
                <div className="w-full h-full rounded-sm bg-gradient-to-b from-[#FFFFFF] via-[#D9DADD] to-[#BFC1C5] shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] border-x border-[#BFC1C5]/80 flex flex-col items-center justify-between py-4 px-1">
                  <span className="text-[8px] font-mono tracking-[0.25em] text-[#111111]/80 uppercase rotate-90 my-auto">
                    AIR TIGHT
                  </span>

                  {/* Tamper-evident Seal Badge (Phases 6 to 8) */}
                  {phaseStep >= 6 && (
                    <motion.div
                      initial={{ scale: 2.2, opacity: 0, rotate: -25 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="w-10 h-10 rounded-full bg-[#111111] text-white flex flex-col items-center justify-center shadow-md my-auto"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                      <span className="text-[6px] font-mono tracking-tighter text-white/90">
                        PASSED
                      </span>
                    </motion.div>
                  )}

                  <span className="text-[8px] font-mono tracking-[0.25em] text-[#111111]/80 uppercase rotate-90 my-auto">
                    2026 SPEC
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Progress Tracker */}
      <div className="w-full max-w-sm flex items-center justify-between gap-1.5 pt-8">
        {Array.from({ length: 8 }).map((_, idx) => {
          const isPassed = phaseStep > idx + 1;
          const isCurrent = phaseStep === idx + 1;
          return (
            <div
              key={idx}
              className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                isPassed
                  ? 'bg-[#111111]'
                  : isCurrent
                  ? 'bg-[#111111] animate-pulse'
                  : 'bg-[#D9DADD]/60'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
