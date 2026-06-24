"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Bot, User, Award, ShieldCheck } from "lucide-react";

// 1. شاشة التحميل السينمائية
export function LoadingScreen() {
  return (
    <motion.div 
      exit={{ y: "-100%", transition: { duration: 1, ease: [0.7, 0, 0.3, 1] } }}
      className="fixed inset-0 z-[100] bg-coffee-950 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h2 className="text-5xl md:text-7xl font-heading font-black text-sand-100 pb-[0.15em] pt-[0.1em] mb-4">أهلاً وسهلاً</h2>
        <p className="text-bronze tracking-[0.5em] text-sm font-bold uppercase">Welcome</p>
      </motion.div>
      <motion.div 
        initial={{ width: 0 }} animate={{ width: "240px" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="h-[1px] bg-bronze/30 mt-12"
      />
    </motion.div>
  );
}

// 2. المساعد الذكي (RAG Chatbot) بأسلوب القهوة والذهب
export function SalmeenBot({ isRTL }: { isRTL: boolean }) {
  const [messages, setMessages] = useState([{ role: "assistant", content: isRTL ? "يا هلا بك! أنا المساعد الذكي لسالمين. وش حاب تعرف عن خبراتي في الـ AI أو تطوير المواقع؟" : "Hello! I'm Salmeen's AI assistant. What would you like to know about my AI or Web Dev expertise?" }]);
  const [input, setInput] = useState("");

  const handleSend = (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: "سالمين مهندس شامل يجمع بين بلاغة اللغة العربية وقوة البرمجة بـ Laravel و AWS. خبرته تتركز في أتمتة العمليات وبناء أنظمة RAG ذكية." }]);
    }, 1000);
  };

  return (
    <div className="w-full h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-sand-200 overflow-hidden flex flex-col">
      <div className="p-5 bg-coffee-900 text-sand-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="text-bronze animate-pulse" size={20} />
          <span className="font-heading font-bold text-sm">SalmeenAI Agent</span>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 text-start">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'ms-auto bg-sand-100 text-coffee-950' : 'me-auto bg-white border border-sand-100 text-coffee-800 shadow-sm'}`}>
            {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-sand-100 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="اسأل وكيل سالمين..." className="flex-1 bg-sand-50 border-none px-5 py-3 rounded-full text-sm outline-none" />
        <button className="bg-coffee-900 text-white p-3 rounded-full hover:bg-bronze transition-colors"><Send size={18} className="transform rotate-180" /></button>
      </form>
    </div>
  );
}
