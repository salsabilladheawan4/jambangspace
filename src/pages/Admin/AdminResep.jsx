import React from 'react';
import { motion } from 'framer-motion';

export default function AdminResep({ tabelMenu = [], tabelBahanBaku = [], tabelResep = [] }) {
  
  const getNamaBahan = (idBahan) => {
    const bahan = tabelBahanBaku.find(b => b.idBahan === idBahan);
    return bahan ? `${bahan.namaBahan} (${bahan.satuan})` : 'Bahan tidak ditemukan';
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemAnim = { hidden: { opacity: 0, scale: 0.95, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } };

  return (
    <div className="p-4 md:p-10 font-instrument text-[#3d2817] bg-[#faf8f6] min-h-screen">
      
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="bg-white border border-[#e8dfd4] p-8 rounded-[32px] mb-10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
      >
        <div className="absolute right-[-5%] top-[-20%] w-64 h-64 bg-[#c97b4b] opacity-[0.04] rounded-full blur-3xl"></div>
        <img 
          src="https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1524d5cd3-2963-478a-9e4f-c6622adc321f.png" 
          alt="Recipe Management" 
          className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-[#faf6f1] shadow-lg"
        />
        <div className="text-center md:text-left z-10">
          <h2 className="text-3xl md:text-4xl font-black text-[#3d2817]" style={{ fontFamily: "'Georgia', serif" }}>
            Manajemen Resep & BOM
          </h2>
          <p className="text-sm text-[#6b5344] mt-3 max-w-xl leading-relaxed">
            Atur komposisi (Bill of Materials) untuk setiap menu. Sistem akan otomatis memotong stok di Gudang Kasir sesuai takaran presisi yang Anda tentukan di sini.
          </p>
        </div>
      </motion.div>

      {/* DAFTAR RESEP PER MENU */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {tabelMenu.map((menu) => {
          const resepMenuIni = tabelResep.filter(resep => resep.idMenu === menu.id);

          return (
            <motion.div key={menu.id} variants={itemAnim} className="bg-white border border-[#e8dfd4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
              
              {/* Card Header */}
              <div className="h-32 bg-[#3d2817] relative overflow-hidden flex items-end p-5">
                <div className="absolute inset-0 bg-[#2a1a0f] opacity-50 group-hover:opacity-30 transition-opacity"></div>
                <div className="absolute top-4 right-4 bg-[#c97b4b] text-white px-3 py-1 rounded-full text-[10px] font-black shadow-md z-10">
                  ID: {menu.id}
                </div>
                <div className="relative z-10 w-full">
                  <p className="text-[9px] font-black text-[#c4b5a0] uppercase tracking-widest mb-1">{menu.category}</p>
                  <h3 className="text-xl font-bold text-white leading-tight">{menu.title}</h3>
                </div>
              </div>

              {/* Card Body (Tabel Resep) */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white relative">
                <div>
                  <h4 className="text-[10px] font-black text-[#8b6f47] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-4 h-[2px] bg-[#8b6f47] inline-block"></span> Komposisi Bahan
                  </h4>
                  {resepMenuIni.length > 0 ? (
                    <ul className="space-y-3">
                      {resepMenuIni.map((resep, idx) => (
                        <li key={idx} className="flex justify-between items-center border-b border-[#faf6f1] pb-3 last:border-0 last:pb-0">
                          <span className="text-xs font-bold text-[#6b5344] capitalize">
                            {getNamaBahan(resep.idBahan).split('(')[0]} 
                            <span className="text-[10px] text-gray-400 font-normal">({getNamaBahan(resep.idBahan).split('(')[1]}</span>
                          </span>
                          <span className="text-sm font-black text-[#3d2817] bg-[#faf6f1] px-2 py-1 rounded-md">
                            {resep.takaran}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-6 bg-[#faf8f6] rounded-xl border border-dashed border-gray-300">
                      <span className="text-2xl opacity-50 mb-2 block">📝</span>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Resep Kosong</p>
                    </div>
                  )}
                </div>
                
                {/* Tombol Tambah/Edit */}
                <button className="w-full mt-6 py-3 border-2 border-[#e8dfd4] text-[#8b6f47] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#c97b4b] hover:text-white hover:border-[#c97b4b] transition-all">
                  Sesuaikan Resep
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </div>
  );
}