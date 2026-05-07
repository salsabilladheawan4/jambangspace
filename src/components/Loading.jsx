// src/components/Loading.jsx
export default function Loading() {
    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner sederhana */}
                <div className="w-12 h-12 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
                <p className="text-white font-instrument text-sm animate-pulse tracking-widest uppercase">
                    Loading System...
                </p>
            </div>
        </div>
    );
}