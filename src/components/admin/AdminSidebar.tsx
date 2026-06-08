import React from 'react';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Warehouse,
  Tag, BarChart2, Settings, ChevronLeft, Store, LogOut
} from 'lucide-react';
import { AdminPage } from '../../types';

interface AdminSidebarProps {
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onExitAdmin: () => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems: { id: AdminPage; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'reports', label: 'Reports', icon: BarChart2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar({ currentPage, onNavigate, onExitAdmin, collapsed, onToggle }: AdminSidebarProps) {
  return (
    <aside className={`fixed left-0 top-0 h-full bg-[#0B1F3A] flex flex-col z-30 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-white/10 px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF6B00] rounded-[8px] flex items-center justify-center">
              <Package size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-base">ShopNest</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-[#FF6B00] rounded-[8px] flex items-center justify-center">
            <Package size={16} className="text-white" />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={onToggle}
            className="w-6 h-6 rounded-full bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            title={collapsed ? label : undefined}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-[10px] text-sm font-medium transition-all duration-200 ${
              currentPage === id
                ? 'bg-[#FF6B00] text-white shadow-md'
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
            } ${collapsed ? 'justify-center' : ''}`}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
            {!collapsed && currentPage === id && (
              <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <button
          onClick={onExitAdmin}
          title={collapsed ? 'Go to Store' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-[10px] text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <Store size={18} className="shrink-0" />
          {!collapsed && <span>View Store</span>}
        </button>
        {collapsed && (
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center px-3 py-3 rounded-[10px] text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            title="Expand"
          >
            <ChevronLeft size={18} className="rotate-180" />
          </button>
        )}
      </div>

      {/* Admin profile */}
      {!collapsed && (
        <div className="px-3 pb-4">
          <div className="flex items-center gap-3 bg-white/5 rounded-[12px] p-3">
            <div className="w-9 h-9 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">Admin User</div>
              <div className="text-gray-400 text-[10px] truncate">admin@shopnest.com</div>
            </div>
            <LogOut size={14} className="text-gray-500 hover:text-white cursor-pointer transition-colors shrink-0" />
          </div>
        </div>
      )}
    </aside>
  );
}
