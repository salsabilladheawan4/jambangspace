export default function Register() {
    return (
        <div className="font-instrument">
            <h2 className="text-2xl font-black text-gray-800 mb-6 text-center uppercase tracking-tighter">
                Daftar Akun
            </h2>

            <form className="space-y-5">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-gray-100"
                        placeholder="user@jambang.com"
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none"
                        placeholder="********"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#1A1A1A] text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-[2px] hover:bg-black transition-all"
                >
                    Buat Akun Baru
                </button>
            </form>
        </div>
    );
}