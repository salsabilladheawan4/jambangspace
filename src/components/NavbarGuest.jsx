import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const NavbarGuest = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek Glassmorphism: Mendeteksi scroll halaman untuk mengubah opasitas navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'BERANDA', href: '#home' },
    { name: 'KEUNGGULAN', href: '#features' },
    { name: 'MENU', href: '#menu' },
    { name: 'TIM KAMI', href: '#teams' },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <div 
        className={`pointer-events-auto w-full max-w-6xl mx-auto rounded-[2rem] transition-all duration-500 flex items-center justify-between ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] py-3 px-6 md:px-8 border border-white/50' 
            : 'bg-[#faf6f1]/90 backdrop-blur-sm py-4 px-6 md:px-8 shadow-sm border border-[#e8dfd4]/50'
        }`}
      >
        
        {/* Logo Image */}
        <a href="#home" className="flex items-center group">
          <img src={logo} alt="Jambang Cafe Logo" className="h-10 w-auto group-hover:scale-105 transition-transform duration-300 drop-shadow-sm brightness-0" />
        </a>

        {/* Desktop Menu - Dengan Animasi Garis Bawah (Underline Hover) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-[#3d2817]">
          {menuItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="relative py-2 hover:text-[#c97b4b] transition-colors duration-300 group"
            >
              {item.name}
              {/* Efek Garis Bawah Ekspansif */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#c97b4b] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Premium Login Button */}
        <div className="hidden md:flex items-center">
          <Link 
            to="/login" 
            className="relative overflow-hidden group bg-[#3d2817] text-white px-6 py-2.5 rounded-full text-xs font-black tracking-widest hover:bg-[#c97b4b] transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>LOGIN</span>
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l4-4m0 0l-4-4m4 4H3" />
            </svg>
          </Link>
        </div>

        {/* Tombol Hamburger (Mobile) */}
        <button 
          className="md:hidden text-[#3d2817] focus:outline-none p-1 transition-transform active:scale-90" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown dengan Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-24 left-4 right-4 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-3xl overflow-hidden pointer-events-auto"
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-xs font-bold tracking-widest text-[#3d2817]">
              {menuItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="py-2.5 border-b border-[#e8dfd4]/30 hover:text-[#c97b4b] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              <Link 
                to="/login" 
                className="bg-[#3d2817] text-white px-4 py-3.5 rounded-xl text-center font-black mt-4 hover:bg-[#c97b4b] transition shadow-md flex items-center justify-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <span>LOGIN </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l4-4m0 0l-4-4m4 4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavbarGuest;