import React, { useState } from 'react';
import { Search, Bell, Plus, Menu } from 'lucide-react';
import { AdminPage } from '../../types';

interface AdminHeaderProps {
  currentPage: AdminPage;
  onToggleSidebar: () => void;
}

const pageTitles: Record<AdminPage, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Welcome back, Admin' },
  products: { title: 'Product Management', subtitle: 'Manage your product catalog' },
  orders: { title: 'Order Management', subtitle: 'View and manage customer orders' },
  customers: { title: 'Customer Management', subtitle: 'Manage your customer base' },
  reports: { title: 'Reports & Analytics', subtitle: 'Business performance insights' },
  settings: { title: 'Settings', subtitle: 'Configure your store settings' },
};

export function AdminHeader({ currentPage, onToggleSidebar }: AdminHeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const { title, subtitle } = pageTitles[currentPage];

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-none">{title}</h1>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-[10px] px-3 py-2 w-52 focus-within:border-orange-400 transition-colors">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input placeholder="Search..." className="bg-transparent text-sm outline-none flex-1 text-gray-700" />
        </div>

        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-[10px] text-gray-600 hover:text-[#FF6B00] hover:bg-orange-50 transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-100 rounded-[12px] shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-900">Notifications</span>
              </div>
              {[
                { msg: 'New order #ORD-2024-007 received', time: '2m ago', dot: 'bg-[#FF6B00]' },
                { msg: 'Low stock alert: Office Chair (8 left)', time: '1h ago', dot: 'bg-amber-500' },
                { msg: '5 new customer registrations today', time: '3h ago', dot: 'bg-blue-500' },
              ].map((n, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                  <div>
                    <p className="text-xs text-gray-800">{n.msg}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="hidden md:flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E65F00] text-white text-sm font-semibold px-4 py-2 rounded-[10px] transition-colors">
          <Plus size={16} /> Quick Add
        </button>

        <div className="w-9 h-9 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}
