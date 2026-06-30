import React from 'react';
import SimpleLineChart from '../../components/SimpleLineChart';
import { motion } from 'framer-motion';

export default function AdminDashboard({ dataPenjualan = [], dataBelanja = [] }) {
  const totalPendapatan = dataPenjualan.reduce((acc, curr) => acc + curr.total, 0);
  const totalPengeluaran = dataBelanja.reduce((acc, curr) => acc + curr.harga, 0);
  const keuntunganBersih = totalPendapatan - totalPengeluaran;

  const chartDataPenjualan = Array.isArray(dataPenjualan)
    ? dataPenjualan.slice(0, 10).map((item, idx) => ({
        label: item.tanggal ? String(item.tanggal).slice(0, 5) : `T${idx + 1}`,
        value: Number(item.total) || 0,
      }))
    : [];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemAnim = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="p-6 md:p-10 font-sans text-[#3d2817] bg-[#fdfdfd] min-h-screen">
      
      {/* HEADER NOVELTY STYLE */}
      <motion.div variants={itemAnim} className="bg-white rounded-2xl mb-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between p-6 md:px-8">
        <div>
          <h2 className="text-xl text-gray-500 mb-1">Welcome back, Owner</h2>
          <h1 className="text-2xl font-bold text-gray-800">Jambang Coffee Shop</h1>
        </div>
        <div className="flex items-center gap-10 mt-4 md:mt-0">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            Shop Status <span className="w-2 h-2 rounded-full bg-green-500 ml-1"></span> <span className="text-gray-800">Online</span>
          </div>
        </div>
      </motion.div>

      {/* KARTU FINANSIAL NOVELTY STYLE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div variants={itemAnim} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#fff4ed] text-[#c97b4b] flex items-center justify-center text-lg">
              📈
            </div>
            <p className="text-sm font-bold text-gray-700">Total Revenue</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Rp {totalPendapatan.toLocaleString('id-ID')}</h2>
        </motion.div>
        
        <motion.div variants={itemAnim} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#f4f1ed] text-[#8b6f47] flex items-center justify-center text-lg">
              📉
            </div>
            <p className="text-sm font-bold text-gray-700">Total Expenses</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Rp {totalPengeluaran.toLocaleString('id-ID')}</h2>
        </motion.div>
        
        <motion.div variants={itemAnim} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#ecfdf3] text-[#12b76a] flex items-center justify-center text-lg">
              💰
            </div>
            <p className="text-sm font-bold text-gray-700">Net Profit</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Rp {keuntunganBersih.toLocaleString('id-ID')}</h2>
        </motion.div>
      </div>

      {/* GRAFIK NOVELTY STYLE */}
      <motion.div variants={itemAnim} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-gray-800">Revenues VS Sales</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#c97b4b]"></span> Revenue
            </div>
            <div className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-500 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Daily
            </div>
          </div>
        </div>
        
        {chartDataPenjualan.length ? (
          <div className="mt-4"><SimpleLineChart data={chartDataPenjualan} stroke="#c97b4b" /></div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <span className="text-4xl mb-3">📊</span>
            <span className="text-sm font-bold">No transaction data available</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}