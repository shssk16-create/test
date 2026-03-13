"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Terminal, User, Sparkles } from "lucide-react";

export default function RagChatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "أهلاً بك! أنا المساعد الذكي الخاص بالمهندس سالمين. اسألني عن مهاراته في تطوير Laravel، أتمتة n8n، أو هندسة خوادم AWS." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let response = "سالمين هو مطور Full-Stack متخصص في Laravel ونشر التطبيقات السحابية على خوادم AWS EC2. يمتلك خبرة واسعة في بناء وكلاء الذكاء الاصطناعي وأتمتة مسارات العمل باستخدام n8n لتحسين الكفاءة التشغيلية.";
      
      const lowerInput = userMsg.toLowerCase();
      if (lowerInput.includes("أورا") || lowerInput.includes("aura")) {
        response = "في منصة Aura Marketing، قام سالمين ببناء الموقع الإلكتروني وتطبيق استراتيجية SEO مهيكلة، مما أدى إلى تحقيق المركز الأول في جوجل لثلاث كلمات مفتاحية استراتيجية.";
      } else if (lowerInput.includes("مسارات") || lowerInput.includes("masarat")) {
        response = "في مشروع Masarat، نفذ سالمين تحسينات متقدمة في الواجهة الخلفية (Backend) باستخدام Laravel، مما أدى إلى تحسين أداء النظام وسهولة صيانته بشكل كبير.";
      } else if (lowerInput.includes("آكام") || lowerInput.includes("akam")) {
        response = "بالنسبة لشركة Akam، قام ببناء موقع الشركة بالكامل من الصفر، بما في ذلك البنية الخلفية والمحتوى التقني المحسن لمحركات البحث (SEO).";
      }

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      let i = 0;
      const typeInterval = setInterval(() => {
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = response.slice(0, i + 1);
          return newMsgs;
        });
        i++;
        if (i >= response.length) {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 25);
    }, 600);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div className="w-full h-[450px] bg-ide-panel border border-ide-border rounded-2xl flex flex-col shadow-2xl overflow-hidden font-body">
      <div className="p-4 bg-[#0d1117] border-b border-ide-border flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-neon-blue/10 flex items-center justify-center text-neon-blue border border-neon-blue/30"><Terminal size={16} /></div>
        <div>
          <h3 className="font-bold text-white text-sm">SalmeenAI_Agent.sh</h3>
          <p className="text-xs text-neon-cyan/70">متصل - يجيب من قاعدة البيانات المعرفية</p>
        </div>
      </div>
      
      <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 text-start text-sm">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 max-w-[90%] ${m.role === 'user' ? 'ms-auto flex-row-reverse' : 'me-auto'}`}>
            <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-ide-border text-white' : 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'}`}>
              {m.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
            </div>
            <div className={`p-3 rounded-lg leading-relaxed ${m.role === 'user' ? 'bg-ide-border text-white rounded-se-none' : 'bg-[#0d1117] border border-ide-border text-[#c9d1d9] rounded-ss-none'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 me-auto max-w-[90%]">
            <div className="w-7 h-7 rounded bg-neon-blue/20 text-neon-blue border border-neon-blue/30 flex items-center justify-center shrink-0"><Sparkles size={14} /></div>
            <div className="p-3 rounded-lg bg-[#0d1117] border border-ide-border rounded-ss-none flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 bg-[#0d1117] border-t border-ide-border flex gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="اسألني عن مهارات سالمين أو مشاريعه..." className="flex-1 bg-ide-panel border border-ide-border rounded-lg px-4 py-2.5 outline-none focus:border-neon-blue transition-colors text-sm text-white" />
        <button type="submit" disabled={isTyping} className="bg-neon-blue text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center shrink-0">
          <Send size={16} className="transform rotate-180" />
        </button>
      </form>
    </div>
  );
}
