import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function StaffDashboard({ staffName = "Safa (Shift Sore)", dataPenjualan = [], dataBelanja = [] }) {
  const [filterTerbaru, setFilterTerbaru] = useState(true);
  
  const aktivitasKasir = filterTerbaru 
    ? dataPenjualan.filter(item => item.staff === staffName).slice(0, 5)
    : dataPenjualan.filter(item => item.staff === staffName);
    
  const aktivitasBelanja = dataBelanja.filter(item => item.staff === staffName);
  const totalTransaksiSesi = dataPenjualan.filter(item => item.staff === staffName).reduce((acc, curr) => acc + curr.total, 0);

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div initial="hidden" animate="show" variants={containerVariants} className="font-sans text-[#333]">
      
      {/* 1. HEADER & TOP KPI BAR */}
      <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#332218]/5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 mb-6">
        
        {/* Profile Info */}
        <div className="flex-1 min-w-[200px] border-r border-gray-100 pr-6">
          <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2 text-[#332218] font-semibold text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Staff Profile
             </div>
             <div className="flex items-center gap-1.5 bg-[#f0e5d8] px-3 py-1 rounded-full border border-[#332218]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3ec066]"></span>
                <span className="text-[9px] text-[#BA4A22] font-black uppercase tracking-widest">ONLINE</span>
             </div>
          </div>
          <div className="flex items-end gap-2">
             <span className="text-[22px] font-extrabold text-[#1a110c] tracking-tight truncate capitalize">{staffName}</span>
          </div>
        </div>

        {/* Pendapatan Sesi */}
        <div className="flex-1 min-w-[150px] border-r border-gray-100 px-2 lg:px-6">
          <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm mb-4">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path></svg>
             Sesi Kasir
          </div>
          <div className="flex items-end gap-1">
             <span className="text-[22px] font-extrabold text-[#332218]">Rp {totalTransaksiSesi.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Aktivitas Belanja */}
        <div className="flex-1 min-w-[120px] px-2 lg:pl-6">
          <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm mb-4">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
             Gudang
          </div>
          <div className="flex items-end gap-2">
             <span className="text-[22px] font-extrabold text-[#1a110c]">{aktivitasBelanja.length}</span>
             <span className="text-xs font-semibold text-gray-400 mb-1">Transaksi</span>
          </div>
        </div>

      </motion.div>

      {/* 2. RECENT TRANSACTIONS TABLE */}
      <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#332218]/5 overflow-x-auto">
         <div className="flex justify-between items-center mb-6 min-w-[700px]">
            <div className="flex items-center gap-2 font-bold text-lg text-[#1a110c]">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
               Riwayat Kasir Terakhir
            </div>
            <div className="flex items-center gap-1 bg-[#f8f9f7] p-1.5 rounded-full border border-gray-100 text-xs font-bold text-gray-500">
               <span className="p-1.5 px-3 cursor-pointer hover:text-[#332218]" title="Muat Ulang (Refresh)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
               </span>
               <span onClick={() => setFilterTerbaru(false)} className={`py-1.5 px-5 cursor-pointer rounded-full transition-colors ${!filterTerbaru ? 'bg-white shadow-sm border border-gray-100 text-[#1a110c]' : 'hover:text-[#1a110c]'}`}>Semua</span>
               <span onClick={() => setFilterTerbaru(true)} className={`py-1.5 px-5 cursor-pointer rounded-full transition-colors ${filterTerbaru ? 'bg-white shadow-sm border border-gray-100 text-[#1a110c]' : 'hover:text-[#1a110c]'}`}>5 Terbaru</span>
            </div>
         </div>

         <table className="w-full text-left min-w-[700px] border-collapse">
            <thead>
               <tr className="text-[11px] font-semibold text-gray-400 border-b border-gray-100/50">
                  <th className="pb-4 pl-4">Waktu</th>
                  <th className="pb-4">Detail Pesanan</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right pr-10">Total Transaksi</th>
               </tr>
            </thead>
            <tbody className="text-sm font-semibold text-gray-700">
               {aktivitasKasir.length === 0 ? (
                  <tr>
                     <td colSpan="6" className="py-12 text-center text-gray-400 font-medium">
                        Belum ada transaksi pada sesi ini.
                     </td>
                  </tr>
               ) : (
                  aktivitasKasir.map((trx, idx) => (
                     <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 pl-4 text-[#869990] text-[13px] font-medium">
                           {trx.tanggal.substring(0, 9)} <span className="mx-0.5 text-gray-300">•</span> {trx.jam.replace('.', ':')}
                        </td>
                        <td className="py-5 font-bold text-[#1a110c] text-[13px]">
                           {trx.namaMenu}
                        </td>
                        <td className="py-5">
                           <span className="bg-[#f0e5d8] text-[#BA4A22] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-[#332218]/10">BERHASIL</span>
                        </td>
                        <td className="py-5 text-right font-bold text-[#332218] text-[13px]">
                           <div className="flex justify-end items-center gap-6">
                              Rp {trx.total.toLocaleString('id-ID')}
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 cursor-pointer hover:text-gray-800"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                           </div>
                        </td>
                     </tr>
                  ))
               )}
            </tbody>
         </table>
      </motion.div>
      
    </motion.div>
  );
}