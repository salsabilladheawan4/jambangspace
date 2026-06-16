import { FiSearch, FiBell } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";

export default function Header({ userRole = "staff", userName = "User" }) {
    return (
        <header id="main-header" className="h-20 flex justify-between items-center px-10 bg-[#faf6f1] border-b border-[#e8dfd4] font-instrument">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-[#3d2817]">
                    {userRole === "admin" ? "Management Center" : "Staff Workspace"}
                </h1>
                <p className="text-sm text-[#6b5344] font-medium">
                    {userRole === "admin" ? "Monitoring revenue and stock logs real-time" : "Logged in as barista"}
                </p>
            </div>

            <div className="flex items-center gap-8">
                {/* Search & Notification Icons */}
                <div className="flex items-center gap-6 text-[#6b5344]">
                    <FiSearch size={22} className="cursor-pointer hover:text-[#c97b4b] transition-colors" />
                    <div className="relative cursor-pointer hover:text-[#c97b4b] group">
                        <FiBell size={22} />
                    </div>
                </div>

                {/* Profil Info User */}
                <div className="flex items-center gap-3 pl-6 border-l border-[#e8dfd4] cursor-pointer group">
                    <div className="text-right">
                        <p className="text-xs font-bold text-[#3d2817] leading-none">{userName}</p>
                        <p className="text-[10px] font-medium text-[#c97b4b] uppercase tracking-wider mt-1">{userRole}</p>
                    </div>
                    <img
                        src={userRole === "admin" ? "https://avatar.iran.liara.run/public/boy" : "https://avatar.iran.liara.run/public/girl"}
                        className="w-10 h-10 rounded-full border-2 border-[#e8dfd4] shadow-sm object-cover transition-transform group-hover:scale-105"
                        alt="User Avatar"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.src = "https://avatar.iran.liara.run/public/6";
                        }}
                    />
                    <RiArrowDownSLine className="text-[#6b5344] group-hover:text-[#c97b4b]" />
                </div>
            </div>
        </header>
    );
}