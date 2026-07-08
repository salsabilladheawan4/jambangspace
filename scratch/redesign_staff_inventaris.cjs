const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/Staff/StaffInventaris.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Form Container
content = content.replace(
    'className="w-full lg:w-[400px] bg-white p-8 rounded-[32px] border border-[#e8dfd4] shadow-lg flex flex-col"',
    'className="w-full lg:w-[400px] bg-white p-8 rounded-[32px] border border-transparent hover:border-[#f0eade] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_40px_rgb(201,123,75,0.08)] transition-all duration-500 flex flex-col"'
);

// 2. Submit Button
content = content.replace(
    'className="w-full bg-[#3d2817] text-white p-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#c97b4b] transition-all mt-6 shadow-md"',
    'className="w-full bg-[#3d2817] text-white p-4 rounded-[16px] text-xs font-black uppercase tracking-widest hover:bg-[#c97b4b] transition-all duration-300 mt-6 shadow-md hover:shadow-xl hover:-translate-y-1"'
);

// 3. Table Container Header
content = content.replace(
    'className="flex-1 bg-white rounded-[32px] shadow-lg border border-[#e8dfd4] flex flex-col overflow-hidden"',
    'className="flex-1 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-[#f0eade] flex flex-col overflow-hidden p-2 md:p-6"'
);
content = content.replace(
    'className="p-8 border-b border-[#e8dfd4] bg-[#faf6f1]"',
    'className="p-6 md:px-8 border-b border-transparent bg-white"'
);

// 4. Table thead
const oldThead = `<thead className="bg-white sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="p-6 text-xs uppercase font-black tracking-widest text-[#a89b8d]">Nama Barang</th>
                <th className="p-6 text-xs uppercase font-black tracking-widest text-[#a89b8d]">Stok</th>
                <th className="p-6 text-xs uppercase font-black tracking-widest text-[#a89b8d] text-right">Status</th>
              </tr>
            </thead>`;
const newThead = `<thead>
              <tr className="text-[#a89b8d] text-[10px] font-black uppercase tracking-widest border-b border-[#e8dfd4]">
                <th className="pb-4 pt-2 px-6">Nama Barang</th>
                <th className="pb-4 pt-2 px-6">Stok</th>
                <th className="pb-4 pt-2 px-6 text-right">Status</th>
              </tr>
            </thead>`;
content = content.replace(oldThead, newThead);

// 5. Table rows styling
content = content.replace(/<td className="p-6 /g, '<td className="py-6 px-6 ');
content = content.replace(
    "className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${isKritis ? 'bg-red-500 text-white' : 'bg-[#e8dfd4] text-[#3d2817]'}`}",
    "className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm transition-all ${isKritis ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-[#faf6f1] text-[#8b6f47] border border-transparent'}`}"
);

fs.writeFileSync(file, content);
console.log('StaffInventaris.jsx redesigned');
