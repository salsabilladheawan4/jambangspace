import React, { useState, useMemo } from 'react';
import ProfileDropdown from '../../components/ProfileDropdown';

// DATA MENU
const menuData = [
  { id: 1, title: 'Caramel Frappuccino', category: 'Coffee', description: 'Caramel syrup with coffee, milk, and whipped cream', price: 40000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1524d5cd3-2963-478a-9e4f-c6622adc321f.png' },
  { id: 2, title: 'Chocolate Frappuccino', category: 'Coffee', description: 'Sweet chocolate with coffee, milk, and whipped cream', price: 35000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/196f52bf3-948e-44be-8430-86f739c3996e.png' },
  { id: 3, title: 'Peppermint Macchiato', category: 'Coffee', description: 'Fresh peppermint mixed with choco, and blended cream', price: 45000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1397daf9a-f5b5-44ac-a2a9-6fa448ed3f36.png' },
  { id: 4, title: 'Coffee Latte Frappuccino', category: 'Coffee', description: 'Special coffee, choco cream, and whipped cream', price: 34000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/111e8863f-3692-4b6c-ab80-c349c66559c1.png' },
  { id: 5, title: 'Iced Americano', category: 'Coffee', description: 'Classic black coffee with ice, bold and refreshing', price: 23000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/19f4a2739-1acb-4041-b879-ff245d337729.png' },
  { id: 6, title: 'Matcha Latte', category: 'Milk Based', description: 'Premium matcha with steamed milk and foam', price: 50000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/14e0db8e5-7e8b-492c-845d-59bcfc2bc0b9.png' },
  { id: 7, title: 'Iced Latte', category: 'Milk Based', description: 'Espresso with cold milk and ice cubes', price: 25000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/14055ea5b-b05a-4b70-b4e6-a6ddb4530071.png' },
  { id: 8, title: 'Orange Juice', category: 'Juice', description: 'Fresh squeezed orange juice with ice', price: 28000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1b17eb28e-f55e-4a24-bc73-da2966ad44ca.png' },
  { id: 9, title: 'Mango Smoothie', category: 'Juice', description: 'Tropical mango smoothie with fresh fruit', price: 32000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1241bb488-3dc5-43af-b2e4-537675ff0543.png' },
  { id: 10, title: 'Butter Croissant', category: 'Snack', description: 'Flaky buttery croissant, freshly baked', price: 28000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/193f133b8-8c75-4478-974f-402ecc4044a7.png' },
  { id: 11, title: 'Nasi Rendang', category: 'Rice', description: 'Steamed rice with beef rendang and sides', price: 40000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1265bbf94-3810-4082-83f8-764fb75237cf.png' },
  { id: 12, title: 'Strawberry Cheesecake', category: 'Dessert', description: 'Creamy cheesecake with strawberry topping', price: 35000, image: 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/121aeaa27-b329-4d57-8646-44557ec484f6.png' },
];

const categories = [
  { name: 'All', icon: '🍺' },
  { name: 'Coffee', icon: '☕' },
  { name: 'Juice', icon: '🍹' },
  { name: 'Milk Based', icon: '🥛' },
  { name: 'Snack', icon: '🥞' },
  { name: 'Rice', icon: '🍚' },
  { name: 'Dessert', icon: '🍰' },
];

export default function StaffKasir({ staffName, onAddPenjualan }) {
  const [selectedCat, setSelectedCat] = useState('Coffee');
  const [search, setSearch] = useState('');
  const [bills, setBills] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('debit');
  const [itemOptions, setItemOptions] = useState({});

  const filteredMenu = useMemo(() => {
    let list = selectedCat === 'All' ? menuData : menuData.filter((m) => m.category === selectedCat);
    if (search) {
      list = list.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));
    }
    return list;
  }, [selectedCat, search]);

  const getOption = (itemId, type, defaultValue) => {
    const key = `${itemId}-${type}`;
    return itemOptions[key] ?? defaultValue;
  };

  const setOption = (itemId, type, value) => {
    setItemOptions((prev) => ({ ...prev, [`${itemId}-${type}`]: value }));
  };

  const addToBilling = (item) => {
    const existing = bills.find((b) => b.id === item.id);
    if (existing) {
      setBills(bills.map((b) => (b.id === item.id ? { ...b, qty: b.qty + 1 } : b)));
    } else {
      setBills([...bills, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setBills((prev) =>
      prev.map((b) => (b.id === id ? { ...b, qty: Math.max(0, b.qty + delta) } : b)).filter((b) => b.qty > 0)
    );
  };

  const subtotal = bills.reduce((sum, b) => sum + b.price * b.qty, 0);
  const tax = subtotal * 0.1;
  const totalAkhir = subtotal + tax;

  const handlePrintBills = () => {
    if (bills.length === 0) return alert("Belum ada pesanan di keranjang!");

    const menuDipesan = bills.map(b => `${b.title} (x${b.qty})`).join(', ');
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
    alert(`Struk berhasil dicetak!\nTotal Tagihan: Rp ${totalAkhir.toLocaleString('id-ID')}\nData telah masuk ke laporan Admin.`);
    setBills([]);
  };

  return (
    <div className="flex h-screen bg-[#faf8f6] font-sans">
      
      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {/* Header Search & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-[#2a1a1a]" style={{ fontFamily: 'Georgia, serif' }}>
            Choose Category
          </h1>
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category or menu..."
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 pr-12 text-sm focus:outline-none focus:border-[#6b3a3a] transition shadow-sm"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6b3a3a]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 md:gap-4 mb-10 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCat(cat.name)}
              className={`flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl border-2 min-w-[90px] transition-all ${
                selectedCat === cat.name ? 'bg-[#6b3a3a] border-[#6b3a3a] text-white shadow-lg scale-105' : 'bg-white border-gray-100 hover:border-[#c97b4b] text-gray-600'
              }`}
            >
              <span className="text-2xl md:text-3xl mb-1">{cat.icon}</span>
              <span className="text-xs font-bold">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2a1a1a]">
            {selectedCat === 'All' ? 'All Menu' : `${selectedCat} Menu`}
          </h2>
          <span className="text-sm text-gray-500">{filteredMenu.length} Results</span>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredMenu.map((item) => {
            const mood = getOption(item.id, 'mood', 'hot');
            const size = getOption(item.id, 'size', 'M');
            const sugar = getOption(item.id, 'sugar', '50');
            const ice = getOption(item.id, 'ice', '50');

            return (
              <div key={item.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex gap-5 mb-5">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-[#2a1a1a] leading-tight">{item.title}</h3>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">{item.description}</p>
                      <div className="mt-3 text-xl font-black text-[#c97b4b]">Rp {item.price.toLocaleString('id-ID')}</div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <div className="text-sm font-bold text-[#2a1a1a] mb-2">Mood</div>
                      <div className="flex gap-2">
                        {['hot', 'cold'].map((m) => (
                          <button key={m} onClick={() => setOption(item.id, 'mood', m)} className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition ${mood === m ? 'border-[#6b3a3a] bg-[#6b3a3a]/10' : 'border-gray-200 bg-white'}`}>
                            {m === 'hot' ? '🔥' : '❄️'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#2a1a1a] mb-2">Size</div>
                      <div className="flex gap-2">
                        {['S', 'M', 'L'].map((s) => (
                          <button key={s} onClick={() => setOption(item.id, 'size', s)} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition ${size === s ? 'border-[#6b3a3a] bg-[#6b3a3a] text-white' : 'border-gray-200 bg-white text-gray-600'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    {item.category !== 'Snack' && item.category !== 'Rice' && item.category !== 'Dessert' && (
                      <>
                        <div>
                          <div className="text-sm font-bold text-[#2a1a1a] mb-2">Sugar</div>
                          <div className="flex gap-2">
                            {['30', '50', '70'].map((s) => (
                              <button key={s} onClick={() => setOption(item.id, 'sugar', s)} className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition ${sugar === s ? 'border-[#c97b4b] bg-[#c97b4b]/10 text-[#c97b4b]' : 'border-gray-200 bg-white text-gray-600'}`}>
                                {s}%
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#2a1a1a] mb-2">Ice</div>
                          <div className="flex gap-2">
                            {['30', '50', '70'].map((s) => (
                              <button key={s} onClick={() => setOption(item.id, 'ice', s)} className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition ${ice === s ? 'border-[#c97b4b] bg-[#c97b4b]/10 text-[#c97b4b]' : 'border-gray-200 bg-white text-gray-600'}`}>
                                {s}%
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <button onClick={() => addToBilling(item)} className="w-full bg-[#3d2817] text-white py-3.5 rounded-2xl font-bold hover:bg-[#c97b4b] transition text-sm mt-auto shadow-md">
                  Add to Billing
                </button>
              </div>
            );
          })}
        </div>
      </main>

      {/* BILLS PANEL KANAN */}
      <aside className="w-80 md:w-96 bg-white border-l border-gray-100 flex flex-col flex-shrink-0 z-20 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)]">
        
        {/* Profile Dropdown terintegrasi di sini untuk halaman Kasir */}
        <div className="p-6 border-b border-gray-100 flex justify-end bg-white">
          <ProfileDropdown userName={staffName || "Staff Name"} userRole="Cashier POS" />
        </div>

        {/* Bills */}
        <div className="p-6 flex-1 flex flex-col">
          <h2 className="text-2xl font-black text-[#2a1a1a] mb-5">Bills</h2>

          <div className="space-y-4 mb-6 flex-1 overflow-y-auto pr-2">
            {bills.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">No items yet</div>
            )}
            {bills.map((bill) => (
              <div key={bill.id} className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                  <img src={bill.image} alt={bill.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-[#2a1a1a] truncate">{bill.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(bill.id, -1)} className="w-6 h-6 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-[#c97b4b] hover:text-white transition flex items-center justify-center">-</button>
                      <span className="text-xs font-bold w-6 text-center">{bill.qty}</span>
                      <button onClick={() => updateQty(bill.id, 1)} className="w-6 h-6 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-[#c97b4b] hover:text-white transition flex items-center justify-center">+</button>
                    </div>
                    <button className="text-[10px] bg-gray-100 text-gray-500 hover:bg-gray-200 px-2 py-0.5 rounded-md font-medium transition">Notes ✎</button>
                  </div>
                </div>
                <div className="font-bold text-sm text-[#2a1a1a]">Rp {(bill.price * bill.qty).toLocaleString('id-ID')}</div>
              </div>
            ))}
          </div>

          <div>
            <hr className="border-gray-200 mb-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-bold">Rp {subtotal.toLocaleString('id-ID')}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Tax (10%)</span><span className="font-bold">Rp {tax.toLocaleString('id-ID')}</span></div>
              <hr className="border-dashed border-gray-300 my-2" />
              <div className="flex justify-between text-lg"><span className="font-black text-[#2a1a1a]">Total</span><span className="font-black text-[#c97b4b]">Rp {totalAkhir.toLocaleString('id-ID')}</span></div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="p-6 border-t border-gray-100 bg-[#faf8f6]">
          <h3 className="font-bold text-[#2a1a1a] mb-4">Payment Method</h3>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { id: 'cash', label: 'Cash', icon: '💵' },
              { id: 'debit', label: 'Debit Card', icon: '💳' },
              { id: 'ewallet', label: 'E-Wallet', icon: '📱' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPaymentMethod(p.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition ${paymentMethod === p.id ? 'border-[#6b3a3a] bg-[#6b3a3a]/5' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <span className="text-xl mb-1">{p.icon}</span>
                <span className="text-[10px] font-medium text-gray-600">{p.label}</span>
              </button>
            ))}
          </div>
          <button onClick={handlePrintBills} className="w-full bg-[#6b3a3a] text-white py-4 rounded-2xl font-bold hover:bg-[#4a2727] transition shadow-md">
            Print Bills
          </button>
        </div>
      </aside>
    </div>
  );
}