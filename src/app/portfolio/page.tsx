"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useSEO } from "@/hooks/useSEO";
import AmalPortfolioPage from "../amal/portfolio/page";
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

export interface ProjectProps {
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  category: string[];
  accentColor: string;
  thumbIcon: string;
  problem_ar: string;
  problem_en: string;
  decision_ar: string;
  decision_en: string;
  result_ar: string;
  result_en: string;
  stack: string[];
  year: string;
  featured?: boolean;
  logo?: string;
  image?: string;
  link?: string;
}

const fallbackProjects: ProjectProps[] = [
  {
    title_ar: "هلا AI — منصة توليد محتوى تسويقي بلهجة سعودية",
    title_en: "Hala AI — Saudi dialect marketing content generation platform",
    subtitle_ar: "منصة سحابية متكاملة لإنتاج المحتوى التسويقي بلهجة بيضاء",
    subtitle_en: "SaaS White-Dialect Content Generator",
    category: ["SaaS", "AI & Automation"],
    accentColor: "#58A8B4",
    thumbIcon: "Sparkles",
    problem_ar: "كان تجار التجارة الإلكترونية السعوديون على سلة وزد يكتبون المحتوى العربي يدويًا دون أدوات ذكاء اصطناعي تفهم اللهجات المحلية.",
    problem_en: "Saudi e-commerce merchants on Salla and Zid wrote all Arabic content manually with no dialect-aware AI tool.",
    decision_ar: "تصميم وبناء نظام SaaS سحابي متكامل باستخدام نموذج ALLaM-2 لتوليد اللهجة السعودية البيضاء وربطه مع تطبيق واتساب للأعمال.",
    decision_en: "Designed and built a Cloudflare-native middleware SaaS using ALLaM-2 for Saudi white-dialect generation and WhatsApp Business API for merchant delivery.",
    result_ar: "تسليم بنية إنتاجية كاملة جاهزة للعمل — الحوسبة السحابية الطرفية وقاعدة البيانات D1 ومخزن R2 والقطع البرمجية الدائمة وقبول التطبيق في متجر سلة.",
    result_en: "Full production architecture delivered — Workers, D1, R2, Durable Objects, Salla app submission-ready.",
    stack: ["Cloudflare Workers", "D1", "ALLaM-2", "Hono.js"],
    year: "2024",
    featured: true,
    image: "",
    link: "https://salla.sa",
  },
  {
    title_ar: "أورا للتسويق — وكالة تسويق رقمي متكاملة",
    title_en: "Aura Marketing — Full-Service Digital Agency",
    subtitle_ar: "وكالة تسويق رقمي متكاملة الخدمات",
    subtitle_en: "Full-Service Digital Marketing Agency",
    category: ["Agency"],
    accentColor: "#438FB3",
    thumbIcon: "Globe",
    problem_ar: "تفتقر الشركات الصغيرة والمتوسطة في المنطقة الغربية بالمملكة العربية السعودية إلى حلول تسويقية رقمية احترافية وبأسعار مناسبة.",
    problem_en: "SMBs in Saudi Arabia's Western Region lacked affordable, professional digital presence.",
    decision_ar: "تأسيس وتشغيل وكالة تسويق رقمي متكاملة تجمع بين هندسة اللغويات العربية والتطوير البرمجي الشامل للمنصات الرقمية.",
    decision_en: "Founded and operated a full-service digital agency combining Arabic linguistics expertise with full-stack development.",
    result_ar: "أكثر من 15 عميلًا نشطًا بما في ذلك أساس القابضة ومحطات درب، والعمل مستمر بنجاح منذ عام 2020.",
    result_en: "15+ active clients including Asas Holding and Darb Stations, operating since 2020.",
    stack: ["Next.js", "Laravel", "SEO", "Schema Markup"],
    year: "2020",
    logo: "",
    image: "",
    link: "https://aurateam3.com",
  },
  {
    title_ar: "أورا AI استوديو — منصة أدوات الذكاء الاصطناعي المغلقة",
    title_en: "Aura AI Studio — Multi-Agent Closed-Beta SaaS",
    subtitle_ar: "منصة متعددة الوكلاء في مرحلة البيتا المغلقة",
    subtitle_en: "Multi-Agent Closed-Beta SaaS",
    category: ["SaaS", "AI & Automation"],
    accentColor: "#3C3489",
    thumbIcon: "Cpu",
    problem_ar: "احتاج فريق الوكالة المكون من 50 عضوًا إلى أدوات ذكاء اصطناعي مخصصة لسير العمل التسويقي دون توفر حلول تجارية جاهزة ومناسبة.",
    problem_en: "A 50-member agency cohort needed specialized AI tools for marketing workflows with no suitable off-the-shelf solution.",
    decision_ar: "بناء منصة بيتا مغلقة تعتمد على معمارية متعددة الوكلاء الذكية على بنية NVIDIA NIM مع توزيع النماذج ديناميكيًا حسب الدور وصلاحيات الوصول.",
    decision_en: "Architected an 8-agent closed-beta SaaS on NVIDIA NIM with role-based access and per-agent model routing.",
    result_ar: "إطلاق ناجح للنسخة التجريبية المغلقة — باستخدام Next.js 15 وقاعدة بيانات Supabase وتقنيات Cloudflare ونموذج Llama 3.3 70B.",
    result_en: "Successful closed beta — Next.js 15, Supabase, Cloudflare Pages, Llama 3.3 70B.",
    stack: ["Next.js 15", "Supabase", "NVIDIA NIM", "Cloudflare"],
    year: "2024",
    logo: "",
    image: "",
    link: "https://aurateam3.com",
  },
  {
    title_ar: "أتمتة العمليات التسويقية — محركات ونصوص ونماذج ذكية",
    title_en: "Marketing Automation — Automated Content Pipelines",
    subtitle_ar: "أتمتة خطوط إنتاج وتوزيع المحتوى",
    subtitle_en: "Automated Content Pipelines",
    category: ["AI & Automation", "Agency"],
    accentColor: "#633806",
    thumbIcon: "Workflow",
    problem_ar: "كان فريق الوكالة يقضي ساعات طويلة يدويًا في إنتاج وجدولة المحتوى لعشرات الحسابات أسبوعيًا.",
    problem_en: "Agency team spent hours manually producing and scheduling content for dozens of clients every week.",
    decision_ar: "تطوير مسارات أتمتة عبر منصة n8n تربط نماذج Groq وGemini وDeepSeek مع إرسال الإشعارات عبر Telegram Bot والتتبع في Google Sheets.",
    decision_en: "Built multi-model n8n workflows chaining Groq, Gemini, and DeepSeek with Telegram Bot delivery and Google Sheets tracking.",
    result_ar: "تقليل الوقت المستغرق في إنتاج وتجهيز المحتوى بنسبة 70% لجميع حسابات العملاء النشطة.",
    result_en: "Reduced content production time by 70% across all active client accounts.",
    stack: ["n8n", "Groq", "Gemini", "Telegram Bot"],
    year: "2023",
    logo: "",
    image: "",
    link: "https://darbstations.com.sa",
  }
];

