import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#faf6f1]">
            <div className="bg-white p-10 rounded-[40px] shadow-sm w-full max-w-md border border-[#e8dfd4]">
                <div className="flex flex-col items-center justify-center mb-8">
                    <h1 className="text-3xl font-instrument font-black text-[#3d2817] tracking-tighter uppercase" style={{ fontFamily: "'Georgia', serif" }}>
                        Jambang<span className="text-[#c97b4b]">.</span>
                    </h1>
                    <p className="text-[10px] font-bold text-[#6b5344] tracking-[3px] uppercase mt-2">Inventory System</p>
                </div>

                <Outlet/>

                <p className="text-center text-[10px] font-bold text-[#c4b5a0] mt-8 uppercase tracking-widest opacity-80">
                    © 2026 Jambang Management. All rights reserved.
                </p>
            </div>
        </div>
    )
}