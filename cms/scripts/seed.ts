import { execSync } from 'child_process';
import fs from 'fs';
import path from 'url';
import { fileURLToPath } from 'url';
import pathNode from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathNode.dirname(__filename);

const projects = [
  {
    id: "hala-ai-uuid",
    title_ar: "هلا AI — منصة توليد محتوى تسويقي بلهجة سعودية",
    title_en: "Hala AI — Saudi dialect marketing content generation platform",
    subtitle_ar: "منصة سحابية متكاملة لإنتاج المحتوى التسويقي بلهجة بيضاء",
    subtitle_en: "SaaS White-Dialect Content Generator",
    accentColor: "#58A8B4",
    thumbIcon: "Sparkles",
    problem_ar: "كان تجار التجارة الإلكترونية السعوديون على سلة وزد يكتبون المحتوى العربي يدويًا دون أدوات ذكاء اصطناعي تفهم اللهجات المحلية.",
    problem_en: "Saudi e-commerce merchants on Salla and Zid wrote all Arabic content manually with no dialect-aware AI tool.",
    decision_ar: "تصميم وبناء نظام SaaS سحابي متكامل باستخدام نموذج ALLaM-2 لتوليد اللهجة السعودية البيضاء وربطه مع تطبيق واتساب للأعمال.",
    decision_en: "Designed and built a Cloudflare-native middleware SaaS using ALLaM-2 for Saudi white-dialect generation and WhatsApp Business API for merchant delivery.",
    result_ar: "تسليم بنية إنتاجية كاملة جاهزة للعمل — الحوسبة السحابية الطرفية وقاعدة البيانات D1 ومخزن R2 والقطع البرمجية الدائمة وقبول التطبيق في متجر سلة.",
    result_en: "Full production architecture delivered — Workers, D1, R2, Durable Objects, Salla app submission-ready.",
    stack: JSON.stringify(["Cloudflare Workers", "D1", "ALLaM-2", "Hono.js"]),
    year: "2024",
    featured: 1,
    logo: "",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    link: "https://salla.sa"
  },
  {
    id: "aura-marketing-uuid",
    title_ar: "أورا للتسويق — وكالة تسويق رقمي متكاملة",
    title_en: "Aura Marketing — Full-Service Digital Agency",
    subtitle_ar: "وكالة تسويق رقمي متكاملة الخدمات",
    subtitle_en: "Full-Service Digital Marketing Agency",
    accentColor: "#438FB3",
    thumbIcon: "Globe",
    problem_ar: "تفتقر الشركات الصغيرة والمتوسطة في المنطقة الغربية بالمملكة العربية السعودية إلى حلول تسويقية رقمية احترافية وبأسعار مناسبة.",
    problem_en: "SMBs in Saudi Arabia's Western Region lacked affordable, professional digital presence.",
    decision_ar: "تأسيس وتشغيل وكالة تسويق رقمي متكاملة تجمع بين هندسة اللغويات العربية والتطوير البرمجي الشامل للمنصات الرقمية.",
    decision_en: "Founded and operated a full-service digital agency combining Arabic linguistics expertise with full-stack development.",
    result_ar: "أكثر من 15 عميلًا نشطًا بما في ذلك أساس القابضة ومحطات درب، والعمل مستمر بنجاح منذ عام 2020.",
    result_en: "15+ active clients including Asas Holding and Darb Stations, operating since 2020.",
    stack: JSON.stringify(["Next.js", "Laravel", "SEO", "Schema Markup"]),
    year: "2020",
    featured: 0,
    logo: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    link: "https://aurateam3.com"
  },
  {
    id: "aura-ai-studio-uuid",
    title_ar: "أورا AI استوديو — منصة أدوات الذكاء الاصطناعي المغلقة",
    title_en: "Aura AI Studio — Multi-Agent Closed-Beta SaaS",
    subtitle_ar: "منصة متعددة الوكلاء في مرحلة البيتا المغلقة",
    subtitle_en: "Multi-Agent Closed-Beta SaaS",
    accentColor: "#3C3489",
    thumbIcon: "Cpu",
    problem_ar: "احتاج فريق الوكالة المكون من 50 عضوًا إلى أدوات ذكاء اصطناعي مخصصة لسير العمل التسويقي دون توفر حلول تجارية جاهزة ومناسبة.",
    problem_en: "A 50-member agency cohort needed specialized AI tools for marketing workflows with no suitable off-the-shelf solution.",
    decision_ar: "بناء منصة بيتا مغلقة تعتمد على معمارية متعددة الوكلاء الذكية على بنية NVIDIA NIM مع توزيع النماذج ديناميكيًا حسب الدور وصلاحيات الوصول.",
    decision_en: "Architected an 8-agent closed-beta SaaS on NVIDIA NIM with role-based access and per-agent model routing.",
    result_ar: "إطلاق ناجح للنسخة التجريبية المغلقة — باستخدام Next.js 15 وقاعدة بيانات Supabase وتقنيات Cloudflare ونموذج Llama 3.3 70B.",
    result_en: "Successful closed beta — Next.js 15, Supabase, Cloudflare Pages, Llama 3.3 70B.",
    stack: JSON.stringify(["Next.js 15", "Supabase", "NVIDIA NIM", "Cloudflare"]),
    year: "2024",
    featured: 0,
    logo: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    link: "https://aurateam3.com"
  },
  {
    id: "marketing-automation-uuid",
    title_ar: "أتمتة العمليات التسويقية — محركات ونصوص ونماذج ذكية",
    title_en: "Marketing Automation — Automated Content Pipelines",
    subtitle_ar: "أتمتة خطوط إنتاج وتوزيع المحتوى",
    subtitle_en: "Automated Content Pipelines",
    accentColor: "#633806",
    thumbIcon: "Workflow",
    problem_ar: "كان فريق الوكالة يقضي ساعات طويلة يدويًا في إنتاج وجدولة المحتوى لعشرات الحسابات أسبوعيًا.",
    problem_en: "Agency team spent hours manually producing and scheduling content for dozens of clients every week.",
    decision_ar: "تطوير مسارات أتمتة عبر منصة n8n تربط نماذج Groq وGemini وDeepSeek مع إرسال الإشعارات عبر Telegram Bot والتتبع في Google Sheets.",
    decision_en: "Built multi-model n8n workflows chaining Groq, Gemini, and DeepSeek with Telegram Bot delivery and Google Sheets tracking.",
    result_ar: "تقليل الوقت المستغرق in إنتاج وتجهيز المحتوى بنسبة 70% لجميع حسابات العملاء النشطة.",
    result_en: "Reduced content production time by 70% across all active client accounts.",
    stack: JSON.stringify(["n8n", "Groq", "Gemini", "Telegram Bot"]),
    year: "2023",
    featured: 0,
    logo: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    link: "https://darbstations.com.sa"
  }
];

