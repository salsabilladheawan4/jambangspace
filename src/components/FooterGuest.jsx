import React, { useState } from 'react';

const FooterGuest = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#222923] text-white pt-20 pb-10" id="footer-contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: About & Social */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="text-2xl">☕</div>
              <div>
                <div className="text-xl font-bold">Jambang</div>
                <div className="text-[10px] tracking-[0.4em] text-[#c97b4b] -mt-1 font-black">SPACE</div>
              </div>
            </div>
            <p className="text-sm text-[#a3b1a5] leading-relaxed mb-6">
              Temukan permata tersembunyi di Pekanbaru, tempat di mana alam bertemu dengan warisan cita rasa dalam harmoni yang sempurna.
            </p>
            <div className="flex gap-3 mb-6">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c97b4b] transition-colors">📷</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c97b4b] transition-colors">📘</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c97b4b] transition-colors">🎵</a>
            </div>
            <p className="text-xs text-white font-bold mb-3">Berlangganan Newsletter</p>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Alamat email"
                className="flex-1 bg-white/10 text-white text-xs px-4 py-3 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#4caf50]"
              />
              <button className="bg-[#4caf50] px-4 py-3 rounded-r-lg hover:bg-[#3d8c40] transition-colors font-bold text-xs">Gabung</button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-6 text-white tracking-wider">Tautan Cepat</h4>
            <ul className="space-y-4 text-sm text-[#a3b1a5]">
              <li><a href="#home" className="hover:text-white transition flex items-center gap-2"><span>›</span> Beranda</a></li>
              <li><a href="#features" className="hover:text-white transition flex items-center gap-2"><span>›</span> Keunggulan</a></li>
              <li><a href="#menu" className="hover:text-white transition flex items-center gap-2"><span>›</span> Menu Kami</a></li>
              <li><a href="#teams" className="hover:text-white transition flex items-center gap-2"><span>›</span> Tim Hebat</a></li>
              <li><a href="/login" className="hover:text-white transition flex items-center gap-2"><span>›</span> Login Pegawai</a></li>
            </ul>
          </div>

          {/* Column 3: Popular Links */}
          <div>
            <h4 className="font-bold text-sm mb-6 text-white tracking-wider">Menu Populer</h4>
            <ul className="space-y-4 text-sm text-[#a3b1a5]">
              <li><a href="#" className="hover:text-white transition flex items-center gap-2"><span>›</span> Signature Coffee</a></li>
              <li><a href="#" className="hover:text-white transition flex items-center gap-2"><span>›</span> Artisan Pastry</a></li>
              <li><a href="#" className="hover:text-white transition flex items-center gap-2"><span>›</span> Non-Coffee Series</a></li>
              <li><a href="#" className="hover:text-white transition flex items-center gap-2"><span>›</span> Manual Brew</a></li>
              <li><a href="#" className="hover:text-white transition flex items-center gap-2"><span>›</span> Main Course</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-bold text-sm mb-6 text-white tracking-wider">Info Kontak</h4>
            <div className="space-y-6 text-sm text-[#a3b1a5]">
              <div className="flex items-start gap-4">
                <span className="text-lg mt-0.5">📍</span>
                <p className="leading-relaxed">Jl. Kaharudin Nasution, Marpoyan, Simpang Tiga, Pekanbaru, Riau.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-lg mt-0.5">📞</span>
                <p className="leading-relaxed">Call/WhatsApp:<br/><span className="text-white font-bold mt-1 inline-block">0812-3456-7890</span></p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-lg mt-0.5">✉️</span>
                <p className="leading-relaxed">hello@jambangcafe.com</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default FooterGuest;