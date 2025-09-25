import React, { useState, useEffect } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { Product } from '../types';

interface SearchBarProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ products, onProductSelect, onSearch }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      const newRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      onSearch(searchQuery);
      setQuery(searchQuery);
      setIsOpen(false);
    }
  };

  const handleProductSelect = (product: Product) => {
    onProductSelect(product);
    setQuery('');
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    setIsOpen(false);
  };

  const popularSearches = ['bread', 'chocolate', 'cake', 'croissant', 'muffin'];

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for delicious treats..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white shadow-sm"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 max-h-96 overflow-y-auto">
            {/* Search Results */}
            {filteredProducts.length > 0 && (
              <div className="p-2">
                <h3 className="text-sm font-medium text-gray-500 px-3 py-2">Products</h3>
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-amber-50 rounded-lg transition-colors text-left"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="capitalize">{product.category}</span>
                        <span>•</span>
                        <span>${product.price}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="p-2 border-t">
                <h3 className="text-sm font-medium text-gray-500 px-3 py-2 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Recent Searches
                </h3>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="w-full text-left px-3 py-2 hover:bg-amber-50 rounded-lg transition-colors text-gray-700"
                  >
                    {search}
                  </button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {!query && (
              <div className="p-2 border-t">
                <h3 className="text-sm font-medium text-gray-500 px-3 py-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2 px-3">
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm hover:bg-amber-200 transition-colors capitalize"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {query && filteredProducts.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No products found for "{query}"</p>
                <p className="text-sm">Try searching for bread, cakes, or pastries</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};