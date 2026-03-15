"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingChat from "@/components/FloatingChat";
import { Code2, Phone, MapPin, Search, Database, Layout, Cpu, Sparkles, TrendingUp, Award } from "lucide-react";
import Link from "next/link";
export default function GlobalPortfolio() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  useEffect(() => { setTimeout(() => setLoading(false), 2000); }, []);
  const t = { ar: {
    nav: { impact: "سجل الأثر", certs: "الشهادات" },
    hero: { welcome: "أهْلاً بِك", name: "سالمين هادي خنبري.", title: "مطور وحلول ذكاء اصطناعي", desc: "سحابة AWS وتطوير ويب.", contact: "تحدث معي", loc: "مكة, SA" },
    impact: { title: "أثر تقني ملموس.", subtitle: "Experience & Outputs" }, logos: "كيانات كنت جزءاً من نجاحها"
  }, en: {
    nav: { impact: "Impact", certs: "Certs" },
    hero: { welcome: "Welcome", name: "Salmeen Hadi Khanbri.", title: "AI Solutions Architect", desc: "AWS Cloud & Web Dev.", contact: "Let's Talk", loc: "Makkah, SA" },
    impact: { title: "Tangible Impact.", subtitle: "Experience & Outputs" }, logos: "Entities I Helped Succeed"
  }};
  const c = t[lang]; const isAr = lang === 'ar';
  const cV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const iV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const logos = ["https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png","https://redp-sa.com/web/images/logo.svg","https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp","https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp","https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp","https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png"];
  const projects = [
    { t: "Aura Marketing", s: "Full Build & SEO", l: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png", d: isAr ? "تأسيس كامل للمنصة و SEO." : "Full Setup & SEO.", o: isAr ? "المركز الأول (#1) في Google." : "#1 Google Ranking.", i: TrendingUp, col: "lg:col-span-2" },
    { t: "Masarat Platform", s: "Laravel Backend", l: "https://redp-sa.com/web/images/logo.svg", d: isAr ? "تحسينات عميقة على الواجهة الخلفية." : "Advanced backend enhancements.", o: isAr ? "رفع أداء النظام واستقرار قواعد البيانات." : "Improved DB stability.", i: Database, col: "lg:col-span-1" },
    { t: "Darb Stations", s: "Media Center", l: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png", d: isAr ? "تصميم صفحة المركز الإعلامي." : "Designed the Media Center.", o: isAr ? "واجهة إعلامية احترافية SEO." : "Professional media hub.", i: Layout, col: "lg:col-span-1" },
    { t: "Akam Cont.", s: "Cloud Hosting", l: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp", d: isAr ? "تجهيز الاستضافة السحابية." : "Cloud hosting setup.", o: isAr ? "إطلاق سحابي متكامل ومستقر." : "Stable cloud launch.", i: Cpu, col: "lg:col-span-2" }
  ];
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-[#15110E] font-alexandria selection:bg-[#A1824A] selection:text-white overflow-x-hidden relative" dir={isAr ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      <AnimatePresence>{loading && (<motion.div exit={{ opacity: 0, y: -50 }} className="fixed inset-0 z-[100] bg-[#15110E] flex items-center justify-center text-white text-4xl font-black font-alexandria" dir="ltr">Salmeen.</motion.div>)}</AnimatePresence>
      <nav className="fixed top-0 w-full h-24 z-50 bg-[#F9F8F6]/90 backdrop-blur-xl border-b border-stone-200/40 px-6 lg:px-12 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center"><div className="text-xl font-black">{isAr?'سالمين':'Salmeen'}<span className="text-[#A1824A]">.</span></div><div className="flex gap-4"><Link href="/portfolio" className="flex items-center gap-2 bg-[#15110E] text-white hover:bg-[#A1824A] transition-colors px-5 py-2 rounded-full text-xs font-bold shadow-md"><Sparkles size={16}/><span>{isAr ? 'معرض الأعمال' : 'Portfolio'}</span></Link><Link href="/certificates" className="flex items-center gap-2 bg-[#15110E]/5 hover:bg-[#15110E] hover:text-white transition-colors px-4 py-2 rounded-full text-xs font-bold"><Award size={16}/><span>{c.nav.certs}</span></Link><button onClick={() => setLang(isAr ? 'en' : 'ar')} className="flex items-center gap-2 bg-white border px-4 py-2 rounded-full text-xs font-bold shadow-sm hover:border-[#A1824A] transition-all"><Search size={16} className="text-[#A1824A]"/>{isAr ? 'EN' : 'عربي'}</button></div></div>
      </nav>
      <section className="min-h-[100svh] flex flex-col justify-center px-6 pt-32 pb-20 relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-start">
            <div className="px-5 py-2 bg-white rounded-full border mb-6 text-sm font-bold flex items-center gap-2 shadow-sm"><Sparkles size={14} className="text-[#A1824A]"/>{c.hero.welcome}</div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">{c.hero.name}<br/><span className="text-[#A1824A]">{isAr ? "خنبري." : "Khanbri."}</span></h1>
            <p className="text-[#15110E] font-bold text-lg md:text-2xl mb-8">{c.hero.title} <span className="text-stone-500 text-sm uppercase">{c.hero.desc}</span></p>
            <a href="https://wa.me/966503026795" className="bg-[#15110E] text-white px-8 py-3.5 rounded-full font-bold text-xs flex gap-3 hover:bg-[#A1824A] transition-colors"><Phone size={18}/> {c.hero.contact}</a>
          </div>
          <div className="relative w-[280px] h-[380px] md:w-[350px] md:h-[480px] shrink-0">
            <div className="absolute inset-0 translate-y-4 rounded-[3rem] bg-[#A1824A]/10 -rotate-2"></div>
            <img src="http://t8ne.space/wp-content/uploads/2026/03/1000050515.webp" alt="Salmeen" className="w-full h-full object-cover object-top rounded-[3rem] relative z-10 hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-6 left-2 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-stone-100" dir="ltr"><div className="w-10 h-10 rounded-xl bg-[#15110E] flex items-center justify-center text-white"><Code2 size={18}/></div><div><p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">Stack</p><p className="text-xs font-black">AWS & AI</p></div></div>
          </div>
        </div>
      </section>
      <section className="py-16 px-6 bg-[#15110E]">
        <div className="max-w-7xl mx-auto text-center"><h4 className="text-[10px] font-bold text-[#A1824A] mb-12">{c.logos}</h4><div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">{logos.map((u, i) => (<div key={i} className="flex items-center justify-center h-12"><img src={u} className="max-h-full max-w-full object-contain hover:scale-110 transition-transform hover:brightness-200" /></div>))}</div></div>
      </section>
      <section className="py-24 px-6 bg-white border-b border-stone-100">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-black mb-3">{c.impact.title}</h2><p className="text-stone-500 font-bold text-xs uppercase tracking-widest">{c.impact.subtitle}</p></div>
            <motion.div variants={cV} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {projects.map((p, i) => { const Icon = p.i; return (
                <motion.div key={i} variants={iV} className={`bg-[#F9F8F6] p-8 rounded-[2rem] border border-stone-200 shadow-sm hover:shadow-xl hover:border-[#A1824A]/50 transition-all duration-500 flex flex-col group ${p.col}`}>
                  <img src={p.l} alt={p.t} className="h-10 w-max object-contain mb-8 group-hover:scale-105 transition-transform" />
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#A1824A]/10 transition-colors"><Icon size={20} className="text-[#A1824A]" /></div>
                  <h3 className="text-xl font-black mb-2" dir="ltr">{p.t}</h3>
                  <p className="text-stone-400 font-bold text-[10px] uppercase tracking-widest mb-4" dir="ltr">{p.s}</p>
                  <p className="text-stone-600 text-sm mb-8 flex-1 leading-relaxed">{p.d}</p>
                  <div className="pt-4 border-t border-stone-200"><p className="font-bold text-xs text-[#15110E] group-hover:text-[#A1824A] transition-colors">{p.o}</p></div>
                </motion.div>
              )})}
            </motion.div>
         </div>
      </section>
      <footer className="py-20 px-6 bg-[#15110E] text-center border-t-4 border-[#A1824A]">
         <h2 className="text-2xl font-black text-white mb-10">{isAr ? "فلنتحدث بلغة النتائج." : "Let's talk results."}</h2>
         <div className="flex justify-center gap-6 font-bold text-[10px] text-stone-300"><a href="https://wa.me/966503026795" className="flex items-center gap-3 hover:text-white" dir="ltr"><Phone size={16} className="text-[#A1824A]"/> +966 50 302 6795</a></div>
         <p className="mt-16 text-[9px] text-stone-500 font-bold tracking-[0.2em]" dir="ltr">Salmeen Hadi Khanbri © 2026</p>
      </footer>
      <FloatingChat />
    </main>
  );
}