const certificates = [
  {
    id: "cert-primary",
    name_ar: "وثيقة التخرج الأساسية في تقنية البرمجيات",
    name_en: "Primary Graduate Diploma in Software Technology",
    issuer_ar: "الكلية التقنية",
    issuer_en: "Technical College",
    date: "2026-03-01",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/وثائق-التخرج-طلاب-الكلية-46-_page-0001.webp",
    featured: 1,
    skills: ["Software Engineering", "Cloud Computing", "Web Architecture", "Databases", "Distributed Systems"],
    description_ar: "تم الحصول على هذه الدرجة العلمية في تخصص تقنية البرمجيات وأنظمة الويب المتكاملة مع التركيز على بناء البنى السحابية وتكامل الأنظمة وريادة الأعمال الرقمية.",
    description_en: "Graduated with honors in Software Engineering, focusing on distributed systems architecture, cloud computing paradigms, and microservices design patterns.",
    degree_level_ar: "المستوى التعليمي: بكالوريوس / Diploma",
    degree_level_en: "Degree Level: Higher Software Diploma",
    owner: "salmeen"
  },
  {
    id: "cert-coursera-1",
    name_ar: "أخصائي أنظمة الذكاء الاصطناعي التوليدي",
    name_en: "Generative AI Systems Specialist",
    issuer_ar: "كورسيرا",
    issuer_en: "Coursera",
    date: "2026-03-02",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/Coursera-H3AKC1QMLIRA_page-0001.webp",
    featured: 0,
    skills: ["Generative AI", "LLM Alignment", "AI Agents"],
    owner: "salmeen"
  },
  {
    id: "cert-coursera-2",
    name_ar: "أسس البنية التحتية للحوسبة السحابية",
    name_en: "Cloud Architecture Foundations",
    issuer_ar: "كورسيرا",
    issuer_en: "Coursera",
    date: "2026-03-03",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/Coursera-FDBD5M3X44NP_page-0001.webp",
    featured: 0,
    skills: ["Cloud Architecture", "AWS", "Infrastructure"],
    owner: "salmeen"
  },
  {
    id: "cert-coursera-3",
    name_ar: "أوركسترا وكلاء الذكاء الاصطناعي للمؤسسات",
    name_en: "Enterprise Multi-Agent Orchestration",
    issuer_ar: "كورسيرا",
    issuer_en: "Coursera",
    date: "2026-03-04",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/Coursera-BN5Z65E8BW06_page-0001-1.webp",
    featured: 0,
    skills: ["Multi-Agent", "LangGraph", "Orchestration"],
    owner: "salmeen"
  },
  {
    id: "cert-agent-explorer",
    name_ar: "شهادة مستكشف وكلاء الذكاء الاصطناعي",
    name_en: "AI Agent Explorer Certification",
    issuer_ar: "منظمة مستكشف الوكلاء",
    issuer_en: "Agent Explorer Org",
    date: "2026-03-05",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/certificate-agent-explorer_page-0001.webp",
    featured: 0,
    skills: ["AI Agents", "Automations", "Python"],
    owner: "salmeen"
  },
  {
    id: "cert-mpdf-4",
    name_ar: "مهندس نظم الميكروفرونت إند",
    name_en: "Micro-Frontend Systems Engineer",
    issuer_ar: "مجموعة mpdf الهندسية",
    issuer_en: "Mpdf Engineering Group",
    date: "2026-03-06",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/mpdf-4_page-0001-1.webp",
    featured: 0,
    skills: ["Micro-Frontends", "Module Federation", "React"],
    owner: "salmeen"
  },
  {
    id: "cert-other-1",
    name_ar: "شهادة النشر السحابي المتقدم",
    name_en: "Advanced Cloud Deployments Certificate",
    issuer_ar: "الشركاء الأكاديميون والتقنيون",
    issuer_en: "Academic & Tech Partners",
    date: "2026-03-07",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/1761323074618.webp",
    featured: 0,
    skills: ["Cloud Deployments", "CI/CD", "Docker"],
    owner: "salmeen"
  },
  {
    id: "cert-other-2",
    name_ar: "أخصائي بنية تحتية لـ NVIDIA NIM",
    name_en: "NVIDIA NIM Infrastructure Specialist",
    issuer_ar: "شريك بيتا لـ NVIDIA NIM",
    issuer_en: "NVIDIA NIM Beta Partner",
    date: "2026-03-08",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/1748694369861.webp",
    featured: 0,
    skills: ["NVIDIA NIM", "GPU Inference", "Docker"],
    owner: "salmeen"
  },
  {
    id: "cert-other-3",
    name_ar: "الدرجة الأساسية في التعلم العميق",
    name_en: "Deep Learning Foundations Degree",
    issuer_ar: "الشركاء الأكاديميون والتقنيون",
    issuer_en: "Academic & Tech Partners",
    date: "2026-03-09",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/1739189774385.webp",
    featured: 0,
    skills: ["Deep Learning", "PyTorch", "Neural Networks"],
    owner: "salmeen"
  },
  {
    id: "cert-other-4",
    name_ar: "شهادة محاذاة نماذج اللغة الكبيرة للّكنات المحلية",
    name_en: "Saudi Dialect LLM Alignment Certification",
    issuer_ar: "مجموعة أبحاث علام",
    issuer_en: "ALLaM Research Cohort",
    date: "2026-03-10",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/1741152507855.webp",
    featured: 0,
    skills: ["LLM Alignment", "Arabic NLP", "Fine-Tuning"],
    owner: "salmeen"
  },
  {
    id: "cert-other-5",
    name_ar: "مهندس عمليات قواعد البيانات غير الخادمة",
    name_en: "Serverless Database Operations Architect",
    issuer_ar: "مجموعة شركاء Cloudflare D1",
    issuer_en: "Cloudflare D1 Partner Group",
    date: "2026-03-11",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/1742330177160.webp",
    featured: 0,
    skills: ["Cloudflare D1", "Serverless DB", "Wrangler"],
    owner: "salmeen"
  },
  {
    id: "cert-other-6",
    name_ar: "أخصائي البرمجيات الوسيطة عبر Hono.js",
    name_en: "Hono.js Cloud Middleware Specialist",
    issuer_ar: "تحالف البرمجيات الوسيطة التقنية",
    issuer_en: "Technical Middleware Alliance",
    date: "2026-03-12",
    credential_url: "",
    image: "https://aurateam3.com/wp-content/uploads/2026/03/1744763478103.webp",
    featured: 0,
    skills: ["Hono.js", "Edge Middleware", "Cloudflare Workers"],
    owner: "salmeen"
  },
  {
    id: "cert-primary-amal",
    name_ar: "شهادة تخرج برمجيات",
    name_en: "Software Graduation Certificate",
    issuer_ar: "الجامعة الوطنية",
    issuer_en: "National University",
    date: "2026-06-01",
    credential_url: "",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    featured: 1,
    skills: ["Software Engineering", "Cloud Computing", "Web Architecture", "Databases", "Distributed Systems"],
    description_ar: "تم الحصول على هذه الدرجة العلمية في تخصص تقنية البرمجيات وأنظمة الويب المتكاملة مع التركيز على بناء البنى السحابية وتكامل الأنظمة وريادة الأعمال الرقمية.",
    description_en: "Graduated with honors in Software Engineering, focusing on distributed systems architecture, cloud computing paradigms, and microservices design patterns.",
    degree_level_ar: "المستوى التعليمي: بكالوريوس / Diploma",
    degree_level_en: "Degree Level: Higher Software Diploma",
    owner: "amal"
  }
];

