import React, { useState, useCallback } from 'react';
import { Header } from './components/storefront/Header';
import { Storefront } from './components/storefront/Storefront';
import { CartDrawer } from './components/storefront/CartDrawer';
import { Checkout } from './components/checkout/Checkout';
import { OrderTracking } from './components/checkout/OrderTracking';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ToastContainer, ToastMessage } from './components/ui/Toast';
import { Product, CartItem, AppModule } from './types';
import { products } from './data';

export default function App() {
  const [currentModule, setCurrentModule] = useState<AppModule>('storefront');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    addToast(`${product.name} added to cart!`, 'success');
  }, [addToast]);

  const handleUpdateCart = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((i) => i.product.id === productId ? { ...i, quantity: qty } : i)
      );
    }
  }, []);

  const handleRemoveFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    addToast('Item removed from cart', 'info');
  }, [addToast]);

  const handleOrderComplete = useCallback(() => {
    setCartItems([]);
    addToast('Order placed successfully!', 'success');
  }, [addToast]);

  const cartCount = cartItems.reduce((a, i) => a + i.quantity, 0);

  if (currentModule === 'admin') {
    return (
      <>
        <AdminDashboard
          onExitAdmin={() => setCurrentModule('storefront')}
          onNavigate={setCurrentModule}
        />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  if (currentModule === 'checkout') {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Checkout
          cartItems={cartItems}
          onNavigate={setCurrentModule}
          onOrderComplete={handleOrderComplete}
        />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    );
  }

  if (currentModule === 'tracking') {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <OrderTracking onNavigate={setCurrentModule} />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavigate={setCurrentModule}
        currentModule={currentModule}
      />
      <Storefront
        products={products}
        onAddToCart={handleAddToCart}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdate={handleUpdateCart}
        onRemove={handleRemoveFromCart}
        onNavigate={setCurrentModule}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
