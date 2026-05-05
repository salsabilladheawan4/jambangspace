import { RiDashboardLine, RiTeamLine, RiUser3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

    const menuClass = ({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
            isActive
                ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-dark)] hover:bg-gray-50"
        }`;

    const MenuItem = ({ icon: Icon, label, to }) => (
        <li>
            <NavLink to={to} className={menuClass}>
                <Icon size={22} />
                <span className="text-sm tracking-tight">{label}</span>
            </NavLink>
        </li>
    );

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-100 p-8 flex flex-col sticky top-0">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="w-9 h-9 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white rotate-45 shadow-lg shadow-indigo-100">
                    <span className="-rotate-45 font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-black text-[var(--color-primary)] tracking-tighter">
                    Teamify
                </span>
            </div>

            {/* Menu */}
            <nav className="flex-1">
                <ul className="space-y-2">
                    <MenuItem icon={RiDashboardLine} label="Dashboard" to="/" />
                    <MenuItem icon={RiTeamLine} label="Teams" to="/teams" />
                    <MenuItem icon={RiUser3Line} label="Employees" to="/employees" />
                </ul>
            </nav>

            {/* Feedback */}
            <div className="mt-auto bg-[var(--color-primary-light)] p-6 rounded-[28px] relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-[var(--color-primary)] opacity-5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

                <p className="text-[10px] text-center font-bold text-[var(--color-primary)] mb-3 relative z-10">
                    Any Feedback?
                </p>

                <button className="w-full bg-white text-[var(--color-primary)] py-2.5 rounded-xl font-bold text-[10px] shadow-sm hover:shadow-md active:scale-95 transition-all relative z-10">
                    Send Thoughts
                </button>
            </div>
        </aside>
    );
}