import { FiSearch, FiBell } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";

export default function Header() {
    return (
        <header id="main-header" className="h-20 flex justify-between items-center px-10 bg-transparent border-b border-[#2D2D2D]">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Inventory Monitor</h1>
                <p className="text-sm text-gray-500 font-medium">Monitoring stock levels real-time</p>
            </div>

            <div className="flex items-center gap-8">
                <div className="flex items-center gap-6 text-gray-400">
                    <FiSearch size={22} className="cursor-pointer hover:text-white transition-colors" />
                    <div className="relative cursor-pointer hover:text-white group">
                        <FiBell size={22} />
                        <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full border-2 border-[#121212]"></span>
                    </div>
                </div>

                <div className="flex items-center gap-3 pl-6 border-l border-[#2D2D2D] cursor-pointer group">
                    <img src="https://avatar.iran.liara.run/public/girl" className="w-10 h-10 rounded-full border-2 border-[#333] shadow-sm transition-transform group-hover:scale-105" alt="user" />
                    <RiArrowDownSLine className="text-gray-500 group-hover:text-white" />
                </div>
            </div>
        </header>
    );
}