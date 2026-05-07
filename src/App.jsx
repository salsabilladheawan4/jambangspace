import './assets/tailwind.css';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import { Routes, Route } from 'react-router-dom';

/* Import halaman sesuai dengan struktur folder pages kamu */
import Dashboard from './pages/Dashboard';
import Invetaris from './pages/Invetaris';
import Kasir from './pages/Kasir';
import Laporan from './pages/Laporan';
import MenuResep from './pages/MenuResep'; // Perhatikan penamaan file dengan spasi & simbol
import NotFound from './pages/NotFound';
import Resep from './pages/MenuResep';
import Inventaris from './pages/Invetaris';

function App() {
  return (
    /* Menggunakan bg-[#121212] agar sinkron dengan nuansa hitam & abu-abu[cite: 13] */
    <div className="bg-[#121212] min-h-screen flex font-instrument text-white antialiased">
      
      {/* Sidebar tetap di sisi kiri[cite: 19] */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header di bagian atas[cite: 15, 19] */}
        <Header />
        
        {/* Area Konten Utama[cite: 1, 19] */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            {/* Navigasi Utama Sistem Manajemen Inventaris Jambang */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventaris" element={<Inventaris />} />
            <Route path="/kasir" element={<Kasir />} />
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/menuresep" element={<Resep />} />
            
            {/* Penanganan Halaman Tidak Ditemukan[cite: 19] */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App;