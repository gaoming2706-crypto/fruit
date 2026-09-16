import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { SilverBoxHero } from '../components/SilverBoxHero';
import { FruitInBox } from '../types/fruit';

interface HomeProps {
  fruitsInBox: FruitInBox[];
  onStartSelect: () => void;
  onRandomMix: () => void;
  onStartDemo?: () => void;
}

export const Home: React.FC<HomeProps> = ({
  fruitsInBox,
  onStartSelect,
  onRandomMix,
  onStartDemo,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
      
      {/* Background Subtle Ambient Lighting Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[360px] bg-gradient-to-b from-[#E7E9ED]/70 via-[#F0F1F4]/40 to-transparent rounded-[50%] blur-3xl -z-10 pointer-events-none" />

      {/* Hero Section Content */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 z-10">
        
        {/* Brand Tag / Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#D9DADD]/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
          <span className="text-xs font-medium text-[#6E6E73] tracking-wide">
            Fruit Cut · 水果自由拼
          </span>
        </motion.div>

        {/* Hero Headings */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="space-y-4 max-w-2xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] leading-[1.08]">
            选择你的水果。
            <br />
            <span className="bg-gradient-to-r from-[#111111] via-[#4A4A4F] to-[#111111] bg-clip-text text-transparent">
              自选、自由拼，
            </span>
            <br />
            装进专属果盒。
          </h1>

          <p className="text-base sm:text-lg text-[#6E6E73] font-normal leading-relaxed max-w-lg mx-auto pt-2">
            每一块新鲜应季水果，随心挑选随心搭配。以毫米级金属质感果盒，封装属于你的纯粹自然风味。
          </p>
        </motion.div>

        {/* Central Visual: Silver Metal Fruit Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="py-4 sm:py-8 w-full flex justify-center"
        >
          <SilverBoxHero
            fruits={fruitsInBox}
            onClick={onStartSelect}
            className="cursor-pointer"
          />
        </motion.div>

        {/* Primary & Secondary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md pt-2"
        >
          {/* Primary Button: 开始选水果 */}
          <button
            id="btn-start-select"
            onClick={onStartSelect}
            className="w-full sm:w-auto min-w-[160px] px-8 py-3.5 rounded-full bg-[#111111] text-white text-[15px] sm:text-[16px] font-medium tracking-tight shadow-[0_8px_20px_-4px_rgba(17,17,17,0.25)] hover:bg-[#222222] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>开始选水果</span>
            <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>

          {/* Secondary Button: 随机搭配 */}
          <button
            id="btn-random-mix"
            onClick={onRandomMix}
            className="w-full sm:w-auto min-w-[150px] px-7 py-3.5 rounded-full bg-white border border-[#D9DADD] text-[#111111] text-[15px] sm:text-[16px] font-medium tracking-tight shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:bg-[#F5F5F7] hover:border-[#BFC1C5] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#8E9096]" />
            <span>随机搭配</span>
          </button>

          {/* Optional Demo Button */}
          {onStartDemo && (
            <button
              id="btn-quick-demo"
              onClick={onStartDemo}
              className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-transparent text-[#6E6E73] text-sm font-medium hover:text-[#111111] hover:bg-black/5 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>快速体验</span>
            </button>
          )}
        </motion.div>

        {/* Feature Specs Footnote */}
        <div className="pt-6 flex items-center gap-6 sm:gap-10 text-xs text-[#86868B] font-medium tracking-normal border-t border-[#D9DADD]/40">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">✦</span>
            <span>四种自由规格</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">✦</span>
            <span>随心一键拼配</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">✦</span>
            <span>航空级银盒封装</span>
          </div>
        </div>

      </div>
    </div>
  );
};
