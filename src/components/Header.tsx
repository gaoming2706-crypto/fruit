import React from 'react';
import { ShoppingBag, Download } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  fruitCount: number;
  onOpenBox?: () => void;
  onGoHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ fruitCount, onOpenBox, onGoHome }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#F5F5F7]/80 border-b border-[#D9DADD]/40 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          id="btn-nav-home"
          onClick={onGoHome}
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
        >
          <div className="w-7 h-7 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm group-hover:scale-105 transition-transform duration-200">
            FC
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-[#111111]">
              Fruit Cut
            </span>
            <span className="text-[10px] text-[#6E6E73] font-normal leading-none -mt-0.5">
              水果自由拼
            </span>
          </div>
        </button>

        {/* Right Nav Action */}
        <div className="flex items-center gap-2.5">
          <a
            id="btn-download-source-zip"
            href="/fruit-cut-project.zip"
            download="fruit-cut-project.zip"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#D9DADD]/60 text-xs font-medium text-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:bg-white hover:border-[#BFC1C5] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 cursor-pointer"
            title="下载完整工程代码 ZIP 压缩包 (<100KB)"
          >
            <Download className="w-3.5 h-3.5 text-[#6E6E73]" />
            <span>源码 ZIP</span>
          </a>

          <button
            id="btn-nav-my-box"
            onClick={onOpenBox}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D9DADD]/60 text-xs font-medium text-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:bg-white hover:border-[#BFC1C5] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#6E6E73]" />
            <span>我的果盒</span>
            <motion.span
              key={fruitCount}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-[#111111] text-white text-[10px] font-semibold"
            >
              {fruitCount}
            </motion.span>
          </button>
        </div>
      </div>
    </header>
  );
};
