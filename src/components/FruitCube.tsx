import React from 'react';
import { Fruit } from '../types/fruit';

interface FruitCubeProps {
  fruit: Fruit;
  size?: number; // size in px
  seed?: number; // deterministic seed for slight variations
  className?: string;
  onClick?: () => void;
  showEmoji?: boolean;
  depth?: number; // 0: base layer, 1: mid layer, 2: top mound layer
  rotation?: number; // small tilt angle for organic stacking
}

// Visual configuration for realistic fruit flesh skeuomorphic rendering
export interface CutFruitVisualSpec {
  fleshGradient: string;
  topFacetGradient: string;
  frontFacetGradient: string;
  sideFacetColor: string;
  fleshTextureType: 'apple' | 'watermelon' | 'mango' | 'strawberry' | 'kiwi' | 'pineapple' | 'peach' | 'grape' | 'cherry' | 'blueberry' | 'lychee' | 'mangosteen';
  rindColor?: string;
  rindBorderColor?: string;
  seedColor?: string;
  hasSeeds?: boolean;
  highlightColor: string;
  glowColor: string;
}

export const REALISTIC_FRUIT_SPECS: Record<string, CutFruitVisualSpec> = {
  // 🍎 苹果 (Fuji Apple): 乳黄微透苹果果肉，细微糖心纹理，单侧带鲜红脆硬果皮
  apple: {
    fleshGradient: 'from-[#FFFDE2] via-[#FFF9D2] to-[#F7E7B4]',
    topFacetGradient: 'from-[#FFFFEB] to-[#FFF6CB]',
    frontFacetGradient: 'from-[#FFF7CD] to-[#EEDAA0]',
    sideFacetColor: '#DEC68A',
    fleshTextureType: 'apple',
    rindColor: '#E63946',
    rindBorderColor: '#9C1A24',
    highlightColor: 'rgba(255, 255, 240, 0.9)',
    glowColor: 'rgba(255, 245, 190, 0.4)',
  },
  // 🍉 西瓜 (Crisp Watermelon): 鲜红多汁沙瓤颗粒感，饱满黑籽，外侧带有深翠绿西瓜皮与浅白青过渡
  watermelon: {
    fleshGradient: 'from-[#FF3352] via-[#FF1E40] to-[#E00E2F]',
    topFacetGradient: 'from-[#FF526D] to-[#FF2B49]',
    frontFacetGradient: 'from-[#FF2647] to-[#C90B27]',
    sideFacetColor: '#B0051F',
    fleshTextureType: 'watermelon',
    hasSeeds: true,
    seedColor: '#1A1110',
    rindColor: '#1E7B46',
    rindBorderColor: '#114B29',
    highlightColor: 'rgba(255, 215, 225, 0.85)',
    glowColor: 'rgba(255, 30, 60, 0.6)',
  },
  // 🥭 芒果 (Honey Mango): 浓郁熟黄热带橙芒，多汁滑润微反光，纤维感与软糯果肉
  mango: {
    fleshGradient: 'from-[#FFB703] via-[#FB8500] to-[#E85D04]',
    topFacetGradient: 'from-[#FFC933] to-[#FFA200]',
    frontFacetGradient: 'from-[#FB8500] to-[#D95204]',
    sideFacetColor: '#BD4100',
    fleshTextureType: 'mango',
    highlightColor: 'rgba(255, 245, 180, 0.95)',
    glowColor: 'rgba(251, 133, 0, 0.65)',
  },
  // 🍓 草莓 (Sweet Strawberry): 鲜红微粉果肉，表层嵌入金黄小草莓籽，多汁爆裂
  strawberry: {
    fleshGradient: 'from-[#FF3366] via-[#FF1E56] to-[#D60E43]',
    topFacetGradient: 'from-[#FF5782] to-[#FF2D60]',
    frontFacetGradient: 'from-[#FF245B] to-[#BE0B3B]',
    sideFacetColor: '#9C052E',
    fleshTextureType: 'strawberry',
    hasSeeds: true,
    seedColor: '#FFE57F',
    highlightColor: 'rgba(255, 195, 210, 0.9)',
    glowColor: 'rgba(255, 30, 86, 0.6)',
  },
  // 🍍 菠萝 (Golden Pineapple): 金钻凤梨亮黄，特有菱形果肉纹路，纤维脆爽
  pineapple: {
    fleshGradient: 'from-[#FFE066] via-[#FFD000] to-[#F4A261]',
    topFacetGradient: 'from-[#FFF099] to-[#FFD83B]',
    frontFacetGradient: 'from-[#FFD000] to-[#E0902B]',
    sideFacetColor: '#C47717',
    fleshTextureType: 'pineapple',
    highlightColor: 'rgba(255, 255, 220, 0.95)',
    glowColor: 'rgba(255, 208, 0, 0.55)',
  },
  // 🥝 猕猴桃 (Golden Kiwi): 翠绿金黄半透明，环形黑籽，侧边带绒毛褐皮
  kiwi: {
    fleshGradient: 'from-[#95D564] via-[#7CB518] to-[#598313]',
    topFacetGradient: 'from-[#B7E484] to-[#8CB369]',
    frontFacetGradient: 'from-[#7CB518] to-[#4F780F]',
    sideFacetColor: '#41630A',
    fleshTextureType: 'kiwi',
    hasSeeds: true,
    seedColor: '#172217',
    rindColor: '#5C381E',
    rindBorderColor: '#3B2311',
    highlightColor: 'rgba(235, 255, 200, 0.9)',
    glowColor: 'rgba(124, 181, 24, 0.55)',
  },
  // 🍑 桃子 (Honey Peach): 嫩白微透粉红，渐变水蜜桃肉，温润柔滑
  peach: {
    fleshGradient: 'from-[#FFF2EE] via-[#FFD2C9] to-[#FFAAA6]',
    topFacetGradient: 'from-[#FFFFFF] to-[#FFE6E1]',
    frontFacetGradient: 'from-[#FFD2C9] to-[#F29490]',
    sideFacetColor: '#DF7D78',
    fleshTextureType: 'peach',
    rindColor: '#FF6B8B',
    rindBorderColor: '#D83E60',
    highlightColor: 'rgba(255, 255, 255, 0.95)',
    glowColor: 'rgba(255, 180, 190, 0.5)',
  },
  // 🍇 葡萄 (Shine Muscat): 阳光玫瑰青碧透明，如白玉翡翠，光泽爆汁
  grape: {
    fleshGradient: 'from-[#D2F5A6] via-[#B4EB6B] to-[#7BC836]',
    topFacetGradient: 'from-[#E6FACD] to-[#C7F288]',
    frontFacetGradient: 'from-[#B4EB6B] to-[#6EB82C]',
    sideFacetColor: '#599920',
    fleshTextureType: 'grape',
    highlightColor: 'rgba(255, 255, 255, 0.95)',
    glowColor: 'rgba(180, 235, 107, 0.65)',
  },
  // 🍒 樱桃 (Ruby Cherry): 深邃暗红如红宝石，浓郁浆果光泽，紧实饱满
  cherry: {
    fleshGradient: 'from-[#9B111E] via-[#7B0D18] to-[#540208]',
    topFacetGradient: 'from-[#C41C2C] to-[#9B111E]',
    frontFacetGradient: 'from-[#7B0D18] to-[#450207]',
    sideFacetColor: '#330004',
    fleshTextureType: 'cherry',
    highlightColor: 'rgba(255, 180, 190, 0.85)',
    glowColor: 'rgba(155, 17, 30, 0.7)',
  },
  // 🫐 蓝莓 (Wild Blueberry): 深紫青蓝果肉，果粉雾霜与浓郁花青素
  blueberry: {
    fleshGradient: 'from-[#4F46E5] via-[#3730A3] to-[#201B6B]',
    topFacetGradient: 'from-[#818CF8] to-[#4F46E5]',
    frontFacetGradient: 'from-[#3730A3] to-[#1E1B4B]',
    sideFacetColor: '#151336',
    fleshTextureType: 'blueberry',
    highlightColor: 'rgba(210, 225, 255, 0.8)',
    glowColor: 'rgba(79, 70, 229, 0.6)',
  },
  // 🍈 荔枝 (Feizixiao Lychee): 白玉凝脂半透明果肉，晶莹剔透，多汁清润
  lychee: {
    fleshGradient: 'from-[#FFFFFF] via-[#F8FAFC] to-[#DFE5ED]',
    topFacetGradient: 'from-[#FFFFFF] to-[#F1F5F9]',
    frontFacetGradient: 'from-[#F8FAFC] to-[#CBD5E1]',
    sideFacetColor: '#B0BDCC',
    fleshTextureType: 'lychee',
    rindColor: '#F48FB1',
    rindBorderColor: '#C2185B',
    highlightColor: 'rgba(255, 255, 255, 0.98)',
    glowColor: 'rgba(255, 255, 255, 0.75)',
  },
  // 🫐 山竹 (Royal Mangosteen): 洁白如雪蒜瓣果肉，深紫红厚外壳切口包边
  mangosteen: {
    fleshGradient: 'from-[#FFFFFF] via-[#FFFBFD] to-[#F2E6EB]',
    topFacetGradient: 'from-[#FFFFFF] to-[#FAF2F5]',
    frontFacetGradient: 'from-[#FFFBFD] to-[#E3D1D8]',
    sideFacetColor: '#CBB5BE',
    fleshTextureType: 'mangosteen',
    rindColor: '#4A154B',
    rindBorderColor: '#2B082C',
    highlightColor: 'rgba(255, 255, 255, 0.98)',
    glowColor: 'rgba(255, 240, 248, 0.7)',
  },
};

