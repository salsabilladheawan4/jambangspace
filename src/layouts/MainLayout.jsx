import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';

export default function MainLayout({ userRole, userName }) {
  const location = useLocation();
  const isKasir = location.pathname === '/kasir';

  let activeMenu = 'Home';
  if (location.pathname.includes('/products')) activeMenu = 'Menu';
  if (location.pathname.includes('/kasir')) activeMenu = 'Kasir POS';
  if (location.pathname.includes('/inventaris')) activeMenu = 'Inventaris';
  if (location.pathname.includes('/laporan')) activeMenu = 'Laporan';
  if (location.pathname.includes('/resep')) activeMenu = 'Resep';

  return (
    <div className="flex flex-col h-screen bg-[#F8F1E7] font-sans overflow-hidden">
      <TopNavbar activeItem={activeMenu} userRole={userRole || 'staff'} userName={userName} />

      <main className="flex-1 overflow-y-auto px-6 pb-6 relative z-0">
        <Outlet />
      </main>
    </div>
  );
}