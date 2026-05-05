export default function PageHeader({ title = "Dashboard" }) {
  return (
    <div className="flex items-center justify-between py-6">
      <div className="flex flex-col">
        <h2 className="text-xl font-extrabold tracking-tight">{title}</h2>
        <div className="flex items-center gap-2 mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-300">
          <span className="hover:text-[var(--color-primary)] cursor-pointer">Home</span>
          <span className="opacity-40">/</span>
          <span className="text-gray-400">{title}</span>
        </div>
      </div>
      
      <button className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:opacity-90 active:scale-95 transition-all">
        + Create New
      </button>
    </div>
  );
}