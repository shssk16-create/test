"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingChat from "@/components/FloatingChat";
import ParticleNetwork from "@/components/ParticleNetwork";
import { Phone, Sparkles, ArrowLeft, ArrowRight, Award, Moon, Sun } from "lucide-react";
import Link from "next/link";

export default function GlobalPortfolio() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true);
    const l = localStorage.getItem('sk_lang');
    const th = localStorage.getItem('sk_theme');
    if(l) setLang(l as 'ar'|'en');
    if(th) setTheme(th as 'dark'|'light');
    setTimeout(() => setLoading(false), 1800); 
  }, []);

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
  
  const logos = [
    "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png",
    "https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp",
    "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp",
    "https://redp-sa.com/web/images/logo.svg",
    "https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp",
    "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png"
  ];

  if(!mounted) return null;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className={`min-h-screen ${isDark ? 'bg-[#050505] text-white' : 'bg-[#F9F8F6] text-[#15110E]'} flex flex-col relative overflow-hidden ${isAr ? 'font-alexandria' : 'font-sans'} transition-colors duration-700`} dir={isAr ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      
      {/* شاشة التحميل السينمائية الجديدة */}
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

      <ParticleNetwork />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#A1824A]/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <nav className={`w-full h-20 md:h-24 z-50 px-4 md:px-12 flex items-center justify-between border-b ${isDark ? 'border-white/5 bg-[#050505]/60' : 'border-[#15110E]/10 bg-white/60'} backdrop-blur-xl absolute top-0 transition-colors duration-700`}>
        <div className="text-xl md:text-2xl font-black tracking-widest">{isAr?'سالمين':'SALMEEN'}<span className="text-[#A1824A]">.</span></div>
        <div className="flex gap-2 md:gap-3 items-center">
          <Link href="/portfolio" className="flex items-center gap-2 bg-gradient-to-r from-[#A1824A] to-yellow-600 text-black px-3 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black shadow-[0_0_15px_rgba(161,130,74,0.4)] hover:scale-105 transition-transform"><Sparkles size={14} className="md:w-4 md:h-4"/><span className="hidden md:inline">{isAr ? 'معرض الأعمال' : 'Portfolio'}</span><span className="md:hidden">{isAr ? 'الأعمال' : 'Work'}</span></Link>
          <Link href="/certificates" className={`flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold ${isDark ? 'text-stone-300 hover:text-white bg-white/5 border-white/10' : 'text-stone-600 hover:text-black bg-white border-stone-200'} px-3 md:px-5 py-2 md:py-2.5 rounded-full border transition-colors shadow-sm`}><Award size={14} className="md:w-4 md:h-4"/><span className="hidden md:inline">{isAr ? "الشهادات" : "Certs"}</span><span className="md:hidden">{isAr ? "شهادات" : "Certs"}</span></Link>
          <button onClick={toggleLang} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-white text-black border-stone-200 hover:bg-stone-50'} border px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black shadow-sm hover:scale-105 transition-all`}>{isAr ? 'EN' : 'عربي'}</button>
          <button onClick={toggleTheme} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-[#15110E] text-white border-[#15110E] hover:bg-black'} border p-2 md:p-2.5 rounded-full shadow-sm hover:scale-105 transition-all`} title="Toggle Theme">
            {isDark ? <Sun size={14} className="md:w-4 md:h-4"/> : <Moon size={14} className="md:w-4 md:h-4"/>}
          </button>
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 text-center z-10 pt-32 pb-16 min-h-[90vh]">
        <AnimatePresence mode="wait">
          <motion.div key={lang} initial="hidden" animate="visible" exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }} className="max-w-4xl mx-auto flex flex-col items-center w-full gap-5 md:gap-8">
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className={`px-4 md:px-6 py-2 ${isDark ? 'bg-[#A1824A]/10 border-[#A1824A]/30' : 'bg-white border-[#A1824A]/30 shadow-sm'} rounded-full border text-[10px] md:text-xs font-black tracking-widest flex items-center gap-2 text-[#A1824A] uppercase transition-colors mb-2`}><Sparkles size={14} /> {isAr ? 'مطور حلول ذكاء اصطناعي وبنية سحابية' : 'AI & Cloud Solutions Architect'}</motion.div>
            
            {/* الحل السحري: pb-[0.4em] -mb-[0.4em] لإظهار الياء بدون تخريب المسافات */}
            <motion.h1 variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className={`text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black text-transparent bg-clip-text bg-gradient-to-b ${isDark ? 'from-white to-stone-400' : 'from-[#15110E] to-stone-500'} drop-shadow-2xl overflow-visible leading-[1.6] pb-[0.4em] -mb-[0.4em] pt-4`}>{isAr ? "سالمين خنبري." : "Salmeen Khanbri."}</motion.h1>
            
            <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className={`${isDark ? 'text-stone-400' : 'text-stone-600'} font-medium text-base md:text-lg lg:text-xl max-w-2xl leading-[2] md:leading-[2.2] px-4 md:px-0 transition-colors mt-2 md:mt-0`}>{isAr ? "أبني منصات رقمية متكاملة. يمكنك تصفح معرض أعمالي من الأعلى، أو التحدث مباشرة مع مساعدي الذكي ليجيب على كافة استفساراتك حول خبراتي وتقنياتي." : "Building comprehensive digital platforms. Explore my portfolio from the menu above or chat with my custom-built AI assistant for any inquiries."}</motion.p>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-4 md:mt-6">
              <a href="https://wa.me/966503026795" target="_blank" rel="noopener noreferrer" className={`relative group px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-xs md:text-sm flex items-center gap-3 overflow-hidden ${isDark ? 'bg-white text-black' : 'bg-[#15110E] text-white'} transition-all hover:scale-105 shadow-[0_0_30px_rgba(37,211,102,0.2)] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)]`}>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 flex items-center gap-2 md:gap-3 group-hover:text-white"><Phone size={16} className="md:w-5 md:h-5"/> {isAr ? 'تحدث معي مباشرة' : 'Chat on WhatsApp'} {isAr ? <ArrowLeft size={16}/> : <ArrowRight size={16}/>}</span>
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className={`pt-10 pb-32 md:pb-40 px-4 md:px-6 border-t ${isDark ? 'border-white/5 bg-black/40' : 'border-[#15110E]/5 bg-white/40'} backdrop-blur-md z-10 flex-shrink-0 mt-auto transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-16">
          {logos.map((u, i) => (
            <img key={i} src={u} className={`h-6 md:h-10 lg:h-12 max-w-[80px] md:max-w-[130px] object-contain transition-all duration-500 ${isDark ? 'filter brightness-0 invert opacity-40 hover:opacity-100' : 'filter brightness-0 opacity-60 hover:opacity-100 hover:scale-110'}`} />
          ))}
        </div>
      </section>
      <FloatingChat />
    </motion.main>
  );
}
