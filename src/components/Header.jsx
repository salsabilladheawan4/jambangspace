import { FiSearch, FiBell } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";

export default function Header({ userRole = "staff", userName = "User" }) {
    return (
        <header id="main-header" className="h-20 flex justify-between items-center px-10 bg-transparent border-b border-[#2D2D2D] font-instrument">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                    {userRole === "admin" ? "Management Center" : "Staff Workspace"}
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                    {userRole === "admin" ? "Monitoring revenue and stock logs real-time" : "Logged in as barista"}
                </p>
            </div>

            <div className="flex items-center gap-8">
                {/* Search & Notification Icons */}
                <div className="flex items-center gap-6 text-gray-400">
                    <FiSearch size={22} className="cursor-pointer hover:text-white transition-colors" />
                    <div className="relative cursor-pointer hover:text-white group">
                        <FiBell size={22} />
                        <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full border-2 border-[#121212]"></span>
                    </div>
                </div>

                {/* Profil Info User */}
                <div className="flex items-center gap-3 pl-6 border-l border-[#2D2D2D] cursor-pointer group">
                    <div className="text-right">
                        <p className="text-xs font-bold text-white leading-none">{userName}</p>
                        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mt-1">{userRole}</p>
                    </div>
                    <img 
                        src={userRole === "admin" ? "https://avatar.iran.liara.run/public/boy" : "https://avatar.iran.liara.run/public/girl"} 
                        className="w-10 h-10 rounded-full border-2 border-[#333] shadow-sm transition-transform group-hover:scale-105" 
                        alt="User Avatar" 
                    />
                    <RiArrowDownSLine className="text-gray-500 group-hover:text-white" />
                </div>
            </div>
        </header>
    );
}