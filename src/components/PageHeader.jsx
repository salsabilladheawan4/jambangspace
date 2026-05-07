export default function PageHeader({ title = "Dashboard" }) {
  return (
    <div className="flex items-center justify-between py-6">
      <div className="flex flex-col">
        <h2 className="text-xl font-extrabold tracking-tight text-white">{title}</h2>
        <div className="flex items-center gap-2 mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <span className="hover:text-white cursor-pointer transition-colors">Admin</span>
          <span className="opacity-40">/</span>
          <span className="text-gray-400">{title}</span>
        </div>
      </div>
      
      <button className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-gray-200 active:scale-95 transition-all uppercase tracking-widest">
        + Add Stock Entry
      </button>
    </div>
  );
}