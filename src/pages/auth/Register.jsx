export default function Register() {
    return (
        <div className="font-instrument">
            <h2 className="text-2xl font-black text-[#3d2817] mb-6 text-center uppercase tracking-tighter" style={{ fontFamily: "'Georgia', serif" }}>
                Daftar Akun
            </h2>

            <form className="space-y-5">
                <div>
                    <label className="block text-[10px] font-black text-[#6b5344] uppercase tracking-widest mb-2">Email Address</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 bg-[#faf6f1] border border-[#e8dfd4] focus:border-[#c97b4b] rounded-xl text-[#3d2817] text-sm outline-none transition-all"
                        placeholder="user@jambang.com"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-black text-[#6b5344] uppercase tracking-widest mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-3 bg-[#faf6f1] border border-[#e8dfd4] focus:border-[#c97b4b] rounded-xl text-[#3d2817] text-sm outline-none transition-all"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#3d2817] hover:bg-[#c97b4b] text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-[2px] transition-all shadow-sm"
                >
                    Buat Akun Baru
                </button>
            </form>
        </div>
    );
}