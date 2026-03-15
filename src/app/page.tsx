"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingChat from "@/components/FloatingChat";
import { Code2, Phone, MapPin, Search, Bot, Database, LayOut, Cpu, Sparkles, TrendingUp, Award, Clock } from "lucide-react";
import Link from "next/link";

export default function GlobalPortfolio() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  useEffect(() => { setTimeout(() => setLoading(false), 2000); }, []);

  const t = { ar: {
    nav: { impact: "سجل الأثر", certs: "الشهادات", chatbot: "المساعد الذكي" },
    hero: { welcome: "أهْلاً بِك", name: "سالمين هادي خنبري.", title: "مقدر ومطور حلول ذكاء اصطناعي", desc: "سحابة AWS وتطوير ويب متقدم.", contact: "تحدث معي مباشرة", loc: "مكة المكرمة, SA" },
    impact: { title: "أثر تقني ملموس.", subtitle: "Experience & Outputs" }
  },
  en: {
    nav: { impact: "Impact", certs: "Certificates", chatbot: "Chatbot" },
    hero: { welcome: "Welcome", name: "Salmeen Hadi Khanbri.", title: "AI Solutions Architect", desc: "AWS Cloud & Advanced Web Development.", contact: "Talk Directly", loc: "Makkah, SA" },
    impact: { title: "Tangible Tech Impact.", subtitle: "Experience & Outputs" }
  }};
  const c = t[lang]; const isAr = lang === 'ar';
  
  const cV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const iV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const projects = [
    { t: "Aura Marketing", s: "Full Build & SEO", l: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png", d: isAr ? "تأسيس كامل للمنصة و SEO." : "Full Platform Setup & SEO.", o: isAr ? "المركز الأول (#1) في Google لثلاث كلمات مفتاحية." : "#1 Google Ranking for 3 keywords.", i: TrendingUp },
    { t: "Masarat Platform", s: "Laravel Backend", l: "https://redp-sa.com/web/images/logo.svg", d: isAr ? "تحسينات عميقة على الواجهة الخلفية Laravel." : "Executed advanced Laravel backend architectural enhancements.", o: isAr ? "رفع أداء النظام واستقرار قواعد البيانات." : "Improved system performance & DB stability.", i: Database },
    { t: "Darb Stations", s: "Media Center & SEO", l: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png", d: isAr ? "تصميم صفحة المركز الإعلامي مع تجربة مستخدم لغوية." : "Designed the Media Center with optimized UX/UI.", o: isAr ? "واجهة إعلامية احترافية تتوافق مع معايير SEO." : "Professional media hub supporting SEO standards.", i: Layout },
    { t: "Akam Cont.", s: "Platform Development", l: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp", d: isAr ? "تطوير المنصات و تجهيز الاستضافة السحابية." : "Developed platforms & setup cloud hosting.", o: isAr ? "إطلاق سحابي متكامل ومستقر للأعمال." : "Stable cloud launch and optimized operations.", i: Cpu }
  ];
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      <AnimatePresence>{loading && (<motion.div exit={{ opacity: 0, y: -50 }} className="fixed inset-0 z-[100] bg-[#15110E] flex items-center justify-center text-white text-4xl font-black font-alexandria" dir="ltr">Salmeen.</motion.div>)}</AnimatePresence>
      <main className="min-h-screen bg-[#F9F8F6] text-[#15110E] font-alexandria selection:bg-[#A1824A] selection:text-white overflow-x-hidden relative" dir={isAr ? 'rtl' : 'ltr'}>
        
        <nav className="fixed top-0 w-full h-24 z-50 bg-[#F9F8F6]/80 backdrop-blur-xl border-b border-stone-200/40 px-6 lg:px-12 flex items-center">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2"><Sparkles className="text-[#A1824A]"/><span className="text-xl font-black text-[#15110E] tracking-tight">{c.hero.name}</span></div>
            <div className="flex items-center gap-4">
              <Link href="/certificates" className="flex items-center gap-2 bg-[#15110E]/5 hover:bg-[#15110E] hover:text-white px-5 py-2.5 rounded-full text-xs font-bold"><Award size={16}/><span>{c.nav.certs}</span></Link>
              <button onClick={() => setLang(isAr ? 'en' : 'ar')} className="flex items-center gap-2 bg-white border px-4 py-2.5 rounded-full text-xs font-bold shadow-sm"><Search size={16} className="text-[#A1824A]"/>{isAr ? 'EN' : 'عربي'}</button>
            </div>
          </div>
        </nav>
        <AnimatePresence mode="wait">
          <motion.div key={lang} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5 }}>
            <section className="min-h-[100svh] flex flex-col items-center justify-center px-6 pt-32 pb-20 relative">
              <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                
                <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-start">
                  <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full border mb-6 shadow-sm"><Sparkles size={14} className="text-[#A1824A]"/><span className="text-sm font-bold text-stone-600">{c.hero.welcome}</span></div>
                  <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">{c.hero.name}<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#15110E] to-[#A1824A]">{isAr ? "خنبري." : "Khanbri."}</span></h1>
                  <p className="text-[#A1824A] font-bold text-lg md:text-2xl mb-10">{c.hero.title} <span className="text-stone-500 font-medium text-xs md:text-sm uppercase">{c.hero.desc}</span></p>
                  <div className="flex flex-wrap items-center gap-4"><a href="https://wa.me/966503026795" className="bg-[#15110E] text-white px-8 py-3 rounded-full font-bold text-xs flex items-center gap-3 w-max hover:bg-[#A1824A]"><Phone size={18}/> {c.hero.contact}</a><div className="text-xs font-medium text-stone-500 flex items-center gap-2"><MapPin size={16} className="text-[#A1824A]"/> {c.hero.loc}</div></div>
                </div>

                <div className="relative w-[280px] h-[370px] md:w-[360px] md:h-[480px] shrink-0 lg:-translate-x-8">
                  <div className="absolute inset-0 translate-y-4 rounded-[3rem] bg-[#A1824A]/10 -rotate-2"></div>
                  <div className="w-full h-full rounded-[3rem] overflow-hidden border-[6px] border-white shadow-xl relative z-10"><img src="http://t8ne.space/wp-content/uploads/2026/03/1000050515.webp" alt="Salmeen" className="w-full h-full object-cover object-top hover:scale-105 transition-all" /></div>
                  <div className="absolute bottom-6 left-6 bg-white p-3 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-stone-100" dir="ltr"><div className="w-10 h-10 rounded-xl bg-[#15110E] flex items-center justify-center text-white"><Code2 size={18}/></div><div><p className="text-[9px] text-stone-400">Stack</p><p className="text-xs font-black text-[#15110E]">AWS & AI</p></div></div>
                </div>
              </div>
            </section>
            <section className="py-24 px-6 bg-stone-50 border-y border-stone-200">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-black mb-3 text-[#15110E]">{c.impact.title}</h2><p className="text-stone-500 font-bold text-xs uppercase tracking-widest">{c.impact.subtitle}</p></div>
                  <motion.div variants={cV} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {projects.map((p, i) => { const Icon = p.i; return (
                      <motion.div key={i} variants={iV} className="bg-white p-8 rounded-[2rem] border shadow-sm flex flex-col group hover:shadow-2xl hover:border-[#A1824A]/50 transition-all duration-500 overflow-hidden relative">
                        <div className="flex-1">
                          <img src={p.l} alt={p.t} className="h-10 w-max object-contain mb-8 group-hover:scale-110 transition-transform"/>
                          <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center mb-6 border group-hover:bg-[#A1824A]/10"><Icon size={20} className="text-[#15110E] group-hover:text-[#A1824A]" /></div>
                          <h3 className="text-lg font-black text-[#15110E] mb-2" dir="ltr">{p.t}</h3>
                          <p className="text-stone-400 font-bold text-[9px] mb-4" dir="ltr">{p.s}</p>
                          <p className="text-stone-500 text-sm leading-relaxed mb-8">{p.d}</p>
                        </div>
                        <div className="pt-4 border-t border-stone-100 mt-auto"><p className="font-bold text-xs text-[#15110E] leading-relaxed group-hover:text-[#A1824A]">{p.o}</p></div>
                      </motion.div>
                    )})}
                  </motion.div>
               </div>
            </section>
            <footer className="py-20 px-6 bg-[#15110E] text-center border-t-4 border-[#A1824A]">
               <h2 className="text-2xl md:text-3xl font-black text-white mb-10">{isAr ? "فلنتحدث بلغة النتائج." : "Let's talk results."}</h2>
               <div className="flex flex-wrap justify-center gap-6 font-bold text-[10px] text-stone-300">
                  <a href="https://wa.me/966503026795" className="flex items-center gap-3 hover:text-white" dir="ltr"><Phone size={16} className="text-[#A1824A]"/> +966 50 302 6795</a>
               </div>
               <p className="mt-16 text-[9px] text-stone-500 font-bold tracking-[0.2em]" dir="ltr">Salmeen Hadi Khanbri © 2026</p>
            </footer>
          </motion.div>
        </AnimatePresence>
        <FloatingChat />
      </main>
    </>
  );
}
