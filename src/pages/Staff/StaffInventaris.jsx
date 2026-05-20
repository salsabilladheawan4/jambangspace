import React, { useState } from 'react';

export default function StaffInventaris({ staffName, onAddBelanja }) {
  const [barang, setBarang] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [harga, setHarga] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!barang || !jumlah || !harga) return alert('Mohon isi semua kolom nota!');
    onAddBelanja({
      tanggal: new Date().toLocaleString('id-ID'),
      barang,
      jumlah: parseInt(jumlah),
      harga: parseInt(harga),
      staff: staffName
    });
    alert('Nota Pengadaan Barang Berhasil Dikirim ke Admin!');
    setBarang(''); setJumlah(''); setHarga('');
  };

  return (
    <div className="p-10 text-white font-instrument">
      <div className="max-w-xl bg-[#1E1E1E] p-8 rounded-3xl border border-[#2D2D2D] shadow-xl">
        <h3 className="text-md font-extrabold uppercase tracking-widest text-amber-500 border-b border-[#2D2D2D] pb-3">
          Input Belanja Logistik (Uang Keluar)
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Nama Bahan Baku</label>
            <input type="text" placeholder="Contoh: Susu UHT, Biji Kopi" value={barang} onChange={(e) => setBarang(e.target.value)} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500 placeholder-gray-600" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Kuantitas Fisik</label>
            <input type="number" placeholder="Jumlah kuantitas barang" value={jumlah} onChange={(e) => setJumlah(e.target.value)} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Total Pengeluaran Nota (Rp)</label>
            <input type="number" placeholder="Total pengeluaran nominal" value={harga} onChange={(e) => setHarga(e.target.value)} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500" />
          </div>
          <button type="submit" className="w-full bg-[#2D2D2D] border border-[#333] hover:bg-[#333] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest transition-all">
            Kirim Nota ke Owner
          </button>
        </form>
      </div>
    </div>
  );
}