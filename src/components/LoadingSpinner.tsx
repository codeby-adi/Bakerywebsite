import React from 'react';
import { ChefHat } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Loading delicious treats...' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className={`${sizeClasses[size]} border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin`} />
        
        {/* Inner chef hat icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ChefHat className="w-6 h-6 text-amber-600 animate-bounce" />
        </div>
      </div>
      
      {message && (
        <p className="text-gray-600 text-sm font-medium animate-pulse">{message}</p>
      )}
    </div>
  );
};