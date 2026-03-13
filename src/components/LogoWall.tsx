"use client";
import { motion } from "framer-motion";

const logos = [
  { n: "Aura", u: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png" },
  { n: "Masarat", u: "https://redp-sa.com/web/images/logo.svg" },
  { n: "Akam", u: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp" },
  { n: "Bathq", u: "https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp" },
  { n: "Asas", u: "https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp" },
  { n: "Darb", u: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png" },
];

export default function LogoWall() {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-slate-400 font-bold mb-12">الكيانات التي قدنا تحولها الرقمي</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-60">
          {logos.map((logo, i) => (
            <motion.div key={i} whileHover={{ opacity: 1, scale: 1.05 }} className="flex justify-center transition-all">
              <img src={logo.u} alt={logo.n} className="h-10 md:h-12 w-auto grayscale hover:grayscale-0 object-contain" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
