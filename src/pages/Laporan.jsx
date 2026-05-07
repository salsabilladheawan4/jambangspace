import { useState } from 'react';

export default function Laporan() {
    const [tab, setTab] = useState('penjualan');

    return (
        <div className="flex-1 p-10 bg-[#121212] min-h-screen font-instrument text-white">
            <div className="flex justify-between items-end mb-10">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black uppercase tracking-widest">Audit & Laporan Pusat</h2>
                    <p className="text-sm text-gray-500">Transparansi operasional dan evaluasi modal kafe</p>
                </div>
                {/* Tombol Navigasi Laporan Penjualan vs Stok */}
                <div className="flex bg-[#1A1A1A] p-1.5 rounded-2xl border border-[#222]">
                    <button onClick={() => setTab('penjualan')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${tab === 'penjualan' ? "bg-white text-black" : "text-gray-500 hover:text-white"}`}>Laporan Penjualan</button>
                    <button onClick={() => setTab('stok')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${tab === 'stok' ? "bg-white text-black" : "text-gray-500 hover:text-white"}`}>Audit Mutasi Stok</button>
                </div>
            </div>

            {tab === 'penjualan' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#1A1A1A] p-10 rounded-[40px] border border-[#222] shadow-xl">
                        <p className="text-[10px] font-bold text-gray-500 uppercase mb-3 tracking-widest">Rekap Shift Pagi</p>
                        <h3 className="text-3xl font-black text-white tracking-tighter">Rp 1.120.500</h3>
                        <p className="text-xs text-green-500 font-bold mt-4">↑ 12.4% Performa Optimal</p>
                    </div>
                    <div className="bg-[#1A1A1A] p-10 rounded-[40px] border border-[#222] shadow-xl">
                        <p className="text-[10px] font-bold text-gray-500 uppercase mb-3 tracking-widest">Rekap Shift Sore</p>
                        <h3 className="text-3xl font-black text-white tracking-tighter">Rp 1.280.000</h3>
                        <p className="text-xs text-gray-500 font-bold mt-4">Tren menu susu mendominasi</p>
                    </div>
                </div>
            ) : (
                <div className="bg-[#1A1A1A] rounded-[32px] border border-[#222] overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#222]">
                            <tr className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                <th className="p-6">Bahan Baku</th>
                                <th className="p-6">Harga Beli (Modal)</th>
                                <th className="p-6">Stok Masuk</th>
                                <th className="p-6">Evaluasi</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            <tr className="border-b border-[#222]">
                                <td className="p-6 font-bold italic">Fresh Milk 1L</td>
                                <td className="p-6 text-white font-black">Rp 18.500</td>
                                <td className="p-6">12 Unit</td>
                                <td className="p-6 text-green-500 font-bold">Aman</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}