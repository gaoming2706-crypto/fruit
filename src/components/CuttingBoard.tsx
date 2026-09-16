import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fruit } from '../types/fruit';

interface CuttingBoardProps {
  fruit: Fruit;
  onFruitCut: () => void;
  isCuttingComplete?: boolean;
}

interface Point {
  x: number;
  y: number;
  time: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

export const CuttingBoard: React.FC<CuttingBoardProps> = ({
  fruit,
  onFruitCut,
  isCuttingComplete = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fruitRef = useRef<HTMLDivElement>(null);

  const [isPointerDown, setIsPointerDown] = useState(false);
  const [trail, setTrail] = useState<Point[]>([]);
  const [hasCut, setHasCut] = useState(false);
  const [cutAngle, setCutAngle] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Reset state when fruit changes
  useEffect(() => {
    setHasCut(false);
    setTrail([]);
    setParticles([]);
  }, [fruit.id]);

  // Handle cutting trail fadeout
  useEffect(() => {
    if (trail.length === 0) return;
    const timer = setTimeout(() => {
      setTrail((prev) => (prev.length > 0 ? prev.slice(1) : []));
    }, 40);
    return () => clearTimeout(timer);
  }, [trail]);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy + 0.35, // subtle gravity
            opacity: p.opacity - 0.04,
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 16);
    return () => clearInterval(interval);
  }, [particles]);

  // Check if stroke intersects fruit core
  const checkSliceIntersection = (p1: Point, p2: Point) => {
    if (hasCut || isCuttingComplete || !fruitRef.current || !containerRef.current) return;

    const fruitRect = fruitRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const centerX = fruitRect.left - containerRect.left + fruitRect.width / 2;
    const centerY = fruitRect.top - containerRect.top + fruitRect.height / 2;
    const radius = fruitRect.width * 0.42;

    // Distance from center to segment p1-p2
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const length = Math.hypot(dx, dy);
    if (length < 8) return;

    // Segment projection
    const u = ((centerX - p1.x) * dx + (centerY - p1.y) * dy) / (length * length);
    const clampedU = Math.max(0, Math.min(1, u));
    const closestX = p1.x + clampedU * dx;
    const closestY = p1.y + clampedU * dy;

    const distToLine = Math.hypot(centerX - closestX, centerY - closestY);

    if (distToLine < radius) {
      // Trigger slice!
      triggerCut(Math.atan2(dy, dx) * (180 / Math.PI), centerX, centerY);
    }
  };

  const triggerCut = (angle: number, cx: number, cy: number) => {
    setHasCut(true);
    setCutAngle(angle);

    // Spawn juice micro-particles
    const newParticles: Particle[] = [];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const pAngle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const speed = 2.5 + Math.random() * 4.5;
      newParticles.push({
        id: Date.now() + i,
        x: cx,
        y: cy,
        vx: Math.cos(pAngle) * speed,
        vy: Math.sin(pAngle) * speed,
        size: 3 + Math.random() * 5,
        color: fruit.accentColor || fruit.color,
        opacity: 0.9,
      });
    }
    setParticles(newParticles);

    // Notify parent after impact animation settles
    setTimeout(() => {
      onFruitCut();
    }, 450);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (hasCut || isCuttingComplete) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setIsPointerDown(true);

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pt: Point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      time: Date.now(),
    };
    setTrail([pt]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown || hasCut || isCuttingComplete) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPoint: Point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      time: Date.now(),
    };

    setTrail((prev) => {
      if (prev.length > 0) {
        checkSliceIntersection(prev[prev.length - 1], newPoint);
      }
      return [...prev.slice(-12), newPoint];
    });
  };

  const handlePointerUp = () => {
    setIsPointerDown(false);
  };

  // Render SVG smooth trailing blade line
  const renderBladeTrail = () => {
    if (trail.length < 2) return null;
    const pathData = trail.reduce((acc, point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      return `${acc} L ${point.x} ${point.y}`;
    }, '');

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30">
        {/* Outer Silver Glow */}
        <path
          d={pathData}
          fill="none"
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        />
        {/* Core Blade White Line */}
        <path
          d={pathData}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full max-w-[420px] aspect-square mx-auto rounded-[36px] bg-gradient-to-b from-white/90 via-[#F5F5F7]/80 to-[#E8E9EC]/70 border border-[#D9DADD]/80 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center select-none touch-none cursor-crosshair overflow-hidden"
    >
      {/* Subtle Radial Cutting Surface Grid */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, #BFC1C5 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Surface concentric circles guide */}
      <div className="absolute w-64 h-64 rounded-full border border-dashed border-[#D9DADD]/60 pointer-events-none" />
      <div className="absolute w-44 h-44 rounded-full border border-[#D9DADD]/40 pointer-events-none" />

      {/* Central Interactive Fruit */}
      <div
        ref={fruitRef}
        className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center z-10"
      >
        {!hasCut ? (
          /* Whole Fruit State */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [-4, 4, -4],
            }}
            transition={{
              y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              scale: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Ambient Base Shadow */}
            <div className="absolute -bottom-4 w-28 h-7 bg-black/10 rounded-full blur-md" />

            {/* Giant Fruit Emoji with High-Fidelity Glow */}
            <span className="text-8xl sm:text-9xl filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] select-none pointer-events-none">
              {fruit.emoji}
            </span>

            {/* Cut Line Hint Prompt */}
            <motion.div
              animate={{ opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-8 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#D9DADD] text-[11px] font-medium text-[#6E6E73] pointer-events-none whitespace-nowrap shadow-xs"
            >
              划过水果完成现切 ✦
            </motion.div>
          </motion.div>
        ) : (
          /* Sliced Fruit Split Halves */
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Left/Top Half */}
            <motion.div
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{
                x: -36,
                y: -18,
                rotate: -14,
                scale: 0.95,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="absolute text-7xl sm:text-8xl filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.16)] select-none"
              style={{
                clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
              }}
            >
              {fruit.emoji}
            </motion.div>

            {/* Right/Bottom Half */}
            <motion.div
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{
                x: 36,
                y: 18,
                rotate: 14,
                scale: 0.95,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="absolute text-7xl sm:text-8xl filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.16)] select-none"
              style={{
                clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
              }}
            >
              {fruit.emoji}
            </motion.div>

            {/* Bright Blade Slash Flash */}
            <motion.div
              initial={{ opacity: 1, scaleX: 0 }}
              animate={{ opacity: 0, scaleX: 1.4 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute w-64 h-[3px] bg-white rounded-full shadow-[0_0_12px_#FFFFFF] pointer-events-none z-20"
              style={{
                transform: `rotate(${cutAngle}deg)`,
              }}
            />
          </div>
        )}
      </div>

      {/* Juice Splashes / Micro-Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none z-20"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
            boxShadow: `0 0 4px ${p.color}`,
          }}
        />
      ))}

      {/* Knife Trail Layer */}
      {renderBladeTrail()}

      {/* Top Corner Badge */}
      <div className="absolute top-4 left-5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white text-[10px] font-semibold text-[#111111] uppercase tracking-wider">
        POINTER CUT ACTIVE
      </div>
    </div>
  );
};
