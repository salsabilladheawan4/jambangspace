import React from 'react';

export default function StaffDashboard({ staffName = "Safa (Shift Sore)", dataPenjualan = [], dataBelanja = [] }) {
  const aktivitasKasir = dataPenjualan.filter(item => item.staff === staffName);
  const aktivitasBelanja = dataBelanja.filter(item => item.staff === staffName);

  const totalTransaksiSesi = aktivitasKasir.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="p-10 text-white font-instrument">
      <div className="bg-[#1E1E1E] border border-[#2D2D2D] p-6 rounded-[24px] mb-8">
        <h2 className="text-xl font-black">Selamat Bekerja, {staffName}!</h2>
        <p className="text-xs text-gray-400 mt-1">Sistem Pemantauan Shift Kerja Aktif.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#1E1E1E] border border-[#2D2D2D] p-6 rounded-2xl">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Penjualan Anda (Shift Ini)</p>
          <h3 className="text-2xl font-black mt-2 text-cyan-400">Rp {totalTransaksiSesi.toLocaleString('id-ID')}</h3>
        </div>
        <div className="bg-[#1E1E1E] border border-[#2D2D2D] p-6 rounded-2xl">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Log Pengadaan Barang Anda</p>
          <h3 className="text-2xl font-black mt-2 text-amber-500">{aktivitasBelanja.length} Kali Belanja</h3>
        </div>
      </div>
    </div>
  );
}