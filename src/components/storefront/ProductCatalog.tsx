import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, Grid, List, ChevronDown } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Modal } from '../ui/Modal';
import { StarRating } from '../ui/StarRating';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const categories = ['All', 'Electronics', 'Footwear', 'Bags', 'Accessories', 'Furniture'];
const brands = ['All', 'SoundMax', 'SpeedRun', 'CarryPro', 'TechWear', 'TypeMaster', 'GameEdge', 'ErgoLux', 'DeskPro'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Highest Rated', 'Most Reviews'];

export function ProductCatalog({ products, onAddToCart }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceMax, setPriceMax] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedBrand !== 'All' && p.brand !== selectedBrand) return false;
      if (p.price > priceMax) return false;
      if (p.rating < minRating) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    if (sortBy === 'Price: Low to High') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === 'Highest Rated') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'Most Reviews') list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);

    return list;
  }, [products, selectedCategory, selectedBrand, priceMax, minRating, searchQuery, sortBy]);

  return (
    <section className="py-16 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Product Catalog</h2>
            <p className="text-gray-500 mt-1">{filtered.length} products available</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-[10px] px-3 py-2.5 w-64 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
              />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-[10px] px-4 py-2.5 pr-8 text-sm text-gray-700 outline-none cursor-pointer focus:border-orange-400"
              >
                {sortOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-orange-400 rounded-[10px] px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#FF6B00] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-[#FF6B00]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Filter sidebar */}
          {filterOpen && (
            <aside className="w-64 shrink-0 space-y-6">
              <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Brand</h4>
                <div className="space-y-2">
                  {brands.map((b) => (
                    <label key={b} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="brand"
                        checked={selectedBrand === b}
                        onChange={() => setSelectedBrand(b)}
                        className="accent-[#FF6B00]"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Max Price: <span className="text-[#FF6B00]">${priceMax}</span></h4>
                <input
                  type="range"
                  min={50}
                  max={1000}
                  step={10}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#FF6B00]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$50</span><span>$1000</span>
                </div>
              </div>

              <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-5">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Min Rating</h4>
                <div className="space-y-2">
                  {[0, 3, 4, 4.5].map((r) => (
                    <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === r}
                        onChange={() => setMinRating(r)}
                        className="accent-[#FF6B00]"
                      />
                      <span className="text-sm text-gray-600">{r === 0 ? 'All Ratings' : `${r}+ Stars`}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Grid size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className={`grid gap-5 ${filterOpen ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <Modal
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        title="Quick View"
        maxWidth="max-w-2xl"
      >
        {quickViewProduct && (
          <div className="grid grid-cols-2 gap-6">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-56 object-cover rounded-[12px] bg-gray-50"
            />
            <div className="space-y-4">
              <div>
                <span className="text-xs text-[#FF6B00] font-semibold bg-orange-50 px-2 py-0.5 rounded-full">
                  {quickViewProduct.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2">{quickViewProduct.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{quickViewProduct.brand}</p>
              </div>
              <StarRating rating={quickViewProduct.rating} reviewCount={quickViewProduct.reviewCount} size="md" />
              <p className="text-sm text-gray-600 leading-relaxed">{quickViewProduct.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">${quickViewProduct.price}</span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">${quickViewProduct.originalPrice}</span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {quickViewProduct.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <button
                onClick={() => { onAddToCart(quickViewProduct); setQuickViewProduct(null); }}
                className="w-full bg-[#FF6B00] hover:bg-[#E65F00] text-white font-semibold py-3 rounded-[10px] transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
