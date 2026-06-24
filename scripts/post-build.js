const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
const isAmalDeploy = process.env.NEXT_PUBLIC_OWNER === 'amal';

console.log("🛠️ Running post-build processor to correct static HTML titles...");

const htmlFilesToFix = [
  { file: 'amal.html', title: 'أمل هادي | أخصائية تقنية معلومات' },
  { file: 'amal/portfolio.html', title: 'أمل هادي | معرض الأعمال' },
  { file: 'amal/certificates.html', title: 'أمل هادي | الشهادات' },
  { file: 'portfolio.html', title: 'سالمين هادي | معرض الأعمال' },
  { file: 'certificates.html', title: 'سالمين هادي | الشهادات' }
];

htmlFilesToFix.forEach(({ file, title }) => {
  const filePath = path.join(outDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace the default title globally (in HTML title tag and Next.js hydration scripts)
    content = content.replace(/سالمين هادي \| AI Product Manager/g, title);
    // Double-ensure `<title>` tag is replaced
    content = content.replace(/<title>[^<]*<\/title>/g, `<title>${title}</title>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated title in ${file} to "${title}"`);
  }
});

if (isAmalDeploy) {
  console.log("🚀 Restructuring build output for Amal Hadi's dedicated domain...");
  
  const filesToCopy = [
    { src: 'amal.html', dest: 'index.html' },
    { src: 'amal.txt', dest: 'index.txt' },
    { src: 'amal/portfolio.html', dest: 'portfolio.html' },
    { src: 'amal/portfolio.txt', dest: 'portfolio.txt' },
    { src: 'amal/certificates.html', dest: 'certificates.html' },
    { src: 'amal/certificates.txt', dest: 'certificates.txt' },
  ];

  filesToCopy.forEach(({ src, dest }) => {
    const srcPath = path.join(outDir, src);
    const destPath = path.join(outDir, dest);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✅ Overwrote ${dest} with ${src}`);
    } else {
      console.warn(`⚠️ Source file ${src} not found!`);
    }
  });
  console.log("🎉 Dedicated build customization for Amal Hadi completed successfully!");
} else {
  console.log("ℹ️ Unified build selected. No static page restructuring needed.");
}

