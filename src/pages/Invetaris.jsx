export default function Inventaris() {
    return (
        <div className="flex-1 p-10 bg-[#121212] min-h-screen font-instrument">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-white uppercase tracking-widest">Inventory Management</h2>
                <button className="bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase">+ Restock Entry</button>
            </div>
            <div className="bg-[#1A1A1A] rounded-[32px] border border-[#222] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#222]">
                        <tr className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                            <th className="p-6">Ingredient</th>
                            <th className="p-6">In Stock</th>
                            <th className="p-6">Unit</th>
                            <th className="p-6">Last Restock</th>
                        </tr>
                    </thead>
                    <tbody className="text-white text-sm">
                        <tr className="border-b border-[#222]">
                            <td className="p-6 font-bold">Espresso Beans</td>
                            <td className="p-6">4.500</td>
                            <td className="p-6 text-gray-500">Gram</td>
                            <td className="p-6 text-gray-500">Today, 09:00 AM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}