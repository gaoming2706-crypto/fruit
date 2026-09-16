import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';
import { ArrowLeft, Download, Copy, Check, Sparkles, Box, RefreshCw } from 'lucide-react';
import { FruitInBox, BoxType } from '../types/fruit';
import { ShareCard } from '../components/ShareCard';
import { Toast } from '../components/Toast';

interface ShareCardPageProps {
  fruits: FruitInBox[];
  boxType: BoxType;
  onBackToPack: () => void;
  onRestartAll: () => void;
}

export const ShareCardPage: React.FC<ShareCardPageProps> = ({
  fruits,
  boxType,
  onBackToPack,
  onRestartAll,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [cardTitle, setCardTitle] = useState('今日我的专属高光果盒');
  const [creatorName, setCreatorName] = useState('果盒鉴赏家');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((c) => (c === msg ? null : c));
    }, 2400);
  };

  // Xiaohongshu (RED) Copy Caption Template
  const generateRedBookCopy = () => {
    const fruitNames = fruits.map((f) => `#${f.fruit.name} ${f.fruit.emoji}`).join(' ');
    const totalCalories = fruits.reduce(
      (acc, f) => acc + (f.fruit.nutrition?.calories || 45),
      0
    );

    return `✨ 终于实现了水果自由拼！今日我的高光定制果盒 🎁\n\n` +
      `📦 拼配规格：${fruits.length} 拼随心自选\n` +
      `🥝 精选阵容：${fruitNames}\n` +
      `🔥 能量指标：仅约 ${totalCalories} kcal，自然纯果糖，低卡高维C！\n\n` +
      `水果颗颗饱满新鲜多汁，银色金属盒真空封装质感高级到哭，带去办公室/野餐被问爆了！\n\n` +
      `#FruitCut #水果自由拼 #减脂期吃什么 #健康轻食 #神仙水果拼盘 #高颜值果盒`;
  };

  const handleCopyRedBookText = async () => {
    try {
      const copyContent = generateRedBookCopy();
      await navigator.clipboard.writeText(copyContent);
      setCopiedText(true);
      showToast('小红书爆款文案已复制到剪贴板！');
      setTimeout(() => setCopiedText(false), 2500);
    } catch (err) {
      showToast('复制失败，请手动长按文本复制');
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current || isGenerating) return;
    setIsGenerating(true);
    showToast('正在导出高清小红书卡片...');

    try {
      // Generate PNG data URL from DOM node
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // 2x retina clarity
      });

      const link = document.createElement('a');
      link.download = `FruitCut-果盒分享卡-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      showToast('分享图片已成功下载！');
    } catch (error) {
      console.error('Image export failed:', error);
      showToast('图片渲染失败，请稍后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Top Header Row */}
      <div className="w-full flex items-center justify-between py-4">
        <button
          id="btn-share-back"
          onClick={onBackToPack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6E6E73] hover:text-[#111111] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>返回包装台</span>
        </button>

        <button
          id="btn-restart-flow"
          onClick={onRestartAll}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#D9DADD] text-xs font-medium text-[#111111] hover:bg-[#F5F5F7] transition-all cursor-pointer shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#6E6E73]" />
          <span>重新拼一盒</span>
        </button>
      </div>

      {/* Page Title & Subtitle */}
      <div className="py-4 sm:py-6 space-y-2 text-center max-w-md mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D9DADD]/60 text-[11px] font-medium text-[#6E6E73]">
          <span>Stage 9 · 小红书分享卡</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
          生成专属风味海报
        </h1>
        <p className="text-sm text-[#6E6E73]">
          可自定义卡片标题与署名，一键下载高清图与小红书打卡文案。
        </p>
      </div>

      {/* Main Grid: Card preview on left, customization controls & copy caption on right */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        
        {/* Left Column: Visual Share Card Render */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <ShareCard
            ref={cardRef}
            fruits={fruits}
            cardTitle={cardTitle}
            creatorName={creatorName}
          />
        </div>

        {/* Right Column: Customization & Export Controls */}
        <div className="lg:col-span-6 flex flex-col space-y-5">
          
          {/* Customization Inputs Card */}
          <div className="p-5 rounded-[28px] bg-white border border-[#D9DADD] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#111111]">海报信息定制</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#6E6E73]">果盒专属主题</label>
              <input
                id="input-card-title"
                type="text"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                maxLength={20}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F5F5F7] border border-[#E5E6E9] text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111]"
                placeholder="例如：春日微甜·高光果盒"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#6E6E73]">署名 / 昵称</label>
              <input
                id="input-creator-name"
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                maxLength={12}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F5F5F7] border border-[#E5E6E9] text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111]"
                placeholder="例如：小李吃不胖"
              />
            </div>
          </div>

          {/* Download & Copy Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              id="btn-download-card-png"
              onClick={handleDownloadImage}
              disabled={isGenerating}
              className="py-3.5 px-4 rounded-full bg-[#111111] text-white hover:bg-[#222222] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm font-medium cursor-pointer shadow-md disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? '正在渲染中...' : '下载高清卡片'}</span>
            </button>

            <button
              id="btn-copy-redbook-caption"
              onClick={handleCopyRedBookText}
              className="py-3.5 px-4 rounded-full bg-white border border-[#D9DADD] text-[#111111] hover:bg-[#F5F5F7] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm font-medium cursor-pointer shadow-sm"
            >
              {copiedText ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <span>已复制文案！</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#6E6E73]" />
                  <span>复制小红书文案</span>
                </>
              )}
            </button>
          </div>

          {/* Xiaohongshu Preview Textarea */}
          <div className="p-4 rounded-2xl bg-white/70 border border-[#D9DADD]/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#6E6E73]">
              <span>小红书文案预览</span>
              <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-medium">
                一键直发
              </span>
            </div>
            <p className="text-xs text-[#444446] whitespace-pre-line leading-relaxed font-sans bg-[#F9F9FB] p-3 rounded-xl border border-[#EBECEF]">
              {generateRedBookCopy()}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
