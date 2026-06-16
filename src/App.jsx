import React, { Suspense, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './assets/tailwind.css';
import Loading from './components/Loading';

// Import Layouts & Pages (Lazy Load)
const MainLayout = React.lazy(() => import('./layouts/MainLayout'));
const AuthLayout = React.lazy(() => import('./layouts/AuthLayout'));
const GuestLayout = React.lazy(() => import('./layouts/GuestLayout')); 
const Login = React.lazy(() => import('./pages/auth/Login'));
const AdminDashboard = React.lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminLaporan = React.lazy(() => import('./pages/Admin/AdminLaporan'));
const StaffDashboard = React.lazy(() => import('./pages/Staff/StaffDashboard'));
const StaffInventaris = React.lazy(() => import('./pages/Staff/StaffInventaris'));
const StaffKasir = React.lazy(() => import('./pages/Staff/StaffKasir'));
const Products = React.lazy(() => import('./pages/Products'));

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || null);
  const [userName, setUserName] = useState(localStorage.getItem('name') || '');

  const [laporanPenjualan, setLaporanPenjualan] = useState([]);
  const [laporanBelanja, setLaporanBelanja] = useState([]);

  // DATA PUSAT MENU (Inilah yang menghubungkan Admin & Staff)
  const [menuList, setMenuList] = useState([
    { id: 1, title: "Kopi Susu Gula Aren Jambang", category: "Kopi", price: 18000 },
    { id: 2, title: "Matcha Latte Ice", category: "Non-Kopi", price: 20000 },
    { id: 3, title: "Nasi Goreng Kampung Jambang", category: "Makanan", price: 25000 },
  ]);

  const handleLoginSuccess = (userToken, role, name) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('role', role);
    localStorage.setItem('name', name);
    setToken(userToken);
    setUserRole(role);
    setUserName(name);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUserRole(null);
    window.location.reload();
  };

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<GuestLayout />}><Route path="/" element={<p>Landing Page</p>} /></Route>

        <Route element={token ? <MainLayout userRole={userRole} userName={userName} onLogout={handleLogout} /> : <Navigate to="/login" replace />}>
          <Route path="/dashboard" element={userRole?.toLowerCase() === 'admin' ? <AdminDashboard dataPenjualan={laporanPenjualan} dataBelanja={laporanBelanja} /> : <StaffDashboard staffName={userName} dataPenjualan={laporanPenjualan} dataBelanja={laporanBelanja} />} />
          <Route path="/products" element={<Products menuList={menuList} setMenuList={setMenuList} userRole={userRole} />} />
          <Route path="/inventaris" element={<StaffInventaris staffName={userName} onAddBelanja={(data) => setLaporanBelanja([...laporanBelanja, data])} />} />
          <Route path="/kasir" element={<StaffKasir staffName={userName} menuList={menuList} onAddPenjualan={(data) => setLaporanPenjualan([...laporanPenjualan, data])} />} />
          <Route path="/laporan" element={<AdminLaporan dataPenjualan={laporanPenjualan} dataBelanja={laporanBelanja} />} />
        </Route>

        <Route element={token ? <Navigate to="/dashboard" replace /> : <AuthLayout />}>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default App;