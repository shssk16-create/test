"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ExternalLink, Code2, Database, Layout, Search, Server } from "lucide-react";
import Link from "next/link";
import FloatingChat from "@/components/FloatingChat";

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    { id: 1, title: "Aura Marketing", cat: "web", img: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png", role: "WordPress & Content", tech: ["WordPress", "Content Writing", "SEO"], desc: "تأسيس المنصة بنظام ووردبريس مع صياغة محتوى احترافي يخدم استراتيجية محركات البحث.", impact: "المركز #1 في قوقل لـ 3 كلمات مفتاحية.", icon: Search },
    { id: 2, title: "Akam Cont.", cat: "web", img: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp", role: "Full-Stack & Content", tech: ["PHP", "WordPress", "Content Writing", "Cloud"], desc: "تطوير المنصة برمجياً مع صياغة محتوى احترافي وتجهيز الاستضافة السحابية.", impact: "إطلاق متكامل وهوية رقمية قوية للأعمال.", icon: Server },
    { id: 3, title: "Masarat Platform", cat: "backend", img: "https://redp-sa.com/web/images/logo.svg", role: "Backend Architecture", tech: ["Laravel", "PHP", "MySQL", "DB Optimization"], desc: "تحسينات معمارية عميقة على الواجهة الخلفية لنظام مسارات.", impact: "استقرار قواعد البيانات وأداء فائق للنظام.", icon: Database },
    { id: 4, title: "Bathq", cat: "web", img: "https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp", role: "Web Dev & Copywriting", tech: ["PHP", "WordPress", "Content Writing"], desc: "بناء وتطوير الموقع بالكامل مع صياغة المحتوى ليعكس رؤية الشركة بوضوح.", impact: "حضور رقمي احترافي وتجربة مستخدم سلسة.", icon: Code2 },
    { id: 5, title: "Darb Stations", cat: "ui", img: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png", role: "Block WordPress & UI", tech: ["Block WordPress", "UI/UX", "Frontend"], desc: "تصميم وهندسة صفحة المركز الإعلامي باستخدام نظام بلوكات ووردبريس الحديث (Block Theme).", impact: "مرونة عالية في التعديل وتوافق مع معايير SEO.", icon: Layout }
  ];
  const filters = [{ id: 'all', label: 'الكل' }, { id: 'web', label: 'تطوير ويب ومحتوى' }, { id: 'backend', label: 'أنظمة خلفية' }, { id: 'seo', label: 'SEO وتصدر' }, { id: 'ui', label: 'واجهات UX/UI' }];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-alexandria selection:bg-[#A1824A] selection:text-white pb-32" dir="rtl">
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      <nav className="w-full h-24 flex items-center px-6 lg:px-12 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="text-xl font-black text-white hover:text-[#A1824A] transition-colors">سالمين<span className="text-[#A1824A]">.</span></Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-stone-400 hover:text-white transition-colors">العودة للرئيسية <ArrowRight size={16}/></Link>
        </div>
      </nav>
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-[#A1824A]/20 blur-[120px] -z-10 rounded-full"></div>
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 rounded-full border border-white/10 mb-6 text-sm font-bold text-[#A1824A] backdrop-blur-sm"><Sparkles size={14} /> معرض الأعمال الفاخر</div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">مشاريع تتحدث <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A1824A] to-yellow-600">بلغة النتائج.</span></h1>
        <p className="text-stone-400 max-w-2xl mx-auto font-medium leading-relaxed mb-16 text-lg">بنية تحتية صلبة، واجهات تخطف الأنظار، ومحتوى يتربع على عرش محركات البحث.</p>
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 border ${filter === f.id ? 'bg-[#A1824A] text-white border-[#A1824A] shadow-[0_0_20px_rgba(161,130,74,0.4)]' : 'bg-transparent text-stone-400 border-white/10 hover:border-white/30 hover:text-white'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </section>
      <section className="px-6 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((p) => { const Icon = p.icon; return (
              <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} key={p.id} className="bg-[#111111] rounded-[2rem] border border-white/5 p-8 flex flex-col group hover:border-[#A1824A]/50 transition-all duration-500 relative overflow-hidden hover:shadow-[0_10px_40px_rgba(161,130,74,0.1)]">
                <div className="h-16 flex items-center justify-between mb-10 relative z-10">
                  <div className="bg-white px-4 py-3 rounded-2xl h-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500 border border-stone-200">
                     <img src={p.img} alt={p.title} className="max-h-full max-w-[110px] object-contain" />
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#A1824A] group-hover:border-[#A1824A] transition-colors"><Icon size={20} className="text-stone-300 group-hover:text-white" /></div>
                </div>
                <h3 className="text-3xl font-black mb-2 text-white" dir="ltr">{p.title}</h3>
                <p className="text-[#A1824A] font-bold text-xs uppercase tracking-widest mb-6" dir="ltr">{p.role}</p>
                <p className="text-stone-400 text-sm leading-relaxed mb-8 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8" dir="ltr">
                  {p.tech.map((t, i) => <span key={i} className="px-3 py-1.5 bg-[#A1824A]/10 text-[#A1824A] text-[10px] font-bold rounded-lg border border-[#A1824A]/20">{t}</span>)}
                </div>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <p className="font-black text-sm text-white group-hover:text-[#A1824A] transition-colors">{p.impact}</p>
                  <ExternalLink size={18} className="text-stone-500 group-hover:text-[#A1824A] transition-colors" />
                </div>
              </motion.div>
            )})}
          </AnimatePresence>
        </motion.div>
      </section>
      <FloatingChat />
    </main>
  );
}
