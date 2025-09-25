import React, { useState } from 'react';
import { X, CreditCard, MapPin, Phone, User, MessageSquare, Clock } from 'lucide-react';
import { CartItem, User as UserType } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  user: UserType | null;
  onPlaceOrder: (orderData: any) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  user,
  onPlaceOrder
}) => {
  const [orderData, setOrderData] = useState({
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    customerPhone: user?.phone || '',
    customerAddress: user?.address || '',
    orderNotes: '',
    paymentMethod: 'card'
  });

  const [errors, setErrors] = useState<string[]>([]);

  if (!isOpen) return null;

  const getTotalPrice = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const getTax = () => getTotalPrice() * 0.08;
  const getFinalTotal = () => getTotalPrice() + getTax();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const newErrors: string[] = [];
    if (!orderData.customerName) newErrors.push('Name is required');
    if (!orderData.customerEmail) newErrors.push('Email is required');
    if (!orderData.customerPhone) newErrors.push('Phone number is required');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const order = {
      items: cart,
      total: getFinalTotal(),
      status: 'pending' as const,
      date: new Date().toISOString().split('T')[0],
      estimatedTime: '25-30 mins',
      ...orderData
    };

    onPlaceOrder(order);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              {errors.map((error, index) => (
                <p key={index} className="text-red-600 text-sm">{error}</p>
              ))}
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-amber-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${getTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>Total</span>
                  <span>${getFinalTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Time */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-green-700">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Estimated ready time: 25-30 minutes</span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Customer Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={orderData.customerName}
                  onChange={(e) => setOrderData({ ...orderData, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={orderData.customerPhone}
                  onChange={(e) => setOrderData({ ...orderData, customerPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your phone"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={orderData.customerEmail}
                onChange={(e) => setOrderData({ ...orderData, customerEmail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                Contact Address (Optional)
              </label>
              <textarea
                value={orderData.customerAddress}
                onChange={(e) => setOrderData({ ...orderData, customerAddress: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter your address for contact purposes (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="h-4 w-4 inline mr-1" />
                Special Instructions (Optional)
              </label>
              <textarea
                value={orderData.orderNotes}
                onChange={(e) => setOrderData({ ...orderData, orderNotes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Any special requests or notes..."
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={orderData.paymentMethod === 'card'}
                  onChange={(e) => setOrderData({ ...orderData, paymentMethod: e.target.value })}
                  className="text-amber-600"
                />
                <CreditCard className="h-5 w-5 text-gray-600" />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={orderData.paymentMethod === 'cash'}
                  onChange={(e) => setOrderData({ ...orderData, paymentMethod: e.target.value })}
                  className="text-amber-600"
                />
                <span className="w-5 h-5 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">$</span>
                <span>Cash on Pickup</span>
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold text-lg"
          >
            Place Order - ${getFinalTotal().toFixed(2)}
          </button>
        </form>
      </div>
    </div>
  );
};