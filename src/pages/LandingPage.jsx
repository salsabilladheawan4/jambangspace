import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../Services/supabaseClient';
import placeImg from '../assets/place.jpeg';
import imgKeunggulan1 from '../assets/WhatsApp Image 2026-06-29 at 15.14.19.jpeg';
import imgKeunggulan2 from '../assets/WhatsApp Image 2026-06-29 at 15.14.20 (1).jpeg';
import imgKeunggulan3 from '../assets/WhatsApp Image 2026-06-29 at 15.14.21 (1).jpeg';
import ownerjambang from '../assets/ownerjambang.jpeg';
import karyawan1 from '../assets/karyawan1.jpeg';
import karyawan2 from '../assets/karyawan2.jpeg';
import suasanaImg from '../assets/suasana.jpeg';
import bijiKopiImg from '../assets/bijikopi.jpg';

const LandingPage = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const navigate = useNavigate();

  // --- MENGAMBIL DATA DARI SUPABASE ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data Tim dari database
        const { data: teamData, error: teamError } = await supabase
          .from('team_members')
          .select('*')
          .order('id', { ascending: true });
          
        if (teamData) setTeamMembers(teamData);
        if (teamError) console.error("Error fetching team:", teamError);
      } catch (error) {
        console.error("Unexpected error:", error);
        setLoadingMenu(false);
      }
    };
    fetchData();
  }, []);

  // --- GAMBAR PENDUKUNG ---
  const heroKopi = placeImg; 
  const fallbackTeamImages = [
    ownerjambang,   
    karyawan1, 
    karyawan2    
  ];

  const displayTeam = teamMembers.length > 0 ? teamMembers : [
    { id: 1, name: "Admin / Owner", role: "Pengelola Operasional", quote: "Memantau profit dan memastikan stok selalu aman untuk kepuasan pelanggan." },
    { id: 2, name: "Staff Kasir", role: "Pelayanan Pelanggan", quote: "Transaksi cepat dan presisi untuk pengalaman ngopi yang luar biasa." },
    { id: 3, name: "Staff Gudang", role: "Manajemen Inventaris", quote: "Menjaga ketersediaan bahan baku agar setiap resep tercipta sempurna." }
  ];

  const features = [
    { icon: "☕", title: "Biji Kopi Pilihan", desc: "Kualitas terbaik dari petani lokal & dunia" },
    { icon: "👨‍🍳", title: "Barista Ahli", desc: "Dirangkai dengan teknik dan presisi tinggi" },
    { icon: "🍃", title: "Bahan Segar", desc: "Manajemen inventaris ketat menjamin kesegaran" },
    { icon: "🛋️", title: "Suasana Nyaman", desc: "Ruang yang pas untuk diskusi dan bersantai" },
  ];
  // --- VARIANTS ANIMASI (Framer Motion) ---
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="w-full font-sans text-[#3d2817]">
      
      {/* 1. HERO SECTION */}
      <section id="home" className="grid md:grid-cols-2 min-h-[600px]">
        <div className="bg-[#faf6f1] p-12 md:p-16 flex flex-col justify-center">
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-5xl md:text-6xl font-bold text-[#3d2817] leading-tight"
           
          >
            Temukan Kopi<br />
            <span className="text-[#c97b4b] inline-block mt-2">Ternikmat</span> Anda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-[#6b5344] max-w-md leading-relaxed text-lg"
          >
            Menyajikan kopi artisan dan makanan lezat yang dikelola dengan sistem profesional untuk menjamin kesegaran dan konsistensi rasa setiap harinya.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-10 flex gap-4 flex-wrap"
          >
            <a href="#features" className="bg-[#c97b4b] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[#b8683f] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">LIHAT KEUNGGULAN KAMI &rarr;</a>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          className="relative overflow-hidden h-[400px] md:h-auto"
        >
          <img src={heroKopi} alt="Biji Kopi Jambang" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. FEATURES BAR */}
      <section id="features" className="py-24 bg-[#3d2817] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Kenapa Jambang Space?
            </motion.h2>
            <motion.p 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}
              className="text-[#d4cfc4] max-w-2xl mx-auto text-lg"
            >
              Kami memberikan pengalaman ngopi terbaik dengan memadukan biji kopi pilihan, keahlian barista, dan suasana yang tak terlupakan.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {features.map((f, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp} 
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(201,123,75,0.15)] transition-all duration-300 text-center group border border-transparent hover:border-[#f0eade]"
              >
                <motion.div 
                  className="w-20 h-20 mx-auto rounded-full bg-[#faf6f1] group-hover:bg-[#c97b4b] flex items-center justify-center text-4xl mb-6 transition-colors duration-500 shadow-sm"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300 inline-block">{f.icon}</span>
                </motion.div>
                <h4 className="font-bold text-xl mb-3 text-[#3d2817] group-hover:text-[#c97b4b] transition-colors duration-300">{f.title}</h4>
                <p className="text-sm text-[#6b5344] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. TIM HEBAT & KEUNGGULAN SISTEM */}
      <section id="teams" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="md:col-span-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#3d2817] leading-tight">
                Tim Hebat<br />Kami
              </h2>
              <p className="mt-6 text-[#6b5344] text-base leading-relaxed">Bersemangat. Terampil. Berdedikasi untuk menjalankan sistem secara efisien setiap harinya.</p>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {displayTeam.map((member, i) => {
                let finalImage = member.image_url;
                if (!finalImage || typeof finalImage !== 'string' || finalImage.includes('unsplash') || finalImage.includes('ui-avatars')) {
                    finalImage = fallbackTeamImages[i % 3];
                }

                return (
                  <motion.div
                    key={member.id || i} variants={fadeUp} whileHover={{ y: -12 }}
                    className="relative rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group h-[400px] border border-white/20"
                  >
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${finalImage})` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#20150d] via-[#20150d]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-center z-10 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-bold text-white text-2xl mb-1 drop-shadow-md">{member.name}</h3>
                      <p className="text-[11px] text-[#c97b4b] font-black tracking-widest uppercase mb-4 drop-shadow-md bg-white/10 backdrop-blur-sm self-center px-4 py-1.5 rounded-full">{member.role}</p>
                      <p className="text-sm text-gray-200 italic leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 px-2">
                        "{member.quote}"
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6B. KEUNGGULAN SISTEM */}
      <section id="system" className="py-24 bg-[#faf6f1]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Keunggulan Sistem - BENTO GRID MODERN */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="w-full"
          >
            <div className="text-center mb-14">
              <h3 className="text-4xl md:text-5xl font-bold text-[#3d2817]">
                Keunggulan Sistem
              </h3>
              <p className="mt-4 text-[#6b5344] max-w-xl mx-auto text-base leading-relaxed">
                Inovasi teknologi di balik layar untuk memastikan kecepatan, akurasi, dan kualitas di setiap pesanan Anda.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 relative z-10">
              
              {/* Card 1: Kasir POS Cerdas (Besar, Kiri) */}
              <motion.div 
                whileHover={{ y: -8 }}
                className="md:col-span-2 md:row-span-2 relative rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/50 min-h-[450px] flex flex-col justify-end p-10 md:p-12"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url(${imgKeunggulan1})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
                <div className="relative z-10 max-w-lg">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl mb-6 shadow-xl border border-white/20 text-white group-hover:rotate-12 transition-transform duration-300">💻</div>
                  <h4 className="font-bold text-3xl md:text-4xl mb-4 text-white drop-shadow-lg">Kasir POS Cerdas</h4>
                  <p className="text-base text-gray-200 leading-relaxed font-medium">
                    Pencatatan pesanan instan yang otomatis terintegrasi dengan dapur dan memotong stok gudang secara presisi sesuai resep (BOM). Nikmati pelayanan cepat tanpa kompromi.
                  </p>
                </div>
              </motion.div>

              {/* Card 2: Manajemen Inventaris (Kanan Atas) */}
              <motion.div 
                whileHover={{ y: -8 }}
                initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} variants={fadeUp}
                className="relative rounded-[2.5rem] overflow-hidden group shadow-xl border border-white/50 min-h-[200px] flex flex-col justify-end p-8"
              >
                <img src={bijiKopiImg} alt="Inventaris" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 z-0" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors z-0"></div>
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg border border-white/20 text-white group-hover:-rotate-12 transition-transform duration-300">📦</div>
                  <h4 className="font-bold text-xl mb-2 text-white drop-shadow-md">Manajemen Inventaris</h4>
                  <p className="text-sm text-gray-200 leading-relaxed">Pemantauan stok bahan baku secara real-time untuk mencegah kehabisan stok.</p>
                </div>
              </motion.div>

              {/* Card 3: Laporan Real-Time (Kanan Bawah) */}
              <motion.div 
                whileHover={{ y: -8 }}
                initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} variants={fadeUp}
                className="relative rounded-[2.5rem] overflow-hidden group shadow-xl border border-white/50 min-h-[200px] flex flex-col justify-end p-8"
              >
                <img src={placeImg} alt="Laporan" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 z-0" />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors z-0"></div>
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg border border-white/20 text-white group-hover:-rotate-12 transition-transform duration-300">📊</div>
                  <h4 className="font-bold text-xl mb-2 text-white drop-shadow-md">Laporan Real-Time</h4>
                  <p className="text-sm text-gray-200 leading-relaxed">Analisis pergerakan transaksi, pemasukan, dan pengeluaran secara akurat.</p>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. INFO OPERASIONAL */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="grid md:grid-cols-2 rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#f0eade]"
          >
            {/* Jam Buka */}
            <div className="bg-[#c97b4b] text-white p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 ease-in-out pointer-events-none"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 shadow-inner transform group-hover:-translate-y-1 transition-transform duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Jam Buka</h3>
              
              <div className="relative z-10">
                <p className="text-sm text-[#f5e6d3] font-bold uppercase tracking-widest mb-1">Senin - Minggu</p>
                <p className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
                  10:00 - 24:00 <span className="text-xl font-bold text-[#f5e6d3] ml-1">WIB</span>
                </p>
              </div>
            </div>

            {/* Lokasi */}
            <div className="bg-[#faf6f1] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-[#c97b4b] opacity-[0.03] rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 ease-in-out pointer-events-none"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-[#e8dfd4] text-[#c97b4b] flex items-center justify-center mb-8 shadow-inner transform group-hover:-translate-y-1 transition-transform duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold text-[#3d2817] mb-4 relative z-10">Lokasi Kami</h3>
              
              <div className="relative z-10">
                <p className="text-lg text-[#6b5344] leading-relaxed font-medium mb-4">
                  Jl. Kaharudin Nasution, Marpoyan,<br/>Simpang Tiga, Pekanbaru, Riau.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-[#c97b4b] bg-[#c97b4b]/10 py-2.5 px-4 rounded-xl w-fit mb-8">
                  <span className="text-lg">📍</span> Lokasi di pinggir jalan utama
                </div>
                
                <a 
                  href="https://maps.app.goo.gl/xwBAFrxVrL2yuvJCA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#3d2817] text-white px-8 py-4 rounded-2xl text-sm font-bold hover:bg-[#c97b4b] transition-all shadow-[0_8px_20px_rgba(61,40,23,0.2)] hover:shadow-[0_8px_25px_rgba(201,123,75,0.4)] hover:-translate-y-1 transform duration-300 flex items-center gap-3 w-fit inline-flex"
                >
                  BUKA GOOGLE MAPS
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. CTA BANNER / HUBUNGI KAMI */}
      <section className="relative h-[450px] md:h-[550px] flex items-center justify-center text-center mt-auto">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${suasanaImg})` }}></div>
        <div className="absolute inset-0 bg-[#222923]/70 backdrop-blur-[2px]"></div>
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative z-10 px-6 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Siap Mengelola Jambang Space?
          </h2>
          <p className="text-[#d4cfc4] text-base md:text-lg mb-10 leading-relaxed font-medium">
            Akses dasbor Jambang POS terintegrasi untuk mulai melayani pelanggan, memantau stok inventaris, dan memantau laporan operasional secara real-time.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;