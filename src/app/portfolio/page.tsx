"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Moon, Sun, Award, Sparkles, Lock } from "lucide-react";
import Link from "next/link";
import FloatingChat from "@/components/FloatingChat";
import { WorksSection } from "@/components/WorksSection";
import AmalPortfolioPage from "../amal/portfolio/page";
import ParticleNetwork from "@/components/ParticleNetwork";
import { useSEO } from "@/hooks/useSEO";

export default function PortfolioRoute() {
  const isAmalDeploy = process.env.NEXT_PUBLIC_OWNER === 'amal';
  if (isAmalDeploy) {
    return <AmalPortfolioPage />;
  }
  return <Portfolio />;
}

function Portfolio() {
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useSEO('salmeen', lang, 'portfolio');

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
              href="/certificates" 
              className={`flex items-center gap-2 text-xs sm:text-sm font-black px-5 sm:px-6 py-3 rounded-full border transition-all duration-300 shadow-sm active:scale-[0.98] active:translate-y-[1px] ${
                isDark 
                  ? 'text-stone-300 hover:text-white hover:bg-white/5 bg-white/5 border-white/10' 
                  : 'text-stone-600 hover:text-black hover:bg-stone-50 bg-white border-stone-200'
              }`}
            >
              <Award size={14} />
              <span>{isAr ? "الشهادات" : "Certificates"}</span>
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

      <WorksSection />

      <FloatingChat />
    </motion.main>
  );
}