const heroes = [
  {
    id: "hero-salmeen-uuid",
    name_ar: "سالمين هادي.",
    name_en: "Salmeen Hadi.",
    title_ar: "مدير منتجات ذكاء اصطناعي",
    title_en: "AI Product Manager",
    subtitle_ar: "أبني منصات رقمية متكاملة. يمكنك تصفح معرض أعمالي من الأعلى، أو التحدث مباشرة مع مساعدي الذكي ليجيب على كافة استفساراتك حول خبراتي وتقنياتي.",
    subtitle_en: "Building comprehensive digital platforms. Explore my portfolio from the menu above or chat with my custom-built AI assistant for any inquiries.",
    whatsapp_number: "966503026795"
  }
];

const logos = [
  {
    id: "logo-1",
    name: "Aura Marketing",
    imageUrl: "https://aurateam3.com/wp-content/uploads/2024/02/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-%D8%A3%D9%88%D8%B1%D8%A7-02-2.png",
    sort_order: "1"
  },
  {
    id: "logo-2",
    name: "Asas Holding",
    imageUrl: "https://floralwhite-dove-225940.hostingersite.com/wp-content/uploads/2025/12/%D8%A3%D8%B3%D8%A7%D8%B3-1.webp",
    sort_order: "2"
  },
  {
    id: "logo-3",
    name: "Akam Contracting",
    imageUrl: "https://akamcont.sa/wp-content/uploads/2025/11/cropped-1000034239.webp",
    sort_order: "3"
  },
  {
    id: "logo-4",
    name: "Redp SA",
    imageUrl: "https://redp-sa.com/web/images/logo.svg",
    sort_order: "4"
  },
  {
    id: "logo-5",
    name: "Bathq SA",
    imageUrl: "https://bathq.sa/wp-content/uploads/2025/11/1000033762.webp",
    sort_order: "5"
  },
  {
    id: "logo-6",
    name: "Darb Stations",
    imageUrl: "https://darbstations.com.sa/wp-content/uploads/2024/12/1221-copy-3.png",
    sort_order: "6"
  }
];

