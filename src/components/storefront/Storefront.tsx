import React from 'react';
import { Headphones, Shield, BarChart2, Users, Award, ArrowRight } from 'lucide-react';
import { Hero } from './Hero';
import { ProductCatalog } from './ProductCatalog';
import { Product } from '../../types';

interface StorefrontProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const testimonials = [
  { name: 'Alexandra Chen', role: 'Marketing Director', text: 'Exceptional quality and fast delivery. ShopNest has become my go-to for all tech purchases.', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5 },
  { name: 'Marcus Johnson', role: 'Software Engineer', text: 'The product selection is outstanding. I found exactly what I needed at a competitive price.', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5 },
  { name: 'Sofia Rodriguez', role: 'UX Designer', text: 'Smooth shopping experience from start to finish. The order tracking feature is incredibly detailed.', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100', rating: 5 },
];

export function Storefront({ products, onAddToCart }: StorefrontProps) {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Hero onExplore={scrollToProducts} />

      {/* Brand logos */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs text-gray-400 font-semibold uppercase tracking-widest mb-6">Trusted Brands</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40">
            {['SoundMax', 'SpeedRun', 'TechWear', 'TypeMaster', 'GameEdge', 'ErgoLux'].map((brand) => (
              <span key={brand} className="text-xl font-bold text-gray-700">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <div id="products">
        <ProductCatalog products={products} onAddToCart={onAddToCart} />
      </div>

      {/* Why choose us */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs text-[#FF6B00] font-semibold uppercase tracking-widest">Why ShopNest</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Built for Modern Commerce</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We combine enterprise-grade technology with consumer-friendly design to deliver the best shopping experience.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Secure Payments', desc: 'Bank-level encryption on all transactions.' },
              { icon: BarChart2, title: 'Live Tracking', desc: 'Real-time order status updates at every step.' },
              { icon: Headphones, title: '24/7 Support', desc: 'Expert customer service around the clock.' },
              { icon: Award, title: 'Quality Guaranteed', desc: '30-day hassle-free returns on all products.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-[12px] border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-200 group">
                <div className="w-12 h-12 bg-orange-50 group-hover:bg-[#FF6B00] rounded-[12px] flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Icon size={22} className="text-[#FF6B00] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#F5F7FA] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs text-[#FF6B00] font-semibold uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-6">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#0B1F3A] py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="text-3xl font-bold">Ready to Start Shopping?</h2>
            <p className="text-blue-300 mt-2">Join 200,000+ customers who trust ShopNest for their purchases.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={scrollToProducts}
              className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E65F00] text-white font-semibold px-7 py-3.5 rounded-[10px] transition-all duration-200 hover:shadow-lg"
            >
              Shop Now <ArrowRight size={18} />
            </button>
            <button className="border border-white/20 hover:border-white/40 text-white font-semibold px-7 py-3.5 rounded-[10px] transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#060F1A] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#FF6B00] rounded-[8px] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-white font-bold text-lg">ShopNest</span>
              </div>
              <p className="text-xs leading-relaxed">Premium e-commerce solutions for modern businesses.</p>
            </div>
            {[
              { title: 'Products', links: ['Electronics', 'Footwear', 'Bags', 'Accessories'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Returns', 'Track Order'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="text-white text-sm font-semibold mb-3">{title}</h4>
                <ul className="space-y-2">
                  {links.map((l) => <li key={l}><a href="#" className="text-xs hover:text-[#FF6B00] transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs">© 2024 ShopNest. All rights reserved.</p>
            <div className="flex gap-4 text-xs">
              <a href="#" className="hover:text-[#FF6B00] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#FF6B00] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#FF6B00] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
