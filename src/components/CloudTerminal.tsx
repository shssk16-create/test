"use client";
import { useState, useEffect, useRef } from "react";

export default function CloudTerminal() {
  const [logs, setLogs] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // تصفير السجلات عند التركيب لمنع تراكم القيم الفارغة بسبب HMR
    setLogs([]);

    const sequence = [
      "ssh root@aws-ec2-production",
      "[OK] Authenticated via RSA Key. Ubuntu 22.04 LTS.",
      "salmeen@prod:~$ php artisan optimize",
      "[SUCCESS] Routes cached. Config cached. Performance optimized.",
      "salmeen@prod:~$ n8n start --tunnel",
      "[OK] n8n AI Workflow active. Webhooks listening on port 5678.",
      "salmeen@prod:~$ tail -f /var/log/nginx/access.log",
      "192.168.1.1 - 200 OK (0.02s) - 'GET /api/v1/rag-query'",
      "System stabilized. Golden Ratio Layout initiated."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        const currentLog = sequence[i];
        // التأكد من وجود النص قبل إضافته للمصفوفة
        if (currentLog) {
          setLogs(prev => [...prev, currentLog]);
        }
        i++;
      } else {
        clearInterval(interval);
      }
    }, 900);
    
    // تنظيف المؤقت عند إزالة المكون
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { 
    endRef.current?.scrollIntoView({ behavior: "smooth" }); 
  }, [logs]);

  return (
    <div className="w-full bg-[#111] border border-neutral-800 rounded-sm font-mono text-sm shadow-2xl" dir="ltr">
      <div className="flex items-center px-4 py-3 bg-[#0a0a0a] border-b border-neutral-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
          <div className="w-3 h-3 rounded-full bg-neutral-600"></div>
          <div className="w-3 h-3 rounded-full bg-neutral-500"></div>
        </div>
        <div className="mx-auto text-neutral-500 text-xs">aws-ec2-production — bash</div>
      </div>
      <div className="p-6 h-64 overflow-y-auto text-neutral-400 leading-relaxed text-start">
        {logs.map((log, idx) => {
          // درع الحماية: تجاوز العنصر إذا كان فارغاً لمنع خطأ undefined
          if (!log) return null;
          
          const isSuccess = log.includes('[SUCCESS]') || log.includes('[OK]');
          return (
            <div key={idx} className={isSuccess ? 'text-gold-muted font-bold' : ''}>
              {log}
            </div>
          );
        })}
        {logs.length >= 9 && (
          <div className="mt-2 flex gap-2 animate-pulse">
            <span>salmeen@prod:~$</span>
            <span className="w-2 h-4 bg-neutral-400 block"></span>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
