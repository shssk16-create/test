"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, User, Bot, Award, CheckCircle2 } from "lucide-react";

// 1. شريط الشعارات اللانهائي (Infinite Marquee)
export function LogoMarquee() {
  const logos = [
    { n: "Aura", u: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png" },
    { n: "Akam", u: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp" },
    { n: "Bathq", u: "https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp" },
    { n: "Asas", u: "https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp" },
    { n: "Darb", u: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png" },
  ];
  return (
    <div className="py-12 bg-stone-100/50 border-y border-stone-200 overflow-hidden relative marquee-container">
      <div className="flex animate-marquee whitespace-nowrap gap-24 items-center">
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <img key={i} src={logo.u} alt={logo.n} className="h-10 md:h-14 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110 cursor-pointer object-contain px-4" />
        ))}
      </div>
    </div>
  );
}

// 2. المساعد الذكي (RAG Chatbot UI)
export function RagChatbot() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "مرحباً! أنا الوكيل الذكي لسالمين. اسألني عن خبراته في AWS، Laravel، أو كيف حقق المركز الأول في جوجل لمشروع أورا." }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let res = "سالمين مهندس شامل يدمج بين منطق البرمجة (Laravel/AWS) وفقه اللغة العربية. يمتلك خبرة في بناء أنظمة RAG وأتمتة n8n.";
      if (userMsg.includes("أورا") || userMsg.includes("aura")) res = "في مشروع Aura Marketing، قام سالمين ببناء البنية الرقمية وحقق المركز #1 في جوجل لثلاث كلمات مفتاحية استراتيجية.";
      setMessages(prev => [...prev, { role: "assistant", content: res }]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div className="w-full bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 bg-stone-50 border-b border-stone-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center shadow-lg"><Sparkles size={18} /></div>
        <div className="text-start"><h4 className="font-bold text-sm">Salmeen Assistant</h4><p className="text-[10px] text-rose-700 font-bold uppercase tracking-tighter">Powered by RAG</p></div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5 text-start">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'ms-auto flex-row-reverse' : 'me-auto'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-stone-100 text-stone-600' : 'bg-stone-900 text-stone-50'}`}>
              {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-stone-100 text-stone-900 rounded-se-none' : 'bg-white border border-stone-100 text-stone-700 rounded-ss-none'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && <div className="me-auto p-4 bg-stone-50 rounded-2xl animate-pulse text-xs text-stone-400">جاري تحليل البيانات...</div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-stone-100 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="اسأل عن خبرات سالمين..." className="flex-1 bg-stone-50 px-4 py-3 rounded-xl text-sm outline-none focus:ring-1 focus:ring-rose-700/30 transition-all" />
        <button type="submit" className="bg-stone-900 text-stone-50 px-5 py-3 rounded-xl hover:bg-rose-700 transition-colors flex items-center justify-center"><Send size={18} className="transform rotate-180" /></button>
      </form>
    </div>
  );
}
