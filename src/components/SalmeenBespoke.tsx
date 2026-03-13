"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Bot, User } from "lucide-react";

export function IntelligentConsultant() {
  const [messages, setMessages] = useState([{ 
    role: "assistant", 
    content: "يا هلا بك.. أنا المساعد الذكي لسالمين. كيف أقدر أخدمك اليوم في مشروعك التقني؟" 
  }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const handleChat = async (e: any) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: messages }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: "assistant", content: data.text }]);
      } else {
        throw new Error();
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "المعذرة، صار ضغط على الشبكة. سالمين دايم موجود للرد المباشر!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-[3rem] shadow-2xl border border-[#E8E4DB] overflow-hidden flex flex-col h-[550px] relative z-10">
      <div className="p-6 bg-[#261F1B] text-[#F9F8F6] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="text-[#D4AF37]" size={20} />
          <div className="text-start">
            <h4 className="font-heading font-bold text-sm">Salmeen AI Agent</h4>
            <p className="text-[10px] text-stone-400 uppercase font-black">Stable Server-side AI</p>
          </div>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-y-auto flex flex-col gap-6 text-start">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'ms-auto flex-row-reverse' : 'me-auto'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-stone-100' : 'bg-[#15110E] text-[#A1824A]'}`}>
              {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`p-4 rounded-3xl text-sm leading-[1.8] ${m.role === 'user' ? 'bg-stone-100 text-[#15110E] rounded-se-none' : 'bg-white border border-stone-100 shadow-sm rounded-ss-none'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && <div className="p-4 bg-stone-50 w-fit rounded-2xl animate-pulse text-[10px] font-black text-stone-400">سالمين يحلل طلبك...</div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleChat} className="p-6 border-t border-stone-100 flex gap-3">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="اسأل سالمين عن خدماته..." className="flex-1 bg-white border border-stone-200 px-6 py-4 rounded-full text-sm outline-none focus:border-[#A1824A]" />
        <button type="submit" className="bg-[#15110E] text-white p-4 rounded-full shadow-xl"><Send size={18} className="transform rotate-180" /></button>
      </form>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <motion.div exit={{ opacity: 0, scale: 1.1 }} className="fixed inset-0 z-[100] bg-[#15110E] flex flex-col items-center justify-center">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl font-heading font-black text-white">أهلاً وسهلاً</motion.h2>
      <div className="h-[1px] w-48 bg-[#D4AF37]/30 mt-8" />
    </motion.div>
  );
}
