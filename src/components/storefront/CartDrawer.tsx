import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../../types';
import { AppModule } from '../../types';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdate: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
  onNavigate: (module: AppModule) => void;
}

export function CartDrawer({ open, onClose, items, onUpdate, onRemove, onNavigate }: CartDrawerProps) {
  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#FF6B00]" />
            <h2 className="text-lg font-bold text-gray-900">Shopping Cart</h2>
            {items.length > 0 && (
              <span className="bg-[#FF6B00] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {items.reduce((a, i) => a + i.quantity, 0)}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-medium text-gray-500">Your cart is empty</p>
              <p className="text-sm mt-1">Add some products to get started</p>
              <button
                onClick={onClose}
                className="mt-6 bg-[#FF6B00] text-white text-sm font-semibold px-6 py-2.5 rounded-[10px] hover:bg-[#E65F00] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 bg-gray-50 rounded-[12px] p-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-[8px] shrink-0 bg-white"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.product.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{item.product.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onUpdate(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-orange-400 hover:text-[#FF6B00] transition-colors"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdate(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-orange-400 hover:text-[#FF6B00] transition-colors"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="self-start text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4">
            {/* Order summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-100 pt-2">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gray-500 bg-orange-50 border border-orange-100 rounded-[8px] px-3 py-2">
                Add ${(99 - subtotal).toFixed(2)} more for free shipping!
              </p>
            )}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { onClose(); onNavigate('checkout'); }}
                className="w-full flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#E65F00] text-white font-semibold py-3.5 rounded-[10px] transition-all duration-200 hover:shadow-md active:scale-95"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>
              <button
                onClick={onClose}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 py-2 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
