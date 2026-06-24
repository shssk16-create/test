"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Moon, Sun, Award, Sparkles, Lock } from "lucide-react";
import Link from "next/link";
import FloatingChat from "@/components/FloatingChat";
import { WorksSection } from "@/components/WorksSection";
import ParticleNetwork from "@/components/ParticleNetwork";
import { useSEO } from "@/hooks/useSEO";

export default function AmalPortfolioPage() {
  const isAmalDeploy = process.env.NEXT_PUBLIC_OWNER === 'amal';
  const basePrefix = isAmalDeploy ? "" : "/amal";

  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useSEO('amal', lang, 'portfolio');

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  useEffect(() => {
    if (localStorage.getItem('portfolio_auth_amal') === 'true') {
      setAuthorized(true);
    }
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPasscode = passcode.trim();
    if (cleanPasscode === 'amal123' || cleanPasscode === 'sister123') {
      localStorage.setItem('portfolio_auth_amal', 'true');
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
    setTimeout(() => setLoading(false), 1800);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  const toggleLang = () => { const n = lang === 'ar' ? 'en' : 'ar'; setLang(n); localStorage.setItem('sk_lang', n); window.dispatchEvent(new Event('lang-change')); };
  const toggleTheme = () => { const n = theme === 'dark' ? 'light' : 'dark'; setTheme(n); localStorage.setItem('sk_theme', n); window.dispatchEvent(new Event('theme-change')); };
  
  const isAr = lang === 'ar';
  const isDark = theme === 'dark';

  if(!mounted) return null;

  if (!authorized) {
    return (
      <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${isDark ? 'bg-[#2C3947]' : 'bg-[#E8EDF2]'} overflow-hidden`} dir={isAr ? 'rtl' : 'ltr'}>
        <ParticleNetwork color="#C2A56D" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#C2A56D]/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <div className={`flex flex-col gap-6 p-8 max-w-sm w-full mx-4 rounded-3xl border ${isDark ? 'border-white/10 bg-black/40' : 'border-[#547A95]/20 bg-[#E8EDF2]'} backdrop-blur-xl text-center shadow-2xl relative z-10`}>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-[#C2A56D]/10 border border-[#C2A56D]/30 rounded-full flex items-center justify-center text-[#C2A56D] shadow-[0_0_20px_rgba(194,165,109,0.2)]">
              <Sparkles size={28} />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-stone-900'}`}>
              {isAr ? 'موقع خاص' : 'Private Site'}
            </h2>
            <p className={`text-xs ${isDark ? 'text-stone-300' : 'text-stone-600'} leading-relaxed`}>
              {isAr 
                ? 'هذا المعرض محمي برمز مرور. يرجى إدخال رمز المرور للمتابعة.' 
                : 'This portfolio is passcode protected. Please enter the passcode to proceed.'}
            </p>
          </div>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-1">
              <input
                type="password"
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setPasscodeError(""); }}
                placeholder={isAr ? 'أدخل رمز المرور...' : 'Enter passcode...'}
                className={`w-full px-5 py-3 rounded-full text-center text-sm font-bold border ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-stone-500 focus:border-[#C2A56D]' : 'bg-stone-50 border-[#547A95]/30 text-[#2C3947] placeholder-[#2C3947]/50 focus:border-[#C2A56D]'} focus:outline-none transition-all`}
                autoFocus
              />
              {passcodeError && (
                <p className="text-[10px] text-red-500 font-bold mt-1">
                  {passcodeError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#C2A56D] hover:bg-[#b39158] text-black text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(194,165,109,0.3)] cursor-pointer"
            >
              {isAr ? 'دخول' : 'Access'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className={`min-h-[100dvh] ${isDark ? 'bg-[#2C3947] text-[#E8EDF2]' : 'bg-[#E8EDF2] text-[#2C3947]'} selection:bg-[#C2A56D] pb-32 relative overflow-hidden ${isAr ? 'font-alexandria' : 'font-sans'} transition-colors duration-700`} dir={isAr ? 'rtl' : 'ltr'}>
      
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
            <Link href={`${basePrefix}/certificates`} className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[9px] sm:text-[10px] md:text-xs font-bold ${isDark ? 'text-[#E8EDF2]/90 hover:text-white bg-[#E8EDF2]/10 border-white/10' : 'text-[#2C3947]/80 hover:text-black bg-white border-[#547A95]/30'} px-2.5 sm:px-3 md:px-5 py-2 md:py-2.5 rounded-full border transition-all shadow-sm active:scale-95`}><Award size={12} className="sm:w-[14px] sm:h-[14px] md:w-4 md:h-4"/><span className="hidden md:inline">{isAr ? "الشهادات" : "Certs"}</span><span className="md:hidden">{isAr ? "شهادات" : "Certs"}</span></Link>
            <button onClick={toggleLang} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-white text-[#2C3947] border-[#547A95]/30 hover:bg-stone-50'} border px-2.5 sm:px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all`}>{isAr ? 'EN' : 'عربي'}</button>
            <button onClick={toggleTheme} className={`${isDark ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'bg-[#2C3947] text-white border-[#2C3947] hover:bg-black'} border p-1.5 sm:p-2 md:p-2.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all`} title="Toggle Theme">
              {isDark ? <Sun size={14} className="md:w-4 md:h-4"/> : <Moon size={14} className="md:w-4 md:h-4"/>}
            </button>
          </div>
        </div>
      </nav>

      <WorksSection owner="amal" />

      <FloatingChat owner="amal" />
    </motion.main>
  );
}
