"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Award, Moon, Sun, ZoomIn, X, Lock, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import FloatingChat from "@/components/FloatingChat";
import ParticleNetwork from "@/components/ParticleNetwork";
import AmalCertificatesPage from "../amal/certificates/page";
import { useSEO } from "@/hooks/useSEO";

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
  name_ar: "وثيقة التخرج الأساسية في تقنية البرمجيات",
  name_en: "Primary Graduate Diploma in Software Technology",
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

const fallbackOtherCerts: CertificateProps[] = [
  {
    id: "cert-coursera-1",
    name_ar: "أخصائي أنظمة الذكاء الاصطناعي التوليدي",
    name_en: "Generative AI Systems Specialist",
    issuer_ar: "كورسيرا",
    issuer_en: "Coursera",
    date: "2026-03-02",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/Coursera-H3AKC1QMLIRA_page-0001.webp",
    featured: false,
    skills: ["Generative AI", "LLM Alignment", "AI Agents"]
  },
  {
    id: "cert-coursera-2",
    name_ar: "أسس البنية التحتية للحوسبة السحابية",
    name_en: "Cloud Architecture Foundations",
    issuer_ar: "كورسيرا",
    issuer_en: "Coursera",
    date: "2026-03-03",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/Coursera-FDBD5M3X44NP_page-0001.webp",
    featured: false,
    skills: ["Cloud Architecture", "AWS", "Infrastructure"]
  },
  {
    id: "cert-coursera-3",
    name_ar: "أوركسترا وكلاء الذكاء الاصطناعي للمؤسسات",
    name_en: "Enterprise Multi-Agent Orchestration",
    issuer_ar: "كورسيرا",
    issuer_en: "Coursera",
    date: "2026-03-04",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/Coursera-BN5Z65E8BW06_page-0001-1.webp",
    featured: false,
    skills: ["Multi-Agent", "LangGraph", "Orchestration"]
  },
  {
    id: "cert-agent-explorer",
    name_ar: "شهادة مستكشف وكلاء الذكاء الاصطناعي",
    name_en: "AI Agent Explorer Certification",
    issuer_ar: "منظمة مستكشف الوكلاء",
    issuer_en: "Agent Explorer Org",
    date: "2026-03-05",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/certificate-agent-explorer_page-0001.webp",
    featured: false,
    skills: ["AI Agents", "Automations", "Python"]
  },
  {
    id: "cert-mpdf-4",
    name_ar: "مهندس نظم الميكروفرونت إند",
    name_en: "Micro-Frontend Systems Engineer",
    issuer_ar: "مجموعة mpdf الهندسية",
    issuer_en: "Mpdf Engineering Group",
    date: "2026-03-06",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/mpdf-4_page-0001-1.webp",
    featured: false,
    skills: ["Micro-Frontends", "Module Federation", "React"]
  },
  {
    id: "cert-other-1",
    name_ar: "شهادة النشر السحابي المتقدم",
    name_en: "Advanced Cloud Deployments Certificate",
    issuer_ar: "الشركاء الأكاديميون والتقنيون",
    issuer_en: "Academic & Tech Partners",
    date: "2026-03-07",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/1761323074618.webp",
    featured: false,
    skills: ["Cloud Deployments", "CI/CD", "Docker"]
  },
  {
    id: "cert-other-2",
    name_ar: "أخصائي بنية تحتية لـ NVIDIA NIM",
    name_en: "NVIDIA NIM Infrastructure Specialist",
    issuer_ar: "مجموعة NIM لشركاء البنية التحتية",
    issuer_en: "NIM Infrastructure Partner Group",
    date: "2026-03-08",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/1745771343714.webp",
    featured: false,
    skills: ["NVIDIA NIM", "GPU Inference", "Docker"]
  },
  {
    id: "cert-other-3",
    name_ar: "الدرجة التأسيسية في التعلم العميق",
    name_en: "Deep Learning Foundations Degree",
    issuer_ar: "التحالف التقني والتعليمي",
    issuer_en: "Technical & Educational Alliance",
    date: "2026-03-09",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/1744152341517.webp",
    featured: false,
    skills: ["Deep Learning", "PyTorch", "Neural Networks"]
  },
  {
    id: "cert-other-4",
    name_ar: "شهادة محاذاة نماذج اللغة الكبيرة للّكنات المحلية",
    name_en: "Saudi Dialect LLM Alignment Certification",
    issuer_ar: "مجموعة أبحاث علام",
    issuer_en: "ALLaM Research Cohort",
    date: "2026-03-10",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/1741152507855.webp",
    featured: false,
    skills: ["LLM Alignment", "Arabic NLP", "Fine-Tuning"]
  },
  {
    id: "cert-other-5",
    name_ar: "مهندس عمليات قواعد البيانات غير الخادمة",
    name_en: "Serverless Database Operations Architect",
    issuer_ar: "مجموعة شركاء Cloudflare D1",
    issuer_en: "Cloudflare D1 Partner Group",
    date: "2026-03-11",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/1742330177160.webp",
    featured: false,
    skills: ["Cloudflare D1", "Serverless DB", "Wrangler"]
  },
  {
    id: "cert-other-6",
    name_ar: "أخصائي البرمجيات الوسيطة عبر Hono.js",
    name_en: "Hono.js Cloud Middleware Specialist",
    issuer_ar: "تحالف البرمجيات الوسيطة التقنية",
    issuer_en: "Technical Middleware Alliance",
    date: "2026-03-12",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/1744763478103.webp",
    featured: false,
    skills: ["Hono.js", "Edge Middleware", "Cloudflare Workers"]
  }
];

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

  const handleCardClick = () => {
    onZoom(cleanImage);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`group/card relative flex flex-col justify-between h-full rounded-[24px] overflow-hidden border transition-all duration-500 cursor-pointer select-none active:scale-[0.98] active:translate-y-[1px] ${
        isDark 
          ? 'bg-[#0a0c10]/85 border-white/5 text-[#E8EDF2] hover:border-[#A1824A]/40 hover:shadow-[0_12px_40px_rgba(161,130,74,0.12)]' 
          : 'bg-white border-stone-200 text-[#15110E] hover:border-[#A1824A]/40 hover:shadow-[0_12px_30px_rgba(161,130,74,0.08)]'
      }`}
    >
      {/* Top Graphic Header: Certificate Image */}
      <div 
        className="relative h-[155px] w-full shrink-0 overflow-hidden border-b flex items-center justify-center bg-stone-500/5"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(21,17,14,0.08)' }}
      >
        <img 
          src={cleanImage} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105" 
        />
        
        {/* Hover Zoom overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={(e) => { e.stopPropagation(); onZoom(cleanImage); }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-[10px] font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <span>{isAr ? 'تكبير' : 'Zoom'}</span>
            <ZoomIn size={11} />
          </button>
          {credential_url && (
            <a 
              href={credential_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 px-4 py-2 bg-[#A1824A] text-black text-[10px] font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{isAr ? 'التحقق' : 'Verify'}</span>
              <Globe size={10} />
            </a>
          )}
        </div>

        {featured && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 bg-[#A1824A] text-black text-[8px] font-black rounded-full shadow-md z-10">
            <Award size={9} className="fill-current text-black animate-pulse" />
            <span>{isAr ? 'أساسية' : 'PRIMARY'}</span>
          </div>
        )}
      </div>

      {/* Bottom Content Body */}
      <div className="flex flex-col flex-1 p-5 justify-between relative z-10">
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <span className={`px-2 py-0.5 text-[8px] font-black rounded-full border uppercase tracking-wider ${
              isDark ? 'bg-white/5 text-stone-350 border-white/10' : 'bg-stone-100 text-stone-600 border-stone-200'
            }`}>{issuer}</span>
            <span className={`text-[8px] font-bold ${isDark ? 'text-stone-500' : 'text-stone-400'}`} dir="ltr">{date}</span>
          </div>

          <h3 className={`text-[13px] sm:text-[14px] font-bold leading-[1.6] pb-[0.15em] mb-2 ${isDark ? 'text-white' : 'text-[#15110E]'} ${isAr ? 'text-right' : 'text-left'}`}>
            {name}
          </h3>
          
          {/* Skills badges */}
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

        <div className="flex items-center justify-between pt-3 border-t border-dashed mt-4" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(21,17,14,0.08)' }}>
          <span className={`text-[9px] font-bold ${isDark ? 'text-stone-500' : 'text-stone-450'} flex items-center gap-1 group-hover/card:text-[#A1824A] transition-colors duration-300`}>
            <span>{isAr ? 'عرض وثيقة الاعتماد' : 'View Full Credential'}</span>
            <ArrowUpRight size={10} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CertificatesRoute() {
  const isAmalDeploy = process.env.NEXT_PUBLIC_OWNER === 'amal';
  if (isAmalDeploy) {
    return <AmalCertificatesPage />;
  }
  return <Certificates />;
}

