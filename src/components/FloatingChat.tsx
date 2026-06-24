"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export default function FloatingChat({ owner = 'salmeen' }: { owner?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [msg, setMsg] = useState<{r: 'u'|'b', t: string}[]>([]);
  const [inp, setInp] = useState("");
  const [load, setLoad] = useState(false);
  const [hideChatbot, setHideChatbot] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("966503026795");
  const [heroNameAr, setHeroNameAr] = useState(owner === 'amal' ? "أمل هادي" : "سالمين");
  const [heroNameEn, setHeroNameEn] = useState(owner === 'amal' ? "Amal Hadi" : "Salmeen");
  const endRef = useRef<HTMLDivElement>(null);

  const getWelcomeMessage = (currentLang: 'ar'|'en', nameAr: string, nameEn: string) => {
    if (currentLang === 'ar') {
      return `أهلاً بك! أنا المساعد الذكي الخاص بـ ${nameAr}. تفضل، اسألني عن خدماتي أو مشاريعي أو مهاراتي؟ 🚀`;
    }
    return `Welcome! I'm ${nameEn}'s custom AI assistant. Feel free to ask about my services, projects, or skills! 🚀`;
  };

  const t = {
    ar: { welcome: getWelcomeMessage('ar', heroNameAr, heroNameEn), btn: 'تحدث مع مساعدي الذكي', title: 'المساعد الذكي', sub: 'مدعوم بالذكاء الاصطناعي', me: 'أنت', placeholder: 'اكتب سؤالك هنا...', suggs: ["💡 أبرز مشاريعك؟", "🛠️ وش مهاراتك؟", "📬 كيف أتواصل معك؟"], err: "عذراً، لم أتمكن من الرد. حاول مجدداً." },
    en: { welcome: getWelcomeMessage('en', heroNameAr, heroNameEn), btn: "Chat with my AI", title: "AI Assistant", sub: "Powered by AI", me: "You", placeholder: "Type your question...", suggs: ["💡 Top Projects?", "🛠️ Your Skills?", "📬 Contact Info?"], err: "Sorry, I couldn't respond. Please try again." }
  };

  useEffect(() => {
    const checkState = () => { 
      const l = localStorage.getItem('sk_lang') as 'ar'|'en' || 'ar'; 
      const th = localStorage.getItem('sk_theme') as 'dark'|'light' || 'dark';
      if (lang !== l) { 
        setLang(l); 
        setMsg([{ r: 'b', t: getWelcomeMessage(l, heroNameAr, heroNameEn) }]); 
      }
      if (theme !== th) setTheme(th);
    };
    checkState();
    window.addEventListener('lang-change', checkState);
    window.addEventListener('theme-change', checkState);
    const inv = setInterval(checkState, 500);
    return () => { window.removeEventListener('lang-change', checkState); window.removeEventListener('theme-change', checkState); clearInterval(inv); };
  }, [lang, theme, heroNameAr, heroNameEn]);

  useEffect(() => {
    if (msg.length === 0) {
      setMsg([{ r: 'b', t: getWelcomeMessage(lang, heroNameAr, heroNameEn) }]);
    }
  }, [heroNameAr, heroNameEn, lang]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msg, load]);

  useEffect(() => {
    async function fetchConfig() {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
      try {
        const res = await fetch(`${apiBase}/api/heroes?owner=${owner}`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            const hero = json.data[0];
            setHideChatbot(hero.hide_chatbot === 1 || hero.hide_chatbot === true);
            if (hero.whatsapp_number) {
              setWhatsappNumber(hero.whatsapp_number);
            }
            if (hero.name_ar) {
              setHeroNameAr(hero.name_ar.endsWith('.') ? hero.name_ar.slice(0, -1) : hero.name_ar);
            }
            if (hero.name_en) {
              setHeroNameEn(hero.name_en.endsWith('.') ? hero.name_en.slice(0, -1) : hero.name_en);
            }
          }
        }
      } catch (err) {
        console.warn("Failed to fetch CMS config in FloatingChat:", err);
      }
    }
    fetchConfig();
  }, [owner]);

  const formatTxt = (txt: string) => txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^(?:\*|-)\s(.+)$/gm, '• $1').replace(/\n/g, '<br>');

  const send = async (overrideTxt?: string) => {
    const txt = overrideTxt || inp;
    if (!txt.trim()) return;
    setInp("");
    setMsg(p => [...p, { r: 'u', t: txt }]); 
    setLoad(true);
    try {
      const res = await fetch("https://shssk-n8n.hf.space/webhook/portfolio-chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: txt, modelName: "gemini-1.5-flash", owner: owner }) });
      const raw = await res.text();
      let botTxt = "";
      try {
        let parsed = JSON.parse(raw);
        if (typeof parsed === 'string') parsed = JSON.parse(parsed);
        if (Array.isArray(parsed)) parsed = parsed[0];
        
        if (parsed && (parsed.success === false || parsed.error || parsed.code === 429 || parsed.message?.includes("429") || parsed.message?.includes("AxiosError"))) {
          botTxt = lang === 'ar' 
            ? "عذراً، تم تجاوز حد الطلبات المسموح به حالياً للذكاء الاصطناعي (Rate Limit 429). يرجى الانتظار لمدة دقيقة والمحاولة مجدداً." 
            : "Sorry, the AI model rate limit (429) has been exceeded. Please wait a minute and try again.";
        } else {
          botTxt = parsed?.reply || parsed?.text || parsed?.message || parsed?.answer || '';
        }
      } catch(e) { 
        if (raw.includes("AxiosError") || raw.includes("429")) {
          botTxt = lang === 'ar' 
            ? "عذراً، تم تجاوز حد الطلبات المسموح به حالياً للذكاء الاصطناعي (Rate Limit 429). يرجى الانتظار لمدة دقيقة والمحاولة مجدداً." 
            : "Sorry, the AI model rate limit (429) has been exceeded. Please wait a minute and try again.";
        } else {
          botTxt = raw; 
        }
      }
      if (!botTxt) botTxt = t[lang].err;
      setMsg(p => [...p, { r: 'b', t: botTxt }]);
    } catch (e) { setMsg(p => [...p, { r: 'b', t: t[lang].err }]); } finally { setLoad(false); }
  };

  const isAr = lang === 'ar';
  const isDark = theme === 'dark';
  const isAmal = owner === 'amal';

  const isMainPage = pathname === '/' || pathname === '/amal' || !pathname;

  if (!isMainPage) {
    const cleanNumber = (num: string) => {
      let cleaned = num.replace(/\D/g, '');
      if (cleaned.startsWith('05') && cleaned.length === 10) {
        cleaned = '966' + cleaned.substring(1);
      } else if (cleaned.startsWith('5') && cleaned.length === 9) {
        cleaned = '966' + cleaned;
      }
      return cleaned;
    };
    const formattedNum = cleanNumber(whatsappNumber);
    const whatsappLink = `https://wa.me/${formattedNum}`;
    const tooltipText = isAr ? 'تواصل معنا عبر واتساب' : 'Chat on WhatsApp';

    return (
      <div className={`fixed bottom-4 sm:bottom-6 ${isAr ? 'right-3 sm:right-6' : 'left-3 sm:left-6'} z-[100] ${isAr ? 'font-alexandria' : 'font-sans'} flex flex-col ${isAr ? 'items-end' : 'items-start'}`} dir={isAr ? 'rtl' : 'ltr'}>
        <div className="relative group">
          {/* Animated glow background */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full blur-md opacity-40 animate-pulse group-hover:opacity-80 transition duration-500"></div>
          
          {/* Tooltip */}
          <span className={`absolute bottom-full mb-3 hidden group-hover:flex items-center justify-center whitespace-nowrap rounded-lg bg-black/90 text-white text-xs font-black px-3 py-1.5 shadow-xl border border-white/10 transition-all ${isAr ? 'right-0' : 'left-0'}`}>
            {tooltipText}
          </span>
          
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 border border-green-300/50"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  if (isMainPage && hideChatbot) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 sm:bottom-6 ${isAr ? 'right-3 sm:right-6' : 'left-3 sm:left-6'} z-[100] ${isAr ? 'font-alexandria' : 'font-sans'} flex flex-col ${isAr ? 'items-end' : 'items-start'} max-w-[calc(100vw-24px)]`} dir={isAr ? 'rtl' : 'ltr'}>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className={`mb-4 sm:mb-6 w-[90vw] max-w-[360px] ${isDark ? (isAmal ? 'bg-[#2C3947]/95 border-[#547A95]/30' : 'bg-[#0a0c10] border-[#1e2330]') : (isAmal ? 'bg-[#E8EDF2]/95 border-[#547A95]/30' : 'bg-[#F9F8F6] border-stone-200')} rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] border overflow-hidden flex flex-col h-[70vh] max-h-[520px] ${isAr ? 'origin-bottom-right' : 'origin-bottom-left'}`}>
            <div className={`${isDark ? (isAmal ? 'bg-[#25303c] border-[#547A95]/20' : 'bg-[#111318] border-[#1e2330]') : (isAmal ? 'bg-white border-[#547A95]/20' : 'bg-white border-stone-200')} p-4 flex justify-between items-center border-b`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${isAmal ? 'from-[#C2A56D] to-[#b39158] shadow-[0_0_15px_rgba(194,165,109,0.3)]' : 'from-[#A1824A] to-yellow-600 shadow-[0_0_15px_rgba(161,130,74,0.3)]'} flex items-center justify-center text-black font-black text-lg`}>{owner === 'amal' ? 'AH' : 'SK'}</div>
                <div><div className={`font-bold text-sm ${isDark ? 'text-[#e8ecf0]' : (isAmal ? 'text-[#2C3947]' : 'text-[#15110E]')}`}>{t[lang].title}</div><div className={`text-[10px] ${isAmal ? 'text-[#C2A56D]' : 'text-[#A1824A]'} mt-0.5 tracking-widest uppercase`}>{t[lang].sub}</div></div>
              </div>
              <button onClick={() => setIsOpen(false)} className={`w-8 h-8 rounded-full ${isDark ? (isAmal ? 'bg-[#1e2731] text-[#E8EDF2]/75 hover:text-white' : 'bg-[#181c24] text-stone-400 hover:text-white') : (isAmal ? 'bg-white text-[#2C3947]/75 hover:text-black' : 'bg-stone-100 text-stone-500 hover:text-black')} flex items-center justify-center hover:bg-red-500/20 transition-all`}><X size={16}/></button>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-5">
              {msg.map((m, i) => (
                <div key={i} className={`flex gap-3 max-w-[90%] ${m.r === 'u' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black ${m.r === 'u' ? (isDark ? (isAmal ? 'bg-[#1e2731] text-[#E8EDF2]/80 border border-[#547A95]/20' : 'bg-[#181c24] text-[#6b7585] border border-[#1e2330]') : (isAmal ? 'bg-white text-[#2C3947] border border-[#547A95]/20' : 'bg-stone-200 text-stone-600 border border-stone-300')) : (isAmal ? 'bg-gradient-to-br from-[#C2A56D] to-[#b39158] text-black' : 'bg-gradient-to-br from-[#A1824A] to-yellow-600 text-black')}`}>{m.r === 'u' ? t[lang].me : <Bot size={16}/>}</div>
                  <div className={`p-4 text-[13px] leading-[1.8] tracking-wide ${m.r === 'u' ? (isDark ? (isAmal ? 'bg-[#547A95]/20 text-[#E8EDF2] border border-[#547A95]/30 rounded-2xl' : 'bg-[#1e2330] text-[#e8ecf0] rounded-2xl border border-white/5') : (isAmal ? 'bg-[#547A95]/10 text-[#2C3947] border border-[#547A95]/20 rounded-2xl' : 'bg-stone-100 text-[#15110E] rounded-2xl border border-stone-200')) : (isDark ? (isAmal ? 'bg-[#1e2731] text-[#E8EDF2] border border-[#C2A56D]/30 shadow-inner rounded-2xl' : 'bg-[#15110E] text-[#e8ecf0] rounded-2xl border border-[#A1824A]/30 shadow-inner') : (isAmal ? 'bg-white text-[#2C3947] border border-[#C2A56D]/30 shadow-sm rounded-2xl' : 'bg-white text-[#15110E] rounded-2xl border border-[#A1824A]/30 shadow-sm'))} ${m.r === 'u' ? (isAr ? 'rounded-tr-sm' : 'rounded-tl-sm') : (isAr ? 'rounded-tl-sm' : 'rounded-tr-sm')}`} dangerouslySetInnerHTML={{ __html: m.r === 'b' ? formatTxt(m.t) : m.t }} />
                </div>
              ))}
              
              {msg.length === 1 && !load && (
                <div className={`flex flex-wrap gap-2 mt-2 self-start ${isAr ? 'mr-10' : 'ml-10'}`}>
                  {t[lang].suggs.map((s, i) => (<button key={i} onClick={() => send(s)} className={`${isDark ? (isAmal ? 'bg-[#25303c] border-[#547A95]/30 text-[#E8EDF2]/80' : 'bg-[#111318] border-[#1e2330] text-[#9aa3b2]') : (isAmal ? 'bg-white border-[#547A95]/30 text-[#2C3947]/80' : 'bg-white border-stone-200 text-stone-600')} border hover:border-${isAmal ? '[#C2A56D] hover:text-[#C2A56D]' : '[#A1824A] hover:text-[#A1824A]'} px-4 py-2 rounded-full text-[11px] font-bold transition-all hover:scale-105 shadow-sm`}>{s}</button>))}
                </div>
              )}

              {load && (<div className="self-start flex gap-3"><div className={`w-8 h-8 rounded-full bg-gradient-to-br ${isAmal ? 'from-[#C2A56D] to-[#b39158]' : 'from-[#A1824A] to-yellow-600'} flex items-center justify-center text-black`}><Bot size={16}/></div><div className={`p-4 ${isDark ? (isAmal ? 'bg-[#1e2731] border-[#C2A56D]/30' : 'bg-[#15110E] border-[#A1824A]/30') : (isAmal ? 'bg-white border-[#C2A56D]/30 shadow-sm' : 'bg-white border-[#A1824A]/30 shadow-sm')} border rounded-2xl flex items-center h-[52px] ${isAr ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}><Loader2 className={`animate-spin ${isAmal ? 'text-[#C2A56D]' : 'text-[#A1824A]'}`} size={18}/></div></div>)}
              <div ref={endRef} />
            </div>
            
            <div className={`p-3 ${isDark ? (isAmal ? 'bg-[#25303c] border-[#547A95]/20' : 'bg-[#111318] border-[#1e2330]') : (isAmal ? 'bg-[#E8EDF2]/50 border-[#547A95]/20' : 'bg-white border-stone-200')} border-t flex gap-2 items-center`}>
              <input type="text" value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder={t[lang].placeholder} className={`flex-1 ${isDark ? (isAmal ? 'bg-[#1e2731] border-[#547A95]/25 text-[#E8EDF2]' : 'bg-[#181c24] border-[#1e2330] text-[#e8ecf0]') : (isAmal ? 'bg-white border-[#547A95]/20 text-[#2C3947]' : 'bg-stone-50 border-stone-200 text-[#15110E]')} border focus:border-${isAmal ? '[#C2A56D]' : '[#A1824A]'} transition-colors rounded-xl px-4 py-3 text-[13px] leading-[1.8] outline-none placeholder:text-[#4a5568]`} />
              <button onClick={() => send()} className={`w-12 h-12 bg-gradient-to-br ${isAmal ? 'from-[#C2A56D] to-[#b39158]' : 'from-[#A1824A] to-yellow-600'} text-black rounded-xl flex items-center justify-center hover:scale-105 transition-transform`}><Send size={18} className={`${isAr ? 'rtl:-translate-x-0.5 rtl:translate-y-0.5 rtl:rotate-180' : 'translate-x-0.5 translate-y-0.5'}`}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        {!isOpen && (<div className={`absolute -inset-1.5 bg-gradient-to-r ${isAmal ? 'from-[#C2A56D] to-[#b39158]' : 'from-[#A1824A] to-yellow-500'} rounded-full blur-md opacity-40 animate-pulse group-hover:opacity-80 transition duration-500`}></div>)}
        <button onClick={() => setIsOpen(!isOpen)} className={`relative h-12 sm:h-14 bg-gradient-to-br ${isAmal ? 'from-[#C2A56D] to-[#b39158]' : 'from-[#A1824A] to-yellow-500'} text-black rounded-full flex items-center justify-center shadow-[0_0_30px_${isAmal ? 'rgba(194,165,109,0.5)' : 'rgba(161,130,74,0.5)'}] hover:scale-110 active:scale-95 transition-all duration-300 border ${isAmal ? 'border-yellow-200/50' : 'border-yellow-300/50'} ${isOpen ? 'w-12 sm:w-14 px-0' : 'px-4 sm:px-6 md:px-8 gap-2 sm:gap-3 w-auto'}`}>
          {!isOpen && (
            <span className={`absolute -top-1 ${isAr ? '-left-1' : '-right-1'} flex h-4 w-4`}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className={`relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 ${isAmal ? 'border-[#2C3947]' : 'border-[#050505]'}`}></span>
            </span>
          )}
          {isOpen ? <X size={22} className="sm:w-6 sm:h-6"/> : <><Sparkles size={16} className="animate-pulse sm:w-[18px] sm:h-[18px]"/><span className={`font-black text-xs sm:text-sm md:text-base hidden sm:inline ${isAr ? 'pt-0.5' : ''}`}>{t[lang].btn}</span></>}
        </button>
      </div>
    </div>
  );
}
