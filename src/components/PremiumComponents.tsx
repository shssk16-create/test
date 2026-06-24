"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Send, Bot, User, Sparkles, ShieldCheck, Award } from "lucide-react";

// 1. بطاقة الهوية الرقمية ثلاثية الأبعاد
export function DigitalIDCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y), [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(useSpring(x), [-0.5, 0.5], ["-15deg", "15deg"]);

  return (
    <motion.div 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[1.618/1] max-w-sm rounded-[2rem] glass border border-white p-8 shadow-2xl cursor-pointer group overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')]"></div>
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-stone-900 rounded-2xl text-stone-50"><ShieldCheck size={28} /></div>
          <div className="text-end font-heading font-black text-xl">SALMEEN<span className="text-rose-700">.</span></div>
        </div>
        <div>
          <h2 className="text-2xl font-heading font-black text-stone-900 pb-[0.15em] mb-1">سالمين هادي</h2>
          <p className="text-xs text-stone-500 font-bold uppercase tracking-widest">AI PM & Full-Stack Developer</p>
        </div>
        <div className="pt-4 border-t border-stone-200/50 flex justify-between items-center text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
          <span>Verified Identity</span>
          <Sparkles size={16} className="text-rose-700 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}

// 2. المساعد الذكي RAG (iMessage Style)
export function RagChatbot() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "مرحباً! أنا المساعد الذكي لسالمين. اسألني عن خبراته في AWS، Laravel، أو كيف حقق المركز الأول في جوجل." }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let res = "سالمين مهندس شامل يدمج بين تطوير Laravel وهندسة السحاب (AWS). بفضل خلفيته اللغوية، يتميز في هندسة الأوامر (Prompt Engineering) وبناء أنظمة RAG.";
      if (msg.includes("أورا") || msg.includes("Aura")) res = "في Aura Marketing، حقق سالمين المركز الأول (#1) في جوجل لثلاث كلمات مفتاحية استراتيجية.";
      setMessages(prev => [...prev, { role: "assistant", content: res }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center"><Bot size={20} /></div>
          <div className="text-start leading-[1.7]"><h4 className="font-bold text-sm">Salmeen Assistant</h4><span className="text-[10px] text-green-600 font-bold">متصل الآن</span></div>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 text-start">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'ms-auto bg-stone-100 text-stone-900 rounded-se-none' : 'me-auto bg-white border border-stone-200 text-stone-700 rounded-ss-none shadow-sm'}`}>
            {m.content}
          </div>
        ))}
        {isTyping && <div className="me-auto p-4 bg-stone-50 rounded-2xl animate-pulse text-xs text-stone-400">جاري التفكير...</div>}
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-stone-100 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="اسأل المساعد الذكي..." className="flex-1 bg-stone-50 px-4 py-3 rounded-xl text-sm outline-none" />
        <button type="submit" className="bg-stone-900 text-stone-50 p-3 rounded-xl hover:bg-rose-700 transition-colors"><Send size={18} className="transform rotate-180" /></button>
      </form>
    </div>
  );
}
