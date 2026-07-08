const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/Staff/StaffKasir.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. MenuCard Wrapper
content = content.replace(
    'className="bg-white p-5 rounded-[24px] shadow-sm border border-[#e8dfd4] flex flex-col justify-between"',
    'className="bg-white p-5 rounded-[32px] border border-transparent hover:border-[#f0eade] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_40px_rgb(201,123,75,0.08)] transition-all duration-300 flex flex-col justify-between group"'
);

// 2. Add to bills button
content = content.replace(
    'className="w-full mt-2 py-3 bg-[#e8dfd4]/40 hover:bg-[#3d2817] text-[#3d2817] hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm"',
    'className="w-full mt-4 py-3 bg-[#faf6f1] group-hover:bg-[#3d2817] text-[#3d2817] group-hover:text-white rounded-[16px] text-sm font-black uppercase tracking-widest transition-all duration-300 shadow-sm"'
);

// 3. Category Buttons
content = content.replace(
    'className={`flex flex-col items-center justify-center p-4 md:p-5 rounded-[20px] border-2 min-w-[90px] transition-all duration-300 ${',
    'className={`flex flex-col items-center justify-center p-4 md:p-5 rounded-[24px] border-2 min-w-[90px] transition-all duration-300 ${'
);

// 4. Sidebar Keranjang Container
// from: <aside className="w-[380px] bg-white border-l border-[#e8dfd4] flex flex-col flex-shrink-0 z-20 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)]">
// to: floating
content = content.replace(
    '<aside className="w-[380px] bg-white border-l border-[#e8dfd4] flex flex-col flex-shrink-0 z-20 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)]">',
    '<aside className="w-[380px] bg-white rounded-l-[40px] flex flex-col flex-shrink-0 z-20 shadow-[-15px_0_40px_-5px_rgba(0,0,0,0.05)] border-l border-y border-transparent relative overflow-hidden">'
);

// 5. Keranjang Profile Header
content = content.replace(
    'className="p-6 border-b border-[#e8dfd4] flex justify-between items-center bg-white"',
    'className="p-8 border-b border-[#faf6f1] flex justify-between items-center bg-white"'
);

// 6. Cetak Struk Button
content = content.replace(
    'className="w-full bg-[#3d2817] text-white py-4 rounded-2xl font-bold hover:bg-[#c97b4b] transition-all shadow-md text-sm"',
    'className="w-full bg-[#3d2817] text-white py-4 rounded-[20px] font-black uppercase tracking-widest hover:bg-[#c97b4b] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-sm"'
);


fs.writeFileSync(file, content);
console.log('StaffKasir.jsx redesigned');
