import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../Services/supabaseClient';
import redvelvetImg from '../../assets/redvelvet.png';

// ------------------------------------------------------------------
// FUNGSI PINTAR (MENGUTAMAKAN DATABASE SUPABASE)
// ------------------------------------------------------------------
const getImageUrl = (item) => {
  const t = (item.title || item.namaMenu || '').toLowerCase();
  if (t.includes('red velvet')) return redvelvetImg;

  if (item.image_url && item.image_url.trim() !== '') return item.image_url;
  
  if (t.includes('caramel')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1524d5cd3-2963-478a-9e4f-c6622adc321f.png';
  if (t.includes('americano')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/19f4a2739-1acb-4041-b879-ff245d337729.png';
  if (t.includes('latte hangat') || t.includes('caffe latte')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/14055ea5b-b05a-4b70-b4e6-a6ddb4530071.png';
  if (t.includes('matcha')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/14e0db8e5-7e8b-492c-845d-59bcfc2bc0b9.png';
  if (t.includes('lemon tea') || t.includes('orange') || t.includes('jeruk')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1b17eb28e-f55e-4a24-bc73-da2966ad44ca.png';
  if (t.includes('roti bakar') || t.includes('cheesecake')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/121aeaa27-b329-4d57-8646-44557ec484f6.png';
  if (t.includes('nasi goreng') || t.includes('rendang')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1265bbf94-3810-4082-83f8-764fb75237cf.png';
  if (t.includes('kentang') || t.includes('dimsum') || t.includes('croissant')) return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/193f133b8-8c75-4478-974f-402ecc4044a7.png';

  return 'https://image.qwenlm.ai/public_source/ececd3b0-d800-4b49-91b0-3934b124bc94/1524d5cd3-2963-478a-9e4f-c6622adc321f.png';
};

// ------------------------------------------------------------------
// KOMPONEN KARTU MENU (Sesuai Referensi)
// ------------------------------------------------------------------
const MenuCard = ({ item, onAdd }) => {
  const currentImage = getImageUrl(item);

  return (
    <div className="bg-white p-4 rounded-3xl border border-[#332218]/20 flex flex-col justify-between hover:shadow-lg transition-all">
      <div className="flex justify-center mb-4">
        <img src={currentImage} alt={item.title} className="w-28 h-28 object-contain mix-blend-multiply" />
      </div>
      <div className="flex items-end justify-between">
         <div>
            <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1">{item.title}</h3>
            <div className="text-gray-500 font-medium text-xs">Rp {item.price.toLocaleString('id-ID')}</div>
         </div>
         <button 
           onClick={() => onAdd({ ...item, cartId: item.id, qty: 1, displayImage: currentImage })}
           className="w-10 h-10 rounded-full border border-[#332218] flex items-center justify-center text-[#332218] hover:bg-[#332218] hover:text-white transition-colors"
         >
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
         </button>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// KOMPONEN UTAMA
// ------------------------------------------------------------------
export default function StaffKasir({ staffName, onAddPenjualan }) {
  const [selectedCat, setSelectedCat] = useState('Coffee');
  const [search, setSearch] = useState('');
  const [bills, setBills] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [orderType, setOrderType] = useState('Dine In');
  const [customerName, setCustomerName] = useState('');
  const [customerTable, setCustomerTable] = useState('B12 - Indoor');
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Fetch dari Supabase secara real-time
  useEffect(() => {
    const fetchMenus = async () => {
      const { data } = await supabase.from('menus').select('*');
      setMenuData(data || []);
    };
    fetchMenus();
    const channel = supabase.channel('realtime-menus')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'menus' }, () => fetchMenus()).subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const filteredMenu = useMemo(() => {
    let list = selectedCat === 'All' ? menuData : menuData.filter((m) => {
       if (selectedCat === 'Coffee') return m.category === 'Coffee' || m.category === 'Milk Based';
       if (selectedCat === 'Tea') return m.category === 'Non-Kopi';
       if (selectedCat === 'Snack') return ['Snack', 'Dessert', 'Rice'].includes(m.category);
       return true;
    });
    if (search) list = list.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [menuData, selectedCat, search]);

  const addToBilling = (cartItem) => {
    setBills(prev => {
      const existing = prev.find(b => b.cartId === cartItem.cartId);
      return existing ? prev.map(b => b.cartId === cartItem.cartId ? { ...b, qty: b.qty + 1 } : b) : [...prev, cartItem];
    });
    setIsReceiptOpen(true);
  };

  const updateQty = (cartId, delta) => {
    setBills(prev => prev.map(b => b.cartId === cartId ? { ...b, qty: Math.max(0, b.qty + delta) } : b).filter(b => b.qty > 0));
  };

  const updateNote = (cartId, note) => {
    setBills(prev => prev.map(b => b.cartId === cartId ? { ...b, note } : b));
  };

  const subtotal = bills.reduce((sum, b) => sum + b.price * b.qty, 0);
  const tax = subtotal * 0.1;
  const totalAkhir = subtotal + tax;

  const handlePrintBills = () => {
    if (bills.length === 0) return alert("Belum ada pesanan di keranjang!");
    const menuDipesan = bills.map(b => `${b.title} x${b.qty}`).join(' | ');
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
    alert(`Pesanan Diproses!\nAtas Nama: ${customerName || 'Tamu'}\nTipe: ${orderType} ${orderType === 'Dine In' ? `(${customerTable})` : ''}\nTotal Tagihan: Rp ${totalAkhir.toLocaleString('id-ID')}`);
    setBills([]);
    setCustomerName('');
  };

  const handleClearReceipt = () => {
    if (confirm("Hapus semua pesanan di struk ini?")) {
       setBills([]);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row h-[calc(100vh-100px)] gap-6 text-[#333]">
      
      {/* KIRI: Kategori & Menu */}
      <div className="flex-1 flex flex-col overflow-hidden gap-6 transition-all duration-300">
        
        {/* Search Bar & Cart Toggle */}
        <div className="flex items-center gap-4 shrink-0">
           <div className="flex-1 bg-white rounded-full border border-[#332218]/20 flex items-center px-4 py-3 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5" className="mr-3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" value={search} onChange={(e) => setSearch(e.target.value)} 
                placeholder="Search" 
                className="flex-1 text-[#332218] font-bold focus:outline-none placeholder-[#332218]/50 bg-transparent"
              />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5" className="ml-3 cursor-pointer"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
           </div>
           
           {!isReceiptOpen && (
              <button 
                onClick={() => setIsReceiptOpen(true)}
                className="bg-[#332218] text-white px-6 py-3 rounded-full font-bold shadow-md flex items-center gap-3 hover:bg-[#221610] transition-colors"
              >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                 View Order
                 {bills.length > 0 && (
                   <span className="bg-[#ff5a5a] text-white px-2 py-0.5 rounded-full text-xs font-black">{bills.reduce((a, b) => a + b.qty, 0)}</span>
                 )}
              </button>
           )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
           
           {/* Coffee Category */}
           <div 
             onClick={() => setSelectedCat('Coffee')}
             className={`cursor-pointer rounded-3xl p-5 relative overflow-hidden transition-all border ${selectedCat === 'Coffee' ? 'bg-[#332218] border-[#332218] text-white shadow-md' : 'bg-white border-[#332218]/20 text-gray-800 hover:border-[#332218]/50'}`}
           >
              <div className={`text-[11px] font-bold py-1 px-3 rounded-full mb-6 inline-block border ${selectedCat === 'Coffee' ? 'border-white/60 text-white' : 'border-gray-400 text-gray-700'}`}>Available</div>
              <h3 className="text-2xl font-extrabold tracking-tight mb-0.5">Coffee</h3>
              <p className={`text-xs ${selectedCat === 'Coffee' ? 'text-white/80' : 'text-gray-500'}`}>50 items</p>
              
              <div className={`absolute -bottom-6 -right-6 w-36 h-36 ${selectedCat === 'Coffee' ? 'text-[#e6eed6] opacity-90' : 'text-gray-100 opacity-100'}`}>
                 <svg viewBox="0 0 100 100" fill="currentColor" style={{transform: 'rotate(-15deg)'}}>
                    <circle cx="50" cy="50" r="45" opacity="0.3"/>
                    <circle cx="50" cy="50" r="35" opacity="0.7"/>
                    <circle cx="50" cy="50" r="30"/>
                    <path d="M50 25 C60 40 70 50 50 75 C30 50 40 40 50 25 Z" fill="#332218" opacity="0.8"/>
                    <path d="M50 30 C56 42 62 50 50 68 C38 50 44 42 50 30 Z" fill="#332218" opacity="0.5"/>
                    <line x1="50" y1="20" x2="50" y2="80" stroke="#332218" strokeWidth="2" opacity="0.8"/>
                    <path d="M40 40 Q45 45 50 40 Q55 45 60 40" fill="none" stroke="#332218" strokeWidth="2" opacity="0.8"/>
                    <path d="M42 52 Q47 57 50 52 Q53 57 58 52" fill="none" stroke="#332218" strokeWidth="2" opacity="0.8"/>
                 </svg>
              </div>
           </div>

           {/* Tea Category */}
           <div 
             onClick={() => setSelectedCat('Tea')}
             className={`cursor-pointer rounded-3xl p-5 relative overflow-hidden transition-all border ${selectedCat === 'Tea' ? 'bg-[#332218] border-[#332218] text-white shadow-md' : 'bg-white border-[#332218]/20 text-gray-800 hover:border-[#332218]/50'}`}
           >
              <div className={`text-[11px] font-bold py-1 px-3 rounded-full mb-6 inline-block border ${selectedCat === 'Tea' ? 'border-white/60 text-white' : 'border-gray-400 text-gray-700'}`}>Available</div>
              <h3 className="text-2xl font-extrabold tracking-tight mb-0.5">Tea</h3>
              <p className={`text-xs ${selectedCat === 'Tea' ? 'text-white/80' : 'text-gray-500'}`}>20 items</p>
              
              <div className={`absolute -bottom-6 -right-6 w-36 h-36 ${selectedCat === 'Tea' ? 'text-[#e6eed6] opacity-90' : 'text-gray-100 opacity-100'}`}>
                 <svg viewBox="0 0 100 100" fill="currentColor" style={{transform: 'rotate(10deg)'}}>
                    <path d="M20 20 L80 20 L75 80 C74 90 26 90 25 80 Z" opacity="0.3"/>
                    <path d="M25 25 L75 25 L71 75 C70 82 30 82 29 75 Z"/>
                    <path d="M35 25 L45 80" stroke="#332218" strokeWidth="3" opacity="0.5"/>
                    <rect x="40" y="70" width="10" height="12" fill="#332218" opacity="0.5" rx="2"/>
                 </svg>
              </div>
           </div>

           {/* Snack Category */}
           <div 
             onClick={() => setSelectedCat('Snack')}
             className={`cursor-pointer rounded-3xl p-5 relative overflow-hidden transition-all border ${selectedCat === 'Snack' ? 'bg-[#ff5a5a] border-[#ff5a5a] text-white shadow-md' : 'bg-white border-[#332218]/20 text-gray-800 hover:border-[#332218]/50'}`}
           >
              <div className={`text-[11px] font-bold py-1 px-3 rounded-full mb-6 inline-flex items-center gap-1 border ${selectedCat === 'Snack' ? 'border-[#ff5a5a] bg-white text-[#ff5a5a]' : 'border-[#ff5a5a] bg-[#ff5a5a] text-white'}`}>
                 Need to re-stock
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight mb-0.5">Snack</h3>
              <p className={`text-xs ${selectedCat === 'Snack' ? 'text-white/80' : 'text-gray-500'}`}>10 items</p>
              
              <div className={`absolute -bottom-6 -right-6 w-40 h-40 ${selectedCat === 'Snack' ? 'text-[#ffcccc] opacity-90' : 'text-gray-100 opacity-100'}`}>
                 <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M20 70 C10 60 20 40 40 30 C60 20 80 30 90 50 C100 70 80 90 60 90 C40 90 30 80 20 70 Z" opacity="0.5"/>
                    <path d="M30 65 C25 55 35 45 50 40 C65 35 75 45 80 55 C85 65 75 75 60 80 C45 85 35 75 30 65 Z"/>
                 </svg>
              </div>
           </div>

        </div>

        {/* Menu Grid */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMenu.map((item) => (
                <MenuCard key={item.id} item={item} onAdd={addToBilling} />
              ))}
           </div>
        </div>
      </div>

      {/* KANAN: Order Receipt Panel */}
      {isReceiptOpen && (
      <div className="w-full xl:w-[400px] h-full bg-white rounded-3xl flex flex-col shadow-xl border border-[#332218]/10 shrink-0 animate-in slide-in-from-right-8 duration-300">
         
         {/* Top Header Receipt */}
         <div className="flex items-center justify-between p-6 pb-2">
            <button onClick={() => setIsReceiptOpen(false)} className="w-10 h-10 bg-[#332218] rounded-full flex items-center justify-center text-white hover:bg-[#221610] transition-colors" title="Tutup Struk">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div className="text-center flex flex-col">
               <span className="font-bold text-gray-800 text-sm">Purchase Receipt</span>
               <span className="text-xs font-bold text-gray-400">#27362</span>
            </div>
            <button onClick={handleClearReceipt} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-800 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors" title="Kosongkan Struk">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
               </svg>
            </button>
         </div>

         {/* Order Options Toggle */}
         <div className="px-6 py-4">
            <div className="flex w-full bg-white border border-[#332218]/20 rounded-full p-1 shadow-sm">
               {['Dine In', 'Take Away', 'Order Online'].map(type => (
                 <button 
                   key={type}
                   onClick={() => setOrderType(type)}
                   className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${orderType === type ? 'bg-[#332218] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                   {type}
                 </button>
               ))}
            </div>
         </div>

         {/* Customer Inputs */}
         <div className="px-6 flex gap-4 mb-4">
            <div className="flex-1 flex flex-col">
               <label className="text-[10px] text-gray-500 font-bold mb-1">Customer name</label>
               <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Masukkan nama" className="w-full border border-gray-200 rounded-full py-2.5 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#332218]" />
            </div>
            <div className={`flex-1 flex flex-col transition-opacity ${orderType !== 'Dine In' ? 'opacity-30 pointer-events-none' : ''}`}>
               <label className="text-[10px] text-gray-500 font-bold mb-1">Table</label>
               <select value={customerTable} onChange={(e) => setCustomerTable(e.target.value)} className="w-full border border-gray-200 rounded-full py-2.5 px-4 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#332218] appearance-none bg-white">
                 <option>B12 - Indoor</option>
                 <option>A1 - Outdoor</option>
                 <option>VIP - 1</option>
               </select>
            </div>
         </div>

         <div className="px-6 text-xs text-gray-400 font-bold mb-2">Order list</div>

         {/* Order List Scroll */}
         <div className="flex-1 overflow-y-auto px-6 hide-scrollbar flex flex-col gap-4">
            {bills.length === 0 && (
               <div className="text-center text-gray-300 py-10 text-xs">Pilih menu di samping untuk menambahkan ke pesanan.</div>
            )}
            {bills.map((bill) => (
               <div key={bill.cartId} className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl bg-[#F8F1E7] p-1 flex-shrink-0 flex items-center justify-center">
                     <img src={bill.displayImage} alt={bill.title} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                     <div className="flex justify-between items-start mb-1">
                        <span className="font-extrabold text-sm text-gray-800">{bill.title}</span>
                        <span className="font-extrabold text-sm text-gray-800">Rp {(bill.price * bill.qty).toLocaleString('id-ID')}</span>
                     </div>
                     <div className="text-[10px] font-bold text-gray-400 mb-2">
                        Rp {bill.price.toLocaleString('id-ID')} x{bill.qty} • Medium
                     </div>
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                           <input 
                             type="text" 
                             placeholder="Tambah catatan (opsional)..." 
                             value={bill.note || ''} 
                             onChange={(e) => updateNote(bill.cartId, e.target.value)}
                             className="bg-transparent focus:outline-none placeholder-gray-300 w-32"
                           />
                        </div>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full border border-gray-100 px-3 py-1">
                           <button onClick={() => updateQty(bill.cartId, -1)} className="text-gray-400 font-bold hover:text-gray-800">-</button>
                           <span className="text-xs font-bold text-gray-800 w-2 text-center">{bill.qty}</span>
                           <button onClick={() => updateQty(bill.cartId, 1)} className="text-gray-400 font-bold hover:text-gray-800">+</button>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Payment Details */}
         <div className="p-6 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-extrabold text-gray-800 mb-3">Payment Details</h4>
            <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
               <span>Subtotal</span><span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-500 mb-4">
               <span>Tax (10%)</span><span>Rp {tax.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-gray-800 mb-6">
               <span>Total</span><span>Rp {totalAkhir.toLocaleString('id-ID')}</span>
            </div>
            
            <button 
              onClick={handlePrintBills} 
              className="w-full bg-[#332218] text-white py-4 rounded-full flex justify-between items-center px-2 hover:bg-[#221610] transition-all shadow-xl shadow-[#332218]/20 group"
            >
               <div className="w-10 h-10 bg-white text-[#332218] rounded-full flex items-center justify-center font-bold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
               </div>
               <span className="font-bold text-sm tracking-wide group-hover:scale-105 transition-transform">Place Order &nbsp; Rp {totalAkhir.toLocaleString('id-ID')}</span>
               <div className="pr-4 text-white/50 font-bold tracking-tighter group-hover:translate-x-1 transition-transform">❯❯❯</div>
            </button>
         </div>

      </div>
      )}
    </div>
  );
}