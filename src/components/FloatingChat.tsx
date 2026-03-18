"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Loader2, Sparkles } from "lucide-react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<'ar'|'en'>('ar');
  const [theme, setTheme] = useState<'dark'|'light'>('dark');
  const [msg, setMsg] = useState<{r: 'u'|'b', t: string}[]>([]);
  const [inp, setInp] = useState("");
  const [load, setLoad] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const t = {
    ar: { welcome: 'أهلاً بك! أنا المساعد الذكي الخاص بسالمين. تفضل، اسألني عن خدماته أو مشاريعه أو مهاراته؟ 🚀', btn: 'تحدث مع مساعدي الذكي', title: 'المساعد الذكي', sub: 'مدعوم بالذكاء الاصطناعي', me: 'أنت', placeholder: 'اكتب سؤالك هنا...', suggs: ["💡 أبرز مشاريعك؟", "🛠️ وش مهاراتك؟", "📬 كيف أتواصل معك؟"], err: "عذراً، لم أتمكن من الرد. حاول مجدداً." },
    en: { welcome: "Welcome! I'm Salmeen's custom AI assistant. Feel free to ask about his services, projects, or skills! 🚀", btn: "Chat with my AI", title: "AI Assistant", sub: "Powered by AI", me: "You", placeholder: "Type your question...", suggs: ["💡 Top Projects?", "🛠️ Your Skills?", "📬 Contact Info?"], err: "Sorry, I couldn't respond. Please try again." }
  };

  useEffect(() => {
    const checkState = () => { 
      const l = localStorage.getItem('sk_lang') as 'ar'|'en' || 'ar'; 
      const th = localStorage.getItem('sk_theme') as 'dark'|'light' || 'dark';
      if (lang !== l) { setLang(l); setMsg([{ r: 'b', t: t[l].welcome }]); }
      if (theme !== th) setTheme(th);
    };
    checkState();
    window.addEventListener('lang-change', checkState);
    window.addEventListener('theme-change', checkState);
    const inv = setInterval(checkState, 500);
    return () => { window.removeEventListener('lang-change', checkState); window.removeEventListener('theme-change', checkState); clearInterval(inv); };
  }, [lang, theme]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msg, load]);

  const formatTxt = (txt: string) => txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^(?:\*|-)\s(.+)$/gm, '• $1').replace(/\n/g, '<br>');

  const send = async (overrideTxt?: string) => {
    const txt = overrideTxt || inp;
    if (!txt.trim()) return;
    setInp("");
    setMsg(p => [...p, { r: 'u', t: txt }]); 
    setLoad(true);
    try {
      const res = await fetch("https://shssk-n8n.hf.space/webhook/portfolio-chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: txt }) });
      const raw = await res.text();
      let botTxt = "";
      try {
        let parsed = JSON.parse(raw);
        if (typeof parsed === 'string') parsed = JSON.parse(parsed);
        if (Array.isArray(parsed)) parsed = parsed[0];
        botTxt = parsed?.reply || parsed?.text || parsed?.message || parsed?.answer || '';
      } catch(e) { botTxt = raw; }
      if (!botTxt) botTxt = t[lang].err;
      setMsg(p => [...p, { r: 'b', t: botTxt }]);
    } catch (e) { setMsg(p => [...p, { r: 'b', t: t[lang].err }]); } finally { setLoad(false); }
  };

  const isAr = lang === 'ar';
  const isDark = theme === 'dark';

  return (
    <div className={`fixed bottom-6 ${isAr ? 'right-6' : 'left-6'} z-[100] ${isAr ? 'font-alexandria' : 'font-sans'} flex flex-col ${isAr ? 'items-end' : 'items-start'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className={`mb-6 w-[90vw] max-w-[360px] ${isDark ? 'bg-[#0a0c10] border-[#1e2330]' : 'bg-[#F9F8F6] border-stone-200'} rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.4)] border overflow-hidden flex flex-col h-[520px] ${isAr ? 'origin-bottom-right' : 'origin-bottom-left'}`}>
            <div className={`${isDark ? 'bg-[#111318] border-[#1e2330]' : 'bg-white border-stone-200'} p-4 flex justify-between items-center border-b`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A1824A] to-yellow-600 flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(161,130,74,0.3)] text-lg">SK</div>
                <div><div className={`font-bold text-sm ${isDark ? 'text-[#e8ecf0]' : 'text-[#15110E]'}`}>{t[lang].title}</div><div className="text-[10px] text-[#A1824A] mt-0.5 tracking-widest uppercase">{t[lang].sub}</div></div>
              </div>
              <button onClick={() => setIsOpen(false)} className={`w-8 h-8 rounded-full ${isDark ? 'bg-[#181c24] text-stone-400 hover:text-white' : 'bg-stone-100 text-stone-500 hover:text-black'} flex items-center justify-center hover:bg-red-500/20 transition-all`}><X size={16}/></button>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-5">
              {msg.map((m, i) => (
                <div key={i} className={`flex gap-3 max-w-[90%] ${m.r === 'u' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black ${m.r === 'u' ? (isDark ? 'bg-[#181c24] text-[#6b7585] border border-[#1e2330]' : 'bg-stone-200 text-stone-600 border border-stone-300') : 'bg-gradient-to-br from-[#A1824A] to-yellow-600 text-black'}`}>{m.r === 'u' ? t[lang].me : <Bot size={16}/>}</div>
                  <div className={`p-4 text-[13px] leading-[1.8] tracking-wide ${m.r === 'u' ? (isDark ? `bg-[#1e2330] text-[#e8ecf0] rounded-2xl border border-white/5 ${isAr ? 'rounded-tr-sm' : 'rounded-tl-sm'}` : `bg-stone-100 text-[#15110E] rounded-2xl border border-stone-200 ${isAr ? 'rounded-tr-sm' : 'rounded-tl-sm'}`) : (isDark ? `bg-[#15110E] text-[#e8ecf0] rounded-2xl border border-[#A1824A]/30 shadow-inner ${isAr ? 'rounded-tl-sm' : 'rounded-tr-sm'}` : `bg-white text-[#15110E] rounded-2xl border border-[#A1824A]/30 shadow-sm ${isAr ? 'rounded-tl-sm' : 'rounded-tr-sm'}`)}`} dangerouslySetInnerHTML={{ __html: m.r === 'b' ? formatTxt(m.t) : m.t }} />
                </div>
              ))}
              
              {msg.length === 1 && !load && (
                <div className={`flex flex-wrap gap-2 mt-2 self-start ${isAr ? 'mr-10' : 'ml-10'}`}>
                  {t[lang].suggs.map((s, i) => (<button key={i} onClick={() => send(s)} className={`${isDark ? 'bg-[#111318] border-[#1e2330] text-[#9aa3b2]' : 'bg-white border-stone-200 text-stone-600'} border hover:border-[#A1824A] hover:text-[#A1824A] px-4 py-2 rounded-full text-[11px] font-bold transition-all hover:scale-105 shadow-sm`}>{s}</button>))}
                </div>
              )}

              {load && (<div className="self-start flex gap-3"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A1824A] to-yellow-600 flex items-center justify-center text-black"><Bot size={16}/></div><div className={`p-4 ${isDark ? 'bg-[#15110E] border-[#A1824A]/30' : 'bg-white border-[#A1824A]/30 shadow-sm'} border rounded-2xl flex items-center h-[52px] ${isAr ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}><Loader2 className="animate-spin text-[#A1824A]" size={18}/></div></div>)}
              <div ref={endRef} />
            </div>
            
            <div className={`p-3 ${isDark ? 'bg-[#111318] border-[#1e2330]' : 'bg-white border-stone-200'} border-t flex gap-2 items-center`}>
              <input type="text" value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder={t[lang].placeholder} className={`flex-1 ${isDark ? 'bg-[#181c24] border-[#1e2330] text-[#e8ecf0]' : 'bg-stone-50 border-stone-200 text-[#15110E]'} border focus:border-[#A1824A] transition-colors rounded-xl px-4 py-3 text-[13px] leading-[1.8] outline-none placeholder:text-[#4a5568]`} />
              <button onClick={() => send()} className={`w-12 h-12 bg-gradient-to-br from-[#A1824A] to-yellow-600 text-black rounded-xl flex items-center justify-center hover:scale-105 transition-transform`}><Send size={18} className={`${isAr ? 'rtl:-translate-x-0.5 rtl:translate-y-0.5 rtl:rotate-180' : 'translate-x-0.5 translate-y-0.5'}`}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        {!isOpen && (<div className="absolute -inset-1.5 bg-gradient-to-r from-[#A1824A] to-yellow-500 rounded-full blur-md opacity-40 animate-pulse group-hover:opacity-80 transition duration-500"></div>)}
        <button onClick={() => setIsOpen(!isOpen)} className={`relative h-14 bg-gradient-to-br from-[#A1824A] to-yellow-500 text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(161,130,74,0.5)] hover:scale-105 transition-all duration-300 border border-yellow-300/50 ${isOpen ? 'w-14 px-0' : 'px-6 md:px-8 gap-3 w-auto'}`}>
          {!isOpen && (
            <span className={`absolute -top-1 ${isAr ? '-left-1' : '-right-1'} flex h-4 w-4`}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-[#050505]"></span>
            </span>
          )}
          {isOpen ? <X size={24} /> : <><Sparkles size={18} className="animate-pulse"/><span className={`font-black text-sm md:text-base ${isAr ? 'pt-0.5' : ''}`}>{t[lang].btn}</span></>}
        </button>
      </div>
    </div>
  );
}
