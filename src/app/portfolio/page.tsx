"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Moon, Sun, Award, Layout } from "lucide-react";
import Link from "next/link";
import FloatingChat from "@/components/FloatingChat";
import { WorksSection } from "@/components/WorksSection";
import AmalPortfolioPage from "../amal/portfolio/page";

export default function PortfolioRoute() {
  const isAmalDeploy = process.env.NEXT_PUBLIC_OWNER === 'amal';
  if (isAmalDeploy) {
    return <AmalPortfolioPage />;
  }
  return <Portfolio />;
}

function Portfolio() {
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

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
      document.title = lang === 'ar' ? "سالمين هادي | معرض الأعمال" : "Salmeen Hadi | Portfolio";
    }
  }, [lang, mounted]);
  
  const toggleLang = () => { const n = lang === 'ar' ? 'en' : 'ar'; setLang(n); localStorage.setItem('sk_lang', n); window.dispatchEvent(new Event('lang-change')); };
  const toggleTheme = () => { const n = theme === 'dark' ? 'light' : 'dark'; setTheme(n); localStorage.setItem('sk_theme', n); window.dispatchEvent(new Event('theme-change')); };
  
  const isAr = lang === 'ar';
  const isDark = theme === 'dark';

  if(!mounted) return null;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className={`min-h-[100dvh] ${isDark ? 'bg-[#050505] text-white' : 'bg-[#F9F8F6] text-[#15110E]'} selection:bg-[#A1824A] pb-32 relative overflow-hidden ${isAr ? 'font-alexandria' : 'font-sans'} transition-colors duration-700`} dir={isAr ? 'rtl' : 'ltr'}>
      
      
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
      
      <nav className={`w-full h-20 md:h-24 flex items-center px-3 sm:px-4 md:px-12 border-b ${isDark ? 'border-white/5 bg-[#050505]/60' : 'border-[#15110E]/10 bg-white/60'} backdrop-blur-2xl sticky top-0 z-50 transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="text-lg sm:text-xl md:text-2xl font-black tracking-widest hover:text-[#A1824A] transition-colors shrink-0">{isAr ? 'سالمين' : 'SALMEEN'}<span className="text-[#A1824A]">.</span></Link>
          <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center shrink-0">
            <Link href="/" className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-xs font-bold ${isDark ? 'text-stone-300 hover:text-white bg-white/5 border-white/10' : 'text-stone-600 hover:text-black bg-white border-stone-200'} px-2.5 sm:px-3 md:px-5 py-2 md:py-2.5 rounded-full border transition-all shadow-sm active:scale-95`}>{isAr ? <ArrowRight size={12}/> : <ArrowLeft size={12}/>} <span className="hidden md:inline">{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span><span className="md:hidden">{isAr ? 'رجوع' : 'Back'}</span></Link>
            <Link href="/certificates" className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-xs font-bold ${isDark ? 'text-stone-300 hover:text-white bg-white/5 border-white/10' : 'text-stone-600 hover:text-black bg-white border-stone-200'} px-2.5 sm:px-3 md:px-5 py-2 md:py-2.5 rounded-full border transition-all shadow-sm active:scale-95`}><Award size={12} className="sm:w-[14px] sm:h-[14px] md:w-4 md:h-4"/><span className="hidden md:inline">{isAr ? "الشهادات" : "Certs"}</span><span className="md:hidden">{isAr ? "شهادات" : "Certs"}</span></Link>
            <button onClick={toggleLang} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-white text-black border-stone-200 hover:bg-stone-50'} border px-2.5 sm:px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all`}>{isAr ? 'EN' : 'عربي'}</button>
            <button onClick={toggleTheme} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-[#15110E] text-white border-[#15110E] hover:bg-black'} border p-1.5 sm:p-2 md:p-2.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all`} title="Toggle Theme">
              {isDark ? <Sun size={14} className="md:w-4 md:h-4"/> : <Moon size={14} className="md:w-4 md:h-4"/>}
            </button>
          </div>
        </div>
      </nav>

      <WorksSection />

      <FloatingChat />
    </motion.main>
  );
}
