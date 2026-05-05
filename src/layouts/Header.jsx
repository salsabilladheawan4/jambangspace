import { FiSearch, FiBell } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";

export default function Header() {
    return (
        <header id="main-header" className="h-20 flex justify-between items-center px-10 bg-transparent">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Good Morning Anima</h1>
                <p className="text-sm text-[var(--color-text-muted)] font-medium">Have a productive day!</p>
            </div>

            <div className="flex items-center gap-8">
                <div className="flex items-center gap-6 text-[var(--color-text-muted)]">
                    <FiSearch size={22} className="cursor-pointer hover:text-[var(--color-primary)] transition-colors" />
                    <div className="relative cursor-pointer hover:text-[var(--color-primary)] group">
                        <FiBell size={22} />
                        <span className="absolute top-0 right-0 bg-[var(--color-accent-red)] w-2 h-2 rounded-full border-2 border-[var(--color-bg-main)]"></span>
                    </div>
                </div>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer group">
                    <img src="https://avatar.iran.liara.run/public/girl" className="w-10 h-10 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-105" alt="user" />
                    <RiArrowDownSLine className="text-gray-400 group-hover:text-[var(--color-primary)]" />
                </div>
            </div>
        </header>
    );
}