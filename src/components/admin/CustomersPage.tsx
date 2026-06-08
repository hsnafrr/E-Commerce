import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Customer } from '../../types';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

interface CustomersPageProps {
  customers: Customer[];
}

export function CustomersPage({ customers }: CustomersPageProps) {
  const [search, setSearch] = useState('');
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                statusFilter === s
                  ? 'bg-[#FF6B00] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
              }`}
            >
              {s === 'all' ? 'All Customers' : s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-[10px] px-3 py-2.5 w-64 focus-within:border-orange-400 transition-colors">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="bg-transparent text-sm outline-none flex-1 text-gray-700"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Customers', value: customers.length, color: 'text-[#FF6B00]' },
          { label: 'Active', value: customers.filter((c) => c.status === 'active').length, color: 'text-green-600' },
          { label: 'Total Revenue', value: '$' + customers.reduce((a, c) => a + c.totalSpent, 0).toLocaleString(), color: 'text-blue-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-4 text-center">
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Total Spent</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{c.name}</div>
                        <div className="text-xs text-gray-500">Since {c.joinDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="text-xs text-gray-700">{c.email}</div>
                    <div className="text-xs text-gray-500">{c.phone}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-gray-900">{c.orders}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm font-bold text-gray-900">${c.totalSpent.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge status={c.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setViewCustomer(c)}
                      className="p-1.5 rounded-[8px] text-gray-400 hover:text-[#FF6B00] hover:bg-orange-50 transition-colors"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer detail modal */}
      <Modal open={!!viewCustomer} onClose={() => setViewCustomer(null)} title="Customer Profile">
        {viewCustomer && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img src={viewCustomer.avatar} alt={viewCustomer.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{viewCustomer.name}</h3>
                <Badge status={viewCustomer.status} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Email', value: viewCustomer.email },
                { label: 'Phone', value: viewCustomer.phone },
                { label: 'Join Date', value: viewCustomer.joinDate },
                { label: 'Customer ID', value: viewCustomer.id },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-[10px] p-3">
                  <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                  <div className="text-sm font-medium text-gray-900">{value}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-orange-50 border border-orange-100 rounded-[12px] p-4 text-center">
                <div className="text-2xl font-bold text-[#FF6B00]">{viewCustomer.orders}</div>
                <div className="text-xs text-gray-600 mt-0.5">Total Orders</div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-[12px] p-4 text-center">
                <div className="text-2xl font-bold text-green-600">${viewCustomer.totalSpent.toLocaleString()}</div>
                <div className="text-xs text-gray-600 mt-0.5">Total Spent</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
