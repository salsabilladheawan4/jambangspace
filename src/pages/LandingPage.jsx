import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBgImg from '../assets/WhatsApp Image 2026-06-29 at 15.14.21 (1).jpeg';
import placeImg from '../assets/place.jpeg';
import karyawan1 from '../assets/karyawan1.jpeg';
import karyawan2 from '../assets/karyawan2.jpeg';
import ownerjambang from '../assets/ownerjambang.jpeg';
import suasanaImg from '../assets/suasana.jpeg';
import bijiKopiImg from '../assets/bijikopi.jpg';
import logo from '../assets/logo.png';
import menu1 from '../assets/menu1.png';
import menu2 from '../assets/menu2.png';
import menu3 from '../assets/menu3.png';

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full font-['Inter',sans-serif] bg-[#F8F1E7] text-[#332218] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-between overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-black"
        >
          <img src={heroBgImg} alt="Hero" className="w-full h-full object-cover opacity-70" />
        </motion.div>
        
        {/* Navbar */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 text-white text-xs tracking-wider uppercase font-medium ${
            isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg border-b border-white/10" : "bg-transparent"
          }`}
        >
          <div className={`flex items-center justify-between w-full px-8 ${isScrolled ? "py-4" : "py-6"}`}>
            <div className="flex-1 flex gap-8 hidden md:flex">
              <a href="#about" className="hover:text-gray-300 transition">About</a>
              <a href="#menu" className="hover:text-gray-300 transition">Menu</a>
              <a href="#locations" className="hover:text-gray-300 transition">Locations</a>
              <a href="#gallery" className="hover:text-gray-300 transition">Gallery</a>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center">
              <img src={logo} alt="Jambang Logo" className={`w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-all duration-300 ${isScrolled ? "h-8" : "h-10"}`} />
            </div>
            <div className="flex-1 flex justify-end gap-8 hidden md:flex">
              <Link to="/login" className="hover:text-gray-300 transition font-bold">Login</Link>
            </div>
            
            {/* Mobile Hamburger Icon */}
            <div className="flex-1 flex justify-end md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                   )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
             <div className="md:hidden bg-black/95 backdrop-blur-xl absolute top-full left-0 w-full py-6 px-8 flex flex-col gap-6 border-b border-white/10">
                <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition">About</a>
                <a href="#menu" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition">Menu</a>
                <a href="#locations" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition">Locations</a>
                <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-300 transition">Gallery</a>
                <Link to="/login" className="hover:text-[#BA4A22] transition font-bold mt-4 pt-4 border-t border-white/10">Login</Link>
             </div>
          )}
        </motion.nav>

        {/* Hero Content */}
        <div className="relative z-10 px-8 md:px-16 pb-12 w-full flex flex-col justify-end h-full max-w-7xl mx-auto">
          <h1 className="text-white text-6xl md:text-[9rem] leading-[0.9] font-serif mb-12">
            <motion.span
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } },
                hidden: {},
              }}
            >
              {"Coffee".split("").map((char, index) => (
                <motion.span
                  key={`c-${index}`}
                  variants={{
                    hidden: { opacity: 0, display: "none" },
                    visible: { opacity: 1, display: "inline" }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <br/> 
            <motion.span 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 1.5 } },
                hidden: {},
              }}
              className="italic inline-block"
            >
              {"That Slaps.".split("").map((char, index) => (
                <motion.span
                  key={`t-${index}`}
                  variants={{
                    hidden: { opacity: 0, display: "none" },
                    visible: { opacity: 1, display: "inline" }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.8 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/30 pt-6 gap-6 md:gap-0"
          >
            <div className="text-white/80 text-xs max-w-[250px] leading-relaxed uppercase tracking-wider font-semibold">
              COFFEE, MOCKTAILS, & DELICIOUS MEALS <br/> PEKANBARU, RIAU.
            </div>
            
            <div className="flex gap-4">
              <a href="#menu" className="px-8 py-3 rounded-full border border-white text-white text-sm uppercase tracking-wide hover:bg-white hover:text-black transition duration-300">Our Menu</a>
              <a href="https://maps.app.goo.gl/WLTHqRmmNhpWJc2F6" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full border border-white text-white text-sm uppercase tracking-wide hover:bg-white hover:text-black transition duration-300">Find Us</a>
            </div>
            
            <div className="text-white/80 text-xs md:text-right max-w-[250px] leading-relaxed uppercase tracking-wider font-semibold">
              WE'RE NOT JUST A CAFE.<br/>WE'RE A HEADQUARTERS.
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-24 md:py-32 px-8 bg-[#F8F1E7] relative overflow-hidden">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={slideLeft}
              className="w-full md:w-1/2 flex justify-center md:justify-end pr-0 md:pr-12"
            >
               <motion.div 
                 whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.5 }}
                 className="w-full max-w-[380px] aspect-[4/5] rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl relative border-[8px] border-white"
               >
                 <img src={karyawan2} alt="Jambang Barista" className="w-full h-full object-cover" />
                 
                 {/* Small overlay badge for aesthetics */}
                 <div className="absolute bottom-6 -right-2 bg-[#C04A25] text-white text-[10px] uppercase tracking-widest font-bold py-3 px-6 rounded-l-full shadow-lg">
                    Est. 2026
                 </div>
               </motion.div>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={slideRight}
              className="w-full md:w-1/2 max-w-lg mt-8 md:mt-0"
            >
               <h2 className="text-[#C04A25] text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                 Our Coffee, <br/> <span className="italic">Our Rules.</span>
               </h2>
               <p className="text-[#332218] text-base md:text-lg leading-relaxed font-medium mb-8">
                 Kami adalah ruang singgah ternyaman di Pekanbaru. Tempat di mana racikan kopi yang jujur bertemu dengan hidangan lezat yang menggugah selera. Nikmati Kopi Susu Jambang andalan kami, hidangan utama yang mengenyangkan, dan suasana santai yang membuat Anda betah berlama-lama.
               </p>
               <a href="#about" className="text-sm font-bold tracking-widest uppercase border-b-2 border-[#C04A25] pb-1 hover:text-[#C04A25] transition inline-block">Read Our Story</a>
            </motion.div>
         </div>
      </section>

      {/* 3. MENU SECTION */}
      <section id="menu" className="py-24 md:py-40 bg-[#BA4A22] text-white relative overflow-hidden">
        {/* Massive Background Text */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] md:w-[150%] text-center pointer-events-none flex flex-col leading-[0.8] select-none"
        >
          <span className="text-[12rem] md:text-[25rem] font-serif italic whitespace-nowrap">our menu</span>
          <span className="text-[12rem] md:text-[25rem] font-serif italic whitespace-nowrap">our menu</span>
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8">
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
             className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-white/20 pb-8 gap-4 md:gap-0"
           >
             <h2 className="text-5xl md:text-7xl font-serif">What We Serve.</h2>
             <p className="text-sm max-w-[200px] md:text-right opacity-80 uppercase tracking-widest font-semibold">Our classic & signature beverages crafted for you.</p>
           </motion.div>
           
           <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
              {/* Left: Text Menu */}
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                className="w-full md:w-1/2 flex flex-col gap-10"
              >
                 <motion.div variants={fadeUp} className="group border-b border-white/20 pb-6">
                    <div className="flex justify-between items-end mb-2">
                      <h3 className="text-3xl font-serif group-hover:text-[#F8F1E7]/80 transition">Kopi Susu Jambang</h3>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed max-w-md">Kopi susu aren yang gurih, creamy, dan menyegarkan.</p>
                 </motion.div>

                 <motion.div variants={fadeUp} className="group border-b border-white/20 pb-6">
                    <div className="flex justify-between items-end mb-2">
                      <h3 className="text-3xl font-serif group-hover:text-[#F8F1E7]/80 transition">Americano</h3>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed max-w-md">Espresso Arabica Single Origin yang membangkitkan fokus.</p>
                 </motion.div>

                 <motion.div variants={fadeUp} className="group border-b border-white/20 pb-6">
                    <div className="flex justify-between items-end mb-2">
                      <h3 className="text-3xl font-serif group-hover:text-[#F8F1E7]/80 transition">Coffee Beer</h3>
                      <span className="text-[10px] md:text-xs uppercase tracking-widest px-2 py-1 bg-white text-[#BA4A22] font-bold rounded">Signature</span>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed max-w-md">Mocktail kopi dengan sensasi soda yang unik.</p>
                 </motion.div>

                 <motion.div variants={fadeUp} className="group border-b border-white/20 pb-6">
                    <div className="flex justify-between items-end mb-2">
                      <h3 className="text-3xl font-serif group-hover:text-[#F8F1E7]/80 transition">Nasgor Seafood</h3>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed max-w-md">Nasi goreng smoky dengan udang & telur orak-arik.</p>
                 </motion.div>

                 <motion.div variants={fadeUp} className="group border-b border-white/20 pb-6">
                    <div className="flex justify-between items-end mb-2">
                      <h3 className="text-3xl font-serif group-hover:text-[#F8F1E7]/80 transition">Butter Rice</h3>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed max-w-md">Butter rice gurih disajikan dengan paduan sambal matah.</p>
                 </motion.div>
                 
                 <motion.button variants={fadeUp} className="mt-4 self-start px-10 py-3.5 rounded-full border border-white text-sm uppercase tracking-wider font-bold hover:bg-white hover:text-[#BA4A22] transition">Full Menu</motion.button>
              </motion.div>
              
              {/* Right: Collage */}
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
                className="w-full md:w-1/2 relative h-[400px] md:h-[700px] flex justify-center items-center mt-12 md:mt-0"
              >
                 <motion.div 
                   whileHover={{ scale: 1.05, zIndex: 30 }} transition={{ duration: 0.4 }}
                   className="absolute top-4 right-10 md:top-10 md:right-0 w-[200px] md:w-[300px] aspect-[3/4] bg-white p-3 shadow-2xl z-10 rotate-6"
                 >
                    <img src={menu1} alt="Menu 1" className="w-full h-full object-cover" />
                 </motion.div>

                 <motion.div 
                   whileHover={{ scale: 1.05, zIndex: 30 }} transition={{ duration: 0.4 }}
                   className="absolute bottom-10 left-0 md:left-0 w-[220px] md:w-[320px] aspect-[4/5] bg-white p-3 shadow-2xl z-20 -rotate-3"
                 >
                    <img src={menu2} alt="Menu 2" className="w-full h-full object-cover" />
                 </motion.div>
                 
                 <motion.div 
                   whileHover={{ scale: 1.05, zIndex: 30 }} transition={{ duration: 0.4 }}
                   className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[180px] md:w-[250px] aspect-[4/5] bg-white p-2 shadow-2xl z-25 -rotate-12"
                 >
                    <img src={menu3} alt="Menu 3" className="w-full h-full object-cover" />
                 </motion.div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* 4. HEADQUARTERS SECTION */}
      <section id="locations" className="relative w-full py-32 md:py-48 flex items-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-black"
        >
          <img src={suasanaImg} alt="Interior" className="w-full h-full object-cover opacity-60" />
        </motion.div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-12"
        >
           <div>
             <h2 className="text-white text-5xl md:text-8xl font-serif leading-[1.1]">
               Not a Café. <br/> <span className="italic">A Headquarters.</span>
             </h2>
             <p className="text-white/80 mt-6 max-w-md leading-relaxed text-lg">A space built for ideas, productivity, and connecting with those who appreciate the grind.</p>
           </div>
           
           <div className="flex flex-col md:items-end gap-6">
             <a href="https://maps.app.goo.gl/WLTHqRmmNhpWJc2F6" target="_blank" rel="noopener noreferrer" className="px-12 py-4 bg-white text-black rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#F8F1E7] transition inline-block">Visit Us</a>
             <p className="text-white/80 text-xs tracking-widest font-bold">OPEN DAILY: 10:00 - 24:00 WIB</p>
           </div>
        </motion.div>
      </section>

      {/* 5. GALLERY SECTION */}
      <section id="gallery" className="pt-24 md:pt-32 bg-[#F8F1E7] relative overflow-hidden flex flex-col justify-between">
        <div className="max-w-7xl mx-auto px-8 relative z-10 w-full">
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
             className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6 md:gap-0"
           >
              <h2 className="text-[#C04A25] text-5xl md:text-6xl font-serif max-w-sm leading-tight">
                 Our Space, Your Vibe.
              </h2>
              <p className="text-sm max-w-[250px] md:text-right font-medium text-[#332218] uppercase tracking-widest leading-relaxed">
                Tangkapan momen dan sudut favorit di markas kami.
              </p>
           </motion.div>
           
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
             className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 relative z-20 pb-32"
           >
              {/* Photo 1 */}
              <motion.div variants={fadeUp} className="flex flex-col items-center group overflow-hidden h-[300px] md:h-[450px]">
                 <div className="w-full h-full relative overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-500 rounded">
                    <img src={heroBgImg} alt="Vibe 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 </div>
              </motion.div>
              
              {/* Photo 2 */}
              <motion.div variants={fadeUp} className="flex flex-col items-center group overflow-hidden h-[300px] md:h-[450px] md:mt-16">
                 <div className="w-full h-full relative overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-500 rounded">
                    <img src={placeImg} alt="Vibe 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 </div>
              </motion.div>

              {/* Photo 3 */}
              <motion.div variants={fadeUp} className="flex flex-col items-center group overflow-hidden h-[300px] md:h-[450px]">
                 <div className="w-full h-full relative overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-500 rounded">
                    <img src={suasanaImg} alt="Vibe 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 </div>
              </motion.div>
           </motion.div>
        </div>
        
        {/* Massive Background Text */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
          className="w-full overflow-hidden absolute bottom-[-5%] left-0 right-0 pointer-events-none"
        >
          <div className="font-serif text-[15rem] md:text-[25rem] leading-[0.75] text-[#C04A25] uppercase font-black text-center whitespace-nowrap">
            JAMBANG VIBES
          </div>
        </motion.div>
      </section>

      {/* 6. TESTIMONIAL SECTION */}
      <section className="py-24 md:py-40 bg-[#BA4A22] relative flex justify-center items-center overflow-hidden min-h-auto md:min-h-[900px]">
        {/* Mobile Quotes */}
        <div className="flex md:hidden flex-col gap-12 w-full px-8 relative z-20">
           <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-4xl font-serif opacity-30 absolute -translate-y-4 -translate-x-4 text-white">"</span>
              <p className="font-serif text-2xl text-white leading-tight">I came for one cup, left with a week's worth of beans.</p>
              <div className="flex items-center gap-3 mt-4 text-white">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"><img src={karyawan1} alt="User" className="w-full h-full object-cover" /></div>
                <span className="text-[10px] tracking-widest uppercase font-bold">Sarah T.</span>
              </div>
           </motion.div>
           <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-4xl font-serif opacity-30 absolute -translate-y-4 -translate-x-4 text-white">"</span>
              <p className="font-serif text-2xl text-white leading-tight">No fake smiles, just the best espresso in town.</p>
              <div className="flex items-center gap-3 mt-4 text-white">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"><img src={karyawan2} alt="User" className="w-full h-full object-cover" /></div>
                <span className="text-[10px] tracking-widest uppercase font-bold">Michael R.</span>
              </div>
           </motion.div>
           <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="text-4xl font-serif opacity-30 absolute -translate-y-4 -translate-x-4 text-white">"</span>
              <p className="font-serif text-2xl text-white leading-tight">Tastes like insomnia in a good way.</p>
              <div className="flex items-center gap-3 mt-4 text-white">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-white/20 flex justify-center items-center font-serif text-lg">J</div>
                <span className="text-[10px] tracking-widest uppercase font-bold">Jason K.</span>
              </div>
           </motion.div>
        </div>

        {/* Center Portrait */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-[280px] md:max-w-[400px] aspect-[4/5] md:h-[500px] rounded-t-full overflow-hidden shadow-2xl border-b-0 border-4 border-[#BA4A22]/20 mt-16 md:mt-0 hidden md:block"
        >
           <img src={ownerjambang} alt="Barista Portrait" className="w-full h-full object-cover" />
        </motion.div>
        
        {/* Desktop Floating Quotes */}
        <div className="hidden md:block">
           <motion.div 
             initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
             className="absolute z-20 top-16 md:top-32 left-4 md:left-24 max-w-[200px] md:max-w-[280px] text-white"
           >
              <span className="text-6xl font-serif opacity-30 absolute -top-8 -left-6">"</span>
              <p className="font-serif text-2xl md:text-3xl leading-tight">I came for one cup, left with a week's worth of beans.</p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"><img src={karyawan1} alt="User" className="w-full h-full object-cover" /></div>
                <span className="text-[10px] md:text-xs tracking-widest uppercase font-bold">Sarah T.</span>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}
             className="absolute z-20 top-64 md:top-1/2 right-4 md:right-24 max-w-[200px] md:max-w-[280px] text-white text-right flex flex-col items-end transform -translate-y-1/2"
           >
              <span className="text-6xl font-serif opacity-30 absolute -top-8 -right-4">"</span>
              <p className="font-serif text-2xl md:text-3xl leading-tight">No fake smiles, just the best espresso in town.</p>
              <div className="flex items-center gap-3 mt-4 flex-row-reverse">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"><img src={karyawan2} alt="User" className="w-full h-full object-cover" /></div>
                <span className="text-[10px] md:text-xs tracking-widest uppercase font-bold">Michael R.</span>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7 }}
             className="absolute z-20 bottom-16 md:bottom-24 left-8 md:left-1/3 max-w-[200px] md:max-w-[280px] text-white"
           >
              <span className="text-6xl font-serif opacity-30 absolute -top-8 -left-6">"</span>
              <p className="font-serif text-2xl md:text-3xl leading-tight">Tastes like insomnia in a good way.</p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-white/20 flex justify-center items-center font-serif text-lg">J</div>
                <span className="text-[10px] md:text-xs tracking-widest uppercase font-bold">Jason K.</span>
              </div>
           </motion.div>
        </div>
      </section>

      {/* 7. FOOTER SECTION */}
      <footer className="bg-[#F8F1E7] pt-24 pb-8 flex flex-col items-center justify-center relative overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="text-[#C04A25] text-5xl md:text-[14rem] leading-[0.8] font-serif font-black tracking-tighter text-center uppercase mb-16 px-4 z-10 w-full break-words"
        >
          AWAKEN <br/> YOUR SENSES
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center text-[#332218] text-xs font-bold tracking-[0.2em] uppercase border-t border-[#332218]/20 pt-10 mt-4 md:mt-12 gap-8 md:gap-0"
        >
           <div className="flex flex-wrap justify-center gap-6 md:gap-12">
             <a href="https://www.instagram.com/jambang_space" target="_blank" rel="noopener noreferrer" className="hover:text-[#C04A25] transition">Instagram</a>
           </div>
           
           <div className="text-center opacity-60">
             © 2026 JAMBANG SPACE. ALL RIGHTS RESERVED.
           </div>
           
           <div className="flex flex-wrap justify-center gap-6 md:gap-12">
             <a href="#" className="hover:text-[#C04A25] transition">Privacy Policy</a>
             <a href="#" className="hover:text-[#C04A25] transition">Terms of Service</a>
           </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default LandingPage;