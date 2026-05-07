import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212]">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md border border-gray-100">
                <div className="flex flex-col items-center justify-center mb-8">
                    <h1 className="text-3xl font-instrument font-black text-gray-900 tracking-tighter uppercase">
                        Jambang<span className="text-gray-400">.</span>
                    </h1>
                    <p className="text-[10px] font-bold text-gray-400 tracking-[3px] uppercase mt-2">Inventory System</p>
                </div>

                <Outlet/>

                <p className="text-center text-[10px] font-bold text-gray-500 mt-8 uppercase tracking-widest opacity-40">
                    © 2026 Jambang Management. All rights reserved.
                </p>
            </div>
        </div>
    )
}