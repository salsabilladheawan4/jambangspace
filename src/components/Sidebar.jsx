import {
  RiDashboardLine,
  RiTeamLine,
  RiUser3Line,
  RiFileChartLine,
  RiLogoutBoxRLine,
} from 'react-icons/ri';
import { MdFastfood } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ userRole = '', onLogout }) {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
      isActive
        ? 'bg-[#c97b4b] text-white font-bold shadow-md shadow-[#c97b4b]/20'
        : 'text-[#6b5344] hover:text-[#3d2817] hover:bg-[#e8dfd4]'
    }`;

  const MenuItem = ({ icon: Icon, label, to }) => (
    <li>
      <NavLink to={to} className={menuClass}>
        <Icon size={22} />
        <span className="text-sm tracking-tight">{label}</span>
      </NavLink>
    </li>
  );

  // Mencegah error jika huruf besar/kecil di localStorage berbeda
  const roleAktif = userRole?.toLowerCase() || '';

  return (
    <aside className="w-64 min-h-screen bg-[#faf6f1] border-r border-[#e8dfd4] p-6 flex flex-col sticky top-0 font-instrument">
      
      {/* Logo Area */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="text-3xl">☕</div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#3d2817]" style={{ fontFamily: "'Georgia', serif" }}>
            Jambang<span className="text-[#c97b4b]">.</span>
          </h1>
          <p className="text-[10px] text-[#8b6f47] font-bold tracking-[0.2em] uppercase mt-0.5">Workspace</p>
        </div>
      </div>

      {/* Navigasi Sangat Ketat Sesuai Folder */}
      <nav className="flex-1">
        <ul className="space-y-2">
          
          {/* ========================================= */}
          {/* FOLDER ADMIN (HANYA MUNCUL 2 FILE INI)    */}
          {/* ========================================= */}
          {roleAktif === 'admin' && (
            <>
              <MenuItem icon={RiDashboardLine} label="Dashboard" to="/dashboard" />
              <MenuItem icon={RiFileChartLine} label="Laporan" to="/laporan" />
            </>
          )}

          {/* ========================================= */}
          {/* FOLDER STAFF (HANYA MUNCUL FILE STAFF)    */}
          {/* ========================================= */}
          {roleAktif === 'staff' && (
            <>
              <MenuItem icon={RiDashboardLine} label="Dashboard" to="/dashboard" />
              <MenuItem icon={MdFastfood} label="Products" to="/products" />
              <MenuItem icon={RiTeamLine} label="Inventaris" to="/inventaris" />
              <MenuItem icon={RiUser3Line} label="Kasir POS" to="/kasir" />
            </>
          )}

        </ul>
      </nav>

      {/* Footer Sidebar & Pengecekan Error */}
      <div className="mt-auto bg-white p-5 rounded-[24px] relative border border-[#e8dfd4] shadow-sm">
        
        {/* Jika muncul "TIDAK TERBACA", berarti App.jsx gagal mengirim role */}
        <p className="text-[10px] text-center font-bold text-[#6b5344] mb-3 uppercase tracking-widest">
          Role: {roleAktif || 'TIDAK TERBACA'}
        </p>

        <button
          onClick={onLogout}
          className="w-full bg-[#3d2817] hover:bg-[#c97b4b] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <RiLogoutBoxRLine size={16} />
          LOGOUT
        </button>
      </div>
    </aside>
  );
}