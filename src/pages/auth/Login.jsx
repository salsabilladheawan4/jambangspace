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
        background: "#faf6f1",
        color: "#3d2817",
        confirmButtonColor: "#c97b4b",
      });
      return;
    }

    // 2. SIMULASI LOGIN BERDASARKAN ROLE
    if (email === "owner@jambang.com" && password === "admin123") {
      Swal.fire({
        title: "Login Berhasil!",
        text: "Anda berhasil login sebagai Admin (Owner)",
        icon: "success",
        background: "#faf6f1",
        color: "#3d2817",
        confirmButtonColor: "#3d4a3e", 
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        onLoginSuccess("mock-token-admin-xyz", "admin", "Owner Jambang");
      });
    } else if (email === "staff@jambang.com" && password === "staff123") {
      Swal.fire({
        title: "Login Berhasil!",
        text: "Anda berhasil login sebagai Staff (Barista)",
        icon: "success",
        background: "#faf6f1",
        color: "#3d2817",
        confirmButtonColor: "#c97b4b", 
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
        background: "#faf6f1",
        color: "#3d2817",
        confirmButtonColor: "#c97b4b",
      });
    }
  };

  return (
    <form
      onSubmit={handleLoginSubmit}
      className="flex flex-col gap-4 font-instrument"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-[#6b5344] uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Masukkan email anda..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3.5 bg-[#faf6f1] border border-[#e8dfd4] rounded-xl text-[#3d2817] text-sm focus:outline-none focus:border-[#c97b4b] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-[#6b5344] uppercase tracking-wider">
          Password
        </label>
        <input
          type="password"
          placeholder="Masukkan password anda..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3.5 bg-[#faf6f1] border border-[#e8dfd4] rounded-xl text-[#3d2817] text-sm focus:outline-none focus:border-[#c97b4b] transition-colors"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#3d2817] text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs mt-2 hover:bg-[#c97b4b] active:scale-[0.98] transition-all shadow-sm"
      >
        Masuk Sistem
      </button>
    </form>
  );
}