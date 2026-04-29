const fs = require('fs');
const path = require('path');

const files = {
  'frontend/src/main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);`,

  'frontend/src/App.jsx': `import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;`,

  'frontend/src/components/Header.jsx': `import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">ProShop</Link>
        <nav className="flex items-center gap-6">
          <Link to="/cart" className="flex items-center gap-1 text-gray-600 hover:text-indigo-600">
            <ShoppingCart size={20} /> Cart
            {cartItems.length > 0 && (
              <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          {userInfo ? (
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 hover:text-indigo-600">
                <User size={20} /> {userInfo.name}
              </button>
              <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded mt-2 w-48">
                <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
                <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 text-gray-600 hover:text-indigo-600">
              <User size={20} /> Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;`,

  'frontend/src/components/Footer.jsx': `const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>ProShop &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
export default Footer;`,

  'frontend/src/pages/HomePage.jsx': `import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { data, isLoading, error } = useGetProductsQuery({ keyword: '', pageNumber: 1 });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Latest Products</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div className="text-red-500">{error?.data?.message || error.error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
export default HomePage;`,

  'frontend/src/components/ProductCard.jsx': `import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={\`/product/\${product._id}\`}>
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={\`/product/\${product._id}\`}>
          <h2 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h2>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">\${product.price}</span>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;`,

  'frontend/src/pages/LoginPage.jsx': `import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Sign In
        </button>
      </form>
      <div className="mt-4 text-center">
        New Customer? <Link to="/register" className="text-indigo-600">Register</Link>
      </div>
    </div>
  );
};
export default LoginPage;`,

  'frontend/src/pages/RegisterPage.jsx': `import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Register
        </button>
      </form>
    </div>
  );
};
export default RegisterPage;`,

  'frontend/src/pages/CartPage.jsx': `import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="bg-blue-100 text-blue-700 p-4 rounded">
            Your cart is empty <Link to="/" className="font-bold underline">Go Back</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <Link to={\`/product/\${item._id}\`} className="flex-1 ml-4 font-semibold text-indigo-600 hover:underline">{item.title}</Link>
                <div className="w-20 font-bold">\${item.price}</div>
                <select 
                  className="border rounded p-1 mx-4"
                  value={item.qty} 
                  onChange={(e) => dispatch(addToCart({...item, qty: Number(e.target.value)}))}
                >
                  {[...Array(item.stock).keys()].map(x => (
                    <option key={x+1} value={x+1}>{x+1}</option>
                  ))}
                </select>
                <button onClick={() => removeFromCartHandler(item._id)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white p-6 rounded shadow h-fit">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
        </h2>
        <div className="text-2xl font-bold mb-6">
          \${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
        </div>
        <button 
          type="button" 
          disabled={cartItems.length === 0} 
          onClick={checkoutHandler}
          className="w-full bg-indigo-600 text-white py-3 rounded font-bold hover:bg-indigo-700 disabled:opacity-50"
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};
export default CartPage;`,

  'frontend/vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
console.log('Frontend files generated successfully.');
