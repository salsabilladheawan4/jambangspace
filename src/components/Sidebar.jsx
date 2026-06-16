import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeItem = 'Menu', userRole = 'staff' }) {
  const navigate = useNavigate();

  // Memastikan role selalu dibaca sebagai huruf kecil
  const currentRole = String(userRole).toLowerCase();

  // Konfigurasi hak akses menu
  const navItems = [
    {
      name: 'Home',
      path: '/dashboard',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      roles: ['admin', 'staff'] // Muncul di Admin & Staff
    },
    {
      name: 'Menu',
      path: '/products',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11h18M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" />
          <path d="M12 5V3M8 3h8" />
        </svg>
      ),
      roles: ['admin', 'staff'] // Muncul di Admin & Staff
    },
    {
      name: 'Kasir POS',
      path: '/kasir',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M2 10h20" />
          <path d="M16 14h2" />
        </svg>
      ),
      roles: ['staff'] // HANYA MUNCUL UNTUK STAFF
    },
    {
      name: 'Inventaris',
      path: '/inventaris',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
           <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
           <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      roles: ['staff'] // HANYA MUNCUL UNTUK STAFF
    },
    {
      name: 'Laporan',
      path: '/laporan',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      roles: ['admin'] // HANYA MUNCUL UNTUK ADMIN
    }
  ];

  return (
    <aside className="w-24 bg-white flex flex-col items-center py-8 border-r border-gray-100 flex-shrink-0 min-h-screen">
      
      {/* LOGO: Jambang Cafe */}
      <div className="mb-10 mt-2 text-center cursor-pointer" onClick={() => navigate('/dashboard')}>
        <div className="text-xl font-black text-[#6b3a3a] leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Jambang<br/>
          <span className="text-[10px] tracking-widest text-[#c97b4b] uppercase font-bold">Cafe</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-2 w-full px-3 overflow-y-auto hide-scrollbar">
        {navItems
          .filter(item => item.roles.includes(currentRole))
          .map((item) => {
          const isActive = activeItem === item.name;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-[#6b3a3a] text-white shadow-md transform scale-105'
                  : 'text-gray-400 hover:bg-[#faf6f1] hover:text-[#6b3a3a]'
              }`}
              title={item.name}
            >
              <span className="mb-1">{item.icon}</span>
              <span className="text-[10px] font-medium leading-tight text-center px-1">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}