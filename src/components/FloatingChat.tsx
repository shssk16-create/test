"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState<{r: 'u'|'b', t: string}[]>([
    { r: 'b', t: 'أهلاً بك! أنا المساعد الذكي للمهندس سالمين. تفضل، كيف أقدر أساعدك؟' }
  ]);
  const [inp, setInp] = useState("");
  const [load, setLoad] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msg, load]);
  const send = async () => {
    if (!inp.trim()) return;
    const txt = inp;
    setMsg(p => [...p, { r: 'u', t: txt }]);
    setInp(""); setLoad(true);
    try {
      const res = await fetch("https://shssk-n8n.hf.space/webhook/portfolio-chat", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: txt })
      });
      const data = await res.json();
      const botTxt = typeof data === 'string' ? data : (data.output || data.response || data.text || "تم الاستلام بنجاح.");
      setMsg(p => [...p, { r: 'b', t: botTxt }]);
    } catch (e) {
      setMsg(p => [...p, { r: 'b', t: "عذراً، هناك مشكلة في الاتصال بالخادم." }]);
    } finally { setLoad(false); }
  };
  return (
    <div className="fixed bottom-6 right-6 z-[100] font-alexandria" dir="rtl">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="absolute bottom-16 right-0 w-[90vw] max-w-[350px] bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[450px]">
            <div className="bg-[#15110E] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2"><Bot className="text-[#A1824A]"/> <span className="font-bold text-sm">Hala - AI Agent</span></div>
              <button onClick={() => setIsOpen(false)} className="hover:text-[#A1824A]"><X size={20}/></button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-stone-50 flex flex-col gap-3">
              {msg.map((m, i) => (
                <div key={i} className={`flex gap-2 max-w-[85%] ${m.r === 'u' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.r === 'u' ? 'bg-[#A1824A] text-white' : 'bg-[#15110E] text-white'}`}>{m.r === 'u' ? <User size={14}/> : <Bot size={14}/>}</div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${m.r === 'u' ? 'bg-[#A1824A] text-white rounded-tl-none' : 'bg-white border shadow-sm rounded-tr-none text-[#15110E]'}`}>{m.t}</div>
                </div>
              ))}
              {load && (<div className="self-start flex gap-2"><div className="w-8 h-8 rounded-full bg-[#15110E] flex items-center justify-center text-white"><Bot size={14}/></div><div className="p-3 bg-white border rounded-2xl rounded-tr-none flex items-center"><Loader2 className="animate-spin text-[#A1824A]" size={16}/></div></div>)}
              <div ref={endRef} />
            </div>
            <div className="p-3 bg-white border-t flex gap-2">
              <input type="text" value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="اسأل عن خدماتي..." className="flex-1 bg-stone-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A1824A]" />
              <button onClick={send} className="w-10 h-10 bg-[#15110E] text-white rounded-xl flex items-center justify-center hover:bg-[#A1824A] transition-colors"><Send size={16} className="-translate-x-0.5 translate-y-0.5 rtl:rotate-180"/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-[#15110E] text-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(161,130,74,0.3)] hover:scale-110 transition-transform border-2 border-[#A1824A]"><MessageSquare size={24} /></button>
    </div>
  );
}
