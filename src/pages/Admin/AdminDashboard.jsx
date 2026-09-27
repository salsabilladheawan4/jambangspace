import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

export default function AdminDashboard({ dataPenjualan = [], dataBelanja = [] }) {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemAnim = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  // Placeholder Data for Charts
  const salesData = [
    { name: 'Jan 14', Coffee: 1145, Tea: 2345, Snack: 345 },
    { name: 'Jan 15', Coffee: 1300, Tea: 1800, Snack: 600 },
    { name: 'Jan 16', Coffee: 2100, Tea: 1200, Snack: 400 },
    { name: 'Jan 17', Coffee: 1800, Tea: 1600, Snack: 800 },
    { name: 'Jan 18', Coffee: 2400, Tea: 2100, Snack: 500 },
    { name: 'Jan 19', Coffee: 2100, Tea: 2600, Snack: 700 },
    { name: 'Jan 20', Coffee: 2800, Tea: 2200, Snack: 900 },
  ];

  const radarData = [
    { subject: 'Expresso', A: 120, fullMark: 150 },
    { subject: 'Americano', A: 98, fullMark: 150 },
    { subject: 'Mocha', A: 86, fullMark: 150 },
    { subject: 'Expresso', A: 99, fullMark: 150 },
    { subject: 'Salted Caramel', A: 85, fullMark: 150 },
    { subject: 'Flat White', A: 65, fullMark: 150 },
    { subject: 'Latte', A: 130, fullMark: 150 },
    { subject: 'Ice Coffee', A: 110, fullMark: 150 },
  ];

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="font-sans text-[#333]">
      
      {/* 1. TOP KPI BAR */}
      <motion.div variants={itemAnim} className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#332218]/5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 mb-6">
        
        {/* Total Revenue */}
        <div className="flex-1 min-w-[200px] border-r border-gray-100 pr-6">
          <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2 text-[#332218] font-bold text-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="12" y1="12" x2="12" y2="12"></line></svg>
                Total Revenue
             </div>
             <span className="text-xs text-gray-400 font-medium cursor-pointer">Details</span>
          </div>
          <div className="flex items-end gap-2">
             <span className="text-xl font-medium text-gray-500 mb-1">$</span>
             <span className="text-4xl font-extrabold text-[#332218] tracking-tight">2,357.00</span>
             <span className="flex items-center text-green-500 text-xs font-bold mb-1 ml-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-8 8h6v8h4v-8h6z"/></svg> 2%</span>
          </div>
        </div>

        {/* On Progress */}
        <div className="flex-1 min-w-[120px] border-r border-gray-100 px-2 lg:px-6">
          <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm mb-4">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
             On Progress
          </div>
          <div className="flex items-end gap-1">
             <span className="text-3xl font-extrabold text-gray-800">10</span>
             <span className="text-sm font-semibold text-gray-400 mb-1">Orders</span>
          </div>
        </div>

        {/* Performance */}
        <div className="flex-1 min-w-[120px] border-r border-gray-100 px-2 lg:px-6">
          <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm mb-4">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
             Performance
          </div>
          <div className="flex items-end gap-2">
             <span className="text-3xl font-extrabold text-gray-800">Good</span>
             <span className="text-sm font-semibold text-gray-400 mb-1">2/24</span>
          </div>
        </div>

        {/* Today Sales */}
        <div className="flex-1 min-w-[120px] border-r border-gray-100 px-2 lg:px-6">
          <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm mb-4">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
             Today Sales
          </div>
          <div className="flex items-end gap-2">
             <span className="text-3xl font-extrabold text-gray-800">234</span>
             <span className="flex items-center text-green-500 text-xs font-bold mb-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-8 8h6v8h4v-8h6z"/></svg> 2%</span>
          </div>
        </div>

        {/* On Progress 2 */}
        <div className="flex-1 min-w-[120px] pl-2 lg:pl-6">
          <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm mb-4">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
             On Progress
          </div>
          <div className="flex items-end gap-1">
             <span className="text-3xl font-extrabold text-gray-800">10</span>
             <span className="text-sm font-semibold text-gray-400 mb-1">Orders</span>
          </div>
        </div>

      </motion.div>

      {/* 2. MIDDLE ROW (Chart + Score) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
         
         {/* Sales Statistic */}
         <motion.div variants={itemAnim} className="xl:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-[#332218]/5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
               <div>
                  <div className="flex items-center gap-2 font-bold text-lg text-gray-800 mb-2">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                     Sales Statistic
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Tea</span>
                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#332218]"></span> Coffee</span>
                     <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> Snack</span>
                  </div>
               </div>
               
               <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-100 text-xs font-bold text-gray-500">
                  <span className="p-1 px-2 cursor-pointer hover:text-[#332218]">...</span>
                  <span className="p-1 px-2 cursor-pointer hover:text-[#332218]">↻</span>
                  <span className="bg-white rounded-full py-1.5 px-4 shadow-sm text-gray-800">Day</span>
                  <span className="py-1.5 px-4 cursor-pointer hover:text-gray-800">Month</span>
                  <span className="py-1.5 px-4 cursor-pointer hover:text-gray-800">Year</span>
                  <span className="py-1.5 px-4 cursor-pointer hover:text-gray-800">All</span>
                  <span className="py-1.5 px-4 cursor-pointer hover:text-gray-800">Custom</span>
               </div>
            </div>

            <div className="absolute right-8 top-24 text-gray-400 text-xs font-bold">
               ▲ $120,00,00
            </div>

            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#aaa' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '16px' }}
                  />
                  <Line type="monotone" dataKey="Coffee" stroke="#332218" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#332218', stroke: '#fff', strokeWidth: 3 }} />
                  <Line type="monotone" dataKey="Tea" stroke="#facc15" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="Snack" stroke="#f87171" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
         </motion.div>

         {/* Score / Complains */}
         <motion.div variants={itemAnim} className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#332218]/5 flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-2 font-bold text-lg text-gray-800">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  Score
               </div>
               <span className="text-gray-400 font-bold tracking-widest">...</span>
            </div>
            
            <div className="flex justify-center items-center relative mb-10 mt-2">
               {/* Decorative Dashboard Gauge */}
               <svg viewBox="0 0 100 50" className="w-[80%] max-w-[250px] overflow-visible">
                 <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f0f0f0" strokeWidth="12" strokeLinecap="round" strokeDasharray="2 4" />
                 <path d="M 10 50 A 40 40 0 0 1 75 18" fill="none" stroke="#84CC16" strokeWidth="12" strokeLinecap="round" strokeDasharray="2 4" />
               </svg>
               <div className="absolute top-[40%] flex items-center gap-3">
                  <span className="text-6xl font-black text-gray-800">98</span>
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] font-extrabold text-gray-500">2/58 order</span>
                    <span className="text-xs font-bold text-gray-800">Complains</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-3 mt-auto">
               <div className="flex items-center justify-between p-3 bg-red-50/50 rounded-2xl border border-red-100">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-red-400 text-white flex items-center justify-center font-bold">!</div>
                     <div className="flex flex-col">
                        <span className="text-sm font-extrabold text-gray-800">Wrong Menu</span>
                        <span className="text-[10px] font-bold text-gray-400">Andrew Tate</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <button className="bg-white px-4 py-1.5 rounded-full text-xs font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm">Solve</button>
                     <span className="flex gap-0.5"><div className="w-1 h-3 bg-red-400 rounded-full"></div><div className="w-1 h-3 bg-red-400 rounded-full"></div><div className="w-1 h-3 bg-red-400 rounded-full"></div></span>
                  </div>
               </div>
               
               <div className="flex items-center justify-between p-3 bg-[#332218]/5 rounded-2xl border border-[#332218]/10">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#84CC16] text-white flex items-center justify-center font-bold">★</div>
                     <div className="flex flex-col">
                        <span className="text-sm font-extrabold text-gray-800">Bad Rating</span>
                        <span className="text-[10px] font-bold text-gray-400">Don Orvald</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <button className="bg-white px-4 py-1.5 rounded-full text-xs font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm">Solve</button>
                     <span className="flex gap-0.5"><div className="w-1 h-3 bg-red-400 rounded-full"></div><div className="w-1 h-3 bg-red-400 rounded-full"></div><div className="w-1 h-3 bg-red-400 rounded-full"></div></span>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>

      {/* 3. BOTTOM ROW (Radar + Table) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
         
         {/* Items Performance */}
         <motion.div variants={itemAnim} className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#332218]/5">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 font-bold text-lg text-gray-800">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                  Items Performance
               </div>
               <span className="text-gray-400 font-bold tracking-widest">...</span>
            </div>
            <div className="h-[280px] w-full flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar name="Performance" dataKey="A" stroke="#84CC16" fill="#84CC16" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
               </ResponsiveContainer>
            </div>
         </motion.div>

         {/* Recent Transaction */}
         <motion.div variants={itemAnim} className="xl:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-[#332218]/5 overflow-x-auto">
            <div className="flex justify-between items-center mb-6 min-w-[700px]">
               <div className="flex items-center gap-2 font-bold text-lg text-gray-800">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#332218" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  Recent Transaction
               </div>
               <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-100 text-xs font-bold text-gray-500">
                  <span className="p-1 px-2 cursor-pointer hover:text-[#332218]">↻</span>
                  <span className="bg-white rounded-full py-1.5 px-5 shadow-sm text-gray-800">All</span>
                  <span className="py-1.5 px-5 cursor-pointer hover:text-gray-800">Tea</span>
                  <span className="py-1.5 px-5 cursor-pointer hover:text-gray-800">Coffee</span>
                  <span className="py-1.5 px-5 cursor-pointer hover:text-gray-800">Snack</span>
               </div>
            </div>

            <table className="w-full text-left min-w-[700px] border-collapse">
               <thead>
                  <tr className="text-xs font-bold text-gray-400 border-b border-gray-100">
                     <th className="pb-4 pl-2 w-10"><input type="checkbox" className="rounded text-[#332218] focus:ring-[#332218]" /></th>
                     <th className="pb-4">Customer Name</th>
                     <th className="pb-4">Email</th>
                     <th className="pb-4">Phone</th>
                     <th className="pb-4">Items</th>
                     <th className="pb-4">Value</th>
                     <th className="pb-4"></th>
                  </tr>
               </thead>
               <tbody className="text-sm font-semibold text-gray-700">
                  {[
                     { name: 'John Smith', email: 'smithjohn@gmail.com', phone: '+21 34567800', items: 'Tea, Snack, Coffee', val: '$10.00', color: 'bg-orange-100 text-orange-600' },
                     { name: 'Michael Will', email: 'john@gmail.com', phone: '+25 12345678', items: 'Coffee, Tea, Snack', val: '$24.00', color: 'bg-blue-100 text-blue-600' },
                     { name: 'Kevin Brown', email: 'johnsmith@gmail.com', phone: '+24 98765432', items: 'Coffee, Tea, Snack', val: '$24.00', color: 'bg-purple-100 text-purple-600' },
                     { name: 'Lia Thompson', email: 'smith@gmail.com', phone: '+22 87654321', items: 'Snack, Coffee, Tea', val: '$4.00', color: 'bg-green-100 text-green-600' },
                  ].map((row, i) => (
                     <tr key={i} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                        <td className="py-4 pl-2"><input type="checkbox" className="rounded text-[#332218] focus:ring-[#332218]" /></td>
                        <td className="py-4 flex items-center gap-3">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${row.color}`}>
                              {row.name.split(' ')[0][0]}{row.name.split(' ')[1][0]}
                           </div>
                           <span className="font-extrabold text-gray-800">{row.name}</span>
                        </td>
                        <td className="py-4">{row.email}</td>
                        <td className="py-4 text-gray-500">{row.phone}</td>
                        <td className="py-4 text-gray-500">{row.items}</td>
                        <td className="py-4">{row.val}</td>
                        <td className="py-4 text-right pr-4"><span className="cursor-pointer text-gray-400 font-bold hover:text-gray-800">⋮</span></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </motion.div>

      </div>
    </motion.div>
  );
}