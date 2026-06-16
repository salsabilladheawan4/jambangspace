// File: src/components/ProfileDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileDropdown({ userName = "M. Dzakwan Syafiq", userRole = "Member Silver" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Menutup dropdown jika klik di luar area
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ambil inisial nama (Misal: M. Dzakwan -> MD)
  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(' ');
    if (names.length >= 2) return (names[0][0] + names[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; 
  };

  return (
    <div className="flex items-center gap-3 relative font-sans" ref={dropdownRef}>
      
      {/* 1. Badge Poin */}
      <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f97316" stroke="#f97316">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <span className="font-bold text-[#1e293b] text-xs">120 pt</span>
      </div>

      {/* 2. Lonceng Notifikasi */}
      <button className="text-gray-500 hover:text-[#1e293b] p-1.5 bg-white rounded-full transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          <circle cx="18" cy="6" r="3" fill="#ef4444" stroke="#ef4444" /> {/* Indikator merah */}
        </svg>
      </button>

      {/* 3. Tombol Profil (Inisial) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-full p-1 pr-2 shadow-sm hover:bg-gray-50 transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-xs font-bold">
          {getInitials(userName)}
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* 4. Isi Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">
          <div className="p-3">
            
            {/* Header Nama di Dropdown */}
            <div className="bg-[#f8fafc] rounded-xl p-3 mb-2">
              <h3 className="font-bold text-[#0f172a] text-sm truncate">{userName}</h3>
              <p className="text-[#64748b] font-medium text-[10px] mt-0.5">{userRole}</p>
            </div>

            {/* Menu Dropdown */}
            <div className="flex flex-col gap-1">
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[#334155] transition-colors text-xs font-bold text-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Kelola Profil
              </button>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-red-50 text-[#ef4444] transition-colors text-xs font-bold text-left"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Keluar Akses
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}