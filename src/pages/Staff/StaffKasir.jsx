import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../Services/supabaseClient';
import ProfileDropdown from '../../components/ProfileDropdown';

// ------------------------------------------------------------------
// FUNGSI PINTAR (MENGUTAMAKAN DATABASE SUPABASE)
// ------------------------------------------------------------------
const getImageUrl = (item) => {
  // 1. PRIORITAS UTAMA: Cek apakah ada link gambar di database Supabase
  if (item.image_url && item.image_url.trim() !== '') {
    return item.image_url;
  }

  // 2. FALLBACK DARURAT: Jika kolom image_url di database masih kosong
  const t = (item.title || '').toLowerCase();
  
  if (t.includes('caramel')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1524d5cd3-2963-478a-9e4f-c6622adc321f.png';
  if (t.includes('rendang')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1265bbf94-3810-4082-83f8-764fb75237cf.png';
  if (t.includes('peppermint')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1397daf9a-f5b5-44ac-a2a9-6fa448ed3f36.png';
  if (t.includes('cheesecake')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/121aeaa27-b329-4d57-8646-44557ec484f6.png';
  if (t.includes('croissant')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/193f133b8-8c75-4478-974f-402ecc4044a7.png';
  if (t.includes('gula aren')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/111e8863f-3692-4b6c-ab80-c349c66559c1.png';
  if (t.includes('matcha')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/14e0db8e5-7e8b-492c-845d-59bcfc2bc0b9.png';
  if (t.includes('nasi goreng')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1265bbf94-3810-4082-83f8-764fb75237cf.png';
  if (t.includes('kentang')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/193f133b8-8c75-4478-974f-402ecc4044a7.png';
  if (t.includes('americano')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/19f4a2739-1acb-4041-b879-ff245d337729.png';
  if (t.includes('latte hangat') || t.includes('caffe latte')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/14055ea5b-b05a-4b70-b4e6-a6ddb4530071.png';
  if (t.includes('lemon tea')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1b17eb28e-f55e-4a24-bc73-da2966ad44ca.png';
  if (t.includes('dimsum')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/193f133b8-8c75-4478-974f-402ecc4044a7.png';
  if (t.includes('roti bakar')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/121aeaa27-b329-4d57-8646-44557ec484f6.png';
  if (t.includes('red velvet')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/14e0db8e5-7e8b-492c-845d-59bcfc2bc0b9.png';
  if (t.includes('chocolate') || t.includes('coklat')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/196f52bf3-948e-44be-8430-86f739c3996e.png';
  if (t.includes('orange') || t.includes('jeruk')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1b17eb28e-f55e-4a24-bc73-da2966ad44ca.png';
  if (t.includes('mango') || t.includes('mangga')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1241bb488-3dc5-43af-b2e4-537675ff0543.png';

  return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1524d5cd3-2963-478a-9e4f-c6622adc321f.png';
};


// ------------------------------------------------------------------
// KOMPONEN KARTU MENU
// ------------------------------------------------------------------
const MenuCard = ({ item, onAdd }) => {
  const [mood, setMood] = useState('Hot');
  const [size, setSize] = useState('M');
  const [sugar, setSugar] = useState('50%');
  const [ice, setIce] = useState('50%');

  // Panggil fungsi getImageUrl yang sudah membaca database
  const currentImage = getImageUrl(item);

  const handleAdd = () => {
    const cartId = `${item.id}-${mood}-${size}-${sugar}-${ice}`;
    onAdd({ ...item, cartId, mood, size, sugar, ice, qty: 1, displayImage: currentImage });
  };

  const isDrink = !['Snack', 'Rice', 'Dessert'].includes(item.category);

  return (
    <div className="bg-white p-5 rounded-[24px] shadow-sm border border-[#e8dfd4] flex flex-col justify-between">
      <div className="flex gap-4 mb-4">
        {/* GAMBAR MENU */}
        <img 
          src={currentImage} 
          alt={item.title} 
          className="w-24 h-24 rounded-2xl object-cover bg-gray-50 border border-gray-100 flex-shrink-0 shadow-sm" 
        />
        <div>
          <h3 className="font-bold text-[#3d2817] leading-tight text-lg">{item.title}</h3>
          <p className="text-xs text-[#6b5344] mt-1 mb-2 line-clamp-2">{item.category}</p>
          <div className="text-lg font-black text-[#c97b4b]">Rp {item.price.toLocaleString('id-ID')}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-[10px] font-bold text-[#6b5344] mb-1.5 uppercase">Mood</div>
          <div className="flex gap-1.5">
            {['Hot', 'Ice'].map(m => (
              <button key={m} onClick={() => setMood(m)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${mood === m ? 'bg-[#3d2817] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-[#6b5344] mb-1.5 uppercase">Size</div>
          <div className="flex gap-1.5">
            {['S', 'M', 'L'].map(s => (
              <button key={s} onClick={() => setSize(s)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${size === s ? 'bg-[#3d2817] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        
        {isDrink && (
          <>
            <div>
              <div className="text-[10px] font-bold text-[#6b5344] mb-1.5 uppercase mt-2">Sugar</div>
              <div className="flex gap-1.5">
                {['0%', '50%', '100%'].map(s => (
                  <button key={s} onClick={() => setSugar(s)} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${sugar === s ? 'bg-[#c97b4b] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#6b5344] mb-1.5 uppercase mt-2">Ice Level</div>
              <div className="flex gap-1.5">
                {['0%', '50%', '100%'].map(i => (
                  <button key={i} onClick={() => setIce(i)} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${ice === i ? 'bg-[#c97b4b] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      <button onClick={handleAdd} className="w-full mt-2 py-3 bg-[#e8dfd4]/40 hover:bg-[#3d2817] text-[#3d2817] hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm">
        + Add to Bills
      </button>
    </div>
  );
};


// ------------------------------------------------------------------
// KOMPONEN UTAMA (HALAMAN KASIR)
// ------------------------------------------------------------------
const categories = [
  { name: 'All', icon: '🍺' },
  { name: 'Coffee', icon: '☕' },
  { name: 'Non-Kopi', icon: '🍵' },
  { name: 'Milk Based', icon: '🥛' },
  { name: 'Snack', icon: '🥞' },
  { name: 'Rice', icon: '🍚' },
  { name: 'Dessert', icon: '🍰' },
];

export default function StaffKasir({ staffName, onAddPenjualan }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');
  const [bills, setBills] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Debit');
  const [menuData, setMenuData] = useState([]);

  // Fetch dari Supabase secara real-time
  useEffect(() => {
    const fetchMenus = async () => {
      const { data } = await supabase.from('menus').select('*');
      setMenuData(data || []);
    };
    fetchMenus();

    const channel = supabase.channel('realtime-menus')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menus' }, () => {
        fetchMenus();
      }).subscribe();
      
    return () => supabase.removeChannel(channel);
  }, []);

  const filteredMenu = useMemo(() => {
    let list = selectedCat === 'All' ? menuData : menuData.filter((m) => m.category === selectedCat);
    if (search) {
      list = list.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));
    }
    return list;
  }, [menuData, selectedCat, search]);

  const addToBilling = (cartItem) => {
    setBills(prev => {
      const existing = prev.find(b => b.cartId === cartItem.cartId);
      return existing 
        ? prev.map(b => b.cartId === cartItem.cartId ? { ...b, qty: b.qty + 1 } : b) 
        : [...prev, cartItem];
    });
  };

  const updateQty = (cartId, delta) => {
    setBills(prev => prev.map(b => b.cartId === cartId ? { ...b, qty: Math.max(0, b.qty + delta) } : b).filter(b => b.qty > 0));
  };

  const subtotal = bills.reduce((sum, b) => sum + b.price * b.qty, 0);
  const tax = subtotal * 0.1;
  const totalAkhir = subtotal + tax;

  const handlePrintBills = () => {
    if (bills.length === 0) return alert("Belum ada pesanan di keranjang!");

    const menuDipesan = bills.map(b => `${b.title} (${b.mood}, ${b.size}) x${b.qty}`).join(' | ');
    const totalQty = bills.reduce((sum, b) => sum + b.qty, 0);

    const historiTransaksi = {
      id: `TRX-${Date.now()}`,
      tanggal: new Date().toLocaleDateString('id-ID'),
      jam: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      namaMenu: menuDipesan,
      qty: totalQty,
      hargaSatuan: totalAkhir / totalQty,
      total: totalAkhir,
      staff: staffName || "Staff"
    };

    if (onAddPenjualan) onAddPenjualan(historiTransaksi);
    alert(`Struk tercetak!\nMetode: ${paymentMethod}\nTotal Tagihan: Rp ${totalAkhir.toLocaleString('id-ID')}`);
    setBills([]);
  };

  return (
    <div className="flex h-screen bg-[#faf8f6] font-sans">
      
      {/* MAIN CONTENT KIRI */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        
        {/* Header Search & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#3d2817]" style={{ fontFamily: 'Georgia, serif' }}>Menu Kategori</h1>
            <p className="text-sm text-[#6b5344] mt-1">Pilih pesanan pelanggan dengan cepat.</p>
          </div>
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama menu..."
              autoComplete="off"
              className="w-full p-3 bg-[#faf6f1] rounded-xl border border-[#e8dfd4] text-sm text-[#3d2817] focus:outline-none focus:border-[#c97b4b] transition-all"
            />
          </div>
        </div>

        {/* Kategori Horizontal Scroll */}
        <div className="flex gap-3 md:gap-4 mb-8 overflow-x-auto pb-4 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCat(cat.name)}
              className={`flex flex-col items-center justify-center p-4 md:p-5 rounded-[20px] border-2 min-w-[90px] transition-all duration-300 ${
                selectedCat === cat.name ? 'bg-[#3d2817] border-[#3d2817] text-white shadow-lg transform -translate-y-1' : 'bg-white border-[#e8dfd4] hover:border-[#c97b4b] text-[#6b5344]'
              }`}
            >
              <span className="text-2xl md:text-3xl mb-2">{cat.icon}</span>
              <span className="text-xs font-bold whitespace-nowrap">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filteredMenu.length === 0 && <p className="col-span-full text-center text-gray-400 py-10">Menu tidak ditemukan atau sedang loading...</p>}
          {filteredMenu.map((item) => (
            <MenuCard key={item.id} item={item} onAdd={addToBilling} />
          ))}
        </div>

      </main>

      {/* BILLS PANEL KANAN */}
      <aside className="w-[380px] bg-white border-l border-[#e8dfd4] flex flex-col flex-shrink-0 z-20 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)]">
        
        {/* Profil Header */}
        <div className="p-6 border-b border-[#e8dfd4] flex justify-between items-center bg-white">
          <h2 className="text-xl font-black text-[#3d2817]">Struk Aktif</h2>
          <ProfileDropdown userName={staffName || "Staff"} userRole="Kasir" />
        </div>

        {/* List Pesanan di Keranjang */}
        <div className="p-6 flex-1 flex flex-col overflow-y-auto">
          {bills.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-sm flex flex-col items-center">
              <span className="text-4xl mb-3">🛒</span>
              Keranjang masih kosong
            </div>
          )}
          
          <div className="space-y-5">
            {bills.map((bill) => (
              <div key={bill.cartId} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <img src={bill.displayImage} alt={bill.title} className="w-16 h-16 rounded-xl object-cover border border-gray-100" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-[#3d2817] truncate">{bill.title}</div>
                  {bill.category !== 'Snack' && bill.category !== 'Rice' && bill.category !== 'Dessert' ? (
                     <div className="text-[10px] text-gray-500 mt-0.5">{bill.mood} | {bill.size} | Sugar {bill.sugar} | Ice {bill.ice}</div>
                  ) : null}
                  <div className="font-black text-[#c97b4b] mt-1">Rp {(bill.price * bill.qty).toLocaleString('id-ID')}</div>
                </div>
                
                <div className="flex flex-col items-center bg-[#faf6f1] rounded-lg p-1 border border-[#e8dfd4]">
                  <button onClick={() => updateQty(bill.cartId, 1)} className="w-6 h-6 rounded text-[#3d2817] font-bold hover:bg-white">+</button>
                  <span className="text-xs font-bold py-1">{bill.qty}</span>
                  <button onClick={() => updateQty(bill.cartId, -1)} className="w-6 h-6 rounded text-[#3d2817] font-bold hover:bg-white">-</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Area Kalkulasi & Pembayaran (Sticky Bottom) */}
        <div className="border-t border-[#e8dfd4] bg-[#faf8f6]">
          <div className="p-6 pb-4">
            <div className="space-y-2 text-sm text-[#6b5344]">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">Rp {subtotal.toLocaleString('id-ID')}</span></div>
              <div className="flex justify-between"><span>Tax (10%)</span><span className="font-bold">Rp {tax.toLocaleString('id-ID')}</span></div>
              <hr className="border-dashed border-[#e8dfd4] my-2" />
              <div className="flex justify-between text-lg pt-1">
                <span className="font-black text-[#3d2817]">Total Tagihan</span>
                <span className="font-black text-[#c97b4b]">Rp {totalAkhir.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <h3 className="text-[10px] uppercase font-bold text-[#6b5344] mb-3">Metode Pembayaran</h3>
            <div className="grid grid-cols-3 gap-2 mb-5">
              <button onClick={() => setPaymentMethod('Cash')} className={`py-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'Cash' ? 'border-[#3d2817] bg-[#faf6f1] ring-1 ring-[#3d2817]' : 'border-[#e8dfd4] bg-white hover:border-[#c97b4b]'}`}>
                <span className="text-xl">💵</span><span className="text-[10px] font-bold text-[#3d2817]">Cash</span>
              </button>
              <button onClick={() => setPaymentMethod('Debit')} className={`py-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'Debit' ? 'border-[#3d2817] bg-[#faf6f1] ring-1 ring-[#3d2817]' : 'border-[#e8dfd4] bg-white hover:border-[#c97b4b]'}`}>
                <span className="text-xl">💳</span><span className="text-[10px] font-bold text-[#3d2817]">Debit Card</span>
              </button>
              <button onClick={() => setPaymentMethod('QRIS')} className={`py-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'QRIS' ? 'border-[#3d2817] bg-[#faf6f1] ring-1 ring-[#3d2817]' : 'border-[#e8dfd4] bg-white hover:border-[#c97b4b]'}`}>
                <span className="text-xl">📱</span><span className="text-[10px] font-bold text-[#3d2817]">QRIS</span>
              </button>
            </div>
            
            <button onClick={handlePrintBills} className="w-full bg-[#3d2817] text-white py-4 rounded-2xl font-bold hover:bg-[#c97b4b] transition-all shadow-md text-sm">
              Cetak Struk & Bayar
            </button>
          </div>
        </div>

      </aside>
    </div>
  );
}