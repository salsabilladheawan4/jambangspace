export default function Kasir() {
    const menus = [
        { id: 1, name: "Caffe Latte", price: "25k", status: "Available", stock: "High" },
        { id: 2, name: "Es Kopi Susu Jambang", price: "20k", status: "Sold Out", stock: "Empty" },
        { id: 3, name: "Americano", price: "18k", status: "Available", stock: "Medium" },
    ];

    return (
        <div className="flex-1 p-10 bg-[#121212] min-h-screen font-instrument">
            <h2 className="text-2xl font-black text-white mb-10 uppercase tracking-widest">Kasir Operasional</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {menus.map(menu => (
                    <div key={menu.id} className={`p-8 rounded-[35px] border ${menu.status === "Sold Out" ? "border-red-900 bg-red-950/10 opacity-60" : "border-[#222] bg-[#1A1A1A]"} transition-all group`}>
                        <div className="flex justify-between items-start mb-6">
                            <h4 className="font-bold text-white text-lg">{menu.name}</h4>
                            <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg tracking-widest uppercase ${menu.status === "Sold Out" ? "bg-red-500 text-white" : "bg-gray-800 text-gray-400"}`}>
                                {menu.status}
                            </span>
                        </div>
                        <div className="flex justify-between items-end mb-6">
                            <p className="text-2xl font-black text-white">{menu.price}</p>
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">Automated Deduction Sync</p>
                        </div>
                        <button 
                            disabled={menu.status === "Sold Out"} 
                            className="w-full py-4 bg-white text-black rounded-2xl font-black text-[11px] uppercase tracking-[3px] shadow-lg hover:bg-gray-200 transition-all disabled:opacity-10 active:scale-95"
                        >
                            Konfirmasi Pesanan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}