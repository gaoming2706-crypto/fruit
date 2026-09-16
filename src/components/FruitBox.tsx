import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FruitInBox, BoxType } from '../types/fruit';
import { FruitCube } from './FruitCube';
import { generateStackedCubes, BoxPlacedCube } from '../utils/stackLayout';

interface FruitBoxProps {
  fruits: FruitInBox[];
  boxType?: BoxType;
  isOpen?: boolean;
  isPacked?: boolean;
  onSelectFruit?: (fruitInBox: FruitInBox) => void;
  className?: string;
}

export const FruitBox: React.FC<FruitBoxProps> = ({
  fruits,
  boxType = 'single',
  isOpen = true,
  isPacked = false,
  onSelectFruit,
  className = '',
}) => {
  const fruitList = useMemo(() => fruits.map((f) => f.fruit), [fruits]);

  // Container width inside the inner basin is ~280px on mobile and ~330px on desktop
  const internalSize = 310;

  // Generate multi-layer stacked fruit cubes with varied sizes & organic rotation
  const stackedCubes = useMemo(() => {
    return generateStackedCubes(fruitList, internalSize);
  }, [fruitList]);

  // Group cubes by depth layer so lower layers render underneath upper layers naturally
  const baseCubes = useMemo(() => stackedCubes.filter((c) => c.depth === 0), [stackedCubes]);
  const midCubes = useMemo(() => stackedCubes.filter((c) => c.depth === 1), [stackedCubes]);
  const topCubes = useMemo(() => stackedCubes.filter((c) => c.depth === 2), [stackedCubes]);

  // Find original FruitInBox when clicked
  const handleCubeClick = (cube: BoxPlacedCube) => {
    const matched = fruits.find((f) => f.fruit.id === cube.fruit.id);
    if (matched && onSelectFruit) {
      onSelectFruit(matched);
    }
  };

  return (
    <div
      className={`relative w-full max-w-[340px] sm:max-w-[420px] aspect-square mx-auto flex items-center justify-center select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Ambient Countertop Drop Shadow */}
      <motion.div
        animate={{
          scale: isPacked ? 1.05 : [1, 1.03, 1],
          opacity: isPacked ? 0.5 : [0.36, 0.45, 0.36],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-8 w-4/5 h-14 rounded-[50%] bg-gradient-to-r from-transparent via-[#767980]/40 to-transparent blur-2xl pointer-events-none"
      />

      {/* Main Outer Silver Box Chassis */}
      <motion.div
        animate={
          isPacked
            ? { rotateX: 18, rotateY: -6, rotateZ: 1 }
            : {
                rotateX: [16, 13, 16],
                rotateY: [-8, -4, -8],
                rotateZ: [1, -0.5, 1],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-[300px] sm:w-[360px] h-[300px] sm:h-[360px] rounded-[34px] shadow-[0_30px_60px_-15px_rgba(20,22,28,0.26),0_12px_24px_-6px_rgba(20,22,28,0.14)] p-[3px] bg-gradient-to-br from-[#FFFFFF] via-[#E2E3E6] to-[#A8AAB0]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* CNC Machined Bevel Border Frame */}
        <div className="w-full h-full rounded-[31px] p-[10px] bg-gradient-to-tr from-[#C1C3C9] via-[#ECEEF0] to-[#FFFFFF] shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),inset_0_-2.5px_5px_rgba(130,133,140,0.45)]">
          
          {/* Deep Interior Cavity Basin */}
          <div className="relative w-full h-full rounded-[23px] overflow-hidden bg-gradient-to-b from-[#B8BABE] via-[#D5D7DC] to-[#E5E6EA] shadow-[inset_0_16px_32px_rgba(25,28,35,0.32),inset_0_2px_8px_rgba(0,0,0,0.2),inset_0_-10px_20px_rgba(255,255,255,0.9)] flex items-center justify-center p-2.5">
            
            {/* Fine Brushed Metal Base Texture */}
            <div
              className="absolute inset-0 opacity-[0.16] pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 6px)',
              }}
            />

            {/* Inner Wall Darkening Vignette */}
            <div className="absolute inset-0 rounded-[23px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6),inset_0_20px_40px_rgba(20,22,28,0.28)] pointer-events-none z-20" />

            {/* Empty State */}
            {fruits.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-6 text-center z-10 space-y-2.5 select-none"
              >
                <div className="w-16 h-16 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_6px_16px_rgba(0,0,0,0.06)] flex items-center justify-center text-3xl">
                  🍱
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold tracking-tight text-[#111111]/80">
                    专属果盒当前为空
                  </p>
                  <p className="text-xs text-[#6E6E73]">
                    请在上方挑选水果，将自动切为大小不一的果块满盒堆叠
                  </p>
                </div>
                <div className="pt-2 text-[9px] tracking-[0.22em] font-medium text-[#86868B] uppercase">
                  FRUIT CUT · STACKED CUBES SPEC
                </div>
              </motion.div>
            ) : (
              /* Diced Fruit Cubes Stacked Organic Pile */
              <div
                className="relative w-[300px] h-[300px] sm:w-[310px] sm:h-[310px] overflow-hidden rounded-2xl z-10"
                style={{
                  transform: 'scale(0.96)',
                }}
              >
                {/* Layer 0: Base Floor Layer */}
                <div className="absolute inset-0 z-0">
                  {baseCubes.map((cube, idx) => (
                    <motion.div
                      key={cube.id}
                      initial={{ scale: 0, opacity: 0, y: -20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 26,
                        delay: idx * 0.015,
                      }}
                      className="absolute"
                      style={{
                        left: `${cube.x}px`,
                        top: `${cube.y}px`,
                      }}
                    >
                      <FruitCube
                        fruit={cube.fruit}
                        size={cube.size}
                        seed={cube.seed}
                        depth={0}
                        rotation={cube.rotation}
                        onClick={() => handleCubeClick(cube)}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Layer 1: Mid Fill Layer */}
                <div className="absolute inset-0 z-10">
                  {midCubes.map((cube, idx) => (
                    <motion.div
                      key={cube.id}
                      initial={{ scale: 0, opacity: 0, y: -25 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 24,
                        delay: 0.12 + idx * 0.018,
                      }}
                      className="absolute"
                      style={{
                        left: `${cube.x}px`,
                        top: `${cube.y}px`,
                      }}
                    >
                      <FruitCube
                        fruit={cube.fruit}
                        size={cube.size}
                        seed={cube.seed}
                        depth={1}
                        rotation={cube.rotation}
                        onClick={() => handleCubeClick(cube)}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Layer 2: Top Mound Layer (Heaped in the center, giving stacked height) */}
                <div className="absolute inset-0 z-20">
                  {topCubes.map((cube, idx) => (
                    <motion.div
                      key={cube.id}
                      initial={{ scale: 0, opacity: 0, y: -30 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 360,
                        damping: 22,
                        delay: 0.28 + idx * 0.022,
                      }}
                      className="absolute"
                      style={{
                        left: `${cube.x}px`,
                        top: `${cube.y}px`,
                      }}
                    >
                      <FruitCube
                        fruit={cube.fruit}
                        size={cube.size}
                        seed={cube.seed}
                        depth={2}
                        rotation={cube.rotation}
                        onClick={() => handleCubeClick(cube)}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Organic Dividing Hairlines between Fruit Regions */}
                {fruits.length === 2 && (
                  <div className="absolute inset-y-2 left-1/2 w-[2px] bg-gradient-to-b from-white/30 via-white/80 to-white/30 shadow-[0_0_6px_rgba(255,255,255,0.9)] pointer-events-none -translate-x-1/2 rounded-full z-30 opacity-70" />
                )}
                {fruits.length === 3 && (
                  <>
                    <div className="absolute inset-y-2 left-[34%] w-[2px] bg-gradient-to-b from-white/30 via-white/80 to-white/30 shadow-[0_0_6px_rgba(255,255,255,0.9)] pointer-events-none -translate-x-1/2 rounded-full z-30 opacity-70" />
                    <div className="absolute inset-y-2 left-[66%] w-[2px] bg-gradient-to-b from-white/30 via-white/80 to-white/30 shadow-[0_0_6px_rgba(255,255,255,0.9)] pointer-events-none -translate-x-1/2 rounded-full z-30 opacity-70" />
                  </>
                )}
                {fruits.length === 4 && (
                  <>
                    <div className="absolute inset-y-2 left-1/2 w-[2px] bg-gradient-to-b from-white/30 via-white/80 to-white/30 shadow-[0_0_6px_rgba(255,255,255,0.9)] pointer-events-none -translate-x-1/2 rounded-full z-30 opacity-70" />
                    <div className="absolute inset-x-2 top-1/2 h-[2px] bg-gradient-to-r from-white/30 via-white/80 to-white/30 shadow-[0_0_6px_rgba(255,255,255,0.9)] pointer-events-none -translate-y-1/2 rounded-full z-30 opacity-70" />
                  </>
                )}
              </div>
            )}

            {/* Specular Diagonal Reflection across Box */}
            <div className="absolute -top-1/2 -left-1/2 w-full h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-35 pointer-events-none transform -translate-x-12 z-30" />

            {/* Ambient Moisture condensation sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none z-30" />
          </div>
        </div>

        {/* Top-right Status Pill with Fruit Names */}
        <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#D9DADD] text-[10px] font-semibold text-[#111111] shadow-sm uppercase tracking-wider z-40 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {fruits.length === 0
              ? 'EMPTY'
              : fruits.length === 1
              ? `${fruits[0].fruit.name} · 拟真方块满堆`
              : `${fruits.map((f) => f.fruit.name).join(' + ')} · 多层堆叠`}
          </span>
        </div>
      </motion.div>
    </div>
  );
};
