const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/LandingPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Change Teams section to white background and remove mb-20
content = content.replace(
  '<section id="teams" className="py-24 bg-[#faf6f1]">\r\n        <div className="max-w-7xl mx-auto px-6">\r\n          <div className="grid md:grid-cols-3 gap-12 mb-20 items-center">',
  '<section id="teams" className="py-24 bg-white">\n        <div className="max-w-7xl mx-auto px-6">\n          <div className="grid md:grid-cols-3 gap-12 items-center">'
);
// Fallback for line endings:
content = content.replace(
  /<section id="teams" className="py-24 bg-\[#faf6f1\]">\s*<div className="max-w-7xl mx-auto px-6">\s*<div className="grid md:grid-cols-3 gap-12 mb-20 items-center">/g,
  '<section id="teams" className="py-24 bg-white">\n        <div className="max-w-7xl mx-auto px-6">\n          <div className="grid md:grid-cols-3 gap-12 items-center">'
);

// 2. Close the Teams section and open the Keunggulan Sistem section
const targetSplit = `          </div>\r
\r
          {/* Keunggulan Sistem - BENTO GRID MODERN */}`;
const targetSplit2 = `          </div>\n\n          {/* Keunggulan Sistem - BENTO GRID MODERN */}`;

const replaceSplit = `          </div>\n        </div>\n      </section>\n\n      {/* 6B. KEUNGGULAN SISTEM */}\n      <section id="system" className="py-24 bg-[#faf6f1]">\n        <div className="max-w-7xl mx-auto px-6">\n          {/* Keunggulan Sistem - BENTO GRID MODERN */}`;

if (content.includes(targetSplit)) {
  content = content.replace(targetSplit, replaceSplit);
} else if (content.includes(targetSplit2)) {
  content = content.replace(targetSplit2, replaceSplit);
} else {
  // Regex fallback
  content = content.replace(/          <\/div>\s*\{\/\* Keunggulan Sistem - BENTO GRID MODERN \*\/\}/, replaceSplit);
}

// 3. Remove mt-32 mb-10 from Keunggulan Sistem wrapper
content = content.replace(
  /className="mt-32 mb-10"\s*>/g,
  'className="w-full"\n          >'
);

fs.writeFileSync(file, content);
console.log('Done splitting sections');
