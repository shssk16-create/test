"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ExternalLink, Code2, Database, Layout, Search, Server } from "lucide-react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import FloatingChat from "@/components/FloatingChat";

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const projects = [
    { id: 1, title: "Aura Marketing", cat: "web", img: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png", role: "WordPress & Content", tech: ["WordPress", "SEO", "Content"], desc: "تأسيس المنصة بنظام ووردبريس مع صياغة محتوى احترافي يخدم استراتيجية محركات البحث وتصدر النتائج.", impact: "المركز #1 في قوقل.", icon: Search },
    { id: 2, title: "Akam Cont.", cat: "web", img: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp", role: "Full-Stack & Content", tech: ["PHP", "WordPress", "Cloud"], desc: "تطوير المنصة وتجهيز الاستضافة السحابية.", impact: "إطلاق متكامل وهوية قوية.", icon: Server },
    { id: 3, title: "Masarat", cat: "backend", img: "https://redp-sa.com/web/images/logo.svg", role: "Backend Architecture", tech: ["Laravel", "PHP", "MySQL"], desc: "تحسينات معمارية عميقة على الواجهة الخلفية.", impact: "استقرار وقوة أداء فائق.", icon: Database },
    { id: 4, title: "Bathq Company", cat: "web", img: "https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp", role: "Web Dev & Copywriting", tech: ["PHP", "WordPress", "Copywriting"], desc: "بناء وتطوير الموقع بالكامل مع صياغة المحتوى ليعكس رؤية الشركة بوضوح وبناء تجربة مستخدم عصرية.", impact: "حضور رقمي احترافي.", icon: Code2 },
    { id: 5, title: "Darb Stations", cat: "ui", img: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png", role: "Block WordPress", tech: ["Block Theme", "UI/UX", "SEO"], desc: "تصميم صفحة المركز الإعلامي الحديثة.", impact: "مرونة عالية في التعديل.", icon: Layout }
  ];
  const filters = [{ id: 'all', label: 'الكل' }, { id: 'web', label: 'ويب ومحتوى' }, { id: 'backend', label: 'أنظمة خلفية' }, { id: 'ui', label: 'واجهات UX/UI' }];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);

  // تعريف شبكة البنتو (Bento Grid) غير المتماثلة
  const bentoClasses = [
    "md:col-span-2 md:row-span-2", // Aura (كبير جداً)
    "md:col-span-1 md:row-span-1", // Akam (مربع)
    "md:col-span-1 md:row-span-1", // Masarat (مربع)
    "md:col-span-2 md:row-span-1", // Bathq (مستطيل عريض)
    "md:col-span-1 md:row-span-1"  // Darb (مربع)
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-alexandria selection:bg-[#A1824A] pb-32 relative overflow-hidden" dir="rtl">
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#A1824A]/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      <nav className="w-full h-24 flex items-center px-6 lg:px-12 border-b border-white/5 bg-[#050505]/40 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="text-xl font-black text-white hover:text-[#A1824A] transition-colors tracking-widest">سالمين<span className="text-[#A1824A]">.</span></Link>
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-white transition-colors bg-white/5 px-5 py-2.5 rounded-full border border-white/10">العودة للرئيسية <ArrowRight size={14}/></Link>
        </div>
      </nav>

      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#A1824A]/10 rounded-full border border-[#A1824A]/20 mb-6 text-xs font-black text-[#A1824A] uppercase tracking-widest"><Sparkles size={14} /> المعرض الفاخر 3D</div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 leading-[1.8] pb-10 pt-4 overflow-visible">أعمال تتحدث <span className="text-[#A1824A]">بلغة الأرقام.</span></h1>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`px-6 py-3 rounded-full text-xs font-black transition-all duration-300 border ${filter === f.id ? 'bg-[#A1824A] text-white border-[#A1824A] shadow-[0_0_20px_rgba(161,130,74,0.4)]' : 'bg-transparent text-stone-500 border-white/10 hover:border-white/30 hover:text-white'}`}>{f.label}</button>
          ))}
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto z-10 relative">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          <AnimatePresence>
            {filtered.map((p, i) => { const Icon = p.icon; const isLarge = i === 0 && filter === 'all'; return (
              <motion.div layout initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, delay: i * 0.1 }} key={p.id} className={filter === 'all' ? bentoClasses[i] : "col-span-1"}>
                <Tilt glareEnable={true} glareMaxOpacity={0.15} glareColor="#A1824A" glarePosition="all" tiltMaxAngleX={isLarge ? 4 : 8} tiltMaxAngleY={isLarge ? 4 : 8} className="h-full w-full">
                  <div className="h-full w-full bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-[2rem] border border-white/10 p-8 flex flex-col group relative overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#A1824A]/50 hover:shadow-[0_10px_40px_rgba(161,130,74,0.2)]">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#A1824A] opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-700 rounded-full"></div>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div className="bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-500 h-16 w-auto min-w-[100px]">
                         <img src={p.img} alt={p.title} className="max-h-full max-w-[120px] object-contain" />
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-[#A1824A]/10 flex items-center justify-center border border-[#A1824A]/20 group-hover:bg-[#A1824A] transition-colors"><Icon size={20} className="text-[#A1824A] group-hover:text-white" /></div>
                    </div>
                    <h3 className={`font-black text-white drop-shadow-md leading-[1.6] pb-2 ${isLarge ? 'text-4xl md:text-5xl mt-auto' : 'text-2xl md:text-3xl'}`} dir="ltr">{p.title}</h3>
                    <p className="text-[#A1824A] font-black text-[10px] uppercase tracking-widest mb-4" dir="ltr">{p.role}</p>
                    <p className={`text-stone-400 leading-[1.8] flex-1 ${isLarge ? 'text-base md:text-lg max-w-xl' : 'text-sm'}`}>{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-6 mb-6" dir="ltr">
                      {p.tech.map((t, x) => <span key={x} className="px-3 py-1.5 bg-black/50 text-stone-300 text-[10px] font-bold rounded-lg border border-white/5 shadow-inner">{t}</span>)}
                    </div>
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                      <p className="font-black text-xs text-white bg-[#A1824A]/20 px-4 py-2 rounded-full border border-[#A1824A]/30">{p.impact}</p>
                      <ExternalLink size={18} className="text-stone-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            )})}
          </AnimatePresence>
        </motion.div>
      </section>
      <FloatingChat />
    </main>
  );
}