export const FruitCube: React.FC<FruitCubeProps> = ({
  fruit,
  size = 46,
  seed = 0,
  className = '',
  onClick,
  showEmoji = false,
  depth = 0,
  rotation = 0,
}) => {
  const spec = REALISTIC_FRUIT_SPECS[fruit.id] || REALISTIC_FRUIT_SPECS.mango;

  // Stable pseudo-random generators for realistic natural variance
  const s1 = ((seed * 9301 + 49297) % 233280) / 233280;
  const s2 = ((seed * 49297 + 9301) % 233280) / 233280;
  const s3 = ((seed * 233280 + 1013) % 49297) / 49297;

  // Stacking elevation shadows based on depth
  const elevationShadow =
    depth === 2
      ? 'shadow-[0_10px_20px_rgba(0,0,0,0.32),0_3px_6px_rgba(0,0,0,0.2)]'
      : depth === 1
      ? 'shadow-[0_6px_14px_rgba(0,0,0,0.22),0_2px_4px_rgba(0,0,0,0.15)]'
      : 'shadow-[0_3px_8px_rgba(0,0,0,0.16)]';

  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer select-none transition-transform duration-200 active:scale-95 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `rotate(${rotation}deg)`,
      }}
      title={`${fruit.name} · 现切正方块 (${size}px)`}
    >
      {/* 3D Realistic Knife-Diced Isometric/Axonometric Cube */}
      <div
        className={`relative w-full h-full rounded-[8px] sm:rounded-[10px] overflow-hidden ${elevationShadow} transition-all duration-200 group-hover:scale-105 group-hover:z-30`}
        style={{
          perspective: '600px',
        }}
      >
        {/* Main Meat Body Flesh Layer */}
        <div className={`absolute inset-0 bg-gradient-to-br ${spec.fleshGradient}`} />

        {/* --- Skeuomorphic Fruit Texture Details --- */}
        {/* Watermelon: Crisp Granular Pulp Texture & Juicy Fibers */}
        {spec.fleshTextureType === 'watermelon' && (
          <div
            className="absolute inset-0 opacity-[0.25] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(#FFFFFF 0.8px, transparent 1px), radial-gradient(#990000 0.8px, transparent 1px)',
              backgroundSize: '4px 4px',
              backgroundPosition: '0 0, 2px 2px',
            }}
          />
        )}

        {/* Pineapple: Honeycomb Diamond Fibrous Cut Lines */}
        {spec.fleshTextureType === 'pineapple' && (
          <div
            className="absolute inset-0 opacity-[0.3] pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(200,120,0,0.4) 0px, transparent 1px, transparent 4px)',
            }}
          />
        )}

        {/* Mango & Peach: Translucent Soft Glow Wet Sheen */}
        {(spec.fleshTextureType === 'mango' || spec.fleshTextureType === 'peach') && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.75) 0%, transparent 60%)',
            }}
          />
        )}

        {/* Apple: Crisp Sugar-Heart Pale Center Grain */}
        {spec.fleshTextureType === 'apple' && (
          <div
            className="absolute inset-0 opacity-[0.35] pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(255,235,160,0.2) 65%, transparent 100%)',
            }}
          />
        )}

        {/* Grape & Lychee: Glassy Jelly Translucency with Core Refraction */}
        {(spec.fleshTextureType === 'grape' || spec.fleshTextureType === 'lychee') && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 40%, rgba(0,0,0,0.08) 100%)',
            }}
          />
        )}

        {/* --- 3D Bevel Facets (Top Face & Side Shadow Face of Square Cube) --- */}
        {/* Top Horizontal Cut Facet: Represents direct chef knife down-cut */}
        <div
          className="absolute top-0 left-0 right-0 h-[40%] rounded-t-[8px] pointer-events-none opacity-95"
          style={{
            background: `linear-gradient(135deg, ${spec.highlightColor} 0%, rgba(255,255,255,0.15) 100%)`,
            borderBottom: '1px solid rgba(255,255,255,0.4)',
          }}
        />

        {/* Right Vertical Cut Facet Shade: Gives strong cube thickness & depth */}
        <div
          className="absolute top-0 right-0 bottom-0 w-[32%] pointer-events-none"
          style={{
            background: `linear-gradient(to left, ${spec.sideFacetColor}44, transparent)`,
            borderLeft: '0.5px solid rgba(0,0,0,0.08)',
          }}
        />

        {/* Bottom Contact Shadow inside cube */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[28%] pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)',
          }}
        />

        {/* --- Authentic Fruit Peel / Rind Edge (on outer cut pieces) --- */}
        {spec.rindColor && (s1 > 0.35 || s2 > 0.4) && (
          <div
            className="absolute top-0 left-0 bottom-0 pointer-events-none shadow-sm"
            style={{
              width: `${Math.max(3, size * 0.1)}px`,
              backgroundColor: spec.rindColor,
              borderRight: `1px solid ${spec.rindBorderColor || 'rgba(0,0,0,0.2)'}`,
              opacity: 0.95,
            }}
          />
        )}

        {/* --- Realistic Pips, Seeds & Core Details --- */}
        {/* Watermelon Black Crisp Seeds */}
        {spec.fleshTextureType === 'watermelon' && spec.hasSeeds && (
          <>
            <div
              className="absolute w-[3.5px] h-[6px] rounded-[50%_50%_35%_35%] rotate-20 shadow-xs pointer-events-none"
              style={{
                backgroundColor: spec.seedColor,
                top: `${28 + s1 * 22}%`,
                left: `${35 + s2 * 26}%`,
              }}
            />
            {size >= 36 && s3 > 0.4 && (
              <div
                className="absolute w-[2.5px] h-[4.5px] rounded-[50%_50%_35%_35%] -rotate-35 opacity-80 pointer-events-none"
                style={{
                  backgroundColor: spec.seedColor,
                  top: `${55 - s2 * 16}%`,
                  left: `${62 - s1 * 20}%`,
                }}
              />
            )}
          </>
        )}

        {/* Kiwi Ring of Tiny Seeds + Pale Core */}
        {spec.fleshTextureType === 'kiwi' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[45%] h-[45%] rounded-full bg-[#E2F79E]/85 blur-[0.8px]" />
            <div className="absolute w-[2px] h-[2.5px] rounded-full bg-[#121F12] -translate-x-2 -translate-y-1" />
            <div className="absolute w-[2px] h-[2.5px] rounded-full bg-[#121F12] translate-x-2 -translate-y-1.5" />
            <div className="absolute w-[2px] h-[2.5px] rounded-full bg-[#121F12] -translate-x-1.5 translate-y-1.8" />
            <div className="absolute w-[2px] h-[2.5px] rounded-full bg-[#121F12] translate-x-1.8 translate-y-1.5" />
          </div>
        )}

        {/* Strawberry Yellow Tiny Achenes (Seeds) */}
        {spec.fleshTextureType === 'strawberry' && (
          <>
            <div
              className="absolute w-[2px] h-[3px] rounded-full shadow-xs pointer-events-none"
              style={{
                backgroundColor: spec.seedColor,
                top: '26%',
                left: '28%',
              }}
            />
            <div
              className="absolute w-[2px] h-[3px] rounded-full shadow-xs pointer-events-none"
              style={{
                backgroundColor: spec.seedColor,
                top: '58%',
                left: '65%',
              }}
            />
            <div
              className="absolute w-[2px] h-[3px] rounded-full shadow-xs pointer-events-none"
              style={{
                backgroundColor: spec.seedColor,
                top: '40%',
                left: '68%',
              }}
            />
            {size >= 38 && (
              <div
                className="absolute w-[1.8px] h-[2.5px] rounded-full opacity-75 pointer-events-none"
                style={{
                  backgroundColor: spec.seedColor,
                  top: '68%',
                  left: '30%',
                }}
              />
            )}
          </>
        )}

        {/* Specular Wet Juice Droplet Reflection on upper left */}
        <div
          className="absolute top-1.5 left-2 w-2 h-1.5 rounded-full pointer-events-none shadow-[0_0_3px_white]"
          style={{
            background: 'linear-gradient(to bottom right, rgba(255,255,255,0.95), rgba(255,255,255,0.2))',
          }}
        />

        {/* Micro Dewdrop Sparkle */}
        <div className="absolute top-2.5 right-2 w-1 h-1 rounded-full bg-white/90 shadow-[0_0_2px_white] pointer-events-none" />

        {/* Outer 1px Knife-Cut Crisp Bevel Rim */}
        <div className="absolute inset-0 rounded-[8px] sm:rounded-[10px] pointer-events-none border border-white/40 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.7),inset_0_-1px_2px_rgba(0,0,0,0.25)]" />

        {/* Optional Mini Emoji Watermark */}
        {showEmoji && (
          <div className="absolute bottom-1 right-1 text-xs opacity-75 drop-shadow-sm select-none pointer-events-none">
            {fruit.emoji}
          </div>
        )}
      </div>

      {/* Fresh fruit name tooltip badge on hover with taste profile */}
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-[#111111]/95 text-white text-[10px] font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40 shadow-lg border border-white/10 flex items-center gap-1">
        <span>{fruit.emoji}</span>
        <span>{fruit.name}鲜切块</span>
      </div>
    </div>
  );
};
