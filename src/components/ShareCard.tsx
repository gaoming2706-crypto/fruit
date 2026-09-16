import React, { forwardRef } from 'react';
import { FruitInBox } from '../types/fruit';
import { QrCode, Sparkles, Droplets, Flame, Activity } from 'lucide-react';
import { FruitCube } from './FruitCube';

interface ShareCardProps {
  fruits: FruitInBox[];
  cardTitle?: string;
  creatorName?: string;
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ fruits, cardTitle = '春日特调 · 水果自由拼', creatorName = 'Fruit Cut 鉴赏家' }, ref) => {
    // Aggregates for card stats
    const totalCalories = fruits.reduce((acc, f) => acc + (f.fruit.nutrition?.calories || 45), 0);
    const totalVitaminC = fruits.reduce((acc, f) => acc + (f.fruit.nutrition?.vitaminC || 20), 0);
    const avgSugar = Math.round(
      fruits.reduce((acc, f) => acc + (f.fruit.nutrition?.sugar || 10), 0) / (fruits.length || 1)
    );

    // Taste composition
    const tasteTags = Array.from(
      new Set(fruits.flatMap((f) => f.fruit.taste.split(' · ')))
    ).slice(0, 4);

    return (
      <div
        ref={ref}
        id="fruit-cut-share-card"
        className="w-[360px] sm:w-[380px] rounded-[36px] bg-[#FFFFFF] text-[#111111] p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] border border-[#E2E3E6] flex flex-col justify-between select-none relative overflow-hidden font-sans"
        style={{ aspectRatio: '3 / 4.2' }}
      >
        {/* Subtle background luxury metallic gradient shine */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#F5F5F7] via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Row: Brand & Date */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#EBECEF] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
              FC
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-tight text-[#111111]">
                FRUIT CUT · 水果自由拼
              </h3>
              <p className="text-[10px] font-mono tracking-widest text-[#86868B] uppercase">
                2026 SIGNATURE BOX · 拟真果块堆叠
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-[#86868B] bg-[#F5F5F7] px-2.5 py-1 rounded-full border border-[#D9DADD]/50">
              {new Date().toLocaleDateString('zh-CN')}
            </span>
          </div>
        </div>

        {/* Center Fruit Presentation Grid */}
        <div className="relative z-10 my-auto py-3 flex flex-col items-center">
          {/* Card Custom Headline */}
          <div className="text-center mb-2.5">
            <h2 className="text-xl font-bold tracking-tight text-[#111111]">
              {cardTitle}
            </h2>
            <p className="text-[11px] text-[#6E6E73] mt-0.5">
              定制者：{creatorName} · {fruits.length} 拼拟真果块层叠装配
            </p>
          </div>

          {/* Fruit Visual Badges Bento with Cut Cube Thumbnails */}
          <div className="w-full grid grid-cols-2 gap-2.5 my-2">
            {fruits.map((item) => (
              <div
                key={item.fruit.id}
                className="p-2.5 rounded-2xl bg-[#F8F9FA] border border-[#E9EAEC] flex items-center gap-2.5 shadow-xs"
              >
                {/* Mini Layered Fruit Cubes Display */}
                <div className="relative w-11 h-11 p-0.5 rounded-xl bg-white border border-[#E5E6E9] shadow-inner shrink-0 overflow-hidden flex items-center justify-center">
                  <div className="absolute left-0.5 top-0.5">
                    <FruitCube fruit={item.fruit} size={17} seed={1} depth={0} rotation={-6} />
                  </div>
                  <div className="absolute right-0.5 bottom-0.5">
                    <FruitCube fruit={item.fruit} size={19} seed={2} depth={0} rotation={8} />
                  </div>
                  <div className="absolute top-1 right-1">
                    <FruitCube fruit={item.fruit} size={15} seed={3} depth={1} rotation={-4} />
                  </div>
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-[#111111] truncate flex items-center gap-1">
                    <span>{item.fruit.emoji}</span>
                    <span>{item.fruit.name}</span>
                  </h4>
                  <p className="text-[10px] text-[#86868B] truncate">
                    {item.fruit.taste}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Taste Characteristic Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
            {tasteTags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-medium text-[#444446] bg-[#F0F1F3] px-2.5 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bento: Nutrition Barcode & Mini QR */}
        <div className="relative z-10 pt-4 border-t border-[#EBECEF] flex items-end justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 text-xs text-[#111111]">
              <div className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-500" />
                <span className="font-bold">{totalCalories}</span>
                <span className="text-[10px] text-[#86868B]">kcal</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-500" />
                <span className="font-bold">{totalVitaminC}</span>
                <span className="text-[10px] text-[#86868B]">mg 维C</span>
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="w-3 h-3 text-blue-500" />
                <span className="font-bold">{avgSugar}</span>
                <span className="text-[10px] text-[#86868B]">% 糖度</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#86868B] font-mono">
                PACKED IN SHANGHAI · 0 蔗糖添加 · 拟真果块饱满装盒
              </span>
            </div>
          </div>

          {/* Decorative Verification QR Code */}
          <div className="w-12 h-12 rounded-xl bg-[#111111] text-white p-1.5 flex items-center justify-center shrink-0 shadow-xs">
            <QrCode className="w-full h-full text-white" />
          </div>
        </div>

        {/* Outer Fine Card Border Line */}
        <div className="absolute inset-0 rounded-[36px] pointer-events-none border border-[#111111]/5" />
      </div>
    );
  }
);

ShareCard.displayName = 'ShareCard';
