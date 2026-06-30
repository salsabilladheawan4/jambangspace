import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Forgot() {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 flex h-screen w-full bg-[#faf8f6] font-sans overflow-hidden z-50">
            {/* Bagian Kiri - Gambar */}
            <div className="hidden lg:flex lg:w-1/2 relative h-full overflow-hidden">
                <motion.img 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src="https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1524d5cd3-2963-478a-9e4f-c6622adc321f.png" 
                    alt="Manual Brew Coffee" 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a1a0f] via-[#2a1a0f]/40 to-transparent" />
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                    className="absolute bottom-16 left-16 right-16 text-white"
                >
                    <p className="text-4xl font-bold italic mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                        "Setiap tetes berharga. Begitu juga dengan akses Anda."
                    </p>
                    <div>
                        <p className="font-semibold text-xl text-[#c97b4b]">Sistem Pemulihan</p>
                        <p className="text-base opacity-80 uppercase tracking-widest text-xs mt-1">Jambang Cafe</p>
                    </div>
                </motion.div>
            </div>

            {/* Bagian Kanan - Formulir */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 h-full relative overflow-hidden">
                
                {/* Ornamen Background Animasi Floating */}
                <motion.div 
                    animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} 
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[5%] right-[-10%] w-96 h-96 bg-[#c97b4b] opacity-[0.05] rounded-full blur-3xl pointer-events-none"
                />
                <motion.div 
                    animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-[-5%] left-[-10%] w-80 h-80 bg-[#3d2817] opacity-[0.04] rounded-full blur-3xl pointer-events-none"
                />

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-md bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8dfd4] relative z-10"
                >
                    <div className="text-center mb-10">
                        {/* Ikon Kunci Animasi Floating */}
                        <motion.div 
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="w-16 h-16 bg-[#faf6f1] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#c97b4b] shadow-sm transform rotate-12"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </motion.div>
                        <h1 className="text-3xl font-bold text-[#3d2817] mb-3 font-serif">Ubah Password</h1>
                        <p className="text-[#6b5344] text-sm leading-relaxed">
                            Silakan masukkan password lama Anda dan password baru yang ingin digunakan.
                        </p>
                    </div>

                    <form className="space-y-6">
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                            <label className="block text-xs font-bold text-[#3d2817] uppercase tracking-widest mb-2">Password Lama</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#a89b8d]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <input
                                    type="password"
                                    className="w-full pl-12 pr-5 py-4 bg-[#faf6f1] border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-[#c97b4b]/20 focus:border-[#c97b4b] outline-none transition-all text-[#3d2817] placeholder-[#a89b8d]"
                                    placeholder="••••••••"
                                />
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <label className="block text-xs font-bold text-[#3d2817] uppercase tracking-widest mb-2">Password Baru</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#a89b8d]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                                </div>
                                <input
                                    type="password"
                                    className="w-full pl-12 pr-5 py-4 bg-[#faf6f1] border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-[#c97b4b]/20 focus:border-[#c97b4b] outline-none transition-all text-[#3d2817] placeholder-[#a89b8d]"
                                    placeholder="••••••••"
                                />
                            </div>
                        </motion.div>
                        
                        <motion.button
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            type="submit"
                            className="w-full bg-[#3d2817] hover:bg-[#c97b4b] text-white font-bold py-4 rounded-xl text-sm tracking-wider uppercase shadow-md transition-all transform hover:-translate-y-0.5"
                        >
                            Simpan Password Baru
                        </motion.button>
                    </form>

                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="text-center mt-8 border-t border-[#e8dfd4] pt-6"
                    >
                        <p className="text-sm text-[#6b5344]">
                            Teringat password Anda?{' '}
                            <span onClick={() => navigate('/login')} className="text-[#c97b4b] hover:text-[#3d2817] font-bold cursor-pointer transition-colors">
                                Kembali ke Login
                            </span>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}