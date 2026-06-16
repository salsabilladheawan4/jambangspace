import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#faf6f1] flex flex-col justify-center items-center px-6 text-[#3d2817]">
            <h1 className="text-9xl font-black">404</h1>
            <h2 className="mt-4 text-3xl font-bold">Ups! Halaman tidak ditemukan.</h2>
            <Link to="/" className="mt-8 bg-[#c97b4b] text-white px-8 py-3 rounded-full font-bold">Kembali ke Beranda</Link>
        </div>
    );
}