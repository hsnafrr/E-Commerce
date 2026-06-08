import React, { useState } from 'react';
import {
  CreditCard, Building2, Wallet, ChevronLeft, ChevronRight,
  Check, MapPin, ShieldCheck, Truck
} from 'lucide-react';
import { CartItem, AppModule } from '../../types';

interface CheckoutProps {
  cartItems: CartItem[];
  onNavigate: (module: AppModule) => void;
  onOrderComplete: () => void;
}

type PaymentMethod = 'card' | 'paypal' | 'wallet' | 'bank';

const steps = ['Shipping', 'Payment', 'Review'];

const paymentOptions: { id: PaymentMethod; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={20} />, desc: 'Visa, Mastercard, Amex' },
  { id: 'paypal', label: 'PayPal', icon: <Wallet size={20} />, desc: 'Pay with your PayPal balance' },
  { id: 'wallet', label: 'Digital Wallet', icon: <Wallet size={20} />, desc: 'Apple Pay, Google Pay' },
  { id: 'bank', label: 'Bank Transfer', icon: <Building2 size={20} />, desc: 'Direct bank transfer' },
];

export function Checkout({ cartItems, onNavigate, onOrderComplete }: CheckoutProps) {
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', province: '', postal: '', country: 'United States',
    cardNumber: '', cardExpiry: '', cardCVC: '', cardName: '',
  });

  const subtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discount = subtotal > 200 ? subtotal * 0.05 : 0;
  const total = subtotal + shipping + tax - discount;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onOrderComplete();
      onNavigate('tracking');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
        <div className="bg-white rounded-[20px] shadow-xl border border-gray-100 p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
          <p className="text-gray-500 mb-2">Your order has been confirmed successfully.</p>
          <p className="text-sm text-gray-400 mb-6">Redirecting to order tracking...</p>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-[#FF6B00] h-1.5 rounded-full animate-[progress_2s_ease]" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => onNavigate('storefront')}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft size={16} /> Back to Store
          </button>
          <span className="text-gray-300">|</span>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center mb-8 max-w-md">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <button
                onClick={() => i < step && setStep(i)}
                className="flex items-center gap-2"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i < step ? 'bg-green-500 text-white' :
                  i === step ? 'bg-[#FF6B00] text-white shadow-md' :
                  'bg-white border-2 border-gray-200 text-gray-400'
                }`}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-[#FF6B00]' : i < step ? 'text-green-600' : 'text-gray-400'}`}>
                  {s}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 transition-colors ${i < step ? 'bg-green-400' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-6">

              {/* Step 0: Shipping */}
              {step === 0 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin size={20} className="text-[#FF6B00]" />
                    <h2 className="text-lg font-bold text-gray-900">Shipping Details</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">First Name *</label>
                      <input name="firstName" value={form.firstName} onChange={handleInput} placeholder="John" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Last Name *</label>
                      <input name="lastName" value={form.lastName} onChange={handleInput} placeholder="Doe" className="input-field" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={handleInput} placeholder="john@email.com" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
                      <input name="phone" value={form.phone} onChange={handleInput} placeholder="+1 (555) 000-0000" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Street Address *</label>
                    <input name="address" value={form.address} onChange={handleInput} placeholder="123 Main Street, Apt 4B" className="input-field" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">City *</label>
                      <input name="city" value={form.city} onChange={handleInput} placeholder="New York" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">State</label>
                      <input name="province" value={form.province} onChange={handleInput} placeholder="NY" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">ZIP Code *</label>
                      <input name="postal" value={form.postal} onChange={handleInput} placeholder="10001" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Country *</label>
                    <select name="country" value={form.country} onChange={handleInput} className="input-field">
                      {['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan'].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 1: Payment */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard size={20} className="text-[#FF6B00]" />
                    <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {paymentOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-4 p-4 rounded-[12px] border-2 cursor-pointer transition-all ${
                          paymentMethod === opt.id
                            ? 'border-[#FF6B00] bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={opt.id}
                          checked={paymentMethod === opt.id}
                          onChange={() => setPaymentMethod(opt.id)}
                          className="accent-[#FF6B00]"
                        />
                        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${
                          paymentMethod === opt.id ? 'bg-[#FF6B00] text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {opt.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{opt.label}</div>
                          <div className="text-xs text-gray-500">{opt.desc}</div>
                        </div>
                        {paymentMethod === opt.id && <Check size={16} className="text-[#FF6B00]" />}
                      </label>
                    ))}
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-[12px] border border-gray-200">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Cardholder Name</label>
                        <input name="cardName" value={form.cardName} onChange={handleInput} placeholder="John Doe" className="input-field" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Card Number</label>
                        <input name="cardNumber" value={form.cardNumber} onChange={handleInput} placeholder="1234 5678 9012 3456" className="input-field" maxLength={19} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Expiry Date</label>
                          <input name="cardExpiry" value={form.cardExpiry} onChange={handleInput} placeholder="MM/YY" className="input-field" maxLength={5} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">CVC</label>
                          <input name="cardCVC" value={form.cardCVC} onChange={handleInput} placeholder="123" className="input-field" maxLength={4} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-[10px] px-4 py-3">
                    <ShieldCheck size={16} className="text-green-500 shrink-0" />
                    <span className="text-xs text-green-700">Your payment info is encrypted with 256-bit SSL security.</span>
                  </div>
                </div>
              )}

              {/* Step 2: Review */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-6">
                    <Check size={20} className="text-[#FF6B00]" />
                    <h2 className="text-lg font-bold text-gray-900">Order Review</h2>
                  </div>
                  <div className="bg-gray-50 rounded-[12px] p-4 space-y-3">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Shipping To</h4>
                    <p className="text-sm text-gray-800">
                      {form.firstName} {form.lastName}<br />
                      {form.address}, {form.city}, {form.province} {form.postal}<br />
                      {form.country}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-[12px] p-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Payment</h4>
                    <p className="text-sm text-gray-800 capitalize">{paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod}</p>
                  </div>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3 bg-gray-50 rounded-[10px] p-3">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-[8px]" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => step > 0 ? setStep(step - 1) : onNavigate('storefront')}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  <ChevronLeft size={16} /> {step > 0 ? 'Previous' : 'Back to Store'}
                </button>
                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E65F00] text-white font-semibold px-6 py-3 rounded-[10px] transition-all active:scale-95"
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-[10px] transition-all active:scale-95"
                  >
                    Place Order <Check size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-2.5">
                    <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-[8px] object-cover bg-gray-50" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount (5%)</span><span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-100 pt-2">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-[12px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck size={16} className="text-[#FF6B00]" />
                <span className="text-sm font-semibold text-gray-900">Delivery Estimate</span>
              </div>
              <p className="text-xs text-gray-600">Standard: 3–5 business days</p>
              <p className="text-xs text-gray-600">Express: 1–2 business days (+$15)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
