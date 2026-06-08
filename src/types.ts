export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  brand: string;
  description: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  customerEmail: string;
  date: string;
  products: { name: string; qty: number; price: number }[];
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  shippingAddress: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  joinDate: string;
  avatar: string;
}

export type AppModule = 'storefront' | 'checkout' | 'tracking' | 'admin';
export type AdminPage = 'dashboard' | 'products' | 'orders' | 'customers' | 'reports' | 'settings';
