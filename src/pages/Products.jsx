import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { supabase } from '.././Services/supabaseClient';

export default function Products({ userRole }) {
    const breadcrumb = ["Dashboard", "Product List"];
    
    // State untuk menampung data dari Supabase
    const [menuList, setMenuList] = useState([]);
    
    // State untuk form input
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Coffee");
    const [price, setPrice] = useState("");

    // Fungsi untuk menarik data dari Supabase
    const fetchMenus = async () => {
        const { data, error } = await supabase
            .from('menus')
            .select('*')
            .order('id', { ascending: true }); // Urutkan berdasarkan ID
            
        if (error) console.error("Gagal menarik data menu:", error);
        else setMenuList(data || []);
    };

    // Gunakan useEffect untuk Fetch awal & Subscription Real-time
    useEffect(() => {
        fetchMenus(); // Tarik data saat komponen pertama kali dimuat

        // Aktifkan Real-time Subscription Supabase
        const menuSubscription = supabase
            .channel('realtime-menus')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'menus' }, (payload) => {
                console.log("Perubahan data menu terdeteksi!", payload);
                fetchMenus(); // Refetch data jika ada perubahan (INSERT/UPDATE/DELETE)
            })
            .subscribe();

        // Bersihkan subscription saat pindah halaman
        return () => {
            supabase.removeChannel(menuSubscription);
        };
    }, []);

    // Fungsi untuk menambah menu ke Supabase
    const handleAddMenu = async (e) => {
        e.preventDefault();
        if (!title || !price) return alert("Nama dan harga menu harus diisi!");
        
        // Insert langsung ke tabel 'menus' di Supabase
        const { error } = await supabase
            .from('menus')
            .insert([{ 
                title: title, 
                category: category, 
                price: parseInt(price) 
            }]);

        if (error) {
            alert("Gagal menambah menu: " + error.message);
        } else {
            setTitle("");
            setPrice("");
            alert("Menu berhasil ditambahkan ke Database!");
            // Tidak perlu setMenuList manual, karena realtime subscription akan mengurusnya
        }
    };

    return (
        <div className="p-4 md:p-10 font-instrument text-[#3d2817]">
            <PageHeader title="Product List" breadcrumb={breadcrumb} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Form Tambah Menu (Hanya Admin) */}
                {userRole?.toLowerCase() === 'admin' && (
                    <div className="bg-white p-8 rounded-[24px] border border-[#e8dfd4] shadow-sm h-fit">
                        <h2 className="text-xl font-bold mb-6 text-[#c97b4b]" style={{ fontFamily: "'Georgia', serif" }}>+ Tambah Menu Baru</h2>
                        <form onSubmit={handleAddMenu} className="flex flex-col gap-4">
                            <input 
                                className="p-3 bg-[#faf6f1] rounded-xl border border-[#e8dfd4] text-sm focus:outline-none focus:border-[#c97b4b]" 
                                placeholder="Nama Menu" value={title} onChange={e => setTitle(e.target.value)} 
                            />
                            <select 
                                className="p-3 bg-[#faf6f1] rounded-xl border border-[#e8dfd4] text-sm focus:outline-none focus:border-[#c97b4b]"
                                value={category} onChange={e => setCategory(e.target.value)}
                            >
                                <option value="Coffee">Coffee</option>
                                <option value="Non-Kopi">Non-Kopi</option>
                                <option value="Rice">Rice (Makanan)</option>
                                <option value="Snack">Snack (Cemilan)</option>
                                <option value="Dessert">Dessert</option>
                            </select>
                            <input 
                                type="number"
                                className="p-3 bg-[#faf6f1] rounded-xl border border-[#e8dfd4] text-sm focus:outline-none focus:border-[#c97b4b]" 
                                placeholder="Harga (Rp)" value={price} onChange={e => setPrice(e.target.value)} 
                            />
                            <button type="submit" className="bg-[#3d2817] text-white p-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#c97b4b] transition-all">
                                Simpan Menu
                            </button>
                        </form>
                    </div>
                )}

                {/* Tabel Daftar Menu */}
                <div className={`${userRole?.toLowerCase() === 'admin' ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                    <div className="bg-white overflow-hidden rounded-2xl shadow-sm border border-[#e8dfd4]">
                        <table className="min-w-full divide-y divide-[#e8dfd4]">
                            <thead className="bg-[#3d2817] text-white text-left text-xs font-semibold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8dfd4]">
                                {menuList.length === 0 ? (
                                    <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400">Loading atau Menu Kosong...</td></tr>
                                ) : (
                                    menuList.map((item) => (
                                        <tr key={item.id} className="hover:bg-[#faf6f1] transition-colors">
                                            <td className="px-6 py-4 font-bold">{item.title}</td>
                                            <td className="px-6 py-4 text-[#6b5344]">{item.category}</td>
                                            <td className="px-6 py-4 font-bold text-[#c97b4b]">
                                                Rp {item.price.toLocaleString("id-ID")}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}