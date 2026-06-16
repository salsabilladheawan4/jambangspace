import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORT GAMBAR LOKAL ---
import bijikopi from '../assets/bijikopi.jpg';
import imgPastri from '../assets/jambang.jpg';
import risol from '../assets/risol.jpg';

const LandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [plan, setPlan] = useState('monthly');

  // --- URL GAMBAR SEMENTARA DARI REFERENSI ---
  const drinksImg = "https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1aa67745e-5890-4b46-bf11-945d8a2a8337.png";
  const pourOverImg = "https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1ac76869e-49b6-4fa1-9c21-a75cf9898a53.png";
  const barista1 = "https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/19e8374fa-c18f-4f4e-9cdb-bc06cf6c4f34.png";
  const barista2 = "https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/10efe2c9a-5263-42f7-9185-1b95de1862c2.png";
  const barista3 = "https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/17412437c-bd4b-4500-adf5-ad5b570c1980.png";

  const features = [
    { icon: "☕", title: "Biji Kopi Single Origin", desc: "Berasal dari wilayah kopi terbaik dunia" },
    { icon: "👨‍🍳", title: "Barista Ahli", desc: "Profesional terlatih yang mencintai pekerjaannya" },
    { icon: "🌱", title: "Pilihan Berkelanjutan", desc: "Praktik ramah lingkungan untuk masa depan yang lebih baik" },
    { icon: "🛋️", title: "Suasana Hangat", desc: "Ruang nyaman untuk bersantai, bekerja, atau bersosialisasi" },
  ];

  const products = [
    { name: "Caramel Macchiato", desc: "Espresso kaya dengan karamel lembut & susu kukus.", price: "Rp 52.000", img: drinksImg },
    { name: "Havana Mocha", desc: "Cokelat bold, espresso & sentuhan kayu manis.", price: "Rp 57.000", img: drinksImg },
    { name: "Matcha Latte", desc: "Matcha grade upacara dicampur dengan susu kukus.", price: "Rp 52.000", img: drinksImg },
  ];

  const steps = [
    { num: "01", title: "Pilih Biji Kopi Anda", desc: "Pilih kesegaran & kualitas." },
    { num: "02", title: "Giling dengan Benar", desc: "Gilingan yang tepat membuat cangkir sempurna." },
    { num: "03", title: "Seduh dengan Perhatian", desc: "Waktu, suhu & teknik membuat perbedaan." },
    { num: "04", title: "Nikmati & Berbagi", desc: "Kopi yang luar biasa meant untuk dibagikan." },
  ];

  const baristas = [
    { name: "Daniel Kim", role: "Head Barista", quote: "\"Kopi lebih dari sekadar minuman, ini adalah sebuah koneksi.\"", img: barista1 },
    { name: "Maya Lopez", role: "Barista", quote: "\"Setiap cangkir yang saya buat dibuat dengan penuh perhatian dan passion.\"", img: barista2 },
    { name: "Ethan Brooks", role: "Brewing Specialist", quote: "\"Saya suka menjelajahi biji kopi dan mengeluarkan yang terbaik dari mereka.\"", img: barista3 },
  ];

  const testimonials = [
    { text: "Pengalaman kopi terbaik di kota! Rasa yang luar biasa, orang-orang yang ramah, dan suasana yang sangat nyaman.", author: "Sarah J." },
    { text: "Kopi di sini benar-benar berbeda. Setiap cangkir terasa seperti karya seni. Saya selalu kembali!", author: "Budi S." },
    { text: "Tempat favorit saya untuk bekerja dan bersantai. Barista-nya sangat berpengetahuan dan ramah.", author: "Dewi R." },
    { text: "Croissant dan kopi mereka adalah kombinasi sempurna. Sangat direkomendasikan!", author: "Andi P." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // ANIMATION VARIANTS (Agar lebih ringan karena menggunakan hardware acceleration)
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section id="home" className="grid md:grid-cols-2 min-h-[600px]">
        <div className="bg-[#faf6f1] p-12 md:p-16 flex flex-col justify-center">
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-5xl md:text-6xl font-bold text-[#3d2817] leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Mulai Perjalanan<br />
            <span className="text-[#c97b4b]">Kopi</span> Anda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mt-6 text-[#6b5344] max-w-md leading-relaxed"
          >
            Temukan kopi artisan, dibuat dengan tangan, disajikan dengan passion dan kehangatan yang dibuat khusus untuk Anda.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-8 flex gap-4 flex-wrap"
          >
            <button className="bg-[#c97b4b] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#b8683f] transition shadow-md">
              JELAJAHI MENU →
            </button>
            <button className="border border-[#3d2817] text-[#3d2817] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#3d2817] hover:text-white transition">
              CERITA KAMI
            </button>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          className="relative overflow-hidden h-[400px] md:h-auto"
        >
          <img src={bijikopi} alt="Biji Kopi Jambang" className="w-full h-full object-cover" />
        </motion.div>
      </section>

      {/* 2. FEATURES BAR */}
      <section className="bg-[#3d2817] text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }}
              variants={fadeUp}
              className="flex items-start gap-3"
            >
              <div className="text-3xl">{f.icon}</div>
              <div>
                <h4 className="font-bold text-sm mb-1">{f.title}</h4>
                <p className="text-xs text-[#c4b5a0]">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SIGNATURE CREATIONS (MENU) */}
      <section id="menu" className="py-20 bg-[#faf6f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={fadeUp}
              className="md:col-span-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#3d2817] leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                Kreasi<br />Signature
              </h2>
              <p className="mt-4 text-[#6b5344] text-sm">Dibuat dengan sempurna. Disajikan dengan sukacita.</p>
              <button className="mt-6 text-sm font-medium text-[#3d2817] border-b border-[#3d2817] pb-1 hover:text-[#c97b4b] hover:border-[#c97b4b] transition">
                LIHAT MENU LENGKAP →
              </button>
            </motion.div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((p, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "50px" }}
                  transition={{ delay: i * 0.1 }} variants={fadeUp}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="h-48 overflow-hidden bg-[#e8dfd4]">
                    {/* Hapus framer motion img, gunakan CSS biasa untuk hover gambar agar ringan */}
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#3d2817]">{p.name}</h3>
                    <p className="text-xs text-[#6b5344] mt-2 leading-relaxed">{p.desc}</p>
                    <div className="mt-3 text-[#c97b4b] font-bold">{p.price}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4. ARTISAN PASTRIES */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "50px" }} variants={fadeUp}
            className="grid md:grid-cols-2 gap-0 bg-[#c97b4b] rounded-3xl overflow-hidden mt-12 shadow-lg"
          >
            <div className="p-10 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 relative z-10" style={{ fontFamily: "'Georgia', serif" }}>
               Risol <br />Ayam Spesial
              </h3>
              <p className="text-sm text-[#f5e6d3] mb-6 max-w-md relative z-10">
                Dibuat segar setiap hari dengan bahan-bahan premium untuk menemani ngopi Anda.
              </p>
              <button className="text-sm font-medium border-b border-white pb-1 hover:opacity-80 transition self-start relative z-10">
                LIHAT SEMUA PASTRI →
              </button>
            </div>
            <div className="h-64 md:h-auto overflow-hidden">
              <img src={risol} alt="risol" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. BREW BETTER AT HOME */}
      <section className="bg-[#3d4a3e] text-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={fadeUp}
            className="md:col-span-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "'Georgia', serif" }}>
              Seduh Lebih Baik<br />di Rumah
            </h2>
            <p className="text-sm text-[#d4cfc4] mb-6 max-w-sm">
              Seduh seperti barista dengan panduan dan tips eksklusif kami.
            </p>
            <button className="text-sm font-medium border-b border-white pb-1 hover:opacity-80 transition">
              PELAJARI LEBIH LANJUT →
            </button>
          </motion.div>
          <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden h-64 md:h-auto shadow-lg"
            >
              <img src={pourOverImg} alt="Pour Over" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-4 left-4 bg-[#3d2817] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md">
                Jambang Café
              </div>
            </motion.div>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }} variants={fadeUp}
                  className="flex items-start gap-4 bg-[#2d3a2e] p-4 rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="w-10 h-10 rounded-full bg-[#c97b4b] flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-inner">
                    {s.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{s.title}</h4>
                    <p className="text-xs text-[#d4cfc4] mt-1">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. MEET OUR BARISTAS & TESTIMONIALS */}
      <section className="py-20 bg-[#faf6f1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={fadeUp}
              className="md:col-span-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#3d2817] leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                Kenali Barista<br />Kami
              </h2>
              <p className="mt-4 text-[#6b5344] text-sm">Bersemangat. Terampil. Berdedikasi untuk cangkir sempurna Anda.</p>
            </motion.div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {baristas.map((b, i) => (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }} variants={fadeUp}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="h-56 overflow-hidden">
                    <img src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#3d2817]">{b.name}</h3>
                    <p className="text-xs text-[#c97b4b] mt-1 font-bold tracking-widest uppercase">{b.role}</p>
                    <p className="text-xs text-[#6b5344] mt-3 italic leading-relaxed">{b.quote}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-[#3d2817] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden mt-16 shadow-xl"
          >
            <div className="absolute top-6 left-8 text-6xl text-[#c97b4b] opacity-30">"</div>
            <div className="relative max-w-2xl mx-auto text-center md:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                >
                  <p className="text-lg md:text-xl leading-relaxed mb-6 font-medium">
                    {testimonials[activeTestimonial].text}
                  </p>
                  <p className="text-sm text-[#c97b4b] font-bold tracking-widest uppercase">— {testimonials[activeTestimonial].author}</p>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-2 mt-8 justify-center md:justify-start">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'bg-[#c97b4b] w-8' : 'bg-[#6b5344] w-2'}`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 text-8xl opacity-20">☕</div>
          </motion.div>
        </div>
      </section>

      {/* 7. SUBSCRIPTION & VISIT US */}
      <section className="grid md:grid-cols-3 gap-0">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="bg-[#c97b4b] text-white p-10 md:p-12"
        >
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Georgia', serif" }}>Kopi Diantar<br />ke Pintu Anda</h3>
          <p className="text-sm text-[#f5e6d3] mb-6 leading-relaxed">Bergabung dengan Coffee Club kami dan nikmati blend eksklusif.</p>
          <button className="bg-white text-[#c97b4b] px-6 py-4 rounded-2xl text-xs font-bold hover:bg-[#faf6f1] transition w-full shadow-md">
            GABUNG COFFEE CLUB
          </button>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} variants={fadeUp}
          className="bg-[#faf6f1] p-10 md:p-12 border-x border-[#e8dfd4]"
        >
          <h3 className="text-3xl font-bold text-[#3d2817] mb-6" style={{ fontFamily: "'Georgia', serif" }}>Pilih Paket Anda</h3>
          <div className="mb-8">
            <span className="text-4xl font-black text-[#c97b4b]">Rp 199.000</span>
            <span className="text-sm text-[#6b5344] font-medium block mt-1">/bulan, ditagih bulanan</span>
          </div>
          <button className="bg-[#3d2817] text-white px-6 py-4 rounded-2xl text-xs font-bold hover:bg-[#c97b4b] transition w-full shadow-md">
            BERLANGGANAN SEKARANG
          </button>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} variants={fadeUp}
          className="bg-[#3d4a3e] text-white p-10 md:p-12"
        >
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Georgia', serif" }}>Kunjungi Kami</h3>
          <p className="text-sm text-[#d4cfc4] mb-8 leading-relaxed">Tempat di mana setiap cangkir kopi punya cerita.</p>
          <button className="mt-8 text-xs font-bold tracking-widest border-b border-white pb-1 hover:text-[#c97b4b] hover:border-[#c97b4b] transition uppercase">
            Dapatkan Arah Maps →
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;