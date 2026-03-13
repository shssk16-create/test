"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronRight, Sparkles, ZoomIn, X } from "lucide-react";
import Link from "next/link";

export default function CertificatesStudio() {
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => { setTimeout(() => setLoading(false), 1500); }, []);

  const certs = [
    "http://t8ne.space/wp-content/uploads/2026/03/1761323074618.webp",
    "http://t8ne.space/wp-content/uploads/2026/03/1748694369861.webp",
    "http://t8ne.space/wp-content/uploads/2026/03/1742330177160.webp",
    "http://t8ne.space/wp-content/uploads/2026/03/1744763478103.webp",
    "http://t8ne.space/wp-content/uploads/2026/03/1739189774385.webp",
    "http://t8ne.space/wp-content/uploads/2026/03/1741152507855.webp"
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;900&display=swap');
        .font-alexandria { font-family: 'Alexandria', sans-serif; }
      `}} />

      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0, y: -50 }} className="fixed inset-0 z-[100] bg-[#15110E] flex items-center justify-center text-[#A1824A] text-4xl font-black tracking-widest font-alexandria" dir="ltr">
            Studio.
          </motion.div>
        )}
      </AnimatePresence>
      <main className="min-h-screen bg-[#15110E] text-white selection:bg-[#A1824A] selection:text-white font-alexandria overflow-x-hidden relative" dir="rtl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(161,130,74,0.12)_0%,transparent_60%)]"></div>

        {/* Navbar */}
        <nav className="relative z-50 w-full h-24 flex items-center px-6 lg:px-12 border-b border-white/10 bg-[#15110E]/50 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group hover:text-[#A1824A] transition-colors">
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              <span className="font-bold text-sm">العودة للرئيسية</span>
            </Link>
            <div className="flex items-center gap-2">
              <Award className="text-[#A1824A]" size={24} />
              <span className="font-black text-xl tracking-widest">الشهادات<span className="text-[#A1824A]">.</span></span>
            </div>
          </div>
        </nav>

        <section className="relative z-10 px-6 pt-20 pb-32 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 rounded-full border border-white/10 mb-6 backdrop-blur-md">
              <Sparkles size={14} className="text-[#A1824A]" />
              <span className="text-xs font-bold text-stone-300 tracking-widest">توثيق الإنجازات</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">المعرض <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#A1824A]">الأكاديمي</span></h1>
            <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">استعراض لأبرز الشهادات والاعتمادات التي تعكس الالتزام بالتطور المستمر في مجالات الذكاء الاصطناعي، البرمجة، وتجربة المستخدم.</p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {certs.map((url, idx) => (
              <motion.div 
                key={idx} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -10 }}
                onClick={() => setSelectedImg(url)}
                className="group relative rounded-[2rem] p-4 bg-white/5 border border-white/10 cursor-pointer overflow-hidden backdrop-blur-sm shadow-2xl hover:shadow-[0_20px_50px_-10px_rgba(161,130,74,0.2)] hover:border-[#A1824A]/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#15110E] via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500 z-10"></div>
                <div className="w-full h-64 md:h-72 relative rounded-[1.5rem] overflow-hidden">
                  <img src={url} alt={`Certificate ${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center gap-2 bg-[#A1824A] text-white px-6 py-3 rounded-full font-bold text-xs shadow-lg">
                    <ZoomIn size={16} /> تكبير الشهادة
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        {/* Lightbox Animation for Zooming Certificates */}
        <AnimatePresence>
          {selectedImg && (
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
              animate={{ opacity: 1, backdropFilter: "blur(20px)" }} 
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10 bg-[#15110E]/80"
              onClick={() => setSelectedImg(null)}
            >
              <button className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/10 hover:bg-[#A1824A] rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md border border-white/20 z-50">
                <X size={24} />
              </button>
              <motion.img 
                initial={{ scale: 0.8, opacity: 0, y: 50 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.8, opacity: 0, y: 50 }} 
                transition={{ type: "spring", bounce: 0.3 }}
                src={selectedImg} alt="Certificate Zoom" 
                className="max-w-full max-h-[90vh] rounded-2xl md:rounded-[2rem] shadow-[0_0_100px_rgba(161,130,74,0.3)] border border-[#A1824A]/30 object-contain relative z-40" 
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </>
  );
}
