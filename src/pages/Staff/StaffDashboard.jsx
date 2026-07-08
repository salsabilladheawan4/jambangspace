import React from 'react';
import { motion } from 'framer-motion';

export default function StaffDashboard({ staffName = "Safa (Shift Sore)", dataPenjualan = [], dataBelanja = [] }) {
  const aktivitasKasir = dataPenjualan.filter(item => item.staff === staffName).slice(0, 5); // 5 Transaksi terakhir
  const aktivitasBelanja = dataBelanja.filter(item => item.staff === staffName);
  const totalTransaksiSesi = dataPenjualan.filter(item => item.staff === staffName).reduce((acc, curr) => acc + curr.total, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="show" 
      variants={containerVariants} 
      className="p-4 md:p-10 font-sans text-[#3d2817] bg-[#faf8f6] min-h-screen"
    >
      
      {/* HEADER BANNER PREMIUM */}
      <motion.div variants={itemVariants} className="relative overflow-hidden bg-gradient-to-r from-[#3d2817] to-[#8b6f47] rounded-3xl mb-8 shadow-lg">
        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-20 w-40 h-40 bg-[#c97b4b] opacity-20 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-10">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-sm md:text-base text-[#e8dfd4] font-medium tracking-wide mb-2 uppercase">Selamat Datang, Karyawan</h2>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{staffName}</h1>
          </div>
          
          <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl">
            <div>
              <p className="text-xs text-[#e8dfd4] uppercase tracking-widest font-bold mb-1">Status Shift</p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
                <span className="text-white font-medium text-sm">Sedang Bertugas</span>
              </div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl shadow-inner">
               ☕
            </div>
          </div>
        </div>
      </motion.div>

      {/* GRID KARTU STATISTIK KASIR & GUDANG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div variants={itemVariants} className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-lg transition-shadow relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-green-50 rounded-full opacity-50 transform group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-xl shadow-sm">
              💵
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pendapatan Sesi Anda</p>
          </div>
          <h3 className="text-4xl font-black text-gray-800 relative z-10">Rp {totalTransaksiSesi.toLocaleString('id-ID')}</h3>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-lg transition-shadow relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-orange-50 rounded-full opacity-50 transform group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#fff4ed] text-[#c97b4b] flex items-center justify-center text-xl shadow-sm">
              📦
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Aktivitas Pengadaan (Gudang)</p>
          </div>
          <h3 className="text-4xl font-black text-gray-800 relative z-10">
            {aktivitasBelanja.length} <span className="text-xl text-gray-400 font-medium ml-1">Transaksi</span>
          </h3>
        </motion.div>
      </div>

      {/* TABEL TRANSAKSI TERAKHIR (Mengisi Ruang Kosong) */}
      <motion.div variants={itemVariants} className="bg-white border border-gray-100 p-2 md:p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
        <div className="p-4 md:px-6 mb-2 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Riwayat Penjualan Terakhir Anda</h3>
            <span className="text-xs font-bold bg-[#faf6f1] text-[#c97b4b] px-3 py-1 rounded-full border border-[#e8dfd4]">5 Terbaru</span>
        </div>
        
        <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
                <thead className="bg-white">
                    <tr className="text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
                        <th className="pb-3 pt-2 px-6">Waktu</th>
                        <th className="pb-3 pt-2 px-6">Detail Pesanan</th>
                        <th className="pb-3 pt-2 px-6 text-right">Total Transaksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {aktivitasKasir.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-6 py-12 text-center text-gray-400 font-medium">
                                Belum ada transaksi kasir pada sesi ini.
                            </td>
                        </tr>
                    ) : (
                        aktivitasKasir.map((trx, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-6 text-sm text-gray-500 font-medium whitespace-nowrap">
                                    {trx.tanggal} <span className="mx-2 text-gray-300">|</span> {trx.jam}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-800">
                                    {trx.namaMenu}
                                </td>
                                <td className="py-4 px-6 text-sm text-right font-bold text-green-600 whitespace-nowrap">
                                    Rp {trx.total.toLocaleString('id-ID')}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </motion.div>
      
    </motion.div>
  );
}