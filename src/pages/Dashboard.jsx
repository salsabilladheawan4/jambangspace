import PageHeader from "../components/PageHeader";

const StatCard = ({ label, value, color, bgColor }) => (
    <div className={`${bgColor} p-8 rounded-[32px] text-center border border-white shadow-sm`}>
        <h1 className={`text-3xl font-black ${color} tracking-tighter`}>{value}</h1>
        <p className="text-[10px] font-bold text-gray-400 uppercase mt-2 tracking-wider">{label}</p>
    </div>
);

export default function Dashboard() {
    return (
        <div className="flex-1 p-10 flex flex-col lg:flex-row gap-10">
            {/* Left Content Area */}
            <div className="flex-1 space-y-8">
                <PageHeader title="Teams Strength" />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Bar Chart Section */}
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
                        <div className="flex justify-between mb-10 items-center">
                            <h4 className="font-bold">Strength Analysis</h4>
                            <span className="text-[10px] font-bold text-[var(--color-primary)] cursor-pointer">Weekly</span>
                        </div>
                        <div className="flex items-end justify-around h-40 px-4">
                            <div className="w-10 bg-orange-100 rounded-t-xl h-[45%]"></div>
                            <div className="w-10 bg-orange-400 rounded-t-xl h-[75%] shadow-lg shadow-orange-50"></div>
                            <div className="w-10 bg-cyan-400 rounded-t-xl h-[55%]"></div>
                            <div className="w-10 bg-[var(--color-primary)] rounded-t-xl h-[95%] shadow-lg shadow-indigo-50"></div>
                        </div>
                    </div>

                    {/* Donut Chart Section */}
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-50 flex items-center justify-between">
                        <div className="space-y-4">
                            <h4 className="font-bold mb-4">Employees</h4>
                            <div><p className="text-[10px] font-bold text-gray-400 uppercase">Active</p><p className="text-xl font-black">3,000</p></div>
                            <div className="pt-4 border-t border-gray-50"><p className="text-[10px] font-bold text-[var(--color-primary)] uppercase">Total</p><p className="text-xl font-black">3,254</p></div>
                        </div>
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="54" stroke="#F0EEFF" strokeWidth="12" fill="transparent" />
                                <circle cx="64" cy="64" r="54" stroke="#7367F0" strokeWidth="12" fill="transparent" strokeDasharray="339" strokeDashoffset="100" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <img src="https://avatar.iran.liara.run/public/6" className="w-12 h-12 rounded-full border-2 border-white shadow-md" alt="av" />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Project Area Placeholder */}
                <div className="bg-white p-10 rounded-[32px] border border-gray-50 flex-1 flex items-center justify-center border-dashed">
                    <p className="text-gray-300 font-bold uppercase tracking-widest text-xs">Project Performance View</p>
                </div>
            </div>

            {/* Right Panel Area */}
            <div className="w-full lg:w-80 space-y-8">
                <div className="space-y-4">
                    <StatCard label="Position in Dribbble" value="Top 10" color="text-orange-500" bgColor="bg-orange-50" />
                    <StatCard label="New Onboarded" value="26" color="text-[var(--color-primary)]" bgColor="bg-[var(--color-primary-light)]" />
                    <StatCard label="Clients Approached" value="500" color="text-cyan-500" bgColor="bg-cyan-50" />
                </div>
                
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
                    <h4 className="font-bold text-sm mb-6">Recent Alerts</h4>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0"></div>
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-[10px] font-bold">User {i} <span className="text-gray-400 font-medium">joined team</span></p>
                                    <p className="text-[8px] text-gray-300 font-bold uppercase">2 mins ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}