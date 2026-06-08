import {
    RiDashboardLine,
    RiTeamLine,
    RiUser3Line,
    RiFileChartLine,
    RiLogoutBoxRLine
} from "react-icons/ri";

import { MdFastfood } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logoJambang from "../assets/logo.png";

export default function Sidebar({ userRole = "staff", onLogout }) {

    const menuClass = ({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
            isActive
                ? "bg-[#2D2D2D] text-white font-bold shadow-lg shadow-black/20 border border-[#333]"
                : "text-gray-400 hover:text-white hover:bg-[#252525]"
        }`;

    const MenuItem = ({ icon: Icon, label, to }) => (
        <li>
            <NavLink
                id={`menu-${label.toLowerCase().replace(/\s/g, '-')}`}
                to={to}
                className={menuClass}
            >
                <Icon size={22} />
                <span className="text-sm tracking-tight">{label}</span>
            </NavLink>
        </li>
    );

    return (
        <aside
            id="sidebar-container"
            className="w-64 min-h-screen bg-[#1A1A1A] border-r border-[#2D2D2D] p-8 flex flex-col sticky top-0 shadow-2xl font-instrument"
        >

            {/* Bagian Logo */}
            <div
                id="sidebar-logo-section"
                className="flex flex-col items-center mb-10 px-2"
            >
                <img
                    src={logoJambang}
                    alt="Logo Jambang"
                    className="w-full object-contain filter brightness-110"
                />
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#333] to-transparent mt-6"></div>
            </div>

            {/* Navigasi Menu */}
            <nav id="sidebar-navigation" className="flex-1">
                <ul className="space-y-2">

                    {/* Semua Role */}
                    <MenuItem
                        icon={RiDashboardLine}
                        label="Dashboard"
                        to="/"
                    />

                    <MenuItem
                        icon={MdFastfood}
                        label="Products"
                        to="/products"
                    />

                    {/* Menu Staff */}
                    {userRole === "staff" && (
                        <>
                            <MenuItem
                                icon={RiTeamLine}
                                label="Inventaris"
                                to="/inventaris"
                            />

                            <MenuItem
                                icon={RiUser3Line}
                                label="Kasir POS"
                                to="/kasir"
                            />
                        </>
                    )}

                    {/* Menu Admin */}
                    {userRole === "admin" && (
                        <>
                            <MenuItem
                                icon={RiFileChartLine}
                                label="Laporan"
                                to="/laporan"
                            />
                        </>
                    )}

                </ul>
            </nav>

            {/* Footer */}
            <div
                id="sidebar-footer"
                className="mt-auto bg-[#252525] p-5 rounded-[24px] relative overflow-hidden border border-[#333]"
            >
                <p className="text-[10px] text-center font-bold text-gray-400 mb-3 uppercase tracking-widest">
                    Role: {userRole}
                </p>

                <button
                    onClick={onLogout}
                    className="w-full bg-[#EF4444] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-red-600 active:scale-95 transition-all"
                >
                    <RiLogoutBoxRLine size={16} />
                    Keluar Sistem
                </button>
            </div>

        </aside>
    );
}