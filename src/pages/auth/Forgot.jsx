export default function Forgot() {
    return (
        <div className="font-instrument">
            <h2 className="text-2xl font-black text-[#3d2817] mb-2 text-center uppercase tracking-tighter" style={{ fontFamily: "'Georgia', serif" }}>
                Reset Password
            </h2>
            
            <p className="text-[11px] text-[#6b5344] mb-8 text-center font-medium">
                Masukkan email untuk menerima tautan pemulihan akses sistem Jambang.
            </p>

            <form className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black text-[#6b5344] uppercase tracking-widest mb-2">Email Address</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 bg-[#faf6f1] border border-[#e8dfd4] focus:border-[#c97b4b] rounded-xl text-[#3d2817] text-sm outline-none transition-all"
                        placeholder="you@example.com"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#3d2817] hover:bg-[#c97b4b] text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-[2px] shadow-sm transition-all"
                >
                    Kirim Link Reset
                </button>
            </form>
        </div>
    );
}