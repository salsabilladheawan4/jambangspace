export default function Invetaris() {
    return (
        <div className="flex-1 p-10 bg-[#121212] min-h-screen font-instrument text-white">
            <div className="flex justify-between items-center mb-10">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black uppercase tracking-widest">Input Stok Harian</h2>
                    <p className="text-sm text-gray-500 italic">Pintu masuk stok untuk operasional kasir</p>
                </div>
                <button className="bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all shadow-lg">
                    + Input Restock Entry
                </button>
            </div>

            <div className="bg-[#1A1A1A] rounded-[32px] border border-[#222] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#222]">
                        <tr className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            <th className="p-6">Nama Bahan Baku</th>
                            <th className="p-6">Stok Tersedia</th>
                            <th className="p-6">Satuan</th>
                            <th className="p-6">Update Terakhir</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                        <tr className="border-b border-[#222] hover:bg-[#222]/50 transition-colors">
                            <td className="p-6 font-bold">Espresso Beans (Jambang Blend)</td>
                            <td className="p-6">4.500</td>
                            <td className="p-6 text-gray-500 uppercase">Gram</td>
                            <td className="p-6 text-gray-400 italic">Hari ini, 09:15 AM</td>
                        </tr>
                        <tr className="border-b border-[#222] hover:bg-[#222]/50 transition-colors">
                            <td className="p-6 font-bold">Fresh Milk (Full Cream)</td>
                            <td className="p-6">12.000</td>
                            <td className="p-6 text-gray-500 uppercase">Mililiter</td>
                            <td className="p-6 text-gray-400 italic">Hari ini, 10:00 AM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}