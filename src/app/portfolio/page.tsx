"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, ExternalLink, Code2, Database, Layout, Search, Server, Moon, Sun, Award } from "lucide-react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import FloatingChat from "@/components/FloatingChat";

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { 
    setMounted(true); 
    const l = localStorage.getItem('sk_lang'); 
    const th = localStorage.getItem('sk_theme');
    if(l) setLang(l as 'ar'|'en'); 
    if(th) setTheme(th as 'dark'|'light');
    setTimeout(() => setLoading(false), 1800);
  }, []);
  
  const toggleLang = () => { const n = lang === 'ar' ? 'en' : 'ar'; setLang(n); localStorage.setItem('sk_lang', n); window.dispatchEvent(new Event('lang-change')); };
  const toggleTheme = () => { const n = theme === 'dark' ? 'light' : 'dark'; setTheme(n); localStorage.setItem('sk_theme', n); window.dispatchEvent(new Event('theme-change')); };
  
  const isAr = lang === 'ar';
  const isDark = theme === 'dark';

  const projects = [
    { id: 1, title: {ar:"أورا ماركتينق", en:"Aura Marketing"}, cat: "web", img: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png", role: {ar:"ووردبريس ومحتوى", en:"WordPress & Content"}, tech: ["WordPress", "SEO", "Content"], desc: {ar:"تأسيس المنصة بنظام ووردبريس مع صياغة محتوى احترافي يخدم استراتيجية محركات البحث وتصدر النتائج.", en:"Established the platform with WordPress and a professional SEO content strategy to dominate search results."}, impact: {ar:"المركز #1 في قوقل.", en:"Ranked #1 on Google."}, icon: Search, link: "https://aurateam3.com" },
    { id: 2, title: {ar:"مجموعة أساس", en:"Asas Group"}, cat: "backend", img: "https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp", role: {ar:"الشركة الأم", en:"Parent Company"}, tech: ["Enterprise", "Architecture", "Cloud"], desc: {ar:"هندسة وتطوير البنية التحتية الرقمية لشركة أساس، الشركة الأم التي تندرج تحتها كيانات آكام، مسارات، وباثق.", en:"Engineered the digital infrastructure for Asas Group, the parent enterprise of Akam, Masarat, and Bathq."}, impact: {ar:"بنية مؤسسية متكاملة.", en:"Integrated Enterprise Infra."}, icon: Server, link: "https://floralwhite-dove-225940.hostingersite.com/" },
    { id: 3, title: {ar:"آكام للمقاولات", en:"Akam Cont."}, cat: "web", img: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp", role: {ar:"تطوير وبنية سحابية", en:"Full-Stack & Cloud"}, tech: ["PHP", "WordPress", "AWS"], desc: {ar:"تطوير المنصة وتجهيز الاستضافة السحابية بمرونة عالية للتعامل مع الزيارات الكثيفة.", en:"Developed the platform and configured high-performance cloud hosting architecture for heavy traffic."}, impact: {ar:"إطلاق متكامل وهوية قوية.", en:"Complete Launch."}, icon: Server, link: "https://akamcont.sa" },
    { id: 4, title: {ar:"نظام مسارات", en:"Masarat Platform"}, cat: "backend", img: "https://redp-sa.com/web/images/logo.svg", role: {ar:"هندسة الواجهة الخلفية", en:"Backend Architecture"}, tech: ["Laravel", "PHP", "MySQL"], desc: {ar:"تحسينات معمارية عميقة على الواجهة الخلفية لضمان استقرار العمليات وسرعة الاستجابة.", en:"Deep architectural enhancements on the backend to ensure operational stability and fast response times."}, impact: {ar:"استقرار وقوة أداء فائق.", en:"Supreme Stability."}, icon: Database, link: "https://redp-sa.com/" },
    { id: 5, title: {ar:"شركة باثق", en:"Bathq Company"}, cat: "web", img: "https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp", role: {ar:"تطوير ويب وصياغة", en:"Web Dev & Copywriting"}, tech: ["PHP", "WordPress", "Copywriting"], desc: {ar:"بناء الموقع بالكامل مع صياغة المحتوى ليعكس رؤية الشركة بوضوح واحترافية.", en:"Built the entire website and crafted content to clearly reflect the company's vision and professionalism."}, impact: {ar:"حضور رقمي احترافي.", en:"Professional Presence."}, icon: Code2, link: "https://bathq.sa" },
    { id: 6, title: {ar:"محطات درب", en:"Darb Stations"}, cat: "ui", img: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png", role: {ar:"تطوير بلوكات", en:"Block WordPress"}, tech: ["Block Theme", "UI/UX", "SEO"], desc: {ar:"تصميم وهندسة صفحة المركز الإعلامي الحديثة بمرونة فائقة لتسهيل إضافة الأخبار.", en:"Engineered and designed the modern, highly flexible Media Center page for easy news publishing."}, impact: {ar:"مرونة عالية في التعديل.", en:"High Flexibility."}, icon: Layout, link: "https://darbstations.com.sa/media-center/" }
  ];

  const filters = [{ id: 'all', label: {ar:'الكل', en:'All'} }, { id: 'web', label: {ar:'ويب ومحتوى', en:'Web & Content'} }, { id: 'backend', label: {ar:'أنظمة خلفية', en:'Backend Systems'} }, { id: 'ui', label: {ar:'واجهات UX/UI', en:'UI/UX Interfaces'} }];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);
  const bentoClasses = ["md:col-span-2 md:row-span-2", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-1"];

  if(!mounted) return null;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className={`min-h-screen ${isDark ? 'bg-[#050505] text-white' : 'bg-[#F9F8F6] text-[#15110E]'} selection:bg-[#A1824A] pb-32 relative overflow-hidden ${isAr ? 'font-alexandria' : 'font-sans'} transition-colors duration-700`} dir={isAr ? 'rtl' : 'ltr'}>
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      
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

      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#A1824A]/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      <nav className={`w-full h-20 md:h-24 flex items-center px-4 md:px-12 border-b ${isDark ? 'border-white/5 bg-[#050505]/60' : 'border-[#15110E]/10 bg-white/60'} backdrop-blur-2xl sticky top-0 z-50 transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-black tracking-widest hover:text-[#A1824A] transition-colors">{isAr ? 'سالمين' : 'SALMEEN'}<span className="text-[#A1824A]">.</span></Link>
          <div className="flex gap-2 md:gap-3 items-center">
            <Link href="/" className={`flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold ${isDark ? 'text-stone-300 hover:text-white bg-white/5 border-white/10' : 'text-stone-600 hover:text-black bg-white border-stone-200'} px-3 md:px-5 py-2 md:py-2.5 rounded-full border transition-colors shadow-sm`}>{isAr ? <ArrowRight size={14}/> : <ArrowLeft size={14}/>} <span className="hidden md:inline">{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span><span className="md:hidden">{isAr ? 'رجوع' : 'Back'}</span></Link>
            <Link href="/certificates" className={`flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-bold ${isDark ? 'text-stone-300 hover:text-white bg-white/5 border-white/10' : 'text-stone-600 hover:text-black bg-white border-stone-200'} px-3 md:px-5 py-2 md:py-2.5 rounded-full border transition-colors shadow-sm`}><Award size={14} className="md:w-4 md:h-4"/><span className="hidden md:inline">{isAr ? "الشهادات" : "Certs"}</span><span className="md:hidden">{isAr ? "شهادات" : "Certs"}</span></Link>
            <button onClick={toggleLang} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-white text-black border-stone-200 hover:bg-stone-50'} border px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold shadow-sm hover:scale-105 transition-all`}>{isAr ? 'EN' : 'عربي'}</button>
            <button onClick={toggleTheme} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-[#15110E] text-white border-[#15110E] hover:bg-black'} border p-2 md:p-2.5 rounded-full shadow-sm hover:scale-105 transition-all`} title="Toggle Theme">
              {isDark ? <Sun size={14} className="md:w-4 md:h-4"/> : <Moon size={14} className="md:w-4 md:h-4"/>}
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-16 md:pt-24 pb-10 md:pb-16 px-4 md:px-6 max-w-7xl mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={lang} initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }} transition={{ duration: 0.3 }}>
            <div className={`inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 ${isDark ? 'bg-[#A1824A]/10 border-[#A1824A]/20' : 'bg-white border-[#A1824A]/30 shadow-sm'} rounded-full border mb-4 md:mb-6 text-[10px] md:text-xs font-black text-[#A1824A] uppercase tracking-widest`}><Sparkles size={14} /> {isAr ? 'المعرض الفاخر 3D' : 'Premium 3D Portfolio'}</div>
            
            {/* الحل السحري هنا أيضاً للعناوين: pb-[0.3em] -mb-[0.3em] */}
            <h1 className={`text-4xl md:text-6xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-b ${isDark ? 'from-white to-stone-400' : 'from-[#15110E] to-stone-500'} overflow-visible leading-[1.6] pb-[0.3em] -mb-[0.3em] pt-2`}>{isAr ? 'أعمال تتحدث' : 'Work that speaks'} <span className="text-[#A1824A]">{isAr ? 'بلغة الأرقام.' : 'in numbers.'}</span></h1>
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 md:mt-8">
          {filters.map(f => (<button key={f.id} onClick={() => setFilter(f.id)} className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-[10px] md:text-xs font-black transition-all duration-300 border ${filter === f.id ? 'bg-[#A1824A] text-white border-[#A1824A] shadow-[0_0_20px_rgba(161,130,74,0.4)]' : (isDark ? 'bg-transparent text-stone-500 border-white/10 hover:border-white/30 hover:text-white' : 'bg-white text-stone-500 border-stone-200 hover:border-[#A1824A] hover:text-[#15110E]')}`}>{isAr ? f.label.ar : f.label.en}</button>))}
        </div>
      </section>

      <section className="px-4 md:px-6 max-w-7xl mx-auto z-10 relative">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[minmax(300px,auto)]">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => { const Icon = p.icon; const isLarge = i === 0 && filter === 'all'; return (
              <motion.div layout initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} transition={{ duration: 0.4, delay: i * 0.05 }} key={`${p.id}-${lang}-${theme}`} className={filter === 'all' ? bentoClasses[i] : "col-span-1"}>
                <Tilt glareEnable={true} glareMaxOpacity={0.15} glareColor="#A1824A" glarePosition="all" tiltMaxAngleX={isLarge ? 2 : 5} tiltMaxAngleY={isLarge ? 2 : 5} className="h-full w-full">
                  <div className={`h-full w-full ${isDark ? 'bg-gradient-to-br from-[#111] to-[#0a0a0a] border-white/10 hover:border-[#A1824A]/50 hover:shadow-[0_10px_40px_rgba(161,130,74,0.2)]' : 'bg-white border-stone-200 hover:border-[#A1824A]/50 hover:shadow-[0_10px_40px_rgba(161,130,74,0.15)] shadow-xl'} rounded-3xl md:rounded-[2rem] border p-6 md:p-8 flex flex-col group relative overflow-hidden transition-all duration-500`}>
                    <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-[#A1824A] opacity-0 group-hover:opacity-10 blur-[60px] md:blur-[80px] transition-opacity duration-700 rounded-full"></div>
                    <div className="flex items-center justify-between mb-6 md:mb-8 relative z-10">
                      <div className="h-10 md:h-12 flex items-center group-hover:scale-110 transition-transform duration-500"><img src={p.img} alt={isAr ? p.title.ar : p.title.en} className={`max-h-full max-w-[100px] md:max-w-[130px] object-contain transition-all ${isDark ? 'filter brightness-0 invert opacity-60 group-hover:opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'filter brightness-0 opacity-70 group-hover:opacity-100 transition-all'}`} /></div>
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${isDark ? 'bg-[#A1824A]/10 border-[#A1824A]/20' : 'bg-stone-50 border-stone-200'} flex items-center justify-center border group-hover:bg-[#A1824A] transition-colors`}><Icon size={18} className={`${isDark ? 'text-[#A1824A]' : 'text-stone-400'} group-hover:text-white`} /></div>
                    </div>
                    
                    {/* تطبيق الحل السحري على عناوين البطاقات */}
                    <h3 className={`font-black ${isDark ? 'text-white' : 'text-[#15110E]'} drop-shadow-sm overflow-visible ${isLarge ? 'text-2xl md:text-4xl lg:text-5xl mt-auto leading-[1.6] pb-[0.2em] -mb-[0.2em]' : 'text-lg md:text-2xl leading-[1.6] pb-[0.2em] -mb-[0.2em]'}`} dir={isAr ? 'rtl' : 'ltr'}>{isAr ? p.title.ar : p.title.en}</h3>
                    <p className="text-[#A1824A] font-bold text-[10px] md:text-xs uppercase tracking-widest mb-4 mt-2 md:mt-3" dir={isAr ? 'rtl' : 'ltr'}>{isAr ? p.role.ar : p.role.en}</p>
                    <p className={`${isDark ? 'text-stone-400' : 'text-stone-600'} flex-1 ${isLarge ? 'text-base md:text-lg max-w-2xl leading-[1.8] md:leading-[2.2]' : 'text-sm md:text-base leading-[1.8] md:leading-[2]'}`}>{isAr ? p.desc.ar : p.desc.en}</p>
                    
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mt-4 md:mt-6 mb-4 md:mb-6" dir="ltr">{p.tech.map((t, x) => <span key={x} className={`px-2 md:px-3 py-1 md:py-1.5 ${isDark ? 'bg-black/50 text-stone-300 border-white/5' : 'bg-stone-100 text-stone-600 border-stone-200'} text-[8px] md:text-[10px] font-bold rounded-md md:rounded-lg border shadow-inner`}>{t}</span>)}</div>
                    <div className={`pt-4 md:pt-6 border-t ${isDark ? 'border-white/10' : 'border-stone-100'} flex items-center justify-between mt-auto`}>
                      <p className={`font-black text-[10px] md:text-xs ${isDark ? 'text-white bg-[#A1824A]/20 border-[#A1824A]/30' : 'text-[#15110E] bg-white border-stone-200'} px-3 md:px-4 py-1.5 md:py-2 rounded-full border shadow-sm`}>{isAr ? p.impact.ar : p.impact.en}</p>
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-stone-500 hover:text-white bg-white/5 border-white/10' : 'text-stone-400 hover:text-[#15110E] bg-white border-stone-200'} hover:scale-110 transition-all p-2.5 rounded-full border hover:bg-[#A1824A] hover:border-[#A1824A] group-hover:shadow-[0_0_15px_rgba(161,130,74,0.4)]`} title={isAr ? 'زيارة الموقع' : 'Visit Site'}><ExternalLink size={16} /></a>
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
