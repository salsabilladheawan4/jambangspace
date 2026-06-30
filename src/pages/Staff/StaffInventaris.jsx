import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../Services/supabaseClient';

export default function StaffInventaris({ staffName }) {
  // State untuk form
  const [barang, setBarang] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [satuan, setSatuan] = useState('Kg');
  const [harga, setHarga] = useState('');
  
  // State untuk tabel
  const [daftarStok, setDaftarStok] = useState([]);

  // Fetch data
  const fetchStok = async () => {
    const { data, error } = await supabase.from('inventory').select('*').order('id', { ascending: false });
    if (!error && data) {
      setDaftarStok(data);
    }
  };

  useEffect(() => {
    fetchStok();
  }, []);

  // Fungsi Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!barang || !jumlah || !harga) return alert('Mohon isi semua kolom!');
    
    try {
      // Simpan ke pengeluaran (purchases)
      await supabase.from('purchases').insert([{
        item_name: barang,
        qty: parseInt(jumlah),
        unit: satuan,
        total_cost: parseInt(harga),
        staff: staffName || 'Staff'
      }]);

      // Update atau Insert ke inventory
      const { data: existing } = await supabase.from('inventory').select('*').eq('item_name', barang).single();
      
      if (existing) {
        await supabase.from('inventory').update({ stock: existing.stock + parseInt(jumlah) }).eq('id', existing.id);
      } else {
        await supabase.from('inventory').insert([{ item_name: barang, stock: parseInt(jumlah), unit: satuan }]);
      }

      alert('Stok berhasil ditambahkan!');
      setBarang(''); setJumlah(''); setHarga(''); setSatuan('Kg');
      fetchStok(); // Refresh tabel
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col lg:flex-row h-screen bg-[#faf8f6] p-6 md:p-10 gap-8 font-instrument">
      
      {/* Kolom Form Input Kiri */}
      <aside className="w-full lg:w-[400px] bg-white p-8 rounded-[32px] border border-[#e8dfd4] shadow-lg flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-[#3d2817]" style={{ fontFamily: "'Georgia', serif" }}>Input Barang</h2>
          <p className="text-xs text-[#6b5344] mt-1">Tambahkan stok bahan baku ke gudang.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 flex-1">
          <div>
            <label className="block text-xs font-bold text-[#6b5344] mb-2 uppercase tracking-widest">Nama Bahan / Barang</label>
            <input type="text" value={barang} onChange={(e) => setBarang(e.target.value)} required autoComplete="off" className="w-full p-3 bg-[#faf6f1] rounded-xl border border-[#e8dfd4] text-sm text-[#3d2817] focus:outline-none focus:border-[#c97b4b] transition-all" placeholder="Contoh: Biji Kopi Arabica" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#6b5344] mb-2 uppercase tracking-widest">Jumlah</label>
              <input type="number" value={jumlah} onChange={(e) => setJumlah(e.target.value)} required min="1" autoComplete="off" className="w-full p-3 bg-[#faf6f1] rounded-xl border border-[#e8dfd4] text-sm text-[#3d2817] focus:outline-none focus:border-[#c97b4b] transition-all" placeholder="0" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#6b5344] mb-2 uppercase tracking-widest">Satuan</label>
              <select value={satuan} onChange={(e) => setSatuan(e.target.value)} className="w-full p-3 bg-[#faf6f1] rounded-xl border border-[#e8dfd4] text-sm text-[#3d2817] focus:outline-none focus:border-[#c97b4b] transition-all cursor-pointer">
                <option value="Kg">Kg</option>
                <option value="Liter">Liter</option>
                <option value="Pcs">Pcs</option>
                <option value="Gram">Gram</option>
                <option value="Pack">Pack</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6b5344] mb-2 uppercase tracking-widest">Total Harga Beli</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">Rp</span>
              <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} required min="1" autoComplete="off" className="w-full pl-10 pr-3 py-3 bg-[#faf6f1] rounded-xl border border-[#e8dfd4] text-sm text-[#3d2817] focus:outline-none focus:border-[#c97b4b] transition-all" placeholder="50000" />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#3d2817] text-white p-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#c97b4b] transition-all mt-6 shadow-md">
            + Tambah Stok
          </button>
        </form>
      </aside>

      {/* Tabel Kanan */}
      <main className="flex-1 bg-white rounded-[32px] shadow-lg border border-[#e8dfd4] flex flex-col overflow-hidden">
        <div className="p-8 border-b border-[#e8dfd4] bg-[#faf6f1]">
          <h2 className="text-xl font-black text-[#3d2817]">Status Gudang</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left">
            <thead className="bg-white sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="p-6 text-xs uppercase font-black tracking-widest text-[#a89b8d]">Nama Barang</th>
                <th className="p-6 text-xs uppercase font-black tracking-widest text-[#a89b8d]">Stok</th>
                <th className="p-6 text-xs uppercase font-black tracking-widest text-[#a89b8d] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#faf6f1]">
              {daftarStok.length === 0 ? (
                <tr><td colSpan="3" className="p-10 text-center text-gray-400 font-medium">Belum ada stok tercatat di database.</td></tr>
              ) : (
                daftarStok.map((item, i) => {
                  const nama = item.item_name || item.name || item.barang || 'Tanpa Nama';
                  const stok = item.stock || item.qty || 0;
                  const unit = item.unit || item.satuan || '';
                  const isKritis = stok < 10;

                  return (
                    <motion.tr key={item.id || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-[#faf6f1] transition-colors group">
                      <td className="p-6 font-bold text-[#3d2817]">{nama}</td>
                      <td className="p-6 font-medium text-[#6b5344]">
                        <span className="bg-[#faf8f6] px-3 py-1 rounded-md group-hover:bg-white">{stok} {unit}</span>
                      </td>
                      <td className="p-6 text-right">
                        <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${isKritis ? 'bg-red-500 text-white' : 'bg-[#e8dfd4] text-[#3d2817]'}`}>
                          {isKritis ? 'KRITIS' : 'AMAN'}
                        </span>
                      </td>
                    </motion.tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </motion.div>
  );
}