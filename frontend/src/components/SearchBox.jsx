import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');
  const [category, setCategory] = useState('');

  const categories = ['Electronics', 'Accessories', 'Fashion', 'Home', 'Gadgets'];

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}${category ? `?category=${category}` : ''}`);
      setKeyword('');
    } else if (category) {
       // If only category is selected, we can handle it too, but usually it's handled by HomePage
       // For now, let's just search with the keyword
       navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex-1 max-w-xl mx-8 flex items-center bg-slate-100 rounded-full border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all">
      <div className="relative group">
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="appearance-none bg-transparent pl-5 pr-10 py-2.5 text-sm font-bold text-slate-700 outline-none cursor-pointer border-r border-slate-200"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-indigo-600 transition-colors" />
      </div>
      
      <div className="flex-1 relative">
        <input
          type="text"
          name="q"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for premium tech..."
          className="w-full bg-transparent py-2.5 pl-4 pr-12 text-sm outline-none font-medium text-slate-800"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors p-1"
        >
          <Search size={18} />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
