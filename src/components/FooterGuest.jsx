import React, { useState } from 'react';

const FooterGuest = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#2a1a0f] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl">☕</div>
              <div>
                <div className="text-xl font-bold">Jambang</div>
                <div className="text-xs tracking-[0.3em] text-[#c97b4b] -mt-1">CAFE</div>
              </div>
            </div>
            <p className="text-sm text-[#c4b5a0] leading-relaxed">
              Kopi yang Baik. Orang yang Baik.<br />Momen yang Hebat.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 text-[#c97b4b]">JELAJAHI</h4>
            <ul className="space-y-2 text-sm text-[#c4b5a0]">
              <li><a href="#" className="hover:text-white transition">Menu</a></li>
              <li><a href="#" className="hover:text-white transition">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition">Pengalaman</a></li>
              <li><a href="#" className="hover:text-white transition">Jurnal</a></li>
              <li><a href="#" className="hover:text-white transition">Toko</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 text-[#c97b4b]">LAYANAN PELANGGAN</h4>
            <ul className="space-y-2 text-sm text-[#c4b5a0]">
              <li><a href="#" className="hover:text-white transition">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Pengiriman</a></li>
              <li><a href="#" className="hover:text-white transition">Pengembalian</a></li>
              <li><a href="#" className="hover:text-white transition">Kartu Hadiah</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-4 text-[#c97b4b]">TERHUBUNG</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-8 h-8 rounded-full bg-[#3d2817] flex items-center justify-center hover:bg-[#c97b4b] transition">📷</a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#3d2817] flex items-center justify-center hover:bg-[#c97b4b] transition">📘</a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#3d2817] flex items-center justify-center hover:bg-[#c97b4b] transition">🐦</a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#3d2817] flex items-center justify-center hover:bg-[#c97b4b] transition">📌</a>
            </div>
            <p className="text-xs text-[#c4b5a0] mb-2">Bergabung dengan newsletter kami</p>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Anda"
                className="flex-1 bg-[#3d2817] text-white text-xs px-3 py-2 rounded-l focus:outline-none"
              />
              <button className="bg-[#c97b4b] px-3 py-2 rounded-r hover:bg-[#b8683f] transition">→</button>
            </div>
          </div>
        </div>
        <div className="border-t border-[#3d2817] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#6b5344]">
          <div>© 2026 Jambang Cafe. Semua hak dilindungi.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterGuest;