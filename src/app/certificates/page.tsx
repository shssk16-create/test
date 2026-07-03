"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Menu } from "lucide-react";
import Link from "next/link";
import { useSEO } from "@/hooks/useSEO";
import AmalCertificatesPage from "../amal/certificates/page";
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
  name_ar: "وثيقة التخرج الأساسية في تقنية البرمجيات",
  name_en: "Primary Graduate Diploma in Software Technology",
  issuer_ar: "الجامعة الوطنية",
  issuer_en: "National University",
  date: "2026-06-01",
  credential_url: "",
  image: "",
  featured: true,
  skills: ["Software Engineering", "Cloud Computing", "Web Architecture", "Databases", "Distributed Systems"],
  description_ar: "تم الحصول على هذه الدرجة العلمية في تخصص تقنية البرمجيات وأنظمة الويب المتكاملة مع التركيز على بناء البنى السحابية وتكامل الأنظمة وريادة الأعمال الرقمية.",
  description_en: "Graduated with honors in Software Engineering, focusing on distributed systems architecture, cloud computing paradigms, and microservices design patterns.",
  degree_level_ar: "بكالوريوس / Diploma",
  degree_level_en: "Higher Software Diploma"
};

const fallbackOtherCerts: CertificateProps[] = [
  {
    id: "cert-coursera-1",
    name_ar: "أخصائي أنظمة الذكاء الاصطناعي التوليدي",
    name_en: "Generative AI Systems Specialist",
    issuer_ar: "كورسيرا",
    issuer_en: "Coursera",
    date: "26-03-02",
    credential_url: "",
    image: "",
    featured: false,
    skills: ["Generative AI", "LLM Alignment", "AI Agents"]
  },
  {
    id: "cert-coursera-2",
    name_ar: "أسس البنية التحتية للحوسبة السحابية",
    name_en: "Cloud Architecture Foundations",
    issuer_ar: "كورسيرا",
    issuer_en: "Coursera",
    date: "26-03-03",
    credential_url: "",
    image: "",
    featured: false,
    skills: ["Cloud Architecture", "AWS", "Infrastructure"]
  },
  {
    id: "cert-coursera-3",
    name_ar: "أوركسترا وكلاء الذكاء الاصطناعي للمؤسسات",
    name_en: "Enterprise Multi-Agent Orchestration",
    issuer_ar: "كورسيرا",
    issuer_en: "Coursera",
    date: "26-03-04",
    credential_url: "",
    image: "",
    featured: false,
    skills: ["Multi-Agent", "LangGraph", "Orchestration"]
  },
  {
    id: "cert-agent-explorer",
    name_ar: "شهادة مستكشف وكلاء الذكاء الاصطناعي",
    name_en: "AI Agent Explorer Certification",
    issuer_ar: "منظمة مستكشف الوكلاء",
    issuer_en: "Agent Explorer Org",
    date: "26-03-05",
    credential_url: "",
    image: "",
    featured: false,
    skills: ["AI Agents", "Automations", "Python"]
  },
  {
    id: "cert-mpdf-4",
    name_ar: "مهندس نظم الميكروفرونت إند",
    name_en: "Micro-Frontend Systems Engineer",
    issuer_ar: "مجموعة mpdf الهندسية",
    issuer_en: "Mpdf Engineering Group",
    date: "26-03-06",
    credential_url: "",
    image: "",
    featured: false,
    skills: ["Micro-Frontends", "Module Federation", "React"]
  },
  {
    id: "cert-other-1",
    name_ar: "شهادة النشر السحابي المتقدم",
    name_en: "Advanced Cloud Deployments Certificate",
    issuer_ar: "الشركاء الأكاديميون والتقنيون",
    issuer_en: "Academic & Tech Partners",
    date: "26-03-07",
    credential_url: "",
    image: "",
    featured: false,
    skills: ["Cloud Deployments", "CI/CD", "Docker"]
  },
  {
    id: "cert-other-2",
    name_ar: "أخصائي بنية تحتية لـ NVIDIA NIM",
    name_en: "NVIDIA NIM Infrastructure Specialist",
    issuer_ar: "مجموعة NIM لشركاء البنية التحتية",
    issuer_en: "NIM Infrastructure Partner Group",
    date: "26-03-08",
    credential_url: "",
    image: "",
    featured: false,
    skills: ["NVIDIA NIM", "GPU Inference", "Docker"]
  },
  {
    id: "cert-other-3",
    name_ar: "الدرجة التأسيسية في التعلم العميق",
    name_en: "Deep Learning Foundations Degree",
    issuer_ar: "التحالف التقني والتعليمي",
    issuer_en: "Technical & Educational Alliance",
    date: "26-03-09",
    credential_url: "",
    image: "",
    featured: false,
    skills: ["Deep Learning", "PyTorch", "Neural Networks"]
  },
  {
    id: "cert-other-4",
    name_ar: "شهادة محاذاة نماذج اللغة الكبيرة للّكنات المحلية",
    name_en: "Saudi Dialect LLM Alignment Certification",
    issuer_ar: "مجموعة أبحاث علام",
    issuer_en: "ALLaM Research Cohort",
    date: "26-03-10",
    credential_url: "",
    image: "",
    featured: false,
    skills: ["LLM Alignment", "Arabic NLP", "Fine-Tuning"]
  },
  {
    id: "cert-other-5",
    name_ar: "مهندس عمليات قواعد البيانات غير الخادمة",
    name_en: "Serverless Database Operations Architect",
    issuer_ar: "مجموعة شركاء Cloudflare D1",
    issuer_en: "Cloudflare D1 Partner Group",
    date: "26-03-11",
    credential_url: "",
    image: "",
    featured: false,
    skills: ["Cloudflare D1", "Serverless DB", "Wrangler"]
  },
  {
    id: "cert-other-6",
    name_ar: "أخصائي البرمجيات الوسيطة عبر Hono.js",
    name_en: "Hono.js Cloud Middleware Specialist",
    issuer_ar: "تحالف البرمجيات الوسيطة التقنية",
    issuer_en: "Technical Middleware Alliance",
    date: "26-03-12",
    credential_url: "",
    image: "",
    featured: false,
    skills: ["Hono.js", "Edge Middleware", "Cloudflare Workers"]
  }
];

