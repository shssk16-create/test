"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState<{r: 'u'|'b', t: string}[]>([{ r: 'b', t: 'أهلاً بك! أنا المساعد الذكي. تفضل، كيف أقدر أساعدك؟' }]);
  const [inp, setInp] = useState("");
  const [load, setLoad] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msg, load]);

  const formatTxt = (txt: string) => {
    return txt
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^(?:\*|-)\s(.+)$/gm, '• $1')
      .replace(/\n/g, '<br>');
  };
  const send = async () => {
    if (!inp.trim()) return;
    const txt = inp; 
    setMsg(p => [...p, { r: 'u', t: txt }]); 
    setInp(""); 
    setLoad(true);
    
    try {
      const res = await fetch("https://shssk-n8n.hf.space/webhook/portfolio-chat", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ message: txt }) 
      });
      
      const raw = await res.text();
      let botTxt = "";
      
      try {
        let parsed = JSON.parse(raw);
        if (typeof parsed === 'string') parsed = JSON.parse(parsed);
        if (Array.isArray(parsed)) parsed = parsed[0];
        botTxt = parsed?.reply || parsed?.text || parsed?.message || parsed?.answer || '';
      } catch(e) {
        botTxt = raw;
      }
      
      if (!botTxt) botTxt = "عذراً، لم أتمكن من الرد. حاول مجدداً.";
      setMsg(p => [...p, { r: 'b', t: botTxt }]);
    } catch (e) { 
      setMsg(p => [...p, { r: 'b', t: "عذراً، الخادم لا يستجيب." }]); 
    } finally { 
      setLoad(false); 
    }
  };
  return (
    <div className="fixed bottom-6 right-6 z-[100] font-alexandria" dir="rtl">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="absolute bottom-16 right-0 w-[90vw] max-w-[360px] bg-[#111318] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-[#1e2330] overflow-hidden flex flex-col h-[520px]">
            <div className="bg-[#0e1015] p-4 flex justify-between items-center border-b border-[#1e2330]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#A1824A] to-yellow-600 flex items-center justify-center text-black font-black shadow-[0_0_12px_rgba(161,130,74,0.3)]">SK</div>
                <div><div className="font-bold text-sm text-[#e8ecf0]">سالمين خنبري</div><div className="text-[10px] text-[#A1824A] mt-0.5">AI · Cloud · Data</div></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-[#A1824A] transition-colors"><X size={20}/></button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto bg-[#0a0c10] flex flex-col gap-4">
              {msg.map((m, i) => (
                <div key={i} className={`flex gap-2 max-w-[85%] ${m.r === 'u' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[9px] font-black ${m.r === 'u' ? 'bg-[#181c24] text-[#6b7585] border border-[#1e2330]' : 'bg-gradient-to-br from-[#A1824A] to-yellow-600 text-black'}`}>{m.r === 'u' ? 'أنت' : 'AI'}</div>
                  <div className={`p-3 text-[13px] leading-relaxed ${m.r === 'u' ? 'bg-[#1e2330] text-[#e8ecf0] rounded-2xl rounded-tr-sm border border-white/5' : 'bg-[#15110E] text-[#e8ecf0] rounded-2xl rounded-tl-sm border border-[#A1824A]/20'}`} dangerouslySetInnerHTML={{ __html: m.r === 'b' ? formatTxt(m.t) : m.t }} />
                </div>
              ))}
              {load && (<div className="self-start flex gap-2"><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#A1824A] to-yellow-600 flex items-center justify-center text-black"><Bot size={14}/></div><div className="p-3 bg-[#15110E] border border-[#A1824A]/20 rounded-2xl rounded-tl-sm flex items-center"><Loader2 className="animate-spin text-[#A1824A]" size={16}/></div></div>)}
              <div ref={endRef} />
            </div>
            
            <div className="p-3 bg-[#111318] border-t border-[#1e2330] flex gap-2 items-center">
              <input type="text" value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="اسألني..." className="flex-1 bg-[#181c24] border border-[#1e2330] focus:border-[#A1824A] transition-colors rounded-xl px-4 py-2.5 text-[13px] text-[#e8ecf0] outline-none placeholder:text-[#4a5568]" />
              <button onClick={send} className="w-10 h-10 bg-gradient-to-br from-[#A1824A] to-yellow-600 text-black rounded-xl flex items-center justify-center hover:scale-105 transition-transform"><Send size={16} className="-translate-x-0.5 translate-y-0.5 rtl:rotate-180"/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-gradient-to-br from-[#A1824A] to-yellow-600 text-black rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(161,130,74,0.4)] hover:scale-110 transition-transform"><MessageSquare size={24} /></button>
    </div>
  );
}
