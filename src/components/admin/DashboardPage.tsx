import React from 'react';
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users,
  BarChart2, ArrowUpRight, MoreHorizontal
} from 'lucide-react';
import { Order, Customer } from '../../types';
import { Badge } from '../ui/Badge';
import { revenueData, categoryData } from '../../data';

interface DashboardPageProps {
  orders: Order[];
  customers: Customer[];
}

const kpiCards = [
  { label: 'Total Revenue', value: '$284,521', change: '+18.2%', up: true, icon: DollarSign, color: 'bg-orange-50 text-[#FF6B00]' },
  { label: 'Total Orders', value: '3,847', change: '+12.5%', up: true, icon: ShoppingCart, color: 'bg-blue-50 text-blue-600' },
  { label: 'Active Products', value: '248', change: '+4.8%', up: true, icon: Package, color: 'bg-green-50 text-green-600' },
  { label: 'Active Customers', value: '12,340', change: '+22.1%', up: true, icon: Users, color: 'bg-purple-50 text-purple-600' },
  { label: 'Conversion Rate', value: '3.64%', change: '-0.3%', up: false, icon: BarChart2, color: 'bg-amber-50 text-amber-600' },
  { label: 'Avg. Order Value', value: '$73.96', change: '+5.2%', up: true, icon: TrendingUp, color: 'bg-teal-50 text-teal-600' },
];

function MiniBarChart({ data }: { data: typeof revenueData }) {
  const max = Math.max(...data.map((d) => d.revenue));
  return (
    <div className="flex items-end gap-1.5 h-20">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div
            className={`w-full rounded-t-sm transition-all ${i === data.length - 2 ? 'bg-[#FF6B00]' : 'bg-orange-100'}`}
            style={{ height: `${(d.revenue / max) * 100}%` }}
            title={`${d.month}: $${(d.revenue / 1000).toFixed(0)}k`}
          />
          <span className="text-[9px] text-gray-400">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

function MiniPieChart({ data }: { data: typeof categoryData }) {
  const total = data.reduce((a, d) => a + d.value, 0);
  let cumulative = 0;
  const slices = data.map((d) => {
    const start = (cumulative / total) * 360;
    cumulative += d.value;
    const end = (cumulative / total) * 360;
    return { ...d, start, end };
  });

  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 100 100" className="w-28 h-28 shrink-0">
        {slices.map((s, i) => (
          <path key={i} d={describeArc(50, 50, 45, s.start, s.end)} fill={s.color} />
        ))}
        <circle cx="50" cy="50" r="28" fill="white" />
      </svg>
      <div className="space-y-1.5 flex-1">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
              <span className="text-xs text-gray-600">{d.name}</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardPage({ orders, customers }: DashboardPageProps) {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${card.color}`}>
                  <Icon size={18} />
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">{card.label}</span>
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${card.up ? 'text-green-600' : 'text-red-500'}`}>
                  {card.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {card.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-[12px] border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900">Revenue Trend</h3>
              <p className="text-xs text-gray-500 mt-0.5">Monthly revenue overview</p>
            </div>
            <div className="flex items-center gap-1">
              {['7D', '30D', '3M', '1Y'].map((t, i) => (
                <button key={t} className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${i === 3 ? 'bg-orange-50 text-[#FF6B00]' : 'text-gray-500 hover:bg-gray-50'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          {/* Revenue bars */}
          <div className="flex items-end gap-3 h-32 mb-3">
            {revenueData.map((d, i) => {
              const max = Math.max(...revenueData.map((r) => r.revenue));
              const heightPct = (d.revenue / max) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="relative w-full flex items-end justify-center" style={{ height: '100%' }}>
                    <div
                      className={`w-full rounded-t-[6px] transition-all hover:opacity-90 ${i === revenueData.length - 2 ? 'bg-[#FF6B00]' : 'bg-[#FFD9B8]'}`}
                      style={{ height: `${heightPct}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap transition-opacity">
                        ${(d.revenue / 1000).toFixed(0)}k
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500">{d.month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#FF6B00]" /><span className="text-xs text-gray-500">Current</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#FFD9B8]" /><span className="text-xs text-gray-500">Previous</span>
            </div>
            <div className="ml-auto flex items-center gap-1 text-xs text-green-600 font-semibold">
              <ArrowUpRight size={13} /> +18.2% vs last period
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5">
          <h3 className="text-base font-bold text-gray-900 mb-1">Sales by Category</h3>
          <p className="text-xs text-gray-500 mb-4">Product category breakdown</p>
          <MiniPieChart data={categoryData} />
        </div>
      </div>

      {/* Recent orders + top products */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-[12px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Recent Orders</h3>
            <button className="text-xs text-[#FF6B00] font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-mono font-semibold text-[#FF6B00]">{order.id}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-xs text-gray-500">{order.customerEmail}</div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-xs text-gray-500">{order.date}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge status={order.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm font-semibold text-gray-900">${order.total}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top customers */}
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Top Customers</h3>
            <button className="text-xs text-[#FF6B00] font-semibold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {customers.slice(0, 5).map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.orders} orders</div>
                </div>
                <span className="text-sm font-bold text-gray-900">${c.totalSpent.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
