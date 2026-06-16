import React, { useState, useMemo } from 'react';

// DATA MENU SESUAI REFERENSI
const menuData = [
  { id: 1, title: 'Caramel Frappuccino', category: 'Coffee', price: 40.000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1524d5cd3-2963-478a-9e4f-c6622adc321f.png' },
  { id: 2, title: 'Chocolate Frappuccino', category: 'Coffee', price: 35.000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/196f52bf3-948e-44be-8430-86f739c3996e.png' },
  { id: 3, title: 'Peppermint Macchiato', category: 'Coffee', price: 45.000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1397daf9a-f5b5-44ac-a2a9-6fa448ed3f36.png' },
  { id: 4, title: 'Coffee Latte Frappuccino', category: 'Coffee', price: 34.000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/111e8863f-3692-4b6c-ab80-c349c66559c1.png' },
  { id: 5, title: 'Iced Americano', category: 'Coffee', price: 23.000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/19f4a2739-1acb-4041-b879-ff245d337729.png' },
  { id: 6, title: 'Matcha Latte', category: 'Milk Based', price: 50.000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/14e0db8e5-7e8b-492c-845d-59bcfc2bc0b9.png' },
  { id: 7, title: 'Iced Latte', category: 'Milk Based', price: 25.000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/14055ea5b-b05a-4b70-b4e6-a6ddb4530071.png' },
  { id: 8, title: 'Orange Juice', category: 'Juice', price: 28.000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1b17eb28e-f55e-4a24-bc73-da2966ad44ca.png' },
  { id: 9, title: 'Mango Smoothie', category: 'Juice', price: 32.000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1241bb488-3dc5-43af-b2e4-537675ff0543.png' },
  { id: 10, title: 'Butter Croissant', category: 'Snack', price: 28.000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/193f133b8-8c75-4478-974f-402ecc4044a7.png' },
  { id: 11, title: 'Nasi Rendang', category: 'Rice', price: 40.000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1265bbf94-3810-4082-83f8-764fb75237cf.png' },
  { id: 12, title: 'Strawberry Cheesecake', category: 'Dessert', price: 35.000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/121aeaa27-b329-4d57-8646-44557ec484f6.png' },
];

// TAMBAHKAN PROPS staffName dan onAddPenjualan di sini
export default function StaffKasir({ staffName, onAddPenjualan }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');
  const [bills, setBills] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('debit');

  const categories = ['All', 'Coffee', 'Juice', 'Milk Based', 'Snack', 'Rice', 'Dessert'];

  const filteredMenu = useMemo(() => {
    let list = selectedCat === 'All' ? menuData : menuData.filter((m) => m.category === selectedCat);
    return search ? list.filter((m) => m.title.toLowerCase().includes(search.toLowerCase())) : list;
  }, [selectedCat, search]);

  const addToBilling = (item) => {
    const existing = bills.find((b) => b.id === item.id);
    setBills(existing ? bills.map((b) => (b.id === item.id ? { ...b, qty: b.qty + 1 } : b)) : [...bills, { ...item, qty: 1 }]);
  };

  const updateQty = (id, delta) => {
    setBills((prev) => prev.map((b) => (b.id === id ? { ...b, qty: Math.max(0, b.qty + delta) } : b)).filter((b) => b.qty > 0));
  };

  const subtotal = bills.reduce((sum, b) => sum + b.price * b.qty, 0);
  const tax = subtotal * 0.1;
  const totalAkhir = subtotal + tax;

  // FUNGSI UNTUK PRINT BILLS DAN MENGIRIM DATA KE LAPORAN ADMIN
  const handlePrintBills = () => {
    if (bills.length === 0) {
      alert("Belum ada pesanan di keranjang!");
      return;
    }

    // Menggabungkan semua nama menu yang dipesan menjadi satu string
    const menuDipesan = bills.map(b => `${b.title} (x${b.qty})`).join(', ');
    const totalQty = bills.reduce((sum, b) => sum + b.qty, 0);

    const historiTransaksi = {
      id: `TRX-${Date.now()}`,
      tanggal: new Date().toLocaleDateString('id-ID'),
      jam: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      namaMenu: menuDipesan,
      qty: totalQty,
      hargaSatuan: totalAkhir / totalQty, // Rata-rata
      total: totalAkhir,
      staff: staffName || "Staff"
    };

    // Kirim data ke App.jsx agar masuk ke Laporan Admin
    if (onAddPenjualan) onAddPenjualan(historiTransaksi);

    alert(`Struk berhasil dicetak!\nTotal Tagihan: Rp.${totalAkhir.toFixed(3)}\nData telah masuk ke laporan Admin.`);
    
    // Kosongkan keranjang setelah print
    setBills([]);
  };

  return (
    <div className="flex h-screen bg-[#faf8f6] font-sans">
      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black text-[#2a1a1a]" style={{ fontFamily: 'Georgia, serif' }}>Choose Category</h1>
          <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search menu..." className="w-64 bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm" />
        </div>

        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCat(cat)} className={`p-5 rounded-2xl border-2 min-w-[90px] ${selectedCat === cat ? 'bg-[#6b3a3a] text-white' : 'bg-white border-gray-100'}`}>
              <span className="text-xs font-bold">{cat}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {filteredMenu.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex gap-4">
              <img src={item.image} alt={item.title} className="w-24 h-24 rounded-2xl object-cover" />
              <div className="flex-1">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-[#6b3a3a] font-black">Rp.{item.price.toFixed(3)}</p>
                <button onClick={() => addToBilling(item)} className="mt-3 w-full bg-[#6b3a3a] text-white py-2 rounded-xl text-xs font-bold">Add to Bill</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* BILLS PANEL */}
      <aside className="w-96 bg-white border-l border-gray-100 p-6 flex flex-col">
        <h2 className="text-2xl font-black mb-5">Bills</h2>
        <div className="flex-1 overflow-y-auto space-y-4">
          {bills.map((bill) => (
            <div key={bill.id} className="flex justify-between items-center">
              <span className="text-sm font-bold">{bill.title} x {bill.qty}</span>
              <span className="font-bold">Rp.{(bill.price * bill.qty).toFixed(3)}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>Rp.{subtotal.toFixed(3)}</span></div>
          <div className="flex justify-between font-black text-xl"><span>Total</span><span className="text-[#6b3a3a]">Rp.{totalAkhir.toFixed(3)}</span></div>
          
          {/* TOMBOL DIPERBARUI DI SINI */}
          <button onClick={handlePrintBills} className="w-full bg-[#6b3a3a] text-white py-4 rounded-2xl font-bold mt-4 hover:bg-[#4a2727] transition">
            Print Bills
          </button>
        </div>
      </aside>
    </div>
  );
}