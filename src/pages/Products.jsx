import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { BsFillExclamationDiamondFill } from "react-icons/bs";

// Komponen Products menerima menuList dan setMenuList dari App.jsx
export default function Products({ menuList = [], setMenuList, userRole }) {
    const breadcrumb = ["Dashboard", "Product List"];
    
    // State untuk form input menu baru
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Kopi");
    const [price, setPrice] = useState("");

    // Fungsi untuk menambah menu ke data pusat (App.jsx)
    const handleAddMenu = (e) => {
        e.preventDefault();
        if (!title || !price) return alert("Nama dan harga menu harus diisi!");

        const newMenu = {
            id: Date.now(),
            title: title,
            category: category,
            price: parseInt(price)
        };

        setMenuList([...menuList, newMenu]);
        setTitle("");
        setPrice("");
        alert("Menu berhasil ditambahkan!");
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
                                <option value="Kopi">Kopi</option>
                                <option value="Non-Kopi">Non-Kopi</option>
                                <option value="Makanan">Makanan</option>
                                <option value="Cemilan">Cemilan</option>
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
                                {menuList.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#faf6f1] transition-colors">
                                        <td className="px-6 py-4 font-bold">{item.title}</td>
                                        <td className="px-6 py-4 text-[#6b5344]">{item.category}</td>
                                        <td className="px-6 py-4 font-bold text-[#c97b4b]">
                                            Rp {item.price.toLocaleString("id-ID")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}