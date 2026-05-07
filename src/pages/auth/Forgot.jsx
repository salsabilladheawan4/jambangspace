export default function Forgot() {
    return (
        <div className="font-instrument">
            <h2 className="text-2xl font-black text-gray-800 mb-2 text-center uppercase tracking-tighter">
                Reset Password
            </h2>
            
            <p className="text-[11px] text-gray-400 mb-8 text-center font-medium">
                Masukkan email untuk menerima tautan pemulihan akses sistem Jambang.
            </p>

            <form className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none"
                        placeholder="you@example.com"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#1A1A1A] text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-[2px] shadow-md"
                >
                    Kirim Link Reset
                </button>
            </form>
        </div>
    );
}