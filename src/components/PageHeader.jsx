import React from "react";

export default function PageHeader({ title = "Dashboard", userRole = "staff", onActionButtonClick }) {
  return (
    <div className="flex items-center justify-between py-6 font-instrument">
      <div className="flex flex-col">
        <h2 className="text-xl font-extrabold tracking-tight text-[#3d2817]">{title}</h2>
        <div className="flex items-center gap-2 mt-1 text-[10px] font-bold uppercase tracking-widest text-[#6b5344]">
          <span className="text-[#c97b4b] capitalize">{userRole}</span>
          <span className="opacity-40 text-[#6b5344]">/</span>
          <span className="text-[#6b5344]">{title}</span>
        </div>
      </div>
      
      {/* Tombol aksi pengadaan barang hanya muncul di workspace Staff */}
      {userRole === "staff" && (title === "Inventaris" || title === "Dashboard") && (
        <button 
          onClick={onActionButtonClick}
          className="bg-[#c97b4b] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-[#b8683f] active:scale-95 transition-all uppercase tracking-widest"
        >
          + Add Stock Entry
        </button>
      )}
    </div>
  );
}