"use client";
import { motion } from "framer-motion";

const logos = [
  { name: "Aura", url: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png" },
  { name: "Akam", url: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp" },
  { name: "Bathq", url: "https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp" },
  { name: "Asas", url: "https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp" },
  { name: "Darb", url: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png" },
];

export default function TrustedByMarquee() {
  // مضاعفة المصفوفة 4 مرات لضمان عدم انقطاع الشريط حتى في الشاشات فائقة العرض
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-12 bg-[#09090B] border-y border-stone-800 overflow-hidden relative" dir="ltr">
      <h3 className="text-xs md:text-sm font-bold tracking-widest text-stone-500 uppercase mb-8 text-center font-heading">
        ثقوا برؤيتنا الهندسية (Trusted By)
      </h3>
      
      {/* تدرجات لونية على الأطراف لظهور واختفاء الشعارات بنعومة */}
      <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-[#09090B] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-[#09090B] to-transparent z-10 pointer-events-none"></div>

      {/* حاوية الحركة اللانهائية */}
      <div className="marquee-container flex overflow-hidden">
        <div className="animate-marquee flex gap-16 md:gap-32 items-center pe-16 md:pe-32">
          {duplicatedLogos.map((logo, idx) => (
            <motion.div
              key={idx}
              className="relative shrink-0 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.15 }}
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                // الفلاتر الميتاليك الافتراضية، ثم فلاتر الإضاءة والتوهج القرمزي عند الـ Hover
                className="max-h-12 md:max-h-16 w-auto object-contain grayscale opacity-50 contrast-200 brightness-200 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:contrast-100 hover:brightness-100 hover:drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
