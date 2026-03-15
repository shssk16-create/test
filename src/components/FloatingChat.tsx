"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState<{r: 'u'|'b', t: string}[]>([{ r: 'b', t: 'أهلاً بك! أنا المساعد الذكي الخاص بسالمين. تفضل، اسألني عن خدماته أو مشاريعه أو مهاراته؟ 🚀' }]);
  const [inp, setInp] = useState("");
  const [load, setLoad] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msg, load]);

  const formatTxt = (txt: string) => {
    return txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^(?:\*|-)\s(.+)$/gm, '• $1').replace(/\n/g, '<br>');
  };

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
      if (!botTxt) botTxt = "عذراً، لم أتمكن من الرد. حاول مجدداً.";
      setMsg(p => [...p, { r: 'b', t: botTxt }]);
    } catch (e) { 
      setMsg(p => [...p, { r: 'b', t: "عذراً، الخادم لا يستجيب." }]); 
    } finally { setLoad(false); }
  };
  const suggs = ["💡 أبرز مشاريعك؟", "🛠️ وش مهاراتك؟", "📬 كيف أتواصل معك؟"];

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-alexandria flex flex-col items-end" dir="rtl">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="mb-6 w-[90vw] max-w-[360px] bg-[#0a0c10] rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-[#1e2330] overflow-hidden flex flex-col h-[520px]">
            <div className="bg-[#111318] p-4 flex justify-between items-center border-b border-[#1e2330]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A1824A] to-yellow-600 flex items-center justify-center text-black font-black shadow-[0_0_15px_rgba(161,130,74,0.3)] text-lg">SK</div>
                <div><div className="font-bold text-sm text-[#e8ecf0]">المساعد الذكي</div><div className="text-[10px] text-[#A1824A] mt-0.5 tracking-widest uppercase">Powered by AI</div></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-[#181c24] flex items-center justify-center text-stone-400 hover:text-white hover:bg-red-500/20 transition-all"><X size={16}/></button>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-5">
              {msg.map((m, i) => (
                <div key={i} className={`flex gap-3 max-w-[90%] ${m.r === 'u' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black ${m.r === 'u' ? 'bg-[#181c24] text-[#6b7585] border border-[#1e2330]' : 'bg-gradient-to-br from-[#A1824A] to-yellow-600 text-black'}`}>{m.r === 'u' ? 'أنت' : <Bot size={16}/>}</div>
                  <div className={`p-4 text-[13px] leading-[1.8] tracking-wide ${m.r === 'u' ? 'bg-[#1e2330] text-[#e8ecf0] rounded-2xl rounded-tr-sm border border-white/5' : 'bg-[#15110E] text-[#e8ecf0] rounded-2xl rounded-tl-sm border border-[#A1824A]/30 shadow-inner'}`} dangerouslySetInnerHTML={{ __html: m.r === 'b' ? formatTxt(m.t) : m.t }} />
                </div>
              ))}
              
              {msg.length === 1 && !load && (
                <div className="flex flex-wrap gap-2 mt-2 self-start ml-10">
                  {suggs.map((s, i) => (<button key={i} onClick={() => send(s)} className="bg-[#111318] border border-[#1e2330] hover:border-[#A1824A] text-[#9aa3b2] hover:text-[#A1824A] px-4 py-2 rounded-full text-[11px] font-bold transition-all hover:scale-105 shadow-sm">{s}</button>))}
                </div>
              )}

              {load && (<div className="self-start flex gap-3"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A1824A] to-yellow-600 flex items-center justify-center text-black"><Bot size={16}/></div><div className="p-4 bg-[#15110E] border border-[#A1824A]/30 rounded-2xl rounded-tl-sm flex items-center h-[52px]"><Loader2 className="animate-spin text-[#A1824A]" size={18}/></div></div>)}
              <div ref={endRef} />
            </div>
            
            <div className="p-3 bg-[#111318] border-t border-[#1e2330] flex gap-2 items-center">
              <input type="text" value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="اكتب سؤالك هنا..." className="flex-1 bg-[#181c24] border border-[#1e2330] focus:border-[#A1824A] transition-colors rounded-xl px-4 py-3 text-[13px] leading-[1.8] text-[#e8ecf0] outline-none placeholder:text-[#4a5568]" />
              <button onClick={() => send()} className="w-12 h-12 bg-gradient-to-br from-[#A1824A] to-yellow-600 text-black rounded-xl flex items-center justify-center hover:scale-105 transition-transform"><Send size={18} className="-translate-x-0.5 translate-y-0.5 rtl:rotate-180"/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setIsOpen(!isOpen)} className={`h-14 bg-gradient-to-br from-[#A1824A] to-yellow-600 text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(161,130,74,0.3)] hover:scale-105 transition-all duration-300 border border-yellow-400/50 ${isOpen ? 'w-14 px-0' : 'px-6 gap-3 w-auto'}`}>
        {isOpen ? <X size={24} /> : <><Sparkles size={18}/><span className="font-black text-sm pt-0.5">اسأل المساعد الذكي عني</span></>}
      </button>
    </div>
  );
}
