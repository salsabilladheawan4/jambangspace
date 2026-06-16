import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function MainLayout({ userRole, userName, onLogout }) {
  return (
    <div className="flex min-h-screen bg-[#faf6f1] font-instrument text-[#3d2817]">
      
      <Sidebar userRole={userRole} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-6"> 
          <Outlet />
        </main>

        <footer className="bg-[#3d2817] py-8 px-10 border-t border-[#2a1a0f]">
          <div className="text-center text-xs font-bold tracking-widest text-[#c4b5a0]">
            © 2026 JAMBANG CAFE WORKSPACE. SEMUA HAK DILINDUNGI.
          </div>
        </footer>
        
      </div>
    </div>
  );
}