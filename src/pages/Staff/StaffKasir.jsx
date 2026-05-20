import React, { useState } from 'react';

export default function StaffKasir({ staffName, onAddPenjualan }) {
  const [menuPilihan, setMenuPilihan] = useState('Es Kopi Susu');
  const [qty, setQty] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hargaSatuan = menuPilihan === 'Es Kopi Susu' ? 20000 : 15000;
    onAddPenjualan({
      tanggal: new Date().toLocaleString('id-ID'),
      item: menuPilihan,
      jumlah: parseInt(qty),
      total: hargaSatuan * parseInt(qty),
      staff: staffName
    });
    alert('Transaksi Kasir Tersimpan!');
    setQty(1);
  };

  return (
    <div className="p-10 text-white font-instrument">
      <div className="max-w-xl bg-[#1E1E1E] p-8 rounded-3xl border border-[#2D2D2D] shadow-xl">
        <h3 className="text-md font-extrabold uppercase tracking-widest text-cyan-500 border-b border-[#2D2D2D] pb-3">
          Mesin Kasir POS (Input Pendapatan)
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Pilih Menu</label>
            <select value={menuPilihan} onChange={(e) => setMenuPilihan(e.target.value)} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500">
              <option value="Es Kopi Susu">Es Kopi Susu (Rp 20.000)</option>
              <option value="Americano">Americano (Rp 15.000)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Jumlah Porsi</label>
            <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500" />
          </div>
          <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
            Simpan Transaksi
          </button>
        </form>
      </div>
    </div>
  );
}