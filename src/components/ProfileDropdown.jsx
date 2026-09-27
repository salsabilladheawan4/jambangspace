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
  };

  return (
    <div className="flex flex-row items-center justify-center gap-3 relative font-sans w-full px-1" ref={dropdownRef}>
      
    </div>
  );
}