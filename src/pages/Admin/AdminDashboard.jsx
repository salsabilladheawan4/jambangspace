import React from 'react';
import SimpleLineChart from '../../components/SimpleLineChart';

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

  return (
    <div className="p-10 text-white font-instrument">
      <div className="bg-[#1E1E1E] border border-[#2D2D2D] p-6 rounded-[24px] mb-8">
        <h2 className="text-xl font-black">Panel Kontrol Utama Pemilik</h2>
        <p className="text-xs text-gray-400 mt-1">Ringkasan grafik finansial performa Jambang Cafe.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1E1E1E] border border-[#2D2D2D] p-6 rounded-2xl border-l-4 border-l-cyan-500">
          <p className="text-[10px] font-bold text-gray-500 uppercase">Total Pendapatan Kasir</p>
          <h2 className="text-2xl font-black mt-1">Rp {totalPendapatan.toLocaleString('id-ID')}</h2>
        </div>
        <div className="bg-[#1E1E1E] border border-[#2D2D2D] p-6 rounded-2xl border-l-4 border-l-red-500">
          <p className="text-[10px] font-bold text-gray-500 uppercase">Total Pengeluaran Belanja Staf</p>
          <h2 className="text-2xl font-black mt-1">Rp {totalPengeluaran.toLocaleString('id-ID')}</h2>
        </div>
        <div className="bg-[#1E1E1E] border border-[#2D2D2D] p-6 rounded-2xl border-l-4 border-l-green-500">
          <p className="text-[10px] font-bold text-gray-500 uppercase">Keuntungan Bersih Laba</p>
          <h2 className="text-2xl font-black mt-1 text-green-400">Rp {keuntunganBersih.toLocaleString('id-ID')}</h2>
        </div>
      </div>

      <div className="mt-8 bg-[#1E1E1E] border border-[#2D2D2D] p-6 rounded-[24px]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Grafik Penjualan (Uang Masuk)</h3>
          <span className="text-xs text-gray-500">Top 10 transaksi</span>
        </div>

        {chartDataPenjualan.length ? (
          <SimpleLineChart data={chartDataPenjualan} />
        ) : (
          <div className="text-sm text-gray-500">Belum ada data penjualan untuk ditampilkan.</div>
        )}
      </div>
    </div>
  );
}

