import React, { useState } from 'react';

export default function AdminLaporan({ dataPenjualan = [], dataBelanja = [] }) {
  const [tab, setTab] = useState('jual');

  return (
    <div className="p-10 text-white font-instrument">
      <div className="flex gap-4 border-b border-[#2D2D2D] mb-6">
        <button onClick={() => setTab('jual')} className={`pb-3 text-xs font-bold uppercase tracking-widest ${tab === 'jual' ? 'border-b-2 border-b-cyan-500 text-cyan-500' : 'text-gray-500'}`}>
          Laporan Penjualan (Uang Masuk)
        </button>
        <button onClick={() => setTab('beli')} className={`pb-3 text-xs font-bold uppercase tracking-widest ${tab === 'beli' ? 'border-b-2 border-b-red-500 text-red-500' : 'text-gray-500'}`}>
          Laporan Belanja Staf (Uang Keluar)
        </button>
      </div>

      <div className="bg-[#1E1E1E] border border-[#2D2D2D] rounded-2xl p-6 overflow-hidden">
        {tab === 'jual' ? (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 text-xs uppercase border-b border-[#2D2D2D]">
                <th className="pb-3">Waktu</th>
                <th className="pb-3">Menu</th>
                <th className="pb-3">Qty</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Staf Lapangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D2D2D]/50 text-gray-300">
              {dataPenjualan.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#252525]/20">
                  <td className="py-3">{item.tanggal}</td>
                  <td className="py-3 text-white font-bold">{item.item}</td>
                  <td className="py-3">{item.jumlah} Porsi</td>
                  <td className="py-3 text-cyan-400">Rp {item.total.toLocaleString('id-ID')}</td>
                  <td className="py-3"><span className="bg-[#252525] px-2 py-1 rounded text-xs">{item.staff}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 text-xs uppercase border-b border-[#2D2D2D]">
                <th className="pb-3">Waktu Input</th>
                <th className="pb-3">Bahan Baku</th>
                <th className="pb-3">Jumlah</th>
                <th className="pb-3">Total Biaya</th>
                <th className="pb-3">Penanggung Jawab</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D2D2D]/50 text-gray-300">
              {dataBelanja.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#252525]/20">
                  <td className="py-3">{item.tanggal}</td>
                  <td className="py-3 text-white font-bold">{item.barang}</td>
                  <td className="py-3">{item.jumlah} Unit</td>
                  <td className="py-3 text-red-400">Rp {item.harga.toLocaleString('id-ID')}</td>
                  <td className="py-3"><span className="bg-[#252525] px-2 py-1 rounded text-xs">{item.staff}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}