const fs = require('fs');
const file = 'd:/react-kel11/jambang-app/src/pages/Staff/StaffDashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

// Container
content = content.replace('className="p-6 md:p-10 font-sans text-[#3d2817] bg-[#fdfdfd] min-h-screen"', 'className="p-6 md:p-10 font-instrument text-[#3d2817] bg-[#faf8f6] min-h-screen flex flex-col"');

// Header Banner
const oldHeader = `<motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="bg-white rounded-2xl mb-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between p-6 md:px-8">
        <div>
          <h2 className="text-xl text-gray-500 mb-1">Welcome back, Staff</h2>
          <h1 className="text-2xl font-bold text-gray-800">{staffName}</h1>
        </div>
        <div className="flex items-center gap-10 mt-4 md:mt-0">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            Shift Status <span className="w-2 h-2 rounded-full bg-green-500 ml-1"></span> <span className="text-gray-800">Active</span>
          </div>
        </div>
      </motion.div>`;
      
const newHeader = `<motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="bg-[#3d2817] rounded-[32px] mb-10 shadow-[0_10px_40px_rgba(61,40,23,0.15)] flex flex-col md:flex-row items-center justify-between p-8 md:px-12 relative overflow-hidden">
        <div className="absolute right-[-10%] top-[-50%] w-64 h-64 bg-[#c97b4b] opacity-20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-lg text-[#c4b5a0] mb-1 font-bold uppercase tracking-widest">Selamat Datang, Staff</h2>
          <h1 className="text-4xl md:text-5xl font-black text-white">{staffName}</h1>
        </div>
        <div className="flex items-center gap-6 mt-6 md:mt-0 relative z-10 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest">
            Shift Status <span className="relative flex h-3 w-3 ml-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span> <span className="text-green-400">Aktif</span>
          </div>
        </div>
      </motion.div>`;
      
content = content.replace(oldHeader, newHeader);

// Cards
const oldCardsRegex = /<div className="grid grid-cols-1 md:grid-cols-2 gap-6">[\s\S]*?<\/div>\s*<\/motion\.div>/;

const newCards = `<div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        <motion.div whileHover={{ y: -8 }} className="bg-white border border-transparent hover:border-[#f0eade] p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_40px_rgb(201,123,75,0.08)] transition-all duration-500 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 text-[150px] opacity-[0.03] transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">💵</div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#faf6f1] text-[#c97b4b] border border-[#e8dfd4] flex items-center justify-center text-2xl shadow-sm">
              💵
            </div>
            <p className="text-sm font-black text-[#8b6f47] uppercase tracking-widest">Pendapatan Sesi Ini</p>
          </div>
          <h3 className="text-5xl font-black text-[#3d2817] relative z-10">Rp {totalTransaksiSesi.toLocaleString('id-ID')}</h3>
        </motion.div>
        
        <motion.div whileHover={{ y: -8 }} className="bg-white border border-transparent hover:border-[#f0eade] p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_40px_rgb(201,123,75,0.08)] transition-all duration-500 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 text-[150px] opacity-[0.03] transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">📦</div>
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#faf6f1] text-[#8b6f47] border border-[#e8dfd4] flex items-center justify-center text-2xl shadow-sm">
              📦
            </div>
            <p className="text-sm font-black text-[#8b6f47] uppercase tracking-widest">Aktivitas Pengadaan</p>
          </div>
          <h3 className="text-5xl font-black text-[#3d2817] relative z-10">{aktivitasBelanja.length} <span className="text-2xl text-[#8b6f47]">Barang</span></h3>
        </motion.div>
      </div>
    </motion.div>`;

content = content.replace(oldCardsRegex, newCards);

fs.writeFileSync(file, content);
console.log('StaffDashboard.jsx redesigned');
