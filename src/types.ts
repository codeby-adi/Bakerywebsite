export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  stock: number;
  sold: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  prepTime: string;
  difficulty: string;
  excerpt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
  phone?: string;
  address?: string;
  favoriteProducts?: number[];
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  orderNotes?: string;
  estimatedTime: string;
}