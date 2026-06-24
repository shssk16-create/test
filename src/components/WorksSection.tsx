"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Globe, Cpu, Workflow, Star } from "lucide-react";

export function cleanCdnUrl(url: string, apiBase: string) {
  if (!url) return "";
  if (url.startsWith('/')) {
    return `${apiBase}${url}`;
  }
  if (url.includes('/api/media/download')) {
    try {
      const urlObj = new URL(url);
      const key = urlObj.searchParams.get('key');
      if (key) {
        return `${apiBase}/api/media/download?key=${encodeURIComponent(key)}`;
      }
    } catch (e) {
      console.warn("Failed to parse URL:", url);
    }
  }
  return url;
}

export interface CaseStudyProps {
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  category: string[];
  accentColor: string;
  thumbIcon: string;
  problem_ar: string;
  problem_en: string;
  decision_ar: string;
  decision_en: string;
  result_ar: string;
  result_en: string;
  stack: string[];
  year: string;
  featured?: boolean;
  logo?: string;
  image?: string;
  link?: string;
  isDark?: boolean;
  isAr?: boolean;
  owner?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  Globe,
  Cpu,
  Workflow,
  Star,
};

export function CaseStudyCard({
  title_ar,
  title_en,
  subtitle_ar,
  subtitle_en,
  category,
  accentColor,
  thumbIcon,
  problem_ar,
  problem_en,
  decision_ar,
  decision_en,
  result_ar,
  result_en,
  stack,
  year,
  featured,
  logo,
  image,
  link,
  isDark,
  isAr,
  owner = 'salmeen',
}: CaseStudyProps) {
  const title = isAr ? title_ar : title_en;
  const subtitle = isAr ? subtitle_ar : subtitle_en;
  const problem = isAr ? problem_ar : problem_en;
  const decision = isAr ? decision_ar : decision_en;
  const result = isAr ? result_ar : result_en;
  const IconComponent = iconMap[thumbIcon] || Sparkles;
  const backImage = image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
  const isAmal = owner === 'amal';

  return (
    <div className="w-full h-full [perspective:1500px] group/card cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]">
        
        {/* --- FRONT SIDE: Case Study Text --- */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] z-20">
          <div
            className={`flex flex-col h-full backdrop-blur-md rounded-3xl overflow-visible transition-all duration-500 select-none border active:scale-[0.98] ${
              isDark 
                ? (isAmal ? 'bg-[#2C3947]/90 border-white/5 text-[#E8EDF2] hover:border-[#C2A56D]/50 shadow-[0_8px_30px_rgba(0,0,0,0.2)]' : 'bg-[#0a0c10]/80 border-white/5 text-white hover:border-[#A1824A]/50 shadow-[0_8px_30px_rgba(0,0,0,0.2)]') 
                : (isAmal ? 'bg-white border-[#547A95]/20 text-[#2C3947] shadow-sm hover:border-[#C2A56D]/50' : 'bg-white border-stone-200 text-[#15110E] shadow-sm hover:border-[#A1824A]/50')
            }`}
          >
            {featured ? (
              // Split-screen featured layout (2/5 branding, 3/5 vertical timeline)
              <div className="flex flex-col md:flex-row h-full w-full overflow-visible">
                {/* Left side: branding & info (2/5) */}
                <div 
                  className={`w-full md:w-2/5 flex flex-col justify-between p-6 border-b md:border-b-0 ${isAr ? 'md:border-l' : 'md:border-r'} shrink-0 relative`}
                  style={{
                    borderColor: isDark ? (isAmal ? 'rgba(84,122,149,0.2)' : 'rgba(255,255,255,0.05)') : (isAmal ? 'rgba(84,122,149,0.1)' : 'rgba(21,17,14,0.08)'),
                    background: isDark 
                      ? `radial-gradient(circle at top left, ${accentColor}15 0%, ${isAmal ? '#2C3947' : '#0a0c10'} 100%)` 
                      : `radial-gradient(circle at top left, ${accentColor}08 0%, ${isAmal ? '#E8EDF2' : '#ffffff'} 100%)`
                  }}
                >
                  {/* Subtle background image preview for featured visual richness */}
                  {image && (
                    <div 
                      className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 opacity-[0.05] group-hover/card:opacity-[0.12] transition-opacity duration-700 pointer-events-none" 
                      style={{ backgroundImage: `url('${backImage}')` }}
                    />
                  )}
                  
                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex justify-between items-start">
                      {logo ? (
                        <img
                          src={logo}
                          alt={title}
                          className={`h-9 md:h-11 max-w-[130px] object-contain ${
                            isDark ? 'filter brightness-0 invert opacity-95' : (isAmal ? 'opacity-95' : 'filter brightness-0 opacity-70')
                          }`}
                        />
                      ) : (
                        <IconComponent size={28} className={isDark ? 'text-white' : (isAmal ? 'text-[#C2A56D]' : 'text-[#8c6d32]')} />
                      )}
                      
                      <div className={`flex items-center gap-1 px-2.5 py-0.5 ${isAmal ? 'bg-[#C2A56D]' : 'bg-[#A1824A]'} text-black text-[8px] font-black rounded-full border border-yellow-300/20 shadow-md`}>
                        <Star size={8} className="fill-current text-black animate-pulse" />
                        <span>{isAr ? 'مميز' : 'FEATURED'}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1" dir="ltr">
                      {category.map((cat) => (
                        <span
                          key={cat}
                          className={`px-1.5 py-0.5 text-[7px] font-black rounded-full border uppercase tracking-wider ${
                            isDark 
                              ? (isAmal ? 'bg-[#C2A56D]/15 text-[#C2A56D] border-[#C2A56D]/25' : 'bg-[#A1824A]/10 text-[#A1824A] border-[#A1824A]/25') 
                              : (isAmal ? 'bg-[#C2A56D]/10 text-[#C2A56D] border-[#C2A56D]/30' : 'bg-[#A1824A]/5 text-[#8c6d32] border-[#A1824A]/30')
                          }`}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <div className={isAr ? 'text-right' : 'text-left'}>
                      <h3 className={`text-base md:text-lg font-bold leading-[1.7] pb-[0.15em] pt-[0.1em] ${isDark ? 'text-white' : (isAmal ? 'text-[#2C3947]' : 'text-[#15110E]')}`}>
                        {title}
                      </h3>
                      <p className={`text-[10px] leading-[1.75] font-sans mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`} dir="ltr">
                        {subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-dashed mt-6 relative z-10" style={{ borderColor: isDark ? (isAmal ? 'rgba(84,122,149,0.2)' : 'rgba(255,255,255,0.05)') : (isAmal ? 'rgba(84,122,149,0.1)' : 'rgba(21,17,14,0.08)') }}>
                    <div className="flex flex-wrap gap-1" dir="ltr">
                      {stack.slice(0, 4).map((item) => (
                        <span key={item} className={`px-1.5 py-0.5 text-[8px] font-bold rounded border ${isDark ? (isAmal ? 'bg-[#1e2731] text-[#E8EDF2]/80 border-white/5' : 'bg-black/40 text-stone-400 border-white/5') : (isAmal ? 'bg-white text-[#2C3947] border-[#547A95]/30' : 'bg-stone-100 text-stone-600 border-stone-200')}`}>{item}</span>
                      ))}
                    </div>
                    <span className={`text-[9px] font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-stone-400'}`} dir="ltr">{year}</span>
                  </div>
                </div>

                {/* Right side: Problem, Decision, Result journey timeline (3/5) */}
                <div className="w-full md:w-3/5 flex flex-col justify-between p-6 overflow-y-auto overflow-x-visible">
                  <div className="flex flex-col gap-4 justify-center flex-grow font-sans pr-1 scrollbar-thin">
                    <div className={`relative ${isAr ? 'pr-5 border-r' : 'pl-5 border-l'} ${isAmal ? 'border-[#547A95]/30' : 'border-stone-200/40 dark:border-white/5'} space-y-4`}>
                      <div className="relative">
                        <span className={`absolute ${isAr ? '-right-[29px]' : '-left-[29px]'} top-0.5 w-[16px] h-[16px] rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-[8px]`}>🔴</span>
                        <h4 className={`text-[9.5px] font-black uppercase tracking-wider ${isDark ? 'text-rose-400' : 'text-rose-700'} ${isAr ? 'text-right' : 'text-left'}`}>
                          {isAr ? 'التحدي والمشكلة' : 'Challenge & Problem'}
                        </h4>
                        <p className={`text-[10.5px] leading-[1.8] mt-1 ${isDark ? 'text-stone-300' : 'text-stone-700'} ${isAr ? 'text-right' : 'text-left'}`}>{problem}</p>
                      </div>

                      <div className="relative">
                        <span className={`absolute ${isAr ? '-right-[29px]' : '-left-[29px]'} top-0.5 w-[16px] h-[16px] rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[8px]`}>🟡</span>
                        <h4 className={`text-[9.5px] font-black uppercase tracking-wider ${isDark ? 'text-amber-400' : 'text-amber-700'} ${isAr ? 'text-right' : 'text-left'}`}>
                          {isAr ? 'القرار والحل التقني' : 'Decision & Solution'}
                        </h4>
                        <p className={`text-[10.5px] leading-[1.8] mt-1 ${isDark ? 'text-stone-300' : 'text-stone-700'} ${isAr ? 'text-right' : 'text-left'}`}>{decision}</p>
                      </div>

                      <div className="relative">
                        <span className={`absolute ${isAr ? '-right-[29px]' : '-left-[29px]'} top-0.5 w-[16px] h-[16px] rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[8px]`}>🟢</span>
                        <h4 className={`text-[9.5px] font-black uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-700'} ${isAr ? 'text-right' : 'text-left'}`}>
                          {isAr ? 'الأثر والنتائج' : 'Impact & Results'}
                        </h4>
                        <p className={`text-[10.5px] leading-[1.8] mt-1 ${isDark ? 'text-emerald-400' : 'text-emerald-800'} font-bold ${isAr ? 'text-right' : 'text-left'}`}>{result}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-[9px] text-stone-500 dark:text-stone-400 text-center mt-4 pt-3 border-t border-dashed" style={{ borderColor: isDark ? (isAmal ? 'rgba(84,122,149,0.2)' : 'rgba(255,255,255,0.05)') : (isAmal ? 'rgba(84,122,149,0.1)' : 'rgba(21,17,14,0.08)') }}>
                    {isAr ? '🫵 مرر الفأرة فوق البطاقة لعرض صورة المشروع الحية' : '🫵 Hover card to reveal live project screenshot'}
                  </div>
                </div>
              </div>
            ) : (
              // Standard vertical layout for standard items
              <>
                {/* 1. Card Header/Thumb */}
                <div
                  className="relative flex items-center justify-center h-[110px] lg:h-[135px] w-full shrink-0 overflow-hidden border-b transition-all duration-500"
                  style={{ 
                    background: isDark 
                      ? `radial-gradient(circle at center, ${accentColor}25 0%, ${isAmal ? '#2C3947' : '#050505'} 100%)` 
                      : `radial-gradient(circle at center, ${accentColor}15 0%, ${isAmal ? '#E8EDF2' : '#F9F8F6'} 100%)`,
                    borderColor: isDark ? (isAmal ? 'rgba(84,122,149,0.2)' : 'rgba(255,255,255,0.05)') : (isAmal ? 'rgba(84,122,149,0.1)' : 'rgba(21,17,14,0.08)')
                  }}
                >
                  {/* Dimmed, blurred background screenshot preview for visual variety (anti-slop rule) */}
                  {image && (
                    <div 
                      className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 opacity-[0.10] group-hover/card:opacity-[0.25] group-hover/card:scale-110 filter blur-[1px]" 
                      style={{ backgroundImage: `url('${backImage}')` }}
                    />
                  )}

                  <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                  
                  {logo ? (
                    <img
                      src={logo}
                      alt={title}
                      className={`h-10 lg:h-12 max-w-[200px] object-contain transition-transform duration-500 group-hover/card:scale-105 relative z-10 ${
                        isDark ? 'filter brightness-0 invert opacity-95' : (isAmal ? 'opacity-95' : 'filter brightness-0 opacity-70')
                      }`}
                    />
                  ) : (
                    <IconComponent size={38} className={`drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] group-hover/card:scale-110 transition-transform duration-500 relative z-10 ${
                      isDark ? 'text-white' : (isAmal ? 'text-[#C2A56D]' : 'text-[#8c6d32]')
                    }`} />
                  )}
                  
                  {featured && (
                    <div
                      className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 ${isAmal ? 'bg-[#C2A56D]' : 'bg-[#A1824A]'} text-black text-[9px] font-black rounded-full border border-yellow-300/20 shadow-md tracking-wider z-10`}
                      dir={isAr ? 'rtl' : 'ltr'}
                    >
                      <Star size={9} className="fill-current text-black animate-pulse" />
                      <span>{isAr ? 'مميز' : 'FEATURED'}</span>
                    </div>
                  )}
                </div>

                {/* 2. Card Content Body */}
                <div className="flex flex-col flex-1 p-5 overflow-visible justify-between">
                  <div className="overflow-visible">
                    <div className="flex flex-wrap gap-1.5 mb-2.5" dir="ltr">
                      {category.map((cat) => (
                        <span
                          key={cat}
                          className={`px-2 py-0.5 text-[8px] font-black rounded-full border uppercase tracking-wider ${
                            isDark 
                              ? (isAmal ? 'bg-[#C2A56D]/15 text-[#C2A56D] border-[#C2A56D]/25' : 'bg-[#A1824A]/10 text-[#A1824A] border-[#A1824A]/25') 
                              : (isAmal ? 'bg-[#C2A56D]/10 text-[#C2A56D] border-[#C2A56D]/30' : 'bg-[#A1824A]/5 text-[#8c6d32] border-[#A1824A]/30')
                          }`}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <h3
                      className={`text-[15px] font-bold mb-1 leading-[1.7] pb-[0.15em] pt-[0.1em] transition-colors duration-300 ${
                        isDark ? 'text-white' : (isAmal ? 'text-[#2C3947]' : 'text-[#15110E]')
                      } ${isAr ? 'text-right' : 'text-left'}`}
                      dir={isAr ? 'rtl' : 'ltr'}
                    >
                      {title}
                    </h3>

                    <p className={`text-[10px] mb-3 leading-[1.75] font-sans ${
                      isDark ? 'text-stone-400' : 'text-stone-600'
                    } ${isAr ? 'text-right' : 'text-left'}`} dir="ltr">
                      {subtitle}
                    </p>

                    <div className={`h-px w-full mb-3 ${isDark ? 'bg-white/5' : (isAmal ? 'bg-[#547A95]/20' : 'bg-stone-200')}`} />

                    {/* Chronological Vertical Timeline for standard card details */}
                    <div className={`flex flex-col gap-3 text-[11px] leading-[1.8] mb-4 overflow-y-auto overflow-x-visible font-sans pr-1 scrollbar-thin ${
                      isDark ? 'text-stone-300' : 'text-stone-700'
                    }`}>
                      <div className={`relative ${isAr ? 'pr-4 border-r' : 'pl-4 border-l'} ${isAmal ? 'border-[#547A95]/30' : 'border-stone-200/40 dark:border-white/5'} space-y-3`}>
                        <div dir={isAr ? 'rtl' : 'ltr'} className={isAr ? 'text-right' : 'text-left'}>
                          <div className="flex items-center gap-1.5 justify-start">
                            <span className="text-[7.5px] -mt-0.5">🔴</span>
                            <span className={`text-[8.5px] font-black uppercase tracking-wider ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
                              {isAr ? 'المشكلة' : 'Problem'}
                            </span>
                          </div>
                          <p className={`mt-0.5 text-[10px] leading-[1.8] ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>{problem}</p>
                        </div>

                        <div dir={isAr ? 'rtl' : 'ltr'} className={isAr ? 'text-right' : 'text-left'}>
                          <div className="flex items-center gap-1.5 justify-start">
                            <span className="text-[7.5px] -mt-0.5">🟡</span>
                            <span className={`text-[8.5px] font-black uppercase tracking-wider ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                              {isAr ? 'القرار' : 'Decision'}
                            </span>
                          </div>
                          <p className={`mt-0.5 text-[10px] leading-[1.8] ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>{decision}</p>
                        </div>

                        <div dir={isAr ? 'rtl' : 'ltr'} className={isAr ? 'text-right' : 'text-left'}>
                          <div className="flex items-center gap-1.5 justify-start">
                            <span className="text-[7.5px] -mt-0.5">🟢</span>
                            <span className={`text-[8.5px] font-black uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                              {isAr ? 'النتيجة' : 'Result'}
                            </span>
                          </div>
                          <p className={`mt-0.5 text-[10px] leading-[1.8] ${isDark ? 'text-emerald-400' : 'text-emerald-800'} font-bold`}>{result}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Footer */}
                  <div className={`flex justify-between items-center pt-3 border-t ${
                    isDark ? 'border-white/5' : 'border-stone-200'
                  }`}>
                    <div className="flex flex-wrap gap-1" dir="ltr">
                      {stack.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className={`px-1.5 py-0.5 text-[8px] font-bold rounded border ${
                            isDark 
                              ? (isAmal ? 'bg-[#1e2731] text-[#E8EDF2]/80 border-white/5' : 'bg-black/40 text-stone-400 border-white/5') 
                              : (isAmal ? 'bg-white text-[#2C3947] border-[#547A95]/30' : 'bg-stone-100 text-stone-600 border-stone-200')
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                      {stack.length > 3 && (
                        <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded border ${isDark ? 'bg-black/20 text-stone-500 border-white/5' : 'bg-stone-50 text-stone-400 border-stone-100'}`}>+{stack.length - 3}</span>
                      )}
                    </div>
                    <span className={`text-[9px] font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-stone-400'}`} dir="ltr">
                      {year}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* --- BACK SIDE: Project Screenshot Flip --- */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] z-10">
          <div
            className={`flex flex-col h-full rounded-3xl overflow-visible border relative justify-end p-6 transition-all duration-500 active:scale-[0.98] ${
              isDark ? 'border-white/5 shadow-2xl' : 'border-stone-200 shadow-xl'
            }`}
            style={{
              backgroundImage: `url('${backImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Premium gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-b ${isAmal ? 'from-[#C2A56D]/25' : 'from-[#A1824A]/25'} via-black/70 to-black/95 z-0`}></div>

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15">
                  {logo ? (
                    <img src={logo} alt="client logo" className="max-h-[60%] max-w-[80%] object-contain filter brightness-0 invert" />
                  ) : (
                    <IconComponent size={16} className="text-white" />
                  )}
                </div>
                {featured && (
                  <span className={`px-2.5 py-0.5 ${isAmal ? 'bg-[#C2A56D]' : 'bg-[#A1824A]'} text-black text-[8px] font-black rounded-full border border-yellow-300/20 shadow-md`}>
                    {isAr ? 'مشروع مميز' : 'FEATURED WORK'}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-white font-black text-lg leading-[1.7] pb-[0.15em]">
                  {title}
                </h3>
                <p className="text-stone-300 text-xs font-sans mt-1" dir="ltr">
                  {subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-stone-400 text-[10px] font-black uppercase tracking-wider">{isAr ? 'تصفح المشروع' : 'EXPLORE'}</span>
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-4 py-2 ${isAmal ? 'bg-[#C2A56D] hover:bg-[#b39158] shadow-[0_0_15px_rgba(194,165,109,0.3)]' : 'bg-[#A1824A] hover:bg-yellow-600 shadow-[0_0_15px_rgba(161,130,74,0.3)]'} text-black text-[10px] font-black rounded-full hover:scale-105 active:scale-95 transition-all`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{isAr ? 'زيارة الموقع' : 'Visit Site'}</span>
                    <Globe size={11} />
                  </a>
                ) : (
                  <span className="text-white/40 text-[9px] font-bold italic">{isAr ? 'منصة داخلية مغلقة' : 'Internal platform'}</span>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function WorksSection({ owner = 'salmeen' }: { owner?: string }) {
  const [cardsData, setCardsData] = useState<CaseStudyProps[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [mounted, setMounted] = useState(false);

  const filterOptions = ["All", ...Array.from(new Set(cardsData.flatMap(c => c.category || []).filter(Boolean)))];

  const seedData: CaseStudyProps[] = [
    {
      title_ar: "هلا AI — منصة توليد محتوى تسويقي بلهجة سعودية",
      title_en: "Hala AI — Saudi dialect marketing content generation platform",
      subtitle_ar: "منصة سحابية متكاملة لإنتاج المحتوى التسويقي بلهجة بيضاء",
      subtitle_en: "SaaS White-Dialect Content Generator",
      category: ["SaaS", "AI & Automation"],
      accentColor: "#58A8B4",
      thumbIcon: "Sparkles",
      problem_ar: "كان تجار التجارة الإلكترونية السعوديون على سلة وزد يكتبون المحتوى العربي يدويًا دون أدوات ذكاء اصطناعي تفهم اللهجات المحلية.",
      problem_en: "Saudi e-commerce merchants on Salla and Zid wrote all Arabic content manually with no dialect-aware AI tool.",
      decision_ar: "تصميم وبناء نظام SaaS سحابي متكامل باستخدام نموذج ALLaM-2 لتوليد اللهجة السعودية البيضاء وربطه مع تطبيق واتساب للأعمال.",
      decision_en: "Designed and built a Cloudflare-native middleware SaaS using ALLaM-2 for Saudi white-dialect generation and WhatsApp Business API for merchant delivery.",
      result_ar: "تسليم بنية إنتاجية كاملة جاهزة للعمل — الحوسبة السحابية الطرفية وقاعدة البيانات D1 ومخزن R2 والقطع البرمجية الدائمة وقبول التطبيق في متجر سلة.",
      result_en: "Full production architecture delivered — Workers, D1, R2, Durable Objects, Salla app submission-ready.",
      stack: ["Cloudflare Workers", "D1", "ALLaM-2", "Hono.js"],
      year: "2024",
      featured: true,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      link: "https://salla.sa",
    },
    {
      title_ar: "أورا للتسويق — وكالة تسويق رقمي متكاملة",
      title_en: "Aura Marketing — Full-Service Digital Agency",
      subtitle_ar: "وكالة تسويق رقمي متكاملة الخدمات",
      subtitle_en: "Full-Service Digital Marketing Agency",
      category: ["Agency"],
      accentColor: "#438FB3",
      thumbIcon: "Globe",
      problem_ar: "تفتقر الشركات الصغيرة والمتوسطة في المنطقة الغربية بالمملكة العربية السعودية إلى حلول تسويقية رقمية احترافية وبأسعار مناسبة.",
      problem_en: "SMBs in Saudi Arabia's Western Region lacked affordable, professional digital presence.",
      decision_ar: "تأسيس وتشغيل وكالة تسويق رقمي متكاملة تجمع بين هندسة اللغويات العربية والتطوير البرمجي الشامل للمنصات الرقمية.",
      decision_en: "Founded and operated a full-service digital agency combining Arabic linguistics expertise with full-stack development.",
      result_ar: "أكثر من 15 عميلًا نشطًا بما في ذلك أساس القابضة ومحطات درب، والعمل مستمر بنجاح منذ عام 2020.",
      result_en: "15+ active clients including Asas Holding and Darb Stations, operating since 2020.",
      stack: ["Next.js", "Laravel", "SEO", "Schema Markup"],
      year: "2020",
      logo: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      link: "https://aurateam3.com",
    },
    {
      title_ar: "أورا AI استوديو — منصة أدوات الذكاء الاصطناعي المغلقة",
      title_en: "Aura AI Studio — Multi-Agent Closed-Beta SaaS",
      subtitle_ar: "منصة متعددة الوكلاء في مرحلة البيتا المغلقة",
      subtitle_en: "Multi-Agent Closed-Beta SaaS",
      category: ["SaaS", "AI & Automation"],
      accentColor: "#3C3489",
      thumbIcon: "Cpu",
      problem_ar: "احتاج فريق الوكالة المكون من 50 عضوًا إلى أدوات ذكاء اصطناعي مخصصة لسير العمل التسويقي دون توفر حلول تجارية جاهزة ومناسبة.",
      problem_en: "A 50-member agency cohort needed specialized AI tools for marketing workflows with no suitable off-the-shelf solution.",
      decision_ar: "بناء منصة بيتا مغلقة تعتمد على معمارية متعددة الوكلاء الذكية على بنية NVIDIA NIM مع توزيع النماذج ديناميكيًا حسب الدور وصلاحيات الوصول.",
      decision_en: "Architected an 8-agent closed-beta SaaS on NVIDIA NIM with role-based access and per-agent model routing.",
      result_ar: "إطلاق ناجح للنسخة التجريبية المغلقة — باستخدام Next.js 15 وقاعدة بيانات Supabase وتقنيات Cloudflare ونموذج Llama 3.3 70B.",
      result_en: "Successful closed beta — Next.js 15, Supabase, Cloudflare Pages, Llama 3.3 70B.",
      stack: ["Next.js 15", "Supabase", "NVIDIA NIM", "Cloudflare"],
      year: "2024",
      logo: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      link: "https://aurateam3.com",
    },
    {
      title_ar: "أتمتة العمليات التسويقية — محركات ونصوص ونماذج ذكية",
      title_en: "Marketing Automation — Automated Content Pipelines",
      subtitle_ar: "أتمتة خطوط إنتاج وتوزيع المحتوى",
      subtitle_en: "Automated Content Pipelines",
      category: ["AI & Automation", "Agency"],
      accentColor: "#633806",
      thumbIcon: "Workflow",
      problem_ar: "كان فريق الوكالة يقضي ساعات طويلة يدويًا في إنتاج وجدولة المحتوى لعشرات الحسابات أسبوعيًا.",
      problem_en: "Agency team spent hours manually producing and scheduling content for dozens of clients every week.",
      decision_ar: "تطوير مسارات أتمتة عبر منصة n8n تربط نماذج Groq وGemini وDeepSeek مع إرسال الإشعارات عبر Telegram Bot والتتبع في Google Sheets.",
      decision_en: "Built multi-model n8n workflows chaining Groq, Gemini, and DeepSeek with Telegram Bot delivery and Google Sheets tracking.",
      result_ar: "تقليل الوقت المستغرق في إنتاج وتجهيز المحتوى بنسبة 70% لجميع حسابات العملاء النشطة.",
      result_en: "Reduced content production time by 70% across all active client accounts.",
      stack: ["n8n", "Groq", "Gemini", "Telegram Bot"],
      year: "2023",
      logo: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      link: "https://darbstations.com.sa",
    },
  ];

  useEffect(() => {
    setMounted(true);
    const checkState = () => {
      const l = localStorage.getItem('sk_lang') as 'ar'|'en' || 'ar';
      const th = localStorage.getItem('sk_theme') as 'dark'|'light' || 'dark';
      setLang(l);
      setTheme(th);
    };
    checkState();
    window.addEventListener('lang-change', checkState);
    window.addEventListener('theme-change', checkState);
    const inv = setInterval(checkState, 500);
    return () => {
      window.removeEventListener('lang-change', checkState);
      window.removeEventListener('theme-change', checkState);
      clearInterval(inv);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    async function fetchProjects() {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
      try {
        const res = await fetch(`${apiBase}/api/projects?owner=${owner}`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const parsed = data.data.map((item: any) => {
            let cat: string[] = ["SaaS"];
            try {
              if (item.category) {
                cat = typeof item.category === 'string' ? JSON.parse(item.category) : item.category;
                if (!Array.isArray(cat)) cat = [cat];
              }
            } catch (e) {
              if (typeof item.category === 'string') {
                cat = item.category.split(',').map((s: string) => s.trim());
              }
            }

            let st: string[] = [];
            try {
              if (item.stack) {
                st = typeof item.stack === 'string' ? JSON.parse(item.stack) : item.stack;
                if (!Array.isArray(st)) st = [st];
              }
            } catch (e) {
              if (typeof item.stack === 'string') {
                st = item.stack.split(',').map((s: string) => s.trim());
              }
            }

            return {
              title_ar: item.title_ar || item.title || "",
              title_en: item.title_en || item.title || "",
              subtitle_ar: item.subtitle_ar || item.subtitle || "",
              subtitle_en: item.subtitle_en || item.subtitle || "",
              category: cat,
              accentColor: item.accentColor || "#58A8B4",
              thumbIcon: item.thumbIcon || "Sparkles",
              problem_ar: item.problem_ar || item.problem || "",
              problem_en: item.problem_en || item.problem || "",
              decision_ar: item.decision_ar || item.decision || "",
              decision_en: item.decision_en || item.decision || "",
              result_ar: item.result_ar || item.result || "",
              result_en: item.result_en || item.result || "",
              stack: st,
              year: item.year,
              featured: item.featured === 1 || item.featured === true,
              logo: cleanCdnUrl(item.logo, apiBase),
              image: cleanCdnUrl(item.image, apiBase),
              link: item.link || ""
            };
          });
          setCardsData(parsed);
        } else {
          setCardsData(owner === 'amal' ? [] : seedData);
        }
      } catch (err) {
        console.warn("CMS API is offline. Using fallback local project data.");
        setCardsData(owner === 'amal' ? [] : seedData);
      }
    }

    fetchProjects();
  }, [mounted]);

  // Filter cards and sort featured cards to the front
  const filteredCards = cardsData
    .filter((card) => activeFilter === "All" || card.category.includes(activeFilter))
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const isAmal = owner === 'amal';

  const getBentoClasses = (idx: number, total: number) => {
    if (total === 1) {
      return "col-span-1 min-h-[380px] md:min-h-[420px]";
    }
    if (total === 2) {
      return "col-span-1 min-h-[380px] md:min-h-[420px]";
    }
    if (total === 3) {
      if (idx === 0) return "md:col-span-2 min-h-[380px] md:min-h-[420px]";
      if (idx === 1) return "md:col-span-1 min-h-[380px] md:min-h-[420px]";
      return "md:col-span-3 min-h-[280px] md:min-h-[320px]";
    }
    if (idx === 0) return "md:col-span-2 md:row-span-1 min-h-[380px] md:min-h-[420px]";
    if (idx === 1) return "md:col-span-1 md:row-span-1 min-h-[380px] md:min-h-[420px]";
    if (idx === 2) return "md:col-span-1 md:row-span-1 min-h-[380px] md:min-h-[420px]";
    if (idx === 3) return "md:col-span-2 md:row-span-1 min-h-[380px] md:min-h-[420px]";
    
    const posInRow = idx % 4;
    if (posInRow === 0 || posInRow === 3) return "md:col-span-2 min-h-[380px] md:min-h-[420px]";
    return "md:col-span-1 min-h-[380px] md:min-h-[420px]";
  };

  if (!mounted) return null;

  return (
    <section
      id="works"
      className={`w-full py-12 sm:py-16 px-3 sm:px-4 md:px-8 relative overflow-hidden transition-colors duration-700 ${
        isDark 
          ? (isAmal ? 'bg-[#2C3947] text-[#E8EDF2]' : 'bg-[#050505] text-white') 
          : (isAmal ? 'bg-[#E8EDF2] text-[#2C3947]' : 'bg-[#F9F8F6] text-[#15110E]')
      } ${isAr ? 'font-alexandria' : 'font-sans'}`}
    >

      {/* Dynamic ambient gold glows */}
      <div className={`absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[500px] ${isAmal ? 'bg-[#C2A56D]/10' : 'bg-[#A1824A]/10'} blur-[120px] rounded-full pointer-events-none -z-10`} />
      <div className={`absolute bottom-10 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[500px] ${isAmal ? 'bg-[#C2A56D]/10' : 'bg-[#A1824A]/10'} blur-[120px] rounded-full pointer-events-none -z-10`} />

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center w-full gap-3">
          <div className={`inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 ${
            isDark 
              ? (isAmal ? 'bg-[#C2A56D]/10 border-[#C2A56D]/25' : 'bg-[#A1824A]/10 border-[#A1824A]/25') 
              : (isAmal ? 'bg-white border-[#C2A56D]/30 shadow-sm' : 'bg-white border-[#A1824A]/30 shadow-sm')
          } rounded-full border mb-2 text-[10px] md:text-xs font-black ${isAmal ? 'text-[#C2A56D]' : 'text-[#A1824A]'} uppercase tracking-widest`}>
            <Sparkles size={14} /> {isAr ? 'معرض الأعمال' : 'PORTFOLIO SHOWCASE'}
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-6xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-b ${
            isDark ? 'from-white to-stone-400' : (isAmal ? 'from-[#2C3947] to-[#547A95]' : 'from-[#15110E] to-stone-500')
          } overflow-visible leading-[1.4] pb-[0.2em] pt-1`}>
            {isAr ? 'مشاريع متميزة.' : 'Selected Projects.'}
          </h1>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2.5 justify-center" dir={isAr ? 'rtl' : 'ltr'}>
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-black transition-all duration-300 active:scale-95 border ${
                activeFilter === option
                  ? (isAmal ? "bg-[#C2A56D] text-black border-[#C2A56D] shadow-[0_4px_20px_rgba(194,165,109,0.3)] scale-105" : "bg-[#A1824A] text-black border-[#A1824A] shadow-[0_4px_20px_rgba(161,130,74,0.3)] scale-105")
                  : (isDark 
                      ? "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                      : (isAmal ? "bg-white text-[#2C3947]/70 border-stone-200 hover:border-[#C2A56D] hover:text-[#2C3947]" : "bg-white text-stone-500 border-stone-200 hover:border-[#A1824A] hover:text-[#15110E]"))
              }`}
            >
              {option === "All" ? (isAr ? "الكل / All" : "All") : option}
            </button>
          ))}
        </div>

        {/* Responsive Bento Grid Layout */}
        <motion.div 
          layout 
          className={`grid gap-6 mt-4 ${
            filteredCards.length === 1 
              ? 'grid-cols-1 max-w-2xl mx-auto w-full' 
              : filteredCards.length === 2 
                ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto w-full' 
                : 'grid-cols-1 md:grid-cols-3 w-full'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, index) => (
              <motion.div
                key={card.title_en}
                layout
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={getBentoClasses(index, filteredCards.length)}
              >
                <CaseStudyCard {...card} isDark={isDark} isAr={isAr} owner={owner} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
