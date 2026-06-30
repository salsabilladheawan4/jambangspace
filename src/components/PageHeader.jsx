import React from "react";
import ProfileDropdown from "./ProfileDropdown";

export default function PageHeader({ title = "Dashboard", userRole = "staff", userName = "User", onActionButtonClick }) {
  return (
    <div className="flex items-center justify-between py-6 px-4 md:px-10 font-sans border-b border-gray-100 bg-[#fdfdfd]">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{title}</h2>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm w-64">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" placeholder="Search..." className="ml-3 bg-transparent text-sm text-gray-600 focus:outline-none w-full" />
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