import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react';
import { useParams } from 'react-router-dom';

const HomePage = () => {
  const { keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword: keyword || '', pageNumber: 1 });

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

      {/* Products Grid */}
      <div id="products" className="container mx-auto px-4 lg:px-0">
        <div className="flex items-end justify-between mb-8 mt-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {keyword ? `Search Results for "${keyword}"` : 'Trending Products'}
            </h2>
            <p className="text-slate-500 mt-2">
              {keyword ? 'Products matching your search' : 'The most sought-after tech this week'}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="bg-rose-50 text-rose-600 p-6 rounded-2xl border border-rose-100 text-center font-medium shadow-sm">
            {error?.data?.message || error.error}
          </div>
        ) : data.products.length === 0 ? (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center">
            <h3 className="text-xl font-bold text-slate-700 mb-2">No products found</h3>
            <p className="text-slate-500">We couldn't find any products matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;