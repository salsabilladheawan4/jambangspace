// File: src/components/ProfileDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Services/supabaseClient'; // Tambahkan import supabase (sesuaikan path '../' atau '../../' jika error)

export default function ProfileDropdown({ userName = "User", userRole = "Staff" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [daftarStok, setDaftarStok] = useState([]); // State baru untuk menyimpan data stok dari database
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // 1. FUNGSI BARU: Mengambil data inventory langsung dari Supabase
  useEffect(() => {
    const fetchStokKritis = async () => {
      const { data, error } = await supabase.from('inventory').select('*');
      if (!error && data) {
        setDaftarStok(data);
      }
    };

    // Panggil fungsi saat komponen dimuat
    fetchStokKritis();
  }, [isNotifOpen]); // Data akan di-refresh ulang setiap kali Anda menekan lonceng notifikasi!

  // 2. Filter barang yang stoknya di bawah 10
  const itemsKritis = daftarStok.filter(item => item.stock < 10);
  const jumlahNotifikasi = itemsKritis.length;

  // Menutup dropdown jika klik di luar area
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const toggleProfil = () => {
    setIsOpen(!isOpen);
    setIsNotifOpen(false);
  };

  const toggleNotif = () => {
    setIsNotifOpen(!isNotifOpen);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-3 relative font-sans w-full px-1" ref={dropdownRef}>
      
      {/* 1. Lonceng Notifikasi */}
      <div className="relative">
        <button 
          onClick={toggleNotif}
          className="relative text-gray-500 hover:text-[#1e293b] p-1.5 bg-white rounded-full transition-colors focus:outline-none"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          
          {jumlahNotifikasi > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
              {jumlahNotifikasi}
            </span>
          )}
        </button>

        {/* DROPDOWN NOTIFIKASI */}
        {isNotifOpen && (
          <div className="absolute left-full ml-6 bottom-0 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-[60]">
            <div className="p-4 bg-red-50 border-b border-red-100">
              <h3 className="font-bold text-red-600 text-sm">Peringatan Stok</h3>
              <p className="text-[10px] text-red-500 mt-0.5">Barang berikut hampir habis</p>
            </div>
            
            <div className="max-h-60 overflow-y-auto p-2">
              {itemsKritis.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {itemsKritis.map((item, idx) => (
                    <div key={idx} className="p-3 bg-white hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors">
                      <p className="text-xs font-bold text-[#1e293b]">{item.name}</p>
                      <p className="text-[10px] font-medium text-red-500 mt-1">
                        Sisa: {item.stock} {item.unit}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-xs text-gray-500 font-medium">Stok gudang aman terkendali.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}