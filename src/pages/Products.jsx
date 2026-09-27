import React, { useState, useEffect } from "react"; 
import PageHeader from "../components/PageHeader";
import { supabase } from '../Services/supabaseClient';
import { motion } from 'framer-motion';

export default function Products({ userRole }) {
    const breadcrumb = ["Dashboard", "Daftar Menu"];
    
    // State untuk menampung data dari Supabase
    const [menuList, setMenuList] = useState([]);
    
    // State untuk form input
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Coffee");
    const [price, setPrice] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Fungsi untuk menarik data dari Supabase
    const fetchMenus = async () => {
        const { data, error } = await supabase
            .from('menus')
            .select('*')
            .order('id', { ascending: true });
            
        if (error) console.error("Gagal menarik data menu:", error);
        else setMenuList(data || []);
    };

    // Gunakan useEffect untuk Fetch awal & Subscription Real-time
    useEffect(() => {
        fetchMenus(); 

        const menuSubscription = supabase
            .channel('realtime-menus')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'menus' }, (payload) => {
                fetchMenus(); 
            })
            .subscribe();

        return () => {
            supabase.removeChannel(menuSubscription);
        };
    }, []);

    // Fungsi untuk menambah atau mengedit menu ke Supabase
    const handleAddMenu = async (e) => {
        e.preventDefault();
        if (!title || !price) return alert("Nama dan harga menu harus diisi!");
        
        if (editingId) {
            // Update mode
            const { error } = await supabase
                .from('menus')
                .update({ title, category, price: parseInt(price) })
                .eq('id', editingId);
                
            if (error) {
                alert("Gagal mengupdate menu: " + error.message);
            } else {
                setEditingId(null);
                setTitle(""); setPrice(""); setCategory("Coffee");
                alert("Menu berhasil diupdate!");
            }
        } else {
            // Insert mode
            const { error } = await supabase
                .from('menus')
                .insert([{ title, category, price: parseInt(price) }]);

            if (error) {
                alert("Gagal menambah menu: " + error.message);
            } else {
                setTitle(""); setPrice(""); setCategory("Coffee");
                alert("Menu berhasil ditambahkan ke Database!");
            }
        }
    };

    const handleDeleteMenu = async (id, nama) => {
        if (window.confirm(`Yakin ingin menghapus menu "${nama}"?`)) {
            const { error } = await supabase.from('menus').delete().eq('id', id);
            if (error) alert("Gagal menghapus: " + error.message);
        }
    };

    const handleEditClick = (item) => {
        setEditingId(item.id);
        setTitle(item.title);
        setCategory(item.category);
        setPrice(item.price);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

    return (
        <motion.div initial="hidden" animate="show" variants={containerVariants} className="p-4 md:p-10 font-sans text-gray-800 bg-[#F8F1E7] min-h-screen">
            <PageHeader 
                title="Daftar Menu" 
                breadcrumb={breadcrumb} 
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                
                {/* Form Tambah Menu (Hanya Admin) */}
                {userRole?.toLowerCase() === 'admin' && (
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2rem] border border-[#332218]/5 shadow-sm h-fit">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#332218]/5 flex items-center justify-center text-[#332218]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                                </div>
                                <h2 className="text-xl font-extrabold text-[#1a110c]">{editingId ? 'Edit Menu' : 'Tambah Menu'}</h2>
                            </div>
                            {editingId && (
                                <button onClick={() => { setEditingId(null); setTitle(""); setPrice(""); setCategory("Coffee"); }} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors">
                                    Batal Edit
                                </button>
                            )}
                        </div>
                        <form onSubmit={handleAddMenu} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-500">Nama Menu</label>
                                <input 
                                    className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#332218] focus:bg-white transition-colors" 
                                    placeholder="Contoh: Matcha Latte" value={title} onChange={e => setTitle(e.target.value)} 
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-500">Kategori</label>
                                <select 
                                    className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#332218] focus:bg-white transition-colors appearance-none"
                                    value={category} onChange={e => setCategory(e.target.value)}
                                >
                                    <option value="Coffee">Coffee</option>
                                    <option value="Non-Kopi">Non-Kopi</option>
                                    <option value="Rice">Rice (Makanan)</option>
                                    <option value="Snack">Snack (Cemilan)</option>
                                    <option value="Dessert">Dessert</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-gray-500">Harga (Rp)</label>
                                <input 
                                    type="number"
                                    className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#332218] focus:bg-white transition-colors" 
                                    placeholder="Contoh: 25000" value={price} onChange={e => setPrice(e.target.value)} 
                                />
                            </div>
                            <button type="submit" className="w-full bg-[#332218] text-white p-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#221610] shadow-lg shadow-[#332218]/20 transition-all mt-2">
                                {editingId ? 'Update Menu' : 'Simpan Menu'}
                            </button>
                        </form>
                    </motion.div>
                )}

                {/* Tabel Daftar Menu */}
                <motion.div variants={itemVariants} className={`${userRole?.toLowerCase() === 'admin' ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                    <div className="bg-white rounded-[2rem] border border-[#332218]/5 shadow-sm p-8 overflow-hidden">
                        <div className="flex items-center gap-2 font-bold text-lg text-[#1a110c] mb-6">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                            Daftar Menu Tersedia
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[500px] border-collapse">
                                <thead>
                                    <tr className="text-[11px] font-semibold text-gray-400 border-b border-gray-100/50">
                                        <th className="pb-4 pl-6">Nama Menu</th>
                                        <th className="pb-4">Kategori</th>
                                        <th className="pb-4">Harga</th>
                                        <th className="pb-4 text-right pr-6">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menuList.length === 0 ? (
                                        <tr><td colSpan="4" className="py-12 text-center text-gray-400 font-medium">Loading atau Menu Kosong...</td></tr>
                                    ) : (
                                        menuList
                                            .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()))
                                            .map((item) => (
                                            <tr key={item.id} className={`hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0 ${editingId === item.id ? 'bg-[#f0e5d8]/30' : ''}`}>
                                                <td className="py-5 font-bold text-[#1a110c] text-[13px] pl-6">{item.title}</td>
                                                <td className="py-5">
                                                    <span className="bg-[#f0e5d8] text-[#BA4A22] px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-[#332218]/10">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="py-5 font-bold text-[#332218] text-[13px]">
                                                    Rp {item.price.toLocaleString("id-ID")}
                                                </td>
                                                <td className="py-5 text-right pr-6">
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => handleEditClick(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                        </button>
                                                        <button onClick={() => handleDeleteMenu(item.id, item.title)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}