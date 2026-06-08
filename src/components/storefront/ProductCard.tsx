import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { StarRating } from '../ui/StarRating';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    setAdding(true);
    onAddToCart(product);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
      {/* Image area */}
      <div className="relative overflow-hidden bg-gray-50 h-52">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="bg-[#FF6B00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
          {product.stock <= 10 && product.stock > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Low Stock
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-colors ${
              wishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => onQuickView(product)}
            className="w-8 h-8 rounded-full bg-white text-gray-600 hover:text-[#FF6B00] shadow-md flex items-center justify-center transition-colors"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#FF6B00] font-semibold bg-orange-50 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
          <span className="text-xs text-gray-400">{product.brand}</span>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-[#FF6B00] transition-colors">
          {product.name}
        </h3>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <span className={`text-xs font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-500'}`}>
            {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
          </span>
        </div>

        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-[10px] text-sm font-semibold transition-all duration-200 ${
            product.stock === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : adding
              ? 'bg-green-500 text-white scale-95'
              : 'bg-[#FF6B00] hover:bg-[#E65F00] text-white hover:shadow-md active:scale-95'
          }`}
        >
          <ShoppingCart size={15} />
          {adding ? 'Added!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
