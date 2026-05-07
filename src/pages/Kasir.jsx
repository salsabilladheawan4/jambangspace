export default function Kasir() {
    const menus = [
        { id: 1, name: "Caffe Latte", price: "25k", status: "Available" },
        { id: 2, name: "Es Kopi Susu", price: "20k", status: "Sold Out" },
    ];

    return (
        <div className="flex-1 p-10 bg-[#121212] min-h-screen">
            <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-widest">Point of Sale</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {menus.map(menu => (
                    <div key={menu.id} className={`p-6 rounded-[28px] border ${menu.status === "Sold Out" ? "border-red-900 bg-red-950/20" : "border-[#222] bg-[#1A1A1A]"} transition-all`}>
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="font-bold text-white">{menu.name}</h4>
                            <span className={`text-[9px] font-bold px-2 py-1 rounded-md ${menu.status === "Sold Out" ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"}`}>
                                {menu.status}
                            </span>
                        </div>
                        <p className="text-xl font-black text-white mb-4">{menu.price}</p>
                        <button disabled={menu.status === "Sold Out"} className="w-full py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-20">
                            Add to Order
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}