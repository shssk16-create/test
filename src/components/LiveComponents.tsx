"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Send, Bot, User } from "lucide-react";

// 1. شريط العملاء (Infinite Social Proof)
export function TrustedByMarquee() {
  const logos = [
    { n: "Aura", u: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png" },
    { n: "Akam", u: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp" },
    { n: "Bathq", u: "https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp" },
    { n: "Asas", u: "https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp" },
    { n: "Darb", u: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png" },
  ];
  return (
    <div className="py-16 bg-emerald-900 border-y border-emerald-800 overflow-hidden relative marquee-container">
      <div className="absolute inset-0 arabic-pattern opacity-10"></div>
      <h4 className="text-center text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-bold mb-10 relative z-10">Trusted By | شركاء النجاح</h4>
      <div className="flex animate-marquee whitespace-nowrap gap-24 items-center relative z-10">
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <img key={i} src={logo.u} alt={logo.n} className="h-12 md:h-16 w-auto grayscale brightness-200 opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-700 cursor-pointer object-contain" />
        ))}
      </div>
    </div>
  );
}

// 2. المساعد الذكي (RAG Chatbot)
export function RagChatbot() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "مرحباً! أنا المساعد الذكي للمهندس سالمين. اسألني عن خبراته في AWS، Laravel، أو هندسة الذكاء الاصطناعي." }]);
  const [input, setInput] = useState("");

  const handleSend = (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: "سالمين مهندس شامل يدمج بين تطوير Laravel وهندسة السحاب (AWS)، بفضل خلفيته اللغوية يتفوق في هندسة الأوامر وبناء أنظمة RAG." }]);
    }, 1000);
  };

  const [isTyping, setIsTyping] = useState(false);
  return (
    <div className="w-full bg-white rounded-[2.5rem] border border-stone-200 shadow-2xl overflow-hidden flex flex-col h-[500px]">
      <div className="p-5 bg-emerald-900 text-white flex items-center gap-3">
        <Sparkles size={20} className="text-emerald-400 animate-pulse" />
        <span className="font-heading font-bold text-sm tracking-wide">SalmeenAI Assistant</span>
      </div>
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5 text-start scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${m.role === 'user' ? 'ms-auto bg-stone-100 text-emerald-900 rounded-se-none' : 'me-auto bg-white border border-stone-100 text-stone-700 rounded-ss-none shadow-sm'}`}>
            {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-stone-100 flex gap-2 bg-stone-50/50">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="اسأل عن خبرات سالمين..." className="flex-1 bg-white border border-stone-200 px-5 py-3 rounded-full text-sm outline-none focus:border-emerald-700 transition-all" />
        <button type="submit" className="bg-emerald-900 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors shadow-lg"><Send size={18} className="transform rotate-180" /></button>
      </form>
    </div>
  );
}

import { useState } from "react";
