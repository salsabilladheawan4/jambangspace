import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/tailwind.css";
import Loading from "./components/Loading";

// Lazy Loading Pages sesuai rute Jambang-App
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Invetaris = React.lazy(() => import("./pages/Invetaris"));
const Kasir = React.lazy(() => import("./pages/Kasir"));
const Laporan = React.lazy(() => import("./pages/Laporan"));
const Resep = React.lazy(() => import("./pages/MenuResep"));
const ErrorPage = React.lazy(() => import("./pages/NotFound"));

// Layouts & Auth
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="bg-[#121212] min-h-screen text-white antialiased font-instrument">
        <Routes>
          {/* Main Layout: Dashboard, Inventaris, Kasir, Laporan, Menu & Resep */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventaris" element={<Invetaris />} />
            <Route path="/kasir" element={<Kasir />} />
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/menuresep" element={<Resep />} />
          </Route>

          {/* Auth Layout: Login, Register, Forgot Password */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* Fallback Error */}
          <Route path="*" element={<ErrorPage kodeError="404" deskripsiError="Halaman Tidak Ditemukan" />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;