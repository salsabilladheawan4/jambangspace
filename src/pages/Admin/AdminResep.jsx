import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../Services/supabaseClient';
import PageHeader from '../../components/PageHeader';

import { createPortal } from 'react-dom';

export default function AdminResep({ userRole }) {
  const breadcrumb = ["Dashboard", "Manajemen Resep"];
  
  const [menus, setMenus] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [recipes, setRecipes] = useState([]);
  
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [selectedBahan, setSelectedBahan] = useState('');
  const [takaran, setTakaran] = useState('');

  const fetchData = async () => {
    const { data: menuData } = await supabase.from('menus').select('*').order('id', { ascending: true });
    if (menuData) setMenus(menuData);

    const { data: invData } = await supabase.from('inventory').select('*');
    if (invData) setInventory(invData);

    const { data: recData } = await supabase.from('recipes').select('*');
    if (recData) setRecipes(recData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getBahanDetails = (invId) => {
    return inventory.find(i => String(i.id) === String(invId)) || { item_name: 'Unknown', unit: '' };
  };

  const getNamaBahan = (invItem) => {
    if (!invItem) return 'Unknown';
    return invItem.item_name || invItem.name || invItem.barang || 'Unknown';
  };

  const handleOpenModal = (menu) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMenu(null);
    setSelectedBahan('');
    setTakaran('');
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    if (!selectedBahan || !takaran) return alert("Pilih bahan dan masukkan takaran!");
    
    setIsSaving(true);
    const existing = recipes.find(r => r.menu_id === selectedMenu.id && r.inventory_id === parseInt(selectedBahan));
    
    if (existing) {
        // Update
        const { error } = await supabase.from('recipes').update({ amount: parseInt(takaran) }).eq('id', existing.id);
        if (error) alert("Error: " + error.message);
    } else {
        // Insert
        const { error } = await supabase.from('recipes').insert([{ 
            menu_id: selectedMenu.id, 
            inventory_id: parseInt(selectedBahan), 
            amount: parseInt(takaran) 
        }]);
        if (error) alert("Error: " + error.message);
    }
    
    setSelectedBahan('');
    setTakaran('');
    await fetchData();
    setIsSaving(false);
  };

  const handleDeleteRecipe = async (id) => {
    if (window.confirm("Hapus bahan ini dari resep?")) {
        const { error } = await supabase.from('recipes').delete().eq('id', id);
        if (!error) fetchData();
    }
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemAnim = { hidden: { opacity: 0, scale: 0.95, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } };

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="p-4 md:p-10 font-sans text-gray-800 bg-[#F8F1E7] min-h-screen">
      
      <PageHeader 
          title="Resep & BOM" 
          breadcrumb={breadcrumb} 
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
      />

      <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {menus
          .filter(menu => menu.title.toLowerCase().includes(searchQuery.toLowerCase()) || menu.category.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((menu) => {
          const resepMenu = recipes.filter(r => r.menu_id === menu.id);

          return (
            <motion.div key={menu.id} variants={itemAnim} className="bg-white rounded-[2rem] border border-[#332218]/5 shadow-sm hover:shadow-xl hover:border-[#332218]/20 transition-all duration-300 flex flex-col group overflow-hidden">
              
              <div className="bg-gray-50/50 p-6 flex items-start justify-between border-b border-gray-100">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white text-xl flex items-center justify-center shadow-sm border border-gray-100 text-[#332218]">
                    {menu.category.toLowerCase().includes('coffee') ? '☕' : menu.category.toLowerCase().includes('snack') ? '🥐' : '🍛'}
                  </div>
                  <div>
                    <span className="bg-[#f0e5d8] text-[#BA4A22] px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-[#332218]/10 mb-2 inline-block">
                        {menu.category}
                    </span>
                    <h3 className="text-lg font-black text-[#1a110c] leading-tight">{menu.title}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-4 h-1 rounded-full bg-gray-200 inline-block"></span> Komposisi Bahan
                  </h4>
                  {resepMenu.length > 0 ? (
                    <ul className="space-y-3">
                      {resepMenu.map((resep) => {
                        const bahan = getBahanDetails(resep.inventory_id);
                        return (
                            <li key={resep.id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                <span className="text-[13px] font-bold text-gray-700">
                                    {getNamaBahan(bahan)} <span className="text-[10px] text-gray-400 font-semibold ml-1">({bahan.unit || bahan.satuan})</span>
                                </span>
                                <span className="text-[13px] font-black text-[#332218] bg-[#f0e5d8] px-3 py-1 rounded-lg border border-[#332218]/10">
                                    {resep.amount}
                                </span>
                            </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      <span className="text-2xl mb-2 block opacity-40">📝</span>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Belum Ada Resep</p>
                    </div>
                  )}
                </div>
                
                <button onClick={() => handleOpenModal(menu)} className="w-full mt-6 py-4 bg-gray-50 text-[#332218] rounded-xl text-[11px] font-black uppercase tracking-widest group-hover:bg-[#332218] group-hover:text-white transition-all shadow-sm group-hover:shadow-md border border-gray-100 group-hover:border-transparent">
                  <span className="flex items-center justify-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                      Atur Komposisi
                  </span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Modal Atur Resep */}
      {createPortal(
        <AnimatePresence>
          {isModalOpen && selectedMenu && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={handleCloseModal}
              ></motion.div>
              <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
              >
                  <div className="p-6 md:p-8 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                      <div>
                          <h2 className="text-xl font-black text-[#1a110c] mb-1">Resep: {selectedMenu.title}</h2>
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Manajemen Komposisi Bahan</p>
                      </div>
                      <button onClick={handleCloseModal} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 shadow-sm border border-gray-100 transition-colors">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                  </div>
                  
                  <div className="p-6 md:p-8 overflow-y-auto">
                      {/* Daftar Resep Saat Ini */}
                      <div className="mb-8">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Komposisi Tersimpan</h4>
                          <div className="space-y-3">
                              {recipes.filter(r => r.menu_id === selectedMenu.id).length === 0 && (
                                  <p className="text-xs text-gray-400 italic">Belum ada bahan yang ditambahkan.</p>
                              )}
                              {recipes.filter(r => r.menu_id === selectedMenu.id).map(r => {
                                  const b = getBahanDetails(r.inventory_id);
                                  return (
                                      <div key={r.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                          <div>
                                              <p className="text-sm font-bold text-gray-800">{getNamaBahan(b)}</p>
                                              <p className="text-[10px] font-semibold text-gray-500 mt-0.5">Takaran: <span className="text-[#332218] font-bold">{r.amount} {b.unit || b.satuan}</span></p>
                                          </div>
                                          <button onClick={() => handleDeleteRecipe(r.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                          </button>
                                      </div>
                                  );
                              })}
                          </div>
                      </div>
  
                      {/* Form Tambah Bahan */}
                      <div className="bg-[#f8fcf9] p-6 rounded-2xl border border-[#332218]/10">
                          <h4 className="text-[10px] font-black text-[#332218] uppercase tracking-widest mb-4">Tambah / Ubah Takaran Bahan</h4>
                          <form onSubmit={handleAddRecipe} className="flex flex-col gap-4">
                              <select 
                                  required
                                  value={selectedBahan} onChange={e => setSelectedBahan(e.target.value)}
                                  className="w-full p-4 bg-white rounded-xl border border-gray-200 text-sm font-bold text-gray-700 focus:outline-none focus:border-[#332218] appearance-none"
                              >
                                  <option value="" disabled>Pilih Bahan Baku dari Gudang...</option>
                                  {inventory.map(inv => (
                                      <option key={inv.id} value={inv.id}>{getNamaBahan(inv)} ({inv.unit || inv.satuan})</option>
                                  ))}
                              </select>
                              
                              <div className="flex gap-4">
                                  <input 
                                      required type="number" min="1"
                                      value={takaran} onChange={e => setTakaran(e.target.value)}
                                      placeholder="Masukkan Jumlah Takaran"
                                      className="flex-1 p-4 bg-white rounded-xl border border-gray-200 text-sm font-bold text-gray-700 focus:outline-none focus:border-[#332218]"
                                  />
                                  <button type="submit" disabled={isSaving} className="px-8 bg-[#332218] text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#221610] shadow-lg shadow-[#332218]/20 transition-all flex items-center justify-center">
                                      {isSaving ? 'Menyimpan...' : 'Simpan'}
                                  </button>
                              </div>
                              {selectedBahan && (
                                  <p className="text-[10px] text-gray-500 font-semibold mt-1">*Jika bahan sudah ada di resep, takarannya akan di-update (ditimpa).</p>
                              )}
                          </form>
                      </div>
                  </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}