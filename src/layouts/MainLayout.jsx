import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProfileDropdown from '../components/ProfileDropdown';

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
    <div className="flex h-screen bg-[#faf8f6] font-sans">
      <Sidebar activeItem={activeMenu} userRole={userRole || 'staff'} userName={userName} />

      <div className="flex-1 flex flex-col overflow-hidden">

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}