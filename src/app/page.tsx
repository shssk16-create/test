"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingChat from "@/components/FloatingChat";
import ParticleNetwork from "@/components/ParticleNetwork";
import { Phone, Sparkles, ArrowLeft, ArrowRight, Award } from "lucide-react";
import Link from "next/link";

export default function GlobalPortfolio() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true);
    const saved = localStorage.getItem('sk_lang');
    if(saved) setLang(saved as 'ar'|'en');
    setTimeout(() => setLoading(false), 1200); 
  }, []);

  const toggleLang = () => {
    const n = lang === 'ar' ? 'en' : 'ar';
    setLang(n);
    localStorage.setItem('sk_lang', n);
  };

  const isAr = lang === 'ar';
  const logos = ["https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png","https://redp-sa.com/web/images/logo.svg","https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp","https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp","https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp","https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png"];

  if(!mounted) return null;

  return (
    <motion.main initial={{ opacity: 0, filter: 'blur(15px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.7 }} className={`min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden ${isAr ? 'font-alexandria' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      <AnimatePresence>{loading && (<motion.div exit={{ opacity: 0, scale: 1.1 }} className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center text-white text-5xl font-black tracking-widest">SK.</motion.div>)}</AnimatePresence>
      <ParticleNetwork />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#A1824A]/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <nav className="w-full h-20 md:h-24 z-50 px-4 md:px-12 flex items-center justify-between border-b border-white/5 bg-[#050505]/60 backdrop-blur-xl">
        <div className="text-xl md:text-2xl font-black tracking-widest">{isAr?'سالمين':'SALMEEN'}<span className="text-[#A1824A]">.</span></div>
        <div className="flex gap-2 md:gap-4 items-center">
          <Link href="/portfolio" className="flex items-center gap-2 bg-gradient-to-r from-[#A1824A] to-yellow-600 text-black px-3 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black shadow-[0_0_15px_rgba(161,130,74,0.4)] hover:scale-105 transition-transform"><Sparkles size={14} className="md:w-4 md:h-4"/><span className="hidden md:inline">{isAr ? 'معرض الأعمال' : 'Portfolio'}</span><span className="md:hidden">{isAr ? 'الأعمال' : 'Work'}</span></Link>
          <Link href="/certificates" className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-[#A1824A] hover:border-[#A1824A] transition-all"><Award size={14} className="md:w-4 md:h-4"/><span className="hidden md:inline">{isAr ? 'الشهادات' : 'Certs'}</span><span className="md:hidden">{isAr ? 'شهادات' : 'Certs'}</span></Link>
          <button onClick={toggleLang} className="bg-white text-black px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black shadow-lg hover:scale-105 transition-transform">{isAr ? 'EN' : 'عربي'}</button>
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 text-center z-10 -mt-5 md:-mt-10">
        <AnimatePresence mode="wait">
          <motion.div key={lang} initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }} transition={{ duration: 0.4 }} className="max-w-4xl mx-auto flex flex-col items-center w-full">
            <div className="px-4 md:px-5 py-1.5 md:py-2 bg-[#A1824A]/10 rounded-full border border-[#A1824A]/30 mb-6 md:mb-8 text-[10px] md:text-xs font-black tracking-widest flex items-center gap-2 text-[#A1824A] uppercase"><Sparkles size={14} /> {isAr ? 'مطور حلول ذكاء اصطناعي وبنية سحابية' : 'AI & Cloud Solutions Architect'}</div>
            <h1 className={`text-4xl sm:text-6xl md:text-8xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 drop-shadow-2xl overflow-visible ${isAr ? 'leading-[1.8] pb-6 md:pb-10 pt-2 md:pt-4' : 'leading-tight pb-4 md:pb-6'}`}>{isAr ? "سالمين خنبري." : "Salmeen Khanbri."}</h1>
            <p className="text-stone-400 font-medium text-sm md:text-xl mb-8 md:mb-12 max-w-2xl leading-[1.8] md:leading-[2] px-2">{isAr ? "أبني منصات رقمية متكاملة. يمكنك تصفح معرض أعمالي من الأعلى، أو التحدث مباشرة مع مساعدي الذكي ليجيب على كافة استفساراتك حول خبراتي وتقنياتي." : "Building comprehensive digital platforms. Explore my portfolio from the menu above or chat with my custom-built AI assistant for any inquiries."}</p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <a href="https://wa.me/966503026795" target="_blank" rel="noopener noreferrer" className="relative group px-6 md:px-8 py-3 md:py-4 rounded-full font-black text-xs md:text-sm flex items-center gap-3 overflow-hidden bg-white text-black transition-all hover:scale-105 shadow-xl">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 flex items-center gap-2 md:gap-3 group-hover:text-white"><Phone size={16} className="md:w-5 md:h-5"/> {isAr ? 'تحدث معي مباشرة' : 'Chat on WhatsApp'} {isAr ? <ArrowLeft size={16}/> : <ArrowRight size={16}/>}</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="py-6 md:py-10 px-4 md:px-6 border-t border-white/5 bg-black/40 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-16">
          {logos.map((u, i) => (
            <img key={i} src={u} className="h-6 md:h-10 lg:h-12 max-w-[80px] md:max-w-[130px] object-contain filter brightness-0 invert opacity-40 hover:opacity-100 hover:scale-110 transition-all duration-500" />
          ))}
        </div>
      </section>
      <FloatingChat />
    </motion.main>
  );
}
