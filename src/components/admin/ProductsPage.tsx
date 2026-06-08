import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Package, MoreVertical, Eye } from 'lucide-react';
import { Product } from '../../types';
import { StarRating } from '../ui/StarRating';
import { Modal } from '../ui/Modal';

interface ProductsPageProps {
  products: Product[];
}

export function ProductsPage({ products: initialProducts }: ProductsPageProps) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Electronics', price: '', stock: '' });

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price) return;
    const product: Product = {
      id: `p${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock) || 0,
      rating: 0,
      reviewCount: 0,
      image: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=600',
      brand: 'ShopNest',
      description: 'New product added via admin panel.',
      tags: [],
    };
    setProducts([product, ...products]);
    setNewProduct({ name: '', category: 'Electronics', price: '', stock: '' });
    setAddOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-[10px] px-3 py-2.5 w-full sm:w-72 focus-within:border-orange-400 transition-colors">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="bg-transparent text-sm outline-none flex-1 text-gray-700"
          />
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E65F00] text-white text-sm font-semibold px-4 py-2.5 rounded-[10px] transition-colors shrink-0"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Products', value: products.length, color: 'text-[#FF6B00]' },
          { label: 'In Stock', value: products.filter((p) => p.stock > 0).length, color: 'text-green-600' },
          { label: 'Low Stock', value: products.filter((p) => p.stock > 0 && p.stock <= 10).length, color: 'text-amber-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-[12px] border border-gray-100 shadow-sm p-4 text-center">
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Rating</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-11 h-11 rounded-[8px] object-cover bg-gray-100 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="bg-orange-50 text-[#FF6B00] text-xs font-semibold px-2.5 py-1 rounded-full">{product.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-bold text-gray-900">${product.price}</div>
                    {product.originalPrice && (
                      <div className="text-xs text-gray-400 line-through">${product.originalPrice}</div>
                    )}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <StarRating rating={product.rating || 0} reviewCount={product.reviewCount} />
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      product.stock > 10 ? 'bg-green-50 text-green-700' :
                      product.stock > 0 ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditProduct(product)}
                        className="p-1.5 rounded-[8px] text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="p-1.5 rounded-[8px] text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Package size={40} className="mx-auto mb-3 opacity-30" />
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add New Product">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product Name *</label>
            <input
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="e.g. Wireless Earbuds Pro"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="input-field"
            >
              {['Electronics', 'Footwear', 'Bags', 'Accessories', 'Furniture'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Price ($) *</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                placeholder="99.99"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Stock Units</label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                placeholder="100"
                className="input-field"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setAddOpen(false)} className="flex-1 btn-secondary">Cancel</button>
            <button onClick={handleAdd} className="flex-1 bg-[#FF6B00] hover:bg-[#E65F00] text-white font-semibold py-3 rounded-[10px] transition-colors">
              Add Product
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <div className="text-center">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 size={24} className="text-red-500" />
          </div>
          <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteId(null)} className="flex-1 btn-secondary">Cancel</button>
            <button onClick={() => deleteId && handleDelete(deleteId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-[10px] transition-colors">
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editProduct} onClose={() => setEditProduct(null)} title="Edit Product">
        {editProduct && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <img src={editProduct.image} alt={editProduct.name} className="w-16 h-16 rounded-[10px] object-cover" />
              <div>
                <div className="font-semibold text-gray-900">{editProduct.name}</div>
                <div className="text-sm text-gray-500">{editProduct.category}</div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product Name</label>
              <input
                value={editProduct.name}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Price ($)</label>
                <input
                  type="number"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Stock</label>
                <input
                  type="number"
                  value={editProduct.stock}
                  onChange={(e) => setEditProduct({ ...editProduct, stock: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditProduct(null)} className="flex-1 btn-secondary">Cancel</button>
              <button
                onClick={() => {
                  setProducts(products.map((p) => p.id === editProduct.id ? editProduct : p));
                  setEditProduct(null);
                }}
                className="flex-1 bg-[#FF6B00] hover:bg-[#E65F00] text-white font-semibold py-3 rounded-[10px] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
