import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../components/PageHeader';

export default function AdminLaporan({ dataPenjualan = [], dataBelanja = [] }) {
  const [tab, setTab] = useState('jual');
  const [searchQuery, setSearchQuery] = useState('');
  const breadcrumb = ["Dashboard", "Laporan & Aktivitas"];

  return (
    <div className="p-4 md:p-10 font-sans text-gray-800 bg-[#F8F1E7] min-h-screen">
      
      <PageHeader 
        title="Laporan & Aktivitas" 
        breadcrumb={breadcrumb} 
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      <div className="bg-white border border-[#332218]/5 shadow-sm rounded-[2rem] overflow-hidden min-h-[400px] mt-8">
        
        {/* Custom Tabs */}
        <div className="flex gap-8 border-b border-gray-100 px-8 pt-6">
          <button 
            onClick={() => setTab('jual')} 
            className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${tab === 'jual' ? 'text-[#332218]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Penjualan (Masuk)
            {tab === 'jual' && <motion.div layoutId="underline" className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#332218] rounded-t-full" />}
          </button>
          <button 
            onClick={() => setTab('beli')} 
            className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${tab === 'beli' ? 'text-[#332218]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Belanja Staf (Keluar)
            {tab === 'beli' && <motion.div layoutId="underline" className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#332218] rounded-t-full" />}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-2 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
              className="w-full"
            >
              {tab === 'jual' ? (
                <div className="overflow-x-auto p-4 md:p-2">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                        <th className="pb-4 pt-2 px-6">ID Transaksi</th>
                        <th className="pb-4 pt-2 px-6">Waktu</th>
                        <th className="pb-4 pt-2 px-6 w-1/3">Daftar Menu</th>
                        <th className="pb-4 pt-2 px-6 text-center">Total Item</th>
                        <th className="pb-4 pt-2 px-6">Total Bayar</th>
                        <th className="pb-4 pt-2 px-6">Kasir</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {dataPenjualan.length === 0 ? (
                        <tr><td colSpan="6" className="text-center py-16 text-gray-400 text-xs font-bold">Belum ada data penjualan tercatat.</td></tr>
                      ) : null}
                      {dataPenjualan
                        .filter(item => 
                          (item.id && item.id.toLowerCase().includes(searchQuery.toLowerCase())) || 
                          (item.namaMenu && item.namaMenu.toLowerCase().includes(searchQuery.toLowerCase())) || 
                          (item.staff && item.staff.toLowerCase().includes(searchQuery.toLowerCase()))
                        )
                        .map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="py-6 px-6 text-[#1a110c] font-black text-xs whitespace-nowrap">{item.id}</td>
                          <td className="py-6 px-6 whitespace-nowrap"><span className="font-bold text-gray-700">{item.tanggal}</span> <br/><span className="text-gray-400 text-[10px]">{item.jam}</span></td>
                          <td className="py-6 px-6 font-bold text-xs max-w-xs break-words leading-relaxed text-gray-600">{item.namaMenu}</td>
                          <td className="py-6 px-6 text-center font-black text-gray-800">{item.qty}</td>
                          <td className="py-6 px-6 text-[#332218] font-black whitespace-nowrap bg-[#f8fcf9] rounded-xl border border-[#332218]/5 inline-block mt-4 ml-4">Rp {item.total.toLocaleString('id-ID')}</td>
                          <td className="py-6 px-6 whitespace-nowrap">
                            <span className="bg-[#1a110c] text-white px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest">{item.staff}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="overflow-x-auto p-4 md:p-2">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                      <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                        <th className="pb-4 pt-2 px-6">Waktu Input</th>
                        <th className="pb-4 pt-2 px-6">Bahan Baku (Masuk)</th>
                        <th className="pb-4 pt-2 px-6">Jumlah</th>
                        <th className="pb-4 pt-2 px-6">Total Biaya</th>
                        <th className="pb-4 pt-2 px-6">Penanggung Jawab</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {dataBelanja.length === 0 ? (
                        <tr><td colSpan="5" className="text-center py-16 text-gray-400 text-xs font-bold">Belum ada data belanja pengeluaran.</td></tr>
                      ) : null}
                      {dataBelanja
                        .filter(item => 
                          (item.barang && item.barang.toLowerCase().includes(searchQuery.toLowerCase())) || 
                          (item.staff && item.staff.toLowerCase().includes(searchQuery.toLowerCase()))
                        )
                        .map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="py-6 px-6 font-bold text-gray-700">{item.tanggal}</td>
                          <td className="py-6 px-6 font-black text-[#1a110c]">{item.barang}</td>
                          <td className="py-6 px-6 font-bold text-gray-600">{item.jumlah} Unit</td>
                          <td className="py-6 px-6 text-[#332218] font-black bg-[#f8fcf9] rounded-xl border border-[#332218]/5 inline-block mt-4 ml-4">Rp {item.harga.toLocaleString('id-ID')}</td>
                          <td className="py-6 px-6">
                            <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest">{item.staff}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}