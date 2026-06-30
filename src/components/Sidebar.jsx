import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import ProfileDropdown from './ProfileDropdown';

export default function Sidebar({ activeItem = 'Menu', userRole = 'staff', userName = 'User' }) {
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
      roles: ['admin', 'staff']
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
      roles: ['admin', 'staff']
    },
    {
      name: 'Resep',
      path: '/resep',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
      ),
      roles: ['admin'] // Menu Resep kini terdaftar untuk Admin
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
      roles: ['staff']
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
      roles: ['staff']
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
      roles: ['admin']
    }
  ];

  return (
    <aside className="w-64 bg-white flex flex-col py-8 border-r border-gray-100 flex-shrink-0 min-h-screen z-10">
      
      {/* LOGO: Jambang Cafe */}
      <div className="mb-10 px-6 cursor-pointer flex w-full" onClick={() => navigate('/dashboard')}>
        <div className="bg-[#3d2817] w-full py-4 px-2 rounded-2xl flex items-center justify-center shadow-md transition-transform hover:scale-105">
          <img src={logo} alt="Jambang Cafe Logo" className="w-28 h-auto object-contain" />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-2 w-full px-4 overflow-y-auto hide-scrollbar">
        {navItems
          .filter(item => item.roles.includes(currentRole))
          .map((item) => {
          const isActive = activeItem === item.name;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 py-3 px-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-[#f8f5f2] text-[#6b3a3a] shadow-[0_2px_10px_rgba(107,58,58,0.05)] font-bold'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-[#6b3a3a] font-medium'
              }`}
            >
              <span className={`flex-shrink-0 ${isActive ? 'text-[#6b3a3a]' : 'text-gray-400'}`}>{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Profile & Notification at Bottom */}
      <div className="mt-auto pt-6 px-4 w-full">
        
        {/* User Info Card */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 mb-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#3d2817] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
            {userName ? (userName.split(' ').length >= 2 ? (userName.split(' ')[0][0] + userName.split(' ')[1][0]).toUpperCase() : userName.substring(0, 2).toUpperCase()) : 'U'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-gray-800 truncate">{userName}</span>
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider truncate">{userRole}</span>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
          className="w-full bg-[#fff5f5] text-[#e55353] py-3 px-4 rounded-2xl flex items-center justify-center gap-3 cursor-pointer hover:bg-[#ffebeb] transition-colors focus:outline-none"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span className="text-sm font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
}