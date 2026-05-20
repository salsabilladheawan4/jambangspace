import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // 1. VALIDASI JIKA INPUTAN KOSONG
    if (!email || !password) {
      Swal.fire({
        title: "Gagal Masuk!",
        text: "Email dan password tidak boleh kosong.",
        icon: "warning",
        background: "#1E1E1E",
        color: "#FFF",
        confirmButtonColor: "#374151",
      });
      return;
    }

    // 2. SIMULASI LOGIN BERDASARKAN ROLE
    if (email === "owner@jambang.com" && password === "admin123") {
      // JIKA BERHASIL LOGIN SEBAGAI ADMIN
      Swal.fire({
        title: "Login Berhasil!",
        text: "Anda berhasil login sebagai Admin (Owner)",
        icon: "success",
        background: "#1E1E1E",
        color: "#FFF",
        confirmButtonColor: "#06B6D4", // Warna aksen cyan untuk admin
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        onLoginSuccess("mock-token-admin-xyz", "admin", "Owner Jambang");
      });
    } else if (email === "staff@jambang.com" && password === "staff123") {
      // JIKA BERHASIL LOGIN SEBAGAI STAFF
      Swal.fire({
        title: "Login Berhasil!",
        text: "Anda berhasil login sebagai Staff (Barista)",
        icon: "success",
        background: "#1E1E1E",
        color: "#FFF",
        confirmButtonColor: "#F59E0B", // Warna aksen orange/amber untuk staff
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        onLoginSuccess("mock-token-staff-abc", "staff", "Safa (Shift Sore)");
      });
    } else {
      // JIKA EMAIL ATAU PASSWORD SALAH
      Swal.fire({
        title: "Autentikasi Gagal!",
        text: "Email atau password yang Anda masukkan salah.",
        icon: "error",
        background: "#1E1E1E",
        color: "#FFF",
        confirmButtonColor: "#EF4444", // Warna merah untuk error
      });
    }
  };

  return (
    <form
      onSubmit={handleLoginSubmit}
      className="flex flex-col gap-4 font-instrument"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Masukkan email anda..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-black text-sm focus:outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">
          Password
        </label>
        <input
          type="password"
          placeholder="Masukkan password anda..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-black text-sm focus:outline-none focus:border-gray-400 transition-colors"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs mt-2 hover:bg-gray-900 active:scale-[0.98] transition-all shadow-md"
      >
        Masuk Sistem
      </button>
    </form>
  );
}
