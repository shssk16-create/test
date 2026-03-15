"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingChat from "@/components/FloatingChat";
import ParticleNetwork from "@/components/ParticleNetwork";
import { Phone, Sparkles, ArrowLeft, Award } from "lucide-react";
import Link from "next/link";

export default function GlobalPortfolio() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  useEffect(() => { setTimeout(() => setLoading(false), 1500); }, []);
  const isAr = lang === 'ar';
  
  const logos = ["https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png","https://redp-sa.com/web/images/logo.svg","https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp","https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp","https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp","https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png"];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-alexandria flex flex-col relative overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      <AnimatePresence>{loading && (<motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center text-white text-4xl font-black">Salmeen.</motion.div>)}</AnimatePresence>
      <ParticleNetwork />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A1824A]/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <nav className="w-full h-24 z-50 px-6 lg:px-12 flex items-center justify-between border-b border-white/5 bg-[#050505]/40 backdrop-blur-md">
        <div className="text-xl font-black tracking-widest">{isAr?'سالمين':'SALMEEN'}<span className="text-[#A1824A]">.</span></div>
        <div className="flex gap-4">
          <Link href="/certificates" className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#A1824A] hover:border-[#A1824A] transition-all"><Award size={16}/><span>{isAr ? 'الشهادات' : 'Certs'}</span></Link>
          <button onClick={() => setLang(isAr ? 'en' : 'ar')} className="bg-white text-black px-4 py-2.5 rounded-full text-xs font-black shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">{isAr ? 'EN' : 'عربي'}</button>
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10 -mt-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="px-5 py-2 bg-[#A1824A]/10 rounded-full border border-[#A1824A]/30 mb-8 text-xs font-black tracking-widest flex items-center gap-2 text-[#A1824A] uppercase"><Sparkles size={14} /> {isAr ? 'مطور حلول ذكاء اصطناعي وبنية سحابية' : 'AI & Cloud Solutions Architect'}</div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-500 drop-shadow-2xl">{isAr ? "سالمين خنبري." : "Salmeen Khanbri."}</h1>
          <p className="text-stone-400 font-medium text-lg md:text-xl mb-12 max-w-2xl leading-relaxed">{isAr ? "أبني منصات رقمية متكاملة. يمكنك تصفح معرض أعمالي بالأسفل، أو التحدث مباشرة مع مساعدي الذكي (الذي بنيته بيدي) ليجيب على كافة استفساراتك حول خبراتي وتقنياتي." : "Building comprehensive digital platforms, from cloud architecture to UI design and SEO-optimized content."}</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/portfolio" className="relative group px-8 py-4 rounded-full font-black text-sm flex items-center gap-3 overflow-hidden bg-white text-black transition-all hover:scale-105">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#A1824A] to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 flex items-center gap-3 group-hover:text-white">{isAr ? 'استكشف معرض الأعمال' : 'Explore Portfolio'} <ArrowLeft size={18} className="rtl:rotate-180"/></span>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-10 px-6 border-t border-white/5 bg-black/20 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">{logos.map((u, i) => (<img key={i} src={u} className="h-7 max-w-[100px] object-contain drop-shadow-lg" />))}</div>
      </section>
      <FloatingChat />
    </main>
  );
}
