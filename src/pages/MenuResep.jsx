export default function Resep() {
    return (
        <div className="flex-1 p-10 bg-[#121212] min-h-screen">
            <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-widest">Digital Recipe Mapping</h2>
            <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-[#222] space-y-6">
                <div className="flex justify-between items-center border-b border-[#222] pb-4">
                    <h4 className="font-bold text-white">Menu: Caffe Latte</h4>
                    <span className="text-[10px] text-gray-500">ID: REC-001</span>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Espresso Beans</span>
                        <span className="text-white font-bold">18 Gram</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Fresh Milk</span>
                        <span className="text-white font-bold">150 ML</span>
                    </div>
                </div>
            </div>
        </div>
    );
}