import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-indigo-600 animate-bounce">
                    404
                </h1>
                
                <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-5xl">
                    Ups! Halaman tidak ditemukan.
                </h2>
                
                <p className="mt-6 text-base text-gray-600">
                    Maaf, kami tidak bisa menemukan halaman yang Anda cari.
                </p>

                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to="/"
                        className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
                    >
                        Kembali ke Beranda
                    </Link>
                    
                    <Link 
                        to="/support" 
                        className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
                    >
                        Hubungi Bantuan →
                    </Link>
                </div>
            </div>
        </div>
    );
}