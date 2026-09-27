import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../Services/supabaseClient';
import logo from '../assets/logoblack.png';

export default function TopNavbar({ activeItem = 'Home', userRole = 'staff', userName = 'User' }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [daftarStok, setDaftarStok] = useState([]);
  const [lowStockCount, setLowStockCount] = useState(0);
  const currentRole = String(userRole).toLowerCase();

  useEffect(() => {
    const fetchAlerts = async () => {
      const { data } = await supabase.from('inventory').select('item_name, stock, unit');
      if (data) {
         setDaftarStok(data);
         const count = data.filter(item => {
            const stok = item.stock || 0;
            const unit = (item.unit || '').toLowerCase();
            if (unit === 'gram' || unit === 'ml' || unit === 'mili') return stok < 1000; 
            if (unit === 'kg' || unit === 'liter') return stok < 2;    
            if (unit === 'pcs' || unit === 'pack') return stok < 20;   
            return stok < 10;
         }).length;
         setLowStockCount(count);
      }
    };
    fetchAlerts();
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', roles: ['admin', 'staff'] },
    { name: 'Menu', path: '/products', roles: ['admin'] },
    { name: 'Resep', path: '/resep', roles: ['admin'] },
    { name: 'Kasir POS', path: '/kasir', roles: ['staff'] },
    { name: 'Inventaris', path: '/inventaris', roles: ['staff'] },
    { name: 'Laporan', path: '/laporan', roles: ['admin'] },
    { name: 'Data Staff', path: '/staff-data', roles: ['admin'] }
  ];

  return (
    <>
      {/* Click outside to close overlay (dipindah ke atas agar tidak menutupi navbar) */}
      {(isMenuOpen || isProfileOpen || isNotifOpen) && (
        <div className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[1px]" onClick={() => { setIsMenuOpen(false); setIsProfileOpen(false); setIsNotifOpen(false); }}></div>
      )}

      {/* Navbar Container */}
      <div className="w-full bg-[#F8F1E7] px-6 py-4 flex items-center justify-between z-50 relative">
        {/* Left Section: Logo & Date */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#332218] hover:bg-[#E8E4D9] rounded-lg transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            
            {/* Minimalist Logo */}
            <div className="flex cursor-pointer items-center" onClick={() => navigate('/dashboard')}>
              <img src={logo} alt="Jambang Logo" className="h-10 w-auto object-contain" />
            </div>
          </div>
          
          <div className="hidden md:block text-[#332218] font-semibold text-sm border-l border-[#332218]/20 pl-6">
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-4">

          <div className="relative">
            <button 
              onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
              className="relative p-3 bg-white rounded-full border border-[#332218]/20 text-[#332218] hover:bg-gray-50 transition-colors" 
              title={lowStockCount > 0 ? `${lowStockCount} bahan kritis di gudang!` : 'Gudang Aman'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {lowStockCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center border-2 border-white animate-pulse">{lowStockCount}</span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 bg-red-50 border-b border-red-100">
                  <h3 className="font-bold text-red-600 text-sm">Peringatan Stok</h3>
                  <p className="text-[10px] text-red-500 mt-0.5">Barang berikut hampir habis</p>
                </div>
                <div className="max-h-60 overflow-y-auto p-2">
                  {lowStockCount > 0 ? (
                    <div className="flex flex-col gap-1">
                      {daftarStok.filter(item => {
                          const stok = item.stock || 0;
                          const unit = (item.unit || '').toLowerCase();
                          if (unit === 'gram' || unit === 'ml' || unit === 'mili') return stok < 1000; 
                          if (unit === 'kg' || unit === 'liter') return stok < 2;    
                          if (unit === 'pcs' || unit === 'pack') return stok < 20;   
                          return stok < 10;
                      }).map((item, idx) => (
                        <div key={idx} className="p-3 bg-white hover:bg-gray-50 rounded-xl border border-gray-100 transition-colors">
                          <p className="text-xs font-bold text-[#1e293b]">{item.item_name}</p>
                          <p className="text-[10px] font-medium text-red-500 mt-1">Sisa: {item.stock} {item.unit}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-gray-500 font-medium">Stok gudang aman terkendali.</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <div 
              onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }} 
              className="flex items-center gap-3 bg-white rounded-full p-1 pr-4 border border-[#332218]/20 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#332218] text-white flex items-center justify-center font-bold text-xs uppercase overflow-hidden">
                 <img src={`https://ui-avatars.com/api/?name=${userName}&background=0B4A28&color=fff`} alt="User" />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-xs font-extrabold text-[#332218] whitespace-nowrap">{userName}</span>
                <span className="text-[10px] text-[#332218]/70 font-semibold capitalize">{userRole}</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#332218]/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
                  className="w-full flex items-center gap-3 px-5 py-4 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hamburger Overlay Menu */}
      {isMenuOpen && (
        <div className="absolute top-[80px] left-6 w-64 bg-white rounded-2xl shadow-2xl border border-[#332218]/10 z-50 overflow-hidden py-4 animate-in fade-in slide-in-from-top-4 duration-200">
           <div className="px-4 pb-2 text-xs font-bold text-[#332218]/50 uppercase tracking-widest border-b border-gray-100 mb-2">Navigation</div>
           {navItems.filter(item => item.roles.includes(currentRole)).map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-6 py-3 font-semibold text-sm transition-colors ${activeItem === item.name || activeItem === item.path.replace('/', '') ? 'bg-[#332218] text-white' : 'text-[#332218] hover:bg-[#F8F1E7]'}`}
              >
                {item.name}
              </button>
           ))}
        </div>
      )}
    </>
  );
}
