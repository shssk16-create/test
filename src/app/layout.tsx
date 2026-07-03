import "./globals.css";
import { Scheherazade_New, IBM_Plex_Sans_Arabic, DM_Mono } from 'next/font/google';

const scheherazade = Scheherazade_New({ 
  subsets: ['arabic'], 
  weight: ['400', '700'], 
  variable: '--font-scheherazade' 
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({ 
  subsets: ['arabic'], 
  weight: ['400', '500', '700'], 
  variable: '--font-ibm-plex-sans-arabic' 
});

const dmMono = DM_Mono({ 
  subsets: ['latin'], 
  weight: ['400', '500'], 
  variable: '--font-dm-mono' 
});

export const metadata = { 
  title: "سالمين هادي | AI Product Manager",
  description: "مطوّر Full-Stack وصاحب أورا للتسويق الرقمي في مكة المكرمة. أدمج الذكاء الاصطناعي مع التطوير لبناء منتجات عربية حقيقية."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="ar" 
      dir="rtl" 
      className={`${scheherazade.variable} ${ibmPlexSansArabic.variable} ${dmMono.variable}`}
    >
      <body className="antialiased bg-[#0D0D0D] text-[#EDE8DC] selection:bg-[#C8A96E] selection:text-[#0D0D0D] overflow-x-hidden min-h-[100dvh]">
        {children}
      </body>
    </html>
  );
}
