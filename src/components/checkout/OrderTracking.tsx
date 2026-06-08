import React, { useState } from 'react';
import {
  Search, Package, CheckCircle, Truck, MapPin, ShoppingBag,
  Clock, ChevronLeft, Box, Home
} from 'lucide-react';
import { AppModule } from '../../types';

interface OrderTrackingProps {
  onNavigate: (module: AppModule) => void;
}

const timelineSteps = [
  { id: 1, label: 'Order Placed', desc: 'Your order has been received', icon: ShoppingBag, time: 'Jan 20, 2024 — 10:32 AM' },
  { id: 2, label: 'Payment Confirmed', desc: 'Payment successfully verified', icon: CheckCircle, time: 'Jan 20, 2024 — 10:35 AM' },
  { id: 3, label: 'Processing', desc: 'Your order is being prepared', icon: Package, time: 'Jan 20, 2024 — 2:00 PM' },
  { id: 4, label: 'Packed', desc: 'Items packed and ready', icon: Box, time: 'Jan 21, 2024 — 9:00 AM' },
  { id: 5, label: 'Shipped', desc: 'Order dispatched via FedEx', icon: Truck, time: 'Jan 21, 2024 — 3:00 PM' },
  { id: 6, label: 'Out for Delivery', desc: 'Out for delivery in your area', icon: MapPin, time: 'Jan 23, 2024 — 8:00 AM' },
  { id: 7, label: 'Delivered', desc: 'Successfully delivered', icon: Home, time: 'Pending' },
];

const currentStep = 5;

export function OrderTracking({ onNavigate }: OrderTrackingProps) {
  const [orderNum, setOrderNum] = useState('');
  const [email, setEmail] = useState('');
  const [tracked, setTracked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    if (!orderNum && !email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setTracked(true); }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back */}
        <button
          onClick={() => onNavigate('storefront')}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-8"
        >
          <ChevronLeft size={16} /> Back to Store
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#FF6B00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck size={32} className="text-[#FF6B00]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Order Tracking</h1>
          <p className="text-gray-500 mt-2">Enter your order number to track your shipment in real-time</p>
        </div>

        {/* Search form */}
        <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Order Number</label>
              <input
                value={orderNum}
                onChange={(e) => setOrderNum(e.target.value)}
                placeholder="e.g. ORD-2024-001"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="john@email.com"
                className="input-field"
              />
            </div>
          </div>
          <button
            onClick={handleTrack}
            disabled={loading}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#E65F00] text-white font-semibold px-8 py-3 rounded-[10px] transition-all duration-200 hover:shadow-md active:scale-95 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Tracking...
              </span>
            ) : (
              <><Search size={18} /> Track Order</>
            )}
          </button>
        </div>

        {/* Tracking results */}
        {tracked && (
          <div className="space-y-6">
            {/* Order info */}
            <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Order #ORD-2024-001</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Placed on January 20, 2024</p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full">
                  <Truck size={15} />
                  Shipped — In Transit
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative mb-8">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C38] rounded-full transition-all duration-1000"
                    style={{ width: `${((currentStep - 1) / (timelineSteps.length - 1)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">Order Placed</span>
                  <span className="text-xs text-gray-500">Delivered</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                {timelineSteps.map((s, idx) => {
                  const Icon = s.icon;
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep - 1;
                  return (
                    <div key={s.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0 transition-all ${
                          isDone
                            ? 'bg-[#FF6B00] border-[#FF6B00] text-white'
                            : isCurrent
                            ? 'bg-white border-[#FF6B00] text-[#FF6B00] shadow-md animate-pulse'
                            : 'bg-white border-gray-200 text-gray-400'
                        }`}>
                          <Icon size={15} />
                        </div>
                        {idx < timelineSteps.length - 1 && (
                          <div className={`w-0.5 h-8 ${isDone ? 'bg-[#FF6B00]' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="pb-8">
                        <div className="flex items-baseline gap-3">
                          <span className={`text-sm font-semibold ${isDone || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                            {s.label}
                          </span>
                          <span className="text-xs text-gray-400">{s.time}</span>
                        </div>
                        <p className={`text-xs mt-0.5 ${isDone || isCurrent ? 'text-gray-500' : 'text-gray-300'}`}>
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping details */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin size={16} className="text-[#FF6B00]" /> Delivery Address
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Alexandra Chen<br />
                  123 Main Street<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
              <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Truck size={16} className="text-[#FF6B00]" /> Carrier Information
                </h3>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Carrier</span>
                    <span className="font-medium">FedEx Express</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tracking No.</span>
                    <span className="font-medium text-[#FF6B00]">794644774998</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Est. Delivery</span>
                    <span className="font-medium">Jan 23, 2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ordered items */}
            <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Ordered Items</h3>
              <div className="space-y-3">
                {[
                  { name: 'Smart Watch Series 7', qty: 1, price: 449, img: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=100' },
                  { name: 'Laptop Stand Aluminium', qty: 1, price: 79, img: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=100' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-[10px]">
                    <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-[8px]" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">${item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span><span>$528.00</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo hint */}
        {!tracked && (
          <div className="text-center">
            <p className="text-xs text-gray-400">Demo: Enter any order number or email to see tracking results</p>
          </div>
        )}
      </div>
    </div>
  );
}
