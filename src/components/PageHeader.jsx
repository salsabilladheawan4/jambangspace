import React from "react";
import ProfileDropdown from "./ProfileDropdown";

export default function PageHeader({ title = "Dashboard", userRole = "staff", userName = "User", onActionButtonClick, searchQuery, onSearch }) {
  return (
    <div className="flex items-center justify-between py-6 px-6 md:px-10 font-sans border border-[#332218]/5 bg-white rounded-3xl shadow-sm mb-4">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold text-[#1a110c] tracking-tight">{title}</h2>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm w-64 focus-within:border-[#332218] focus-within:ring-2 focus-within:ring-[#332218]/10 transition-all">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery || ''}
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="ml-3 bg-transparent text-sm text-gray-600 focus:outline-none w-full" 
          />
        </div>

        {/* Action Button (Add Stock) */}
        {userRole === "staff" && (title === "Inventaris" || title === "Dashboard") && (
          <button 
            onClick={onActionButtonClick}
            className="bg-[#3d2817] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[#2c1d11] transition-all"
          >
            Add +
          </button>
        )}

        {/* Profile & Notifications */}
        <div className="flex items-center gap-4">
          <div className="pl-4">
            <ProfileDropdown userName={userName} userRole={userRole} />
          </div>
        </div>
      </div>
    </div>
  );
}