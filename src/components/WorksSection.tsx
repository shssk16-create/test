"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Globe, Cpu, Workflow, Star, ArrowUpRight } from "lucide-react";

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
  span?: 1 | 2 | 3;
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
  span = 1,
}: CaseStudyProps) {
  const title = isAr ? title_ar : title_en;
  const subtitle = isAr ? subtitle_ar : subtitle_en;
  const problem = isAr ? problem_ar : problem_en;
  const result = isAr ? result_ar : result_en;
  const IconComponent = iconMap[thumbIcon] || Sparkles;
  const backImage = image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
  const isAmal = owner === 'amal';

  // Tactile Micro-animation styling
  const cardBaseClasses = `group/card relative flex h-full rounded-[24px] overflow-hidden border transition-all duration-500 cursor-pointer select-none active:scale-[0.98] active:translate-y-[1px]`;
  
  const themeClasses = isDark 
    ? (isAmal 
        ? 'bg-[#2C3947]/90 border-white/5 text-[#E8EDF2] hover:border-[#C2A56D]/40 hover:shadow-[0_12px_40px_rgba(194,165,109,0.12)]' 
        : 'bg-[#0a0c10]/85 border-white/5 text-white hover:border-[#A1824A]/40 hover:shadow-[0_12px_40px_rgba(161,130,74,0.12)]') 
    : (isAmal 
        ? 'bg-white border-[#547A95]/20 text-[#2C3947] hover:border-[#C2A56D]/40 hover:shadow-[0_12px_30px_rgba(194,165,109,0.08)]' 
        : 'bg-white border-stone-200 text-[#15110E] hover:border-[#A1824A]/40 hover:shadow-[0_12px_30px_rgba(161,130,74,0.08)]');

  const containerBorderColor = isDark 
    ? (isAmal ? 'rgba(84,122,149,0.2)' : 'rgba(255,255,255,0.05)') 
    : (isAmal ? 'rgba(84,122,149,0.1)' : 'rgba(21,17,14,0.08)');

  const inlineBorderDashStyle = { borderColor: containerBorderColor };

  const handleCardClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  // Render different layouts based on column spans
  if (span === 3) {
    return (
      <div onClick={handleCardClick} className={`${cardBaseClasses} ${themeClasses} flex-col md:flex-row`}>
        {/* Ambient glow */}
        <div 
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12] pointer-events-none transition-opacity duration-500 group-hover/card:opacity-[0.16]"
          style={{ background: `radial-gradient(circle at 20% 30%, ${accentColor} 0%, transparent 100%)` }}
        />

        {/* Content Side */}
        <div className="w-full md:w-3/5 flex flex-col justify-between p-6 sm:p-7 relative z-10 border-b md:border-b-0 md:border-r" style={inlineBorderDashStyle}>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              {logo ? (
                <img
                  src={logo}
                  alt={title}
                  className={`h-7 md:h-8 max-w-[110px] object-contain ${
                    isDark ? 'filter brightness-0 invert opacity-95' : (isAmal ? 'opacity-95' : 'filter brightness-0 opacity-70')
                  }`}
                />
              ) : (
                <IconComponent size={22} className={isDark ? 'text-white' : (isAmal ? 'text-[#C2A56D]' : 'text-[#8c6d32]')} />
              )}
              
              {featured && (
                <div className={`flex items-center gap-1 px-2.5 py-0.5 ${isAmal ? 'bg-[#C2A56D]' : 'bg-[#A1824A]'} text-black text-[8px] font-black rounded-full shadow-sm`}>
                  <Star size={8} className="fill-current text-black animate-pulse" />
                  <span>{isAr ? 'مميز' : 'FEATURED'}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5" dir="ltr">
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

            <div className={isAr ? 'text-right' : 'text-left'}>
              <h3 className={`text-base md:text-xl font-black leading-[1.6] pb-[0.15em] pt-[0.1em] ${isDark ? 'text-white' : (isAmal ? 'text-[#2C3947]' : 'text-[#15110E]')}`}>
                {title}
              </h3>
              <p className={`text-[10px] sm:text-xs leading-[1.7] font-sans mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`} dir="ltr">
                {subtitle}
              </p>
            </div>

            {/* Structured visual journey list instead of emojis */}
            <div className="relative pt-3 border-t" style={inlineBorderDashStyle}>
              <div className={`relative ${isAr ? 'pr-4 border-r' : 'pl-4 border-l'} ${isAmal ? 'border-[#547A95]/30' : 'border-stone-200/40 dark:border-white/5'} space-y-3`}>
                <div dir={isAr ? 'rtl' : 'ltr'} className={isAr ? 'text-right' : 'text-left'}>
                  <div className="flex items-center gap-1.5 justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    <span className={`text-[8.5px] font-black uppercase tracking-wider ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
                      {isAr ? 'المشكلة والتحدي' : 'Problem'}
                    </span>
                  </div>
                  <p className={`mt-0.5 text-[10px] sm:text-[11px] leading-[1.7] ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>{problem}</p>
                </div>

                <div dir={isAr ? 'rtl' : 'ltr'} className={isAr ? 'text-right' : 'text-left'}>
                  <div className="flex items-center gap-1.5 justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className={`text-[8.5px] font-black uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      {isAr ? 'النتيجة والأثر' : 'Result & Impact'}
                    </span>
                  </div>
                  <p className={`mt-0.5 text-[10px] sm:text-[11px] leading-[1.7] ${isDark ? 'text-emerald-400' : 'text-emerald-800'} font-bold`}>{result}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-dashed mt-6" style={inlineBorderDashStyle}>
            <div className="flex flex-wrap gap-1" dir="ltr">
              {stack.map((item) => (
                <span key={item} className={`px-1.5 py-0.5 text-[8px] font-bold rounded border ${isDark ? (isAmal ? 'bg-[#1e2731] text-[#E8EDF2]/80 border-white/5' : 'bg-black/40 text-stone-400 border-white/5') : (isAmal ? 'bg-white text-[#2C3947] border-[#547A95]/30' : 'bg-stone-100 text-stone-600 border-stone-200')}`}>{item}</span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-stone-400'}`} dir="ltr">{year}</span>
              {link && <ArrowUpRight size={14} className={`opacity-50 group-hover/card:opacity-100 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all ${isAmal ? 'text-[#C2A56D]' : 'text-[#A1824A]'}`} />}
            </div>
          </div>
        </div>

        {/* Visual Mockup Side */}
        <div 
          className="w-full md:w-2/5 h-[220px] md:h-auto overflow-hidden relative flex items-center justify-center p-6 transition-colors duration-500"
          style={{
            background: isDark 
              ? `radial-gradient(circle at center, ${accentColor}25 0%, ${isAmal ? '#2C3947' : '#0a0c10'} 100%)` 
              : `radial-gradient(circle at center, ${accentColor}10 0%, ${isAmal ? '#E8EDF2' : '#ffffff'} 100%)`
          }}
        >
          {image ? (
            <div className="relative w-full h-full min-h-[160px] rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-500 group-hover/card:scale-[1.03] group-hover/card:shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
              <img src={backImage} alt={title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <IconComponent size={36} className={isDark ? 'text-white/30' : (isAmal ? 'text-[#C2A56D]' : 'text-[#8c6d32]')} />
          )}
        </div>
      </div>
    );
  }

  if (span === 2) {
    return (
      <div onClick={handleCardClick} className={`${cardBaseClasses} ${themeClasses} flex-col md:flex-row`}>
        {/* Ambient glow */}
        <div 
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12] pointer-events-none transition-opacity duration-500 group-hover/card:opacity-[0.16]"
          style={{ background: `radial-gradient(circle at 20% 30%, ${accentColor} 0%, transparent 100%)` }}
        />

        {/* Content Side */}
        <div className="w-full md:w-3/5 flex flex-col justify-between p-6 relative z-10 border-b md:border-b-0 md:border-r" style={inlineBorderDashStyle}>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              {logo ? (
                <img
                  src={logo}
                  alt={title}
                  className={`h-7 max-w-[100px] object-contain ${
                    isDark ? 'filter brightness-0 invert opacity-95' : (isAmal ? 'opacity-95' : 'filter brightness-0 opacity-70')
                  }`}
                />
              ) : (
                <IconComponent size={20} className={isDark ? 'text-white' : (isAmal ? 'text-[#C2A56D]' : 'text-[#8c6d32]')} />
              )}
              
              {featured && (
                <div className={`flex items-center gap-1 px-2 py-0.5 ${isAmal ? 'bg-[#C2A56D]' : 'bg-[#A1824A]'} text-black text-[8px] font-black rounded-full shadow-sm`}>
                  <Star size={8} className="fill-current text-black animate-pulse" />
                  <span>{isAr ? 'مميز' : 'FEATURED'}</span>
                </div>
              )}
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
              <h3 className={`text-base md:text-[17px] font-bold leading-[1.6] pb-[0.15em] pt-[0.1em] ${isDark ? 'text-white' : (isAmal ? 'text-[#2C3947]' : 'text-[#15110E]')}`}>
                {title}
              </h3>
              <p className={`text-[10px] leading-[1.6] font-sans mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`} dir="ltr">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-dashed mt-6" style={inlineBorderDashStyle}>
            <div className="flex flex-wrap gap-1" dir="ltr">
              {stack.slice(0, 3).map((item) => (
                <span key={item} className={`px-1.5 py-0.5 text-[8px] font-bold rounded border ${isDark ? (isAmal ? 'bg-[#1e2731] text-[#E8EDF2]/80 border-white/5' : 'bg-black/40 text-stone-400 border-white/5') : (isAmal ? 'bg-white text-[#2C3947] border-[#547A95]/30' : 'bg-stone-100 text-stone-600 border-stone-200')}`}>{item}</span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-stone-400'}`} dir="ltr">{year}</span>
              {link && <ArrowUpRight size={14} className={`opacity-50 group-hover/card:opacity-100 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all ${isAmal ? 'text-[#C2A56D]' : 'text-[#A1824A]'}`} />}
            </div>
          </div>
        </div>

        {/* Visual Mockup Side */}
        <div 
          className="w-full md:w-2/5 h-[180px] md:h-auto overflow-hidden relative flex items-center justify-center p-5 transition-colors duration-500"
          style={{
            background: isDark 
              ? `radial-gradient(circle at center, ${accentColor}25 0%, ${isAmal ? '#2C3947' : '#0a0c10'} 100%)` 
              : `radial-gradient(circle at center, ${accentColor}10 0%, ${isAmal ? '#E8EDF2' : '#ffffff'} 100%)`
          }}
        >
          {image ? (
            <div className="relative w-full h-full min-h-[140px] rounded-xl overflow-hidden border border-white/10 shadow-lg transition-all duration-500 group-hover/card:scale-[1.03] group-hover/card:translate-y-[-1px]">
              <img src={backImage} alt={title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <IconComponent size={30} className={isDark ? 'text-white/30' : (isAmal ? 'text-[#C2A56D]' : 'text-[#8c6d32]')} />
          )}
        </div>
      </div>
    );
  }

  // span === 1
  return (
    <div onClick={handleCardClick} className={`${cardBaseClasses} ${themeClasses} flex-col`}>
      {/* Ambient glow */}
      <div 
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12] pointer-events-none transition-opacity duration-500 group-hover/card:opacity-[0.16]"
        style={{ background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 100%)` }}
      />

      {/* Top Graphic Header */}
      <div 
        className="relative h-[150px] sm:h-[160px] w-full shrink-0 overflow-hidden border-b transition-colors duration-500 flex items-center justify-center"
        style={{
          borderColor: containerBorderColor,
          background: isDark 
            ? `radial-gradient(circle at center, ${accentColor}20 0%, ${isAmal ? '#2C3947' : '#050505'} 100%)` 
            : `radial-gradient(circle at center, ${accentColor}08 0%, ${isAmal ? '#E8EDF2' : '#F9F8F6'} 100%)`
        }}
      >
        {image ? (
          <img 
            src={backImage} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105" 
          />
        ) : (
          <IconComponent size={30} className={isDark ? 'text-white/40' : (isAmal ? 'text-[#C2A56D]' : 'text-[#8c6d32]')} />
        )}

        {logo && (
          <div className="absolute top-4 left-4 z-10 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
            <img src={logo} alt="logo" className="h-[60%] max-w-[80%] object-contain filter brightness-0 invert" />
          </div>
        )}

        {featured && (
          <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 ${isAmal ? 'bg-[#C2A56D]' : 'bg-[#A1824A]'} text-black text-[8px] font-black rounded-full shadow-md z-10`}>
            <Star size={8} className="fill-current text-black animate-pulse" />
            <span>{isAr ? 'مميز' : 'FEATURED'}</span>
          </div>
        )}
      </div>

      {/* Bottom Content Body */}
      <div className="flex flex-col flex-1 p-5 justify-between relative z-10">
        <div>
          <div className="flex flex-wrap gap-1 mb-2.5" dir="ltr">
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

          <h3 className={`text-[14px] sm:text-[15px] font-bold leading-[1.6] pb-[0.15em] pt-[0.1em] ${isDark ? 'text-white' : (isAmal ? 'text-[#2C3947]' : 'text-[#15110E]')} ${isAr ? 'text-right' : 'text-left'}`}>
            {title}
          </h3>

          <p className={`text-[10px] leading-[1.6] font-sans text-left ${isDark ? 'text-stone-400' : 'text-stone-600'} ${isAr ? 'text-right' : 'text-left'}`} dir="ltr">
            {subtitle}
          </p>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-dashed mt-4" style={inlineBorderDashStyle}>
          <div className="flex flex-wrap gap-1" dir="ltr">
            {stack.slice(0, 2).map((item) => (
              <span key={item} className={`px-1.5 py-0.5 text-[8px] font-bold rounded border ${isDark ? (isAmal ? 'bg-[#1e2731] text-[#E8EDF2]/80 border-white/5' : 'bg-black/40 text-stone-400 border-white/5') : (isAmal ? 'bg-white text-[#2C3947] border-[#547A95]/30' : 'bg-stone-100 text-stone-600 border-stone-200')}`}>{item}</span>
            ))}
            {stack.length > 2 && (
              <span className={`px-1.5 py-0.5 text-[8px] font-bold rounded border ${isDark ? 'bg-black/20 text-stone-500 border-white/5' : 'bg-stone-50 text-stone-400 border-stone-100'}`}>+{stack.length - 2}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-[9px] font-bold tracking-wider ${isDark ? 'text-stone-500' : 'text-stone-400'}`} dir="ltr">{year}</span>
            {link && <ArrowUpRight size={12} className={`opacity-50 group-hover/card:opacity-100 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all ${isAmal ? 'text-[#C2A56D]' : 'text-[#A1824A]'}`} />}
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

  const amalSeedData: CaseStudyProps[] = [
    {
      title_ar: "ترقية الشبكة المؤسسية ونظام الوصول الموحد Zero-Trust",
      title_en: "Enterprise Network Upgrade & Zero-Trust Access",
      subtitle_ar: "تصميم وتنفيذ شبكة آمنة تدعم العمل عن بعد لـ 300+ موظف",
      subtitle_en: "Design & implementation of secure remote access for 300+ employees",
      category: ["Infrastructure", "Security"],
      accentColor: "#438FB3",
      thumbIcon: "Cpu",
      problem_ar: "كانت فروع الشركة المتعددة تعتمد على شبكات VPN قديمة وبطيئة، مما أدى إلى ثغرات أمنية وصعوبة في إدارة صلاحيات الوصول للموظفين.",
      problem_en: "The company relied on legacy, slow VPNs, resulting in security vulnerabilities and complex access management across multiple regional branches.",
      decision_ar: "تنفيذ معمارية Zero-Trust باستخدام Cloudflare Access وتحديث البنية التحتية للشبكة بروابط SD-WAN آمنة وجدران حماية متطورة.",
      decision_en: "Deployed Cloudflare Access for role-based identity authentication and upgraded network infrastructure with secure SD-WAN and Fortinet firewalls.",
      result_ar: "تأمين وصول الموظفين بنسبة 100%، وتقليل زمن استجابة الشبكة بمقدار 40%، مع إمكانية إدارة الصلاحيات مركزيًا بدقة.",
      result_en: "100% secure remote access achieved, network latency reduced by 40%, and centralized identity management deployed.",
      stack: ["Cloudflare Access", "SD-WAN", "Fortinet", "IAM"],
      year: "2024",
      featured: true,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    },
    {
      title_ar: "ترحيل البنية التحتية السحابية لشركة أساس القابضة",
      title_en: "Enterprise Cloud Migration for Asas Holding",
      subtitle_ar: "ترحيل الخوادم المحلية إلى بيئة AWS سحابية هجينة",
      subtitle_en: "Migrating on-prem server infrastructure to AWS hybrid cloud",
      category: ["Cloud", "Infrastructure"],
      accentColor: "#58A8B4",
      thumbIcon: "Workflow",
      problem_ar: "ارتفاع تكاليف صيانة الخوادم المحلية وصعوبة التوسع لمواجهة زيادة ضغط العمليات اليومية.",
      problem_en: "High maintenance costs of legacy on-prem hardware and scaling issues during peak operational hours.",
      decision_ar: "بناء وتصميم بنية تحتية سحابية هجينة على AWS باستخدام Terraform كأكواد (IaC) مع تطبيق معايير الأمان المتقدمة.",
      decision_en: "Architected and migrated workloads to AWS using Terraform IaC, setting up secure VPCs, autoscaling, and RDS databases.",
      result_ar: "تخفيض التكاليف التشغيلية بنسبة 35% وضمان استقرار الخدمات بنسبة 99.99% مع إمكانية التوسع التلقائي.",
      result_en: "Reduced infrastructure costs by 35% and achieved 99.99% availability with automatic horizontal scaling.",
      stack: ["AWS", "Terraform", "Docker", "S3"],
      year: "2023",
      featured: false,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    },
    {
      title_ar: "أتمتة الدعم الفني وتقنية المعلومات عبر الذكاء الاصطناعي",
      title_en: "AI-Powered IT Support Desk Automation",
      subtitle_ar: "تطوير مساعد ذكي لأتمتة حل المشاكل التقنية وحوكمة التذاكر",
      subtitle_en: "Developing an AI agent to resolve technical queries and route tickets",
      category: ["AI & Automation"],
      accentColor: "#3C3489",
      thumbIcon: "Sparkles",
      problem_ar: "تأخر الردود على طلبات الدعم الفني البسيطة للموظفين مما أثر سلبًا على الإنتاجية وضاعف عبء العمل الفني.",
      problem_en: "High volume of simple password-resets and software requests clogged the IT queue, slowing response times.",
      decision_ar: "ربط نظام تذاكر Jira بمحرك ذكاء اصطناعي ونظام أتمتة n8n لحل المشاكل الروتينية تلقائيًا.",
      decision_en: "Integrated Jira Service Desk with an LLM agent via n8n automation to resolve common queries and categorize incoming requests.",
      result_ar: "حل 60% من التذاكر الروتينية تلقائيًا دون تدخل بشري، وتقليل وقت إغلاق التذاكر من ساعات إلى دقائق.",
      result_en: "Automated 60% of routine tickets, reducing average resolution time from hours to under 2 minutes.",
      stack: ["n8n", "Jira API", "Gemini API", "Python"],
      year: "2024",
      featured: false,
      image: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=800&q=80",
    }
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
        const res = await fetch(`${apiBase}/api/projects?owner=${owner}&limit=100`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.data && Array.isArray(data.data)) {
          if (data.data.length > 0) {
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
            setCardsData([]);
          }
        } else {
          setCardsData(owner === 'amal' ? amalSeedData : seedData);
        }
      } catch (err) {
        console.warn("CMS API is offline. Using fallback local project data.");
        setCardsData(owner === 'amal' ? amalSeedData : seedData);
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

  const getBentoSpan = (idx: number, total: number): 1 | 2 | 3 => {
    if (total === 1) return 3;
    if (total === 2) return 1; // Since container is md:grid-cols-2, each gets 1 col
    
    if (total === 3) {
      if (idx === 0) return 2;
      if (idx === 1) return 1;
      return 3;
    }
    if (total === 4) {
      if (idx === 0 || idx === 3) return 2;
      return 1;
    }
    
    const spans: number[] = [];
    let currentSum = 0;
    for (let i = 0; i < total; i++) {
      const s = (i % 3 === 0) ? 2 : 1;
      spans.push(s);
      currentSum += s;
    }
    const remainder = currentSum % 3;
    if (remainder === 1) {
      for (let i = total - 1; i >= 0; i--) {
        if (spans[i] === 2) {
          spans[i] = 1;
          break;
        }
      }
    } else if (remainder === 2) {
      for (let i = total - 1; i >= 0; i--) {
        if (spans[i] === 1) {
          spans[i] = 2;
          break;
        }
      }
    }
    return (spans[idx] as 1 | 2 | 3) || 1;
  };

  const getBentoClasses = (span: 1 | 2 | 3) => {
    if (span === 3) return "md:col-span-3 min-h-[340px] md:min-h-[380px]";
    if (span === 2) return "md:col-span-2 min-h-[380px] md:min-h-[420px]";
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

        {/* Filter Navigation Buttons */}
        <div className="flex flex-wrap gap-2.5 justify-center" dir={isAr ? 'rtl' : 'ltr'}>
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-[11px] font-black transition-all duration-300 active:scale-95 active:translate-y-[1px] border cursor-pointer ${
                activeFilter === option
                  ? (isAmal ? "bg-[#C2A56D] text-black border-[#C2A56D] shadow-[0_4px_20px_rgba(194,165,109,0.3)]" : "bg-[#A1824A] text-black border-[#A1824A] shadow-[0_4px_20px_rgba(161,130,74,0.3)]")
                  : (isDark 
                      ? "bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                      : (isAmal ? "bg-white text-[#2C3947]/70 border-stone-200 hover:border-[#C2A56D] hover:text-[#2C3947]" : "bg-white text-stone-500 border-stone-200 hover:border-[#A1824A] hover:text-[#15110E]"))
              }`}
            >
              {option === "All" ? (isAr ? "الكل / All" : "All") : option}
            </button>
          ))}
        </div>

        {/* Responsive Bento Grid Layout or Empty State */}
        {filteredCards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full max-w-md mx-auto text-center py-16 px-6 rounded-[28px] border flex flex-col items-center gap-4 ${
              isDark
                ? (isAmal ? 'bg-[#2C3947]/40 border-white/5' : 'bg-white/5 border-white/5')
                : (isAmal ? 'bg-white/50 border-[#547A95]/20 shadow-sm' : 'bg-white border-stone-200 shadow-sm')
            } backdrop-blur-xl`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isDark ? 'bg-white/5 text-zinc-500 border border-white/5' : 'bg-stone-100 text-stone-400 border border-stone-200'
            }`}>
              <Workflow size={20} className="animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className={`text-sm font-black ${isDark ? 'text-white' : (isAmal ? 'text-[#2C3947]' : 'text-[#15110E]')}`}>
                {isAr ? "لا توجد مشاريع مضافة" : "No Projects Found"}
              </h3>
              <p className={`text-[10px] leading-relaxed max-w-[32ch] mx-auto ${isDark ? 'text-zinc-450' : 'text-stone-400'}`}>
                {isAr 
                  ? "لم يتم إضافة أي مشاريع في هذا القسم بعد. يرجى اختيار قسم آخر." 
                  : "No projects have been added under this category yet. Please select another filter."}
              </p>
            </div>
            {activeFilter !== "All" && (
              <button
                onClick={() => setActiveFilter("All")}
                className={`mt-2 px-5 py-2.5 rounded-full text-[10px] font-black transition-all hover:scale-105 active:scale-95 border cursor-pointer ${
                  isAmal
                    ? "bg-[#C2A56D] text-black border-[#C2A56D] shadow-sm hover:bg-[#b39158]"
                    : "bg-[#A1824A] text-black border-[#A1824A] shadow-sm hover:bg-[#8c6d32]"
                }`}
              >
                {isAr ? "عرض كل المشاريع" : "Show All Projects"}
              </button>
            )}
          </motion.div>
        ) : (
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
              {filteredCards.map((card, index) => {
                const span = getBentoSpan(index, filteredCards.length);
                return (
                  <motion.div
                    key={card.title_en}
                    layout
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={getBentoClasses(span)}
                  >
                    <CaseStudyCard {...card} isDark={isDark} isAr={isAr} owner={owner} span={span} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
