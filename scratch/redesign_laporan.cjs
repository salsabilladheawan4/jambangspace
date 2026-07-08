const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/Admin/AdminLaporan.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Container
content = content.replace(
    'className="bg-white border border-[#e8dfd4] shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-3xl overflow-hidden min-h-[400px]"',
    'className="bg-white border border-[#f0eade] shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[32px] overflow-hidden min-h-[400px] p-2 md:p-6"'
);

// 2. Thead padding
content = content.replace(/<th className="pb-4 px-4(.*?)">/g, '<th className="pb-4 pt-2 px-6$1">');

// 3. Tbody cells padding
content = content.replace(/<td className="py-5 px-4/g, '<td className="py-6 px-6');
content = content.replace(/<td className="py-5 px-4(.*?)">/g, '<td className="py-6 px-6$1">');

// 4. Hover rows
content = content.replace(/className="hover:bg-\[#faf6f1\] transition-colors group"/g, 'className="hover:bg-[#faf8f6] transition-colors group"');
content = content.replace(/className="hover:bg-\[#faf6f1\] transition-colors"/g, 'className="hover:bg-[#faf8f6] transition-colors group"');

fs.writeFileSync(file, content);
console.log('AdminLaporan.jsx redesigned');
