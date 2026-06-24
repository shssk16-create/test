"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Award, Moon, Sun, ZoomIn, X } from "lucide-react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import FloatingChat from "@/components/FloatingChat";

export function cleanCdnUrl(url: string, apiBase: string) {
  if (!url) return "";
  if (url.startsWith('/')) {
    return `${apiBase}${url}`;
  }
  if (url.includes('/api/media/download')) {
    try {
      const urlObj = new URL(url);
      const key = urlObj.searchParams.get('key');
      if (key) {
        return `${apiBase}/api/media/download?key=${encodeURIComponent(key)}`;
      }
    } catch (e) {
      console.warn("Failed to parse URL:", url);
    }
  }
  return url;
}

export interface CertificateProps {
  id: string;
  name_ar: string;
  name_en: string;
  issuer_ar: string;
  issuer_en: string;
  date: string;
  credential_url?: string;
  image: string;
  featured?: boolean;
  skills?: any;
  description_ar?: string;
  description_en?: string;
  degree_level_ar?: string;
  degree_level_en?: string;
}

const fallbackPrimaryCert: CertificateProps = {
  id: "cert-primary",
  name_ar: "شهادة تخرج برمجيات",
  name_en: "Software Graduation Certificate",
  issuer_ar: "الجامعة الوطنية",
  issuer_en: "National University",
  date: "2026-06-01",
  credential_url: "",
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  featured: true,
  skills: ["Software Engineering", "Cloud Computing", "Web Architecture", "Databases", "Distributed Systems"],
  description_ar: "تم الحصول على هذه الدرجة العلمية في تخصص تقنية البرمجيات وأنظمة الويب المتكاملة مع التركيز على بناء البنى السحابية وتكامل الأنظمة وريادة الأعمال الرقمية.",
  description_en: "Graduated with honors in Software Engineering, focusing on distributed systems architecture, cloud computing paradigms, and microservices design patterns.",
  degree_level_ar: "المستوى التعليمي: بكالوريوس / Diploma",
  degree_level_en: "Degree Level: Higher Software Diploma"
};

const fallbackOtherCerts: CertificateProps[] = [];

