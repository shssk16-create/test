"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingChat from "@/components/FloatingChat";
import { Code2, MapPin, Phone, Mail, TrendingUp, ServerCrash, Award, Database, Layout, Cpu, Globe2, Sparkles, Globe } from "lucide-react";
import Link from "next/link";
export default function GlobalPortfolio() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  useEffect(() => { setTimeout(() => setLoading(false), 2000); }, []);
  const logos = [
    { n: "Aura", u: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png" },
    { n: "Masarat", u: "https://redp-sa.com/web/images/logo.svg" },
    { n: "Akam", u: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp" },
    { n: "Bathq", u: "https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp" },
    { n: "Asas", u: "https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp" },
    { n: "Darb", u: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png" }
  ];
  const t = {
    ar: {
      nav: { impact: "سجل الأثر", certs: "الشهادات" },
      hero: { welcome: "أهْلاً بِك", name: "سالمين هادي خنبري.", title1: "مهندس حلول ذكاء اصطناعي", title2: "خبير سحابة AWS وتطوير الويب", contact: "تحدث معي", loc: "مكة المكرمة" },
      logos: "كيانات كنت جزءاً من نجاحها",
      about: { title: "يا هلا بك..", desc: "أجمع بين عمق التحليل من تخصصي في اللغة العربية، والمهارات التقنية المتقدمة. أهندس أنظمة ذكية (AI Agents) وبيئات سحابية تعزز الكفاءة." },
      impact: {
        title: "أثر تقني ملموس.", subtitle: "Experience",
        aura: { title: "Aura", sub: "Build & SEO", desc: "بناء المنصة بالكامل للتوافق مع محركات البحث.", outLabel: "النتائج:", out: "المركز الأول (#1) في Google." },
        masarat: { title: "Masarat", sub: "Backend", desc: "تنفيذ تحسينات برمجية عميقة على الواجهة الخلفية.", outLabel: "المخرجات:", out: "استقرار قواعد البيانات." },
        darb: { title: "Darb", sub: "Media Center", desc: "بناء صفحة المركز الإعلامي وتجربة المستخدم.", outLabel: "المخرجات:", out: "واجهة إعلامية احترافية." },
        akam: { title: "Akam", sub: "AWS Cloud", desc: "تجهيز الاستضافة، النطاقات، وربط بيئات الإنتاج.", outLabel: "الأثر:", out1: "إطلاق سحابي مستقر.", out2: "بنية تحتية للتوسع." }
      },
      footer: { title: "فلنتحدث بلغة النتائج." }
    },
    en: {
      nav: { impact: "Impact", certs: "Certificates" },
      hero: { welcome: "Welcome", name: "Salmeen Hadi Khanbri.", title1: "AI Solutions Engineer", title2: "AWS Cloud & Cyber Intelligence", contact: "Let's Talk", loc: "Makkah, SA" },
      logos: "Entities I Helped Succeed",
      about: { title: "Welcome..", desc: "Blending analytical depth with cutting-edge tech in AI. I engineer intelligent workflows and high-performance AWS environments." },
      impact: {
        title: "Tech Impact.", subtitle: "Experience",
        aura: { title: "Aura", sub: "Build & SEO", desc: "Built the platform meeting the highest SEO standards.", outLabel: "Results:", out: "Achieved #1 ranking on Google." },
        masarat: { title: "Masarat", sub: "Backend", desc: "Executed advanced architectural enhancements.", outLabel: "Outputs:", out: "Improved database stability." },
        darb: { title: "Darb", sub: "Media Center", desc: "Designed the Media Center focusing on hierarchy.", outLabel: "Outputs:", out: "Visually appealing media hub." },
        akam: { title: "Akam", sub: "AWS Cloud", desc: "Included hosting setup and production linking.", outLabel: "Impact:", out1: "Stable cloud launch.", out2: "Scalable infrastructure." }
      },
      footer: { title: "Let's talk results." }
    }
  };
  const current = t[lang]; const isAr = lang === 'ar';
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap'); .font-alexandria { font-family: 'Alexandria', sans-serif; }`}} />
      <AnimatePresence>{loading && (<motion.div exit={{ opacity: 0, y: -50 }} className="fixed inset-0 z-[100] bg-[#15110E] flex items-center justify-center text-white text-4xl font-black font-alexandria" dir="ltr">Salmeen.</motion.div>)}</AnimatePresence>
      <main className="min-h-screen bg-[#F9F8F6] font-alexandria" dir={isAr ? 'rtl' : 'ltr'}>
        <nav className="fixed top-0 w-full z-50 bg-[#F9F8F6]/80 backdrop-blur-lg border-b border-stone-200/40 h-20 flex items-center px-6 transition-all">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="text-xl font-black text-[#15110E]">{isAr ? 'سالمين' : 'Salmeen'}<span className="text-[#A1824A]">.</span></div>
            <div className="flex items-center gap-4">
              <Link href="/certificates" className="flex items-center gap-2 bg-[#15110E]/5 px-4 py-2 rounded-full text-xs font-bold"><Award size={16} /> <span>{current.nav.certs}</span></Link>
              <button onClick={() => setLang(isAr ? 'en' : 'ar')} className="flex items-center gap-2 border px-3 py-2 rounded-full text-xs font-bold bg-white"><Globe2 size={16} className="text-[#A1824A]" /> {isAr ? 'EN' : 'عربي'}</button>
            </div>
          </div>
        </nav>
        <AnimatePresence mode="wait">
          <motion.div key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <section className="min-h-[100svh] flex flex-col items-center justify-center px-6 pt-32 pb-20 relative">
              <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-start w-full mt-10 lg:mt-0">
                  <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full border mb-6 shadow-sm"><Sparkles size={14} className="text-[#A1824A]" /><span className="text-sm font-bold text-stone-600">{current.hero.welcome}</span></div>
                  <h1 className="text-4xl md:text-6xl font-black text-[#15110E] leading-tight mb-4">{isAr ? "سالمين هادي" : "Salmeen Hadi"}<br/><span className="text-[#A1824A]">{isAr ? "خنبري." : "Khanbri."}</span></h1>
                  <div className="flex flex-col gap-1 mb-10"><p className="text-[#A1824A] font-bold text-lg">{current.hero.title1}</p><p className="text-stone-500 font-medium text-xs">{current.hero.title2}</p></div>
                  <div className="flex flex-wrap items-center gap-4"><a href="https://wa.me/966503026795" className="bg-[#15110E] text-white px-8 py-3 rounded-full font-bold text-xs flex items-center gap-3"><Phone size={18} /> {current.hero.contact}</a></div>
                </div>
                <div className="relative w-[280px] h-[370px] md:w-[360px] md:h-[480px] shrink-0">
                  <div className="absolute inset-0 translate-y-4 rounded-[2.5rem] bg-[#A1824A]/10"></div>
                  <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-xl relative z-10"><img src="http://t8ne.space/wp-content/uploads/2026/03/1000050515.webp" alt="Salmeen" className="w-full h-full object-cover object-top" /></div>
                  <div className="absolute bottom-6 left-6 bg-white p-3 rounded-2xl shadow-xl z-20 flex items-center gap-3" dir="ltr"><div className="w-10 h-10 rounded-xl bg-[#15110E] flex items-center justify-center text-white"><Code2 size={18}/></div><div><p className="text-[9px] text-stone-400">Stack</p><p className="text-xs font-black text-[#15110E]">AWS & AI</p></div></div>
                </div>
              </div>
            </section>
            <section className="py-16 px-6 bg-[#15110E]">
              <div className="max-w-6xl mx-auto text-center">
                 <h4 className="text-[10px] font-bold text-[#A1824A] mb-12">{current.logos}</h4>
                 <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
                    {logos.map((logo, i) => (<div key={i} className="w-full h-8 flex items-center justify-center"><img src={logo.u} alt={logo.n} className="max-h-full object-contain invert opacity-40 hover:opacity-100 transition-all" /></div>))}
                 </div>
              </div>
            </section>
            <section className="py-24 px-6 bg-white border-b border-stone-100">
              <div className="max-w-4xl mx-auto text-center"><h2 className="text-3xl font-black text-[#15110E] mb-6">{current.about.title}</h2><p className="text-lg text-stone-500 leading-relaxed">{current.about.desc}</p></div>
            </section>
            <section id="experience" className="py-24 px-6 bg-stone-50">
               <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16"><h2 className="text-3xl font-black text-[#15110E] mb-3">{current.impact.title}</h2><p className="text-stone-500 font-bold text-xs uppercase">{current.impact.subtitle}</p></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="md:col-span-2 bg-[#15110E] p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5"><Globe size={160} /></div>
                        <div className="relative z-10 flex flex-col h-full justify-between"><div className="mb-10"><div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-6"><TrendingUp size={20} /></div><h3 className="text-2xl font-black mb-2" dir="ltr">{current.impact.aura.title}</h3><p className="text-[#A1824A] font-bold text-[10px] mb-4" dir="ltr">{current.impact.aura.sub}</p><p className="text-stone-400 text-sm">{current.impact.aura.desc}</p></div><div className="bg-white/5 p-4 rounded-2xl border border-white/10"><span className="text-[10px] text-stone-400">{current.impact.aura.outLabel}</span><p className="font-bold text-sm">{current.impact.aura.out}</p></div></div>
                     </div>
                     <div className="bg-white p-8 rounded-[2rem] border shadow-sm flex flex-col justify-between">
                        <div><div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center mb-6"><Database size={20} /></div><h3 className="text-xl font-black mb-2" dir="ltr">{current.impact.masarat.title}</h3><p className="text-stone-400 font-bold text-[9px] mb-4" dir="ltr">{current.impact.masarat.sub}</p><p className="text-stone-500 text-sm mb-8">{current.impact.masarat.desc}</p></div>
                        <div className="pt-4 border-t"><span className="text-[9px] text-stone-400">{current.impact.masarat.outLabel}</span><p className="font-bold text-xs">{current.impact.masarat.out}</p></div>
                     </div>
                     <div className="bg-white p-8 rounded-[2rem] border shadow-sm flex flex-col justify-between">
                        <div><div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center mb-6"><Layout size={20} /></div><h3 className="text-xl font-black mb-2" dir="ltr">{current.impact.darb.title}</h3><p className="text-stone-400 font-bold text-[9px] mb-4" dir="ltr">{current.impact.darb.sub}</p><p className="text-stone-500 text-sm mb-8">{current.impact.darb.desc}</p></div>
                        <div className="pt-4 border-t"><span className="text-[9px] text-stone-400">{current.impact.darb.outLabel}</span><p className="font-bold text-xs">{current.impact.darb.out}</p></div>
                     </div>
                     <div className="md:col-span-2 bg-gradient-to-br from-stone-100 to-white p-8 rounded-[2rem] border shadow-sm flex flex-col md:flex-row gap-6 justify-between">
                        <div className="flex-1"><div className="flex gap-3 mb-6"><div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm"><ServerCrash size={20} /></div><div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm"><Cpu size={20} /></div></div><h3 className="text-2xl font-black mb-2" dir="ltr">{current.impact.akam.title}</h3><p className="text-stone-500 font-bold text-[9px] mb-4" dir="ltr">{current.impact.akam.sub}</p><p className="text-stone-600 text-sm">{current.impact.akam.desc}</p></div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border shrink-0"><span className="text-[9px] text-[#A1824A]">{current.impact.akam.outLabel}</span><ul className="text-xs font-bold space-y-3 mt-3"><li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> {current.impact.akam.out1}</li><li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> {current.impact.akam.out2}</li></ul></div>
                     </div>
                  </div>
               </div>
            </section>
            <footer className="py-20 px-6 bg-[#15110E] text-center border-t-4 border-[#A1824A]">
               <h2 className="text-2xl font-black text-white mb-10">{current.footer.title}</h2>
               <div className="flex flex-wrap justify-center gap-6 font-bold text-[10px] text-stone-300">
                  <a href="https://wa.me/966503026795" className="flex items-center gap-3 hover:text-white" dir="ltr"><Phone size={16} className="text-[#A1824A]"/> +966 50 302 6795</a>
                  <a href="mailto:shssk.16@gmail.com" className="flex items-center gap-3 hover:text-white" dir="ltr"><Mail size={16} className="text-[#A1824A]"/> shssk.16@gmail.com</a>
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
