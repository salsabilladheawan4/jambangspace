import React, { Suspense, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./assets/tailwind.css";
import Loading from "./components/Loading";

// Layouts & Auth
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const ErrorPage = React.lazy(() => import("./pages/NotFound"));

// Admin Pages
const AdminDashboard = React.lazy(() =>
  import("./pages/Admin/AdminDashboard")
);
const AdminLaporan = React.lazy(() =>
  import("./pages/Admin/AdminLaporan")
);

// Staff Pages
const StaffDashboard = React.lazy(() =>
  import("./pages/Staff/StaffDashboard")
);
const StaffInventaris = React.lazy(() =>
  import("./pages/Staff/StaffInventaris")
);
const StaffKasir = React.lazy(() =>
  import("./pages/Staff/StaffKasir")
);

// Product Pages
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetail = React.lazy(() => import("./pertemuan-1/pages/ProductDetail"));

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const [userRole, setUserRole] = useState(
    localStorage.getItem("role") || null
  );

  const [userName, setUserName] = useState(
    localStorage.getItem("name") || ""
  );

  const [laporanPenjualan, setLaporanPenjualan] = useState([]);
  const [laporanBelanja, setLaporanBelanja] = useState([]);

  const handleLoginSuccess = (userToken, role, name) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);

    setToken(userToken);
    setUserRole(role);
    setUserName(name);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Keluar Sistem?",
      text: "Anda harus login kembali untuk mengakses workspace Jambang.",
      icon: "warning",
      showCancelButton: true,
      background: "#1E1E1E",
      color: "#FFF",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#2D2D2D",
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
      customClass: {
        popup: "rounded-[24px]",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();

        setToken(null);
        setUserRole(null);
        setUserName("");

        Swal.fire({
          title: "Berhasil Keluar",
          text: "Sesi kerja Anda telah berakhir.",
          icon: "success",
          background: "#1E1E1E",
          color: "#FFF",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* ==================== ROUTE WAJIB LOGIN ==================== */}
        <Route
          element={
            token ? (
              <MainLayout
                userRole={userRole}
                userName={userName}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          {/* Dashboard */}
          <Route
            path="/"
            element={
              userRole === "admin" ? (
                <AdminDashboard
                  dataPenjualan={laporanPenjualan}
                  dataBelanja={laporanBelanja}
                />
              ) : (
                <StaffDashboard
                  staffName={userName}
                  dataPenjualan={laporanPenjualan}
                  dataBelanja={laporanBelanja}
                />
              )
            }
          />

          {/* Products */}
          <Route
            path="/products"
            element={<Products />}
          />

          {/* Product Detail */}
          <Route
            path="/products/:id"
            element={<ProductDetail />}
          />

          {/* Inventaris */}
          <Route
            path="/inventaris"
            element={
              userRole === "staff" ? (
                <StaffInventaris
                  staffName={userName}
                  userRole={userRole}
                  onAddBelanja={(data) =>
                    setLaporanBelanja([...laporanBelanja, data])
                  }
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Kasir */}
          <Route
            path="/kasir"
            element={
              userRole === "staff" ? (
                <StaffKasir
                  staffName={userName}
                  userRole={userRole}
                  onAddPenjualan={(data) =>
                    setLaporanPenjualan([...laporanPenjualan, data])
                  }
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Laporan */}
          <Route
            path="/laporan"
            element={
              userRole === "admin" ? (
                <AdminLaporan
                  dataPenjualan={laporanPenjualan}
                  dataBelanja={laporanBelanja}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Route>

        {/* ==================== AUTH ==================== */}
        <Route
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <AuthLayout />
            )
          }
        >
          <Route
            path="/login"
            element={
              <Login
                onLoginSuccess={handleLoginSuccess}
              />
            }
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot"
            element={<Forgot />}
          />
        </Route>

        {/* ==================== 404 ==================== */}
        <Route
          path="*"
          element={
            <ErrorPage
              kodeError="404"
              deskripsiError="Halaman Tidak Ditemukan"
            />
          }
        />

      </Routes>
    </Suspense>
  );
}

export default App;