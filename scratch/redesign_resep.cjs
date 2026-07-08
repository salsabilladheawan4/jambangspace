const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/Admin/AdminResep.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Card Wrapper
content = content.replace(
    'className="bg-white border border-[#e8dfd4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"',
    'className="bg-white border border-transparent hover:border-[#f0eade] rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_40px_rgb(201,123,75,0.08)] transition-all duration-500 group flex flex-col"'
);

// 2. Card Header
const oldHeader = `<div className="h-32 bg-[#3d2817] relative overflow-hidden flex items-end p-5">
                <div className="absolute inset-0 bg-[#2a1a0f] opacity-50 group-hover:opacity-30 transition-opacity"></div>
                <div className="absolute top-4 right-4 bg-[#c97b4b] text-white px-3 py-1 rounded-full text-[10px] font-black shadow-md z-10">
                  ID: {menu.id}
                </div>
                <div className="relative z-10 w-full">
                  <p className="text-[9px] font-black text-[#c4b5a0] uppercase tracking-widest mb-1">{menu.category}</p>
                  <h3 className="text-xl font-bold text-white leading-tight">{menu.title}</h3>
                </div>
              </div>`;
              
const newHeader = `<div className="bg-[#faf8f6] group-hover:bg-[#faf6f1] relative flex flex-col p-6 border-b border-[#e8dfd4] transition-colors duration-500">
                <div className="absolute top-6 right-6 bg-white text-[#c97b4b] px-3 py-1.5 rounded-xl text-[10px] font-black shadow-sm z-10 border border-[#f0eade]">
                  ID: {menu.id}
                </div>
                <div className="w-10 h-10 rounded-full bg-white text-xl flex items-center justify-center shadow-sm mb-4 border border-[#e8dfd4]">
                  {menu.category.toLowerCase().includes('coffee') || menu.category.toLowerCase().includes('kopi') ? '☕' : menu.category.toLowerCase().includes('snack') || menu.category.toLowerCase().includes('dessert') ? '🥐' : '🍛'}
                </div>
                <div className="relative z-10 w-full">
                  <p className="text-[9px] font-black text-[#8b6f47] uppercase tracking-widest mb-1">{menu.category}</p>
                  <h3 className="text-xl font-black text-[#3d2817] leading-tight pr-12">{menu.title}</h3>
                </div>
              </div>`;

content = content.replace(oldHeader, newHeader);
// Fallback if formatting differs slightly
content = content.replace(/<div className="h-32 bg-\[#3d2817\][\s\S]*?<\/div>\s*<\/div>/, newHeader);

// 3. Button
content = content.replace(
    'className="w-full mt-6 py-3 border-2 border-[#e8dfd4] text-[#8b6f47] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#c97b4b] hover:text-white hover:border-[#c97b4b] transition-all"',
    'className="w-full mt-6 py-4 bg-[#faf8f6] text-[#8b6f47] rounded-xl text-xs font-black uppercase tracking-widest group-hover:bg-[#c97b4b] group-hover:text-white transition-all shadow-sm group-hover:shadow-lg"'
);

fs.writeFileSync(file, content);
console.log('AdminResep.jsx redesigned');
