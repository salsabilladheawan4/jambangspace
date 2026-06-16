import React from 'react';

export default function StaffDashboard({ staffName = "Safa (Shift Sore)", dataPenjualan = [], dataBelanja = [] }) {
  const aktivitasKasir = dataPenjualan.filter(item => item.staff === staffName);
  const aktivitasBelanja = dataBelanja.filter(item => item.staff === staffName);

  const totalTransaksiSesi = aktivitasKasir.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="p-4 md:p-10 font-instrument text-[#3d2817]">
      <div className="bg-white border border-[#e8dfd4] shadow-sm p-6 rounded-[24px] mb-8">
        <h2 className="text-xl md:text-2xl font-black" style={{ fontFamily: "'Georgia', serif" }}>Selamat Bekerja, {staffName}!</h2>
        <p className="text-xs text-[#6b5344] mt-1">Sistem Pemantauan Shift Kerja Aktif.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-[#e8dfd4] shadow-sm p-6 rounded-2xl border-l-4 border-l-[#c97b4b]">
          <p className="text-[10px] font-bold text-[#6b5344] uppercase tracking-widest">Penjualan Anda (Shift Ini)</p>
          <h3 className="text-2xl font-black mt-2 text-[#c97b4b]">Rp {totalTransaksiSesi.toLocaleString('id-ID')}</h3>
        </div>
        <div className="bg-white border border-[#e8dfd4] shadow-sm p-6 rounded-2xl border-l-4 border-l-[#8b6f47]">
          <p className="text-[10px] font-bold text-[#6b5344] uppercase tracking-widest">Log Pengadaan Barang Anda</p>
          <h3 className="text-2xl font-black mt-2 text-[#3d2817]">{aktivitasBelanja.length} Kali Belanja</h3>
        </div>
      </div>
    </div>
  );
}