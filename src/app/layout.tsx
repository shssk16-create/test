import "./globals.css";
import { Tajawal } from 'next/font/google';

const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '500', '700'], variable: '--font-tajawal' });

export const metadata = { title: "سالمين هادي | AI Product Manager" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable}`}>
      <body className="antialiased font-body bg-stone-50 text-stone-900 selection:bg-rose-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}
