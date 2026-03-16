"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, ExternalLink, Code2, Database, Layout, Search, Server } from "lucide-react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import FloatingChat from "@/components/FloatingChat";

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true);
    const saved = localStorage.getItem('sk_lang');
    if(saved) setLang(saved as 'ar'|'en');
  }, []);

  const toggleLang = () => {
    const n = lang === 'ar' ? 'en' : 'ar';
    setLang(n);
    localStorage.setItem('sk_lang', n);
  };

  const isAr = lang === 'ar';

  const projects = [
    { id: 1, title: {ar:"أورا ماركتينق", en:"Aura Marketing"}, cat: "web", img: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png", role: {ar:"ووردبريس ومحتوى", en:"WordPress & Content"}, tech: ["WordPress", "SEO", "Content"], desc: {ar:"تأسيس المنصة بنظام ووردبريس مع صياغة محتوى احترافي يخدم استراتيجية محركات البحث.", en:"Established the platform with WordPress and a professional SEO content strategy."}, impact: {ar:"المركز #1 في قوقل.", en:"Ranked #1 on Google."}, icon: Search },
    { id: 2, title: {ar:"آكام للمقاولات", en:"Akam Cont."}, cat: "web", img: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp", role: {ar:"تطوير وبنية سحابية", en:"Full-Stack & Cloud"}, tech: ["PHP", "WordPress", "AWS"], desc: {ar:"تطوير المنصة وتجهيز الاستضافة السحابية بمرونة عالية.", en:"Developed the platform and configured high-performance cloud hosting architecture."}, impact: {ar:"إطلاق متكامل وهوية قوية.", en:"Complete Launch & Strong Identity."}, icon: Server },
    { id: 3, title: {ar:"نظام مسارات", en:"Masarat Platform"}, cat: "backend", img: "https://redp-sa.com/web/images/logo.svg", role: {ar:"هندسة الواجهة الخلفية", en:"Backend Architecture"}, tech: ["Laravel", "PHP", "MySQL"], desc: {ar:"تحسينات معمارية عميقة على الواجهة الخلفية لضمان استقرار العمليات.", en:"Deep architectural enhancements on the backend to ensure operational stability."}, impact: {ar:"استقرار وقوة أداء فائق.", en:"Supreme Performance & Stability."}, icon: Database },
    { id: 4, title: {ar:"شركة باثق", en:"Bathq Company"}, cat: "web", img: "https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp", role: {ar:"تطوير ويب وصياغة", en:"Web Dev & Copywriting"}, tech: ["PHP", "WordPress", "Copywriting"], desc: {ar:"بناء الموقع بالكامل مع صياغة المحتوى ليعكس رؤية الشركة بوضوح.", en:"Built the entire website and crafted content to clearly reflect the company's vision."}, impact: {ar:"حضور رقمي احترافي.", en:"Professional Digital Presence."}, icon: Code2 },
    { id: 5, title: {ar:"محطات درب", en:"Darb Stations"}, cat: "ui", img: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png", role: {ar:"تطوير بلوكات ووردبريس", en:"Block WordPress"}, tech: ["Block Theme", "UI/UX", "SEO"], desc: {ar:"تصميم وهندسة صفحة المركز الإعلامي الحديثة بمرونة فائقة.", en:"Engineered and designed the modern, highly flexible Media Center page."}, impact: {ar:"مرونة عالية في التعديل.", en:"High Flexibility in Editing."}, icon: Layout }
  ];

  const filters = [{ id: 'all', label: {ar:'الكل', en:'All'} }, { id: 'web', label: {ar:'ويب ومحتوى', en:'Web & Content'} }, { id: 'backend', label: {ar:'أنظمة خلفية', en:'Backend Systems'} }, { id: 'ui', label: {ar:'واجهات UX/UI', en:'UI/UX Interfaces'} }];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);

  const bentoClasses = ["md:col-span-2 md:row-span-2", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-1", "md:col-span-2 md:row-span-1", "md:col-span-1 md:row-span-1"];

  if(!mounted) return null;

  return (
    <motion.main initial={{ opacity: 0, filter: 'blur(15px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.6 }} className={`min-h-screen bg-[#050505] text-white selection:bg-[#A1824A] pb-32 relative overflow-hidden ${isAr ? 'font-alexandria' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#A1824A]/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      <nav className="w-full h-20 md:h-24 flex items-center px-4 md:px-12 border-b border-white/5 bg-[#050505]/60 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-black text-white hover:text-[#A1824A] transition-colors tracking-widest">{isAr ? 'سالمين' : 'SALMEEN'}<span className="text-[#A1824A]">.</span></Link>
          <div className="flex gap-2 items-center">
            <Link href="/" className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold text-stone-300 hover:text-white transition-colors bg-white/5 px-3 md:px-5 py-2 md:py-2.5 rounded-full border border-white/10">{isAr ? <ArrowRight size={14}/> : <ArrowLeft size={14}/>} <span className="hidden md:inline">{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span><span className="md:hidden">{isAr ? 'رجوع' : 'Back'}</span></Link>
            <button onClick={toggleLang} className="bg-white/10 text-white border border-white/20 px-3 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-[#A1824A] hover:border-[#A1824A] transition-all">{isAr ? 'EN' : 'عربي'}</button>
          </div>
        </div>
      </nav>

      <section className="pt-16 md:pt-24 pb-10 md:pb-16 px-4 md:px-6 max-w-7xl mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={lang} initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }} transition={{ duration: 0.3 }}>
            <div className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 bg-[#A1824A]/10 rounded-full border border-[#A1824A]/20 mb-4 md:mb-6 text-[10px] md:text-xs font-black text-[#A1824A] uppercase tracking-widest"><Sparkles size={14} /> {isAr ? 'المعرض الفاخر 3D' : 'Premium 3D Portfolio'}</div>
            <h1 className={`text-4xl md:text-7xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 overflow-visible ${isAr ? 'leading-[1.8] pb-6 md:pb-10 pt-2' : 'leading-tight pb-4'}`}>{isAr ? 'أعمال تتحدث' : 'Work that speaks'} <span className="text-[#A1824A]">{isAr ? 'بلغة الأرقام.' : 'in numbers.'}</span></h1>
          </motion.div>
        </AnimatePresence>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 md:mt-8">
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-black transition-all duration-300 border ${filter === f.id ? 'bg-[#A1824A] text-white border-[#A1824A] shadow-[0_0_20px_rgba(161,130,74,0.4)]' : 'bg-transparent text-stone-500 border-white/10 hover:border-white/30 hover:text-white'}`}>{isAr ? f.label.ar : f.label.en}</button>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-6 max-w-7xl mx-auto z-10 relative">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[minmax(300px,auto)]">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => { const Icon = p.icon; const isLarge = i === 0 && filter === 'all'; return (
              <motion.div layout initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} transition={{ duration: 0.4, delay: i * 0.05 }} key={`${p.id}-${lang}`} className={filter === 'all' ? bentoClasses[i] : "col-span-1"}>
                <Tilt glareEnable={true} glareMaxOpacity={0.15} glareColor="#A1824A" glarePosition="all" tiltMaxAngleX={isLarge ? 2 : 5} tiltMaxAngleY={isLarge ? 2 : 5} className="h-full w-full">
                  <div className="h-full w-full bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-3xl md:rounded-[2rem] border border-white/10 p-6 md:p-8 flex flex-col group relative overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#A1824A]/50 hover:shadow-[0_10px_40px_rgba(161,130,74,0.2)]">
                    <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-[#A1824A] opacity-0 group-hover:opacity-10 blur-[60px] md:blur-[80px] transition-opacity duration-700 rounded-full"></div>
                    <div className="flex items-center justify-between mb-6 md:mb-8 relative z-10">
                      <div className="bg-white/90 backdrop-blur-md px-3 md:px-5 py-2 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500 h-12 md:h-16 min-w-[80px] md:min-w-[100px]">
                         <img src={p.img} alt={isAr ? p.title.ar : p.title.en} className="max-h-full max-w-[80px] md:max-w-[120px] object-contain" />
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#A1824A]/10 flex items-center justify-center border border-[#A1824A]/20 group-hover:bg-[#A1824A] transition-colors"><Icon size={18} className="text-[#A1824A] group-hover:text-white" /></div>
                    </div>
                    <h3 className={`font-black text-white drop-shadow-md overflow-visible ${isLarge ? 'text-3xl md:text-5xl mt-auto leading-[1.6] pb-2' : 'text-xl md:text-3xl leading-[1.6] pb-1'}`} dir={isAr ? 'rtl' : 'ltr'}>{isAr ? p.title.ar : p.title.en}</h3>
                    <p className="text-[#A1824A] font-black text-[9px] md:text-[10px] uppercase tracking-widest mb-3 md:mb-4" dir={isAr ? 'rtl' : 'ltr'}>{isAr ? p.role.ar : p.role.en}</p>
                    <p className={`text-stone-400 flex-1 ${isLarge ? 'text-sm md:text-lg max-w-xl leading-[1.8] md:leading-[2]' : 'text-xs md:text-sm leading-[1.8]'}`}>{isAr ? p.desc.ar : p.desc.en}</p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mt-4 md:mt-6 mb-4 md:mb-6" dir="ltr">
                      {p.tech.map((t, x) => <span key={x} className="px-2 md:px-3 py-1 md:py-1.5 bg-black/50 text-stone-300 text-[8px] md:text-[10px] font-bold rounded-md md:rounded-lg border border-white/5 shadow-inner">{t}</span>)}
                    </div>
                    <div className="pt-4 md:pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                      <p className="font-black text-[10px] md:text-xs text-white bg-[#A1824A]/20 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[#A1824A]/30">{isAr ? p.impact.ar : p.impact.en}</p>
                      <ExternalLink size={16} className="text-stone-500 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            )})}
          </AnimatePresence>
        </motion.div>
      </section>
      <FloatingChat />
    </motion.main>
  );
}
