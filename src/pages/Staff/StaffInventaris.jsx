import React, { useState, useEffect } from 'react';

export default function StaffInventaris({ staffName, onAddBelanja }) {
  const [barang, setBarang] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [harga, setHarga] = useState('');

  // STATE UNTUK STOK BARANG GUDANG
  const [daftarStok, setDaftarStok] = useState([
    { id: 1, namaBahan: 'Susu UHT Full Cream', stok: 8, satuan: 'Karton' }, 
    { id: 2, namaBahan: 'Biji Kopi Espresso Arabica', stok: 25, satuan: 'Kg' }, 
    { id: 3, namaBahan: 'Sirup Caramel', stok: 4, satuan: 'Botol' }, 
    { id: 4, namaBahan: 'Gelas Cup Plastik L', stok: 150, satuan: 'Pcs' }, 
  ]);

  // TODO: Letakkan fungsi fetch API Database di dalam useEffect ini nanti
  /*
  useEffect(() => {
     axios.get('/api/bahan_baku').then(res => setDaftarStok(res.data));
  }, []);
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!barang || !jumlah || !harga) return alert('Mohon isi semua kolom nota!');
    
    // TODO: Kirim data ini ke API Database tabel "barang_masuk"
    onAddBelanja({
      tanggal: new Date().toLocaleString('id-ID'),
      barang,
      jumlah: parseInt(jumlah),
      harga: parseInt(harga),
      staff: staffName
    });
    
    alert('Nota Pengadaan Barang Berhasil Dikirim ke Laporan Admin!');
    setBarang(''); setJumlah(''); setHarga('');
  };

  // TODO: Nanti updateStok ini harus menembak API PUT/PATCH ke database tabel "bahan_baku"
  const tambahStok = (id) => {
    setDaftarStok(daftarStok.map(item => item.id === id ? { ...item, stok: item.stok + 1 } : item));
  };
  const kurangStok = (id) => {
    setDaftarStok(daftarStok.map(item => item.id === id && item.stok > 0 ? { ...item, stok: item.stok - 1 } : item));
  };

  return (
    <div className="p-4 md:p-8 font-instrument text-[#3d2817] bg-[#faf8f6] min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORM NOTA BELANJA (KIRI) */}
        <div className="bg-white p-8 rounded-[32px] border border-[#e8dfd4] shadow-sm h-fit">
          <h2 className="text-2xl font-black mb-6 text-[#2a1a1a]" style={{ fontFamily: "'Georgia', serif" }}>Catat Barang Masuk</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Nama Bahan Baku</label>
              <input 
                type="text" value={barang} onChange={e => setBarang(e.target.value)} 
                className="p-4 bg-[#faf8f6] rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#6b3a3a]" 
                placeholder="Misal: Gula Aren" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Jumlah Unit</label>
              <input 
                type="number" value={jumlah} onChange={e => setJumlah(e.target.value)} 
                className="p-4 bg-[#faf8f6] rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#6b3a3a]" 
                placeholder="0" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Harga (Rp)</label>
              <input 
                type="number" value={harga} onChange={e => setHarga(e.target.value)} 
                className="p-4 bg-[#faf8f6] rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[#6b3a3a]" 
                placeholder="0" 
              />
            </div>
            <button type="submit" className="mt-4 w-full bg-[#6b3a3a] hover:bg-[#5a2e2e] text-white py-4 rounded-2xl text-sm font-bold transition-all shadow-sm">
              Kirim ke Laporan Admin
            </button>
          </form>
        </div>

        {/* TABEL STOCK OPNAME (KANAN) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-[#e8dfd4] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-[#2a1a1a]" style={{ fontFamily: "'Georgia', serif" }}>Stock Opname Fisik</h2>
            <span className="text-xs bg-[#faf8f6] px-3 py-1 rounded-full border border-gray-200 font-bold text-gray-500">Live Update</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="text-gray-500 text-xs uppercase border-b border-gray-100">
                  <th className="pb-4 px-2 font-bold">Bahan Baku Gudang</th>
                  <th className="pb-4 px-2 text-center font-bold">Sesuaikan Fisik</th>
                  <th className="pb-4 px-2 text-right font-bold">Status Indikator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {daftarStok.map((item) => {
                  const isKritis = item.stok <= 5;
                  return (
                    <tr key={item.id} className="hover:bg-[#faf8f6] transition-colors">
                      <td className="py-5 px-2 font-bold text-[#2a1a1a]">{item.namaBahan}</td>
                      <td className="py-5 px-2 flex items-center justify-center gap-3">
                        <button onClick={() => kurangStok(item.id)} className="bg-gray-100 hover:bg-[#6b3a3a] hover:text-white text-gray-600 w-10 h-10 rounded-xl font-black text-lg flex items-center justify-center transition-all">-</button>
                        <span className={`w-16 text-center font-black text-lg ${isKritis ? 'text-red-500' : 'text-[#6b3a3a]'}`}>
                          {item.stok} <span className="text-xs font-normal text-gray-400 block">{item.satuan}</span>
                        </span>
                        <button onClick={() => tambahStok(item.id)} className="bg-gray-100 hover:bg-[#6b3a3a] hover:text-white text-gray-600 w-10 h-10 rounded-xl font-black text-lg flex items-center justify-center transition-all">+</button>
                      </td>
                      <td className="py-5 px-2 text-right">
                        {isKritis ? (
                          <span className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-bold animate-pulse">⚠️ KRITIS</span>
                        ) : (
                          <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg text-xs font-bold">✅ AMAN</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-2xl text-xs text-orange-800 leading-relaxed font-medium">
            <span className="font-bold text-orange-900 block mb-1">ℹ️ Instruksi Staf:</span>
            Pemotongan stok resep otomatis dimatikan. Lakukan penghitungan fisik bahan baku di penghujung shift. Sesuaikan angka stok di sistem menggunakan tombol (+) dan (-) agar sama persis dengan sisa barang di rak kafe.
          </div>
        </div>

      </div>
    </div>
  );
}