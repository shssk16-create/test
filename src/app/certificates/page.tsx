"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Award, Moon, Sun, ZoomIn, X } from "lucide-react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import FloatingChat from "@/components/FloatingChat";

export default function Certificates() {
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // نظام الـ Lightbox للعرض داخل الصفحة
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => { 
    setMounted(true); 
    const l = localStorage.getItem('sk_lang'); 
    const th = localStorage.getItem('sk_theme');
    if(l) setLang(l as 'ar'|'en'); 
    if(th) setTheme(th as 'dark'|'light');
    setTimeout(() => setLoading(false), 1200);
  }, []);
  
  const toggleLang = () => { const n = lang === 'ar' ? 'en' : 'ar'; setLang(n); localStorage.setItem('sk_lang', n); window.dispatchEvent(new Event('lang-change')); };
  const toggleTheme = () => { const n = theme === 'dark' ? 'light' : 'dark'; setTheme(n); localStorage.setItem('sk_theme', n); window.dispatchEvent(new Event('theme-change')); };
  
  // إغلاق العرض عند ضغط Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedImg(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const isAr = lang === 'ar';
  const isDark = theme === 'dark';

  // المؤهل الأساسي (مستقل)
  const primaryCert = "https://aurateam3.com/wp-content/uploads/2026/03/وثائق-التخرج-طلاب-الكلية-46-_page-0001.webp";
  
  // باقي الشهادات
  const otherCerts = [
    "https://aurateam3.com/wp-content/uploads/2026/03/Coursera-H3AKC1QMLIRA_page-0001.webp",
    "https://aurateam3.com/wp-content/uploads/2026/03/Coursera-FDBD5M3X44NP_page-0001.webp",
    "https://aurateam3.com/wp-content/uploads/2026/03/Coursera-BN5Z65E8BW06_page-0001-1.webp",
    "https://aurateam3.com/wp-content/uploads/2026/03/certificate-agent-explorer_page-0001.webp",
    "https://aurateam3.com/wp-content/uploads/2026/03/mpdf-4_page-0001-1.webp",
    "https://aurateam3.com/wp-content/uploads/2026/03/1761323074618.webp",
    "https://aurateam3.com/wp-content/uploads/2026/03/1748694369861.webp",
    "https://aurateam3.com/wp-content/uploads/2026/03/1739189774385.webp",
    "https://aurateam3.com/wp-content/uploads/2026/03/1741152507855.webp",
    "https://aurateam3.com/wp-content/uploads/2026/03/1742330177160.webp",
    "https://aurateam3.com/wp-content/uploads/2026/03/1744763478103.webp"
  ];

  if(!mounted) return null;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className={`min-h-screen ${isDark ? 'bg-[#050505] text-white' : 'bg-[#F9F8F6] text-[#15110E]'} selection:bg-[#A1824A] pb-32 relative overflow-hidden ${isAr ? 'font-alexandria' : 'font-sans'} transition-colors duration-700`} dir={isAr ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      
      {/* نافذة العرض المنبثقة (Lightbox) */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out">
            <button onClick={() => setSelectedImg(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-red-500/80 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors z-50">
              <X size={24} />
            </button>
            <motion.img initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} src={selectedImg} alt="Certificate Full View" className="max-w-full max-h-full rounded-xl md:rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20 object-contain" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }} transition={{ duration: 0.8, ease: "easeInOut" }} className={`fixed inset-0 z-[999] ${isDark ? 'bg-[#050505]' : 'bg-[#F9F8F6]'} flex items-center justify-center`}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative flex items-center justify-center">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute w-[180px] h-[180px] border-t-2 border-r-2 border-[#A1824A] rounded-full opacity-80 shadow-[0_0_30px_rgba(161,130,74,0.3)]"></motion.div>
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className={`absolute w-[130px] h-[130px] border-b-2 border-l-2 ${isDark ? 'border-white/20' : 'border-[#15110E]/20'} rounded-full`}></motion.div>
              <span className={`text-4xl md:text-5xl font-black tracking-[0.3em] ${isDark ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-[#15110E] drop-shadow-md'}`}>SK<span className="text-[#A1824A]">.</span></span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#A1824A]/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      <nav className={`w-full h-20 md:h-24 flex items-center px-4 md:px-12 border-b ${isDark ? 'border-white/5 bg-[#050505]/60' : 'border-[#15110E]/10 bg-white/60'} backdrop-blur-2xl sticky top-0 z-50 transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-black tracking-widest hover:text-[#A1824A] transition-colors">{isAr ? 'سالمين' : 'SALMEEN'}<span className="text-[#A1824A]">.</span></Link>
          <div className="flex gap-2 md:gap-3 items-center">
            <Link href="/" className={`flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold ${isDark ? 'text-stone-300 hover:text-white bg-white/5 border-white/10' : 'text-stone-600 hover:text-black bg-white border-stone-200'} px-3 md:px-5 py-2 md:py-2.5 rounded-full border transition-colors shadow-sm`}>{isAr ? <ArrowRight size={14}/> : <ArrowLeft size={14}/>} <span className="hidden md:inline">{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span><span className="md:hidden">{isAr ? 'رجوع' : 'Back'}</span></Link>
            <Link href="/portfolio" className={`flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold ${isDark ? 'text-stone-300 hover:text-white bg-white/5 border-white/10' : 'text-stone-600 hover:text-black bg-white border-stone-200'} px-3 md:px-5 py-2 md:py-2.5 rounded-full border transition-colors shadow-sm`}><Sparkles size={14} className="md:w-4 md:h-4"/><span className="hidden md:inline">{isAr ? 'معرض الأعمال' : 'Portfolio'}</span><span className="md:hidden">{isAr ? 'الأعمال' : 'Work'}</span></Link>
            <button onClick={toggleLang} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-white text-black border-stone-200 hover:bg-stone-50'} border px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold shadow-sm hover:scale-105 transition-all`}>{isAr ? 'EN' : 'عربي'}</button>
            <button onClick={toggleTheme} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-[#15110E] text-white border-[#15110E] hover:bg-black'} border p-2 md:p-2.5 rounded-full shadow-sm hover:scale-105 transition-all`} title="Toggle Theme">
              {isDark ? <Sun size={14} className="md:w-4 md:h-4"/> : <Moon size={14} className="md:w-4 md:h-4"/>}
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-16 md:pt-24 pb-10 px-4 md:px-6 max-w-7xl mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={lang} initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }} transition={{ duration: 0.3 }}>
            <div className={`inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 ${isDark ? 'bg-[#A1824A]/10 border-[#A1824A]/20' : 'bg-white border-[#A1824A]/30 shadow-sm'} rounded-full border mb-4 md:mb-6 text-[10px] md:text-xs font-black text-[#A1824A] uppercase tracking-widest`}><Award size={14} /> {isAr ? 'المعرض البصري' : 'Visual Gallery'}</div>
            <h1 className={`text-4xl md:text-6xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-b ${isDark ? 'from-white to-stone-400' : 'from-[#15110E] to-stone-500'} overflow-visible leading-[1.6] pb-[0.3em] -mb-[0.3em] pt-2`}>{isAr ? 'السجل' : 'Academic'} <span className="text-[#A1824A]">{isAr ? 'الأكاديمي.' : 'Record.'}</span></h1>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* المؤهل الأساسي - متوّج في الأعلى بتصميم فخم وإطار ذهبي */}
      <section className="px-4 md:px-6 max-w-4xl mx-auto z-10 relative mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center mb-6">
            <span className="px-5 py-2 bg-gradient-to-r from-[#A1824A] to-yellow-600 text-black font-black text-xs md:text-sm rounded-full shadow-[0_0_20px_rgba(161,130,74,0.4)] flex items-center gap-2">
              <Award size={16} /> {isAr ? 'المؤهل الأكاديمي الأساسي' : 'Primary Academic Degree'}
            </span>
          </div>
          <Tilt glareEnable={true} glareMaxOpacity={0.1} glareColor="#A1824A" glarePosition="all" tiltMaxAngleX={2} tiltMaxAngleY={2} className="w-full">
            <div onClick={() => setSelectedImg(primaryCert)} className={`w-full cursor-zoom-in ${isDark ? 'bg-[#0a0c10] border-[#A1824A]/40 shadow-[0_0_40px_rgba(161,130,74,0.15)]' : 'bg-white border-[#A1824A]/60 shadow-2xl'} rounded-[2rem] border-2 p-3 md:p-5 flex flex-col group relative overflow-hidden transition-all duration-500`}>
              <div className="relative w-full h-[40vh] md:h-[60vh] rounded-xl overflow-hidden bg-[#111]">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10 duration-500 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100 border border-white/20">
                    <ZoomIn size={24} />
                  </div>
                </div>
                <img src={primaryCert} alt="Primary Certificate" className="w-full h-full object-contain filter brightness-[0.9] group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-700" />
              </div>
            </div>
          </Tilt>
        </motion.div>
      </section>

      {/* باقي الشهادات - شبكة صورية صافية */}
      <section className="px-4 md:px-6 max-w-7xl mx-auto z-10 relative">
        <div className="flex items-center justify-center mb-8">
            <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-[#15110E]/10'}`}></div>
            <span className={`px-4 text-xs font-bold uppercase tracking-widest ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{isAr ? 'الشهادات المهنية والتطويرية' : 'Professional Certificates'}</span>
            <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-[#15110E]/10'}`}></div>
        </div>
        
        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {otherCerts.map((imgUrl, i) => (
              <motion.div initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 0.4, delay: i * 0.05 }} key={`cert-${i}`} className="col-span-1">
                <div onClick={() => setSelectedImg(imgUrl)} className={`h-40 md:h-56 lg:h-64 w-full cursor-zoom-in ${isDark ? 'bg-[#0a0c10] border-white/10 hover:border-[#A1824A]/50' : 'bg-white border-stone-200 hover:border-[#A1824A]/50 shadow-md hover:shadow-xl'} rounded-2xl border p-2 group relative overflow-hidden transition-all duration-500`}>
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#111]">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all z-10 duration-500 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100 border border-white/20">
                        <ZoomIn size={18} />
                      </div>
                    </div>
                    <img src={imgUrl} alt={`Certificate ${i}`} className="w-full h-full object-cover object-top filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
      <FloatingChat />
    </motion.main>
  );
}
