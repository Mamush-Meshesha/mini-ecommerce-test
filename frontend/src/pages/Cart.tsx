import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import type { RootState } from '../store';
import { Button, Card } from '../components/ui';
import { useAuth } from '../hooks/useAuth';
import { removeFromCartRequest, updateCartItemRequest, clearCartRequest, fetchCartItemsRequest } from '../store/slices/cartSlice';
import { createOrderRequest } from '../store/slices/ordersSlice';
import type { CartItem } from '../types';

export const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items } = useSelector((state: RootState) => state.cart);
  const { isLoading: isOrderLoading } = useSelector((state: RootState) => state.orders);
  const total = items?.reduce((sum: number, item: CartItem) => sum + (item.product.price * item.quantity), 0) || 0;
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsRequest());
    }
  }, [dispatch, user]);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCartRequest(itemId));
    } else {
      dispatch(updateCartItemRequest({ id: itemId, quantity: newQuantity }));
    }
  };

  const removeItem = (itemId: string) => {
    dispatch(removeFromCartRequest(itemId));
  };

  const handlePlaceOrder = async () => {
    if (!user || items.length === 0) return;

    setIsPlacingOrder(true);
    
    try {
      // Create order using backend API
      const orderData = {
        items: items.map((item: CartItem) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        shippingAddress: {
          street: '123 Main St', // In a real app, this would come from user input
          city: 'Anytown',
          state: 'ST',
          zipCode: '12345',
          country: 'US'
        }
      };

      dispatch(createOrderRequest(orderData));
      
      // Clear cart after successful order
      dispatch(clearCartRequest());
      
      // Show success message and redirect
      setTimeout(() => {
        alert('Order placed successfully!');
        navigate('/orders');
      }, 1000);
      
    } catch (error: any) {
      console.error('Order placement failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your cart.</p>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Button>

        <div className="text-center py-16">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Button onClick={() => navigate('/')}>
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="outline"
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Continue Shopping
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
          
          <div className="space-y-4">
            {items.map((item: CartItem) => (
              <Card key={item.product.id} className="p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBWMTMwTTcwIDEwMEgxMzAiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.product.category?.name}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                       {Number(item.product?.price ?? 0).toFixed(2)} Birr
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-medium px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {item.quantity} × {Number(item.product?.price ?? 0).toFixed(2)} Birr
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {(item.quantity * Number(item.product?.price ?? 0)).toFixed(2)} Birr
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{total.toFixed(2)} Birr</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{(total * 0.1).toFixed(2)} Birr</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    {(total * 1.1).toFixed(2)} Birr
                  </span>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-6 bg-primary-600 hover:bg-primary-700"
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder || isOrderLoading || items.length === 0}
            >
              {(isPlacingOrder || isOrderLoading) ? 'Placing Order...' : 'Place Order'}
            </Button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              * No payment required for demo. Order will be confirmed automatically.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
