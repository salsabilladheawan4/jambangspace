import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';

export default function MainLayout({ userRole, userName }) {
  const location = useLocation();
  
  // Cek apakah ini halaman Kasir POS
  const isKasir = location.pathname === '/kasir';

  // Menentukan menu yang aktif (highlight) di Sidebar berdasarkan URL saat ini
  let activeMenu = 'Dashboard';
  if (location.pathname.includes('/products')) activeMenu = 'Menu';
  if (location.pathname.includes('/kasir')) activeMenu = 'Kasir POS';
  if (location.pathname.includes('/inventaris')) activeMenu = 'Inventaris';
  if (location.pathname.includes('/laporan')) activeMenu = 'Laporan';

  return (
    <div className="flex h-screen bg-[#faf8f6] font-sans">
      
      {/* SIDEBAR KIRI */}
      <Sidebar activeItem={activeMenu} userRole={userRole} />

      {/* AREA KONTEN KANAN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER ATAS (Global)
            Kita sembunyikan header ini KHUSUS di halaman Kasir (!isKasir) 
            Karena halaman kasir punya tempat profilnya sendiri di panel tagihan kanan 
        */}
        {!isKasir && (
          <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-end px-8 flex-shrink-0 shadow-sm z-10">
            <ProfileDropdown 
              userName={userName} 
              userRole={userRole?.toLowerCase() === 'admin' ? 'Owner / Admin' : 'Staff Kafe'} 
            />
          </header>
        )}

        {/* AREA HALAMAN UTAMA (Dashboard, Products, Kasir, dll akan muncul di sini) */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
}