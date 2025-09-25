import React, { useState } from 'react';
import { Star, Plus, Heart, Clock, Users, ShoppingCart, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface Enhanced3DProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite?: (productId: number) => void;
  isFavorite?: boolean;
  index?: number;
}

export const Enhanced3DProductCard: React.FC<Enhanced3DProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onToggleFavorite,
  isFavorite = false,
  index = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleAddToCart = () => {
    onAddToCart(product);
    setShowAddedAnimation(true);
    setTimeout(() => setShowAddedAnimation(false), 1500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock <= 5 && product.stock > 0;

  return (
    <div 
      className={`group relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 ${
        isHovered ? 'shadow-2xl' : ''
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        transform: isHovered 
          ? `perspective(1000px) rotateX(${(mousePosition.y - 150) / 20}deg) rotateY(${(mousePosition.x - 150) / 20}deg) translateZ(20px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Magical Sparkle Effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-amber-400 animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 200}ms`,
                fontSize: `${Math.random() * 10 + 10}px`
              }}
            />
          ))}
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-orange-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Favorite Button with 3D Effect */}
      {onToggleFavorite && (
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-12"
        >
          <Heart 
            className={`h-5 w-5 transition-all duration-300 ${
              isFavorite 
                ? 'text-red-500 fill-current scale-110' 
                : 'text-gray-400 hover:text-red-500 hover:scale-110'
            }`} 
          />
        </button>
      )}

      {/* Enhanced Stock Status Badge */}
      {isOutOfStock && (
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
          <span className="flex items-center space-x-1">
            <span>⚠️</span>
            <span>Out of Stock</span>
          </span>
        </div>
      )}
      {isLowStock && (
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg pulse-glow">
          <span className="flex items-center space-x-1">
            <span>🔥</span>
            <span>Only {product.stock} left!</span>
          </span>
        </div>
      )}

      {/* 3D Product Image with Enhanced Effects */}
      <div className="relative overflow-hidden h-72 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className={`w-full h-full transition-all duration-700 ${!isImageLoaded ? 'animate-pulse bg-gray-200' : ''}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            } group-hover:scale-110 group-hover:rotate-2`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        
        {/* Floating Add to Cart Button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isHovered ? 'opacity-100 backdrop-blur-sm bg-black/20' : 'opacity-0'
        }`}>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`transform transition-all duration-500 ${
              isHovered ? 'scale-100 translate-y-0' : 'scale-75 translate-y-4'
            } ${
              isOutOfStock 
                ? 'bg-gray-400 cursor-not-allowed' 
                : showAddedAnimation
                ? 'bg-green-500 scale-125'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 btn-3d'
            } text-white p-4 rounded-full shadow-2xl`}
          >
            {showAddedAnimation ? (
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✓</span>
              </div>
            ) : (
              <ShoppingCart className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Enhanced Product Info */}
      <div className="p-6 space-y-4">
        {/* Category & Rating with 3D Effects */}
        <div className="flex items-center justify-between">
          <span className="inline-block bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-xs px-3 py-2 rounded-full capitalize font-bold shadow-md transform hover:scale-105 transition-transform">
            {product.category}
          </span>
          <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full shadow-md">
            <Star className="h-4 w-4 text-yellow-400 fill-current animate-pulse" />
            <span className="text-sm text-gray-700 font-bold">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.sold} sold)</span>
          </div>
        </div>

        {/* 3D Product Name */}
        <h3 className="text-xl font-bold text-gray-900 text-3d group-hover:neon-glow transition-all duration-300">
          {product.name}
        </h3>
        
        {/* Enhanced Description */}
        <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

        {/* Animated Stats */}
        <div className="flex items-center space-x-6 text-xs text-gray-500">
          <div className="flex items-center space-x-1 transform hover:scale-110 transition-transform">
            <Clock className="h-3 w-3 text-green-500" />
            <span>Fresh daily</span>
          </div>
          <div className="flex items-center space-x-1 transform hover:scale-110 transition-transform">
            <Users className="h-3 w-3 text-blue-500" />
            <span>{product.sold} happy customers</span>
          </div>
        </div>

        {/* Enhanced Price & Add Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            {product.stock <= 10 && product.stock > 0 && (
              <p className="text-xs text-orange-600 font-bold animate-bounce">
                🔥 Only {product.stock} left!
              </p>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ripple ${
              isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : showAddedAnimation
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white scale-110'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 btn-3d shadow-lg'
            }`}
          >
            {showAddedAnimation ? (
              <span className="flex items-center space-x-2">
                <span className="text-xl">✓</span>
                <span>Added!</span>
              </span>
            ) : isOutOfStock ? (
              'Out of Stock'
            ) : (
              <span className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add to Cart</span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
};