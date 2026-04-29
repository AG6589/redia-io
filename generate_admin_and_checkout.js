const fs = require('fs');
const path = require('path');

const files = {
  'frontend/src/pages/ShippingPage.jsx': `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100">
      <h1 className="text-3xl font-black text-slate-900 mb-6">Shipping</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Address</label>
          <input type="text" value={address} required onChange={(e) => setAddress(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">City</label>
          <input type="text" value={city} required onChange={(e) => setCity(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Postal Code</label>
          <input type="text" value={postalCode} required onChange={(e) => setPostalCode(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Country</label>
          <input type="text" value={country} required onChange={(e) => setCountry(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95 mt-4">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};
export default ShippingPage;`,

  'frontend/src/pages/PaymentPage.jsx': `import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100">
      <h1 className="text-3xl font-black text-slate-900 mb-6">Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-6 space-y-3">
          <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
            <input type="radio" className="w-5 h-5 text-indigo-600" id="PayPal" name="paymentMethod" value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)} />
            <span className="font-semibold text-slate-800">PayPal or Credit Card</span>
          </label>
          <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
            <input type="radio" className="w-5 h-5 text-indigo-600" id="Stripe" name="paymentMethod" value="Stripe" onChange={(e) => setPaymentMethod(e.target.value)} />
            <span className="font-semibold text-slate-800">Stripe</span>
          </label>
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95">
          Continue to Order Preview
        </button>
      </form>
    </div>
  );
};
export default PaymentPage;`,

  'frontend/src/pages/PlaceOrderPage.jsx': `import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(\`/order/\${res._id}\`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Shipping</h2>
          <p className="text-slate-600">
            <strong className="text-slate-800">Address: </strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Payment Method</h2>
          <strong className="text-slate-800">Method: </strong>
          <span className="text-slate-600">{cart.paymentMethod}</span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Order Items</h2>
          {cart.cartItems.length === 0 ? (
            <div className="bg-blue-50 text-blue-600 p-4 rounded-xl">Your cart is empty</div>
          ) : (
            <ul className="space-y-4">
              {cart.cartItems.map((item, index) => (
                <li key={index} className="flex items-center gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="w-16 h-16 bg-slate-50 rounded-xl p-2 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <Link to={\`/product/\${item.product}\`} className="flex-1 font-semibold text-slate-800 hover:text-indigo-600">{item.title}</Link>
                  <div className="font-medium text-slate-600">
                    {item.qty} x \${item.price} = <span className="font-bold text-slate-900">\${(item.qty * item.price).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 h-fit sticky top-24">
        <h2 className="text-xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Order Summary</h2>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-slate-600"><span>Items</span><span className="font-medium">\${cart.itemsPrice}</span></div>
          <div className="flex justify-between text-slate-600"><span>Shipping</span><span className="font-medium">\${cart.shippingPrice}</span></div>
          <div className="flex justify-between text-slate-600"><span>Tax</span><span className="font-medium">\${cart.taxPrice}</span></div>
          <div className="h-px bg-slate-100 my-2"></div>
          <div className="flex justify-between text-lg font-black text-slate-900"><span>Total</span><span>\${cart.totalPrice}</span></div>
        </div>
        
        <button
          type="button"
          disabled={cart.cartItems.length === 0 || isLoading}
          onClick={placeOrderHandler}
          className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};
export default PlaceOrderPage;`,

  'frontend/src/pages/admin/AdminDashboard.jsx': `import { Link } from 'react-router-dom';
import { Package, Users, ShoppingBag } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/products" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-indigo-200 transition-all flex flex-col items-center text-center group">
          <div className="bg-indigo-50 text-indigo-600 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform"><Package size={32} /></div>
          <h2 className="text-xl font-bold text-slate-800">Manage Products</h2>
          <p className="text-slate-500 text-sm mt-2">Add, edit, or delete inventory</p>
        </Link>
        <Link to="/admin/orders" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:emerald-200 transition-all flex flex-col items-center text-center group">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform"><ShoppingBag size={32} /></div>
          <h2 className="text-xl font-bold text-slate-800">Manage Orders</h2>
          <p className="text-slate-500 text-sm mt-2">View and update order status</p>
        </Link>
        <Link to="/admin/users" className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:purple-200 transition-all flex flex-col items-center text-center group">
          <div className="bg-purple-50 text-purple-600 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform"><Users size={32} /></div>
          <h2 className="text-xl font-bold text-slate-800">Manage Users</h2>
          <p className="text-slate-500 text-sm mt-2">View customers and permissions</p>
        </Link>
      </div>
    </div>
  );
};
export default AdminDashboard;`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
console.log('Admin and Checkout components generated.');
