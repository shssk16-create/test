"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Send, Bot, User, Sparkles, Server, BrainCircuit, Globe, Code2, ShieldCheck, Mail, ArrowUpLeft } from "lucide-react";

// 1. شاشة التحميل (Splash Screen)
export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div 
      exit={{ opacity: 0, transition: { duration: 1 } }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] bg-stone-50 flex flex-col items-center justify-center"
    >
      <svg viewBox="0 0 800 200" className="w-full max-w-2xl h-32 md:h-48">
        <motion.text 
          x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
          className="text-6xl md:text-8xl font-black stroke-stone-900 fill-transparent stroke-1 font-heading"
          initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0, fill: "rgba(28, 25, 23, 1)" }}
          transition={{ duration: 2.5, ease: "easeInOut", fill: { delay: 2, duration: 0.5 } }}
        >
          أهلاً وسهلاً
        </motion.text>
      </svg>
    </motion.div>
  );
}

// 2. بطاقة الهوية الرقمية (Digital ID Card)
export function DigitalIDCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[1.618/1] max-w-sm rounded-[2rem] glass id-card-gradient border border-white/50 p-8 shadow-2xl cursor-pointer overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-stone-900 rounded-2xl text-stone-50"><ShieldCheck size={28} /></div>
          <div className="text-end">
            <h3 className="font-heading font-black text-2xl">SALMEEN.</h3>
            <p className="text-[10px] tracking-widest text-stone-500 font-bold uppercase">Digital ID v4.0</p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-heading font-black text-stone-900 pb-[0.15em] mb-1">سالمين هادي</h2>
          <p className="text-sm text-stone-600 font-bold">AI Product Manager | Full-Stack Developer</p>
        </div>
        <div className="pt-4 border-t border-stone-200/50 flex justify-between items-center">
          <div className="flex gap-1">
             {[1,2,3,4].map(i => <div key={i} className="w-6 h-1 bg-stone-300 rounded-full"></div>)}
          </div>
          <div className="w-10 h-10 rounded-full bg-rose-700/10 flex items-center justify-center text-rose-700 group-hover:scale-110 transition-transform"><Sparkles size={20} /></div>
        </div>
      </div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-700/5 blur-[50px] rounded-full"></div>
    </motion.div>
  );
}

// 3. المساعد الذكي (RAG Chatbot UI)
export function RagChatbot() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "مرحباً! أنا المساعد الذكي لسالمين. يمكنك سؤالي عن مهاراته في AWS، Laravel، أو مشاريعه السابقة." }]);
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
      let res = "سالمين هو مطور متكامل متخصص في Laravel ونشر التطبيقات على AWS EC2. يمتلك خبرة واسعة في الأتمتة باستخدام n8n وبناء أنظمة RAG.";
      if (userMsg.includes("أورا") || userMsg.includes("aura")) res = "في Aura Marketing، حقق سالمين المركز الأول في جوجل لثلاث كلمات مفتاحية عبر تحسينات SEO تقنية شاملة.";
      setMessages(prev => [...prev, { role: "assistant", content: res }]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div className="w-full bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden flex flex-col h-[480px]">
      <div className="p-4 bg-stone-50 border-b border-stone-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center"><Bot size={20} /></div>
        <div className="text-start">
          <h4 className="font-bold text-sm">SalmeenAI Agent</h4>
          <span className="text-[10px] text-green-600 font-bold flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> متصل الآن</span>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 text-start">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'ms-auto bg-stone-100 text-stone-900 rounded-se-none' : 'me-auto bg-white border border-stone-200 text-stone-700 rounded-ss-none'}`}>
            {m.content}
          </div>
        ))}
        {isTyping && <div className="me-auto p-4 bg-stone-50 rounded-2xl flex gap-1"><div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce delay-75"></div></div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-stone-100 flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="اسألني عن مهارات سالمين..." className="flex-1 bg-stone-50 px-4 py-3 rounded-xl text-sm outline-none focus:ring-1 focus:ring-rose-700/30 transition-all" />
        <button type="submit" className="bg-stone-900 text-stone-50 p-3 rounded-xl hover:bg-rose-700 transition-colors"><Send size={18} className="transform rotate-180" /></button>
      </form>
    </div>
  );
}
