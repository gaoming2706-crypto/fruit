import React from 'react';
import { Fruit } from '../types/fruit';
import { Flame, Droplets, Sparkles, Activity } from 'lucide-react';

interface NutritionRadarProps {
  fruits: Fruit[];
  className?: string;
}

export const NutritionRadar: React.FC<NutritionRadarProps> = ({ fruits, className = '' }) => {
  if (fruits.length === 0) return null;

  // Calculate aggregates
  const totalCalories = fruits.reduce((acc, f) => acc + (f.nutrition?.calories || 45), 0);
  const avgSugar = Math.round(
    fruits.reduce((acc, f) => acc + (f.nutrition?.sugar || 10), 0) / fruits.length
  );
  const totalVitaminC = fruits.reduce((acc, f) => acc + (f.nutrition?.vitaminC || 20), 0);
  const totalFiber = +(
    fruits.reduce((acc, f) => acc + (f.nutrition?.fiber || 2), 0)
  ).toFixed(1);

  // Flavor balance computation
  const sweetCount = fruits.filter(f => f.taste.includes('甜')).length;
  const sourCount = fruits.filter(f => f.taste.includes('酸')).length;
  const refreshingCount = fruits.filter(f => f.taste.includes('爽') || f.taste.includes('清') || f.taste.includes('润')).length;

  let balanceTag = '自然风味';
  if (sweetCount > 0 && sourCount > 0) {
    balanceTag = '酸甜黄金平衡 ✦';
  } else if (sweetCount >= 3) {
    balanceTag = '浓郁蜜甜 · 能量充沛';
  } else if (refreshingCount >= 2) {
    balanceTag = '多汁清爽 · 沁润舒心';
  }

  // Normalized dimensions for 4-axis diamond radar polygon
  // Axes: [Calories/density, Sugar, Vitamin C, Fiber]
  const maxCal = 300;
  const maxSugar = 20;
  const maxVitC = 200;
  const maxFiber = 12;

  const calNorm = Math.min(1, Math.max(0.2, totalCalories / maxCal));
  const sugarNorm = Math.min(1, Math.max(0.2, avgSugar / maxSugar));
  const vitCNorm = Math.min(1, Math.max(0.2, totalVitaminC / maxVitC));
  const fiberNorm = Math.min(1, Math.max(0.2, totalFiber / maxFiber));

  // Radar Center (50, 50), Radius: 36
  const cx = 50;
  const cy = 50;
  const r = 36;

  // Diamond points:
  // Top: Vitamin C (0, -r)
  // Right: Calories (r, 0)
  // Bottom: Sugar (0, r)
  // Left: Fiber (-r, 0)
  const topX = cx;
  const topY = cy - r * vitCNorm;

  const rightX = cx + r * calNorm;
  const rightY = cy;

  const bottomX = cx;
  const bottomY = cy + r * sugarNorm;

  const leftX = cx - r * fiberNorm;
  const leftY = cy;

  const polygonPath = `${topX},${topY} ${rightX},${rightY} ${bottomX},${bottomY} ${leftX},${leftY}`;

  return (
    <div
      className={`rounded-[28px] bg-white/90 backdrop-blur-md border border-[#D9DADD] p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] ${className}`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#D9DADD]/50">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#111111]" />
          <h3 className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
            果盒风味与营养罗盘
          </h3>
        </div>
        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
          {balanceTag}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-4">
        {/* SVG Polygon Radar Visual */}
        <div className="sm:col-span-5 flex justify-center">
          <div className="relative w-36 h-36">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              {/* Background concentric reference webs */}
              <polygon
                points="50,14 86,50 50,86 14,50"
                fill="none"
                stroke="#E5E6E9"
                strokeWidth="1"
              />
              <polygon
                points="50,26 74,50 50,74 26,50"
                fill="none"
                stroke="#E5E6E9"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              <line x1="50" y1="14" x2="50" y2="86" stroke="#E5E6E9" strokeWidth="0.8" />
              <line x1="14" y1="50" x2="86" y2="50" stroke="#E5E6E9" strokeWidth="0.8" />

              {/* Data polygon filled with Apple-style silver gradient */}
              <defs>
                <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#111111" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#111111" stopOpacity="0.12" />
                </linearGradient>
              </defs>

              <polygon
                points={polygonPath}
                fill="url(#radarGrad)"
                stroke="#111111"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              {/* Nodes */}
              <circle cx={topX} cy={topY} r="2.5" fill="#111111" />
              <circle cx={rightX} cy={rightY} r="2.5" fill="#111111" />
              <circle cx={bottomX} cy={bottomY} r="2.5" fill="#111111" />
              <circle cx={leftX} cy={leftY} r="2.5" fill="#111111" />

              {/* Labels */}
              <text x="50" y="8" textAnchor="middle" fontSize="7" fill="#86868B" fontWeight="500">
                维生素C
              </text>
              <text x="96" y="52" textAnchor="start" fontSize="7" fill="#86868B" fontWeight="500">
                卡路里
              </text>
              <text x="50" y="97" textAnchor="middle" fontSize="7" fill="#86868B" fontWeight="500">
                糖分
              </text>
              <text x="4" y="52" textAnchor="end" fontSize="7" fill="#86868B" fontWeight="500">
                纤维
              </text>
            </svg>
          </div>
        </div>

        {/* 4 Metric Stats Bento Blocks */}
        <div className="sm:col-span-7 grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-2xl bg-[#F5F5F7]/80 border border-[#E5E6E9]/60">
            <div className="flex items-center gap-1 text-[11px] text-[#6E6E73]">
              <Flame className="w-3 h-3 text-orange-500" />
              <span>总能量</span>
            </div>
            <p className="text-base font-bold text-[#111111] mt-0.5">
              {totalCalories} <span className="text-[10px] font-normal text-[#86868B]">kcal</span>
            </p>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#F5F5F7]/80 border border-[#E5E6E9]/60">
            <div className="flex items-center gap-1 text-[11px] text-[#6E6E73]">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>均糖度</span>
            </div>
            <p className="text-base font-bold text-[#111111] mt-0.5">
              {avgSugar} <span className="text-[10px] font-normal text-[#86868B]">g/100g</span>
            </p>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#F5F5F7]/80 border border-[#E5E6E9]/60">
            <div className="flex items-center gap-1 text-[11px] text-[#6E6E73]">
              <Droplets className="w-3 h-3 text-emerald-500" />
              <span>维C含量</span>
            </div>
            <p className="text-base font-bold text-[#111111] mt-0.5">
              {totalVitaminC} <span className="text-[10px] font-normal text-[#86868B]">mg</span>
            </p>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#F5F5F7]/80 border border-[#E5E6E9]/60">
            <div className="flex items-center gap-1 text-[11px] text-[#6E6E73]">
              <Activity className="w-3 h-3 text-indigo-500" />
              <span>膳食纤维</span>
            </div>
            <p className="text-base font-bold text-[#111111] mt-0.5">
              {totalFiber} <span className="text-[10px] font-normal text-[#86868B]">g</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
