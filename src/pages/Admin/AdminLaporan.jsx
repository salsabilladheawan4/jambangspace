import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLaporan({ dataPenjualan = [], dataBelanja = [] }) {
  const [tab, setTab] = useState('jual');

  return (
    <div className="p-4 md:p-10 font-instrument text-[#3d2817] bg-[#faf8f6] min-h-screen">
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-[#e8dfd4] flex items-center justify-center text-xl">📄</div>
        <div>
          <h2 className="text-2xl font-black" style={{ fontFamily: "'Georgia', serif" }}>Laporan & Aktivitas</h2>
          <p className="text-xs text-[#6b5344] mt-1">Pantau seluruh arus kas masuk dan keluar dari staf Anda.</p>
        </div>
      </div>

      <div className="flex gap-6 border-b border-[#e8dfd4] mb-8 px-2">
        <button 
          onClick={() => setTab('jual')} 
          className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${tab === 'jual' ? 'text-[#c97b4b]' : 'text-[#a89b8d] hover:text-[#6b5344]'}`}
        >
          Penjualan (Masuk)
          {tab === 'jual' && <motion.div layoutId="underline" className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#c97b4b] rounded-t-full" />}
        </button>
        <button 
          onClick={() => setTab('beli')} 
          className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${tab === 'beli' ? 'text-[#8b6f47]' : 'text-[#a89b8d] hover:text-[#6b5344]'}`}
        >
          Belanja Staf (Keluar)
          {tab === 'beli' && <motion.div layoutId="underline" className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#8b6f47] rounded-t-full" />}
        </button>
      </div>

      <div className="bg-white border border-[#e8dfd4] shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-3xl overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }}
            className="w-full"
          >
            {tab === 'jual' ? (
              <div className="overflow-x-auto p-4 md:p-6">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-[#a89b8d] text-[10px] font-black uppercase tracking-widest border-b border-[#e8dfd4]">
                      <th className="pb-4 px-4">ID Transaksi</th>
                      <th className="pb-4 px-4">Waktu</th>
                      <th className="pb-4 px-4 w-1/3">Daftar Menu</th>
                      <th className="pb-4 px-4 text-center">Total Item</th>
                      <th className="pb-4 px-4">Total Bayar</th>
                      <th className="pb-4 px-4">Kasir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#faf6f1]">
                    {dataPenjualan.length === 0 ? (
                      <tr><td colSpan="6" className="text-center py-16 text-[#a89b8d] text-xs font-bold">Belum ada data penjualan tercatat.</td></tr>
                    ) : null}
                    {dataPenjualan.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#faf6f1] transition-colors group">
                        <td className="py-5 px-4 text-[#8b6f47] font-bold text-xs whitespace-nowrap">{item.id}</td>
                        <td className="py-5 px-4 whitespace-nowrap"><span className="font-bold">{item.tanggal}</span> <br/><span className="text-[#a89b8d] text-[10px]">{item.jam}</span></td>
                        <td className="py-5 px-4 font-bold text-xs max-w-xs break-words leading-relaxed text-[#6b5344]">{item.namaMenu}</td>
                        <td className="py-5 px-4 text-center font-black bg-[#faf8f6] group-hover:bg-white transition-colors">{item.qty}</td>
                        <td className="py-5 px-4 text-[#c97b4b] font-black whitespace-nowrap">Rp {item.total.toLocaleString('id-ID')}</td>
                        <td className="py-5 px-4 whitespace-nowrap">
                          <span className="bg-[#3d2817] text-white px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest">{item.staff}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto p-4 md:p-6">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="text-[#a89b8d] text-[10px] font-black uppercase tracking-widest border-b border-[#e8dfd4]">
                      <th className="pb-4 px-4">Waktu Input</th>
                      <th className="pb-4 px-4">Bahan Baku (Masuk)</th>
                      <th className="pb-4 px-4">Jumlah</th>
                      <th className="pb-4 px-4">Total Biaya</th>
                      <th className="pb-4 px-4">Penanggung Jawab</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#faf6f1]">
                    {dataBelanja.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-16 text-[#a89b8d] text-xs font-bold">Belum ada data belanja pengeluaran.</td></tr>
                    ) : null}
                    {dataBelanja.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#faf6f1] transition-colors">
                        <td className="py-5 px-4 font-medium">{item.tanggal}</td>
                        <td className="py-5 px-4 font-black text-[#6b5344]">{item.barang}</td>
                        <td className="py-5 px-4 font-bold bg-[#faf8f6]">{item.jumlah} Unit</td>
                        <td className="py-5 px-4 text-[#8b6f47] font-black">Rp {item.harga.toLocaleString('id-ID')}</td>
                        <td className="py-5 px-4">
                          <span className="bg-[#e8dfd4] text-[#3d2817] px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest">{item.staff}</span>
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
  );
}