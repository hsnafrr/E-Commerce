import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Shield, BarChart2 } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

const slides = [
  {
    badge: 'New Collection 2024',
    headline: 'E-Commerce Website Solutions',
    sub: 'Custom online store solutions with complete product and order management systems.',
    cta: 'Explore Products',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Smart Watch',
    accent: 'Smart Watch Series 7',
  },
  {
    badge: 'Premium Audio',
    headline: 'Sound Without Limits',
    sub: 'Experience studio-quality audio anywhere with our premium wireless headphones.',
    cta: 'Shop Headphones',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Headphones',
    accent: 'Headphones Ultra Pro',
  },
  {
    badge: 'Active Lifestyle',
    headline: 'Gear Up, Perform Better',
    sub: 'Elevate your performance with our collection of professional athletic footwear.',
    cta: 'Shop Footwear',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Running Shoes',
    accent: 'Running Shoes Elite',
  },
];

const features = [
  { icon: Zap, label: 'Fast Delivery', sub: '2-3 business days' },
  { icon: Shield, label: 'Secure Payment', sub: '256-bit SSL encrypted' },
  { icon: BarChart2, label: 'Real-time Tracking', sub: 'Live order updates' },
];

export function Hero({ onExplore }: HeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden">
      {/* Hero */}
      <div
        className="relative min-h-[560px] flex items-center"
        style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1D3557 50%, #0B1F3A 100%)' }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
        </div>

        {/* Orange accent blob */}
        <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-[#FF6B00] opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-white space-y-6">
            <span className="inline-flex items-center gap-2 bg-[#FF6B00]/20 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full animate-pulse" />
              {slide.badge}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
              {slide.headline}
            </h1>

            <p className="text-blue-200/80 text-lg leading-relaxed max-w-md">
              {slide.sub}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onExplore}
                className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E65F00] text-white font-semibold px-7 py-3.5 rounded-[10px] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                {slide.cta} <ArrowRight size={18} />
              </button>
              <button className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-7 py-3.5 rounded-[10px] transition-all duration-200 hover:bg-white/5">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-2">
              {[['50K+', 'Products'], ['200K+', 'Customers'], ['4.9★', 'Rating']].map(([val, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white">{val}</div>
                  <div className="text-xs text-blue-300">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-80 h-80 bg-[#FF6B00]/20 rounded-full blur-2xl" />
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full" />
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="w-full h-full object-cover rounded-[24px] shadow-2xl border border-white/10"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-[12px] shadow-xl px-4 py-3">
                <div className="text-xs text-gray-500 font-medium">Featured</div>
                <div className="text-sm font-bold text-gray-900">{slide.accent}</div>
                <div className="text-[#FF6B00] text-xs font-semibold mt-0.5">Shop Now →</div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <button
            onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-[#FF6B00]' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
          <button
            onClick={() => setCurrent((c) => (c + 1) % slides.length)}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Features bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {features.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-4 px-6 py-5">
                <div className="w-10 h-10 bg-orange-50 rounded-[10px] flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-[#FF6B00]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{label}</div>
                  <div className="text-xs text-gray-500">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
