"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingChat from "@/components/FloatingChat";
import ParticleNetwork from "@/components/ParticleNetwork";
import { Phone, Sparkles, ArrowLeft, ArrowRight, Award, Moon, Sun, Lock } from "lucide-react";
import Link from "next/link";
import { useSEO } from "@/hooks/useSEO";

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

export function cleanNumber(num: string) {
  if (!num) return "";
  let cleaned = num.replace(/\D/g, '');
  if (cleaned.startsWith('05') && cleaned.length === 10) {
    cleaned = '966' + cleaned.substring(1);
  } else if (cleaned.startsWith('5') && cleaned.length === 9) {
    cleaned = '966' + cleaned;
  }
  return cleaned;
}

export default function AmalPortfolio() {
  const isAmalDeploy = process.env.NEXT_PUBLIC_OWNER === 'amal';
  const basePrefix = isAmalDeploy ? "" : "/amal";

  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useSEO('amal', lang, 'home');

  const [heroData, setHeroData] = useState({
    name_ar: "أمل هادي.",
    name_en: "Amal Hadi.",
    title_ar: "أخصائية تقنية معلومات",
    title_en: "IT Specialist",
    subtitle_ar: "أبني منصات رقمية متكاملة. يمكنك تصفح معرض أعمالي من الأعلى، أو التحدث مباشرة مع مساعدي الذكي ليجيب على كافة استفساراتك حول خبراتي وتقنياتي.",
    subtitle_en: "Building comprehensive digital platforms. Explore my portfolio from the menu above or chat with my custom-built AI assistant for any inquiries.",
    whatsapp_number: "966503026795"
  });

  const [logosData, setLogosData] = useState<string[]>([
    "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%8ور%D8%A7-02-2.png",
    "https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp",
    "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp"
  ]);

  useEffect(() => { 
    setMounted(true);
    const l = localStorage.getItem('sk_lang');
    const th = localStorage.getItem('sk_theme');
    if(l) setLang(l as 'ar'|'en');
    if(th) setTheme(th as 'dark'|'light');
    setTimeout(() => setLoading(false), 1800); 
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  useEffect(() => {
    if (!mounted) return;

    async function fetchHeroAndLogos() {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
      try {
        const heroRes = await fetch(`${apiBase}/api/heroes?owner=amal`, { cache: 'no-store' });
        if (heroRes.ok) {
          const heroJson = await heroRes.json();
          if (heroJson.data && Array.isArray(heroJson.data) && heroJson.data.length > 0) {
            const firstHero = heroJson.data[0];
            setHeroData({
              name_ar: firstHero.name_ar || "أمل هادي.",
              name_en: firstHero.name_en || "Amal Hadi.",
              title_ar: firstHero.title_ar || "أخصائية تقنية معلومات",
              title_en: firstHero.title_en || "IT Specialist",
              subtitle_ar: firstHero.subtitle_ar || "أبني منصات رقمية متكاملة. يمكنك تصفح معرض أعمالي من الأعلى، أو التحدث مباشرة مع مساعدي الذكي ليجيب على كافة استفساراتك حول خبراتي وتقنياتي.",
              subtitle_en: firstHero.subtitle_en || "Building comprehensive digital platforms. Explore my portfolio from the menu above or chat with my custom-built AI assistant for any inquiries.",
              whatsapp_number: firstHero.whatsapp_number || "966503026795"
            });
          }
        }
      } catch (err) {
        console.warn("CMS API is offline. Using local hero fallback.");
      }

      try {
        const logosRes = await fetch(`${apiBase}/api/logos?owner=amal`, { cache: 'no-store' });
        if (logosRes.ok) {
          const logosJson = await logosRes.json();
          if (logosJson.data && Array.isArray(logosJson.data) && logosJson.data.length > 0) {
            const sortedLogos = [...logosJson.data].sort((a: any, b: any) => {
              const orderA = parseInt(a.sort_order || '9999', 10);
              const orderB = parseInt(b.sort_order || '9999', 10);
              return orderA - orderB;
            });
            const mappedLogos = sortedLogos.map((l: any) => {
              return cleanCdnUrl(l.imageUrl, apiBase);
            }).filter(Boolean);
            if (mappedLogos.length > 0) {
              setLogosData(mappedLogos);
            }
          }
        }
      } catch (err) {
        console.warn("CMS API is offline. Using local logos fallback.");
      }
    }

    fetchHeroAndLogos();
  }, [mounted]);

  const toggleLang = () => {
    const n = lang === 'ar' ? 'en' : 'ar';
    setLang(n);
    localStorage.setItem('sk_lang', n);
    window.dispatchEvent(new Event('lang-change'));
  };

  const toggleTheme = () => {
    const n = theme === 'dark' ? 'light' : 'dark';
    setTheme(n);
    localStorage.setItem('sk_theme', n);
    window.dispatchEvent(new Event('theme-change'));
  };

  const isAr = lang === 'ar';
  const isDark = theme === 'dark';

  const [authorized, setAuthorized] = useState(true);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  useEffect(() => {
    if (localStorage.getItem('portfolio_auth_amal') === 'true') {
      setAuthorized(true);
    }
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPasscode = passcode.trim();
    if (cleanPasscode === 'amal123' || cleanPasscode === 'sister123') {
      localStorage.setItem('portfolio_auth_amal', 'true');
      setAuthorized(true);
    } else {
      setPasscodeError(isAr ? 'رمز مرور خاطئ، يرجى المحاولة مرة أخرى.' : 'Incorrect passcode, please try again.');
    }
  };

  if(!mounted) return null;

  if (!authorized) {
    return (
      <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${isDark ? 'bg-[#2C3947]' : 'bg-[#E8EDF2]'} overflow-hidden`} dir={isAr ? 'rtl' : 'ltr'}>
        <ParticleNetwork color="#C2A56D" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#C2A56D]/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <div className={`flex flex-col gap-6 p-8 max-w-sm w-full mx-4 rounded-3xl border ${isDark ? 'border-white/10 bg-black/40' : 'border-[#547A95]/20 bg-[#E8EDF2]'} backdrop-blur-xl text-center shadow-2xl relative z-10`}>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-[#C2A56D]/10 border border-[#C2A56D]/30 rounded-full flex items-center justify-center text-[#C2A56D] shadow-[0_0_20px_rgba(194,165,109,0.2)]">
              <Sparkles size={28} />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-stone-900'}`}>
              {isAr ? 'موقع خاص' : 'Private Site'}
            </h2>
            <p className={`text-xs ${isDark ? 'text-stone-300' : 'text-stone-600'} leading-relaxed`}>
              {isAr 
                ? 'هذا المعرض محمي برمز مرور. يرجى إدخال رمز المرور للمتابعة.' 
                : 'This portfolio is passcode protected. Please enter the passcode to proceed.'}
            </p>
          </div>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-1">
              <input
                type="password"
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setPasscodeError(""); }}
                placeholder={isAr ? 'أدخل رمز المرور...' : 'Enter passcode...'}
                className={`w-full px-5 py-3 rounded-full text-center text-sm font-bold border ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-stone-500 focus:border-[#C2A56D]' : 'bg-stone-50 border-[#547A95]/30 text-[#2C3947] placeholder-[#2C3947]/50 focus:border-[#C2A56D]'} focus:outline-none transition-all`}
                autoFocus
              />
              {passcodeError && (
                <p className="text-[10px] text-red-500 font-bold mt-1">
                  {passcodeError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#C2A56D] hover:bg-[#b39158] text-black text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(194,165,109,0.3)] cursor-pointer"
            >
              {isAr ? 'دخول' : 'Access'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className={`min-h-[100dvh] ${isDark ? 'bg-[#2C3947] text-[#E8EDF2]' : 'bg-[#E8EDF2] text-[#2C3947]'} flex flex-col relative overflow-hidden ${isAr ? 'font-alexandria' : 'font-sans'} transition-colors duration-700`} dir={isAr ? 'rtl' : 'ltr'}>
      
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }} transition={{ duration: 0.8, ease: "easeInOut" }} className={`fixed inset-0 z-[999] ${isDark ? 'bg-[#2C3947]' : 'bg-[#E8EDF2]'} flex items-center justify-center`}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative flex items-center justify-center">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute w-[180px] h-[180px] border-t-2 border-r-2 border-[#C2A56D] rounded-full opacity-80 shadow-[0_0_30px_rgba(194,165,109,0.3)]"></motion.div>
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className={`absolute w-[130px] h-[130px] border-b-2 border-l-2 ${isDark ? 'border-white/20' : 'border-[#2C3947]/20'} rounded-full`}></motion.div>
              <span className={`text-4xl md:text-5xl font-black tracking-[0.3em] ${isDark ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-[#2C3947] drop-shadow-md'}`}>AH<span className="text-[#C2A56D]">.</span></span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ParticleNetwork color="#C2A56D" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#C2A56D]/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <nav className={`w-full h-20 md:h-24 z-50 px-3 sm:px-4 md:px-12 flex items-center justify-between border-b ${isDark ? 'border-white/5 bg-[#2C3947]/60' : 'border-[#2C3947]/10 bg-[#E8EDF2]/60'} backdrop-blur-xl absolute top-0 transition-colors duration-700`}>
        <Link href={basePrefix || "/"} className="text-lg sm:text-xl md:text-2xl font-black tracking-widest shrink-0">{isAr?'أمل':'AMAL'}<span className="text-[#C2A56D]">.</span></Link>
        <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center shrink-0">
          <Link href={`${basePrefix}/portfolio`} className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#C2A56D] to-yellow-600 text-black px-2.5 sm:px-3 md:px-5 py-2 md:py-2.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-black shadow-[0_0_15px_rgba(194,165,109,0.4)] hover:scale-105 active:scale-95 transition-transform"><Sparkles size={12} className="sm:w-[14px] sm:h-[14px] md:w-4 md:h-4"/><span className="hidden sm:inline md:hidden">{isAr ? 'الأعمال' : 'Work'}</span><span className="hidden md:inline">{isAr ? 'معرض الأعمال' : 'Portfolio'}</span><span className="sm:hidden">{isAr ? 'أعمال' : 'Work'}</span></Link>
          <Link href={`${basePrefix}/certificates`} className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-xs font-bold ${isDark ? 'text-[#E8EDF2]/90 hover:text-white bg-[#E8EDF2]/10 border-white/10' : 'text-[#2C3947]/80 hover:text-black bg-white border-[#547A95]/30'} px-2.5 sm:px-3 md:px-5 py-2 md:py-2.5 rounded-full border transition-all shadow-sm active:scale-95`}><Award size={12} className="sm:w-[14px] sm:h-[14px] md:w-4 md:h-4"/><span className="hidden md:inline">{isAr ? "الشهادات" : "Certs"}</span><span className="md:hidden">{isAr ? "شهادات" : "Certs"}</span></Link>
          <button onClick={toggleLang} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-white text-[#2C3947] border-[#547A95]/30 hover:bg-stone-50'} border px-2.5 sm:px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-black shadow-sm hover:scale-105 active:scale-95 transition-all`}>{isAr ? 'EN' : 'عربي'}</button>
          <button onClick={toggleTheme} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-[#2C3947] text-white border-[#2C3947] hover:bg-black'} border p-1.5 sm:p-2 md:p-2.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all`} title="Toggle Theme">
            {isDark ? <Sun size={14} className="md:w-4 md:h-4"/> : <Moon size={14} className="md:w-4 md:h-4"/>}
          </button>
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 text-center z-10 pt-20 md:pt-24 pb-12 md:pb-16 min-h-[100dvh]">
        <AnimatePresence mode="wait">
          <motion.div key={lang} initial="hidden" animate="visible" exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }} className="max-w-4xl mx-auto flex flex-col items-center w-full gap-5 md:gap-8">
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className={`px-4 md:px-6 py-2 ${isDark ? 'bg-[#C2A56D]/10 border-[#C2A56D]/30' : 'bg-white border-[#C2A56D]/30 shadow-sm'} rounded-full border text-[10px] md:text-xs font-black tracking-widest flex items-center gap-2 text-[#C2A56D] uppercase transition-colors mb-2`}><Sparkles size={14} /> {isAr ? heroData.title_ar : heroData.title_en}</motion.div>
            
            <motion.h1 variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className={`text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] font-black text-transparent bg-clip-text bg-gradient-to-b ${isDark ? 'from-white to-stone-400' : 'from-[#2C3947] to-[#547A95]'} drop-shadow-2xl overflow-visible leading-[1.4] pb-[0.2em] pt-4`}>{isAr ? heroData.name_ar : heroData.name_en}</motion.h1>
            
            <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className={`${isDark ? 'text-[#E8EDF2]/90' : 'text-[#2C3947]/95'} font-medium text-base md:text-lg lg:text-xl max-w-2xl leading-[2] md:leading-[2.2] px-4 md:px-0 transition-colors mt-6 md:mt-8`}>{isAr ? heroData.subtitle_ar : heroData.subtitle_en}</motion.p>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4 md:mt-6">
              <a href={`https://wa.me/${cleanNumber(heroData.whatsapp_number)}`} target="_blank" rel="noopener noreferrer" className={`relative group px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full font-black text-[11px] sm:text-xs md:text-sm flex items-center gap-2 sm:gap-3 overflow-hidden ${isDark ? 'bg-[#E8EDF2] text-[#2C3947]' : 'bg-[#2C3947] text-[#E8EDF2]'} transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(37,211,102,0.2)] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)]`}>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 flex items-center gap-2 md:gap-3 group-hover:text-white"><Phone size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5"/> {isAr ? 'تحدث معي مباشرة' : 'Chat on WhatsApp'} {isAr ? <ArrowLeft size={14}/> : <ArrowRight size={14}/>}</span>
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className={`pt-10 pb-32 md:pb-40 px-4 md:px-6 border-t ${isDark ? 'border-white/5 bg-black/40' : 'border-[#2C3947]/5 bg-[#E8EDF2]/40'} backdrop-blur-md z-10 flex-shrink-0 mt-auto transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-16">
          {logosData.map((u, i) => (
            <img key={i} src={u} className={`h-6 md:h-10 lg:h-12 max-w-[80px] md:max-w-[130px] object-contain transition-all duration-500 ${isDark ? 'filter brightness-0 invert opacity-45 hover:opacity-100 hover:scale-110' : 'opacity-85 hover:opacity-100 hover:scale-110'}`} />
          ))}
        </div>
      </section>
      
      <FloatingChat owner="amal" />
    </motion.main>
  );
}
