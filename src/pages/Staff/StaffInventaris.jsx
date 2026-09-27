import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../Services/supabaseClient';

export default function StaffInventaris({ staffName }) {
  // State untuk form
  const [barang, setBarang] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [satuan, setSatuan] = useState('Kg');
  const [harga, setHarga] = useState('');
  
  // State untuk tabel dan resep
  const [daftarStok, setDaftarStok] = useState([]);
  const [daftarResep, setDaftarResep] = useState([]);

  // Fetch data
  const fetchStok = async () => {
    const { data: inventoryData, error: invError } = await supabase.from('inventory').select('*').order('id', { ascending: false });
    const { data: recipeData, error: recError } = await supabase.from('recipes').select('*');
    
    if (!invError && inventoryData) {
      setDaftarStok(inventoryData);
    }
    if (!recError && recipeData) {
      setDaftarResep(recipeData);
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

  // Fungsi Hapus Barang
  const handleDelete = async (id, nama) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${nama}" dari gudang?`)) {
      try {
        const { error } = await supabase.from('inventory').delete().eq('id', id);
        if (error) throw error;
        alert('Barang berhasil dihapus.');
        fetchStok();
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus barang.');
      }
    }
  };

  // Hitung metrik
  const itemKritis = daftarStok.filter(item => {
      const stok = item.stock || item.qty || 0;
      const unit = (item.unit || item.satuan || '').toLowerCase();
      const resepTerkait = daftarResep.filter(r => r.inventory_id === item.id);
      
      if (resepTerkait.length > 0) {
          const takaranTertinggi = Math.max(...resepTerkait.map(r => r.amount));
          return stok < (takaranTertinggi * 20);
      } else {
          if (unit === 'gram' || unit === 'ml' || unit === 'mili') return stok < 1000; 
          if (unit === 'kg' || unit === 'liter') return stok < 2;    
          if (unit === 'pcs' || unit === 'pack') return stok < 20;   
          return stok < 10;
      }
  }).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col xl:flex-row h-full gap-6 text-[#333]">
      
      {/* Kolom Form Input Kiri */}
      <aside className="w-full xl:w-[400px] bg-white p-8 rounded-[2rem] shadow-sm border border-[#332218]/5 flex flex-col shrink-0">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#332218]/10 flex items-center justify-center text-[#332218]">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Input Barang</h2>
            <p className="text-xs font-semibold text-gray-400 mt-1">Tambahkan stok ke gudang</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Nama Bahan / Barang</label>
            <input type="text" value={barang} onChange={(e) => setBarang(e.target.value)} required autoComplete="off" className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#332218] focus:bg-white transition-all" placeholder="Contoh: Biji Kopi Arabica" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Jumlah</label>
              <input type="number" value={jumlah} onChange={(e) => setJumlah(e.target.value)} required min="1" autoComplete="off" className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#332218] focus:bg-white transition-all" placeholder="0" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Satuan</label>
              <select value={satuan} onChange={(e) => setSatuan(e.target.value)} className="w-full py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#332218] focus:bg-white transition-all cursor-pointer appearance-none">
                <option value="Kg">Kg</option>
                <option value="Liter">Liter</option>
                <option value="Pcs">Pcs</option>
                <option value="Gram">Gram</option>
                <option value="Pack">Pack</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Total Harga Beli</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rp</span>
              <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} required min="1" autoComplete="off" className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#332218] focus:bg-white transition-all" placeholder="50.000" />
            </div>
          </div>

          <div className="mt-auto pt-6">
             <button type="submit" className="w-full bg-[#332218] text-white py-4 rounded-xl text-sm font-bold shadow-md hover:bg-[#221610] transition-all duration-300 flex items-center justify-center gap-2">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               Tambah Stok
             </button>
          </div>
        </form>
      </aside>

      {/* Tabel Kanan */}
      <main className="flex-1 bg-white rounded-[2rem] shadow-sm border border-[#332218]/5 flex flex-col overflow-hidden">
        
        {/* Header Kanan */}
        <div className="p-8 pb-4 flex items-center justify-between">
           <div className="flex flex-col">
              <h2 className="text-xl font-extrabold text-gray-800 tracking-tight">Status Gudang</h2>
              <p className="text-xs font-semibold text-gray-400 mt-1">Total {daftarStok.length} jenis bahan baku terdaftar</p>
           </div>
           {itemKritis > 0 && (
             <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs font-bold text-red-600">{itemKritis} Item Kritis</span>
             </div>
           )}
        </div>

        {/* Tabel */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white sticky top-0 z-10">
              <tr className="text-xs font-bold text-gray-400 border-b border-gray-100">
                <th className="pb-4">Nama Barang</th>
                <th className="pb-4">Stok Tersedia</th>
                <th className="pb-4 text-center">Status</th>
                <th className="pb-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold text-gray-700">
              {daftarStok.length === 0 ? (
                <tr><td colSpan="4" className="py-12 text-center text-gray-400 font-medium">Belum ada stok tercatat di database.</td></tr>
              ) : (
                daftarStok.map((item, i) => {
                  const nama = item.item_name || item.name || item.barang || 'Tanpa Nama';
                  const stok = item.stock || item.qty || 0;
                  const unit = item.unit || item.satuan || '';
                  
                  let isKritis = false;
                  const resepTerkait = daftarResep.filter(r => r.inventory_id === item.id);
                  if (resepTerkait.length > 0) {
                      const takaranTertinggi = Math.max(...resepTerkait.map(r => r.amount));
                      isKritis = stok < (takaranTertinggi * 20);
                  } else {
                      const unitLower = unit.toLowerCase();
                      if (unitLower === 'gram' || unitLower === 'ml' || unitLower === 'mili') isKritis = stok < 1000; 
                      else if (unitLower === 'kg' || unitLower === 'liter') isKritis = stok < 2;    
                      else if (unitLower === 'pcs' || unitLower === 'pack') isKritis = stok < 20;   
                      else isKritis = stok < 10;   
                  }

                  return (
                    <motion.tr key={item.id || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.5) }} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0 group">
                      <td className="py-4 font-extrabold text-gray-800">{nama}</td>
                      <td className="py-4 font-bold text-gray-500">
                        {stok.toLocaleString('id-ID')} <span className="font-semibold text-gray-400">{unit}</span>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${isKritis ? 'bg-red-50 text-red-600 border-red-200' : 'bg-[#332218]/10 text-[#332218] border-[#332218]/20'}`}>
                          {isKritis ? 'KRITIS' : 'AMAN'}
                        </span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        <button onClick={() => handleDelete(item.id, nama)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus Barang">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
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