export function CertificateCard({
  name_ar,
  name_en,
  issuer_ar,
  issuer_en,
  date,
  credential_url,
  image,
  featured,
  skills,
  isDark,
  isAr,
  onZoom,
}: CertificateProps & { isDark: boolean; isAr: boolean; onZoom: (img: string) => void }) {
  const name = isAr ? name_ar : name_en;
  const issuer = isAr ? issuer_ar : issuer_en;
  const cleanImage = image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="w-full h-[300px] [perspective:1500px] group/card cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]">
        
        {/* --- FRONT SIDE: Details --- */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] z-20">
          <div
            className={`flex flex-col h-full backdrop-blur-md rounded-3xl overflow-visible transition-all duration-500 select-none border active:scale-[0.98] ${
              isDark 
                ? 'bg-[#2C3947]/90 border-white/5 text-[#E8EDF2] hover:border-[#C2A56D]/50 shadow-[0_8px_30px_rgba(0,0,0,0.2)]' 
                : 'bg-white border-[#547A95]/20 text-[#2C3947] shadow-sm hover:border-[#C2A56D]/50'
            }`}
          >
            <div
              className="relative flex items-center justify-center h-[90px] w-full shrink-0 overflow-hidden border-b transition-all duration-500"
              style={{ 
                background: isDark 
                  ? `radial-gradient(circle at center, rgba(194,165,109,0.15) 0%, #2C3947 100%)` 
                  : `radial-gradient(circle at center, rgba(194,165,109,0.08) 0%, #E8EDF2 100%)`,
                borderColor: isDark ? 'rgba(84,122,149,0.2)' : 'rgba(84,122,149,0.1)'
              }}
            >
              {image && (
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 opacity-[0.08] group-hover/card:opacity-[0.20] group-hover/card:scale-110 filter blur-[1px]" 
                  style={{ backgroundImage: `url('${cleanImage}')` }}
                />
              )}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_14px]"></div>
              <Award size={30} className={`drop-shadow-[0_4px_10px_rgba(194,165,109,0.3)] ${isDark ? 'text-white' : 'text-[#C2A56D]'} relative z-10`} />
            </div>

            <div className="flex flex-col flex-grow p-4 md:p-5 justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className={`px-2 py-0.5 text-[8px] font-black rounded-full border uppercase tracking-wider ${
                    isDark ? 'bg-white/5 text-stone-300 border-white/10' : 'bg-stone-100 text-stone-600 border-stone-200'
                  }`}>{issuer}</span>
                  <span className={`text-[8px] font-bold ${isDark ? 'text-stone-500' : 'text-stone-400'}`} dir="ltr">{date}</span>
                </div>
                <h3 className={`text-xs md:text-sm font-bold leading-[1.7] mb-2 ${isDark ? 'text-white' : 'text-[#2C3947]'} ${isAr ? 'text-right' : 'text-left'}`}>
                  {name}
                </h3>
                <p className={`text-[9.5px] leading-[1.8] font-sans ${isDark ? 'text-stone-400' : 'text-stone-600'} ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? "شهادة مهنية معتمدة تثبت الكفاءة الهندسية وتطوير الحلول البرمجية والسحابية المتطورة." : "Verified professional credential validating software engineering and cloud solutions competency."}
                </p>

                {(() => {
                  let skillsList: string[] = [];
                  if (skills) {
                    try {
                      const parsed = typeof skills === 'string' ? JSON.parse(skills) : skills;
                      if (Array.isArray(parsed) && parsed.length > 0) {
                        skillsList = parsed;
                      }
                    } catch (e) {
                      if (typeof skills === 'string') {
                        skillsList = skills.split(',').map((s: string) => s.trim()).filter(Boolean);
                      }
                    }
                  }
                  if (skillsList.length === 0) return null;
                  return (
                    <div className="flex flex-wrap gap-1 mt-2.5 justify-start" dir="ltr">
                      {skillsList.map((skill) => (
                        <span key={skill} className={`px-1.5 py-0.5 text-[7px] font-bold rounded border ${isDark ? 'bg-white/5 text-stone-300 border-white/10' : 'bg-stone-50 text-stone-600 border-stone-100'}`}>{skill}</span>
                      ))}
                    </div>
                  );
                })()}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-200/40 dark:border-white/5 mt-4">
                <span className="text-stone-400 text-[8px] font-black uppercase tracking-wider">{isAr ? 'عرض' : 'VIEW'}</span>
                <span className={`text-[9px] font-bold italic ${isDark ? 'text-[#C2A56D]/70' : 'text-[#C2A56D]/70'}`}>{isAr ? 'مرر لرؤية الصورة 🫵' : 'Hover to flip 🫵'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- BACK SIDE: Certificate Image Preview --- */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] z-10">
          <div
            className={`flex flex-col h-full rounded-3xl overflow-visible border relative justify-end p-4 transition-all duration-500 active:scale-[0.98] ${
              isDark ? 'border-white/5 shadow-2xl' : 'border-stone-200 shadow-xl'
            }`}
            style={{
              backgroundImage: `url('${cleanImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'top center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#C2A56D]/15 via-[#2C3947]/70 to-[#2C3947]/95 z-0"></div>
            
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 bg-black/40 backdrop-blur-md text-white text-[8px] font-bold rounded border border-white/10 uppercase">{issuer}</span>
                {featured && (
                  <span className="px-2.5 py-0.5 bg-[#C2A56D] text-black text-[8px] font-black rounded-full border border-yellow-300/20 shadow-md">
                    {isAr ? 'شهادة أساسية' : 'PRIMARY'}
                  </span>
                )}
              </div>
              
              <h4 className="text-white font-black text-xs leading-[1.7] max-w-full truncate">{name}</h4>
              
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                {credential_url ? (
                  <a href={credential_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-[#C2A56D] text-black text-[9px] font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-md" onClick={(e) => e.stopPropagation()}>{isAr ? 'التحقق' : 'Verify'}</a>
                ) : (
                  <span className="text-stone-400 text-[8.5px] font-bold">{date}</span>
                )}
                
                <button onClick={(e) => { e.stopPropagation(); onZoom(cleanImage); }} className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[9px] font-bold rounded-full hover:scale-105 active:scale-95 transition-all backdrop-blur-sm">
                  <span>{isAr ? 'تكبير' : 'Zoom'}</span>
                  <ZoomIn size={10} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AmalCertificates() {
  const isAmalDeploy = process.env.NEXT_PUBLIC_OWNER === 'amal';
  const basePrefix = isAmalDeploy ? "" : "/amal";

  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const [primaryCert, setPrimaryCert] = useState<CertificateProps>(fallbackPrimaryCert);
  const [otherCerts, setOtherCerts] = useState<CertificateProps[]>(fallbackOtherCerts);

  useEffect(() => { 
    setMounted(true); 
    const l = localStorage.getItem('sk_lang'); 
    const th = localStorage.getItem('sk_theme');
    if(l) setLang(l as 'ar'|'en'); 
    if(th) setTheme(th as 'dark'|'light');
    setTimeout(() => setLoading(false), 1200);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      document.title = lang === 'ar' ? "أمل هادي | الشهادات" : "Amal Hadi | Certificates";
    }
  }, [lang, mounted]);

  useEffect(() => {
    if (!mounted) return;

    async function fetchCertificates() {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
      try {
        const res = await fetch(`${apiBase}/api/certificates?owner=amal`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((c: any) => ({
            id: c.id,
            name_ar: c.name_ar || c.name || "",
            name_en: c.name_en || c.name || "",
            issuer_ar: c.issuer_ar || c.issuer || "",
            issuer_en: c.issuer_en || c.issuer || "",
            date: c.date,
            credential_url: c.credential_url || "",
            image: cleanCdnUrl(c.image, apiBase),
            featured: c.featured === 1 || c.featured === true,
            skills: c.skills,
            description_ar: c.description_ar || "",
            description_en: c.description_en || "",
            degree_level_ar: c.degree_level_ar || "",
            degree_level_en: c.degree_level_en || ""
          }));

          const featured = mapped.find((c: any) => c.featured);
          const others = mapped.filter((c: any) => c.id !== (featured?.id || ''));
          
          if (featured) {
            setPrimaryCert(featured);
          }
          if (others.length > 0) {
            setOtherCerts(others);
          }
        }
      } catch (err) {
        console.warn("CMS API is offline. Using fallback local certificates data.");
      }
    }

    fetchCertificates();
  }, [mounted]);
  
  const toggleLang = () => { const n = lang === 'ar' ? 'en' : 'ar'; setLang(n); localStorage.setItem('sk_lang', n); window.dispatchEvent(new Event('lang-change')); };
  const toggleTheme = () => { const n = theme === 'dark' ? 'light' : 'dark'; setTheme(n); localStorage.setItem('sk_theme', n); window.dispatchEvent(new Event('theme-change')); };
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedImg(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const isAr = lang === 'ar';
  const isDark = theme === 'dark';

  const primaryName = isAr ? primaryCert.name_ar : primaryCert.name_en;
  const primaryIssuer = isAr ? primaryCert.issuer_ar : primaryCert.issuer_en;

  if(!mounted) return null;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className={`min-h-[100dvh] ${isDark ? 'bg-[#2C3947] text-[#E8EDF2]' : 'bg-[#E8EDF2] text-[#2C3947]'} selection:bg-[#C2A56D] pb-32 relative overflow-hidden ${isAr ? 'font-alexandria' : 'font-sans'} transition-colors duration-700`} dir={isAr ? 'rtl' : 'ltr'}>
      
      <AnimatePresence>
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImg(null)} className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out">
            <button onClick={() => setSelectedImg(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-red-500/80 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors z-50 active:scale-95">
              <X size={24} />
            </button>
            <motion.img initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} src={selectedImg} alt="Certificate Full View" className="max-w-full max-h-full rounded-xl md:rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20 object-contain" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }} transition={{ duration: 0.8, ease: "easeInOut" }} className={`fixed inset-0 z-[999] ${isDark ? 'bg-[#2C3947]' : 'bg-[#E8EDF2]'} flex items-center justify-center`}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative flex items-center justify-center">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute w-[180px] h-[180px] border-t-2 border-r-2 border-[#C2A56D] rounded-full opacity-80 shadow-[0_0_30px_rgba(194,165,109,0.3)]"></motion.div>
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className={`absolute w-[130px] h-[130px] border-b-2 border-l-2 ${isDark ? 'border-white/20' : 'border-[#2C3947]/20'} rounded-full`}></motion.div>
              <span className={`text-4xl md:text-5xl font-black tracking-[0.3em] ${isDark ? 'text-[#E8EDF2] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-[#2C3947] drop-shadow-md'}`}>AH<span className="text-[#C2A56D]">.</span></span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#C2A56D]/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      <nav className={`w-full h-20 md:h-24 flex items-center px-3 sm:px-4 md:px-12 border-b ${isDark ? 'border-white/5 bg-[#2C3947]/60' : 'border-[#2C3947]/10 bg-[#E8EDF2]/60'} backdrop-blur-2xl sticky top-0 z-50 transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href={basePrefix || "/"} className="text-lg sm:text-xl md:text-2xl font-black tracking-widest hover:text-[#C2A56D] transition-colors shrink-0">{isAr ? 'أمل' : 'AMAL'}<span className="text-[#C2A56D]">.</span></Link>
          <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center shrink-0">
            <Link href={basePrefix || "/"} className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-xs font-bold ${isDark ? 'text-[#E8EDF2]/90 hover:text-white bg-[#E8EDF2]/10 border-white/10' : 'text-[#2C3947]/80 hover:text-black bg-white border-[#547A95]/30'} px-2.5 sm:px-3 md:px-5 py-2 md:py-2.5 rounded-full border transition-all shadow-sm active:scale-95`}>{isAr ? <ArrowRight size={12}/> : <ArrowLeft size={12}/>} <span className="hidden md:inline">{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span><span className="md:hidden">{isAr ? 'رجوع' : 'Back'}</span></Link>
            <Link href={`${basePrefix}/portfolio`} className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-xs font-bold ${isDark ? 'text-[#E8EDF2]/90 hover:text-white bg-[#E8EDF2]/10 border-white/10' : 'text-[#2C3947]/80 hover:text-black bg-white border-[#547A95]/30'} px-2.5 sm:px-3 md:px-5 py-2 md:py-2.5 rounded-full border transition-all shadow-sm active:scale-95`}><Sparkles size={12} className="sm:w-[14px] sm:h-[14px] md:w-4 md:h-4"/><span className="hidden md:inline">{isAr ? 'معرض الأعمال' : 'Portfolio'}</span><span className="md:hidden">{isAr ? 'الأعمال' : 'Work'}</span></Link>
            <button onClick={toggleLang} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-white text-[#2C3947] border-[#547A95]/30 hover:bg-stone-50'} border px-2.5 sm:px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all`}>{isAr ? 'EN' : 'عربي'}</button>
            <button onClick={toggleTheme} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-[#2C3947] text-white border-[#2C3947] hover:bg-black'} border p-1.5 sm:p-2 md:p-2.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all`} title="Toggle Theme">
              {isDark ? <Sun size={14} className="md:w-4 md:h-4"/> : <Moon size={14} className="md:w-4 md:h-4"/>}
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-16 md:pt-24 pb-10 px-4 md:px-6 max-w-7xl mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={lang} initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }} transition={{ duration: 0.3 }}>
            <div className={`inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 ${isDark ? 'bg-[#C2A56D]/10 border-[#C2A56D]/20' : 'bg-white border-[#C2A56D]/30 shadow-sm'} rounded-full border mb-4 md:mb-6 text-[10px] md:text-xs font-black text-[#C2A56D] uppercase tracking-widest`}><Award size={14} /> {isAr ? 'المعرض البصري' : 'Visual Gallery'}</div>
            <h1 className={`text-3xl sm:text-4xl md:text-6xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-b ${isDark ? 'from-white to-stone-400' : 'from-[#2C3947] to-[#547A95]'} overflow-visible leading-[1.4] pb-[0.2em] pt-2`}>{isAr ? 'السجل' : 'Academic'} <span className="text-[#C2A56D]">{isAr ? 'الأكاديمي.' : 'Record.'}</span></h1>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* المؤهل الأساسي */}
      <section className="px-4 md:px-6 max-w-4xl mx-auto z-10 relative mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center mb-6">
            <span className="px-5 py-2 bg-gradient-to-r from-[#C2A56D] to-[#b39158] text-black font-black text-xs md:text-sm rounded-full shadow-[0_0_20px_rgba(194,165,109,0.4)] flex items-center gap-2">
              <Award size={16} /> {isAr ? 'المؤهل الأكاديمي الأساسي' : 'Primary Academic Degree'}
            </span>
          </div>
          <Tilt glareEnable={true} glareMaxOpacity={0.1} glareColor="#C2A56D" glarePosition="all" tiltMaxAngleX={1} tiltMaxAngleY={1} className="w-full">
            
            <div className="w-full h-[400px] md:h-[350px] [perspective:1500px] group/card cursor-pointer">
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]">
                
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] z-20">
                  <div className={`flex flex-col md:flex-row h-full w-full backdrop-blur-md rounded-3xl overflow-visible border active:scale-[0.98] transition-all duration-500 ${
                    isDark ? 'bg-[#2C3947]/90 border-white/5 text-[#E8EDF2]' : 'bg-white border-stone-200 text-[#2C3947]'
                  }`}>
                    {/* Left Split */}
                    <div 
                      className={`w-full md:w-2/5 flex flex-col justify-between p-6 border-b md:border-b-0 ${isAr ? 'md:border-l' : 'md:border-r'} shrink-0 relative`}
                      style={{
                        borderColor: isDark ? 'rgba(84,122,149,0.2)' : 'rgba(84,122,149,0.1)',
                        background: isDark 
                          ? `radial-gradient(circle at top left, rgba(194,165,109,0.15) 0%, #2C3947 100%)` 
                          : `radial-gradient(circle at top left, rgba(194,165,109,0.08) 0%, #ffffff 100%)`
                      }}
                    >
                      {primaryCert.image && (
                        <div 
                          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-[0.05] group-hover/card:opacity-[0.12] transition-opacity duration-700 pointer-events-none" 
                          style={{ backgroundImage: `url('${primaryCert.image}')` }}
                        />
                      )}
                      
                      <div className="flex flex-col gap-4 relative z-10">
                        <Award size={38} className={isDark ? 'text-white' : 'text-[#C2A56D]'} />
                        <div>
                          <span className={`px-2.5 py-0.5 text-[8px] font-black rounded-full border uppercase tracking-wider ${
                            isDark ? 'bg-white/5 text-stone-300 border-white/10' : 'bg-stone-100 text-stone-600 border-stone-200'
                          }`}>{primaryIssuer}</span>
                        </div>
                      </div>

                      <div className="mt-4 relative z-10">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-stone-500' : 'text-stone-400'}`} dir="ltr">{primaryCert.date}</span>
                      </div>
                    </div>

                    {/* Right Split */}
                    <div className="w-full md:w-3/5 flex flex-col justify-between p-6 overflow-y-auto overflow-x-visible">
                      <div className="flex flex-col gap-3 font-sans pr-1 scrollbar-thin">
                        <h3 className={`text-base md:text-lg font-black leading-[1.7] ${isDark ? 'text-white' : 'text-[#2C3947]'} ${isAr ? 'text-right' : 'text-left'}`}>
                          {primaryName}
                        </h3>
                        <p className={`text-[10.5px] leading-[1.8] ${isDark ? 'text-stone-300' : 'text-stone-700'} ${isAr ? 'text-right' : 'text-left'}`}>
                          {isAr 
                            ? (primaryCert.description_ar || "تم الحصول على هذه الدرجة العلمية في تخصص تقنية البرمجيات وأنظمة الويب المتكاملة مع التركيز على بناء البنى السحابية وتكامل الأنظمة وريادة الأعمال الرقمية.") 
                            : (primaryCert.description_en || "Graduated with honors in Software Engineering, focusing on distributed systems architecture, cloud computing paradigms, and microservices design patterns.")}
                        </p>

                        {(() => {
                          let skillsList = ["Software Engineering", "Cloud Computing", "Web Architecture", "Databases", "Distributed Systems"];
                          if (primaryCert.skills) {
                            try {
                              const parsed = typeof primaryCert.skills === 'string' ? JSON.parse(primaryCert.skills) : primaryCert.skills;
                              if (Array.isArray(parsed) && parsed.length > 0) {
                                skillsList = parsed;
                              }
                            } catch (e) {
                              if (typeof primaryCert.skills === 'string') {
                                skillsList = primaryCert.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
                              }
                            }
                          }
                          return (
                            <div className="flex flex-wrap gap-1.5 mt-2" dir="ltr">
                              {skillsList.map((skill) => (
                                <span key={skill} className={`px-2 py-0.5 text-[8px] font-bold rounded border ${isDark ? 'bg-white/5 text-stone-300 border-white/10' : 'bg-stone-50 text-stone-600 border-stone-100'}`}>{skill}</span>
                              ))}
                            </div>
                          );
                        })()}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-dashed mt-4 text-[9px] text-stone-500 dark:text-stone-400" style={{ borderColor: isDark ? 'rgba(84,122,149,0.2)' : 'rgba(84,122,149,0.1)' }}>
                        <span>
                          {isAr 
                            ? (primaryCert.degree_level_ar || 'المستوى التعليمي: بكالوريوس / Diploma') 
                            : (primaryCert.degree_level_en || 'Degree Level: Higher Software Diploma')}
                        </span>
                        <span className={`font-black italic ${isDark ? 'text-[#C2A56D]' : 'text-[#C2A56D]'}`}>{isAr ? 'مرر لرؤية الوثيقة الحية 🫵' : 'Hover to flip diploma 🫵'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] z-10">
                  <div
                    className={`flex flex-col h-full rounded-3xl overflow-visible border relative justify-end p-6 transition-all duration-500 active:scale-[0.98] ${
                      isDark ? 'border-white/5 shadow-2xl' : 'border-stone-200 shadow-xl'
                    }`}
                    style={{
                      backgroundImage: `url('${primaryCert.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#C2A56D]/15 via-[#2C3947]/70 to-[#2C3947]/95 z-0"></div>
                    
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[9px] font-black rounded border border-white/10 uppercase">{primaryIssuer}</span>
                        <span className="px-3 py-1 bg-[#C2A56D] text-black text-[9px] font-black rounded-full border border-yellow-300/20 shadow-md">
                          {isAr ? 'الوثيقة الرسمية' : 'OFFICIAL DIPLOMA'}
                        </span>
                      </div>
                      
                      <h4 className="text-white font-black text-sm md:text-base leading-[1.7]">{primaryName}</h4>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <span className="text-stone-400 text-[10px] font-black uppercase tracking-wider">{primaryCert.date}</span>
                        <button onClick={(e) => { e.stopPropagation(); setSelectedImg(primaryCert.image); }} className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[10px] font-black rounded-full hover:scale-105 active:scale-95 transition-all backdrop-blur-sm">
                          <span>{isAr ? 'عرض ملء الشاشة' : 'Zoom Full View'}</span>
                          <ZoomIn size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </Tilt>
        </motion.div>
      </section>

      {/* باقي الشهادات */}
      <section className="px-4 md:px-6 max-w-7xl mx-auto z-10 relative">
        <div className="flex items-center justify-center mb-8">
            <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-[#2C3947]/10'}`}></div>
            <span className={`px-4 text-xs font-bold uppercase tracking-widest ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{isAr ? 'الشهادات المهنية والتطويرية' : 'Professional Certificates'}</span>
            <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-[#2C3947]/10'}`}></div>
        </div>
        
        {otherCerts.length > 0 ? (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {otherCerts.map((cert) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} 
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
                  transition={{ duration: 0.4 }} 
                  key={cert.id} 
                  className="col-span-1"
                >
                  <CertificateCard 
                    {...cert} 
                    isDark={isDark} 
                    isAr={isAr} 
                    onZoom={setSelectedImg} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-12 text-stone-500">
            {isAr ? "لا توجد شهادات إضافية متوفرة حالياً." : "No additional certificates available at this time."}
          </div>
        )}
      </section>
      
      <FloatingChat owner="amal" />
    </motion.main>
  );
}
