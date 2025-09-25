import React, { useState } from 'react';
import { Star, Plus, Heart, Clock, Users, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite?: (productId: number) => void;
  isFavorite?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onToggleFavorite,
  isFavorite = false 
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setShowAddedAnimation(true);
    setTimeout(() => setShowAddedAnimation(false), 1000);
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock <= 5 && product.stock > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
      {/* Favorite Button */}
      {onToggleFavorite && (
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'
            }`} 
          />
        </button>
      )}

      {/* Stock Status Badge */}
      {isOutOfStock && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Out of Stock
        </div>
      )}
      {isLowStock && (
        <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Only {product.stock} left
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <div className={`w-full h-64 bg-gray-200 ${!isImageLoaded ? 'animate-pulse' : ''}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full h-64 object-cover transition-all duration-500 ${
              isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } hover:scale-110`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`transform transition-transform duration-300 ${
              isOutOfStock 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-amber-600 hover:bg-amber-700'
            } text-white p-3 rounded-full shadow-lg`}
          >
            <ShoppingCart className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full capitalize font-medium">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.sold} sold)</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Stats */}
        <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Fresh daily</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{product.sold} happy customers</span>
          </div>
        </div>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-amber-600">${product.price}</span>
            {product.stock <= 10 && product.stock > 0 && (
              <p className="text-xs text-orange-600 font-medium">Only {product.stock} left!</p>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`relative px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : showAddedAnimation
                ? 'bg-green-500 text-white'
                : 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {showAddedAnimation ? (
              <span className="flex items-center space-x-1">
                <span>✓</span>
                <span>Added!</span>
              </span>
            ) : isOutOfStock ? (
              'Out of Stock'
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};