function Certificates() {
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useSEO('salmeen', lang, 'certificates');

  const [primaryCert, setPrimaryCert] = useState<CertificateProps>(fallbackPrimaryCert);
  const [otherCerts, setOtherCerts] = useState<CertificateProps[]>(fallbackOtherCerts);

  const [authorized, setAuthorized] = useState(true);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  useEffect(() => {
    if (localStorage.getItem('portfolio_auth_salmeen') === 'true') {
      setAuthorized(true);
    }
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'salmen13') {
      localStorage.setItem('portfolio_auth_salmeen', 'true');
      setAuthorized(true);
    } else {
      setPasscodeError(isAr ? 'رمز مرور خاطئ، يرجى المحاولة مرة أخرى.' : 'Incorrect passcode, please try again.');
    }
  };

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
    }
  }, [lang, mounted]);

  useEffect(() => {
    if (!mounted) return;

    async function fetchCertificates() {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
      try {
        const res = await fetch(`${apiBase}/api/certificates?owner=salmeen&limit=100`, { cache: 'no-store' });
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

          const featured = mapped.find((c: any) => c.featured) || mapped[0];
          const others = mapped.filter((c: any) => c.id !== (featured?.id || ''));
          
          setPrimaryCert(featured);
          setOtherCerts(others);
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

  if (false) {
    return (
      <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${isDark ? 'bg-[#050505]' : 'bg-[#F9F8F6]'} overflow-hidden`} dir={isAr ? 'rtl' : 'ltr'}>
        <ParticleNetwork />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#A1824A]/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        
        <div className={`flex flex-col gap-6 p-7 md:p-8 max-w-sm w-full mx-4 rounded-[28px] border shadow-[0_12px_40px_rgba(0,0,0,0.15)] ${
          isDark ? 'border-white/10 bg-black/40 text-white' : 'border-stone-200 bg-white text-stone-900'
        } backdrop-blur-xl text-center relative z-10`}>
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-[#A1824A]/10 border border-[#A1824A]/30 rounded-full flex items-center justify-center text-[#A1824A] shadow-[0_0_20px_rgba(161,130,74,0.15)]">
              <Lock size={22} className="animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <h2 className={`text-xl font-bold leading-tight ${isDark ? 'text-white' : 'text-stone-900'} pb-1`}>
              {isAr ? 'موقع خاص برمز مرور' : 'Passcode Protected'}
            </h2>
            <p className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'} leading-relaxed px-2`}>
              {isAr 
                ? 'هذا المعرض محمي. يرجى إدخال رمز المرور الخاص بسالمين للمتابعة.' 
                : 'This portfolio is protected. Please enter Salmeen\'s passcode to proceed.'}
            </p>
          </div>
          
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-1">
              <input
                type="password"
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setPasscodeError(""); }}
                placeholder={isAr ? 'رمز المرور...' : 'Passcode...'}
                className={`w-full px-5 py-3 rounded-full text-center text-sm font-bold border transition-all duration-300 outline-none focus:ring-2 ${
                  isDark 
                    ? 'bg-white/5 border-white/10 text-white placeholder-stone-500 focus:border-[#A1824A] focus:ring-[#A1824A]/30' 
                    : 'bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-400 focus:border-[#A1824A] focus:ring-[#A1824A]/20'
                }`}
                autoFocus
              />
              {passcodeError && (
                <p className="text-[10px] text-red-500 font-bold mt-1.5">
                  {passcodeError}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#A1824A] hover:bg-[#8c6d32] text-black text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] active:translate-y-[1px] transition-all duration-300 shadow-[0_4px_15px_rgba(161,130,74,0.2)] cursor-pointer"
            >
              {isAr ? 'دخول' : 'Access'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.6 }} 
      className={`min-h-[100dvh] ${isDark ? 'bg-[#050505] text-white' : 'bg-[#F9F8F6] text-[#15110E]'} selection:bg-[#A1824A] pb-32 relative overflow-hidden ${isAr ? 'font-alexandria' : 'font-sans'} transition-colors duration-700`} 
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSelectedImg(null)} 
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedImg(null)} 
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-red-500/80 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors z-50 active:scale-95 cursor-pointer"
            >
              <X size={24} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }} 
              transition={{ type: "spring", stiffness: 300, damping: 25 }} 
              src={selectedImg} 
              alt="Certificate Full View" 
              className="max-w-full max-h-full rounded-xl md:rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20 object-contain" 
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }} 
            transition={{ duration: 0.8, ease: "easeInOut" }} 
            className={`fixed inset-0 z-[999] ${isDark ? 'bg-[#050505]' : 'bg-[#F9F8F6]'} flex items-center justify-center`}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.8, ease: "easeOut" }} 
              className="relative flex items-center justify-center"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute w-[180px] h-[180px] border-t-2 border-r-2 border-[#A1824A] rounded-full opacity-80 shadow-[0_0_30px_rgba(161,130,74,0.3)]"></motion.div>
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className={`absolute w-[130px] h-[130px] border-b-2 border-l-2 ${isDark ? 'border-white/20' : 'border-[#15110E]/20'} rounded-full`}></motion.div>
              <span className={`text-4xl md:text-5xl font-black tracking-[0.3em] ${isDark ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-[#15110E] drop-shadow-md'}`}>SK<span className="text-[#A1824A]">.</span></span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#A1824A]/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Premium UI/UX Nav bar */}
      <nav className={`w-full h-20 flex items-center px-4 md:px-12 border-b ${
        isDark ? 'border-white/5 bg-[#050505]/65' : 'border-stone-200/50 bg-white/65'
      } backdrop-blur-2xl sticky top-0 z-50 transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="text-lg sm:text-xl md:text-2xl font-black tracking-widest hover:text-[#A1824A] transition-colors shrink-0">
            {isAr ? 'سالمين' : 'SALMEEN'}
            <span className="text-[#A1824A]">.</span>
          </Link>
          
          <div className="flex gap-2 sm:gap-3 items-center shrink-0">
            <Link 
              href="/" 
              className={`flex items-center gap-2 text-xs sm:text-sm font-black px-5 sm:px-6 py-3 rounded-full border transition-all duration-300 shadow-sm active:scale-[0.98] active:translate-y-[1px] ${
                isDark 
                  ? 'text-stone-300 hover:text-white hover:bg-white/5 bg-white/5 border-white/10' 
                  : 'text-stone-600 hover:text-black hover:bg-stone-50 bg-white border-stone-200'
              }`}
            >
              {isAr ? <ArrowRight size={14}/> : <ArrowLeft size={14}/>}
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </Link>
            
            <Link 
              href="/portfolio" 
              className={`flex items-center gap-2 text-xs sm:text-sm font-black px-5 sm:px-6 py-3 rounded-full border transition-all duration-300 shadow-sm active:scale-[0.98] active:translate-y-[1px] ${
                isDark 
                  ? 'text-stone-300 hover:text-white hover:bg-white/5 bg-white/5 border-white/10' 
                  : 'text-stone-600 hover:text-black hover:bg-stone-50 bg-white border-stone-200'
              }`}
            >
              <Sparkles size={14} />
              <span>{isAr ? 'معرض الأعمال' : 'Portfolio'}</span>
            </Link>
            
            <button 
              onClick={toggleLang} 
              className={`border px-4 sm:px-5 py-3 rounded-full text-xs sm:text-sm font-black shadow-sm hover:scale-[1.02] active:scale-[0.98] active:translate-y-[1px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A1824A]/40 cursor-pointer ${
                isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-white text-black border-stone-200 hover:bg-stone-50'
              }`}
            >
              {isAr ? 'EN' : 'عربي'}
            </button>
            
            <button 
              onClick={toggleTheme} 
              className={`border p-3 rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] active:translate-y-[1px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A1824A]/40 cursor-pointer ${
                isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-[#15110E] text-white border-[#15110E] hover:bg-black'
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </nav>

      <section className="pt-16 md:pt-24 pb-10 px-4 md:px-6 max-w-7xl mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={lang} initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }} transition={{ duration: 0.3 }}>
            <div className={`inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 ${isDark ? 'bg-[#A1824A]/10 border-[#A1824A]/20' : 'bg-white border-[#A1824A]/30 shadow-sm'} rounded-full border mb-4 md:mb-6 text-[10px] md:text-xs font-black text-[#A1824A] uppercase tracking-widest`}><Award size={14} /> {isAr ? 'المعرض البصري' : 'Visual Gallery'}</div>
            <h1 className={`text-3xl sm:text-4xl md:text-6xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-b ${isDark ? 'from-white to-stone-400' : 'from-[#15110E] to-stone-500'} overflow-visible leading-[1.4] pb-[0.2em] pt-2`}>{isAr ? 'السجل' : 'Academic'} <span className="text-[#A1824A]">{isAr ? 'الأكاديمي.' : 'Record.'}</span></h1>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* المؤهل الأساسي */}
      <section className="px-4 md:px-6 max-w-4xl mx-auto z-10 relative mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center mb-6">
            <span className="px-5 py-2 bg-[#A1824A] hover:bg-[#8c6d32] text-black font-black text-xs md:text-sm rounded-full shadow-[0_4px_15px_rgba(161,130,74,0.25)] flex items-center gap-2">
              <Award size={16} /> {isAr ? 'المؤهل الأكاديمي الأساسي' : 'Primary Academic Degree'}
            </span>
          </div>

          <div 
            onClick={() => setSelectedImg(primaryCert.image)}
            className={`w-full flex flex-col md:flex-row rounded-[24px] overflow-hidden border transition-all duration-500 cursor-pointer select-none active:scale-[0.98] active:translate-y-[1px] ${
              isDark 
                ? 'bg-[#0a0c10]/85 border-white/5 text-[#E8EDF2] hover:border-[#A1824A]/40 hover:shadow-[0_12px_40px_rgba(161,130,74,0.12)]' 
                : 'bg-white border-stone-200 text-[#15110E] hover:border-[#A1824A]/40 hover:shadow-[0_12px_30px_rgba(161,130,74,0.08)]'
            }`}
          >
            {/* Left Column details */}
            <div 
              className={`w-full md:w-3/5 flex flex-col justify-between p-6 sm:p-8 border-b md:border-b-0 ${isAr ? 'md:border-l border-dashed' : 'md:border-r border-dashed'}`}
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(21,17,14,0.08)' }}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`px-2.5 py-0.5 text-[8px] font-black rounded-full border uppercase tracking-wider ${
                    isDark ? 'bg-white/5 text-stone-300 border-white/10' : 'bg-stone-100 text-stone-600 border-stone-200'
                  }`}>{primaryIssuer}</span>
                  <span className={`text-[8.5px] font-black tracking-widest ${isDark ? 'text-stone-500' : 'text-stone-400'}`} dir="ltr">{primaryCert.date}</span>
                </div>

                <h3 className={`text-base md:text-lg font-black leading-[1.6] pb-[0.15em] ${isDark ? 'text-white' : 'text-[#15110E]'} ${isAr ? 'text-right' : 'text-left'}`}>
                  {primaryName}
                </h3>

                <p className={`text-[11px] leading-[1.8] ${isDark ? 'text-stone-300' : 'text-stone-700'} ${isAr ? 'text-right' : 'text-left'}`}>
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

              <div className="flex items-center justify-between pt-4 border-t border-dashed mt-6" style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(21,17,14,0.08)' }}>
                <span className={`text-[9px] font-bold ${isDark ? 'text-stone-500' : 'text-stone-450'}`} dir="ltr">
                  {isAr 
                    ? (primaryCert.degree_level_ar || 'المستوى التعليمي: بكالوريوس / Diploma') 
                    : (primaryCert.degree_level_en || 'Degree Level: Higher Software Diploma')}
                </span>
                <span className={`text-[9px] font-black italic text-[#A1824A] hover:underline`}>{isAr ? 'عرض الوثيقة 🫵' : 'View Diploma 🫵'}</span>
              </div>
            </div>

            {/* Right Column visual preview */}
            <div 
              className="w-full md:w-2/5 h-[220px] md:h-auto overflow-hidden relative flex items-center justify-center p-6"
              style={{
                background: isDark 
                  ? `radial-gradient(circle at center, rgba(161,130,74,0.15) 0%, #0a0c10 100%)` 
                  : `radial-gradient(circle at center, rgba(161,130,74,0.05) 0%, #ffffff 100%)`
              }}
            >
              {primaryCert.image ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-xl group-hover/card:scale-[1.02] transition-transform duration-500">
                  <img src={primaryCert.image} alt={primaryName} className="w-full h-full object-cover" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedImg(primaryCert.image); }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-[10px] font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                    >
                      <span>{isAr ? 'تكبير' : 'Zoom'}</span>
                      <ZoomIn size={11} />
                    </button>
                    {primaryCert.credential_url && (
                      <a 
                        href={primaryCert.credential_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#A1824A] text-black text-[10px] font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>{isAr ? 'التحقق' : 'Verify'}</span>
                        <Globe size={10} />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <Award size={36} className={isDark ? 'text-white/30' : 'text-[#A1824A]/40'} />
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* باقي الشهادات */}
      <section className="px-4 md:px-6 max-w-7xl mx-auto z-10 relative">
        <div className="flex items-center justify-center mb-8">
            <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-[#15110E]/10'}`}></div>
            <span className={`px-4 text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{isAr ? 'الشهادات المهنية والتطويرية' : 'Professional Certificates'}</span>
            <div className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-[#15110E]/10'}`}></div>
        </div>
        
        {otherCerts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          </div>
        ) : (
          <div className="text-center py-12 text-stone-500">
            {isAr ? "لا توجد شهادات إضافية متوفرة حالياً." : "No additional certificates available at this time."}
          </div>
        )}
      </section>
      
      <FloatingChat />
    </motion.main>
  );
}
