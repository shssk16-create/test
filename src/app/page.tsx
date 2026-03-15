"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingChat from "@/components/FloatingChat";
import { Phone, Sparkles, ArrowLeft, Award } from "lucide-react";
import Link from "next/link";

export default function GlobalPortfolio() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  useEffect(() => { setTimeout(() => setLoading(false), 1500); }, []);
  const isAr = lang === 'ar';
  
  const logos = ["https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png","https://redp-sa.com/web/images/logo.svg","https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp","https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp","https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp","https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png"];

  return (
    <main className="min-h-screen bg-[#F9F8F6] text-[#15110E] font-alexandria flex flex-col relative" dir={isAr ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      <AnimatePresence>{loading && (<motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#15110E] flex items-center justify-center text-white text-4xl font-black font-alexandria">Salmeen.</motion.div>)}</AnimatePresence>
      
      <nav className="w-full h-24 z-50 px-6 lg:px-12 flex items-center justify-between">
        <div className="text-xl font-black">{isAr?'سالمين':'Salmeen'}<span className="text-[#A1824A]">.</span></div>
        <div className="flex gap-4">
          <Link href="/certificates" className="flex items-center gap-2 bg-[#15110E]/5 px-4 py-2 rounded-full text-xs font-bold hover:bg-[#15110E] hover:text-white transition-colors"><Award size={16}/><span>{isAr ? 'الشهادات' : 'Certs'}</span></Link>
          <button onClick={() => setLang(isAr ? 'en' : 'ar')} className="bg-white border px-4 py-2 rounded-full text-xs font-bold shadow-sm">{isAr ? 'EN' : 'عربي'}</button>
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10 -mt-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="px-5 py-2 bg-white rounded-full border mb-8 text-sm font-bold flex items-center gap-2 shadow-sm text-[#A1824A]"><Sparkles size={14} /> {isAr ? 'مطور حلول ذكاء اصطناعي وبنية سحابية' : 'AI & Cloud Solutions Architect'}</div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-[#15110E]">{isAr ? "سالمين هادي خنبري." : "Salmeen Hadi Khanbri."}</h1>
          <p className="text-stone-500 font-medium text-lg md:text-2xl mb-12 max-w-2xl leading-relaxed">{isAr ? "أبني منصات رقمية متكاملة، من هندسة الاستضافات السحابية إلى تصميم الواجهات وصياغة المحتوى المتوافق مع محركات البحث." : "Building comprehensive digital platforms, from cloud architecture to UI design and SEO-optimized content."}</p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/portfolio" className="bg-[#A1824A] text-white px-8 py-4 rounded-full font-black text-sm flex items-center gap-3 hover:bg-[#15110E] hover:scale-105 transition-all shadow-xl shadow-[#A1824A]/20">{isAr ? 'استكشف معرض الأعمال' : 'Explore Portfolio'} <ArrowLeft size={18} className="rtl:rotate-180"/></Link>
            <a href="https://wa.me/966503026795" className="bg-white border text-[#15110E] px-8 py-4 rounded-full font-bold text-sm flex items-center gap-3 hover:bg-stone-50 transition-colors"><Phone size={18}/> {isAr ? 'تحدث معي مباشرة' : 'Contact Me'}</a>
          </div>
        </motion.div>
      </section>

      <section className="py-12 px-6 border-t border-stone-200/50 bg-white/50">
        <div className="max-w-7xl mx-auto text-center"><p className="text-[10px] font-bold text-stone-400 mb-6 uppercase tracking-widest">{isAr ? 'كيانات صنعت أثرها الرقمي' : 'Trusted By'}</p><div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">{logos.map((u, i) => (<img key={i} src={u} className="h-8 max-w-[100px] object-contain" />))}</div></div>
      </section>
      <FloatingChat />
    </main>
  );
}
