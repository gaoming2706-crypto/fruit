import React from 'react';
import { motion } from 'motion/react';
import { Fruit } from '../types/fruit';

interface FlyingFruitPieceProps {
  fruit: Fruit;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  onArrived: () => void;
}

export const FlyingFruitPiece: React.FC<FlyingFruitPieceProps> = ({
  fruit,
  startX,
  startY,
  endX,
  endY,
  onArrived,
}) => {
  // Compute mid-arc apex point for authentic parabolic launch
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const midX = startX + deltaX * 0.45;
  const midY = Math.min(startY, endY) - 120; // launch up into sky before diving

  return (
    <motion.div
      initial={{
        x: startX,
        y: startY,
        scale: 1.4,
        rotate: 0,
        opacity: 1,
      }}
      animate={{
        x: [startX, midX, endX],
        y: [startY, midY, endY],
        scale: [1.4, 1.2, 0.75],
        rotate: [0, 180, 360],
        opacity: [1, 1, 1],
      }}
      transition={{
        duration: 0.85,
        times: [0, 0.45, 1],
        ease: ['easeOut', 'easeIn', 'easeInOut'],
      }}
      onAnimationComplete={onArrived}
      className="fixed z-50 pointer-events-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] flex items-center justify-center text-6xl"
      style={{
        left: 0,
        top: 0,
      }}
    >
      <div className="relative">
        <span>{fruit.emoji}</span>
        {/* Trailing sparkle glow */}
        <motion.div
          animate={{ scale: [1, 1.6, 0.6], opacity: [0.8, 0.3, 0] }}
          transition={{ duration: 0.85 }}
          className="absolute inset-0 rounded-full blur-md"
          style={{ backgroundColor: fruit.color }}
        />
      </div>
    </motion.div>
  );
};
