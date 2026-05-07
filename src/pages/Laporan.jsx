export default function Laporan() {
    return (
        <div className="flex-1 p-10 bg-[#121212] min-h-screen">
            <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-widest">Shift-Based Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-[#222]">
                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Shift Pagi (08:00 - 15:00)</p>
                    <h3 className="text-2xl font-black text-white tracking-tighter">Rp 1.120.000</h3>
                    <p className="text-[10px] text-green-500 font-bold mt-2">↑ 12% dari kemarin</p>
                </div>
                <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-[#222]">
                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Shift Sore (15:00 - 22:00)</p>
                    <h3 className="text-2xl font-black text-white tracking-tighter">Rp 1.280.000</h3>
                    <p className="text-[10px] text-green-500 font-bold mt-2">↑ 08% dari kemarin</p>
                </div>
            </div>
        </div>
    );
}