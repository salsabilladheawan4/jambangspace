import React, { useState } from 'react';

export default function AdminLaporan({ dataPenjualan = [], dataBelanja = [] }) {
  const [tab, setTab] = useState('jual');

  return (
    <div className="p-4 md:p-10 font-instrument text-[#3d2817] bg-[#faf8f6] min-h-screen">
      <div className="flex gap-4 border-b border-[#e8dfd4] mb-6">
        <button 
          onClick={() => setTab('jual')} 
          className={`pb-3 text-sm font-bold uppercase tracking-widest transition-all ${tab === 'jual' ? 'border-b-2 border-b-[#c97b4b] text-[#c97b4b]' : 'text-[#6b5344] hover:text-[#3d2817]'}`}
        >
          Laporan Penjualan (Masuk)
        </button>
        <button 
          onClick={() => setTab('beli')} 
          className={`pb-3 text-sm font-bold uppercase tracking-widest transition-all ${tab === 'beli' ? 'border-b-2 border-b-[#8b6f47] text-[#8b6f47]' : 'text-[#6b5344] hover:text-[#3d2817]'}`}
        >
          Laporan Belanja Staf (Keluar)
        </button>
      </div>

      <div className="bg-white border border-[#e8dfd4] shadow-sm rounded-3xl p-6 overflow-hidden">
        {tab === 'jual' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[#6b5344] text-xs uppercase border-b border-[#e8dfd4]">
                  <th className="pb-3 px-4">ID Transaksi</th>
                  <th className="pb-3 px-4">Waktu</th>
                  <th className="pb-3 px-4 w-1/3">Daftar Menu</th>
                  <th className="pb-3 px-4 text-center">Total Item</th>
                  <th className="pb-3 px-4">Total Bayar</th>
                  <th className="pb-3 px-4">Kasir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8dfd4]/50">
                {dataPenjualan.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-8 text-gray-400">Belum ada data penjualan.</td></tr>
                ) : null}
                {dataPenjualan.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#faf6f1] transition-colors">
                    <td className="py-4 px-4 text-[#8b6f47] font-medium whitespace-nowrap">{item.id}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{item.tanggal} <br/><span className="text-[#c4b5a0] text-xs">{item.jam}</span></td>
                    {/* Menggunakan max-w dan break-words agar menu panjang turun ke bawah */}
                    <td className="py-4 px-4 font-bold text-xs max-w-xs break-words leading-relaxed">{item.namaMenu}</td>
                    <td className="py-4 px-4 text-center font-bold">{item.qty}</td>
                    <td className="py-4 px-4 text-[#c97b4b] font-black whitespace-nowrap">Rp {item.total.toLocaleString('id-ID')}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="bg-[#e8dfd4] text-[#3d2817] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider">{item.staff}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="text-[#6b5344] text-xs uppercase border-b border-[#e8dfd4]">
                  <th className="pb-3 px-4">Waktu Input</th>
                  <th className="pb-3 px-4">Bahan Baku (Masuk)</th>
                  <th className="pb-3 px-4">Jumlah</th>
                  <th className="pb-3 px-4">Total Biaya</th>
                  <th className="pb-3 px-4">Penanggung Jawab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8dfd4]/50">
                {dataBelanja.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-8 text-gray-400">Belum ada data belanja pengeluaran.</td></tr>
                ) : null}
                {dataBelanja.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#faf6f1] transition-colors">
                    <td className="py-4 px-4">{item.tanggal}</td>
                    <td className="py-4 px-4 font-bold">{item.barang}</td>
                    <td className="py-4 px-4 font-medium">{item.jumlah} Unit</td>
                    <td className="py-4 px-4 text-[#8b6f47] font-black">Rp {item.harga.toLocaleString('id-ID')}</td>
                    <td className="py-4 px-4">
                      <span className="bg-[#e8dfd4] text-[#3d2817] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider">{item.staff}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}