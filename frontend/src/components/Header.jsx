import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, User, LogOut, Search } from 'lucide-react';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-500/30">
            <ShoppingBag size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
            ProShop
          </span>
        </Link>
        
        <SearchBox />

        <nav className="flex items-center gap-6">
          <Link to="/cart" className="relative text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1 font-medium">
            <div className="p-2 bg-slate-100 rounded-full hover:bg-indigo-50 transition-colors">
              <ShoppingBag size={20} />
            </div>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-pulse">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          
          {userInfo ? (
            <div className="relative group">
              <button className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-medium">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                  {userInfo.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block">{userInfo.name.split(' ')[0]}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-xl rounded-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                <Link to="/profile" className="flex items-center gap-2 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                  <User size={16} /> Profile
                </Link>
                <div className="h-px bg-slate-100"></div>
                <button onClick={logoutHandler} className="w-full flex items-center gap-2 px-4 py-3 text-rose-600 hover:bg-rose-50 transition-colors text-left">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-md shadow-slate-900/20 flex items-center gap-2">
              <User size={18} /> Sign In
            </Link>
          )}

          {userInfo && userInfo.isAdmin && (
            <Link to="/admin/dashboard" className="hidden md:flex items-center gap-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full font-bold text-sm transition-colors border border-indigo-100">
              Admin Panel
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;