import { RiDashboardLine, RiTeamLine, RiUser3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
/* Pastikan path import sesuai dengan folder assets kamu */
import logoJambang from "../assets/logo.png";

export default function Sidebar() {

    /* Fungsi untuk mengatur styling menu saat aktif maupun tidak aktif[cite: 12, 16] */
    const menuClass = ({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
            isActive
                ? "bg-[#2D2D2D] text-white font-bold shadow-lg shadow-black/20 border border-[#333]"
                : "text-gray-400 hover:text-white hover:bg-[#252525]"
        }`;

    /* Komponen pembungkus untuk tiap item menu[cite: 12, 16] */
    const MenuItem = ({ icon: Icon, label, to }) => (
        <li>
            <NavLink id={`menu-${label.toLowerCase().replace(/\s/g, '-')}`} to={to} className={menuClass}>
                <Icon size={22} />
                <span className="text-sm tracking-tight">{label}</span>
            </NavLink>
        </li>
    );

    return (
        <aside id="sidebar-container" className="w-64 min-h-screen bg-[#1A1A1A] border-r border-[#2D2D2D] p-8 flex flex-col sticky top-0 shadow-2xl font-instrument">
            
            {/* Bagian Logo Jambang[cite: 14, 16] */}
            <div id="sidebar-logo-section" className="flex flex-col items-center mb-10 px-2">
                <img 
                    src={logoJambang} 
                    alt="Logo Jambang" 
                    /* w-40 digunakan untuk memperbesar tampilan logo agar lebih menonjol[cite: 14, 16] */
                    className="w-80 object-contain filter brightness-110" 
                />
                {/* Garis pemisah halus transparan ke abu-abu */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#333] to-transparent mt-6"></div>
            </div>

            {/* Navigasi Utama Berdasarkan Peran (Barista, Staf Inventaris, Owner) */}
            <nav id="sidebar-navigation" className="flex-1">
                <ul className="space-y-2">
                    {/* Akses Dashboard & Laporan untuk Owner[cite: 1] */}
                    <MenuItem icon={RiDashboardLine} label="Dashboard" to="/" />
                    
                    {/* Akses Manajemen Stok untuk Staf Inventaris[cite: 1] */}
                    <MenuItem icon={RiTeamLine} label="Inventaris" to="/inventaris" />
                    
                    {/* Akses Transaksi untuk Barista[cite: 1] */}
                    <MenuItem icon={RiUser3Line} label="Kasir POS" to="/kasir" />

                      {/* Akses Transaksi untuk Barista[cite: 1] */}
                    <MenuItem icon={RiUser3Line} label="Laporan" to="/laporan" />

                      {/* Akses Transaksi untuk Barista[cite: 1] */}
                    <MenuItem icon={RiUser3Line} label="Menu & Resep" to="/menuresep" />

                </ul>
            </nav>

            {/* Bagian Bawah: Support System / Bantuan[cite: 1, 14, 16] */}
            <div id="sidebar-footer" className="mt-auto bg-[#252525] p-6 rounded-[28px] relative overflow-hidden group border border-[#333]">
                {/* Efek visual lingkaran dekoratif[cite: 12, 16] */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white opacity-5 rounded-full group-hover:scale-150 transition-all duration-500"></div>

                <p className="text-[10px] text-center font-bold text-gray-400 mb-3 relative z-10 uppercase tracking-widest">
                    Support System
                </p>

                <button id="btn-contact-owner" className="w-full bg-[#333] text-white py-2.5 rounded-xl font-bold text-[10px] shadow-sm hover:bg-[#444] transition-all relative z-10 border border-[#555]">
                    Contact Owner
                </button>
            </div>
        </aside>
    );
}