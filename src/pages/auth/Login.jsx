import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../Services/supabaseClient';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({ title: "Gagal Masuk!", text: "Email dan password tidak boleh kosong.", icon: "warning", confirmButtonColor: "#c97b4b" });
      return;
    }

    Swal.fire({ title: 'Mengecek kredensial...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); }});

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('name, role')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      Swal.fire({
        title: "Login Berhasil!",
        text: `Selamat datang kembali, ${profileData.name}`,
        icon: "success",
        confirmButtonColor: "#c97b4b", 
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        onLoginSuccess(data.session.access_token, profileData.role, profileData.name);
      });

    } catch (error) {
      Swal.fire({ title: "Autentikasi Gagal!", text: error.message, icon: "error", confirmButtonColor: "#c97b4b" });
    }
  };

  return (
    <div className="fixed inset-0 flex h-screen w-full bg-[#faf8f6] font-sans overflow-hidden z-50">
      
      {/* Bagian Kiri - Gambar dengan Efek Overlay & Animasi */}
      <div className="hidden lg:flex lg:w-1/2 relative h-full overflow-hidden">
        <motion.img 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop" 
          alt="Barista Brewing" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1a0f] via-[#2a1a0f]/40 to-transparent" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-16 left-16 right-16 text-white"
        >
          <p className="text-4xl font-bold italic mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            "Kopi terbaik bermula dari sistem yang terkelola dengan sempurna."
          </p>
          <div className="flex items-center gap-4">
            <img src={logo} alt="Jambang Cafe Logo" className="h-16 w-auto object-contain drop-shadow-md" />
          </div>
        </motion.div>
      </div>

      {/* Bagian Kanan - Formulir */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 h-full overflow-y-auto relative">
        
        {/* Tombol Kembali ke Landing Page */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center justify-center w-10 h-10 bg-white border border-[#e8dfd4] rounded-full shadow-sm text-[#6b5344] hover:text-[#c97b4b] hover:border-[#c97b4b] hover:shadow-md transition-all z-20"
          title="Kembali ke Halaman Utama"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Ornamen Background Animasi Floating */}
        <motion.div 
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#c97b4b] opacity-[0.06] rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-[#3d2817] opacity-[0.05] rounded-full blur-3xl pointer-events-none"
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8dfd4] relative z-10"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-[#3d2817] mb-2 font-serif">Selamat Datang!</h1>
            <p className="text-[#6b5344] text-sm">Masuk untuk mengelola operasional kafe.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className="block text-xs font-bold text-[#3d2817] uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#a89b8d]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <input type="email" name="userEmail" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email anda" className="w-full pl-12 pr-5 py-4 bg-[#faf6f1] border border-[#e8dfd4] rounded-xl focus:ring-2 focus:ring-[#c97b4b]/20 focus:border-[#c97b4b] outline-none transition-all text-[#3d2817]" />
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label className="block text-xs font-bold text-[#3d2817] uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#a89b8d]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <input type={showPassword ? 'text' : 'password'} name="userPassword" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" className="w-full pl-12 pr-16 py-4 bg-[#faf6f1] border border-[#e8dfd4] rounded-xl focus:ring-2 focus:ring-[#c97b4b]/20 focus:border-[#c97b4b] outline-none transition-all text-[#3d2817]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a89b8d] hover:text-[#c97b4b] font-medium text-xs uppercase tracking-wider transition-colors">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-[#c97b4b] focus:ring-[#c97b4b]" />
                <span className="text-xs font-bold text-[#6b5344]">Ingat Saya</span>
              </label>
              <span onClick={() => navigate('/forgot')} className="text-xs text-[#c97b4b] hover:text-[#3d2817] font-bold cursor-pointer transition-colors">Lupa password?</span>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              type="submit" 
              className="w-full bg-[#3d2817] hover:bg-[#c97b4b] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-md transform hover:-translate-y-0.5"
            >
              Mulai Shift Kerja
            </motion.button>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center text-xs text-[#6b5344] mt-8 pt-6 border-t border-[#e8dfd4]">
              Belum terdaftar di sistem? <span onClick={() => navigate('/register')} className="text-[#c97b4b] hover:text-[#3d2817] font-bold cursor-pointer transition-colors">Buat Akun</span>
            </motion.p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}