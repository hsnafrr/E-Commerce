import React, { useState } from 'react';
import { Download, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { revenueData, categoryData } from '../../data';

const reportTypes = ['Revenue Report', 'Sales Report', 'Product Report', 'Customer Report'];

function BarChart({ data }: { data: typeof revenueData }) {
  const max = Math.max(...data.map((d) => d.revenue));
  return (
    <div className="flex items-end gap-3 h-40">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
          <div className="w-full flex items-end justify-center" style={{ height: '100%' }}>
            <div
              className={`w-full rounded-t-[6px] transition-all hover:opacity-80 ${i === data.length - 2 ? 'bg-[#FF6B00]' : 'bg-[#FFD9B8]'}`}
              style={{ height: `${(d.revenue / max) * 100}%` }}
              title={`$${(d.revenue / 1000).toFixed(0)}k`}
            />
          </div>
          <span className="text-[10px] text-gray-500">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

export function ReportsPage() {
  const [activeReport, setActiveReport] = useState('Revenue Report');

  const totalRevenue = revenueData.reduce((a, d) => a + d.revenue, 0);
  const totalOrders = revenueData.reduce((a, d) => a + d.orders, 0);

  return (
    <div className="space-y-6">
      {/* Report type tabs */}
      <div className="flex flex-wrap gap-2">
        {reportTypes.map((r) => (
          <button
            key={r}
            onClick={() => setActiveReport(r)}
            className={`px-4 py-2.5 rounded-[10px] text-sm font-medium transition-all ${
              activeReport === r
                ? 'bg-[#FF6B00] text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Export buttons */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{activeReport}</h2>
        <div className="flex gap-2">
          {['PDF', 'Excel', 'CSV'].map((format) => (
            <button
              key={format}
              className="flex items-center gap-1.5 border border-gray-200 bg-white hover:border-orange-300 hover:text-[#FF6B00] text-gray-600 text-xs font-semibold px-3 py-2 rounded-[8px] transition-colors"
            >
              <Download size={13} /> {format}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${(totalRevenue / 1000).toFixed(0)}k`, change: '+18.2%', up: true },
          { label: 'Total Orders', value: totalOrders.toLocaleString(), change: '+12.5%', up: true },
          { label: 'Avg. Revenue/Month', value: `$${((totalRevenue / revenueData.length) / 1000).toFixed(0)}k`, change: '+8.1%', up: true },
          { label: 'Refund Rate', value: '2.3%', change: '-0.5%', up: false },
        ].map(({ label, value, change, up }) => (
          <div key={label} className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5">
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">{label}</span>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${up ? 'text-green-600' : 'text-red-500'}`}>
                {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-900">Monthly Revenue</h3>
            <span className="flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
              <ArrowUpRight size={12} /> +18.2%
            </span>
          </div>
          <BarChart data={revenueData} />
        </div>

        <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5">
          <h3 className="text-base font-bold text-gray-900 mb-5">Sales by Category</h3>
          <div className="space-y-3">
            {categoryData.map((d) => (
              <div key={d.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">{d.name}</span>
                  <span className="text-sm font-bold text-gray-900">{d.value}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${d.value}%`, background: d.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue table */}
      <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Monthly Breakdown</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Order</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {revenueData.map((d, i) => {
              const prev = i > 0 ? revenueData[i - 1].revenue : d.revenue;
              const growth = ((d.revenue - prev) / prev) * 100;
              return (
                <tr key={d.month} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{d.month} 2024</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900">${d.revenue.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-700">{d.orders}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-700">${(d.revenue / d.orders).toFixed(2)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold ${growth >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
