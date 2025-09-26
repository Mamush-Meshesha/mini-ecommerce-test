import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Package, Star, ShoppingCart, Tag, Users, TrendingUp, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import type { RootState } from '../store';
import { Button, Card } from '../components/ui';
import { useAuth } from '../hooks/useAuth';
import { fetchProductsRequest, fetchCategoriesRequest } from '../store/slices/productsSlice';
import { addToCartRequest } from '../store/slices/cartSlice';
import type { Product } from '../types';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAdmin, isSuperAdmin } = useAuth();
  const { products, isLoading, categories } = useSelector((state: RootState) => state.products as any);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    dispatch(fetchProductsRequest({}));
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const handleAddToCart = (productId: string) => {
    if (user) {
      dispatch(addToCartRequest({ productId, quantity: 1 }));
    }
  };

  // Show loading state while fetching products
  if (isLoading && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  const featuredProducts = products.slice(0, 3);
  const allProducts = products;
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const currentProducts = allProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const stats = [
    {
      name: 'Total Products',
      value: '2,345',
      icon: Package,
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Active Users',
      value: '1,234',
      icon: Users,
      change: '+8%',
      changeType: 'increase',
    },
    {
      name: 'Sales',
      value: '45,678',
      icon: TrendingUp,
      change: '+23%',
      changeType: 'increase',
    },
    {
      name: 'Orders',
      value: '567',
      icon: ShoppingBag,
      change: '+15%',
      changeType: 'increase',
    },
  ];

  // Admin Dashboard View
  if (isAdmin() || isSuperAdmin()) {
    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name} className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-secondary-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-secondary-900">
                          {stat.value}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-success-600">
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Orders */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-secondary-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((order) => (
              <div key={order} className="flex items-center justify-between py-3 border-b border-secondary-200 last:border-b-0">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">Order #{order}001</p>
                    <p className="text-sm text-secondary-500">Customer Name</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-secondary-900"> 99.99</p>
                  <p className="text-sm text-secondary-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  // User Homepage View
  return (
    <div className="space-y-8">
      {/* Featured Products Slider */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProducts.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBWMTMwTTcwIDEwMEgxMzAiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
                        }}
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                      <p className="text-gray-600">{product.description}</p>
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl font-bold text-primary-600"> {Number(product?.price ?? 0).toFixed(2)} Birr</span>
                        {product.category && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                            <Tag className="w-4 h-4 mr-1" />
                            {product.category.name}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${
                                i < 4 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">(4.5)</span>
                        <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                      </div>
                      <Button 
                        size="lg" 
                        className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400"
                        disabled={product.stock === 0 || !user}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        {product.stock === 0 ? 'Out of Stock' : user ? 'Add to Cart' : 'Login to Buy'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slider Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              disabled={featuredProducts.length <= 1}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex space-x-2">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              disabled={featuredProducts.length <= 1}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>


      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.length > 0 ? categories.map((category, index) => {
            const icons = ['📱', '👕', '🏠', '⚽', '📚', '💄'];
            const colors = [
              'bg-blue-100 text-blue-600',
              'bg-pink-100 text-pink-600', 
              'bg-green-100 text-green-600',
              'bg-orange-100 text-orange-600',
              'bg-purple-100 text-purple-600',
              'bg-red-100 text-red-600'
            ];
            return (
              <Card key={category.id} className="p-4 text-center hover:shadow-sm transition-all cursor-pointer group">
                <div className={`w-16 h-16 ${colors[index % colors.length]} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{icons[index % icons.length]}</span>
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
              </Card>
            );
          }) : [
            { name: 'Electronics', icon: '📱', color: 'bg-blue-100 text-blue-600' },
            { name: 'Fashion', icon: '👕', color: 'bg-pink-100 text-pink-600' },
            { name: 'Home & Garden', icon: '🏠', color: 'bg-green-100 text-green-600' },
            { name: 'Sports', icon: '⚽', color: 'bg-orange-100 text-orange-600' },
            { name: 'Books', icon: '📚', color: 'bg-purple-100 text-purple-600' },
            { name: 'Beauty', icon: '💄', color: 'bg-red-100 text-red-600' }
          ].map((category) => (
            <Card key={category.name} className="p-4 text-center hover:shadow-sm transition-all cursor-pointer group">
              <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
            </Card>
          ))}
        </div>
      </div>

      {/* All Products with Pagination */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * productsPerPage) + 1}-{Math.min(currentPage * productsPerPage, allProducts.length)} of {allProducts.length} products
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentProducts.map((product: Product) => {
            const rating = 4.5;
            
            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all group border border-gray-200">
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBWMTMwTTcwIDEwMEgxMzAiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
                    }}
                  />
                  {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        Low Stock
                      </span>
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  
                  {/* Product Description */}
                  {product.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  )}
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(rating) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : i < rating 
                              ? 'fill-yellow-200 text-yellow-400'
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({rating})</span>
                  </div>
                  
                  {product.category && (
                    <div className="mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        <Tag className="w-3 h-3 mr-1" />
                        {product.category.name}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">{Number(product?.price ?? 0).toFixed(2)} Birr</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Stock: {product.stock}
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full bg-primary-600 hover:bg-primary-700"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
