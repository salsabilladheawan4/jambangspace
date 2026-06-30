import React, { Suspense, useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './assets/tailwind.css';
import Loading from './components/Loading';

// PENTING: Tambahkan import Supabase Client
import { supabase } from './Services/supabaseClient'; 

// Import Layouts & Pages
const MainLayout = React.lazy(() => import('./layouts/MainLayout'));
const AuthLayout = React.lazy(() => import('./layouts/AuthLayout'));
const GuestLayout = React.lazy(() => import('./layouts/GuestLayout'));

// Rute Otentikasi
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register')); // SUDAH DITAMBAHKAN
const Forgot = React.lazy(() => import('./pages/auth/Forgot'));     // SUDAH DITAMBAHKAN

// Rute Halaman Dalam (Dashboard dkk)
const AdminDashboard = React.lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminLaporan = React.lazy(() => import('./pages/Admin/AdminLaporan'));
const AdminResep = React.lazy(() => import('./pages/Admin/AdminResep'));
const StaffDashboard = React.lazy(() => import('./pages/Staff/StaffDashboard'));
const StaffInventaris = React.lazy(() => import('./pages/Staff/StaffInventaris'));
const StaffKasir = React.lazy(() => import('./pages/Staff/StaffKasir'));
const Products = React.lazy(() => import('./pages/Products'));

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || null);
  const [userName, setUserName] = useState(localStorage.getItem('name') || '');
  
  // State Kosong (Akan diisi oleh Supabase)
  const [laporanPenjualan, setLaporanPenjualan] = useState([]);
  const [laporanBelanja, setLaporanBelanja] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [tabelBahanBaku, setTabelBahanBaku] = useState([]);
  const [tabelResep, setTabelResep] = useState([]);

  // ---------------------------------------------------------
  // FUNGSI UNTUK MENARIK SEMUA DATA DARI SUPABASE
  // ---------------------------------------------------------
  useEffect(() => {
    const fetchSemuaData = async () => {
      
      // 1. Tarik Data Laporan Penjualan (Tabel sales & sale_items)
      const { data: sales } = await supabase
        .from('sales')
        .select('id, created_at, total_qty, total_amount, staff_name, sale_items(menu_name, qty)')
        .order('created_at', { ascending: false });

      if (sales) {
        const formattedSales = sales.map(sale => {
          const dateObj = new Date(sale.created_at);
          return {
            id: sale.id,
            tanggal: dateObj.toLocaleDateString('id-ID'),
            jam: dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            namaMenu: sale.sale_items ? sale.sale_items.map(item => `${item.menu_name} (x${item.qty})`).join(', ') : '-',
            qty: sale.total_qty,
            total: sale.total_amount,
            staff: sale.staff_name
          };
        });
        setLaporanPenjualan(formattedSales);
      }

      // 2. Tarik Data Laporan Belanja (Tabel purchases)
      const { data: purchases } = await supabase
        .from('purchases')
        .select('*')
        .order('created_at', { ascending: false });

      if (purchases) {
        const formattedPurchases = purchases.map(p => {
          const dateObj = new Date(p.created_at);
          return {
            tanggal: dateObj.toLocaleString('id-ID'),
            barang: p.item_name,
            jumlah: p.qty,
            harga: p.total_cost,
            staff: p.staff_name
          };
        });
        setLaporanBelanja(formattedPurchases);
      }

      // 3. Tarik Master Data Menu, Bahan Baku, dan Resep
      const { data: menus } = await supabase.from('menus').select('*');
      if (menus) setMenuList(menus);

      const { data: inventory } = await supabase.from('inventory').select('*');
      if (inventory) setTabelBahanBaku(inventory.map(inv => ({ idBahan: inv.id, namaBahan: inv.name, stok: inv.stock, satuan: inv.unit })));

      const { data: recipes } = await supabase.from('recipes').select('*');
      if (recipes) setTabelResep(recipes.map(r => ({ idMenu: r.menu_id, idBahan: r.inventory_id, takaran: r.amount })));
    };

    fetchSemuaData();
  }, []);

  // ---------------------------------------------------------

  const handleDeductStok = (pesananDikasir) => {
    setTabelBahanBaku(prevStok => {
      let newStok = [...prevStok];
      pesananDikasir.forEach(pesanan => {
        const resepMenuIni = tabelResep.filter(r => r.idMenu === pesanan.id);
        resepMenuIni.forEach(resep => {
          const indexBahan = newStok.findIndex(b => b.idBahan === resep.idBahan);
          if (indexBahan !== -1) {
            newStok[indexBahan].stok -= (resep.takaran * pesanan.qty);
          }
        });
      });
      return newStok;
    });
  };

  const handleLogout = () => { localStorage.clear(); window.location.reload(); };

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Rute Landing Page (Bisa diakses siapa saja) */}
        <Route path="/" element={<GuestLayout />} />
        
        {/* Rute Aplikasi Utama (Hanya bisa diakses kalau SUDAH login) */}
        <Route element={token ? <MainLayout userRole={userRole} userName={userName} onLogout={handleLogout} /> : <Navigate to="/login" replace />}>
          <Route path="/dashboard" element={userRole?.toLowerCase() === 'admin' ? <AdminDashboard dataPenjualan={laporanPenjualan} dataBelanja={laporanBelanja} /> : <StaffDashboard staffName={userName} dataPenjualan={laporanPenjualan} dataBelanja={laporanBelanja}/>} />
          <Route path="/products" element={<Products menuList={menuList} setMenuList={setMenuList} userRole={userRole} />} />
          <Route path="/inventaris" element={<StaffInventaris staffName={userName} daftarStok={tabelBahanBaku} setDaftarStok={setTabelBahanBaku} onAddBelanja={(data) => setLaporanBelanja([data, ...laporanBelanja])} />} />
          <Route path="/kasir" element={<StaffKasir staffName={userName} onDeductStok={handleDeductStok} onAddPenjualan={(data) => setLaporanPenjualan([data, ...laporanPenjualan])} />} />
          <Route path="/laporan" element={<AdminLaporan dataPenjualan={laporanPenjualan} dataBelanja={laporanBelanja} />} />
          <Route path="/resep" element={<AdminResep tabelMenu={menuList} tabelBahanBaku={tabelBahanBaku} tabelResep={tabelResep} />} />
        </Route>

        {/* Rute Otentikasi (Hanya bisa diakses kalau BELUM login) */}
        <Route element={token ? <Navigate to="/dashboard" replace /> : <AuthLayout />}>
          <Route path="/login" element={<Login onLoginSuccess={(t, r, n) => { setToken(t); setUserRole(r); setUserName(n); }} />} />
          
          {/* BARU: Rute untuk Register dan Lupa Password yang sudah didaftarkan */}
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;