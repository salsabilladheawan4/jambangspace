import React from 'react';
import { FiBell } from "react-icons/fi";
import ProfileDropdown from './ProfileDropdown';

export default function Header({ userRole = "staff", userName = "User" }) {
  return (
    <header className="h-20 flex justify-between items-center px-6 md:px-10 bg-[#fdfdfd] border-b border-gray-100 font-sans sticky top-0 z-40">
      {/* Bagian Kiri: Identitas Halaman */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* Bagian Kanan: Search, Notifikasi & Profil */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm w-64">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input type="text" placeholder="Search..." className="ml-3 bg-transparent text-sm text-gray-600 focus:outline-none w-full" />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="pl-4">
            <ProfileDropdown userName={userName} userRole={userRole} />
          </div>
        </div>
      </div>
    </header>
  );
}