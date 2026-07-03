"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import AmalPortfolio from "./amal/page";
import { useSEO } from "@/hooks/useSEO";
import FloatingChat from "@/components/FloatingChat";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeRoute() {
  const isAmalDeploy = process.env.NEXT_PUBLIC_OWNER === 'amal';
  if (isAmalDeploy) {
    return <AmalPortfolio />;
  }
  return <GlobalPortfolio />;
}

// Convert numbers to East Arabic digits
const toEastArabic = (num: number | string): string => {
  const digits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map(char => {
    const d = parseInt(char);
    return isNaN(d) ? char : digits[d];
  }).join('');
};

function GlobalPortfolio() {
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch SEO & Hero metadata from CMS D1 database (dynamically responds to active language)
  const seo = useSEO('salmeen', lang, 'home');

  // Fallback seed projects
  const fallbackProjects = [
    {
      num: "01",
      name_ar: "هالة AI OS",
      name_en: "Hala AI OS",
      desc_ar: "نظام تشغيل ذكي مدمج مع الواتساب مبني لحل مشاكل التجار في منصات سلة وزد.",
      desc_en: "Smart operating system integrated with WhatsApp built for Zid and Salla merchants.",
      tech: "CLOUDFLARE / HONO.JS / LLMS",
      link: "https://salla.sa"
    },
    {
      num: "02",
      name_ar: "درب منصة",
      name_en: "Darb Platform",
      desc_ar: "أتمتة متكاملة لخطوط إمداد وتوزيع الخدمات وحجز المحطات لقطاع الخدمات اللوجستية.",
      desc_en: "Comprehensive automation for supply chains, service distribution, and station booking.",
      tech: "LARAVEL / LIVEWIRE / POSTGRESQL",
      link: "https://darbstations.com.sa"
    },
    {
      num: "03",
      name_ar: "أورا للتسويق",
      name_en: "Aura Marketing",
      desc_ar: "موقع الوكالة الرقمية لتسويق وتطوير المنتجات البرمجية وتكامل هندسة اللغويات العربية.",
      desc_en: "Digital agency site for marketing, software product dev, and Arabic linguistics integration.",
      tech: "NEXT.JS / TAILWIND CSS / SEO",
      link: "https://aurateam3.com"
    },
    {
      num: "04",
      name_ar: "مالم أورا",
      name_en: "Malam Aura",
      desc_ar: "نظام أتمتة وبناء خطوط إنتاج المحتوى الترويجي والجدولة الآلية للشبكات الاجتماعية.",
      desc_en: "Automation engine for promotional content production pipelines and social scheduling.",
      tech: "N8N / GROQ / TELEGRAM API",
      link: "https://aurateam3.com"
    },
    {
      num: "05",
      name_ar: "بثق",
      name_en: "Bathq",
      desc_ar: "منصة الخدمات السحابية ومصادقة هويات المستخدمين ونظم الوصول الآمن للمؤسسات.",
      desc_en: "Cloud services platform, identity authentication, and secure enterprise access systems.",
      tech: "SUPABASE / DOCKER / AUTH",
      link: ""
    }
  ];

  // Set language & scrolled states
  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.remove('amal-theme');
    
    const savedLang = localStorage.getItem('sk_lang') as 'ar'|'en';
    if (savedLang) setLang(savedLang);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to lang-change events
  useEffect(() => {
    const handleLangChange = () => {
      const savedLang = localStorage.getItem('sk_lang') as 'ar'|'en';
      if (savedLang) setLang(savedLang);
    };
    window.addEventListener('lang-change', handleLangChange);
    return () => window.removeEventListener('lang-change', handleLangChange);
  }, []);

  // Set document attributes
  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  // Fetch projects from CMS D1 database
  useEffect(() => {
    if (!mounted) return;

    async function fetchProjects() {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
      try {
        const res = await fetch(`${apiBase}/api/projects?owner=salmeen&limit=100`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            const mapped = json.data.map((item: any, idx: number) => {
              let st = "";
              try {
                if (item.stack) {
                  const parsed = typeof item.stack === 'string' ? JSON.parse(item.stack) : item.stack;
                  if (Array.isArray(parsed)) st = parsed.join(" / ").toUpperCase();
                }
              } catch (e) {
                if (typeof item.stack === 'string') {
                  st = item.stack.split(',').map((s: string) => s.trim().toUpperCase()).join(' / ');
                }
              }
              return {
                num: String(idx + 1).padStart(2, '0'),
                name_ar: item.title_ar || item.title || "",
                name_en: item.title_en || item.title || "",
                desc_ar: item.subtitle_ar || item.subtitle || "",
                desc_en: item.subtitle_en || item.subtitle || "",
                tech: st || (item.tech || ""),
                link: item.link || ""
              };
            });
            setProjectsList(mapped);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch projects from CMS", err);
      }
    }

    fetchProjects();
  }, [mounted]);

  const activeProjects = projectsList.length > 0 ? projectsList : fallbackProjects;
  const isAr = lang === 'ar';

  // Dynamic variables resolved from CMS SEO settings
  const targetExpYears = parseInt(seo?.hero_experience_years || "3") || 3;
  const targetTechCount = parseInt(seo?.stack_tech_count || "8") || 8;

  // GSAP Animations with context revert cleanup (rebuilds when language, projects, or statistics change)
  useEffect(() => {
    if (!mounted) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero word stagger animations
      gsap.fromTo(".hero-word",
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out"
        }
      );

      // 2. Separator hairline drawings
      const separators = gsap.utils.toArray(".hairline-separator");
      separators.forEach((sep: any) => {
        gsap.fromTo(sep,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sep,
              start: "top 95%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // 3. Stat counters count up
      const statsObj = { projects: 0, years: 0 };
      gsap.to(statsObj, {
        projects: activeProjects.length,
        years: targetExpYears,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#hero-stats",
          start: "top 95%",
        },
        onUpdate: () => {
          const elProj = document.getElementById("stat-projects");
          const elYears = document.getElementById("stat-years");
          const numP = Math.floor(statsObj.projects);
          const numY = Math.floor(statsObj.years);
          if (elProj) elProj.innerText = isAr ? toEastArabic(numP) : String(numP);
          if (elYears) elYears.innerText = isAr ? toEastArabic(numY) : String(numY);
        }
      });

      // 4. Tech stack counter count up
      const stackObj = { tech: 0 };
      gsap.to(stackObj, {
        tech: targetTechCount,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#stack-stat-trigger",
          start: "top 95%",
        },
        onUpdate: () => {
          const elTech = document.getElementById("stat-tech");
          const numT = Math.floor(stackObj.tech);
          if (elTech) elTech.innerText = isAr ? toEastArabic(numT) : String(numT);
        }
      });

      // 5. Tech stack list staggered reveal
      gsap.fromTo(".stack-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#stack-items-container",
            start: "top 85%",
          }
        }
      );

      // 6. General editorial sections fade-in on scroll
      const sections = gsap.utils.toArray(".editorial-section");
      sections.forEach((sec: any) => {
        gsap.fromTo(sec,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top 80%",
              end: "top 20%",
              scrub: true
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, activeProjects, lang, targetExpYears, targetTechCount]);

  const toggleLang = () => {
    const n = lang === 'ar' ? 'en' : 'ar';
    setLang(n);
    localStorage.setItem('sk_lang', n);
    window.dispatchEvent(new Event('lang-change'));
  };

  if (!mounted) return null;

  // Title strings
  const nameText = isAr ? (seo?.name_ar || "سالمين هادي") : (seo?.name_en || "Salmeen Hadi");
  const fullTitle = isAr ? (seo?.title_ar || "مدير منتجات الذكاء الاصطناعي") : (seo?.title_en || "AI Product Manager");
  
  // Split title dynamically in half for the 3-line luxury typography
  const titleParts = fullTitle.split(" ");
  const line2Words = titleParts.slice(0, Math.ceil(titleParts.length / 2));
  const line3Words = titleParts.slice(Math.ceil(titleParts.length / 2));

  const whatsappNumber = seo?.whatsapp_number || "966503026795";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  
  const aboutText = isAr 
    ? (seo?.subtitle_ar || "مطوّر Full-Stack وصاحب أورا للتسويق الرقمي في مكة المكرمة. أدمج الذكاء الاصطناعي مع التطوير لبناء منتجات عربية حقيقية.")
    : (seo?.subtitle_en || "Full-Stack developer and founder of Aura Digital Marketing in Makkah. I integrate AI with development to build authentic products.");

  // Navigation Links
  const navProjectsText = isAr ? (seo?.nav_projects_ar || "مشاريع") : (seo?.nav_projects_en || "Projects");
  const navCertificatesText = isAr ? (seo?.nav_certificates_ar || "الشهادات") : (seo?.nav_certificates_en || "Certificates");
  const navAboutText = isAr ? (seo?.nav_about_ar || "عني") : (seo?.nav_about_en || "About");
  const navContactText = isAr ? (seo?.nav_contact_ar || "تواصل معي") : (seo?.nav_contact_en || "Contact");

  // Hero labels
  const heroTopText = isAr ? (seo?.hero_top_label_ar || "مدير منتجات الذكاء الاصطناعي — مكة المكرمة") : (seo?.hero_top_label_en || "AI Product Manager — Makkah");
  const statProjectsText = isAr ? (seo?.hero_projects_label_ar || "مشاريع منجزة") : (seo?.hero_projects_label_en || "Projects Completed");
  const statExperienceText = isAr ? (seo?.hero_experience_label_ar || "سنوات من الخبرة") : (seo?.hero_experience_label_en || "Years of Experience");

  // Skill tags list
  let skillTags = ["Next.js", "Cloudflare", "n8n", "GSAP", "Laravel", "Arabic NLP"];
  if (seo?.about_skills_list) {
    try {
      const parsed = typeof seo.about_skills_list === 'string' ? JSON.parse(seo.about_skills_list) : seo.about_skills_list;
      if (Array.isArray(parsed)) {
        skillTags = parsed;
      }
    } catch (e) {
      if (typeof seo.about_skills_list === 'string') {
        skillTags = seo.about_skills_list.split(',').map((s: string) => s.trim());
      }
    }
  }

  // Projects headers
  const projectsHeaderText = isAr ? (seo?.projects_header_ar || "معرض المنتجات") : (seo?.projects_header_en || "Product Showcase");
  const projectsArchiveText = isAr ? (seo?.projects_archive_link_ar || "عرض التفاصيل الكاملة ←") : (seo?.projects_archive_link_en || "View Full Archive →");

  // Stack tools list
  const defaultTechStack = [
    { ar: "Next.js (إطار عمل الويب الأساسي)", en: "NEXT.JS FRAMEWORK" },
    { ar: "Tailwind CSS (تنسيق وتصميم الواجهات)", en: "TAILWIND CSS ENGINE" },
    { ar: "Cloudflare Workers (القطع البرمجية الطرفية)", en: "CLOUDFLARE WORKERS" },
    { ar: "n8n (أتمتة العمليات وربط الأنظمة)", en: "N8N AUTOMATION WORKFLOWS" },
    { ar: "GSAP (الحركة التفاعلية الفاخرة)", en: "GREENSOCK ANIMATION PLATFORM" },
    { ar: "Supabase / PostgreSQL (إدارة البيانات والهويات)", en: "SUPABASE POSTGRESQL" },
    { ar: "Python / NLP (معالجة اللغات الطبيعية)", en: "PYTHON ARABIC NLP" },
    { ar: "TypeScript (الكتابة البرمجية الآمنة)", en: "TYPESCRIPT LANG" }
  ];

  let techStack = defaultTechStack;
  if (seo?.stack_list_ar || seo?.stack_list_en) {
    try {
      const arParsed = typeof seo.stack_list_ar === 'string' ? JSON.parse(seo.stack_list_ar) : seo.stack_list_ar;
      const enParsed = typeof seo.stack_list_en === 'string' ? JSON.parse(seo.stack_list_en) : seo.stack_list_en;
      if (Array.isArray(arParsed) && Array.isArray(enParsed)) {
        techStack = arParsed.map((arVal: string, idx: number) => ({
          ar: arVal,
          en: enParsed[idx] || arVal.toUpperCase()
        }));
      }
    } catch (e) {
      // Keep default
    }
  }

  const stackHeaderText = isAr ? (seo?.stack_header_ar || "أدواتي") : (seo?.stack_header_en || "My Stack");
  const stackTechText = isAr ? (seo?.stack_tech_label_ar || "تقنية") : (seo?.stack_tech_label_en || "Tech");

  // Contact options
  const contactHeaderText = isAr ? (seo?.contact_header_ar || "لنبني شيئًا يستحق.") : (seo?.contact_header_en || "Let's build something meaningful.");
  const contactEmailVal = seo?.contact_email || "shssk.16@gmail.com";
  const contactLinkedinVal = seo?.contact_linkedin || "https://linkedin.com/in/salmeen-hadi";
  const contactGithubVal = seo?.contact_github || "";
  const footerLocationText = isAr ? (seo?.footer_location_ar || "مكة المكرمة، المملكة العربية السعودية") : (seo?.footer_location_en || "Makkah, Saudi Arabia");

  const ownerFirstName = nameText.split(" ")[0];

  return (
    <div 
      ref={containerRef} 
      className="bg-[#0D0D0D] text-[#EDE8DC] min-h-screen flex flex-col font-sans select-none overflow-x-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* 1. NAV */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 border-b border-white/5 flex items-center ${
          scrolled ? "bg-[#0D0D0D]/90 backdrop-blur-md" : "bg-transparent"
        }`}
        role="navigation"
        aria-label={isAr ? "الملاحة الرئيسية" : "Main Navigation"}
      >
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <div className="font-display text-2xl md:text-3xl font-bold text-start">
            <Link href="/" aria-label={isAr ? "الرئيسية" : "Home"}>{ownerFirstName}</Link>
          </div>

          {/* Links Center */}
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-mono-en">
            <Link href="/portfolio" className="hover:text-[#C8A96E] transition-colors duration-300">
              {navProjectsText}
            </Link>
            <Link href="/certificates" className="hover:text-[#C8A96E] transition-colors duration-300">
              {navCertificatesText}
            </Link>
            <a href="#about" className="hover:text-[#C8A96E] transition-colors duration-300">
              {navAboutText}
            </a>
          </div>

          {/* Left CTA / Language Toggle & Menu Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang} 
              className="hover:text-[#C8A96E] transition-colors duration-300 cursor-pointer font-bold font-mono-en text-xs uppercase tracking-widest"
            >
              {isAr ? "ENGLISH" : "عربي"}
            </button>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:block border border-[#C8A96E] text-[#C8A96E] px-5 py-2 text-xs md:text-sm font-mono-en uppercase tracking-widest hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-all duration-300"
            >
              {navContactText}
            </a>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-[#EDE8DC] hover:text-[#C8A96E] transition-colors p-1"
              aria-label="Toggle Menu"
            >
              <Menu size={24} />
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
                  <span className="font-display text-xl font-bold text-white">{ownerFirstName}</span>
                  <button 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-white hover:text-[#C8A96E] transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col gap-6 text-sm uppercase tracking-wider font-mono-en" dir={isAr ? "rtl" : "ltr"}>
                  <Link 
                    href="/portfolio" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#C8A96E] transition-colors py-2 border-b border-white/5 text-start"
                  >
                    {navProjectsText}
                  </Link>
                  <Link 
                    href="/certificates" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#C8A96E] transition-colors py-2 border-b border-white/5 text-start"
                  >
                    {navCertificatesText}
                  </Link>
                  <a 
                    href="#about" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#C8A96E] transition-colors py-2 border-b border-white/5 text-start"
                  >
                    {navAboutText}
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => { toggleLang(); setMobileMenuOpen(false); }}
                  className="w-full text-center hover:text-[#C8A96E] transition-colors py-3 border border-white/10 font-bold font-mono-en text-xs uppercase tracking-widest"
                >
                  {isAr ? "ENGLISH" : "عربي"}
                </button>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center border border-[#C8A96E] text-[#C8A96E] py-3 text-xs font-mono-en uppercase tracking-widest hover:bg-[#C8A96E] hover:text-[#0D0D0D] transition-all duration-300"
                >
                  {navContactText}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO */}
      <section 
        id="hero" 
        className="min-h-screen pt-28 flex flex-col justify-between px-6 md:px-12 max-w-7xl mx-auto w-full"
      >
        {/* Top Label */}
        <div className="flex justify-between items-start w-full pt-8 font-mono-en text-xs uppercase tracking-widest text-[#C8A96E]/80 text-start">
          <div>{heroTopText}</div>
        </div>

        {/* 3-Line Headline */}
        <div className="flex-1 flex flex-col justify-center py-12 text-start">
          {/* Line 1: Name */}
          <h1 className="text-[10vw] md:text-[6vw] font-display font-bold leading-none tracking-tight text-white mb-2">
            {nameText.split(" ").map((word, wIdx) => (
              <span key={wIdx} className={`inline-block overflow-hidden py-1 ${isAr ? 'ml-4 last:ml-0' : 'mr-4 last:mr-0'}`}>
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>
          {/* Line 2: First half of role */}
          <h1 className="text-[10vw] md:text-[6vw] font-display font-bold leading-none tracking-tight text-[#C8A96E] mb-2">
            {line2Words.map((word, wIdx) => (
              <span key={wIdx} className={`inline-block overflow-hidden py-1 ${isAr ? 'ml-4 last:ml-0' : 'mr-4 last:mr-0'}`}>
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>
          {/* Line 3: Second half of role */}
          <h1 className="text-[10vw] md:text-[6vw] font-display font-bold leading-none tracking-tight text-white/90">
            {line3Words.map((word, wIdx) => (
              <span key={wIdx} className={`inline-block overflow-hidden py-1 ${isAr ? 'ml-4 last:ml-0' : 'mr-4 last:mr-0'}`}>
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom stats and hairline */}
        <div className="pb-12" id="hero-stats">
          <div className="flex gap-8 md:gap-16 mb-8 text-start">
            <div>
              <div className="text-6xl md:text-7xl font-display font-bold text-[#C8A96E] leading-none">
                <span id="stat-projects">٠</span>
              </div>
              <p className="text-xs uppercase tracking-widest font-mono-en text-white/50 mt-2">
                {statProjectsText}
              </p>
            </div>
            <div>
              <div className="text-6xl md:text-7xl font-display font-bold text-[#C8A96E] leading-none">
                <span id="stat-years">٠</span>
              </div>
              <p className="text-xs uppercase tracking-widest font-mono-en text-white/50 mt-2">
                {statExperienceText}
              </p>
            </div>
          </div>
          <div className="hairline-separator"></div>
        </div>
      </section>

      {/* 3. ABOUT */}
      <section 
        id="about" 
        className="editorial-section py-24 px-6 md:px-12 max-w-7xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-start">
          {/* Left Columns (60%) */}
          <div className="md:col-span-7">
            <p className="text-2xl md:text-3xl font-sans font-light leading-relaxed text-[#EDE8DC]">
              {aboutText}
            </p>
          </div>

          {/* Right Columns (40%) */}
          <div className="md:col-span-5 w-full">
            <div className="flex flex-col border-t border-white/10 w-full">
              {skillTags.map((tag, idx) => (
                <div 
                  key={idx} 
                  className="py-4 border-b border-white/10 text-base font-mono-en text-white/80 tracking-widest text-start"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hairline-separator mt-24"></div>
      </section>

      {/* 4. PROJECTS */}
      <section 
        id="projects" 
        className="editorial-section py-24 px-6 md:px-12 max-w-7xl mx-auto w-full"
      >
        <div className="mb-16 flex justify-between items-baseline">
          <h2 className="text-sm uppercase tracking-widest font-mono-en text-[#C8A96E]">
            {projectsHeaderText}
          </h2>
          <Link href="/portfolio" className="text-xs font-mono-en uppercase tracking-wider text-[#C8A96E]/60 hover:text-[#C8A96E]">
            {projectsArchiveText}
          </Link>
        </div>

        {/* Flat list */}
        <div className="flex flex-col w-full">
          {activeProjects.slice(0, 5).map((project, idx) => (
            <a 
              key={idx} 
              href={project.link || "#"}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
              className="group py-12 border-b border-white/10 flex flex-col md:flex-row gap-6 md:items-center justify-between transition-colors duration-300 hover:bg-white/[0.01] px-4 cursor-pointer text-start"
            >
              <div className="flex gap-8 items-start md:items-center">
                {/* Num */}
                <div className="font-mono-en text-5xl md:text-6xl text-[#C8A96E]/40 group-hover:text-[#C8A96E] transition-colors duration-300 shrink-0">
                  {isAr ? toEastArabic(project.num) : project.num}
                </div>

                {/* Info */}
                <div className="space-y-2 text-start">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white relative inline-block">
                    {isAr ? project.name_ar : project.name_en}
                    <span className={`absolute bottom-0 h-[1.5px] bg-[#C8A96E] w-0 group-hover:w-full transition-all duration-300 ${isAr ? 'right-0 origin-right' : 'left-0 origin-left'}`}></span>
                  </h3>
                  <p className="text-sm text-[#EDE8DC]/70 max-w-xl">
                    {isAr ? project.desc_ar : project.desc_en}
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="font-mono-en text-xs uppercase tracking-widest text-[#C8A96E]/80 mt-2 md:mt-0 text-start md:text-end">
                {project.tech}
              </div>
            </a>
          ))}
        </div>
        <div className="hairline-separator mt-24"></div>
      </section>

      {/* 5. STACK */}
      <section 
        id="stack" 
        className="editorial-section py-24 px-6 md:px-12 max-w-7xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline text-start" id="stack-stat-trigger">
          {/* Left Column title and stats */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-sm uppercase tracking-widest font-mono-en text-[#C8A96E]">
              {stackHeaderText}
            </h2>
            <div className="text-7xl md:text-8xl font-display font-bold text-white leading-none">
              <span id="stat-tech">٠</span>+ {stackTechText}
            </div>
          </div>

          {/* Right Column list */}
          <div className="md:col-span-7 w-full" id="stack-items-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {techStack.map((tech, idx) => (
                <div key={idx} className="stack-item border-b border-white/5 pb-4 space-y-2 text-start">
                  <div className="text-base text-white font-sans">
                    {isAr ? tech.ar : tech.en}
                  </div>
                  <div className="text-xs text-[#C8A96E]/70 font-mono-en tracking-wider">
                    {isAr ? tech.en : tech.ar}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hairline-separator mt-24"></div>
      </section>

      {/* 6. CONTACT */}
      <section 
        id="contact" 
        className="bg-[#C8A96E] text-[#0D0D0D] py-28 px-6 md:px-12 w-full"
      >
        <div className="max-w-7xl mx-auto space-y-16 text-start">
          <h2 className="text-5xl md:text-8xl font-display font-bold leading-none select-none">
            {contactHeaderText}
          </h2>

          <div className="space-y-8 font-mono-en text-xl md:text-2xl font-medium tracking-wide">
            <div>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Salmeen"
                className="hover:underline transition-all inline-flex items-center gap-3"
              >
                {isAr ? "واتساب" : "WhatsApp"}: {isAr ? toEastArabic(whatsappNumber) : whatsappNumber} <span className="font-sans">←</span>
              </a>
            </div>
            <div>
              <a 
                href={`mailto:${contactEmailVal}`} 
                aria-label="Email Salmeen"
                className="hover:underline transition-all inline-flex items-center gap-3"
              >
                {contactEmailVal} <span className="font-sans">←</span>
              </a>
            </div>
            <div>
              <a 
                href={contactLinkedinVal} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hover:underline transition-all inline-flex items-center gap-3"
              >
                {contactLinkedinVal.replace(/^https?:\/\/(www\.)?/, '')} <span className="font-sans">←</span>
              </a>
            </div>
            {contactGithubVal && (
              <div>
                <a 
                  href={contactGithubVal} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="hover:underline transition-all inline-flex items-center gap-3"
                >
                  {contactGithubVal.replace(/^https?:\/\/(www\.)?/, '')} <span className="font-sans">←</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="w-full py-8 border-t border-white/5 px-6 md:px-12 text-xs font-mono-en text-white/40 tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-start md:text-end">
            {isAr ? `سالمين هادي © ${toEastArabic(2025)}` : "Salmeen Hadi © 2025"}
          </div>
          <div className="text-start md:text-end">
            {footerLocationText}
          </div>
        </div>
      </footer>
      <FloatingChat />
    </div>
  );
}
