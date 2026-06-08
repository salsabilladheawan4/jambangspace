import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";

// DATA MENU ASLI / NYATA CAFFE JAMBANG MARPOYAN PEKANBARU
const DATA_MENU_JAMBANG = [
    { id: 1, title: "Kopi Susu Gula Aren Jambang", category: "Kopi (Coffee)", price: 18000 },
    { id: 2, title: "Matcha Latte Ice", category: "Non-Kopi (Non-Coffee)", price: 20000 },
    { id: 3, title: "Nasi Goreng Kampung Jambang", category: "Makanan Berat", price: 25000 },
    { id: 4, title: "Kentang Goreng Spesial / French Fries", category: "Cemilan (Snack)", price: 15000 },
    { id: 5, title: "Mie Goreng Sumatra", category: "Makanan Berat", price: 18000 }
];

export default function Products() {
    const breadcrumb = ["Dashboard", "Product List"];
    const { id } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {

            // 1. Logika Jika Ada ID: Mengambil data menu Jambang berdasarkan ID URL
            if (id) {
                const itemDitemukan = DATA_MENU_JAMBANG.find(item => item.id === parseInt(id));
                if (itemDitemukan) {
                    setProducts([itemDitemukan]);
                    setError(null);
                } else {
                    setError("Menu Caffe Jambang tidak ditemukan.");
                }
                return;
            }

            // 2. Logika Tanpa ID: Fitur Pencarian / Filter Berdasarkan Ketikan Input (Query)
            // Di sini kita tidak menembak dummyjson lagi, tapi langsung memfilter data Caffe Jambang
            const hasilFilter = DATA_MENU_JAMBANG.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            
            setProducts(hasilFilter);
            setError(null);

        }, 500);

        return () => clearTimeout(timeout);
    }, [query, id]);

    const errorInfo = error ? (
        <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
            <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
            {error}
        </div>
    ) : null;

    return (
        <div className="p-6">
            <PageHeader
                title="Product List"
                breadcrumb={breadcrumb}
            />

            {errorInfo}

            {!id && (
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari menu Caffe Jambang..."
                    className="mb-4 p-3 w-full bg-white rounded-2xl shadow-lg border border-gray-100"
                />
            )}

            <div className="overflow-x-auto mt-6">
                <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-2xl shadow-lg">
                    <thead>
                        <tr className="bg-emerald-600 text-white text-left text-sm font-semibold">
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Price</th>
                            {/* KOLOM VENDOR / KITCHEN SUDAH DIHAPUS SESUAI PERMINTAAN */}
                            <th className="px-4 py-3 text-center w-28">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
                        {products.map((item, index) => (
                            <tr
                                key={item.id}
                                className="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-700">
                                    {index + 1}
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {item.title}
                                </td>

                                <td className="px-6 py-4 text-gray-500">
                                    {item.category}
                                </td>

                                <td className="px-6 py-4 font-semibold text-emerald-600">
                                    Rp {item.price.toLocaleString("id-ID")}
                                </td>

                                {/* KOLOM DATA BRAND/VENDOR SUDAH DIHAPUS DARI SINI */}

                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => navigate(`/products/${item.id}`)}
                                        className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-md hover:bg-emerald-500 transition shadow"
                                    >
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}