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
    <div className="p-10 font-instrument text-[#3d2817]">
      <div className="bg-white border border-[#e8dfd4] p-6 rounded-[24px] mb-8 shadow-sm">
        <h2 className="text-xl font-black">Panel Kontrol Utama Pemilik</h2>
        <p className="text-xs text-[#6b5344] mt-1">Ringkasan grafik finansial performa Jambang Cafe.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#e8dfd4] p-6 rounded-2xl shadow-sm border-l-4 border-l-[#c97b4b]">
          <p className="text-[10px] font-bold text-[#6b5344] uppercase">Total Pendapatan</p>
          <h2 className="text-2xl font-black mt-1 text-[#c97b4b]">Rp {totalPendapatan.toLocaleString('id-ID')}</h2>
        </div>
        <div className="bg-white border border-[#e8dfd4] p-6 rounded-2xl shadow-sm border-l-4 border-l-[#8b6f47]">
          <p className="text-[10px] font-bold text-[#6b5344] uppercase">Total Pengeluaran</p>
          <h2 className="text-2xl font-black mt-1 text-[#3d2817]">Rp {totalPengeluaran.toLocaleString('id-ID')}</h2>
        </div>
        <div className="bg-[#3d4a3e] text-white p-6 rounded-2xl shadow-sm border-l-4 border-l-[#c4b5a0]">
          <p className="text-[10px] font-bold text-[#d4cfc4] uppercase">Keuntungan Bersih</p>
          <h2 className="text-2xl font-black mt-1">Rp {keuntunganBersih.toLocaleString('id-ID')}</h2>
        </div>
      </div>

      <div className="mt-8 bg-white border border-[#e8dfd4] p-6 rounded-[24px] shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#6b5344] mb-4">Grafik Penjualan</h3>
        {chartDataPenjualan.length ? (
          <SimpleLineChart data={chartDataPenjualan} stroke="#c97b4b" />
        ) : (
          <div className="text-sm text-[#6b5344]">Belum ada data.</div>
        )}
      </div>
    </div>
  );
}