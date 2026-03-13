"use client";
import { useState, useRef, useEffect } from "react";
import { Terminal as TermIcon } from "lucide-react";

export default function MockTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "sys", text: "SalmeenOS v2.0.4 loaded. Type 'help' to see available commands." }
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const cmd = input.trim().toLowerCase();
      let res = "";
      if (cmd === "help") res = "Commands: salmeen --skills, npm run deploy-aws, php artisan optimize";
      else if (cmd === "salmeen --skills") res = "[Output] > Laravel (Advanced), AWS EC2, n8n Automation, RAG Systems, Arabic NLP.";
      else if (cmd === "npm run deploy-aws") res = "[Deploying] > Initializing EC2 instance... SSL configured. CI/CD pipeline successful.";
      else if (cmd === "php artisan optimize") res = "[Success] > Configuration cache cleared. Routes cached. Backend running at optimal speed.";
      else res = `Command not found: ${cmd}`;

      setHistory([...history, { type: "cmd", text: `root@salmeen-server:~# ${cmd}` }, { type: "sys", text: res }]);
      setInput("");
    }
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden font-mono text-sm shadow-2xl">
      <div className="flex items-center px-4 py-2 bg-neutral-950 border-b border-neutral-800">
        <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-neutral-700"></div><div className="w-3 h-3 rounded-full bg-neutral-600"></div><div className="w-3 h-3 rounded-full bg-neutral-500"></div></div>
        <div className="mx-auto text-neutral-400 flex items-center gap-2"><TermIcon size={14}/> bash - AWS EC2</div>
      </div>
      <div className="p-4 h-64 overflow-y-auto text-start" dir="ltr">
        {history.map((h, i) => (
          <div key={i} className={`mb-2 ${h.type === "cmd" ? "text-neutral-300" : "text-neutral-500"}`}>{h.text}</div>
        ))}
        <div className="flex items-center text-neutral-300">
          <span className="mr-2">root@salmeen-server:~#</span>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} className="flex-1 bg-transparent outline-none" autoFocus />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}
