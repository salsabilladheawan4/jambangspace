const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/LandingPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove states
content = content.replace(/const \[featuredMenu, setFeaturedMenu\] = useState\(\[\]\);\r?\n/g, '');
content = content.replace(/const \[loadingMenu, setLoadingMenu\] = useState\(true\);\r?\n/g, '');

// 2. Remove menu data fetching
const fetchRegex = /\s*\/\/\s*Ambil 6 Menu dari database[\s\S]*?setLoadingMenu\(false\);\r?\n/;
content = content.replace(fetchRegex, '');

// 3. Remove gambarPastry and pourOverImg
content = content.replace(/const gambarPastry = "[^"]+";\r?\n\s*/g, '');
content = content.replace(/const pourOverImg = "[^"]+";\r?\n\s*/g, '');

// 4. Remove steps
const stepsRegex = /\s*const steps = \[[\s\S]*?\];\r?\n/;
content = content.replace(stepsRegex, '');

// 5. Remove JSX sections (3, 4, 5)
// We will look for {/* 3. MENU DINAMIS */} up to {/* 6. TIM HEBAT & KEUNGGULAN SISTEM */}
const jsxRegex = /\s*\{\/\*\s*3\.\s*MENU DINAMIS\s*\*\/\}[\s\S]*?(?=\s*\{\/\*\s*6\.\s*TIM HEBAT & KEUNGGULAN SISTEM\s*\*\/\})/;
content = content.replace(jsxRegex, '\n\n');

// 6. Update CTA link
// Change "LIHAT MENU KAMI" to point to #features or remove it.
content = content.replace(/<a href="#menu"[^>]*>([\s\S]*?)<\/a>/, '<a href="#features" className="bg-[#c97b4b] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[#b8683f] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">LIHAT KEUNGGULAN KAMI &rarr;</a>');

fs.writeFileSync(file, content);
console.log('Script done');
