import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { supabase, supabaseSecondary } from '../../Services/supabaseClient';
import Swal from 'sweetalert2';

export default function AdminStaff({ userRole }) {
    const breadcrumb = ["Dashboard", "Data Staff"];
    
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('staff');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchStaff = async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });
                
            if (error) {
                console.error("Gagal menarik data staff:", error);
                setErrorMsg(error.message);
                setStaffList([]);
            } else {
                setStaffList(data || []);
            }
        } catch (err) {
            console.error("Kesalahan sistem:", err);
            setErrorMsg(err.message || 'Unknown error');
            setStaffList([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleAddStaff = async (e) => {
        e.preventDefault();
        
        if (!name || !email || !password) {
            Swal.fire({ title: "Gagal!", text: "Semua kolom harus diisi.", icon: "warning", confirmButtonColor: "#c97b4b" });
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Gunakan supabaseSecondary agar sesi Admin tidak tertimpa
            const { data, error } = await supabaseSecondary.auth.signUp({
                email: email.trim(),
                password: password
            });

            if (error) throw error;

            if (data.user) {
                // Simpan ke tabel profiles (bisa gunakan supabase utama)
                const { error: profileError } = await supabase.from('profiles').insert([{ 
                    id: data.user.id, 
                    name: name, 
                    role: role 
                }]);
                
                if (profileError) throw profileError;
            }

            Swal.fire({
                title: "Berhasil!", 
                text: "Akun baru telah ditambahkan ke dalam sistem.", 
                icon: "success", 
                confirmButtonColor: "#c97b4b"
            });

            // Reset form dan tutup modal
            setName('');
            setEmail('');
            setPassword('');
            setRole('staff');
            setShowModal(false);
            
            // Refresh tabel
            fetchStaff();

        } catch (error) {
            Swal.fire({ title: "Gagal Mendaftarkan Akun!", text: error.message, icon: "error", confirmButtonColor: "#c97b4b" });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (userRole?.toLowerCase() !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#faf8f6]">
                <h1 className="text-2xl font-bold text-red-500">Akses Ditolak</h1>
                <p className="text-gray-500">Hanya Admin yang dapat mengakses halaman ini.</p>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10 font-sans text-[#3d2817] bg-[#faf8f6] min-h-screen relative">
            <PageHeader title="Data Karyawan / Staff" breadcrumb={breadcrumb} userRole={userRole} />

            <div className="bg-white overflow-hidden rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-2 md:p-6 mt-6">
                <div className="p-6 md:px-8 border-b border-transparent bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-xl font-bold text-gray-800">Daftar Akun Sistem</h2>
                    <div className="flex items-center gap-4">
                        <button onClick={fetchStaff} className="text-sm text-[#c97b4b] hover:text-[#3d2817] font-bold underline">
                            Refresh Data
                        </button>
                        <button 
                            onClick={() => setShowModal(true)}
                            className="bg-[#3d2817] hover:bg-[#c97b4b] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-colors flex items-center gap-2"
                        >
                            <span>+</span> Tambah Staff Baru
                        </button>
                    </div>
                </div>
                
                {errorMsg && (
                    <div className="m-6 p-4 bg-red-50 text-red-600 rounded-xl font-medium">
                        Error: {errorMsg}
                    </div>
                )}
                
                <div className="flex-1 overflow-x-auto">
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-white sticky top-0 z-10">
                            <tr className="text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-100">
                                <th className="pb-4 pt-2 px-6">Nama Lengkap</th>
                                <th className="pb-4 pt-2 px-6">Role (Peran)</th>
                                <th className="pb-4 pt-2 px-6">ID Pengguna</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="3" className="px-6 py-10 text-center text-gray-400 font-bold">Memuat data staff...</td></tr>
                            ) : staffList.length === 0 ? (
                                <tr><td colSpan="3" className="px-6 py-10 text-center text-gray-400 font-bold">Belum ada akun terdaftar.</td></tr>
                            ) : (
                                staffList.map((staff, i) => (
                                    <tr key={staff.id || i} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#3d2817] text-white flex items-center justify-center font-bold text-sm">
                                                    {staff.name ? staff.name.substring(0, 2).toUpperCase() : 'U'}
                                                </div>
                                                <span className="font-bold text-sm text-gray-800">{staff.name || 'Tanpa Nama'}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                                                staff.role === 'admin' 
                                                ? 'bg-[#ffe9d6] text-[#c97b4b]' 
                                                : 'bg-[#ecfdf3] text-[#12b76a]'
                                            }`}>
                                                {staff.role}
                                            </span>
                                        </td>
                                        <td className="py-5 px-6 font-mono text-xs text-gray-400">
                                            {staff.id}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Tambah Staff Premium & Luwes */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2a1b12]/50 backdrop-blur-md transition-all">
                    <div className="bg-white rounded-[40px] w-full max-w-[480px] shadow-[0_20px_60px_rgba(61,40,23,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-300 relative border border-white/50">
                        
                        {/* Efek Glow Latar Belakang Modal */}
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-[#c97b4b]/20 rounded-full blur-[60px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-[#e8dfd4]/40 rounded-full blur-[60px] pointer-events-none"></div>

                        {/* Tombol Close Mengambang */}
                        <button 
                            onClick={() => setShowModal(false)}
                            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 z-10 group"
                        >
                            <svg className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        
                        <div className="p-8 sm:p-10 relative z-10">
                            {/* Header yang Luwes */}
                            <div className="text-center mb-10 mt-2">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-[#3d2817] to-[#8b6f47] rounded-3xl shadow-[0_10px_30px_rgba(139,111,71,0.3)] mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <span className="text-4xl filter drop-shadow-md">✨</span>
                                </div>
                                <h3 className="text-3xl font-black text-[#3d2817] tracking-tight mb-2">Anggota Baru</h3>
                                <p className="text-gray-500 text-sm font-medium px-4">Daftarkan akun karyawan untuk memberikan akses ke sistem Jambang.</p>
                            </div>
                            
                            <form onSubmit={handleAddStaff} className="space-y-6">
                                {/* Input Nama */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#c97b4b] transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    </div>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        className="w-full bg-[#fdfcfb] border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-[#3d2817] focus:outline-none focus:border-[#c97b4b] focus:ring-4 focus:ring-[#c97b4b]/10 transition-all placeholder-gray-400 hover:border-gray-300 shadow-sm"
                                        placeholder="Nama Lengkap Karyawan"
                                        required
                                    />
                                </div>
                                
                                {/* Input Email */}
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#c97b4b] transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <input 
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className="w-full bg-[#fdfcfb] border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-[#3d2817] focus:outline-none focus:border-[#c97b4b] focus:ring-4 focus:ring-[#c97b4b]/10 transition-all placeholder-gray-400 hover:border-gray-300 shadow-sm"
                                        placeholder="Alamat Email (Cth: nama@jambang.com)"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Select Role Custom yang Luwes */}
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#c97b4b] transition-colors z-10">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        </div>
                                        
                                        <div 
                                            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                                            className={`w-full bg-[#fdfcfb] border ${showRoleDropdown ? 'border-[#c97b4b] ring-4 ring-[#c97b4b]/10' : 'border-gray-200'} rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-[#3d2817] cursor-pointer flex justify-between items-center transition-all hover:border-gray-300 shadow-sm`}
                                        >
                                            <span>{role === 'admin' ? 'Admin' : 'Staff Kasir'}</span>
                                            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showRoleDropdown ? 'rotate-180 text-[#c97b4b]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>

                                        {showRoleDropdown && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                                <div 
                                                    onClick={() => { setRole('staff'); setShowRoleDropdown(false); }}
                                                    className={`px-4 py-3 text-sm font-bold cursor-pointer transition-all flex items-center gap-2 ${role === 'staff' ? 'bg-[#fff4ed] text-[#c97b4b]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                                                >
                                                    {role === 'staff' && <span className="w-1.5 h-1.5 rounded-full bg-[#c97b4b]"></span>}
                                                    Staff Kasir
                                                </div>
                                                <div 
                                                    onClick={() => { setRole('admin'); setShowRoleDropdown(false); }}
                                                    className={`px-4 py-3 text-sm font-bold cursor-pointer transition-all flex items-center gap-2 ${role === 'admin' ? 'bg-[#fff4ed] text-[#c97b4b]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                                                >
                                                    {role === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-[#c97b4b]"></span>}
                                                    Admin Area
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Input Password */}
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#c97b4b] transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                        </div>
                                        <input 
                                            type="password" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            className="w-full bg-[#fdfcfb] border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-[#3d2817] focus:outline-none focus:border-[#c97b4b] focus:ring-4 focus:ring-[#c97b4b]/10 transition-all placeholder-gray-400 hover:border-gray-300 shadow-sm"
                                            placeholder="Buat Password"
                                            required
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className={`w-full py-4 mt-6 rounded-2xl text-sm font-black text-white uppercase tracking-widest transition-all shadow-[0_10px_25px_rgba(61,40,23,0.2)] hover:shadow-[0_15px_35px_rgba(61,40,23,0.3)] transform hover:-translate-y-1 flex items-center justify-center gap-3 relative overflow-hidden group ${
                                        isSubmitting ? 'bg-gray-400 cursor-not-allowed shadow-none hover:translate-y-0' : 'bg-[#3d2817]'
                                    }`}
                                >
                                    {/* Efek Kilap di Button */}
                                    {!isSubmitting && <div className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>}
                                    
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            DAFTARKAN SEKARANG
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
