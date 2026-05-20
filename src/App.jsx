import React, { Suspense, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./assets/tailwind.css";
import Loading from "./components/Loading";

// Lazy Loading Layouts & Auth
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const ErrorPage = React.lazy(() => import("./pages/NotFound"));

// Lazy Loading Pages Sisi ADMIN
const AdminDashboard = React.lazy(() => import("./pages/Admin/AdminDashboard"));
const AdminLaporan = React.lazy(() => import("./pages/Admin/AdminLaporan")); 

// Lazy Loading Pages Sisi STAFF
const StaffDashboard = React.lazy(() => import("./pages/Staff/StaffDashboard"));
const StaffInventaris = React.lazy(() => import("./pages/Staff/StaffInventaris")); 
const StaffKasir = React.lazy(() => import("./pages/Staff/StaffKasir"));

function App() {
  // Ambil session login dari localStorage agar status tidak hilang saat page di-refresh
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || null); 
  const [userName, setUserName] = useState(localStorage.getItem("name") || "");

  // State global untuk menampung aliran data transaksi dari Staff ke Admin
  const [laporanPenjualan, setLaporanPenjualan] = useState([]);
  const [laporanBelanja, setLaporanBelanja] = useState([]);

  // Fungsi yang dipanggil saat Login.jsx berhasil memvalidasi akun
  const handleLoginSuccess = (userToken, role, name) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    setToken(userToken);
    setUserRole(role);
    setUserName(name);
  };

  // Fungsi Logout dengan Pop-up konfirmasi SweetAlert2 yang aman
  const handleLogout = () => {
    Swal.fire({
      title: "Keluar Sistem?",
      text: "Anda harus login kembali untuk mengakses workspace Jambang.",
      icon: "warning",
      showCancelButton: true,
      background: "#1E1E1E",
      color: "#FFF",
      confirmButtonColor: "#EF4444", // Merah untuk konfirmasi keluar
      cancelButtonColor: "#2D2D2D",  // Gelap untuk batal
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
      customClass: {
        popup: 'rounded-[24px]'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Hapus session storage browser
        localStorage.clear();
        setToken(null);
        setUserRole(null);
        setUserName("");
        
        // Notifikasi penutup berhasil logout
        Swal.fire({
          title: "Berhasil Keluar",
          text: "Sesi kerja Anda telah berakhir.",
          icon: "success",
          background: "#1E1E1E",
          color: "#FFF",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-[#121212] min-h-screen text-white antialiased font-instrument">
        <Routes>
          
          {/* ==================== JALUR PROTEKSI UTAMA (WAJIB LOGIN) ==================== */}
          <Route 
            element={
              token ? (
                <MainLayout userRole={userRole} userName={userName} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            {/* 1. Halaman Utama (Dashboard) Otomatis Berubah Tampilan Sesuai Role Akun */}
            <Route path="/" element={
              userRole === "admin" 
                ? <AdminDashboard dataPenjualan={laporanPenjualan} dataBelanja={laporanBelanja} />
                : <StaffDashboard staffName={userName} dataPenjualan={laporanPenjualan} dataBelanja={laporanBelanja} />
            } />

            {/* 2. Menu Khusus Role Staff */}
            <Route path="/inventaris" element={
              userRole === "staff" 
                ? <StaffInventaris staffName={userName} userRole={userRole} onAddBelanja={(data) => setLaporanBelanja([...laporanBelanja, data])} />
                : <Navigate to="/" replace />
            } />

            <Route path="/kasir" element={
              userRole === "staff" 
                ? <StaffKasir staffName={userName} userRole={userRole} onAddPenjualan={(data) => setLaporanPenjualan([...laporanPenjualan, data])} />
                : <Navigate to="/" replace />
            } />

            {/* 3. Menu Khusus Role Admin */}
            <Route path="/laporan" element={
              userRole === "admin" 
                ? <AdminLaporan dataPenjualan={laporanPenjualan} dataBelanja={laporanBelanja} />
                : <Navigate to="/" replace />
            } />
          </Route>

          {/* ==================== JALUR GERBANG MASUK (AUTH LAYOUT) ==================== */}
          <Route element={token ? <Navigate to="/" replace /> : <AuthLayout />}>
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* Fallback Rute Error jika ketik alamat asal-asalan */}
          <Route path="*" element={<ErrorPage kodeError="404" deskripsiError="Halaman Tidak Ditemukan" />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;