const sqlStatements: string[] = [];

// Projects SQL
for (const p of projects) {
  const sql = `INSERT OR REPLACE INTO projects (id, title_ar, title_en, subtitle_ar, subtitle_en, accentColor, thumbIcon, problem_ar, problem_en, decision_ar, decision_en, result_ar, result_en, stack, year, featured, logo, image, link) VALUES (
    '${p.id}',
    '${p.title_ar.replace(/'/g, "''")}',
    '${p.title_en.replace(/'/g, "''")}',
    '${p.subtitle_ar.replace(/'/g, "''")}',
    '${p.subtitle_en.replace(/'/g, "''")}',
    '${p.accentColor}',
    '${p.thumbIcon}',
    '${p.problem_ar.replace(/'/g, "''")}',
    '${p.problem_en.replace(/'/g, "''")}',
    '${p.decision_ar.replace(/'/g, "''")}',
    '${p.decision_en.replace(/'/g, "''")}',
    '${p.result_ar.replace(/'/g, "''")}',
    '${p.result_en.replace(/'/g, "''")}',
    '${p.stack.replace(/'/g, "''")}',
    '${p.year}',
    ${p.featured},
    '${p.logo}',
    '${p.image}',
    '${p.link}'
  );`;
  sqlStatements.push(sql);
}

