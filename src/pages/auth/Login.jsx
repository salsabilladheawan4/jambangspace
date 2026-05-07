import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);
    const [dataForm, setDataForm] = useState({
        email: "caca@gmail.com",
        password: "caca124",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulasi validasi sistem Jambang selama 1.5 detik
        setTimeout(() => {
            setLoading(false);
            // Langsung diarahkan ke Dashboard sesuai alur sistem
            navigate("/"); 
        }, 1500);
    };

    return (
        <div className="font-instrument">
            <h2 className="text-2xl font-black text-gray-800 mb-6 text-center uppercase tracking-tighter">
                 Login
            </h2>

            {loading && (
                <div className="bg-gray-50 mb-5 p-4 text-xs font-bold text-gray-500 rounded-xl flex items-center border border-gray-100">
                    <ImSpinner2 className="me-2 animate-spin" />
                    Memvalidasi Kredensial Jambang...
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-black font-medium outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                        required
                    />
                </div>
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm text-black font-medium outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1A1A1A] hover:bg-black text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-[2px] shadow-lg disabled:opacity-50 transition-all"
                >
                    {loading ? "Menghubungkan..." : "Masuk ke Sistem"}
                </button>
            </form>
            <p className="mt-8 text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                © 2026 Jambang Management. All Rights Reserved.
            </p>
        </div>
    );
}