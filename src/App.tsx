import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Heart,
  Clock,
  Users,
  ChefHat,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  LogOut,
  Filter,
  Grid,
  List,
  Star,
  Sparkles,
  Zap,
  Award
} from 'lucide-react';
import { Product, CartItem, Recipe, User as UserType, Order } from './types';
import { LoginModal } from './components/LoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CartSidebar } from './components/CartSidebar';
import { CheckoutModal } from './components/CheckoutModal';
import { Enhanced3DProductCard } from './components/Enhanced3DProductCard';
import { SearchBar } from './components/SearchBar';
import { ParticleBackground } from './components/ParticleBackground';
import { ScrollReveal } from './components/ScrollReveal';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [isLoading, setIsLoading] = useState(true);
  const [showParticles, setShowParticles] = useState(true);

  // Demo users
  const demoUsers: UserType[] = [
    { id: 1, email: 'admin@bakery.com', name: 'Admin User', isAdmin: true },
    { id: 2, email: 'user@example.com', name: 'Regular User', isAdmin: false }
  ];

  // Initialize products with stock and sold data
  useEffect(() => {
    const initialProducts: Product[] = [
      { id: 1, name: "Artisan Sourdough Bread", price: 8.99, image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg", category: "bread", rating: 5, description: "Fresh daily sourdough with crispy crust and perfect texture", stock: 25, sold: 145 },
      { id: 2, name: "Chocolate Croissant", price: 3.99, image: "https://images.pexels.com/photos/2135677/pexels-photo-2135677.jpeg", category: "pastries", rating: 5, description: "Buttery pastry with rich chocolate filling", stock: 30, sold: 267 },
      { id: 3, name: "Red Velvet Cupcake", price: 4.99, image: "https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg", category: "cupcakes", rating: 4, description: "Moist red velvet with cream cheese frosting", stock: 0, sold: 134 },
      { id: 4, name: "Apple Cinnamon Danish", price: 5.99, image: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg", category: "pastries", rating: 5, description: "Flaky pastry with spiced apple filling", stock: 3, sold: 128 },
      { id: 5, name: "Classic Birthday Cake", price: 45.99, image: "https://images.pexels.com/photos/1070853/pexels-photo-1070853.jpeg", category: "cakes", rating: 5, description: "Vanilla sponge with buttercream, serves 8-10", stock: 5, sold: 42 },
      { id: 6, name: "Blueberry Muffin", price: 2.99, image: "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg", category: "muffins", rating: 4, description: "Fresh blueberries in tender muffin", stock: 40, sold: 289 },
      { id: 7, name: "Chocolate Chip Cookies", price: 1.99, image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg", category: "cookies", rating: 5, description: "Classic cookies with premium chocolate chips", stock: 50, sold: 356 },
      { id: 8, name: "French Baguette", price: 4.99, image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg", category: "bread", rating: 5, description: "Traditional French baguette with crispy crust", stock: 20, sold: 98 },
      { id: 9, name: "Strawberry Cheesecake", price: 6.99, image: "https://images.pexels.com/photos/1070853/pexels-photo-1070853.jpeg", category: "cakes", rating: 5, description: "Creamy cheesecake with fresh strawberries", stock: 8, sold: 76 },
      { id: 10, name: "Almond Croissant", price: 4.49, image: "https://images.pexels.com/photos/2135677/pexels-photo-2135677.jpeg", category: "pastries", rating: 4, description: "Buttery croissant filled with almond cream", stock: 15, sold: 89 }
    ];
    setProducts(initialProducts);

    // Demo orders
    const demoOrders: Order[] = [
      {
        id: 1,
        userId: 2,
        items: [
          { ...initialProducts[0], quantity: 2 },
          { ...initialProducts[1], quantity: 3 }
        ],
        total: 29.95,
        status: 'completed',
        date: '2024-01-15',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerPhone: '+1234567890',
        customerAddress: '123 Main St, City',
        estimatedTime: '25-30 mins'
      },
      {
        id: 2,
        userId: 2,
        items: [
          { ...initialProducts[4], quantity: 1 }
        ],
        total: 45.99,
        status: 'processing',
        date: '2024-01-16',
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        customerPhone: '+1234567891',
        customerAddress: '456 Oak Ave, City',
        estimatedTime: '30-35 mins'
      },
      {
        id: 3,
        userId: 2,
        items: [
          { ...initialProducts[2], quantity: 6 },
          { ...initialProducts[5], quantity: 4 }
        ],
        total: 41.90,
        status: 'pending',
        date: '2024-01-17',
        customerName: 'Mike Johnson',
        customerEmail: 'mike@example.com',
        customerPhone: '+1234567892',
        customerAddress: '789 Pine St, City',
        estimatedTime: '20-25 mins'
      }
    ];
    setOrders(demoOrders);
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const recipes: Recipe[] = [
    { id: 1, title: "Perfect Chocolate Chip Cookies", image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg", prepTime: "25 min", difficulty: "Easy", excerpt: "Learn the secret to perfectly chewy cookies every time..." },
    { id: 2, title: "Homemade Pizza Dough", image: "https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg", prepTime: "2 hours", difficulty: "Medium", excerpt: "Master the art of pizza dough with this foolproof recipe..." },
    { id: 3, title: "Fluffy Pancakes from Scratch", image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg", prepTime: "15 min", difficulty: "Easy", excerpt: "Start your morning right with these incredibly fluffy pancakes..." }
  ];

  const handleLogin = (email: string, password: string) => {
    // Demo authentication
    const user = demoUsers.find(u => u.email === email);
    if (user && ((email === 'admin@bakery.com' && password === 'admin123') || 
                 (email === 'user@example.com' && password === 'user123'))) {
      setCurrentUser(user);
      if (user.isAdmin) {
        setCurrentPage('admin');
      }
    } else {
      alert('Invalid credentials. Use demo accounts:\nAdmin: admin@bakery.com / admin123\nUser: user@example.com / user123');
    }
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // In a real app, this would create a new user account
    const newUser: UserType = {
      id: demoUsers.length + 1,
      email,
      name,
      isAdmin: false
    };
    setCurrentUser(newUser);
    alert('Account created successfully!');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    setCart([]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = Math.max(...products.map(p => p.id)) + 1;
    setProducts([...products, { ...newProduct, id }]);
  };

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      alert('Sorry, this item is out of stock!');
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        alert('Cannot add more items. Stock limit reached!');
        return;
      }
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Auto-open cart sidebar for better UX
    setShowCartSidebar(true);
    setTimeout(() => setShowCartSidebar(false), 2000);
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      const product = products.find(p => p.id === id);
      if (product && quantity > product.stock) {
        alert('Cannot add more items. Stock limit reached!');
        return;
      }
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handlePlaceOrder = (orderData: any) => {
    // Update product stock
    const updatedProducts = products.map(product => {
      const cartItem = cart.find(item => item.id === product.id);
      if (cartItem) {
        return {
          ...product,
          stock: Math.max(0, product.stock - cartItem.quantity),
          sold: product.sold + cartItem.quantity
        };
      }
      return product;
    });
    setProducts(updatedProducts);

    const newOrder: Order = {
      id: orders.length + 1,
      userId: currentUser?.id || 0,
      ...orderData
    };
    
    setOrders([...orders, newOrder]);
    setCart([]);
    setShowCheckoutModal(false);
    alert('Order placed successfully! You will receive a confirmation shortly.');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('products');
  };

  const handleProductSelect = (product: Product) => {
    setCurrentPage('products');
    // Could scroll to product or show product details
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const Header = () => (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 relative">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="relative">
              <ChefHat className="h-10 w-10 text-amber-600 transform group-hover:rotate-12 transition-transform duration-300" />
              <Sparkles className="h-4 w-4 text-amber-400 absolute -top-1 -right-1 animate-ping" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              Golden Crust Bakery
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {(currentUser?.isAdmin 
              ? ['home', 'products', 'recipes', 'about', 'contact', 'admin'] 
              : ['home', 'products', 'recipes', 'about', 'contact']
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  currentPage === page
                    ? 'text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg'
                    : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50 hover:shadow-md'
                }`}
              >
                {page}
              </button>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block">
              <SearchBar 
                products={products}
                onProductSelect={handleProductSelect}
                onSearch={handleSearch}
              />
            </div>
            
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 hidden sm:block font-medium">
                  Welcome, {currentUser.name}
                  {currentUser.isAdmin && <span className="text-amber-600 font-bold"> (Admin)</span>}
                </span>
                <button 
                  onClick={handleLogout}
                  className="p-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 transform hover:scale-110"
                  title="Logout"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="p-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 transform hover:scale-110"
              >
                <User className="h-6 w-6" />
              </button>
            )}
            
            <button 
              onClick={() => setShowCartSidebar(true)}
              className="relative p-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 transform hover:scale-110"
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center animate-bounce shadow-lg">
                  {getTotalItems()}
                </span>
              )}
              {getTotalItems() > 0 && (
                <div className="absolute inset-0 rounded-xl bg-amber-400 opacity-20 animate-ping" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 transform rotate-90 transition-transform" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur-md">
            <nav className="py-4 space-y-2">
              {(currentUser?.isAdmin 
                ? ['home', 'products', 'recipes', 'about', 'contact', 'admin'] 
                : ['home', 'products', 'recipes', 'about', 'contact']
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 capitalize text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 font-medium"
                >
                  {page}
                </button>
              ))}
              {!currentUser && (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 font-medium"
                >
                  Login
                </button>
              )}
              {currentUser && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 font-medium"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  const HomePage = () => (
    <div className="space-y-20 relative">
      {showParticles && <ParticleBackground />}
      
      {/* Hero Section */}
      <section className="relative morphing-bg py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-6">
              <ScrollReveal direction="left">
                <h1 className="text-6xl font-bold text-gray-900 leading-tight text-3d">
                Fresh Baked
                  <span className="text-amber-600 block neon-glow">Daily Delights</span>
              </h1>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={200}>
                <p className="text-xl text-gray-700 leading-relaxed">
                From artisan breads to decadent desserts, we craft each item with love and the finest ingredients.
              </p>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={400}>
                <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => setCurrentPage('products')}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-10 py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-bold text-lg btn-3d transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                    <Zap className="h-5 w-5" />
                    <span>Shop Now</span>
                  Shop Now
                </button>
                <button 
                  onClick={() => setCurrentPage('recipes')}
                    className="border-2 border-amber-600 text-amber-600 px-10 py-4 rounded-xl hover:bg-amber-600 hover:text-white transition-all duration-300 font-bold text-lg transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                    <Award className="h-5 w-5" />
                    <span>View Recipes</span>
                  View Recipes
                </button>
              </div>
              </ScrollReveal>
            </div>
            
            <ScrollReveal direction="right" delay={300}>
              <div className="relative float-animation">
              <img 
                src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg" 
                alt="Fresh baked bread" 
                  className="rounded-3xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500 card-3d"
              />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-amber-500/20 to-transparent" />
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 text-3d">Today's Favorites</h2>
            <p className="text-xl text-gray-600">Fresh from our ovens to your table</p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-4 rounded-full" />
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 gap-10">
          {products.slice(0, 3).map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 200}>
              <Enhanced3DProductCard
                product={product}
                onAddToCart={addToCart}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(product.id)}
                index={index}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-amber-400 rounded-full animate-bounce" />
          <div className="absolute top-32 right-20 w-16 h-16 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-32 w-12 h-12 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
              <img 
                src="https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg" 
                alt="Baking process" 
                  className="rounded-3xl shadow-2xl w-full h-96 object-cover card-3d transform hover:scale-105 transition-transform duration-500"
              />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-amber-600/20 to-transparent" />
            </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={200}>
              <div className="space-y-8">
                <h2 className="text-5xl font-bold text-gray-900 text-3d">Crafted with Passion</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                For over 20 years, we've been dedicated to bringing you the finest baked goods. 
                Every loaf, pastry, and cake is made with traditional techniques and premium ingredients.
              </p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center transform hover:scale-110 transition-transform duration-300">
                    <div className="bg-white p-4 rounded-2xl shadow-lg mb-3">
                      <Clock className="h-8 w-8 text-amber-600 mx-auto" />
                    </div>
                    <p className="font-bold text-gray-800">Fresh Daily</p>
                </div>
                  <div className="text-center transform hover:scale-110 transition-transform duration-300">
                    <div className="bg-white p-4 rounded-2xl shadow-lg mb-3">
                      <Users className="h-8 w-8 text-amber-600 mx-auto" />
                    </div>
                    <p className="font-bold text-gray-800">Family Recipe</p>
                </div>
                  <div className="text-center transform hover:scale-110 transition-transform duration-300">
                    <div className="bg-white p-4 rounded-2xl shadow-lg mb-3">
                      <Heart className="h-8 w-8 text-amber-600 mx-auto" />
                    </div>
                    <p className="font-bold text-gray-800">Made with Love</p>
                </div>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );

  const ProductsPage = () => {
    const categories = ['all', 'bread', 'pastries', 'cupcakes', 'cakes', 'muffins', 'cookies'];
    
    let filteredProducts = selectedCategory === 'all' 
      ? products 
      : products.filter(product => product.category === selectedCategory);

    // Apply search filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filteredProducts = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return b.sold - a.sold;
      }
    });

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600">Discover our full range of freshly baked goods</p>
          {searchQuery && (
            <p className="text-amber-600 mt-2">Showing results for "{searchQuery}"</p>
          )}
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full capitalize transition-colors text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                }`}
              >
                {category} {category !== 'all' && `(${products.filter(p => p.category === category).length})`}
              </button>
            ))}
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product, index) => (
            <Enhanced3DProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(product.id)}
              index={index}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? `No products match "${searchQuery}". Try a different search term.`
                : 'No products in this category yet.'
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    );
  };

  const RecipesPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Baking Recipes</h1>
        <p className="text-xl text-gray-600">Learn to bake like a pro with our tried-and-tested recipes</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <article key={recipe.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{recipe.title}</h3>
              <div className="flex items-center space-x-4 mb-3">
                <span className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {recipe.prepTime}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {recipe.difficulty}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{recipe.excerpt}</p>
              <button className="text-amber-600 hover:text-amber-700 font-semibold">
                Read Recipe →
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <section className="bg-amber-50 rounded-2xl p-8 mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Weekly Recipes</h2>
        <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest recipes and baking tips</p>
        <div className="flex max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <button className="bg-amber-600 text-white px-6 py-3 rounded-r-lg hover:bg-amber-700 transition-colors">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );

  const AboutPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Golden Crust Bakery</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A family tradition of excellence in baking, serving our community for over two decades
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 mb-16">
        <div>
          <img 
            src="https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg" 
            alt="Our bakery" 
            className="rounded-2xl shadow-lg w-full h-96 object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
          <p className="text-gray-700">
            Golden Crust Bakery began in 1995 as a small family business with a simple mission: 
            to bring the warmth and comfort of freshly baked goods to our community. What started 
            as a humble neighborhood bakery has grown into a beloved local institution.
          </p>
          <p className="text-gray-700">
            We still use many of the same traditional recipes passed down through generations, 
            combined with modern techniques and the finest ingredients sourced locally whenever possible.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">25+</div>
              <div className="text-gray-600">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">50+</div>
              <div className="text-gray-600">Products Daily</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <section className="bg-gray-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Johnson", role: "Head Baker", image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" },
            { name: "Mike Chen", role: "Pastry Chef", image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" },
            { name: "Emily Davis", role: "Cake Designer", image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-amber-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const ContactPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">We'd love to hear from you</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-amber-600" />
                <span className="text-gray-700">123 Baker Street, Sweet City, SC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-600" />
                <span className="text-gray-700">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-600" />
                <span className="text-gray-700">hello@goldencrustbakery.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Monday - Friday</span>
                <span className="text-gray-700">6:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Saturday</span>
                <span className="text-gray-700">6:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Sunday</span>
                <span className="text-gray-700">7:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-amber-600 hover:text-amber-700 cursor-pointer" />
              <Instagram className="h-6 w-6 text-amber-600 hover:text-amber-700 cursor-pointer" />
              <Twitter className="h-6 w-6 text-amber-600 hover:text-amber-700 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              ></textarea>
            </div>
            <button className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-amber-400" />
              <span className="text-xl font-bold">Golden Crust Bakery</span>
            </div>
            <p className="text-gray-400">
              Fresh baked goods made with love and tradition since 1995.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Products', 'Recipes', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => setCurrentPage(link.toLowerCase())}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Breads', 'Pastries', 'Cakes', 'Cupcakes', 'Muffins'].map((category) => (
                <li key={category}>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>123 Baker Street</p>
              <p>Sweet City, SC 12345</p>
              <p>(555) 123-4567</p>
              <p>hello@goldencrustbakery.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2024 Golden Crust Bakery. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
            <button className="text-gray-400 hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'recipes':
        return <RecipesPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return currentUser?.isAdmin ? (
          <AdminDashboard 
            products={products}
            orders={orders}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onAddProduct={handleAddProduct}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
            <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" message="Preparing your delicious experience..." />
        </div>
      ) : (
        <>
      <Header />
      <main>
        {renderPage()}
      </main>
      <Footer />
      
      {/* WhatsApp Button */}
          <WhatsAppButton phoneNumber="1234567891" />
        </>
      )}
      
      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={showCartSidebar}
        onClose={() => setShowCartSidebar(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setShowCartSidebar(false);
          if (!currentUser) {
            setShowLoginModal(true);
          } else {
            setShowCheckoutModal(true);
          }
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        cart={cart}
        user={currentUser}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}

export default App;