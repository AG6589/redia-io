import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-slate-50 p-6 flex items-center justify-center">
        {/* Badge */}
        {product.price > 500 && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Premium
          </div>
        )}
        <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-rose-500 hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          <Heart size={18} />
        </button>
        <Link to={`/product/${product._id}`} className="w-full h-full flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out" 
          />
        </Link>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">
          {product.category}
        </div>
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-bold text-slate-800 line-clamp-2 leading-tight hover:text-indigo-600 transition-colors mb-2">
            {product.title}
          </h2>
        </Link>
        
        <div className="flex items-center gap-1 mb-4 mt-auto">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < Math.floor(product.ratings) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} 
            />
          ))}
          <span className="text-xs text-slate-500 ml-1 font-medium">({product.numReviews})</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
            <span className="text-xl font-black text-slate-900">${product.price}</span>
          </div>
          <button className="h-10 w-10 bg-slate-900 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-md shadow-slate-900/20 transition-colors transform active:scale-95">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;