import React, { useState } from 'react';

export default function StaffInventaris({ staffName, onAddBelanja }) {
  // Form Belanja
  const [barang, setBarang] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [satuan, setSatuan] = useState('Kg');
  const [harga, setHarga] = useState('');

  // Data Stok Awal
  const [daftarStok, setDaftarStok] = useState([
    { id: 1, namaBahan: 'Susu UHT Full Cream', stok: 8, satuan: 'Karton' }, 
    { id: 2, namaBahan: 'Biji Kopi Espresso Arabica', stok: 25, satuan: 'Kg' }, 
    { id: 3, namaBahan: 'Sirup Caramel', stok: 4, satuan: 'Botol' }, 
    { id: 4, namaBahan: 'Gelas Cup Plastik L', stok: 150, satuan: 'Pcs' }, 
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!barang || !jumlah || !harga) return alert('Mohon isi semua kolom nota!');
    
    // 1. KIRIM KE LAPORAN ADMIN (Uang Keluar)
    onAddBelanja({
      tanggal: new Date().toLocaleString('id-ID'),
      barang,
      jumlah: parseInt(jumlah),
      harga: parseInt(harga),
      staff: staffName
    });

    // 2. TAMBAHKAN KE TABEL STOK (Update Fisik Gudang)
    const barangBaru = {
      id: Date.now(),
      namaBahan: barang,
      stok: parseInt(jumlah),
      satuan: satuan
    };
    setDaftarStok([...daftarStok, barangBaru]);
    
    alert('Berhasil! Barang masuk ke Gudang & Laporan Admin.');
    setBarang(''); setJumlah(''); setHarga(''); setSatuan('Kg');
  };

  const tambahStok = (id) => {
    setDaftarStok(daftarStok.map(item => item.id === id ? { ...item, stok: item.stok + 1 } : item));
  };
  const kurangStok = (id) => {
    setDaftarStok(daftarStok.map(item => item.id === id && item.stok > 0 ? { ...item, stok: item.stok - 1 } : item));
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#faf8f6] font-sans">
      
      {/* KIRI: FORM BARANG MASUK */}
      <aside className="w-full lg:w-[400px] bg-white border-r border-gray-100 p-8 flex flex-col flex-shrink-0 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-[#2a1a1a]" style={{ fontFamily: "'Georgia', serif" }}>Barang Masuk</h2>
          <p className="text-sm text-gray-500 mt-2">Catat pembelian bahan baku baru di sini.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Nama Bahan Baku</label>
            <input 
              type="text" value={barang} onChange={e => setBarang(e.target.value)} 
              className="p-4 bg-[#faf8f6] rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#6b3a3a] transition" 
              placeholder="Misal: Gula Aren" 
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Jumlah</label>
              <input 
                type="number" min="1" value={jumlah} onChange={e => setJumlah(e.target.value)} 
                className="p-4 bg-[#faf8f6] rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#6b3a3a] transition" 
                placeholder="0" 
              />
            </div>
            <div className="flex flex-col gap-2 w-1/3">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Satuan</label>
              <select 
                value={satuan} onChange={e => setSatuan(e.target.value)}
                className="p-4 bg-[#faf8f6] rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#6b3a3a] transition"
              >
                <option value="Kg">Kg</option>
                <option value="Liter">Liter</option>
                <option value="Pcs">Pcs</option>
                <option value="Botol">Botol</option>
                <option value="Karton">Karton</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Harga Beli (Rp)</label>
            <input 
              type="number" min="1" value={harga} onChange={e => setHarga(e.target.value)} 
              className="p-4 bg-[#faf8f6] rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#6b3a3a] transition" 
              placeholder="Contoh: 150000" 
            />
          </div>

          <button type="submit" className="mt-4 w-full bg-[#6b3a3a] hover:bg-[#5a2e2e] text-white py-4 rounded-2xl text-sm font-bold transition-all shadow-md transform hover:-translate-y-1">
            + Tambah ke Gudang
          </button>
        </form>
      </aside>

      {/* KANAN: TABEL STOCK OPNAME */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black text-[#2a1a1a]" style={{ fontFamily: "'Georgia', serif" }}>Stock Opname</h1>
          <span className="bg-[#6b3a3a]/10 text-[#6b3a3a] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider">
            Live Update
          </span>
        </div>

        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-400 text-xs uppercase border-b border-gray-100">
                  <th className="pb-4 px-4 font-bold">Bahan Baku Gudang</th>
                  <th className="pb-4 px-4 text-center font-bold">Sesuaikan Fisik</th>
                  <th className="pb-4 px-4 text-right font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {daftarStok.map((item) => {
                  const isKritis = item.stok <= 5;
                  return (
                    <tr key={item.id} className="hover:bg-[#faf8f6] transition-colors group">
                      <td className="py-4 px-4 font-bold text-[#2a1a1a] text-base">{item.namaBahan}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-4">
                          <button onClick={() => kurangStok(item.id)} className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 font-black hover:bg-[#6b3a3a] hover:text-white transition-colors">-</button>
                          <div className="w-20 text-center">
                            <span className={`block font-black text-xl ${isKritis ? 'text-red-500' : 'text-[#2a1a1a]'}`}>{item.stok}</span>
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.satuan}</span>
                          </div>
                          <button onClick={() => tambahStok(item.id)} className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 font-black hover:bg-[#6b3a3a] hover:text-white transition-colors">+</button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {isKritis ? (
                          <span className="inline-block bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-bold animate-pulse">⚠️ KRITIS</span>
                        ) : (
                          <span className="inline-block bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg text-xs font-bold">✅ AMAN</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 p-5 bg-[#3d2817] rounded-[24px] text-sm text-[#d4cfc4] leading-relaxed flex gap-4 items-start shadow-lg">
          <span className="text-3xl">💡</span>
          <div>
            <h4 className="font-bold text-white mb-1 text-base">Instruksi Staf Gudang:</h4>
            <p>1. Input barang yang baru dibeli di form sebelah kiri.<br/>2. Di akhir shift kerja, hitung sisa barang secara fisik di rak kafe.<br/>3. Gunakan tombol (+) atau (-) pada tabel di atas agar angka di sistem sama persis dengan jumlah asli di rak.</p>
          </div>
        </div>
      </main>

    </div>
  );
}