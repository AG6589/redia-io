import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { ArrowLeft, Star, ShoppingCart, Shield, Truck, RotateCcw } from 'lucide-react';

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 mt-8">
        <div className="bg-rose-50 text-rose-600 p-6 rounded-2xl text-center font-medium shadow-sm border border-rose-100">
          {error?.data?.message || error.error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium mb-8 transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Products
      </Link>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-12">
          {/* Image Section */}
          <div className="bg-slate-50 rounded-2xl flex items-center justify-center p-8 aspect-square relative">
            {product.price > 500 && (
              <div className="absolute top-6 left-6 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                Premium
              </div>
            )}
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
            <div className="text-sm font-bold text-indigo-500 tracking-widest uppercase mb-3">
              {product.brand}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.ratings) ? "fill-amber-400 text-amber-400" : "fill-amber-200 text-amber-200"} 
                  />
                ))}
                <span className="ml-2 text-amber-700 font-bold">{product.ratings}</span>
              </div>
              <span className="text-slate-500 font-medium underline cursor-pointer hover:text-indigo-600">
                {product.numReviews} Reviews
              </span>
            </div>

            <div className="text-4xl font-black text-slate-900 mb-6">
              ${product.price}
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Status</span>
                <span className={`font-bold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Out Of Stock'}
                </span>
              </div>

              {product.stock > 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Quantity</span>
                  <select 
                    value={qty} 
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 shadow-sm outline-none w-24 font-bold cursor-pointer"
                  >
                    {[...Array(product.stock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button 
              onClick={addToCartHandler}
              disabled={product.stock === 0}
              className="w-full bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-slate-900/20"
            >
              <ShoppingCart size={22} />
              Add to Cart
            </button>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-full"><Shield size={20} /></div>
                <span className="text-xs font-semibold text-slate-600">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-blue-100 text-blue-600 p-2.5 rounded-full"><Truck size={20} /></div>
                <span className="text-xs font-semibold text-slate-600">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-purple-100 text-purple-600 p-2.5 rounded-full"><RotateCcw size={20} /></div>
                <span className="text-xs font-semibold text-slate-600">30 Days Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
