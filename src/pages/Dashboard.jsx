import PageHeader from "../components/PageHeader";

const StatCard = ({ label, value, color, bgColor }) => (
    <div className={`${bgColor} p-8 rounded-[32px] border border-[#222] shadow-xl transition-all hover:border-gray-700`}>
        <h1 className={`text-3xl font-black ${color} tracking-tighter`}>{value}</h1>
        <p className="text-[10px] font-bold text-gray-500 uppercase mt-2 tracking-wider">{label}</p>
    </div>
);

export default function Dashboard() {
    return (
        <div className="flex-1 p-10 bg-[#121212] min-h-screen font-instrument">
            <PageHeader title="Owner Dashboard" />
            
            <div className="flex flex-col lg:flex-row gap-10 mt-4">
                <div className="flex-1 space-y-8">
                    {/* Time-Based Analytics: Perbandingan Penjualan antar Shift */}
                    <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-[#222]">
                        <h4 className="font-bold text-white mb-10 uppercase tracking-widest text-xs">Shift-Based Sales Trends</h4>
                        <div className="flex items-end justify-around h-48 px-4 gap-6">
                            <div className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full bg-[#2D2D2D] rounded-t-xl h-[45%]"></div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase">Shift Pagi</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full bg-white rounded-t-xl h-[95%] shadow-lg shadow-white/10"></div>
                                <span className="text-[10px] text-white font-bold uppercase">Shift Sore</span>
                            </div>
                        </div>
                    </div>

                    {/* Status Validasi Stok Real-time */}
                    <div className="bg-[#1A1A1A] p-8 rounded-[32px] border border-[#222] flex items-center justify-between">
                        <div className="space-y-4">
                            <h4 className="font-bold text-white text-sm uppercase tracking-widest">Inventory Integrity</h4>
                            <p className="text-xl font-black text-white">98.5% <span className="text-[10px] text-green-500 font-bold ml-2">DATA SYNCED</span></p>
                        </div>
                        <div className="w-24 h-24 border-[10px] border-[#222] border-t-white rounded-full flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">VALID</span>
                        </div>
                    </div>
                </div>

                {/* Kolom Alert Smart Procurement untuk Staf */}
                <div className="w-full lg:w-80 space-y-4">
                    <StatCard label="Low Stock Alert (Critical)" value="03 Items" color="text-red-500" bgColor="bg-[#1A1A1A]" />
                    <StatCard label="Recommended Buy (Evening Shift)" value="Susu, Kopi" color="text-yellow-500" bgColor="bg-[#1A1A1A]" />
                    <StatCard label="Automated Sales Recap" value="Rp 2.4M" color="text-white" bgColor="bg-[#1A1A1A]" />
                </div>
            </div>
        </div>
    );
}