import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// DATA MENU ASLI CAFFE JAMBANG MARPOYAN PEKANBARU
const DATA_MENU_JAMBANG = {
    1: {
        title: "Kopi Susu Gula Aren Jambang",
        category: "Kopi (Coffee)",
        brand: "Caffe Jambang Signature",
        price: 18000,
        description: "Perpaduan espresso premium, susu segar gurih, dan gula aren murni pilihan. Rasa kopinya kuat namun tetap lembut di tenggorokan, pas nemenin nongkrong di Marpoyan.",
        thumbnail: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=500",
        stok: "Tersedia"
    },
    2: {
        title: "Matcha Latte Ice",
        category: "Non-Kopi (Non-Coffee)",
        brand: "Caffe Jambang",
        price: 20000,
        description: "Bubuk matcha Jepang premium yang diseduh dengan susu UHT dingin super creamy. Manisnya pas dan menenangkan pikiran.",
        thumbnail: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=500",
        stok: "Tersedia"
    },
    3: {
        title: "Nasi Goreng Kampung Jambang",
        category: "Makanan Berat",
        brand: "Dapur Jambang Marpoyan",
        price: 25000,
        description: "Nasi goreng bumbu kampung otentik yang disajikan dengan telur mata sapi, suwiran ayam gurih, acar segar, dan kerupuk renyah.",
        thumbnail: "https://images.unsplash.com/photo-1603133872878-6966b6291a4d?auto=format&fit=crop&q=80&w=500",
        stok: "Tersedia"
    },
    4: {
        title: "Kentang Goreng Spesial / French Fries",
        category: "Cemilan (Snack)",
        brand: "Caffe Jambang Side Dish",
        price: 15000,
        description: "Kentang pilihan digoreng krispi dengan taburan garam gurih dan oregano, disajikan bersama saus sambal cocolan favorit anak nongkrong.",
        thumbnail: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=500",
        stok: "Tersedia"
    },
    5: {
        title: "Mie Goreng Sumatra",
        category: "Makanan Berat",
        brand: "Dapur Jambang Marpoyan",
        price: 18000,
        description: "Mie kuning tebal khas Sumatra yang digoreng basah dengan racikan bumbu rahasia dapur, potongan bakso, sayuran segar, dan telur.",
        thumbnail: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=500",
        stok: "Habis"
    }
};

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook untuk mengaktifkan tombol kembali
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mengambil data menu dari object lokal berdasarkan ID dari URL
        const menuDitemukan = DATA_MENU_JAMBANG[id];

        if (menuDitemukan) {
            setProduct(menuDitemukan);
            setError(null);
        } else {
            setError("Maaf, Menu Caffe Jambang dengan ID tersebut tidak ditemukan.");
        }
        setLoading(false);
    }, [id]);

    // Tampilan jika Menu Tidak Ditemukan atau Error
    if (error) {
        return (
            <div className="p-6 text-center text-red-500 bg-zinc-900 min-h-screen flex flex-col items-center justify-center">
                <p className="font-semibold text-lg bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/20">{error}</p>
                <button 
                    onClick={() => navigate("/products")} 
                    className="mt-6 px-4 py-2 bg-amber-500 text-zinc-900 font-medium rounded-xl hover:bg-amber-400 transition"
                >
                    ← Kembali ke Daftar Menu
                </button>
            </div>
        );
    }

    // Tampilan ketika data masih loading/dimuat
    if (loading) {
        return (
            <div className="p-6 text-center text-zinc-400 bg-zinc-900 min-h-screen flex items-center justify-center">
                <div className="animate-pulse font-medium text-amber-500 text-lg">Memuat Menu Caffe Jambang...</div>
            </div>
        );
    }

    // Tampilan Utama Detail Menu (Desain Tema Gelap Khas Kedai Kopi Modern)
    return (
        <div className="p-6 bg-zinc-900 text-white min-h-screen flex flex-col items-center">
            
            {/* Tombol Navigasi Kembali */}
            <div className="w-full max-w-lg text-left mb-4">
                <button 
                    onClick={() => navigate("/products")} 
                    className="text-sm text-amber-500 hover:text-amber-400 font-medium transition-colors flex items-center gap-1"
                >
                    ← Kembali ke Halaman Produk
                </button>
            </div>

            {/* Card Utama Detail Menu */}
            <div className="w-full max-w-lg bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden border border-zinc-700/60">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-64 object-cover border-b border-zinc-700/60"
                />
                
                <div className="p-6">
                    {/* Badge Kategori Menu */}
                    <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-md border border-amber-500/20">
                        {product.category}
                    </span>
                    
                    {/* Judul & Brand */}
                    <h2 className="text-2xl font-bold mt-3 text-zinc-100">{product.title}</h2>
                    <p className="text-xs text-zinc-500 mb-3">Dibuat oleh: {product.brand}</p>
                    
                    {/* Deskripsi Produk */}
                    <p className="text-zinc-400 text-sm mb-5 leading-relaxed bg-zinc-900/40 p-3 rounded-xl border border-zinc-700/30">
                        {product.description}
                    </p>

                    {/* Info Harga dan Status Stok */}
                    <div className="border-t border-zinc-700/60 pt-4 mt-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium">Harga Menu</p>
                            <p className="text-2xl font-black text-amber-500 mt-0.5">
                                Rp {product.price.toLocaleString("id-ID")}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium">Status Ketersediaan</p>
                            <p className={`text-sm font-semibold mt-1 px-3 py-1 rounded-full ${
                                product.stok === 'Tersedia' 
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                                {product.stok}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}