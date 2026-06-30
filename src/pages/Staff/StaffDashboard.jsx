import React from 'react';
import { motion } from 'framer-motion';

export default function StaffDashboard({ staffName = "Safa (Shift Sore)", dataPenjualan = [], dataBelanja = [] }) {
  const aktivitasKasir = dataPenjualan.filter(item => item.staff === staffName);
  const aktivitasBelanja = dataBelanja.filter(item => item.staff === staffName);
  const totalTransaksiSesi = aktivitasKasir.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 md:p-10 font-sans text-[#3d2817] bg-[#fdfdfd] min-h-screen">
      
      {/* HEADER NOVELTY STYLE */}
      <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="bg-white rounded-2xl mb-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between p-6 md:px-8">
        <div>
          <h2 className="text-xl text-gray-500 mb-1">Welcome back, Staff</h2>
          <h1 className="text-2xl font-bold text-gray-800">{staffName}</h1>
        </div>
        <div className="flex items-center gap-10 mt-4 md:mt-0">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            Shift Status <span className="w-2 h-2 rounded-full bg-green-500 ml-1"></span> <span className="text-gray-800">Active</span>
          </div>
        </div>
      </motion.div>

      {/* KARTU STATISTIK NOVELTY STYLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#fff4ed] text-[#c97b4b] flex items-center justify-center text-lg">
              💵
            </div>
            <p className="text-sm font-bold text-gray-700">Pendapatan Sesi Ini</p>
          </div>
          <h3 className="text-4xl font-bold text-gray-900">Rp {totalTransaksiSesi.toLocaleString('id-ID')}</h3>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#f4f1ed] text-[#8b6f47] flex items-center justify-center text-lg">
              📦
            </div>
            <p className="text-sm font-bold text-gray-700">Aktivitas Pengadaan</p>
          </div>
          <h3 className="text-4xl font-bold text-gray-900">{aktivitasBelanja.length} Barang</h3>
        </motion.div>
      </div>
    </motion.div>
  );
}