// Certificates SQL
for (const c of certificates) {
  const skillsVal = c.skills ? `'${JSON.stringify(c.skills).replace(/'/g, "''")}'` : 'NULL';
  const ownerVal = c.owner ? `'${c.owner}'` : `'salmeen'`;
  const descArVal = c.description_ar ? `'${c.description_ar.replace(/'/g, "''")}'` : 'NULL';
  const descEnVal = c.description_en ? `'${c.description_en.replace(/'/g, "''")}'` : 'NULL';
  const degArVal = c.degree_level_ar ? `'${c.degree_level_ar.replace(/'/g, "''")}'` : 'NULL';
  const degEnVal = c.degree_level_en ? `'${c.degree_level_en.replace(/'/g, "''")}'` : 'NULL';

  const sql = `INSERT OR REPLACE INTO certificates (id, name_ar, name_en, issuer_ar, issuer_en, date, credential_url, image, featured, skills, owner, description_ar, description_en, degree_level_ar, degree_level_en) VALUES (
    '${c.id}',
    '${c.name_ar.replace(/'/g, "''")}',
    '${c.name_en.replace(/'/g, "''")}',
    '${c.issuer_ar.replace(/'/g, "''")}',
    '${c.issuer_en.replace(/'/g, "''")}',
    '${c.date}',
    '${c.credential_url}',
    '${c.image}',
    ${c.featured},
    ${skillsVal},
    ${ownerVal},
    ${descArVal},
    ${descEnVal},
    ${degArVal},
    ${degEnVal}
  );`;
  sqlStatements.push(sql);
}

// Heroes SQL
for (const h of heroes) {
  const sql = `INSERT OR REPLACE INTO heroes (id, name_ar, name_en, title_ar, title_en, subtitle_ar, subtitle_en, whatsapp_number) VALUES (
    '${h.id}',
    '${h.name_ar.replace(/'/g, "''")}',
    '${h.name_en.replace(/'/g, "''")}',
    '${h.title_ar.replace(/'/g, "''")}',
    '${h.title_en.replace(/'/g, "''")}',
    '${h.subtitle_ar.replace(/'/g, "''")}',
    '${h.subtitle_en.replace(/'/g, "''")}',
    '${h.whatsapp_number}'
  );`;
  sqlStatements.push(sql);
}

// Logos SQL
for (const l of logos) {
  const sql = `INSERT OR REPLACE INTO logos (id, name, imageUrl, sort_order) VALUES (
    '${l.id}',
    '${l.name.replace(/'/g, "''")}',
    '${l.imageUrl}',
    '${l.sort_order}'
  );`;
  sqlStatements.push(sql);
}

const sqlContent = sqlStatements.join('\n\n');
const tempSqlPath = pathNode.join(__dirname, 'seed.sql');

try {
  // Write statements to temp sql file
  fs.writeFileSync(tempSqlPath, sqlContent, 'utf8');
  console.log('Seeding local D1 database via temporary file...');
  
  // Run wrangler using the file path
  execSync(`npx wrangler d1 execute cms-db --local --file=scripts/seed.sql`, {
    cwd: pathNode.join(__dirname, '..'),
    stdio: 'inherit'
  });
  
  console.log('✅ Local D1 database seeded successfully!');
} catch (err: any) {
  console.error('Failed to seed D1 database:', err.message);
} finally {
  // Clean up
  if (fs.existsSync(tempSqlPath)) {
    fs.unlinkSync(tempSqlPath);
  }
}