export default function PortfolioRoute() {
  const isAmalDeploy = process.env.NEXT_PUBLIC_OWNER === 'amal';
  if (isAmalDeploy) {
    return <AmalPortfolioPage />;
  }
  return <Portfolio />;
}

// Convert numbers to East Arabic digits
const toEastArabic = (num: number | string): string => {
  const digits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map(char => {
    const d = parseInt(char);
    return isNaN(d) ? char : digits[d];
  }).join('');
};

function Portfolio() {
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [projectsList, setProjectsList] = useState<ProjectProps[]>(fallbackProjects);
  const [activeFilter, setActiveFilter] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useSEO('salmeen', lang, 'portfolio');

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

    async function fetchProjects() {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
      try {
        const res = await fetch(`${apiBase}/api/projects?owner=salmeen&limit=100`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((item: any) => {
            let cat: string[] = ["SaaS"];
            try {
              if (item.category) {
                cat = typeof item.category === 'string' ? JSON.parse(item.category) : item.category;
                if (!Array.isArray(cat)) cat = [cat];
              }
            } catch (e) {
              if (typeof item.category === 'string') {
                cat = item.category.split(',').map((s: string) => s.trim());
              }
            }

            let st: string[] = [];
            try {
              if (item.stack) {
                st = typeof item.stack === 'string' ? JSON.parse(item.stack) : item.stack;
                if (!Array.isArray(st)) st = [st];
              }
            } catch (e) {
              if (typeof item.stack === 'string') {
                st = item.stack.split(',').map((s: string) => s.trim());
              }
            }

            return {
              title_ar: item.title_ar || item.title || "",
              title_en: item.title_en || item.title || "",
              subtitle_ar: item.subtitle_ar || item.subtitle || "",
              subtitle_en: item.subtitle_en || item.subtitle || "",
              category: cat,
              accentColor: item.accentColor || "#58A8B4",
              thumbIcon: item.thumbIcon || "Sparkles",
              problem_ar: item.problem_ar || item.problem || "",
              problem_en: item.problem_en || item.problem || "",
              decision_ar: item.decision_ar || item.decision || "",
              decision_en: item.decision_en || item.decision || "",
              result_ar: item.result_ar || item.result || "",
              result_en: item.result_en || item.result || "",
              stack: st,
              year: item.year,
              featured: item.featured === 1 || item.featured === true,
              logo: cleanCdnUrl(item.logo, apiBase),
              image: cleanCdnUrl(item.image, apiBase),
              link: item.link || ""
            };
          });
          setProjectsList(mapped);
        }
      } catch (err) {
        console.warn("CMS API is offline. Using fallback local project data.");
      }
    }

    fetchProjects();
  }, [mounted]);

  const toggleLang = () => { 
    const n = lang === 'ar' ? 'en' : 'ar'; 
    setLang(n); 
    localStorage.setItem('sk_lang', n); 
    window.dispatchEvent(new Event('lang-change')); 
  };

  const isAr = lang === 'ar';

  const categories = ["All", ...Array.from(new Set(projectsList.flatMap(p => p.category || []).filter(Boolean)))];

  const filteredProjects = projectsList.filter(p => activeFilter === "All" || p.category.includes(activeFilter));

  if(!mounted) return null;

  return (
    <div className="bg-[#0D0D0D] text-[#EDE8DC] min-h-screen flex flex-col font-sans select-none overflow-x-hidden" dir={isAr ? 'rtl' : 'ltr'}>


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
              <Link href="/certificates" className="hover:text-[#C8A96E] transition-colors duration-300">
                {isAr ? "الشهادات" : "Certificates"}
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
                    href="/certificates" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#C8A96E] transition-colors py-2 border-b border-white/5 text-start"
                  >
                    {isAr ? "الشهادات" : "Certificates"}
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
          {isAr ? "معرض الأعمال والحلول الرقمية" : "DIGITAL SOLUTIONS & PRODUCTS ARCHIVE"}
        </div>
        <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight text-white">
          {isAr ? "بناء المنتجات وريادة الأعمال" : "Building Products & Venture Tech"}
        </h1>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 justify-start mt-12 font-mono-en text-xs uppercase tracking-widest">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 border transition-all duration-300 cursor-pointer ${
                activeFilter === cat 
                  ? "border-[#C8A96E] text-[#C8A96E] bg-[#C8A96E]/5" 
                  : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="hairline-separator mt-12"></div>
      </section>

      {/* Products Flat List */}
      <section className="py-12 pb-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col w-full">
          {filteredProjects.map((project, idx) => {
            const title = isAr ? project.title_ar : project.title_en;
            const problem = isAr ? project.problem_ar : project.problem_en;
            const result = isAr ? project.result_ar : project.result_en;
            const formattedIndex = toEastArabic(String(idx + 1).padStart(2, '0'));
            
            return (
              <div 
                key={idx}
                className="group py-16 border-b border-white/10 flex flex-col xl:flex-row gap-12 justify-between transition-colors duration-300 hover:bg-white/[0.01] px-4"
              >
                {/* Right / Left Info Column */}
                <div className="flex-1 space-y-6 text-start">
                  <div className="flex gap-6 items-start">
                    <div className="font-mono-en text-4xl md:text-5xl text-[#C8A96E]/40 group-hover:text-[#C8A96E] transition-colors duration-300 shrink-0">
                      {formattedIndex}
                    </div>
                    <div className="space-y-1.5 text-start">
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-white relative inline-block">
                        {title}
                        <span className="absolute bottom-0 right-0 h-[1.5px] bg-[#C8A96E] w-0 group-hover:w-full transition-all duration-300 origin-right"></span>
                      </h2>
                      <p className="text-xs font-mono-en text-[#C8A96E]/80">
                        {project.category.join(" / ")} • {project.year}
                      </p>
                    </div>
                  </div>

                  {/* Problem & Result Subsections */}
                  <div className="relative pt-4 border-t border-white/5">
                    <div className={`relative ${isAr ? 'pr-4 border-r' : 'pl-4 border-l'} border-white/10 space-y-4`}>
                      <div dir={isAr ? 'rtl' : 'ltr'} className="text-start">
                        <div className="flex items-center gap-1.5 justify-start">
                          <span className="w-1.5 h-1.5 bg-rose-500"></span>
                          <span className="text-[10px] font-mono-en uppercase tracking-wider text-rose-400">
                            {isAr ? "المشكلة والتحدي" : "PROBLEM"}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-[#EDE8DC]/70 text-start">{problem}</p>
                      </div>

                      <div dir={isAr ? 'rtl' : 'ltr'} className="text-start">
                        <div className="flex items-center gap-1.5 justify-start">
                          <span className="w-1.5 h-1.5 bg-emerald-500"></span>
                          <span className="text-[10px] font-mono-en uppercase tracking-wider text-emerald-400">
                            {isAr ? "النتيجة والأثر" : "RESULT & IMPACT"}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-emerald-400 font-bold text-start">{result}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Left Tech Stack / CTA Column */}
                <div className="w-full xl:w-96 flex flex-col justify-between items-start xl:items-end text-start xl:text-end shrink-0">
                  <div className="space-y-4 w-full text-start xl:text-end">
                    <div className="text-[10px] font-mono-en uppercase tracking-widest text-[#C8A96E]">
                      {isAr ? "التقنيات المستخدمة" : "TECH STACK"}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-start xl:justify-end" dir="ltr">
                      {project.stack.map((item) => (
                        <span key={item} className="px-2 py-0.5 text-[10px] font-mono-en border border-white/10 text-white/80">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 w-full flex justify-start xl:justify-end">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#C8A96E] text-[#C8A96E] px-6 py-2.5 text-xs font-mono-en uppercase tracking-widest hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-all duration-300"
                      >
                        {isAr ? "زيارة المشروع" : "VISIT VENTURE"} <ArrowUpRight size={14} className="inline ml-1" />
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
