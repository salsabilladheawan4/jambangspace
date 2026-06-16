import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom

const NavbarGuest = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#faf6f1] border-b border-[#e8dfd4]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl">☕</div>
          <div>
            <div className="text-2xl font-bold text-[#3d2817]" style={{ fontFamily: "'Georgia', serif" }}>Jambang</div>
            <div className="text-xs tracking-[0.3em] text-[#8b6f47] -mt-1">CAFE</div>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#3d2817]">
          <a href="#home" className="hover:text-[#c97b4b] transition">BERANDA</a>
          <a href="#menu" className="hover:text-[#c97b4b] transition">MENU</a>
          <a href="#about" className="hover:text-[#c97b4b] transition">TENTANG</a>
          <a href="#experience" className="hover:text-[#c97b4b] transition">PENGALAMAN</a>
          <a href="#journal" className="hover:text-[#c97b4b] transition">JURNAL</a>
          <a href="#shop" className="hover:text-[#c97b4b] transition">TOKO</a>
        </nav>

        {/* Ikon & Tombol Kanan (Desktop) */}
        <div className="flex items-center gap-4">
          <button className="text-[#3d2817] hover:text-[#c97b4b] hidden md:block">🔍</button>
          <button className="text-[#3d2817] hover:text-[#c97b4b] hidden md:block">🛒</button>
          
          {/* Tombol Login Baru (Desktop) */}
          <Link 
            to="/login" 
            className="hidden md:block bg-[#3d2817] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#c97b4b] transition shadow-sm"
          >
            LOGIN
          </Link>

          {/* Tombol Hamburger (Mobile) */}
          <button className="md:hidden text-[#3d2817]" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#faf6f1] border-t border-[#e8dfd4] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium text-[#3d2817]">
              <a href="#home" onClick={() => setMenuOpen(false)}>BERANDA</a>
              <a href="#menu" onClick={() => setMenuOpen(false)}>MENU</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>TENTANG</a>
              <a href="#experience" onClick={() => setMenuOpen(false)}>PENGALAMAN</a>
              <a href="#journal" onClick={() => setMenuOpen(false)}>JURNAL</a>
              <a href="#shop" onClick={() => setMenuOpen(false)}>TOKO</a>
              
              {/* Tombol Login Baru (Mobile) */}
              <Link 
                to="/login" 
                className="bg-[#3d2817] text-white px-4 py-3 rounded-lg text-center font-bold mt-2 hover:bg-[#c97b4b] transition"
                onClick={() => setMenuOpen(false)}
              >
                LOGIN
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavbarGuest;