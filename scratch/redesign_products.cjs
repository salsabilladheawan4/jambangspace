const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/Products.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Outermost div
content = content.replace('className="p-4 md:p-10 font-instrument text-[#3d2817]"', 'className="p-4 md:p-10 font-instrument text-[#3d2817] bg-[#faf8f6] min-h-screen"');

// 2. Form container
content = content.replace('className="bg-white p-8 rounded-[24px] border border-[#e8dfd4] shadow-sm h-fit"', 'className="bg-white p-8 rounded-[32px] border border-transparent hover:border-[#f0eade] shadow-[0_8px_30px_rgb(0,0,0,0.03)] h-fit transition-all"');

// Form title
content = content.replace('className="text-xl font-bold mb-6 text-[#c97b4b]"', 'className="text-xl font-black mb-6 text-[#3d2817] flex items-center gap-2"');
content = content.replace('>+ Tambah Menu Baru</h2>', '><span className="w-8 h-8 rounded-full bg-[#faf6f1] text-[#c97b4b] flex items-center justify-center text-lg">+</span> Tambah Menu</h2>');

// Form button
content = content.replace('className="bg-[#3d2817] text-white p-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#c97b4b] transition-all"', 'className="bg-[#3d2817] mt-2 text-white p-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#c97b4b] hover:shadow-lg transition-all"');

// 3. Table Wrapper
content = content.replace('className="bg-white overflow-hidden rounded-2xl shadow-sm border border-[#e8dfd4]"', 'className="bg-white overflow-hidden rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#f0eade] p-2 md:p-6"');

// 4. Table Header
content = content.replace('<thead className="bg-[#3d2817] text-white text-left text-xs font-semibold uppercase tracking-wider">', '<thead>\n                                <tr className="text-[#a89b8d] text-[10px] font-black uppercase tracking-widest border-b border-[#e8dfd4]">');
content = content.replace(/<th className="px-6 py-4">Name<\/th>/g, '<th className="pb-4 pt-2 px-6">Nama Menu</th>');
content = content.replace(/<th className="px-6 py-4">Category<\/th>/g, '<th className="pb-4 pt-2 px-6">Kategori</th>');
content = content.replace(/<th className="px-6 py-4">Price<\/th>/g, '<th className="pb-4 pt-2 px-6">Harga</th>');

// Remove extra <tr> from original thead if any (we replaced <thead... with <thead>\n<tr>, so we must remove the next <tr>)
content = content.replace(/<thead>\n\s*<tr[^>]*>\n\s*<tr>/g, '<thead>\n                                <tr className="text-[#a89b8d] text-[10px] font-black uppercase tracking-widest border-b border-[#e8dfd4]">');

// 5. Table Body Rows
content = content.replace(/<td className="px-6 py-4 font-bold">{item\.title}<\/td>/g, '<td className="px-6 py-5 font-bold text-sm">{item.title}</td>');

// Format Category as a pill badge
const categoryOld = '<td className="px-6 py-4 text-[#6b5344]">{item.category}</td>';
const categoryNew = '<td className="px-6 py-5"><span className="bg-[#faf6f1] text-[#8b6f47] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest">{item.category}</span></td>';
content = content.replace(categoryOld, categoryNew);

// Format Price
const priceOld = '<td className="px-6 py-4 font-bold text-[#c97b4b]">';
const priceNew = '<td className="px-6 py-5 font-black text-[#c97b4b]">';
content = content.replace(priceOld, priceNew);

// Adjust divide-y for tbody
content = content.replace('className="divide-y divide-[#e8dfd4]"', 'className="divide-y divide-[#faf6f1]"');

// Adjust hover
content = content.replace('className="hover:bg-[#faf6f1] transition-colors"', 'className="hover:bg-[#faf8f6] transition-colors group"');


fs.writeFileSync(file, content);
console.log('Products.jsx redesigned');
