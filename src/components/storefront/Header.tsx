import React, { useState, useEffect } from 'react';
import {
  ShoppingCart, Search, Bell, User, Menu, X, ChevronDown,
  Package, LayoutDashboard, Truck
} from 'lucide-react';
import { AppModule } from '../../types';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onNavigate: (module: AppModule) => void;
  currentModule: AppModule;
}

const navLinks = ['Home', 'Categories', 'Orders', 'Contact'];
const shopDropdown = ['All Products', 'Electronics', 'Footwear', 'Bags', 'Accessories', 'Furniture'];

export function Header({ cartCount, onCartOpen, onNavigate, currentModule }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md border-b border-gray-100' : 'bg-white border-b border-gray-100'
    }`}>
      {/* Top bar */}
      <div className="bg-[#0B1F3A] text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>Free shipping on orders over $99 | Use code: SHOPNEST20</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('tracking')}
              className="flex items-center gap-1 hover:text-orange-400 transition-colors"
            >
              <Truck size={12} /> Track Order
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1 hover:text-orange-400 transition-colors"
            >
              <LayoutDashboard size={12} /> Admin Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6 h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('storefront')}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-9 h-9 bg-[#FF6B00] rounded-[10px] flex items-center justify-center shadow-sm">
              <Package size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-[#0B1F3A]">Shop<span className="text-[#FF6B00]">Nest</span></span>
          </button>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            <button
              onClick={() => onNavigate('storefront')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentModule === 'storefront' ? 'text-[#FF6B00] bg-orange-50' : 'text-gray-700 hover:text-[#FF6B00] hover:bg-orange-50'
              }`}
            >
              Home
            </button>

            {/* Shop dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#FF6B00] hover:bg-orange-50 rounded-lg transition-colors"
              >
                Shop <ChevronDown size={14} className={`transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
              </button>
              {shopOpen && (
                <div
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                  className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-[12px] shadow-xl py-2 w-48 z-50"
                >
                  {shopDropdown.map((item) => (
                    <button
                      key={item}
                      onClick={() => { onNavigate('storefront'); setShopOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-[#FF6B00] hover:bg-orange-50 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <button
                key={link}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#FF6B00] hover:bg-orange-50 rounded-lg transition-colors"
              >
                {link}
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-[10px] px-3 py-2 w-64 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search products..."
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto md:ml-0">
            <button className="p-2 rounded-[10px] text-gray-600 hover:text-[#FF6B00] hover:bg-orange-50 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B00] rounded-full" />
            </button>
            <button className="p-2 rounded-[10px] text-gray-600 hover:text-[#FF6B00] hover:bg-orange-50 transition-colors">
              <User size={20} />
            </button>
            <button
              onClick={onCartOpen}
              className="relative p-2 rounded-[10px] text-gray-600 hover:text-[#FF6B00] hover:bg-orange-50 transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FF6B00] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-[10px] text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-[10px] px-3 py-2 mb-3">
              <Search size={16} className="text-gray-400" />
              <input placeholder="Search products..." className="bg-transparent text-sm outline-none flex-1" />
            </div>
            {['Home', 'Shop', ...navLinks.slice(1)].map((link) => (
              <button
                key={link}
                className="text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#FF6B00] hover:bg-orange-50 rounded-lg transition-colors"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => onNavigate('admin')}
              className="text-left px-3 py-2.5 text-sm font-medium text-[#FF6B00] bg-orange-50 rounded-lg mt-2"
            >
              Admin Dashboard
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
