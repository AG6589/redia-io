import { useState } from 'react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Zap, ShieldCheck, Truck, Filter } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const HomePage = () => {
  const { keyword } = useParams();
  const [category, setCategory] = useState('');
  const { data, isLoading, error } = useGetProductsQuery({ 
    keyword: keyword || '', 
    category,
    pageNumber: 1 
  });

  const categories = ['Electronics', 'Cameras', 'Gaming'];

  return (
    <div className="pb-12">
      {!keyword && (
        <>
          {/* Hero Section */}
          <section className="relative bg-slate-900 text-white rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-slate-900/20 mx-4 lg:mx-0 mt-6">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-800/90 mix-blend-multiply z-10"></div>
            
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/30 blur-3xl z-0"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/30 blur-3xl z-0"></div>

            <div className="relative z-20 px-8 py-20 lg:py-24 lg:px-16 max-w-4xl">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
                NEW COLLECTION 2026
              </span>
              <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
                Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Tech</span> <br/> For Everyone.
              </h1>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl leading-relaxed">
                Discover the most premium electronics and gadgets. Handpicked quality products to elevate your lifestyle and boost your productivity to the next level.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#products" className="bg-white text-slate-900 hover:bg-indigo-50 px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-white/10 flex items-center gap-2 transform hover:-translate-y-1">
                  Shop Now <ArrowRight size={20} />
                </a>
                <a href="#products" className="bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-md border border-slate-600 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2">
                  View Offers
                </a>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mx-4 lg:mx-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-amber-100 text-amber-600 p-3 rounded-xl"><Zap size={24} /></div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Fast Delivery</h3>
                <p className="text-sm text-slate-500">Get your products delivered within 24 hours in select cities.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl"><ShieldCheck size={24} /></div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Secure Checkout</h3>
                <p className="text-sm text-slate-500">Your payment information is processed securely with top encryption.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl"><Truck size={24} /></div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Free Returns</h3>
                <p className="text-sm text-slate-500">Not satisfied? Return it within 30 days for a full refund.</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Products Section */}
      <div id="products" className="container mx-auto px-4 lg:px-0 mt-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar - Category Filter */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-28">
              <div className="flex items-center gap-2 mb-8 text-slate-900">
                <Filter size={20} className="text-indigo-600" />
                <h3 className="text-xl font-black tracking-tight">Categories</h3>
              </div>
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setCategory('')}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${category === '' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  All Products
                  {category === '' && <ArrowRight size={14} />}
                </button>
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${category === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    {cat}
                    {category === cat && <ArrowRight size={14} />}
                  </button>
                ))}
              </div>

              {/* Price Filter Placeholder (Optional addition for 'Functional' feel) */}
              <div className="mt-10 pt-8 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Price Range</h4>
                <div className="flex flex-col gap-3">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-indigo-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>$0</span>
                    <span>$2000+</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  {keyword ? (
                    <>Search: <span className="text-indigo-600">"{keyword}"</span></>
                  ) : category ? (
                    <>Category: <span className="text-indigo-600">{category}</span></>
                  ) : (
                    'Trending Products'
                  )}
                </h2>
                <p className="text-slate-500 mt-2 font-medium">
                  {data?.products?.length || 0} premium items available
                </p>
              </div>

              {/* Mobile Category Toggle (Only visible on small screens) */}
              <div className="lg:hidden w-full">
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-purple-100 border-b-purple-600 rounded-full animate-spin-slow"></div>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-rose-50 text-rose-600 p-8 rounded-3xl border border-rose-100 text-center font-bold shadow-sm">
                <p className="text-lg">Something went wrong</p>
                <p className="text-sm opacity-70 mt-1 font-medium">{error?.data?.message || error.error}</p>
              </div>
            ) : data.products.length === 0 ? (
              <div className="bg-slate-50 border border-slate-100 border-dashed rounded-3xl p-20 text-center">
                <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <Filter size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No matching products</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Try adjusting your filters or search keywords to find what you're looking for.</p>
                <button onClick={() => {setCategory(''); }} className="mt-8 text-indigo-600 font-bold hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {data.products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;