export default function CertificatesRoute() {
  const isAmalDeploy = process.env.NEXT_PUBLIC_OWNER === 'amal';
  if (isAmalDeploy) {
    return <AmalCertificatesPage />;
  }
  return <Certificates />;
}

// Convert numbers to East Arabic digits
const toEastArabic = (num: number | string): string => {
  const digits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map(char => {
    const d = parseInt(char);
    return isNaN(d) ? char : digits[d];
  }).join('');
};

function Certificates() {
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSEO('salmeen', lang, 'certificates');

  const [primaryCert, setPrimaryCert] = useState<CertificateProps>(fallbackPrimaryCert);
  const [otherCerts, setOtherCerts] = useState<CertificateProps[]>(fallbackOtherCerts);

  useEffect(() => { 
    setMounted(true); 
    document.documentElement.classList.remove('amal-theme');
    const l = localStorage.getItem('sk_lang'); 
    if(l) setLang(l as 'ar'|'en'); 
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
  
  const toggleLang = () => { 
    const n = lang === 'ar' ? 'en' : 'ar'; 
    setLang(n); 
    localStorage.setItem('sk_lang', n); 
    window.dispatchEvent(new Event('lang-change')); 
  };
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedImg(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const isAr = lang === 'ar';

  const primaryName = isAr ? primaryCert.name_ar : primaryCert.name_en;
  const primaryIssuer = isAr ? primaryCert.issuer_ar : primaryCert.issuer_en;

  if(!mounted) return null;

  return (
    <div className="bg-[#0D0D0D] text-[#EDE8DC] min-h-screen flex flex-col font-sans select-none overflow-x-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Zoom Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSelectedImg(null)} 
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button 
              onClick={() => setSelectedImg(null)} 
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-red-500/80 flex items-center justify-center text-white transition-colors z-50 cursor-pointer rounded-none border border-white/10"
            >
              <X size={24} />
            </button>
            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              transition={{ duration: 0.3 }} 
              src={selectedImg || undefined} 
              alt="Certificate Full View" 
              className="max-w-full max-h-full border border-white/10 object-contain rounded-none" 
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>



      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-[#0D0D0D]/90 backdrop-blur-md flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex justify-between items-center">
          <div className="font-display text-2xl md:text-3xl font-bold text-start">
            <Link href="/" aria-label="الرئيسية">{isAr ? "سالمين" : "SALMEEN"}</Link>
          </div>
          
          <div className="flex gap-4 items-center font-mono-en text-xs uppercase tracking-widest">
            <div className="hidden md:flex gap-6 items-center">
              <Link href="/" className="hover:text-[#C8A96E] transition-colors duration-300">
                {isAr ? "الرئيسية" : "Home"}
              </Link>
              <Link href="/portfolio" className="hover:text-[#C8A96E] transition-colors duration-300">
                {isAr ? "المشاريع" : "Portfolio"}
              </Link>
            </div>
            <button 
              onClick={toggleLang} 
              className="hover:text-[#C8A96E] transition-colors duration-300 cursor-pointer font-bold border-l border-white/10 pl-4 ml-2"
            >
              {isAr ? "ENGLISH" : "عربي"}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-[#EDE8DC] hover:text-[#C8A96E] transition-colors p-1"
              aria-label="Toggle Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="keep-rounds fixed inset-0 z-[100] bg-black/85 backdrop-blur-md md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: isAr ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="keep-rounds absolute top-0 bottom-0 w-72 max-w-[80vw] bg-[#0D0D0D] border-x border-white/5 p-6 flex flex-col justify-between"
              style={{ [isAr ? 'right' : 'left']: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="font-display text-xl font-bold text-white">{isAr ? "سالمين" : "SALMEEN"}</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-white hover:text-[#C8A96E] transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-6 text-sm uppercase tracking-wider font-mono-en" dir={isAr ? "rtl" : "ltr"}>
                  <Link 
                    href="/" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#C8A96E] transition-colors py-2 border-b border-white/5 text-start"
                  >
                    {isAr ? "الرئيسية" : "Home"}
                  </Link>
                  <Link 
                    href="/portfolio" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#C8A96E] transition-colors py-2 border-b border-white/5 text-start"
                  >
                    {isAr ? "المشاريع" : "Portfolio"}
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => { toggleLang(); setMobileMenuOpen(false); }}
                  className="w-full text-center hover:text-[#C8A96E] transition-colors py-3 border border-white/10 font-bold font-mono-en text-xs uppercase tracking-widest"
                >
                  {isAr ? "ENGLISH" : "عربي"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <section className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full text-start">
        <div className="text-sm uppercase tracking-widest font-mono-en text-[#C8A96E] mb-3">
          {isAr ? "الاعتمادات العلمية والمهنية" : "ACADEMIC & PROFESSIONAL CREDENTIALS"}
        </div>
        <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight text-white">
          {isAr ? "السجل الأكاديمي والشهادات" : "Academic & Professional Record"}
        </h1>
        <div className="hairline-separator mt-12"></div>
      </section>

      {/* Primary Degree */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6 text-start">
            <div className="text-xs uppercase tracking-widest font-mono-en text-[#C8A96E]">
              {isAr ? "المؤهل العلمي الأساسي" : "PRIMARY DEGREE"}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
              {primaryName}
            </h2>
            <div className="text-xs font-mono-en text-[#C8A96E]/80">
              {primaryIssuer} • {primaryCert.date}
            </div>
            <p className="text-sm leading-relaxed text-[#EDE8DC]/70">
              {isAr ? primaryCert.description_ar : primaryCert.description_en}
            </p>
            {(() => {
              let skillsList: string[] = [];
              if (primaryCert.id === "cert-primary") {
                skillsList = ["Software Engineering", "Cloud Computing", "Web Architecture", "Databases", "Distributed Systems"];
              }
              if (primaryCert.skills) {
                try {
                  const parsed = typeof primaryCert.skills === 'string' ? JSON.parse(primaryCert.skills) : primaryCert.skills;
                  if (Array.isArray(parsed)) {
                    skillsList = parsed;
                  }
                } catch (e) {
                  if (typeof primaryCert.skills === 'string') {
                    skillsList = primaryCert.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
                  }
                }
              }
              if (skillsList.length === 0) return null;
              return (
                <div className="flex flex-wrap gap-2 justify-start pt-2" dir="ltr">
                  {skillsList.map((skill: string) => (
                    <span key={skill} className="px-2 py-0.5 text-[10px] font-mono-en border border-white/10 text-white/80">
                      {skill}
                    </span>
                  ))}
                </div>
              );
            })()}
            <div className="pt-4 flex gap-4 justify-start">
              {primaryCert.image && (
                <button 
                  onClick={() => setSelectedImg(primaryCert.image)}
                  className="border border-[#C8A96E] text-[#C8A96E] px-6 py-2.5 text-xs font-mono-en uppercase tracking-widest hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-all duration-300 cursor-pointer"
                >
                  {isAr ? "عرض وثيقة التخرج" : "VIEW DIPLOMA"}
                </button>
              )}
              {primaryCert.credential_url && (
                <a 
                  href={primaryCert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/20 text-white/80 px-6 py-2.5 text-xs font-mono-en uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  {isAr ? "التحقق" : "VERIFY URL"}
                </a>
              )}
            </div>
          </div>
          {primaryCert.image ? (
            <div className="lg:col-span-7 w-full border border-white/10 p-2 bg-white/[0.01]">
              <img 
                src={primaryCert.image} 
                alt={primaryName} 
                className="w-full h-auto max-h-[500px] object-cover cursor-zoom-in hover:opacity-90 transition-opacity" 
                onClick={() => setSelectedImg(primaryCert.image)}
              />
            </div>
          ) : (
            <div className="lg:col-span-7 w-full border border-white/10 p-12 bg-white/[0.01] flex flex-col items-center justify-center text-white/30 font-mono-en text-xs uppercase tracking-widest min-h-[300px]">
              <Sparkles className="w-8 h-8 mb-4 text-[#C8A96E]/40" />
              {isAr ? "لا توجد وثيقة مرفقة" : "No Document Attached"}
            </div>
          )}
        </div>
        <div className="hairline-separator mt-24"></div>
      </section>

      {/* Other Certificates */}
      <section className="py-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <h2 className="text-xs uppercase tracking-widest font-mono-en text-[#C8A96E] mb-12 text-start">
          {isAr ? "الشهادات والاعتمادات التخصصية" : "SPECIALIZED CERTIFICATIONS"}
        </h2>

        <div className="flex flex-col w-full">
          {otherCerts.map((cert, idx) => {
            const certName = isAr ? cert.name_ar : cert.name_en;
            const certIssuer = isAr ? cert.issuer_ar : cert.issuer_en;
            const formattedIndex = toEastArabic(String(idx + 1).padStart(2, '0'));
            
            let skillsList: string[] = [];
            if (cert.skills) {
              try {
                const parsed = typeof cert.skills === 'string' ? JSON.parse(cert.skills) : cert.skills;
                if (Array.isArray(parsed)) {
                  skillsList = parsed;
                }
              } catch (e) {
                if (typeof cert.skills === 'string') {
                  skillsList = cert.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
                }
              }
            }
            
            return (
              <div 
                key={cert.id} 
                className={`group py-8 border-b border-white/10 flex flex-col md:flex-row gap-6 md:items-center justify-between transition-colors duration-300 px-4 ${cert.image ? 'hover:bg-white/[0.01] cursor-pointer' : 'cursor-default'}`}
                onClick={() => cert.image && setSelectedImg(cert.image)}
              >
                <div className="flex gap-6 items-start md:items-center">
                  {/* Num */}
                  <div className="font-mono-en text-3xl text-[#C8A96E]/40 group-hover:text-[#C8A96E] transition-colors duration-300 shrink-0">
                    {formattedIndex}
                  </div>

                  {/* Info */}
                  <div className="space-y-1 text-start">
                    <h3 className="text-lg md:text-xl font-display font-bold text-white relative inline-block">
                      {certName}
                      <span className="absolute bottom-0 right-0 h-[1px] bg-[#C8A96E] w-0 group-hover:w-full transition-all duration-300 origin-right"></span>
                    </h3>
                    <div className="text-xs text-[#EDE8DC]/50 font-mono-en mt-1">
                      {certIssuer} • {cert.date}
                    </div>
                  </div>
                </div>

                {/* Actions & Skills */}
                <div className="flex gap-4 items-center justify-between md:justify-end shrink-0">
                  {skillsList.length > 0 && (
                    <div className="hidden lg:flex gap-1.5 font-mono-en text-[9px] text-[#EDE8DC]/40 uppercase">
                      {skillsList.slice(0, 3).join(" | ")}
                    </div>
                  )}
                  <div className="flex gap-3">
                    {cert.image && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedImg(cert.image); }}
                        className="border border-[#C8A96E]/30 text-[#C8A96E] px-4 py-1.5 text-[10px] font-mono-en uppercase tracking-widest hover:border-[#C8A96E] hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-all duration-300"
                      >
                        {isAr ? "عرض" : "VIEW"}
                      </button>
                    )}
                    {cert.credential_url && (
                      <a 
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="border border-white/10 text-white/50 px-4 py-1.5 text-[10px] font-mono-en uppercase tracking-widest hover:border-white/30 hover:text-white transition-all duration-300"
                      >
                        {isAr ? "التحقق" : "VERIFY"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FloatingChat />
    </div>
  );
}
