import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Eye } from 'lucide-react';
import { Order } from '../../types';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

interface OrdersPageProps {
  orders: Order[];
}

const statusOptions = ['all', 'pending', 'processing', 'completed', 'cancelled'] as const;

export function OrdersPage({ orders: initialOrders }: OrdersPageProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<typeof statusOptions[number]>('all');
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map((o) => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="space-y-5">
      {/* Status tab filters */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              statusFilter === s
                ? 'bg-[#FF6B00] text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
            }`}
          >
            {s === 'all' ? 'All Orders' : s}
            <span className="ml-1.5 text-xs opacity-70">
              ({s === 'all' ? orders.length : orders.filter((o) => o.status === s).length})
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-[10px] px-3 py-2.5 w-full sm:w-72 focus-within:border-orange-400 transition-colors">
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders..."
          className="bg-transparent text-sm outline-none flex-1 text-gray-700"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Products</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono font-bold text-[#FF6B00]">{order.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-xs text-gray-500">{order.customerEmail}</div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs text-gray-500">{order.date}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-xs text-gray-600 line-clamp-1">
                      {order.products.map((p) => p.name).join(', ')}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Badge status={order.status} />
                      <div className="relative">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
                          className="appearance-none text-[10px] text-gray-400 bg-transparent cursor-pointer outline-none"
                        >
                          {['pending', 'processing', 'completed', 'cancelled'].map((s) => (
                            <option key={s} value={s} className="capitalize">{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-bold text-gray-900">${order.total}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setViewOrder(order)}
                      className="p-1.5 rounded-[8px] text-gray-400 hover:text-[#FF6B00] hover:bg-orange-50 transition-colors"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Order detail modal */}
      <Modal open={!!viewOrder} onClose={() => setViewOrder(null)} title={`Order ${viewOrder?.id}`} maxWidth="max-w-xl">
        {viewOrder && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-[10px] p-3">
                <div className="text-xs text-gray-500 mb-1">Customer</div>
                <div className="text-sm font-semibold">{viewOrder.customer}</div>
                <div className="text-xs text-gray-500">{viewOrder.customerEmail}</div>
              </div>
              <div className="bg-gray-50 rounded-[10px] p-3">
                <div className="text-xs text-gray-500 mb-1">Status</div>
                <Badge status={viewOrder.status} />
                <div className="text-xs text-gray-500 mt-1">{viewOrder.date}</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Shipping Address</div>
              <p className="text-sm text-gray-700">{viewOrder.shippingAddress}</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Products</div>
              {viewOrder.products.map((p, i) => (
                <div key={i} className="flex justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-gray-700">{p.name} <span className="text-gray-400">×{p.qty}</span></span>
                  <span className="font-semibold text-gray-900">${p.price}</span>
                </div>
              ))}
              <div className="flex justify-between text-base font-bold text-gray-900 pt-2">
                <span>Total</span>
                <span>${viewOrder.total}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={viewOrder.status}
                onChange={(e) => {
                  const newStatus = e.target.value as Order['status'];
                  setOrders(orders.map((o) => o.id === viewOrder.id ? { ...o, status: newStatus } : o));
                  setViewOrder({ ...viewOrder, status: newStatus });
                }}
                className="input-field flex-1 text-sm"
              >
                {['pending', 'processing', 'completed', 'cancelled'].map((s) => (
                  <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <button
                onClick={() => setViewOrder(null)}
                className="bg-[#FF6B00] hover:bg-[#E65F00] text-white text-sm font-semibold px-5 py-3 rounded-[10px] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
