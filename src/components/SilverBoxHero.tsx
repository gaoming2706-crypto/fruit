import React from 'react';
import { motion } from 'motion/react';
import { FruitInBox } from '../types/fruit';

interface SilverBoxHeroProps {
  fruits?: FruitInBox[];
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const SilverBoxHero: React.FC<SilverBoxHeroProps> = ({
  fruits = [],
  className = '',
  onClick,
  interactive = true,
}) => {
  return (
    <div
      className={`relative w-full max-w-[340px] sm:max-w-[400px] aspect-square mx-auto flex items-center justify-center select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Dynamic Ambient Floor Shadow */}
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.35, 0.45, 0.35],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-6 sm:-bottom-8 w-3/4 h-12 rounded-[50%] bg-gradient-to-r from-transparent via-[#8E9096]/50 to-transparent blur-xl pointer-events-none"
      />

      {/* 3D Floating Silver Metal Box */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotateX: [16, 14, 16],
          rotateY: [-10, -6, -10],
          rotateZ: [1.5, 0.5, 1.5],
        }}
        transition={{
          duration: 5.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={interactive ? { scale: 1.02, rotateX: 12, rotateY: -4 } : undefined}
        onClick={onClick}
        className={`relative w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] rounded-[32px] cursor-pointer transition-shadow duration-500`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Outer Box Body (Machined Silver Aluminium Shell) */}
        <div className="absolute inset-0 rounded-[32px] p-[3px] bg-gradient-to-br from-[#FFFFFF] via-[#E2E3E5] to-[#AEB0B5] shadow-[0_25px_50px_-12px_rgba(25,27,33,0.18),0_10px_20px_-5px_rgba(25,27,33,0.1)]">
          {/* Box Outer Rim Bevel */}
          <div className="w-full h-full rounded-[29px] p-[10px] bg-gradient-to-tr from-[#C5C7CC] via-[#EFF0F2] to-[#FFFFFF] shadow-[inset_0_1px_2px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(150,153,160,0.5)]">
            
            {/* Box Deep Inner Cavity */}
            <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-gradient-to-b from-[#D2D4D8] via-[#E5E6E9] to-[#F1F2F4] shadow-[inset_0_12px_24px_rgba(50,52,58,0.22),inset_0_2px_6px_rgba(0,0,0,0.12),inset_0_-8px_16px_rgba(255,255,255,0.8)] flex items-center justify-center">
              
              {/* Brushed Metal Texture Lines (Subtle Specs) */}
              <div
                className="absolute inset-0 opacity-[0.25] pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, rgba(255,255,255,0.7) 0px, rgba(255,255,255,0.7) 1px, transparent 1px, transparent 6px)',
                }}
              />

              {/* Internal Wall Depth Gradient Ring */}
              <div className="absolute inset-0 rounded-[22px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),inset_0_16px_32px_rgba(25,27,33,0.16)] pointer-events-none" />

              {/* Center Fruit / Tray Display Area */}
              {fruits.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center z-10 space-y-2">
                  <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center text-2xl">
                    ✨
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold tracking-wider text-[#111111]/80 uppercase">
                      Empty Fruit Box
                    </p>
                    <p className="text-[11px] text-[#6E6E73]">
                      专属果盒已备好 · 待切入
                    </p>
                  </div>
                  {/* Engraved Brand Mark */}
                  <div className="pt-2 text-[9px] tracking-[0.2em] font-medium text-[#8E9096] uppercase select-none">
                    FRUIT CUT · AIR SPEC
                  </div>
                </div>
              ) : (
                <div className="w-full h-full p-4 relative flex items-center justify-center">
                  {fruits.map((item, idx) => (
                    <motion.div
                      key={item.instanceId || idx}
                      initial={{ scale: 0, rotate: -20, opacity: 0 }}
                      animate={{
                        scale: item.scale || 1,
                        rotate: item.rotation || 0,
                        x: item.offsetX || 0,
                        y: item.offsetY || 0,
                        opacity: 1,
                      }}
                      className="absolute text-5xl filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] cursor-pointer"
                    >
                      {item.fruit.emoji}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Specular Light Reflection Sweep */}
              <div className="absolute -top-1/2 -left-1/2 w-full h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-35 pointer-events-none transform -translate-x-12" />
            </div>
          </div>
        </div>

        {/* Silver Edge Corner Highlight Pill */}
        <div className="absolute top-2 left-4 px-2.5 py-0.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 text-[9px] font-mono font-medium text-[#111111]/70 tracking-tight shadow-sm">
          99.9% ALUM
        </div>
      </motion.div>
    </div>
  );
};
