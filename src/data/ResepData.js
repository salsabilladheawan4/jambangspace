// src/data/ResepData.js

// 1. Data Master Bahan Baku (Inventaris)
// Digunakan oleh StaffInventaris untuk menampilkan sisa stok fisik
export const initialBahanBaku = [
  { idBahan: 'B01', namaBahan: 'Susu UHT Full Cream', stok: 8000, satuan: 'Ml' },
  { idBahan: 'B02', namaBahan: 'Biji Kopi Espresso', stok: 2500, satuan: 'Gram' },
  { idBahan: 'B03', namaBahan: 'Sirup Caramel', stok: 4000, satuan: 'Ml' },
  { idBahan: 'B04', namaBahan: 'Gelas Cup Plastik', stok: 150, satuan: 'Pcs' },
  { idBahan: 'B05', namaBahan: 'Porsi Nasi Rendang', stok: 30, satuan: 'Porsi' },
];

// 2. Data Master Resep (Bill of Materials/BOM)
// Menghubungkan idMenu (dari kasir) dengan idBahan (dari inventaris)
export const initialResep = [
  // Resep Caramel Frappuccino (idMenu: 1)
  { idMenu: 1, idBahan: 'B02', takaran: 15 }, // Memerlukan 15gr Kopi
  { idMenu: 1, idBahan: 'B01', takaran: 50 }, // Memerlukan 50ml Susu
  { idMenu: 1, idBahan: 'B04', takaran: 1 },  // Memerlukan 1 Gelas Cup
  { idMenu: 1, idBahan: 'B03', takaran: 20 }, // Memerlukan 20ml Sirup
  
  // Resep Nasi Rendang (idMenu: 2)
  { idMenu: 2, idBahan: 'B05', takaran: 1 },  // Memerlukan 1 Porsi Nasi Rendang
];

// 3. FUNGSI LOGIKA PEMOTONGAN (Jantung Sistem)
// Fungsi ini dipanggil oleh StaffKasir melalui App.jsx saat tombol Print Bills ditekan
export const hitungPenguranganStok = (pesanan, daftarResep) => {
  let perubahan = {}; // Objek penampung total pengurangan per bahan
  
  // Iterasi setiap barang yang dipesan pelanggan
  pesanan.forEach(item => {
    // Cari daftar resep untuk menu yang dipesan tersebut
    const resepMenu = daftarResep.filter(r => r.idMenu === item.id);
    
    resepMenu.forEach(r => {
      // Jika bahan belum terdaftar di objek perubahan, inisialisasi ke 0
      if (!perubahan[r.idBahan]) {
        perubahan[r.idBahan] = 0;
      }
      
      // Hitung total pengurangan: (Takaran Resep * Jumlah Pesanan)
      perubahan[r.idBahan] += (r.takaran * item.qty);
    });
  });
  
  return perubahan; // Mengembalikan hasil total pengurangan bahan untuk semua item
};