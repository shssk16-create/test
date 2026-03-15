"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ExternalLink, Code2, Database, Layout, Search, Server } from "lucide-react";
import Link from "next/link";

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    { id: 1, title: "Aura Marketing", cat: "web", img: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png", role: "WordPress & Content", tech: ["WordPress", "Content Writing", "SEO"], desc: "تأسيس المنصة بنظام ووردبريس مع صياغة محتوى احترافي يخدم استراتيجية محركات البحث.", impact: "المركز #1 في قوقل لـ 3 كلمات مفتاحية.", icon: Search },
    { id: 2, title: "Akam Cont.", cat: "web", img: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp", role: "Full-Stack & Content", tech: ["PHP", "WordPress", "Content Writing", "Cloud"], desc: "تطوير المنصة برمجياً مع صياغة محتوى احترافي وتجهيز الاستضافة السحابية.", impact: "إطلاق متكامل وهوية رقمية قوية للأعمال.", icon: Server },
    { id: 3, title: "Masarat Platform", cat: "backend", img: "https://redp-sa.com/web/images/logo.svg", role: "Backend Architecture", tech: ["Laravel", "PHP", "MySQL", "DB Optimization"], desc: "تحسينات معمارية عميقة على الواجهة الخلفية لنظام مسارات.", impact: "استقرار قواعد البيانات وأداء فائق للنظام.", icon: Database },
    { id: 4, title: "Bathq", cat: "web", img: "https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp", role: "Web Dev & Copywriting", tech: ["PHP", "WordPress", "Content Writing"], desc: "بناء وتطوير الموقع بالكامل مع صياغة المحتوى ليعكس رؤية الشركة بوضوح.", impact: "حضور رقمي احترافي وتجربة مستخدم سلسة.", icon: Code2 },
    { id: 5, title: "Darb Stations", cat: "ui", img: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png", role: "Block WordPress & UI", tech: ["Block WordPress", "UI/UX", "Frontend"], desc: "تصميم وهندسة صفحة المركز الإعلامي باستخدام نظام بلوكات ووردبريس الحديث (Block Theme).", impact: "مرونة عالية في التعديل وتوافق مع معايير SEO.", icon: Layout }
  ];

  const filters = [
    { id: 'all', label: 'الكل' }, { id: 'web', label: 'تطوير ويب ومحتوى' }, { id: 'backend', label: 'أنظمة خلفية' }, { id: 'seo', label: 'SEO وتصدر' }, { id: 'ui', label: 'واجهات UX/UI' }
  ];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-[#15110E] font-alexandria selection:bg-[#A1824A] selection:text-white pb-24" dir="rtl">
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      <nav className="w-full h-24 flex items-center px-6 lg:px-12 border-b border-stone-200/50 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="text-xl font-black hover:text-[#A1824A] transition-colors">سالمين<span className="text-[#A1824A]">.</span></Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-[#15110E] transition-colors">العودة للرئيسية <ArrowRight size={16}/></Link>
        </div>
      </nav>
      <section className="pt-20 pb-12 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full border mb-6 text-sm font-bold shadow-sm"><Sparkles size={14} className="text-[#A1824A]"/> معرض الأعمال</div>
        <h1 className="text-4xl md:text-5xl font-black mb-6">مشاريع تتحدث <span className="text-[#A1824A]">بلغة النتائج.</span></h1>
        <p className="text-stone-500 max-w-2xl mx-auto font-medium leading-relaxed mb-12">مزيج هندسي بين البنية التحتية الصلبة، الواجهات الجذابة، والمحتوى الذي يخدم أهداف الأعمال بشكل مباشر.</p>
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${filter === f.id ? 'bg-[#15110E] text-white shadow-lg' : 'bg-white text-stone-600 border hover:border-[#A1824A] hover:text-[#15110E]'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </section>
      <section className="px-6 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((p) => { const Icon = p.icon; return (
              <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} key={p.id} className="bg-white rounded-[2rem] border border-stone-200 p-8 flex flex-col group hover:shadow-2xl hover:border-[#A1824A]/40 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A1824A]/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="h-14 flex items-center justify-between mb-8">
                  <img src={p.img} alt={p.title} className="max-h-full max-w-[120px] object-contain drop-shadow-sm group-hover:scale-105 transition-transform" />
                  <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center border group-hover:bg-[#A1824A] group-hover:text-white transition-colors"><Icon size={18} /></div>
                </div>
                <h3 className="text-2xl font-black mb-1 text-[#15110E]" dir="ltr">{p.title}</h3>
                <p className="text-[#A1824A] font-bold text-xs uppercase tracking-widest mb-6" dir="ltr">{p.role}</p>
                <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8" dir="ltr">
                  {p.tech.map((t, i) => <span key={i} className="px-3 py-1 bg-[#15110E]/5 text-[#15110E] text-[10px] font-bold rounded-md border border-transparent group-hover:border-[#15110E]/10 transition-colors">{t}</span>)}
                </div>
                <div className="pt-5 border-t border-stone-100 flex items-center justify-between">
                  <p className="font-bold text-xs text-[#15110E] group-hover:text-[#A1824A] transition-colors">{p.impact}</p>
                  <ExternalLink size={16} className="text-stone-300 group-hover:text-[#A1824A] transition-colors" />
                </div>
              </motion.div>
            )})}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
